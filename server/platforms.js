'use strict';

// The sites the downloader accepts, and how a link is checked. Shared by the
// container (server/downloaders.js) and the Worker (worker/app.mjs), which
// turns a bad link away before it can reach the container. Each platform
// only accepts links on its own hosts, so the API can't be used as a generic
// "fetch any URL" proxy.

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

module.exports = { PLATFORMS, AUDIO_FORMAT, parseUrl };
