'use strict';

const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const { execFile } = require('child_process');
const fs = require('fs/promises');
const os = require('os');
const path = require('path');
const crypto = require('crypto');

const PORT = process.env.PORT || 3000;
const MAX_MB = Number(process.env.MAX_UPLOAD_MB || 2048);

const app = express();
const workDir = path.join(os.tmpdir(), 'metadata-stripper');

const upload = multer({
  storage: multer.diskStorage({
    destination: async (_req, _file, cb) => {
      await fs.mkdir(workDir, { recursive: true });
      cb(null, workDir);
    },
    filename: (_req, _file, cb) => cb(null, crypto.randomUUID()),
  }),
  limits: { fileSize: MAX_MB * 1024 * 1024 },
});

const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff', '.gif', '.heic', '.heif', '.avif']);
const VIDEO_EXT = new Set(['.mp4', '.m4v', '.mov', '.mkv', '.webm', '.avi', '.3gp', '.mts', '.m2ts', '.ts', '.wmv', '.flv']);

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    execFile(cmd, args, { maxBuffer: 64 * 1024 * 1024 }, (err, stdout, stderr) => {
      if (err) {
        err.stderr = stderr;
        return reject(err);
      }
      resolve(stdout);
    });
  });
}

// ---------------------------------------------------------------------------
// Detection: report what metadata a file carries (before and after stripping)
// ---------------------------------------------------------------------------

const SIGNATURES = [
  { label: 'C2PA / Content Credentials', needles: ['c2pa', 'jumb', 'contentauth'] },
  { label: 'XMP', needles: ['<x:xmpmeta', 'http://ns.adobe.com/xap/1.0/', 'XML:com.adobe.xmp'] },
  { label: 'EXIF', needles: ['Exif\0\0'] },
  { label: 'IPTC / Photoshop IRB', needles: ['Photoshop 3.0', '8BIM'] },
  { label: 'ICC color profile', needles: ['ICC_PROFILE'] },
  { label: 'MPF (multi-picture)', needles: ['MPF\0'] },
  { label: 'Apple maker data', needles: ['Apple iOS', 'com.apple.quicktime'] },
  { label: 'GPS / location', needles: ['GPSLatitude', '©xyz', 'com.apple.quicktime.location'] },
  { label: 'Camera / software info', needles: ['com.apple.quicktime.make', 'com.apple.quicktime.software'] },
];

async function scanBytes(file) {
  const buf = await fs.readFile(file);
  // Metadata lives in headers/footers; scanning whole file is fine for most sizes,
  // but cap at head+tail 32MB each for huge videos.
  const LIMIT = 32 * 1024 * 1024;
  const slice = buf.length > LIMIT * 2
    ? Buffer.concat([buf.subarray(0, LIMIT), buf.subarray(buf.length - LIMIT)])
    : buf;
  const text = slice.toString('latin1');
  const found = [];
  for (const sig of SIGNATURES) {
    if (sig.needles.some((n) => text.includes(n))) found.push(sig.label);
  }
  return found;
}

async function inspectImage(file) {
  const found = new Set(await scanBytes(file));
  try {
    const m = await sharp(file).metadata();
    if (m.exif) found.add('EXIF');
    if (m.xmp) found.add('XMP');
    if (m.iptc) found.add('IPTC / Photoshop IRB');
    if (m.icc) found.add('ICC color profile');
    if (m.comments && m.comments.length) found.add('Text comments (PNG/GIF)');
  } catch (_) { /* unreadable by sharp — byte scan still applies */ }
  return [...found];
}

// Default handler names written by ffmpeg's muxer — not identifying.
const GENERIC_HANDLERS = new Set(['VideoHandler', 'SoundHandler', 'SubtitleHandler', 'TextHandler']);

async function probeCodecs(file) {
  try {
    const out = await run('ffprobe', ['-v', 'quiet', '-select_streams', 'V', '-show_entries', 'stream=codec_name', '-of', 'csv=p=0', file]);
    return out.trim().split('\n').filter(Boolean);
  } catch (_) { return []; }
}

