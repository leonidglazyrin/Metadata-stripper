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

// Hard cap on one yt-dlp run, whatever the caller does.
const MAX_RUN_MS = Number(process.env.DOWNLOAD_MAX_MIN || 30) * 60 * 1000;

// Run yt-dlp, handing each output line (stdout and stderr) to onLine as it
// arrives so the caller can follow progress. A failure carries exitCode,
// exitSignal, timedOut and the tail of stderr so the log can say why.
// Live yt-dlp processes, so a cancel or a server shutdown can take down the
// whole process group (yt-dlp starts ffmpeg, which would otherwise linger).
const children = new Set();

function killTree(child, sig) {
  try {
    if (process.platform === 'win32') child.kill(sig);
    else process.kill(-child.pid, sig);
  } catch (_) { /* already gone */ }
}

function killAll() {
  for (const c of children) killTree(c, 'SIGKILL');
}
for (const sig of ['SIGINT', 'SIGTERM']) {
  process.once(sig, () => {
    if (children.size) log.note('download', `server stopping, killed ${children.size} running yt-dlp process${children.size === 1 ? '' : 'es'}`);
    killAll();
    process.exit(sig === 'SIGINT' ? 130 : 143);
  });
}

function spawnLines(cmd, args, onLine, signal) {
  return new Promise((resolve, reject) => {
    if (signal && signal.aborted) return reject(Object.assign(new Error('Cancelled'), { aborted: true }));
    // Own process group (detached), so killTree reaches ffmpeg too.
    const child = spawn(cmd, args, { detached: process.platform !== 'win32', stdio: ['ignore', 'pipe', 'pipe'] });
    children.add(child);
    let stdout = '';
    let stderr = '';
    let timedOut = false;
    const timer = setTimeout(() => { timedOut = true; killTree(child, 'SIGKILL'); }, MAX_RUN_MS);
    let hardKill = null;
    const onAbort = () => {
      killTree(child, 'SIGTERM');
      hardKill = setTimeout(() => killTree(child, 'SIGKILL'), 5000);
    };
    if (signal) signal.addEventListener('abort', onAbort, { once: true });
    const done = () => {
      clearTimeout(timer);
      clearTimeout(hardKill);
      children.delete(child);
      if (signal) signal.removeEventListener('abort', onAbort);
    };
    const reader = (append, stream) => {
      let buf = '';
      return (chunk) => {
        const text = chunk.toString();
        append(text);
        buf += text;
        const lines = buf.split(/\r?\n|\r/);
        buf = lines.pop();
        for (const l of lines) if (l.trim()) onLine(l.trim(), stream);
      };
    };
    child.stdout.on('data', reader((t) => { if (stdout.length < 1e6) stdout += t; }, 'stdout'));
    child.stderr.on('data', reader((t) => { stderr = (stderr + t).slice(-64 * 1024); }, 'stderr'));
    child.on('error', (err) => {
      done();
      err.stderr = stderr;
      err.aborted = Boolean(signal && signal.aborted);
      reject(err);
    });
    child.on('close', (code, sig) => {
      done();
      if (code === 0) return resolve(stdout);
      const aborted = Boolean(signal && signal.aborted);
      const err = new Error(aborted ? 'Cancelled'
        : timedOut ? `${path.basename(cmd)} killed after ${log.duration(MAX_RUN_MS)}`
          : `${path.basename(cmd)} exited with code ${code}${sig ? ` (${sig})` : ''}`);
      Object.assign(err, { stderr, stdout, exitCode: code, exitSignal: sig, timedOut, aborted });
      reject(err);
    });
  });
}

