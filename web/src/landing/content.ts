// Copy for the landing page that is shared by the visible page and its JSON-LD,
// so the structured data always matches what people read.

export const SITE_NAME = 'Sharona';

export type Faq = { q: string; a: string };

export const FAQ: Faq[] = [
  {
    q: 'What is a SynthID stripper?',
    a: 'SynthID is an invisible watermark Google adds to images and videos made with its AI models. A SynthID stripper changes the pixels slightly to break up that pattern. Sharona resamples and sharpens photos, and re-encodes videos at high quality, so the file looks the same.',
  },
  {
    q: 'Does the SynthID remover always work?',
    a: 'No. SynthID is built to survive edits, and detectors keep changing. Sharona disrupts the watermark, but a detector may still find it.',
  },
  {
    q: 'What does the metadata remover take out?',
    a: 'From photos: EXIF (camera, serial number, time, GPS), XMP, IPTC, ICC profiles, C2PA Content Credentials, maker notes, embedded thumbnails and comments. From videos: global, stream and chapter tags, GPS and telemetry tracks, timecode, cover art, C2PA boxes and encoder strings. Each file shows a list of what was removed.',
  },
  {
    q: 'Are my files uploaded?',
    a: 'Only if you pick Server. In Server mode the file is uploaded, cleaned and deleted straight away. In This device mode it stays in your browser. On your device, photos are cleaned losslessly and videos are remuxed; SynthID stripping on your device works on photos only.',
  },
  {
    q: 'Which formats are supported?',
    a: 'Photos: JPEG, PNG, WebP, HEIC/HEIF, AVIF, TIFF and GIF (HEIC is saved as JPEG). Videos: MP4, MOV, M4V, MKV, WebM, AVI, MTS/M2TS, TS, 3GP, WMV and FLV.',
  },
  {
    q: 'Does stripping lower the quality?',
    a: 'Removing metadata copies the video streams without re-encoding and saves photos at high quality. SynthID stripping has to change pixels, so the file is not byte-identical, but you will not see a difference in normal viewing.',
  },
  {
    q: 'Is it legal to remove a SynthID watermark?',
    a: 'It depends on where you live and how you use the file. Only process content you own or have permission to use, and label AI-generated content where the law or a platform requires it.',
  },
];

export const DOWNLOADER_FAQ: Faq[] = [
  {
    q: 'How do I download a YouTube video?',
    a: 'Open the YouTube downloader, paste a video or Shorts link and press Download. You get an MP4 up to 1080p, or pick Audio only for an M4A file. You can paste several links at once.',
  },
  {
    q: 'How do I download a video from X (Twitter)?',
    a: 'Copy the link of the post (x.com or twitter.com) and paste it into the X downloader. You get the video attached to that post as an MP4.',
  },
  {
    q: 'Does the TikTok downloader work with short links?',
    a: 'Yes. Paste a tiktok.com link or a vm.tiktok.com / vt.tiktok.com short link and you get the video as MP4, or the sound as M4A.',
  },
  {
    q: 'Why does an Instagram or X link fail?',
    a: 'Private posts and some public ones need a logged-in session. If a post is private, or the platform asks for a login, the download fails with a message saying so.',
  },
  {
    q: 'Can I download audio only?',
    a: 'Yes. Every downloader has a Video / Audio only switch. Audio only gives you an M4A file.',
  },
  {
    q: 'Do you keep the videos I download?',
    a: 'No. Each video is fetched on our server, sent to you, and deleted right after.',
  },
  {
    q: 'Is it legal to download videos?',
    a: 'Only download videos you own or have permission to use. Downloading can break a platform’s terms of service, and copyright rules depend on where you live.',
  },
];
