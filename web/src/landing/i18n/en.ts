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
    title: 'Remove SynthID & C2PA from AI Images and Videos · {site}',
    description:
      'Remove C2PA Content Credentials and metadata from AI images and videos made with Google Veo, Gemini, Sora, ChatGPT or Higgsfield, and disrupt the SynthID watermark. Strips EXIF, GPS and XMP too. Plus YouTube, X, TikTok and Instagram downloaders.',
    ogDescription:
      'Remove SynthID and hidden metadata from AI videos and photos from Veo, Gemini, Sora, ChatGPT and Higgsfield, on our server or on your device.',
    twitterDescription:
      'Remove SynthID and hidden metadata from AI videos and photos from Veo, Gemini, Sora, ChatGPT and Higgsfield.',
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
    menu: 'Menu',
    mobileLabel: 'Main (mobile)',
  },
  hero: {
    eyebrow: 'SynthID, C2PA & metadata remover',
    title: ['Remove SynthID & C2PA', 'from AI images and videos.'] as Pair,
    lede:
      'Drop in a photo or video from Google Veo, Gemini, Sora, ChatGPT, Higgsfield or any other AI tool. Download a copy with the C2PA Content Credentials and every other metadata tag (EXIF, GPS, XMP) deleted, and the SynthID watermark disrupted. It runs on our server or in your browser.',
    ctaStrip: 'Strip a file',
    ctaDownload: 'Download a video',
    toolsLabel: 'Tools',
    chipStrip: 'SynthID & metadata',
  },
  synthid: {
    title: ['Remove SynthID from AI videos', 'and keep the look.'] as Pair,
    lede:
      'SynthID is an invisible watermark Google adds to the pixels of images and videos made with Veo, Gemini and Imagen. {site} changes those pixels slightly to weaken the pattern, and the file looks and plays the same.',
    sourcesTitle: 'Clean files from',
    sourcesLabel: 'AI generators',
    photos: { title: 'Photos', text: 'A slight resample and sharpen changes every pixel, then the image is saved again at high quality.' },
    videos: { title: 'Videos', text: 'A high-quality re-encode (CRF 18) with a light blur, a matching sharpen and a little noise between frames.' },
    caveat: {
      title: 'No guarantees',
      text: 'SynthID is built to survive edits, so no tool can promise a detector will miss it. {site} weakens the watermark; it can’t guarantee it’s gone, or that a platform won’t label the file as AI.',
    },
    cta: 'Open the SynthID stripper',
  },
  metadata: {
    title: ['Metadata Remover', 'for photos and videos.'] as Pair,
    lede:
      'Photos and videos store where they were taken, the device, its serial number and the editing history. The metadata remover deletes all of it, strips the SynthID watermark, and lists what it removed.',
    synthidTag: 'SynthID watermark',
    photosTitle: 'Removed from photos',
    photoTags: ['EXIF', 'GPS location', 'XMP', 'IPTC', 'ICC profiles', 'C2PA / Content Credentials', 'Maker notes', 'Thumbnails', 'Text comments'],
    photoFormats: 'JPEG, PNG, WebP, HEIC/HEIF, AVIF, TIFF, GIF. HEIC comes back as JPEG.',
    videosTitle: 'Removed from videos',
    videoTags: ['Global & stream tags', 'Chapter tags', 'GPS & telemetry tracks', 'Timecode', 'Cover art', 'C2PA boxes', 'Encoder strings'],
    videoFormats: 'MP4, MOV, M4V, MKV, WebM, AVI, MTS/M2TS, TS, 3GP, WMV, FLV. Streams are copied without re-encoding.',
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
      ['Upload your file.', 'AI videos or photos, as many as you like. Server or this device.'],
      ['{site} strips it.', 'EXIF, GPS and C2PA tags are removed and the SynthID watermark is weakened.'],
      ['Download the clean copy.', 'Each file lists what was removed.'],
    ] as Pair[],
    // Labels in the looping how-it-works animation.
    flow: {
      uploading: 'Uploading…',
      stripping: 'Removing metadata · weakening SynthID…',
      clean: 'Clean · 4 items removed',
      download: 'Download',
    },
    cta: 'Open the SynthID stripper',
  },
  pricing: {
    title: ['One plan.', '{price} a month.'] as Pair,
    perMonth: '/ month',
    features: ['SynthID stripper and metadata remover', 'YouTube, X, TikTok and Instagram downloaders', 'Photos and videos in every common format'],
    billing: 'Billed monthly through Stripe. Cancel anytime.',
    stripeLabel: 'Payments by Stripe',
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
        q: 'How do I remove SynthID from AI videos?',
        a: 'Open the SynthID stripper, add your video, leave SynthID stripping on and pick Server. {site} removes the metadata, re-encodes the video at high quality with small pixel changes that weaken the watermark, and gives you a clean MP4 to download. Videos from Google Veo and Gemini carry SynthID; the same steps also clear metadata from other generators.',
      },
      {
        q: 'Which AI generators does it work with?',
        a: 'Any. Videos and photos from Google Veo, Gemini and Imagen carry a SynthID watermark. Files from Sora, ChatGPT and many other tools carry C2PA Content Credentials in the metadata. Higgsfield runs several models, including Veo, so its files can carry either. {site} removes the metadata from all of them and disrupts SynthID where it is present. It does not remove visible watermarks or logos.',
      },
      {
        q: 'Will TikTok or other platforms still label my video as AI?',
        a: 'They might. Some platforms, including TikTok, read C2PA Content Credentials to label AI content, and {site} removes those. But platforms can also use watermark detectors, their own classifiers and disclosure rules, and we have not tested how any platform labels the output. {site} does not guarantee a file will go undetected or unlabeled. Follow each platform’s rules on disclosing AI-generated content.',
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
    alternateName: ['SynthID Remover', 'SynthID Remover for AI Videos', 'Metadata Remover', 'YouTube Downloader', 'X Video Downloader', 'TikTok Downloader', 'Instagram Downloader'],
    browserRequirements: 'Requires a modern web browser with JavaScript.',
    operatingSystem: 'Any (web browser)',
    description:
      'Remove EXIF, GPS, XMP, IPTC and C2PA metadata from AI videos and photos (Google Veo, Gemini, Sora, ChatGPT, Higgsfield and more) and disrupt SynthID watermarks, on a server or on your device. Results are not guaranteed. Includes YouTube, TikTok, X and Instagram downloaders.',
    keywords:
      'remove SynthID, SynthID remover, remove SynthID from AI videos, SynthID stripper, remove C2PA, metadata remover, Veo, Gemini, Sora, ChatGPT, Higgsfield',
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