// The useful part of yt-dlp's stderr for a log line: its ERROR and WARNING
// lines (or the last few lines when there are none), progress noise removed.
function stderrSummary(stderr, max = 4) {
  const lines = String(stderr || '').split(/\r?\n|\r/).map((l) => l.trim())
    .filter((l) => l && !l.startsWith('MSPROG ') && !/^\[download\]\s+[\d.]+%/.test(l));
  const flagged = lines.filter((l) => /^(ERROR|WARNING)\b/.test(l));
  return (flagged.length ? flagged : lines).slice(-max).map((l) => l.slice(0, 300)).join(' | ');
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
  const onLine = (line, stream) => {
    onEvent({ type: 'line', line, stream });
    if (line.startsWith(INFO)) {
      let info = {};
      try { info = JSON.parse(line.slice(INFO.length)); } catch (_) { /* ignore */ }
      parts = Math.max(1, String(info.format_id || '').split('+').length);
      onEvent({ type: 'info', title: info.title || null, thumbnail: info.thumbnail || null, format: info.format_id || null, parts });
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
    const errLine = [...lines].reverse().find((l) => /^ERROR\b/.test(l.trim())) || lines.pop() || 'Download failed';
    const msg = e.timedOut ? `Took longer than ${log.duration(MAX_RUN_MS)}, gave up`
      : friendlyError(platform, errLine.trim().replace(/^ERROR:\s*(\[[^\]]+\]\s*)?([\w-]+:\s+)?/, ''));
    const err = new Error(msg);
    // For the server log: what yt-dlp actually said and how it ended.
    err.detail = `${e.message}; stderr: ${stderrSummary(e.stderr) || '(empty)'}`;
    throw err;
  }
  if (printed && printed.startsWith(dir)) {
    try { await fs.access(printed); return printed; } catch (_) { /* fall through */ }
  }
  const files = (await fs.readdir(dir)).filter((n) => !n.endsWith('.part') && !n.endsWith('.ytdl'));
  if (files.length) return path.join(dir, files[0]);
  const tail = out.trim().split('\n').filter((l) => l.trim() && !l.startsWith(PROG)).pop();
  if (/max-filesize|larger than max/i.test(out)) throw new Error(`File is larger than the ${MAX_DOWNLOAD_MB} MB limit`);
  const err = new Error(`Nothing was downloaded${tail ? ` (yt-dlp: ${tail.slice(0, 200)})` : ''}`);
  err.detail = `yt-dlp exited 0 but left no file; stdout: ${tail ? tail.slice(0, 300) : '(empty)'}`;
  throw err;
}

// Pull the audio track out of a video the server already downloaded, so
// switching a finished row to audio doesn't fetch the post again. AAC is
// copied as is (instant, lossless); anything else is encoded to AAC.
// onEvent gets { type: 'progress', progress } (0..1) and { type: 'line' }.
async function probeAudio(file) {
  const out = await spawnLines('ffprobe', ['-v', 'error', '-select_streams', 'a:0', '-show_entries', 'stream=codec_name:format=duration', '-of', 'json', file], () => {});
  const info = JSON.parse(out || '{}');
  return { codec: info.streams?.[0]?.codec_name || null, duration: Number(info.format?.duration) || 0 };
}

