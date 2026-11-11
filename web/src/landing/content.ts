// Copy for the landing page that is shared by the visible page and its JSON-LD,
// so the structured data always matches what people read.

export const SITE_NAME = 'Sharona';

export const FAQ: { q: string; a: string }[] = [
  {
    q: 'What is a SynthID stripper?',
    a: 'SynthID is an invisible watermark that Google embeds in images and videos made with its AI models. A SynthID stripper re-processes the pixels so the watermark pattern is disrupted. Sharona does this with a light resample and sharpen on photos and a near-lossless re-encode on videos, so the result looks the same to people.',
  },
  {
    q: 'Does the SynthID remover work every time?',
    a: 'No tool can promise that. SynthID is designed to survive edits, and detectors change over time, so Sharona disrupts the watermark but does not guarantee that a detector will stop finding it. Treat it as best effort, not a certainty.',
  },
  {
    q: 'What does the metadata remover take out?',
    a: 'For photos: EXIF (camera, serial numbers, timestamps, GPS location), XMP, IPTC, ICC profiles, C2PA Content Credentials, maker notes, embedded thumbnails and text comments. For videos: global, stream and chapter tags, GPS and telemetry tracks, timecode, cover art, C2PA boxes and encoder strings. Each file shows what was found and removed.',
  },
  {
    q: 'Are my files uploaded?',
    a: 'You choose. In Server mode the file is uploaded, cleaned and deleted right after, and nothing is kept. In This device mode the file never leaves your browser. On-device mode cleans photos losslessly and remuxes videos locally; SynthID stripping on this device works on photos only.',
  },
  {
    q: 'Which formats are supported?',
    a: 'Photos: JPEG, PNG, WebP, HEIC/HEIF, AVIF, TIFF and GIF (HEIC comes back as JPEG). Videos: MP4, MOV, M4V, MKV, WebM, AVI, MTS/M2TS, TS, 3GP, WMV and FLV.',
  },
  {
    q: 'Does stripping lower the quality?',
    a: 'Metadata removal alone copies video streams without re-encoding and keeps photos at high quality. SynthID stripping has to change pixels, so it is tuned to be near-lossless: visually identical in normal viewing, though not bit-for-bit the same file.',
  },
  {
    q: 'How does the YouTube downloader work?',
    a: 'Paste one or more YouTube video or Shorts links and you get an MP4 up to 1080p, or the audio only as M4A. The TikTok downloader works the same way with tiktok.com, vm. and vt. links, and there are X and Instagram downloaders too.',
  },
  {
    q: 'Is it legal to remove a SynthID watermark or download videos?',
    a: 'That depends on where you live and how you use the file. Only process and download content you own or have permission to use, and follow platform rules and any laws that require labeling AI-generated content. Downloading can break a platform’s terms of service.',
  },
];
