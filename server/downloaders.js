'use strict';

// Link downloaders for YouTube, X (Twitter), Instagram and TikTok, all backed
// by yt-dlp. Each platform only accepts links on its own hosts, so the API
// can't be used as a generic "fetch any URL" proxy.

const express = require('express');
const { spawn } = require('child_process');
const fs = require('fs/promises');
const { createReadStream } = require('fs');
const path = require('path');
const crypto = require('crypto');
const log = require('./log');

const MAX_DOWNLOAD_MB = Number(process.env.MAX_DOWNLOAD_MB || 2048);

const PLATFORMS = {
  youtube: {
    label: 'YouTube',
    hosts: /(^|\.)(youtube\.com|youtu\.be|youtube-nocookie\.com)$/i,
    // Best H.264 up to 1080p merged with AAC so it plays everywhere; fall back
    // to whatever yt-dlp considers best.
    video: 'bv*[vcodec^=avc1][height<=1080]+ba[ext=m4a]/b[ext=mp4][height<=1080]/bv*[height<=1080]+ba/b',
  },
  x: {
    label: 'X',
    hosts: /(^|\.)(x\.com|twitter\.com|fxtwitter\.com|vxtwitter\.com|fixupx\.com)$/i,
    video: 'b[vcodec^=avc1]/bv*[vcodec^=avc1]+ba/b/bv*+ba',
  },
  instagram: {
    label: 'Instagram',
    hosts: /(^|\.)(instagram\.com|instagr\.am)$/i,
    video: 'b[vcodec^=avc1]/bv*[vcodec^=avc1]+ba/b/bv*+ba',
  },
  tiktok: {
    label: 'TikTok',
    hosts: /(^|\.)tiktok\.com$/i,
    video: 'b[vcodec^=h264]/b[vcodec^=avc]/b',
  },
};

const AUDIO_FORMAT = 'ba[ext=m4a]/ba[acodec^=mp4a]/ba/b';

function parseUrl(platform, raw) {
  let u;
  try { u = new URL(String(raw || '').trim()); } catch (_) { return null; }
  if (!['http:', 'https:'].includes(u.protocol)) return null;
  if (!PLATFORMS[platform].hosts.test(u.hostname)) return null;
  return u.toString();
}

// Run yt-dlp, handing each output line (stdout and stderr) to onLine as it
// arrives so the caller can follow progress.
function spawnLines(cmd, args, onLine, signal) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { signal, stdio: ['ignore', 'pipe', 'pipe'] });
    let stdout = '';
    let stderr = '';
    const timer = setTimeout(() => child.kill('SIGKILL'), 15 * 60 * 1000);
    const reader = (append) => {
      let buf = '';
      return (chunk) => {
        const text = chunk.toString();
        append(text);
        buf += text;
        const lines = buf.split(/\r?\n|\r/);
        buf = lines.pop();
        for (const l of lines) if (l.trim()) onLine(l.trim());
      };
    };
    child.stdout.on('data', reader((t) => { if (stdout.length < 1e6) stdout += t; }));
    child.stderr.on('data', reader((t) => { stderr = (stderr + t).slice(-64 * 1024); }));
    child.on('error', (err) => { clearTimeout(timer); err.stderr = stderr; reject(err); });
    child.on('close', (code) => {
      clearTimeout(timer);
      if (code === 0) return resolve(stdout);
      const err = new Error(signal && signal.aborted ? 'Cancelled' : `yt-dlp exited with code ${code}`);
      err.stderr = stderr;
      err.aborted = Boolean(signal && signal.aborted);
      reject(err);
    });
  });
}

// yt-dlp may be a binary on PATH, a path given via YTDLP_PATH, or only
// importable as a Python module (pip install into a dir that isn't on PATH).
async function runYtDlp(args, onLine, signal) {
  if (process.env.YTDLP_PATH) return spawnLines(process.env.YTDLP_PATH, args, onLine, signal);
  try {
    return await spawnLines('yt-dlp', args, onLine, signal);
  } catch (e) {
    if (e.code !== 'ENOENT') throw e;
  }
  for (const py of ['python3', 'python']) {
    try {
      return await spawnLines(py, ['-m', 'yt_dlp', ...args], onLine, signal);
    } catch (e) {
      if (e.code === 'ENOENT' || /No module named/.test(e.stderr || '')) continue;
      throw e;
    }
  }
  const err = new Error('yt-dlp not found'); err.code = 'ENOENT'; throw err;
}

// Marker prefixes for the lines we ask yt-dlp to print, so they can't be
// confused with its own output.
const INFO = 'MSINFO ';
const PROG = 'MSPROG ';
const FILE = 'MSFILE ';

