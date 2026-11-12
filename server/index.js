'use strict';

const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const { execFile } = require('child_process');
const fs = require('fs/promises');
const os = require('os');
const path = require('path');
const crypto = require('crypto');
const { createDownloadRouter, dirSize } = require('./downloaders');
const log = require('./log');
const { createAccounts } = require('./account');
const site = require('./site');
const { applyLocalMode, FLAG: LOCAL_FLAG } = require('./local-mode');

// npm run dev:local: no accounts, no limits (see server/local-mode.js). Runs
// before anything reads the environment, and refuses to start on a server.
let local;
try {
  local = applyLocalMode(process.env);
} catch (e) {
  log.fail('local', e.message);
  process.exit(1);
}

const PORT = process.env.PORT || 3000;
const MAX_MB = Number(process.env.MAX_UPLOAD_MB || 2048);

// Local mode only listens on this computer; otherwise every interface.
const HOST = local.enabled ? '127.0.0.1' : process.env.HOST || undefined;

const app = express();
app.set('trust proxy', process.env.TRUST_PROXY ?? 'loopback, linklocal, uniquelocal');
let accounts;
try {
  accounts = createAccounts();
} catch (e) {
  // Missing D1 settings: fail fast with a readable message.
  log.fail('account', e.message);
  process.exit(1);
}
const workDir = path.join(os.tmpdir(), 'metadata-stripper');

// Behind the Cloudflare Worker (worker/index.js), the Worker checks every
// request (session, plan or free trial, the link or upload) before it wakes
// this container, and stamps it with INTERNAL_SECRET. As defence in depth,
// anything without that stamp is refused here. Unset (npm run dev, or
// self-hosting the image on its own): no check, and this server does the
// Worker's job itself, including the site-wide free trial cap.
const INTERNAL_SECRET = process.env.INTERNAL_SECRET || '';
const behindWorker = Boolean(INTERNAL_SECRET);
if (behindWorker) {
  const want = crypto.createHash('sha256').update(INTERNAL_SECRET).digest();
  app.use((req, res, next) => {
    const got = crypto.createHash('sha256').update(String(req.get('x-sharona-internal') || '')).digest();
    if (crypto.timingSafeEqual(got, want)) return next();
    log.fail('internal', `${req.method} ${req.originalUrl.slice(0, 200)} refused: not sent by the Worker`);
    res.status(403).json({ error: 'Forbidden' });
  });
}

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

