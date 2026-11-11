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

const PORT = process.env.PORT || 3000;
const MAX_MB = Number(process.env.MAX_UPLOAD_MB || 2048);

const app = express();
app.set('trust proxy', process.env.TRUST_PROXY ?? 'loopback, linklocal, uniquelocal');
let accounts;
try {
  accounts = createAccounts();
} catch (e) {
  // Missing Supabase settings: fail fast with a readable message.
  log.fail('account', e.message);
  process.exit(1);
}
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
    // Disrupt invisible pixel-level watermarks (SynthID, etc.) with the lightest
    // touch that still resamples every pixel: a near-unity resize-down→resize-up
    // cycle (lanczos3, high-fidelity) that shifts the pixel grid just enough to
    // break the watermark lattice, followed by a gentle sharpen that restores
    // any softness the resample introduced. No standalone blur pass, so fine
    // detail is preserved and the result stays visually indistinguishable.
    const meta = await sharp(input, { animated, failOn: 'none' }).metadata();
    const w = meta.width;
    const h = meta.height;
    if (w && h) {
      const shrunkW = Math.max(1, Math.round(w * 0.995));
      const shrunkH = Math.max(1, Math.round(h * 0.995));
      img = img
        .resize(shrunkW, shrunkH, { kernel: 'lanczos3' })
        .resize(w, h, { kernel: 'lanczos3' });
    }
    img = img.sharpen({ sigma: 0.5, m1: 0.3, m2: 0.2 });
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
const stripGate = [accounts.gate('server_strip'), (req, res, next) => { req.quota.refundUnlessSent(res); next(); }];

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

const downloads = createDownloadRouter(workDir, { gate: accounts.gate('download') });
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
const CONTACT_EMAIL = /^[^\s@<>"]+@[^\s@<>"]+$/.test(process.env.CONTACT_EMAIL || '') ? process.env.CONTACT_EMAIL : '';
const contactEmail = (site) => CONTACT_EMAIL || `support@${new URL(site).hostname.replace(/^www\./, '')}`;

const pageCache = new Map();
async function sendPage(req, res, next, file, status = 200) {
  try {
    let html = pageCache.get(file);
    if (html === undefined) {
      html = await fs.readFile(path.join(distDir, file), 'utf8');
      if (process.env.NODE_ENV === 'production') pageCache.set(file, html);
    }
    const site = siteUrl(req);
    res
      .status(status)
      .type('html')
      .set('Cache-Control', 'no-cache')
      .send(html.replaceAll('__SITE_URL__', site).replaceAll('__CONTACT_EMAIL__', contactEmail(site)));
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
app.get(/^\/([a-z]{2})(\/?)$/, (req, res, next) => {
  const [, code, slash] = req.path.match(/^\/([a-z]{2})(\/?)$/);
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
app.get(/^\/(guides|privacy|terms)(\/[a-z0-9-]*)*\/?$/, async (req, res, next) => {
  const p = req.path.endsWith('/') ? req.path : `${req.path}/`;
  const page = (await getContentPages()).find((x) => x.path === p);
  if (!page) return next();
  if (p !== req.path) return res.redirect(301, p);
  sendPage(req, res, next, `${p.slice(1)}index.html`);
});
app.get('/app', (req, res, next) => (req.originalUrl.split('?')[0] === '/app' ? res.redirect(301, '/app/') : next()));
app.get(/^\/app\/.*/, (req, res, next) => sendPage(req, res, next, 'app/index.html'));

app.get('/robots.txt', (req, res) => {
  res.type('text/plain').send(`User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${siteUrl(req)}/sitemap.xml\n`);
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
  const base = siteUrl(req);
  const langs = await getLandingLangs();
  // Each language version lists every other one (and x-default) as an alternate.
  const alternates = [
    ...langs.map((l) => `    <xhtml:link rel="alternate" hreflang="${l.code}" href="${base}${l.path}"/>`),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${base}/"/>`,
  ].join('\n');
  const urls = [
    ...langs.map((l) => `  <url>\n    <loc>${base}${l.path}</loc>\n    <priority>${l.path === '/' ? '1.0' : '0.9'}</priority>\n${alternates}\n  </url>`),
    `  <url>\n    <loc>${base}/app/</loc>\n    <priority>0.8</priority>\n  </url>`,
    ...(await getContentPages()).map((p) => `  <url>\n    <loc>${base}${p.path}</loc>\n    <priority>${p.priority}</priority>\n  </url>`),
  ].join('\n');
  res
    .type('application/xml')
    .send(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`);
});

app.get(/^\/(?!api\/).*/, (_req, res) => {
  res.status(404).type('html').send('<!doctype html><meta charset="utf-8"><title>Not found · Sharona</title><meta name="robots" content="noindex"><p style="font:16px system-ui;padding:40px">Page not found. <a href="/">Go to Sharona</a></p>');
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

purgeOnStartup().catch((e) => log.fail('purge', `startup purge failed: ${e.message}`)).finally(() => app.listen(PORT, () => {
  log.info(`Sharona running on http://localhost:${PORT}  (tools at /app/)`);
  log.info('Logging every download and strip below.');
}));
