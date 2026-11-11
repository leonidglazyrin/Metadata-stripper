// English copy for the landing page. This is the source dictionary: every
// other language follows its shape (see index.ts). The same strings feed the
// visible page, its <head> and its JSON-LD, so they always match.
//
// Pairs like ['SynthID Remover', 'that keeps the look.'] are a heading whose
// second half is drawn in the accent colour. {price} and {site} are filled in
// from content.ts.

export type Faq = { q: string; a: string };
type Pair = [string, string];
type Downloader = { title: Pair; text: string; cta: string };

export const en = {
  meta: {
    title: 'SynthID Stripper & Metadata Remover · {site}',
    description:
      '{site} is a SynthID stripper and metadata remover for photos and videos. Remove EXIF, GPS and C2PA tags and disrupt SynthID watermarks, on our server or on your device. Plus YouTube, X, TikTok and Instagram downloaders.',
    ogDescription:
      'Strip SynthID watermarks and hidden metadata from photos and videos, on our server or on your device. Plus YouTube, X, TikTok and Instagram downloaders.',
    twitterDescription:
      'Strip SynthID watermarks and hidden metadata from photos and videos. Plus YouTube, X, TikTok and Instagram downloaders.',
    ogImageAlt: '{site}: SynthID stripper and metadata remover',
  },
  nav: {
    label: 'Main',
    home: '{site} home',
    synthid: 'SynthID',
    metadata: 'Metadata',
    downloaders: 'Downloaders',
    pricing: 'Pricing',
    faq: 'FAQ',
    openTools: 'Open tools',
    language: 'Language',
  },
  hero: {
    eyebrow: 'SynthID stripping · metadata removal · video downloads',
    title: ['SynthID Stripper', '& Metadata Remover.'] as Pair,
    lede:
      'Drop in a photo or video and download a copy with EXIF, GPS and C2PA tags removed and the SynthID watermark disrupted. It runs on our server or in your browser.',
    ctaStrip: 'Strip a file',
    ctaDownload: 'Download a video',
    toolsLabel: 'Tools',
    chipStrip: 'SynthID & metadata',
  },
  synthid: {
    title: ['SynthID Remover', 'that keeps the look.'] as Pair,
    lede:
      'SynthID is an invisible watermark Google adds to the pixels of AI images and videos. {site} changes those pixels slightly to break up the pattern. The file looks and plays the same.',
    photos: { title: 'Photos', text: 'A slight resample and sharpen changes every pixel, then the image is saved again at high quality.' },
    videos: { title: 'Videos', text: 'A high-quality re-encode (CRF 18) with a light blur, a matching sharpen and a little noise between frames.' },
    caveat: {
      title: 'No guarantees',
      text: 'SynthID is built to survive edits, so no tool can promise a detector will miss it. {site} disrupts the watermark; it can’t guarantee it’s gone.',
    },
    cta: 'Open the SynthID stripper',
  },
  metadata: {
    title: ['Metadata Remover', 'for photos and videos.'] as Pair,
    lede:
      'Photos and videos store where they were taken, the device, its serial number and the editing history. The metadata remover deletes all of it and lists what it removed.',
    photosTitle: 'Removed from photos',
    photoTags: ['EXIF', 'GPS location', 'XMP', 'IPTC', 'ICC profiles', 'C2PA / Content Credentials', 'Maker notes', 'Thumbnails', 'Text comments'],
    photoFormats: 'JPEG, PNG, WebP, HEIC/HEIF, AVIF, TIFF, GIF. HEIC comes back as JPEG.',
    videosTitle: 'Removed from videos',
    videoTags: ['Global & stream tags', 'Chapter tags', 'GPS & telemetry tracks', 'Timecode', 'Cover art', 'C2PA boxes', 'Encoder strings'],
    videoFormats: 'MP4, MOV, M4V, MKV, WebM, AVI, MTS/M2TS, TS, 3GP, WMV, FLV. Streams are copied without re-encoding.',
  },
  where: {
    title: ['Server', 'or this device.'] as Pair,
    lede: 'One switch picks where your files are processed.',
    server: {
      title: 'Server',
      text: 'Your file is uploaded, cleaned and deleted right after. Works with every format, and strips SynthID from photos and videos.',
    },
    device: {
      title: 'This device',
      text: 'Your file stays in your browser. Photos are cleaned losslessly. Videos need a ~30 MB download the first time. SynthID stripping works on photos only.',
    },
  },
  downloaders: {
    label: 'Video downloaders',
    youtube: {
      title: ['YouTube', 'Downloader'],
      text: 'Paste YouTube video or Shorts links. Get an MP4 up to 1080p, or the audio as M4A.',
      cta: 'Open the YouTube Downloader',
    } as Downloader,
    x: {
      title: ['X', 'Downloader'],
      text: 'Paste an x.com or twitter.com post link and get the video from that post as MP4.',
      cta: 'Open the X Downloader',
    } as Downloader,
    tiktok: {
      title: ['TikTok', 'Downloader'],
      text: 'Paste tiktok.com links, including vm. and vt. short links. Get the video as MP4 or the sound as M4A.',
      cta: 'Open the TikTok Downloader',
    } as Downloader,
    instagram: {
      title: ['Instagram', 'Downloader'],
      text: 'Paste a Reel or video post link. Public posts work; private ones need a logged-in session.',
      cta: 'Open the Instagram Downloader',
    } as Downloader,
  },
  how: {
    title: ['How to remove SynthID', 'and metadata.'] as Pair,
    // Each step: [bold lead-in, rest of the sentence].
    steps: [
      ['Add your files.', 'Photos or videos, as many as you like.'],
      ['Pick the options.', 'Server or this device, SynthID stripping on or off.'],
      ['Download the clean copies.', 'Each file lists what was removed.'],
    ] as Pair[],
    cta: 'Open the SynthID stripper',
  },
  pricing: {
    title: ['One plan.', '{price} a month.'] as Pair,
    perMonth: '/ month',
    features: ['SynthID stripper and metadata remover', 'YouTube, X, TikTok and Instagram downloaders', 'Server and on-device processing'],
    billing: 'Billed monthly through Stripe. Cancel anytime.',
    cta: 'Open the tools',
  },
  faq: {
    title: ['SynthID stripping', 'FAQ.'] as Pair,
    items: [
      {
        q: 'What is a SynthID stripper?',
        a: 'SynthID is an invisible watermark Google adds to images and videos made with its AI models. A SynthID stripper changes the pixels slightly to break up that pattern. {site} resamples and sharpens photos, and re-encodes videos at high quality, so the file looks the same.',
      },
      {
        q: 'Does the SynthID remover always work?',
        a: 'No. SynthID is built to survive edits, and detectors keep changing. {site} disrupts the watermark, but a detector may still find it.',
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
    ] as Faq[],
  },
  downloaderFaq: {
    title: ['Downloaders', 'FAQ.'] as Pair,
    items: [
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
    ] as Faq[],
  },
  footer: {
    tagline: 'SynthID stripper, metadata remover, and YouTube, X, TikTok and Instagram downloaders.',
    open: 'Open the tools',
    disclaimer:
      'Only process and download content you own or have permission to use, and label AI-generated content where the rules require it. {site} is not affiliated with Google, YouTube, TikTok, X or Instagram.',
    badges: 'Featured on',
  },
  jsonLd: {
    name: '{site}: SynthID Stripper & Metadata Remover',
    alternateName: ['SynthID Remover', 'Metadata Remover', 'YouTube Downloader', 'X Video Downloader', 'TikTok Downloader', 'Instagram Downloader'],
    browserRequirements: 'Requires a modern web browser with JavaScript.',
    operatingSystem: 'Any (web browser)',
    description:
      'Remove EXIF, GPS, XMP, IPTC and C2PA metadata from photos and videos and disrupt SynthID watermarks, on a server or on your device. Includes YouTube, TikTok, X and Instagram downloaders.',
    featureList: [
      'SynthID stripping for photos and videos',
      'Metadata remover for EXIF, GPS, XMP, IPTC, ICC and C2PA',
      'On-device processing option',
      'YouTube downloader (MP4 up to 1080p or M4A audio)',
      'TikTok downloader',
      'X and Instagram video downloaders',
    ],
  },
};

export type Dict = typeof en;

type DeepPartial<T> = T extends readonly unknown[] ? T : T extends object ? { [K in keyof T]?: DeepPartial<T[K]> } : T;

/** Another language's dictionary. Anything it leaves out falls back to English. */
export type Translation = DeepPartial<Dict>;