async function extractAudio(src, dir, onEvent = () => {}, signal) {
  let probe;
  try {
    probe = await probeAudio(src);
  } catch (e) {
    if (e.code === 'ENOENT') throw new Error('ffmpeg is not installed on the server');
    throw new Error('Could not read the downloaded video');
  }
  if (!probe.codec) throw new Error('This video has no audio track');
  const copy = probe.codec === 'aac';
  const output = path.join(dir, `${safeBase(path.basename(src))}.m4a`);
  const args = [
    '-hide_banner', '-loglevel', 'error', '-nostats', '-y',
    '-i', src, '-map', '0:a:0', '-vn', '-sn', '-dn', '-map_metadata', '-1',
    ...(copy ? ['-c:a', 'copy'] : ['-c:a', 'aac', '-b:a', '192k']),
    '-movflags', '+faststart', '-progress', 'pipe:1', output,
  ];
  const durUs = probe.duration * 1e6;
  try {
    await spawnLines('ffmpeg', args, (line) => {
      onEvent({ type: 'line', line });
      const m = /^out_time_(?:us|ms)=(\d+)/.exec(line);
      if (m && durUs > 0) onEvent({ type: 'progress', progress: Math.min(1, Number(m[1]) / durUs) });
    }, signal);
  } catch (e) {
    if (e.aborted) throw e;
    if (e.code === 'ENOENT') throw new Error('ffmpeg is not installed on the server');
    const err = new Error('Could not extract the audio');
    err.detail = `ffmpeg: ${stderrSummary(e.stderr) || e.message}`;
    throw err;
  }
  onEvent({ type: 'progress', progress: 1 });
  return { file: output, copied: copy, codec: probe.codec };
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

// How long things live on the server (all overridable in minutes):
//   DOWNLOAD_TTL_MIN    a finished file waits this long to be (re)collected,
//                       so a reloaded page can still download it
//   DOWNLOAD_STALL_MIN  a running download with no output from yt-dlp for this
//                       long is killed as hung
//   DOWNLOAD_MAX_MIN    hard cap on one download's run time
//   ERROR_TTL           failed / expired jobs are remembered this long so the
//                       page can show why
const minutes = (env, dflt) => Number(process.env[env] || dflt) * 60 * 1000;
const READY_TTL_MS = minutes('DOWNLOAD_TTL_MIN', 30);
const STALL_MS = minutes('DOWNLOAD_STALL_MIN', 5);
const ERROR_TTL_MS = 30 * 60 * 1000;
// Anything in the work dir that no job owns (strip uploads that crashed, dirs
// from a previous run) is deleted once it's this old.
const ORPHAN_MS = 60 * 60 * 1000;
const SWEEP_EVERY_MS = 60 * 1000;

const shortId = (id) => `#${id.slice(0, 8)}`;

async function dirSize(dir) {
  let total = 0;
  for (const e of await fs.readdir(dir, { withFileTypes: true }).catch(() => [])) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) total += await dirSize(p);
    else total += (await fs.stat(p).catch(() => ({ size: 0 }))).size;
  }
  return total;
}