async function inspectVideo(file) {
  const found = new Set(await scanBytes(file));
  const tags = {};
  try {
    const out = await run('ffprobe', ['-v', 'quiet', '-print_format', 'json', '-show_format', '-show_streams', '-show_chapters', file]);
    const info = JSON.parse(out);
    const ignore = new Set(['major_brand', 'minor_version', 'compatible_brands']);
    for (const [k, v] of Object.entries(info.format?.tags || {})) {
      if (ignore.has(k) || (k === 'encoder' && v === 'Lavf')) continue; // Matroska-required muxer field, unversioned
      tags[k] = v;
    }
    (info.streams || []).forEach((s, i) => {
      for (const [k, v] of Object.entries(s.tags || {})) {
        if (k === 'language' && v === 'und') continue;
        if (k === 'DURATION') continue;
        if (k === 'vendor_id' && v === '[0][0][0][0]') continue;
        if (k === 'handler_name' && GENERIC_HANDLERS.has(v)) continue;
        tags[`stream${i}.${k}`] = v;
      }
      if (s.codec_type === 'data') found.add(`Data track (${s.codec_tag_string || s.codec_name || 'unknown'})`);
    });
    if ((info.chapters || []).length) found.add('Chapters');
  } catch (_) { /* ignore */ }
  if (Object.keys(tags).length) found.add('Container / stream tags');
  return { found: [...found], tags };
}

// ---------------------------------------------------------------------------
// Stripping
// ---------------------------------------------------------------------------

async function stripImage(input, ext, quality, synthid = false) {
  // Decode to raw pixels and re-encode a brand-new file. sharp writes no
  // EXIF / XMP / IPTC / ICC / C2PA / comments unless explicitly asked to.
  // .rotate() bakes the EXIF orientation into the pixels so the image still
  // displays upright once the orientation tag is gone.
  const animated = ext === '.gif' || ext === '.webp';
  let img = sharp(input, { animated, failOn: 'none' }).rotate();
  // Convert to sRGB so dropping the ICC profile doesn't shift colors.
  img = img.toColorspace('srgb');

  if (synthid) {
    // Disrupt invisible pixel-level watermarks (SynthID, etc.) by running a
    // resize-down→resize-up cycle that forces bilinear resampling of every
    // pixel, then a subtle blur+sharpen pass to break high-frequency patterns.
    const meta = await sharp(input, { animated, failOn: 'none' }).metadata();
    const w = meta.width;
    const h = meta.height;
    if (w && h) {
      const shrunkW = Math.max(1, Math.round(w * 0.98));
      const shrunkH = Math.max(1, Math.round(h * 0.98));
      img = img
        .resize(shrunkW, shrunkH, { kernel: 'lanczos3' })
        .resize(w, h, { kernel: 'lanczos3' });
    }
    img = img.blur(0.5).sharpen({ sigma: 1.0, m1: 0.5, m2: 0.3 });
  }

  let outExt = ext;
  switch (ext) {
    case '.jpg': case '.jpeg':
      img = img.jpeg({ quality, mozjpeg: true, chromaSubsampling: quality >= 90 ? '4:4:4' : '4:2:0' }); break;
    case '.png': img = img.png({ compressionLevel: 9 }); break;
    case '.webp': img = img.webp({ quality, effort: 5 }); break;
    case '.tif': case '.tiff': img = img.tiff({ compression: 'lzw' }); break;
    case '.gif': img = img.gif(); break;
    case '.avif': img = img.avif({ quality }); break;
    case '.heic': case '.heif':
      // HEIC (HEVC) encoding isn't available in prebuilt libvips; output JPEG.
      img = img.jpeg({ quality, mozjpeg: true }); outExt = '.jpg'; break;
    default:
      img = img.jpeg({ quality, mozjpeg: true }); outExt = '.jpg';
  }
  const output = `${input}.out${outExt}`;
  await img.toFile(output);
  return { output, outExt };
}