/**
 * Download one link into dir. onEvent (optional) receives
 *   { type: 'info', title, thumbnail, parts }   once the video is resolved
 *   { type: 'progress', progress }              0..1 across all parts
 *   { type: 'processing' }                      merging / remuxing after the download
 */
async function download(platform, url, dir, mode, onEvent = () => {}, signal) {
  const audio = mode === 'audio';
  const args = [
    // Ignore the user's yt-dlp config: options like --download-archive or
    // --simulate there make it exit successfully without saving anything.
    '--ignore-config', '--no-download-archive', '--no-simulate', '--force-overwrites',
    '--no-playlist',
    // --print implies --quiet; --progress brings the progress lines back.
    '--progress', '--newline',
    '--progress-template', `download:${PROG}%(progress.downloaded_bytes)s %(progress.total_bytes)s %(progress.total_bytes_estimate)s`,
    '--print', `before_dl:${INFO}%(.{title,thumbnail,format_id})j`,
    '--print', `after_move:${FILE}%(filepath)s`,
    '--socket-timeout', '30', '--retries', '3',
    '--max-filesize', `${MAX_DOWNLOAD_MB}M`,
    '-f', audio ? AUDIO_FORMAT : PLATFORMS[platform].video,
    // Directory via -P and a length-capped name via -o. (--trim-filenames
    // would trim the *whole path*, which breaks on long temp dirs.)
    '--restrict-filenames',
    '-P', dir,
    '-o', '%(uploader,channel,id).50s_%(id)s.%(ext)s',
  ];
  if (!audio) args.push('--merge-output-format', 'mp4');
  // Instagram (and sometimes X / age-gated YouTube) need a logged-in session.
  if (process.env.YTDLP_COOKIES) args.push('--cookies', process.env.YTDLP_COOKIES);
  args.push('--', url);

  // A "137+140" format downloads video and audio one after the other, each
  // going 0 → 100%, so count parts to report one overall figure.
  let parts = 1;
  let part = 0;
  let last = 0;
  let printed = null;
  const onLine = (line) => {
    if (line.startsWith(INFO)) {
      let info = {};
      try { info = JSON.parse(line.slice(INFO.length)); } catch (_) { /* ignore */ }
      parts = Math.max(1, String(info.format_id || '').split('+').length);
      onEvent({ type: 'info', title: info.title || null, thumbnail: info.thumbnail || null, parts });
    } else if (line.startsWith(PROG)) {
      const [done, total, estimate] = line.slice(PROG.length).split(' ').map(Number);
      const size = total > 0 ? total : estimate;
      if (!(done >= 0) || !(size > 0)) return;
      const p = Math.min(1, done / size);
      if (p + 0.2 < last && part < parts - 1) part++;
      last = p;
      onEvent({ type: 'progress', progress: Math.min(1, (part + p) / parts) });
      if (p >= 1 && part === parts - 1) onEvent({ type: 'processing' });
    } else if (line.startsWith(FILE)) {
      printed = line.slice(FILE.length).trim();
    } else if (/^\[(Merger|ExtractAudio|FixupM3u8|VideoConvertor|VideoRemuxer)\]/.test(line)) {
      onEvent({ type: 'processing' });
    }
  };

  let out = '';
  try {
    out = await runYtDlp(args, onLine, signal);
  } catch (e) {
    if (e.aborted) throw e;
    if (e.code === 'ENOENT') throw new Error('yt-dlp is not installed on the server (brew install yt-dlp, or pip install yt-dlp)');
    const lines = (e.stderr || e.message).trim().split('\n').filter((l) => l.trim() && !l.includes(PROG));
    const msg = lines.pop() || 'Download failed';
    throw new Error(friendlyError(platform, msg.replace(/^ERROR:\s*(\[[^\]]+\]\s*)?([\w-]+:\s+)?/, '')));
  }
  if (printed && printed.startsWith(dir)) {
    try { await fs.access(printed); return printed; } catch (_) { /* fall through */ }
  }
  const files = (await fs.readdir(dir)).filter((n) => !n.endsWith('.part') && !n.endsWith('.ytdl'));
  if (files.length) return path.join(dir, files[0]);
  const tail = out.trim().split('\n').filter((l) => l.trim() && !l.startsWith(PROG)).pop();
  if (/max-filesize|larger than max/i.test(out)) throw new Error(`File is larger than the ${MAX_DOWNLOAD_MB} MB limit`);
  throw new Error(`Nothing was downloaded${tail ? ` (yt-dlp: ${tail.slice(0, 200)})` : ''}`);
}