function createDownloadRouter(workDir) {
  const router = express.Router();
  /** id → download job (see POST /:platform/jobs) */
  const jobs = new Map();

  const tag = (job) => `${shortId(job.id)} ${job.label} ${job.mode}`;
  const age = (job) => log.duration(Date.now() - job.started);

  // Forget a job and delete its files. reason is only for the log.
  const dropJob = (id, reason) => {
    const job = jobs.get(id);
    if (!job) return;
    jobs.delete(id);
    job.ctrl.abort();
    const hadFile = Boolean(job.file);
    fs.rm(job.dir, { recursive: true, force: true }).catch(() => {});
    if (reason) log.note('download', `${tag(job)} ${reason}${hadFile && job.size ? `, deleted ${log.size(job.size)}` : ''}`);
  };

  // A running job ends with an error: kill yt-dlp if needed, delete partial
  // files, but keep the record for a while so the page can show what happened.
  const failJob = (job, message, detail) => {
    if (job.state === 'error') return;
    job.state = 'error';
    job.error = message;
    job.endedAt = Date.now();
    job.expiresAt = job.endedAt + ERROR_TTL_MS;
    job.ctrl.abort();
    fs.rm(job.dir, { recursive: true, force: true }).catch(() => {});
    log.fail('download', `${tag(job)} ${job.url} after ${age(job)}: ${message}${detail && detail !== message ? `\n         ↳ ${detail}` : ''}`);
  };

  const sweep = async () => {
    const now = Date.now();
    for (const job of [...jobs.values()]) {
      if (job.state === 'downloading' || job.state === 'processing') {
        if (now - job.lastActivity > STALL_MS) {
          job.abortReason = 'stalled';
          failJob(job, `No progress for ${log.duration(STALL_MS)}, the download was stopped`,
            `hung: yt-dlp printed nothing since ${log.duration(now - job.lastActivity)} ago; last line: ${job.lastLine || '(none)'}`);
        }
      } else if (job.expiresAt && now > job.expiresAt) {
        dropJob(job.id, job.state === 'ready'
          ? `expired: file not needed after ${log.duration(READY_TTL_MS)}${job.sent ? ` (sent ${job.sent}×)` : ' (never collected)'}`
          : 'error record expired');
      }
    }
    // Orphans: files in the work dir no job owns.
    const owned = new Set([...jobs.values()].map((j) => path.basename(j.dir)));
    for (const name of await fs.readdir(workDir).catch(() => [])) {
      if (owned.has(name)) continue;
      const p = path.join(workDir, name);
      const st = await fs.stat(p).catch(() => null);
      if (!st || now - st.mtimeMs < ORPHAN_MS) continue;
      const size = st.isDirectory() ? await dirSize(p) : st.size;
      await fs.rm(p, { recursive: true, force: true }).catch(() => {});
      log.note('purge', `removed orphaned ${st.isDirectory() ? 'folder' : 'file'} ${name} (${log.size(size)}, ${log.duration(now - st.mtimeMs)} old)`);
    }
  };
  setInterval(() => { sweep().catch((e) => log.fail('purge', e.message)); }, SWEEP_EVERY_MS).unref();

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
    const from = typeof req.body.from === 'string' ? req.body.from : null;
    return { platform, url, mode: req.body.mode === 'audio' ? 'audio' : 'video', from };
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
    let finished = false;
    res.on('finish', () => { finished = true; });
    res.on('close', () => onClose(finished, filename, size));
    stream.pipe(res);
  };

  router.get('/platforms', (_req, res) => {
    res.json(Object.entries(PLATFORMS).map(([id, p]) => ({ id, label: p.label })));
  });

  // Start a download on the server and return its id at once. The browser
  // polls GET /jobs/:id for progress and the thumbnail, then fetches
  // GET /jobs/:id/file when it's ready. The page keeps the id, so after a
  // reload it picks the job up again; the file stays until READY_TTL_MS.
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
      lastActivity: Date.now(),
      lastLine: null,
      state: 'downloading',
      progress: null,
      milestone: 0,
      title: null,
      thumbnail: null,
      thumb: null,
      error: null,
      file: null,
      filename: null,
      size: null,
      expiresAt: null,
      sent: 0,
    };
    jobs.set(job.id, job);
    log.start('download', `${tag(job)} ${r.url} (started, ${jobs.size} job${jobs.size === 1 ? '' : 's'} on the server)`);
    res.status(202).json({ id: job.id });

    // Audio of a post this server already has as video: take it from that
    // file instead of downloading again (falls back to yt-dlp if it's gone).
    const source = r.from && jobs.get(r.from);
    const reuse = r.mode === 'audio' && source && source.id !== job.id && source.state === 'ready'
      && source.mode === 'video' && source.url === r.url && source.file;
    delete job.from;

    try {
      await fs.mkdir(job.dir, { recursive: true });
      let file = null;
      if (reuse && await fs.access(source.file).then(() => true, () => false)) {
        job.title = source.title;
        job.thumbnail = source.thumbnail;
        job.thumb = source.thumb;
        job.state = 'processing';
        job.step = 'extract';
        job.progress = 0;
        // Keep the video around while we read it.
        source.expiresAt = Math.max(source.expiresAt || 0, Date.now() + READY_TTL_MS);
        log.note('download', `${tag(job)} extracting audio from ${shortId(source.id)} ${source.filename}, no new download`);
        try {
          const x = await extractAudio(source.file, job.dir, (ev) => {
            job.lastActivity = Date.now();
            if (ev.type === 'progress') job.progress = ev.progress;
          }, job.ctrl.signal);
          file = x.file;
          log.note('download', `${tag(job)} audio ${x.copied ? 'copied' : `re-encoded from ${x.codec}`} in ${age(job)}`);
        } catch (e) {
          if (e.aborted || !jobs.has(job.id) || job.state === 'error') throw e;
          if (e.message === 'This video has no audio track') throw e;
          log.note('download', `${tag(job)} extraction failed (${e.detail || e.message}), downloading the audio instead`);
          await fs.rm(job.dir, { recursive: true, force: true });
          await fs.mkdir(job.dir, { recursive: true });
          job.state = 'downloading';
          job.step = null;
          job.progress = null;
        }
      }
      if (!file) file = await download(r.platform, r.url, job.dir, r.mode, (ev) => {
        if (ev.type === 'line') {
          job.lastActivity = Date.now();
          if (!ev.line.startsWith('MSPROG ')) job.lastLine = ev.line.slice(0, 200);
          if (/^WARNING\b/.test(ev.line)) log.note('download', `${tag(job)} yt-dlp ${ev.line.slice(0, 300)}`);
        } else if (ev.type === 'info') {
          job.title = ev.title;
          if (ev.thumbnail && thumbAllowed(ev.thumbnail)) job.thumbnail = ev.thumbnail;
          log.note('download', `${tag(job)} resolved "${(ev.title || '?').slice(0, 80)}" format ${ev.format || '?'}`);
        } else if (ev.type === 'progress') {
          job.progress = ev.progress;
          const step = Math.floor(ev.progress * 4) * 25; // 25 / 50 / 75 / 100
          if (step > job.milestone && step < 100) {
            job.milestone = step;
            log.note('download', `${tag(job)} ${step}% after ${age(job)}`);
          }
        } else if (ev.type === 'processing' && job.state !== 'processing') {
          job.state = 'processing';
          log.note('download', `${tag(job)} downloaded, merging / remuxing after ${age(job)}`);
        }
      }, job.ctrl.signal);
      if (!jobs.has(job.id) || job.state === 'error') { fs.rm(job.dir, { recursive: true, force: true }).catch(() => {}); return; }
      const name = path.basename(file);
      const ext = path.extname(name).toLowerCase() || (r.mode === 'audio' ? '.m4a' : '.mp4');
      job.file = file;
      job.filename = `${safeBase(name)}${ext}`;
      job.size = (await fs.stat(file)).size;
      job.state = 'ready';
      job.progress = 1;
      job.endedAt = Date.now();
      job.expiresAt = job.endedAt + READY_TTL_MS;
      log.ok('download', `${tag(job)} ${r.url} → ${job.filename} (${log.size(job.size)}) ready on the server in ${age(job)}, kept ${log.duration(READY_TTL_MS)}`);
    } catch (e) {
      if (!jobs.has(job.id) || job.state === 'error') return; // cancelled, or already failed by the sweeper
      failJob(job, e.message || 'Download failed', e.detail);
    }
  });

  router.get('/jobs/:id', (req, res) => {
    const job = jobs.get(req.params.id);
    res.setHeader('Cache-Control', 'no-store');
    if (!job) return res.status(404).json({ error: 'Expired: the server no longer has this download', expired: true });
    res.json({
      state: job.state,
      progress: job.progress,
      title: job.title,
      step: job.step || null,
      thumbnail: Boolean(job.thumbnail),
      error: job.error,
      url: job.url,
      mode: job.mode,
      filename: job.filename,
      size: job.size,
      expiresAt: job.expiresAt,
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
    if (!job) return res.status(404).json({ error: 'Expired: the server no longer has this download', expired: true });
    if (job.state !== 'ready') return res.status(409).json({ error: job.error || 'Not ready yet' });
    try {
      // The file stays after it's sent, so a reloaded page can fetch it again
      // until it expires (or the user removes the row).
      await sendFile(res, job.file, job.mode, (finished, filename, size) => {
        if (finished) {
          job.sent++;
          log.ok('download', `${tag(job)} sent ${filename} (${log.size(size)}) to the browser${job.sent > 1 ? ` (${job.sent}×)` : ''}`);
        } else {
          log.fail('download', `${tag(job)} browser disconnected before the ${log.size(size)} file was sent; kept for a retry`);
        }
      });
    } catch (e) {
      log.fail('download', `${tag(job)} could not send the file: ${e.message}`);
      res.status(500).json({ error: e.message });
    }
  });

  router.delete('/jobs/:id', (req, res) => {
    const job = jobs.get(req.params.id);
    if (job) dropJob(job.id, job.state === 'ready' || job.state === 'error' ? 'removed by the user' : `cancelled by the user after ${age(job)}`);
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
      log.fail('download', `${label} ${mode} ${url} after ${log.duration(Date.now() - started)}: ${e.message}${e.detail ? `\n         ↳ ${e.detail}` : ''}`);
      await cleanup();
      res.status(502).json({ error: e.message || 'Download failed' });
    }
  });

  return router;
}

module.exports = { createDownloadRouter, download, extractAudio, parseUrl, PLATFORMS, stderrSummary, dirSize };