// Breaks up invisible pixel-level watermarks (SynthID and the like) that are
// engineered to survive mild edits. A near-unity resize or a dusting of noise
// leaves the watermark riding on the same pixel grid it was embedded on, so a
// detector still reads it; the fix is to desynchronise that grid locally. A
// smooth, multi-scale random displacement field — a few pixels across at its
// widest, spread over long wavelengths so straight edges never visibly bend —
// resamples every pixel off its original position, decorrelating the watermark
// across low and high frequencies at once, and a trace of per-pixel noise
// finishes scrambling what's left. Renders the pipeline to raw sRGB pixels and
// wraps the result back into a sharp instance. Expects 8-bit pixels (caller
// guards on depth); the picture stays visually indistinguishable.
async function disruptWatermark(img) {
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h, channels: ch } = info;
  // Even channel counts (gray+alpha, RGBA) carry alpha last; it's warped but
  // never noised. Odd counts are all colour.
  const colorCh = ch % 2 === 0 ? ch - 1 : ch;
  const out = Buffer.allocUnsafe(data.length);

  // xorshift32 PRNG: deterministic within a call, fresh each run.
  let seed = (Math.random() * 0x100000000) >>> 0 || 1;
  const rnd = () => {
    seed ^= seed << 13;
    seed ^= seed >>> 17;
    seed ^= seed << 5;
    return (seed >>> 0) / 0x100000000;
  };

  // Three octaves of smooth value noise form the displacement field: coarse
  // grids of random vectors, bilinearly interpolated so the field is seamless.
  // Long wavelengths carry the larger amplitudes, so the warp stays invisible.
  const diag = Math.hypot(w, h);
  const peak = Math.min(7, Math.max(2.2, diag / 900));
  const octaves = [
    { cell: Math.max(24, diag / 14), amp: peak },
    { cell: Math.max(14, diag / 45), amp: peak * 0.45 },
    { cell: Math.max(9, diag / 130), amp: peak * 0.18 },
  ].map(({ cell, amp }) => {
    const gw = Math.floor((w - 1) / cell) + 2;
    const gh = Math.floor((h - 1) / cell) + 2;
    const vx = new Float32Array(gw * gh);
    const vy = new Float32Array(gw * gh);
    for (let i = 0; i < vx.length; i++) {
      vx[i] = (rnd() * 2 - 1) * amp;
      vy[i] = (rnd() * 2 - 1) * amp;
    }
    return { cell, gw, vx, vy };
  });

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let dx = 0;
      let dy = 0;
      for (let k = 0; k < octaves.length; k++) {
        const g = octaves[k];
        const fx = x / g.cell;
        const fy = y / g.cell;
        const gx = fx | 0;
        const gy = fy | 0;
        const tx = fx - gx;
        const ty = fy - gy;
        const r0 = gy * g.gw + gx;
        const r1 = r0 + g.gw;
        const w00 = (1 - tx) * (1 - ty);
        const w10 = tx * (1 - ty);
        const w01 = (1 - tx) * ty;
        const w11 = tx * ty;
        dx += g.vx[r0] * w00 + g.vx[r0 + 1] * w10 + g.vx[r1] * w01 + g.vx[r1 + 1] * w11;
        dy += g.vy[r0] * w00 + g.vy[r0 + 1] * w10 + g.vy[r1] * w01 + g.vy[r1 + 1] * w11;
      }
      let sx = x + dx;
      let sy = y + dy;
      sx = sx < 0 ? 0 : sx > w - 1 ? w - 1 : sx;
      sy = sy < 0 ? 0 : sy > h - 1 ? h - 1 : sy;
      const x0 = sx | 0;
      const y0 = sy | 0;
      const x1 = x0 + 1 < w ? x0 + 1 : x0;
      const y1 = y0 + 1 < h ? y0 + 1 : y0;
      const tx = sx - x0;
      const ty = sy - y0;
      const i00 = (y0 * w + x0) * ch;
      const i10 = (y0 * w + x1) * ch;
      const i01 = (y1 * w + x0) * ch;
      const i11 = (y1 * w + x1) * ch;
      const o = (y * w + x) * ch;
      const n = ((rnd() * 7) | 0) - 3; // ±3 code values of noise
      for (let c = 0; c < ch; c++) {
        const top = data[i00 + c] * (1 - tx) + data[i10 + c] * tx;
        const bot = data[i01 + c] * (1 - tx) + data[i11 + c] * tx;
        let v = Math.round(top * (1 - ty) + bot * ty + (c < colorCh ? n : 0));
        out[o + c] = v < 0 ? 0 : v > 255 ? 255 : v;
      }
    }
  }
  return sharp(out, { raw: { width: w, height: h, channels: ch } });
}

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
    // Disrupt invisible pixel-level watermarks (SynthID, etc.). SynthID for
    // images is built to survive a near-unity resize and a dusting of noise, so
    // that isn't enough on its own; instead a smooth multi-scale warp
    // desynchronises the pixel grid the watermark rides on (see
    // disruptWatermark), then a gentle sharpen restores the softness the
    // resample introduces. The result stays visually indistinguishable.
    const meta = await sharp(input, { animated, failOn: 'none' }).metadata();
    if (!animated && meta.depth === 'uchar') {
      img = await disruptWatermark(img);
      img = img.sharpen({ sigma: 0.6, m1: 0.4, m2: 0.25 });
    } else if (meta.width && meta.height) {
      // Animated frames and >8-bit depths can't go through the raw-pixel warp
      // here, so fall back to a resample-down→resample-up cycle plus a sharpen.
      const w = meta.width;
      const h = meta.height;
      const shrunkW = Math.max(1, Math.round(w * 0.985));
      const shrunkH = Math.max(1, Math.round(h * 0.985));
      img = img
        .resize(shrunkW, shrunkH, { kernel: 'lanczos3' })
        .resize(w, h, { kernel: 'lanczos3' })
        .sharpen({ sigma: 0.5, m1: 0.3, m2: 0.2 });
    }
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
    // Re-encode video with a light touch that perturbs pixel-level watermarks
    // (SynthID, etc.) while keeping as much of the original as possible: a faint
    // blur that a matching sharpen restores, plus a trace of temporal noise to
    // break the watermark lattice. A visually transparent CRF and a high audio
    // bitrate preserve quality; the audio is only resampled to disrupt any
    // audio watermark without an aggressive low-pass that would dull it.
    args.push(
      '-vf', 'gblur=sigma=0.3,noise=c0s=2:c0f=t,unsharp=3:3:0.4:3:3:0',
      '-c:v', 'libx264', '-crf', '18', '-preset', 'medium',
      // x264 writes its version and settings into an SEI message; drop it.
      '-bsf:v', 'filter_units=remove_types=6',
      '-c:a', 'aac', '-b:a', '256k', '-af', 'aresample=async=1',
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

// Optional CORS for when the frontend is hosted on another origin
// (e.g. Cloudflare Pages / Vercel) and talks to this API directly.
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean);
app.use('/api', (req, res, next) => {
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Expose-Headers', 'X-Strip-Report, Content-Disposition');
  }
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

app.get('/api/health', (_req, res) => res.json({ ok: true }));

// Sign-in, usage and billing (see server/account.js).
app.use('/api', accounts.router);

// The quota is checked before the upload starts, so nobody uploads a big
// file just to be told to upgrade. A failed strip gives the use back.
// Behind the Worker, the Worker already took today's free trial slot.
const gateOpts = { trialCap: !behindWorker };
const stripGate = [accounts.gate('server_strip', gateOpts), (req, res, next) => { req.quota.refundUnlessSent(res); next(); }];

app.post('/api/strip', stripGate, upload.single('file'), async (req, res) => {
  const f = req.file;
  if (!f) return res.status(400).json({ error: 'No file uploaded' });
  const cleanup = [f.path];
  const started = Date.now();
  const name = f.originalname;
  try {
    const kind = kindOf(f.originalname, f.mimetype);
    if (!kind) {
      log.fail('strip', `"${name}" (${log.size(f.size)}): unsupported file type`);
      return res.status(415).json({ error: 'Unsupported file type' });
    }
    let ext = path.extname(f.originalname).toLowerCase();
    if (!ext) ext = kind === 'image' ? '.jpg' : '.mp4';
    const quality = Math.min(100, Math.max(50, Number(req.body.quality) || 100));
    const synthid = req.body.synthid === 'true' || req.body.synthid === '1';
    const mode = `${kind}, ${synthid ? 'metadata + SynthID' : 'metadata only'}${kind === 'image' ? `, q${quality}` : ''}`;
    log.start('strip', `"${name}" (${log.size(f.size)}) [${mode}]`);

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
    const removed = before.found.filter((x) => !after.found.includes(x));
    log.ok('strip', `"${name}" → ${safeBase(name)}_clean${result.outExt} [${mode}] `
      + `${log.size(f.size)} → ${log.size(data.length)} in ${log.duration(Date.now() - started)}`
      + (removed.length ? ` · removed: ${removed.join(', ')}` : ' · nothing to remove')
      + (after.found.length ? ` · still present: ${after.found.join(', ')}` : '')
      + (before.tags ? ` · tags ${Object.keys(before.tags).length} → ${Object.keys(after.tags).length}` : ''));
  } catch (e) {
    log.fail('strip', `"${name}" (${log.size(f.size)}) after ${log.duration(Date.now() - started)}: ${e.message}`);
    res.status(500).json({ error: e.message || 'Processing failed' });
  } finally {
    await Promise.all(cleanup.map((p) => fs.rm(p, { force: true })));
  }
});

// ---------------------------------------------------------------------------
// Link downloaders (YouTube, X, Instagram, TikTok) via yt-dlp
// ---------------------------------------------------------------------------

const downloads = createDownloadRouter(workDir, {
  gate: accounts.gate('download', gateOpts),
  currentUser: accounts.currentUser,
  // Each account's download rows, so they show on every device it signs in on.
  history: accounts.store && typeof accounts.store.listDownloads === 'function' ? accounts.store : null,
});
app.use('/api/download', downloads);
// Old endpoint, kept so existing clients keep working.
app.post('/api/tiktok', (req, res, next) => { req.url = '/tiktok'; downloads(req, res, next); });

// ---------------------------------------------------------------------------
// Frontend: serve the Vite build (npm run build) in production
// ---------------------------------------------------------------------------

//   /        static landing page (dist/index.html)
//   /es/ …   the landing page in other languages (dist/es/index.html)
//   /app/    the tools (dist/app/index.html)
// The pages carry __SITE_URL__ placeholders for canonical, Open Graph and
// JSON-LD links. Set SITE_URL (e.g. https://example.com) in production;
// otherwise the origin is taken from the request.
const distDir = path.join(__dirname, '..', 'dist');
const SITE_URL = (process.env.SITE_URL || '').replace(/\/+$/, '');
function siteUrl(req) {
  if (SITE_URL) return SITE_URL;
  const proto = req.get('x-forwarded-proto')?.split(',')[0].trim() === 'https' ? 'https' : req.protocol;
  // Only a plain host[:port] is trusted from the request; it ends up in HTML.
  const host = /^[a-z0-9.-]+(:\d+)?$/i.test(req.get('host') || '') ? req.get('host') : 'localhost';
  return `${proto}://${host}`;
}

// Shown on the Privacy Policy and Terms. Set CONTACT_EMAIL in production.
const contactEmail = (base) => site.contactEmailFor(process.env.CONTACT_EMAIL, base);

const pageCache = new Map();
async function sendPage(req, res, next, file, status = 200) {
  try {
    let html = pageCache.get(file);
    if (html === undefined) {
      html = await fs.readFile(path.join(distDir, file), 'utf8');
      if (process.env.NODE_ENV === 'production') pageCache.set(file, html);
    }
    const base = siteUrl(req);
    res
      .status(status)
      .type('html')
      .set('Cache-Control', 'no-cache')
      .send(site.fillPage(html, base, contactEmail(base)));
  } catch (e) {
    next(e.code === 'ENOENT' ? undefined : e);
  }
}

// Hashed build assets never change, so let browsers keep them for a year.
app.use('/assets', express.static(path.join(distDir, 'assets'), { immutable: true, maxAge: '1y' }));
app.use(express.static(distDir, { index: false, redirect: false }));

app.get('/', (req, res, next) => sendPage(req, res, next, 'index.html'));
// The landing page in other languages: /es/, /fr/ ... (built to dist/<code>/).
// Unknown codes fall through to the 404 page.
app.get(site.LANG_PAGE, (req, res, next) => {
  const [, code, slash] = req.path.match(site.LANG_PAGE);
  if (!slash) return res.redirect(301, `/${code}/`);
  sendPage(req, res, next, `${code}/index.html`);
});
// Guides and legal pages (built to dist/<path>/index.html, listed in pages.json).
let contentPages;
async function getContentPages() {
  if (!contentPages || process.env.NODE_ENV !== 'production') {
    try {
      contentPages = JSON.parse(await fs.readFile(path.join(distDir, 'pages.json'), 'utf8'));
    } catch {
      contentPages = [];
    }
  }
  return contentPages;
}
app.get(site.CONTENT_PAGE, async (req, res, next) => {
  const p = req.path.endsWith('/') ? req.path : `${req.path}/`;
  const page = (await getContentPages()).find((x) => x.path === p);
  if (!page) return next();
  if (p !== req.path) return res.redirect(301, p);
  sendPage(req, res, next, `${p.slice(1)}index.html`);
});
app.get('/app', (req, res, next) => (req.originalUrl.split('?')[0] === '/app' ? res.redirect(301, '/app/') : next()));
app.get(/^\/app\/.*/, (req, res, next) => sendPage(req, res, next, 'app/index.html'));

app.get('/robots.txt', (req, res) => {
  res.type('text/plain').send(site.robotsTxt(siteUrl(req)));
});
// Languages of the landing page, written by the build (see vite.config.mts).
let landingLangs;
async function getLandingLangs() {
  if (!landingLangs || process.env.NODE_ENV !== 'production') {
    try {
      landingLangs = JSON.parse(await fs.readFile(path.join(distDir, 'landing-langs.json'), 'utf8'));
    } catch {
      landingLangs = [{ code: 'en', path: '/' }];
    }
  }
  return landingLangs;
}

app.get('/sitemap.xml', async (req, res) => {
  res.type('application/xml').send(site.sitemapXml(siteUrl(req), await getLandingLangs(), await getContentPages()));
});

app.get(/^\/(?!api\/).*/, (_req, res) => {
  res.status(404).type('html').send(site.NOT_FOUND_HTML);
});

app.use((err, req, res, _next) => {
  if (req.path.startsWith('/api/')) log.fail(req.path.replace('/api/', ''), err.code === 'LIMIT_FILE_SIZE' ? `upload over the ${MAX_MB} MB limit` : err.message);
  res.status(err.code === 'LIMIT_FILE_SIZE' ? 413 : 500).json({ error: err.message });
});

// Jobs live in memory, so whatever a previous run left in the work dir
// (downloads, uploads cut off by a crash or restart) belongs to nobody now.
async function purgeOnStartup() {
  const names = await fs.readdir(workDir).catch(() => []);
  if (!names.length) return;
  const size = await dirSize(workDir);
  await Promise.all(names.map((n) => fs.rm(path.join(workDir, n), { recursive: true, force: true }).catch(() => {})));
  log.note('purge', `startup: removed ${names.length} leftover item${names.length === 1 ? '' : 's'} (${log.size(size)}) from ${workDir}`);
}

/** Local mode: say up front if a tool the server strips or downloads need is missing. */
function checkLocalTools() {
  const check = (cmd, args, hint) => execFile(cmd, args, (err) => {
    if (err) log.fail('local', `${cmd} not found: ${hint}`);
  });
  check('ffmpeg', ['-version'], 'server strips of videos and downloads need it (brew install ffmpeg)');
  check(process.env.YTDLP_PATH || 'yt-dlp', ['--version'], 'downloads need it (brew install yt-dlp)');
}

purgeOnStartup().catch((e) => log.fail('purge', `startup purge failed: ${e.message}`)).finally(() => app.listen(PORT, HOST, () => {
  if (local.enabled) {
    log.info(`LOCAL UNLIMITED MODE (${LOCAL_FLAG}=1): no accounts, no sign-in, no limits. Listening on 127.0.0.1 only.`);
    if (local.ignored.length) log.info(`Ignored in local mode: ${local.ignored.join(', ')}`);
    checkLocalTools();
  }
  log.info(`Sharona running on http://localhost:${PORT}  (tools at /app/)`);
  log.info('Logging every download and strip below.');
}));