function friendlyError(platform, msg) {
  if (/login|log in|sign in|cookies|rate-limit|private/i.test(msg)) {
    return `${PLATFORMS[platform].label} wants a logged-in session for this post. Set YTDLP_COOKIES on the server, or the post may be private.`;
  }
  if (/no video could be found|no video formats/i.test(msg)) return 'This post has no video to download';
  return msg;
}

function safeBase(name) {
  const base = path.basename(name, path.extname(name)).replace(/[^\w.-]+/g, '_').slice(0, 80);
  return base || 'file';
}

// Thumbnails are fetched by the server and passed on, so the page never
// hotlinks a CDN (TikTok's refuses foreign referrers). Only image hosts the
// platforms actually use are allowed, so this can't fetch arbitrary URLs.
const THUMB_HOSTS = /(^|\.)(ytimg\.com|ggpht\.com|googleusercontent\.com|twimg\.com|tiktokcdn\.com|tiktokcdn-us\.com|tiktokcdn-eu\.com|ibyteimg\.com|byteimg\.com|cdninstagram\.com|fbcdn\.net)$/i;
const MAX_THUMB_BYTES = 5 * 1024 * 1024;

function thumbAllowed(raw) {
  try {
    const u = new URL(raw);
    return u.protocol === 'https:' && THUMB_HOSTS.test(u.hostname);
  } catch (_) {
    return false;
  }
}

async function fetchThumb(url) {
  const r = await fetch(url, { redirect: 'error', signal: AbortSignal.timeout(10000), headers: { 'User-Agent': 'Mozilla/5.0' } });
  const type = r.headers.get('content-type') || '';
  if (!r.ok || !type.startsWith('image/')) throw new Error(`thumbnail HTTP ${r.status}`);
  const body = Buffer.from(await r.arrayBuffer());
  if (body.length > MAX_THUMB_BYTES) throw new Error('thumbnail too large');
  return { type, body };
}

// Finished downloads wait this long for the browser to collect them.
const JOB_TTL_MS = 10 * 60 * 1000;

