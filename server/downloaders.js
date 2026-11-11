'use strict';

// Link downloaders for YouTube, X (Twitter), Instagram and TikTok, all backed
// by yt-dlp. Each platform only accepts links on its own hosts, so the API
// can't be used as a generic "fetch any URL" proxy.

const express = require('express');
const { execFile } = require('child_process');
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

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    execFile(cmd, args, { maxBuffer: 16 * 1024 * 1024, timeout: 15 * 60 * 1000 }, (err, stdout, stderr) => {
      if (err) { err.stderr = stderr; return reject(err); }
      resolve(stdout);
    });
  });
}

// yt-dlp may be a binary on PATH, a path given via YTDLP_PATH, or only
// importable as a Python module (pip install into a dir that isn't on PATH).
async function runYtDlp(args) {
  if (process.env.YTDLP_PATH) return run(process.env.YTDLP_PATH, args);
  try {
    return await run('yt-dlp', args);
  } catch (e) {
    if (e.code !== 'ENOENT') throw e;
  }
  for (const py of ['python3', 'python']) {
    try {
      return await run(py, ['-m', 'yt_dlp', ...args]);
    } catch (e) {
      if (e.code === 'ENOENT' || /No module named/.test(e.stderr || '')) continue;
      throw e;
    }
  }
  const err = new Error('yt-dlp not found'); err.code = 'ENOENT'; throw err;
}

async function download(platform, url, dir, mode) {
  const audio = mode === 'audio';
  const args = [
    // Ignore the user's yt-dlp config: options like --download-archive or
    // --simulate there make it exit successfully without saving anything.
    '--ignore-config', '--no-download-archive', '--no-simulate', '--force-overwrites',
    '--no-playlist', '--no-progress',
    '--print', 'after_move:filepath',
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

  let out = '';
  try {
    out = await runYtDlp(args);
  } catch (e) {
    if (e.code === 'ENOENT') throw new Error('yt-dlp is not installed on the server (brew install yt-dlp, or pip install yt-dlp)');
    const msg = (e.stderr || e.message).trim().split('\n').filter(Boolean).pop() || 'Download failed';
    throw new Error(friendlyError(platform, msg.replace(/^ERROR:\s*(\[[^\]]+\]\s*)?([\w-]+:\s+)?/, '')));
  }
  const printed = out.trim().split('\n').map((l) => l.trim()).filter(Boolean).pop();
  if (printed && printed.startsWith(dir)) {
    try { await fs.access(printed); return printed; } catch (_) { /* fall through */ }
  }
  const files = (await fs.readdir(dir)).filter((n) => !n.endsWith('.part') && !n.endsWith('.ytdl'));
  if (files.length) return path.join(dir, files[0]);
  const last = out.trim().split('\n').filter(Boolean).pop();
  if (/max-filesize|larger than max/i.test(out)) throw new Error(`File is larger than the ${MAX_DOWNLOAD_MB} MB limit`);
  throw new Error(`Nothing was downloaded${last ? ` (yt-dlp: ${last.slice(0, 200)})` : ''}`);
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

function createDownloadRouter(workDir) {
  const router = express.Router();

  router.get('/platforms', (_req, res) => {
    res.json(Object.entries(PLATFORMS).map(([id, p]) => ({ id, label: p.label })));
  });

  router.post('/:platform', express.json({ limit: '4kb' }), async (req, res) => {
    const { platform } = req.params;
    if (!Object.hasOwn(PLATFORMS, platform)) return res.status(404).json({ error: 'Unknown platform' });
    const url = parseUrl(platform, req.body && req.body.url);
    if (!url) {
      log.fail('download', `${PLATFORMS[platform].label}: rejected link ${String((req.body && req.body.url) || '').slice(0, 200)}`);
      return res.status(400).json({ error: `Not a ${PLATFORMS[platform].label} link` });
    }
    const mode = req.body.mode === 'audio' ? 'audio' : 'video';

    const dir = path.join(workDir, crypto.randomUUID());
    const cleanup = () => fs.rm(dir, { recursive: true, force: true }).catch(() => {});
    const label = PLATFORMS[platform].label;
    const started = Date.now();
    log.start('download', `${label} ${mode} ${url}`);
    try {
      await fs.mkdir(dir, { recursive: true });
      const file = await download(platform, url, dir, mode);
      const name = path.basename(file);
      const ext = path.extname(name).toLowerCase() || (mode === 'audio' ? '.m4a' : '.mp4');
      const { size } = await fs.stat(file);
      res.setHeader('Content-Type', 'application/octet-stream');
      res.setHeader('Content-Length', size);
      res.setHeader('Content-Disposition', `attachment; filename="${safeBase(name)}${ext}"`);
      res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
      // Stream instead of buffering: YouTube videos can be large.
      const stream = createReadStream(file);
      stream.on('error', () => res.destroy());
      res.on('close', () => {
        const took = log.duration(Date.now() - started);
        if (res.writableFinished) log.ok('download', `${label} ${mode} ${url} → ${safeBase(name)}${ext} (${log.size(size)}) in ${took}`);
        else log.fail('download', `${label} ${mode} ${url} → client disconnected before the ${log.size(size)} file was sent (${took})`);
        cleanup();
      });
      stream.pipe(res);
    } catch (e) {
      log.fail('download', `${label} ${mode} ${url} after ${log.duration(Date.now() - started)}: ${e.message}`);
      await cleanup();
      res.status(502).json({ error: e.message || 'Download failed' });
    }
  });

  return router;
}

module.exports = { createDownloadRouter, parseUrl, PLATFORMS };