async function stripVideo(input, ext, { forceMkv = false, synthid = false } = {}) {
  const outExt = forceMkv ? '.mkv'
    : ['.avi', '.wmv', '.flv', '.mts', '.m2ts', '.ts', '.3gp'].includes(ext) ? '.mp4' : ext;
  const output = `${input}.out${outExt}`;
  const args = [
    '-hide_banner', '-loglevel', 'error', '-y',
    '-i', input,
    '-map', '0:V?', '-map', '0:a?', '-map', '0:s?',
    '-dn',
    '-map_metadata', '-1',
    '-map_metadata:s:v', '-1', '-map_metadata:s:a', '-1', '-map_metadata:s:s', '-1',
    '-map_chapters', '-1',
    '-fflags', '+bitexact', '-flags:v', '+bitexact', '-flags:a', '+bitexact',
    '-metadata', 'creation_time=', '-metadata:s', 'handler_name=', '-metadata:s', 'vendor_id=',
  ];

  if (synthid) {
    // Re-encode video with subtle noise + blur/sharpen to disrupt pixel-level
    // watermarks, and re-encode audio with slight filtering to break audio watermarks.
    args.push(
      '-vf', 'gblur=sigma=0.5,noise=c0s=3:c0f=t,unsharp=5:5:0.5:5:5:0',
      '-c:v', 'libx264', '-crf', '18', '-preset', 'medium',
      '-c:a', 'aac', '-b:a', '192k', '-af', 'aresample=async=1,lowpass=f=18000',
    );
  } else {
    // Lossless remux — streams are copied, never re-encoded.
    args.push('-c', 'copy');
    const codecs = await probeCodecs(input);
    if (codecs.length === 1 && codecs[0] === 'h264') args.push('-bsf:v', 'filter_units=remove_types=6');
    if (codecs.length === 1 && codecs[0] === 'hevc') args.push('-bsf:v', 'filter_units=remove_types=39|40');
  }

  if (outExt === '.mp4' && ext !== '.mp4') args.push('-c:s', 'mov_text');
  if (['.mp4', '.mov', '.m4v'].includes(outExt)) args.push('-movflags', '+faststart');
  args.push(output);
  try {
    await run('ffmpeg', args);
  } catch (e) {
    await fs.rm(output, { force: true });
    if (!forceMkv) return stripVideo(input, ext, { forceMkv: true, synthid });
    throw new Error((e.stderr || e.message).trim().split('\n').slice(-3).join(' '));
  }
  return { output, outExt };
}

function kindOf(name, mime) {
  const ext = path.extname(name).toLowerCase();
  if (IMAGE_EXT.has(ext) || (mime || '').startsWith('image/')) return 'image';
  if (VIDEO_EXT.has(ext) || (mime || '').startsWith('video/')) return 'video';
  return null;
}

function safeBase(name) {
  const base = path.basename(name, path.extname(name)).replace(/[^\w.-]+/g, '_').slice(0, 80);
  return base || 'file';
}

app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/strip', upload.single('file'), async (req, res) => {
  const f = req.file;
  if (!f) return res.status(400).json({ error: 'No file uploaded' });
  const cleanup = [f.path];
  try {
    const kind = kindOf(f.originalname, f.mimetype);
    if (!kind) return res.status(415).json({ error: 'Unsupported file type' });
    let ext = path.extname(f.originalname).toLowerCase();
    if (!ext) ext = kind === 'image' ? '.jpg' : '.mp4';
    const quality = Math.min(100, Math.max(50, Number(req.body.quality) || 95));
    const synthid = req.body.synthid === 'true' || req.body.synthid === '1';

    let before, after, result;
    if (kind === 'image') {
      before = { found: await inspectImage(f.path) };
      result = await stripImage(f.path, ext, quality, synthid);
      cleanup.push(result.output);
      after = { found: await inspectImage(result.output) };
    } else {
      before = await inspectVideo(f.path);
      result = await stripVideo(f.path, ext, { synthid });
      cleanup.push(result.output);
      after = await inspectVideo(result.output);
    }

    const data = await fs.readFile(result.output);
    const report = {
      kind,
      before,
      after,
      originalSize: f.size,
      strippedSize: data.length,
    };
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="${safeBase(f.originalname)}_clean${result.outExt}"`);
    res.setHeader('X-Strip-Report', Buffer.from(JSON.stringify(report)).toString('base64'));
    res.setHeader('Access-Control-Expose-Headers', 'X-Strip-Report, Content-Disposition');
    res.send(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message || 'Processing failed' });
  } finally {
    await Promise.all(cleanup.map((p) => fs.rm(p, { force: true })));
  }
});

app.use((err, _req, res, _next) => {
  res.status(err.code === 'LIMIT_FILE_SIZE' ? 413 : 500).json({ error: err.message });
});

app.listen(PORT, () => console.log(`Metadata stripper running on http://localhost:${PORT}`));