function createDownloadRouter(workDir) {
  const router = express.Router();
  /** id → download job (see POST /:platform/jobs) */
  const jobs = new Map();

  const dropJob = (id) => {
    const job = jobs.get(id);
    if (!job) return;
    jobs.delete(id);
    clearTimeout(job.expiry);
    job.ctrl.abort();
    fs.rm(job.dir, { recursive: true, force: true }).catch(() => {});
  };
  const expireLater = (job) => {
    clearTimeout(job.expiry);
    job.expiry = setTimeout(() => dropJob(job.id), JOB_TTL_MS);
    job.expiry.unref();
  };

  const checkRequest = (req, res) => {
    const { platform } = req.params;
    if (!Object.hasOwn(PLATFORMS, platform)) {
      res.status(404).json({ error: 'Unknown platform' });
      return null;
    }
    const url = parseUrl(platform, req.body && req.body.url);
    if (!url) {
      log.fail('download', `${PLATFORMS[platform].label}: rejected link ${String((req.body && req.body.url) || '').slice(0, 200)}`);
      res.status(400).json({ error: `Not a ${PLATFORMS[platform].label} link` });
      return null;
    }
    return { platform, url, mode: req.body.mode === 'audio' ? 'audio' : 'video' };
  };

  // Stream a downloaded file to the browser; onClose(finished) runs once it's gone.
  const sendFile = async (res, file, mode, onClose) => {
    const name = path.basename(file);
    const ext = path.extname(name).toLowerCase() || (mode === 'audio' ? '.m4a' : '.mp4');
    const { size } = await fs.stat(file);
    const filename = `${safeBase(name)}${ext}`;
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Length', size);
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
    // Stream instead of buffering: YouTube videos can be large.
    const stream = createReadStream(file);
    stream.on('error', () => res.destroy());
    res.on('close', () => onClose(res.writableFinished, filename, size));
    stream.pipe(res);
  };

  router.get('/platforms', (_req, res) => {
    res.json(Object.entries(PLATFORMS).map(([id, p]) => ({ id, label: p.label })));
  });

  // Start a download on the server and return its id at once. The browser
  // polls GET /jobs/:id for progress and the thumbnail, then fetches
  // GET /jobs/:id/file when it's ready.
  router.post('/:platform/jobs', express.json({ limit: '4kb' }), async (req, res) => {
    const r = checkRequest(req, res);
    if (!r) return;
    const label = PLATFORMS[r.platform].label;
    const job = {
      id: crypto.randomUUID(),
      ...r,
      label,
      dir: path.join(workDir, crypto.randomUUID()),
      ctrl: new AbortController(),
      started: Date.now(),
      state: 'downloading',
      progress: null,
      title: null,
      thumbnail: null,
      thumb: null,
      error: null,
      file: null,
    };
    jobs.set(job.id, job);
    expireLater(job);
    log.start('download', `${label} ${r.mode} ${r.url}`);
    res.status(202).json({ id: job.id });

    try {
      await fs.mkdir(job.dir, { recursive: true });
      job.file = await download(r.platform, r.url, job.dir, r.mode, (ev) => {
        if (ev.type === 'info') {
          job.title = ev.title;
          if (ev.thumbnail && thumbAllowed(ev.thumbnail)) job.thumbnail = ev.thumbnail;
        } else if (ev.type === 'progress') {
          job.progress = ev.progress;
        } else if (ev.type === 'processing') {
          job.state = 'processing';
        }
      }, job.ctrl.signal);
      job.state = 'ready';
      job.progress = 1;
      expireLater(job);
    } catch (e) {
      if (!jobs.has(job.id)) return; // cancelled by the browser
      job.state = 'error';
      job.error = e.message || 'Download failed';
      log.fail('download', `${label} ${r.mode} ${r.url} after ${log.duration(Date.now() - job.started)}: ${job.error}`);
      fs.rm(job.dir, { recursive: true, force: true }).catch(() => {});
    }
  });

  router.get('/jobs/:id', (req, res) => {
    const job = jobs.get(req.params.id);
    if (!job) return res.status(404).json({ error: 'This download expired, try again' });
    res.setHeader('Cache-Control', 'no-store');
    res.json({
      state: job.state,
      progress: job.progress,
      title: job.title,
      thumbnail: Boolean(job.thumbnail),
      error: job.error,
    });
  });

  router.get('/jobs/:id/thumb', async (req, res) => {
    const job = jobs.get(req.params.id);
    if (!job || !job.thumbnail) return res.sendStatus(404);
    try {
      job.thumb = job.thumb || fetchThumb(job.thumbnail);
      const { type, body } = await job.thumb;
      res.setHeader('Content-Type', type);
      res.setHeader('Cache-Control', 'private, max-age=3600');
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.send(body);
    } catch (e) {
      job.thumb = null;
      res.sendStatus(502);
    }
  });

  router.get('/jobs/:id/file', async (req, res) => {
    const job = jobs.get(req.params.id);
    if (!job) return res.status(404).json({ error: 'This download expired, try again' });
    if (job.state !== 'ready') return res.status(409).json({ error: job.error || 'Not ready yet' });
    try {
      await sendFile(res, job.file, job.mode, (finished, filename, size) => {
        const took = log.duration(Date.now() - job.started);
        if (finished) {
          log.ok('download', `${job.label} ${job.mode} ${job.url} → ${filename} (${log.size(size)}) in ${took}`);
          dropJob(job.id);
        } else {
          // Keep the file so a retry can collect it.
          log.fail('download', `${job.label} ${job.mode} ${job.url} → client disconnected before the ${log.size(size)} file was sent (${took})`);
        }
      });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  router.delete('/jobs/:id', (req, res) => {
    const job = jobs.get(req.params.id);
    if (job && job.state !== 'ready' && job.state !== 'error') log.fail('download', `${job.label} ${job.mode} ${job.url} cancelled`);
    dropJob(req.params.id);
    res.sendStatus(204);
  });

  // One-shot download: the response is the file itself. Older clients use
  // this; the app uses the job endpoints above for progress.
  router.post('/:platform', express.json({ limit: '4kb' }), async (req, res) => {
    const r = checkRequest(req, res);
    if (!r) return;
    const { platform, url, mode } = r;
    const dir = path.join(workDir, crypto.randomUUID());
    const cleanup = () => fs.rm(dir, { recursive: true, force: true }).catch(() => {});
    const label = PLATFORMS[platform].label;
    const started = Date.now();
    log.start('download', `${label} ${mode} ${url}`);
    try {
      await fs.mkdir(dir, { recursive: true });
      const file = await download(platform, url, dir, mode);
      await sendFile(res, file, mode, (finished, filename, size) => {
        const took = log.duration(Date.now() - started);
        if (finished) log.ok('download', `${label} ${mode} ${url} → ${filename} (${log.size(size)}) in ${took}`);
        else log.fail('download', `${label} ${mode} ${url} → client disconnected before the ${log.size(size)} file was sent (${took})`);
        cleanup();
      });
    } catch (e) {
      log.fail('download', `${label} ${mode} ${url} after ${log.duration(Date.now() - started)}: ${e.message}`);
      await cleanup();
      res.status(502).json({ error: e.message || 'Download failed' });
    }
  });

  return router;
}

module.exports = { createDownloadRouter, download, parseUrl, PLATFORMS };
