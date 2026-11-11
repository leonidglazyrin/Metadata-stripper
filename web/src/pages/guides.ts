// Guides: indexable how-to pages under /guides/<slug>/. Each one is plain
// data rendered by GuidePage.tsx, so the visible text, the <head> and the
// JSON-LD always come from the same strings.
//
// Inline markup in any string: `code` and [link text](/path/ or https://...).
// {site} is replaced with the site name.

export type Block =
  | { p: string }
  | { ul: string[] }
  | { ol: string[] }
  | { code: string }
  | { note: string };

export type Section = { h: string; blocks: Block[] };

export type Guide = {
  slug: string;
  kind: 'download' | 'privacy';
  /** The page's <h1>. */
  title: string;
  /** <title>, kept under ~60 characters. */
  metaTitle: string;
  /** Meta description, ~150 characters. */
  description: string;
  /** Short label for link lists. */
  short: string;
  /** Tool in the app the guide points to (/app/#<tool>). */
  tool: 'strip' | 'youtube' | 'tiktok' | 'x' | 'instagram';
  cta: string;
  intro: string[];
  /** The numbered "how to" steps, also used for HowTo structured data. */
  steps: { name: string; text: string }[];
  sections: Section[];
  faq: { q: string; a: string }[];
  related: string[];
  /** ISO date the guide was last reviewed. */
  updated: string;
};

const UPDATED = '2026-11-11';

const LEGAL_DL: Section = {
  h: 'Is it legal?',
  blocks: [
    {
      p: 'Only download videos you made yourself, that are licensed for reuse (for example Creative Commons), or that the owner has given you permission to use. Most platforms’ terms of service restrict downloading, and copyright law differs from country to country. Saving a video does not give you the right to re-upload it, and {site} is not affiliated with any of the platforms below.',
    },
  ],
};

export const GUIDES: Guide[] = [
  // ---------------------------------------------------------------- downloads
  {
    slug: 'download-youtube-videos',
    kind: 'download',
    title: 'How to download YouTube videos and Shorts as MP4',
    metaTitle: 'How to Download YouTube Videos & Shorts (MP4, 1080p)',
    description:
      'Save a YouTube video or Short as an MP4 up to 1080p, or as M4A audio, by pasting its link. Works with youtube.com, youtu.be and Shorts links. No app to install.',
    short: 'Download YouTube videos and Shorts',
    tool: 'youtube',
    cta: 'Open the YouTube downloader',
    intro: [
      'The quickest way to save a YouTube video is to copy its link and paste it into a downloader that does the work on a server. {site} fetches the best version up to 1080p, merges the picture and sound into one MP4 that plays on any phone or computer, and sends it to you. You can also keep only the audio as an M4A file.',
    ],
    steps: [
      { name: 'Copy the link', text: 'On a computer, copy the address from the browser bar. In the YouTube app, tap Share under the video (or on a Short) and choose Copy link.' },
      { name: 'Open the YouTube downloader', text: 'Go to the YouTube tab in {site} and sign in with Google.' },
      { name: 'Paste and pick a format', text: 'Paste one or several links, one per line. Leave the switch on Video for an MP4, or pick Audio only for an M4A file.' },
      { name: 'Download', text: 'Press Download. Each link shows its title and progress, then a Save button when the file is ready.' },
    ],
    sections: [
      {
        h: 'Which links work',
        blocks: [
          {
            ul: [
              'Regular videos: `youtube.com/watch?v=…`',
              'Short links: `youtu.be/…`',
              'Shorts: `youtube.com/shorts/…`',
              'Embedded players: `youtube-nocookie.com/embed/…`',
              'Mobile links: `m.youtube.com/…`',
            ],
          },
          {
            p: 'Links with extra parameters, such as a timestamp (`&t=42`) or a playlist (`&list=…`), are fine: the video in the link is the one you get. Whole playlists are not downloaded in one go; paste the individual video links instead.',
          },
        ],
      },
      {
        h: 'Quality and format',
        blocks: [
          {
            p: 'YouTube stores the picture and the sound separately for most videos above 360p. The downloader picks the best H.264 picture up to 1080p and the AAC sound, then joins them into one MP4. H.264 and AAC play everywhere: iPhone, Android, Windows, Mac, editing apps and social apps.',
          },
          {
            p: 'If a video has no H.264 version at 1080p, you get the best version YouTube offers up to 1080p. Videos uploaded in a lower resolution come back at that resolution; a downloader cannot add detail that was never uploaded.',
          },
        ],
      },
      {
        h: 'When a download fails',
        blocks: [
          {
            ul: [
              'Private and members-only videos cannot be downloaded.',
              'Age-restricted videos and some region-locked videos need a signed-in YouTube account, so they may fail.',
              'Live streams can only be saved once the stream has ended and YouTube has processed it.',
              'Premieres that have not started yet have nothing to download.',
            ],
          },
        ],
      },
      LEGAL_DL,
    ],
    faq: [
      { q: 'Can I download YouTube Shorts?', a: 'Yes. Paste a youtube.com/shorts/ link the same way as a normal video and you get a vertical MP4.' },
      { q: 'Can I download only the audio?', a: 'Yes. Set the switch to Audio only and you get the sound as an M4A file. When the platform stores AAC audio, it is copied without re-encoding.' },
      { q: 'Why is the video 1080p and not 4K?', a: 'The downloader caps videos at 1080p so files stay small and play everywhere. Most phones and social apps show video at 1080p or below.' },
      { q: 'Do I need to install anything?', a: 'No. Everything runs in the browser and on the {site} server, on any phone or computer.' },
    ],
    related: ['download-audio-from-videos', 'download-tiktok-videos', 'remove-metadata-from-videos'],
    updated: UPDATED,
  },
  {
    slug: 'download-tiktok-videos',
    kind: 'download',
    title: 'How to download TikTok videos as MP4',
    metaTitle: 'How to Download TikTok Videos (MP4 or M4A Sound)',
    description:
      'Save a public TikTok video as an MP4, or its sound as M4A, from a tiktok.com, vm.tiktok.com or vt.tiktok.com link. Step by step, on phone or computer.',
    short: 'Download TikTok videos',
    tool: 'tiktok',
    cta: 'Open the TikTok downloader',
    intro: [
      'TikTok only offers its own Save video button when the creator allows it, and the saved copy carries a moving watermark. Pasting the link into {site} instead gets you the video as an MP4 file, or the sound on its own as M4A, for any public video.',
    ],
    steps: [
      { name: 'Copy the link', text: 'In the TikTok app, tap Share (the arrow on the right) and choose Copy link. On a computer, copy the address of the video page.' },
      { name: 'Open the TikTok downloader', text: 'Go to the TikTok tab in {site} and sign in with Google.' },
      { name: 'Paste the link', text: 'Paste one link, or several on separate lines. Choose Video for MP4 or Audio only for the sound as M4A.' },
      { name: 'Save the file', text: 'Press Download and save each file when it is ready. On iPhone, open the file and use Share then Save Video to put it in Photos.' },
    ],
    sections: [
      {
        h: 'Which links work',
        blocks: [
          {
            ul: [
              'Full links: `tiktok.com/@account/video/…`',
              'App share links: `vm.tiktok.com/…` and `vt.tiktok.com/…`',
              'Mobile web links: `m.tiktok.com/…`',
            ],
          },
          { p: 'Short share links are followed to the video they point to, so you can paste exactly what the app copies.' },
        ],
      },
      {
        h: 'What you get',
        blocks: [
          {
            p: 'The video comes back as an MP4 in the quality TikTok serves, preferring H.264 so it plays everywhere.',
          },
          {
            p: 'Audio only keeps the video’s soundtrack as an M4A file. For a trending sound used in many videos, any video that uses it works.',
          },
        ],
      },
      {
        h: 'What does not work',
        blocks: [
          {
            ul: [
              'Videos from private accounts, and videos shared only with friends.',
              'Deleted videos, or videos not available in the server’s region.',
              'Live streams and photo slideshows (carousels of still images).',
            ],
          },
        ],
      },
      LEGAL_DL,
    ],
    faq: [
      { q: 'Do vm.tiktok.com short links work?', a: 'Yes. Paste vm.tiktok.com or vt.tiktok.com links straight from the app’s Copy link button.' },
      { q: 'Can I download only the sound?', a: 'Yes. Set the switch to Audio only to get the soundtrack as M4A.' },
      { q: 'Can I download private TikTok videos?', a: 'No. Only public videos are supported.' },
      { q: 'Does the creator get notified?', a: 'No. {site} reads the public video page like a browser does; nothing is posted to TikTok.' },
    ],
    related: ['download-audio-from-videos', 'download-instagram-reels', 'remove-metadata-from-videos'],
    updated: UPDATED,
  },
  {
    slug: 'download-twitter-x-videos',
    kind: 'download',
    title: 'How to download videos from X (Twitter)',
    metaTitle: 'How to Download Videos from X (Twitter) as MP4',
    description:
      'Save the video from an X (Twitter) post as an MP4 by pasting the post link. Works with x.com and twitter.com links, on phone or computer.',
    short: 'Download videos from X (Twitter)',
    tool: 'x',
    cta: 'Open the X downloader',
    intro: [
      'X has no download button for videos. To keep one, copy the link of the post and paste it into {site}: you get the video attached to that post as an MP4, in the best quality X serves.',
    ],
    steps: [
      { name: 'Copy the post link', text: 'Tap the share icon under the post and choose Copy link. On a computer you can also copy the address of the post page.' },
      { name: 'Open the X downloader', text: 'Go to the X tab in {site} and sign in with Google.' },
      { name: 'Paste the link', text: 'Paste one or several post links. Choose Video for MP4 or Audio only for M4A.' },
      { name: 'Save the file', text: 'Press Download and save the file when it is ready.' },
    ],
    sections: [
      {
        h: 'Which links work',
        blocks: [
          {
            ul: [
              'Post links on either domain: `x.com/account/status/…` or `twitter.com/account/status/…`',
              'Links from embed-fixing services: `fxtwitter.com`, `vxtwitter.com`, `fixupx.com`',
            ],
          },
          {
            p: 'Paste the link of the post that contains the video. If you are looking at a reply or a quote post, open the original post first and copy its link. Animated GIFs on X are stored as short videos, so they download as MP4 too.',
          },
        ],
      },
      {
        h: 'When a download fails',
        blocks: [
          {
            ul: [
              'Posts from protected (private) accounts cannot be downloaded.',
              'Posts marked as sensitive, age-restricted posts and some posts X only shows to signed-in users may fail.',
              'Deleted posts and suspended accounts have nothing left to download.',
              'A post that only links to a YouTube video has no X video; use the [YouTube downloader](/guides/download-youtube-videos/) instead.',
            ],
          },
        ],
      },
      LEGAL_DL,
    ],
    faq: [
      { q: 'Do twitter.com links still work?', a: 'Yes. x.com and twitter.com links both work.' },
      { q: 'What quality do I get?', a: 'The highest quality X makes available for that video, as an MP4 with H.264 picture where possible.' },
      { q: 'Can I download videos from private accounts?', a: 'No. Only public posts are supported.' },
    ],
    related: ['download-youtube-videos', 'download-audio-from-videos', 'remove-metadata-from-videos'],
    updated: UPDATED,
  },
  {
    slug: 'download-instagram-reels',
    kind: 'download',
    title: 'How to download Instagram Reels and videos',
    metaTitle: 'How to Download Instagram Reels & Videos (MP4)',
    description:
      'Save a public Instagram Reel or video post as an MP4 by pasting its link. Step by step for iPhone, Android and computer. Private accounts are not supported.',
    short: 'Download Instagram Reels',
    tool: 'instagram',
    cta: 'Open the Instagram downloader',
    intro: [
      'Instagram lets you save posts inside the app, but not as files you can keep or edit. To get a Reel or a video post as an MP4, copy its link and paste it into {site}. This works for public posts only.',
    ],
    steps: [
      { name: 'Copy the link', text: 'In the Instagram app, tap the paper-plane Share icon on the Reel or post, then Copy link. On a computer, copy the address of the post page.' },
      { name: 'Open the Instagram downloader', text: 'Go to the Instagram tab in {site} and sign in with Google.' },
      { name: 'Paste the link', text: 'Paste one or several links. Choose Video for MP4 or Audio only for M4A.' },
      { name: 'Save the file', text: 'Press Download and save the file. On iPhone, open it and use Share then Save Video to add it to Photos.' },
    ],
    sections: [
      {
        h: 'Which links work',
        blocks: [
          {
            ul: [
              'Reels: `instagram.com/reel/…`',
              'Video posts: `instagram.com/p/…`',
              'Short links: `instagr.am/…`',
            ],
          },
        ],
      },
      {
        h: 'Private videos are not available',
        blocks: [
          {
            p: 'The downloader only reads what Instagram shows to visitors who are not signed in. That rules out:',
          },
          {
            ul: [
              'Posts and Reels from private accounts.',
              'Stories, Highlights and Close Friends content.',
              'Some public posts that Instagram only shows after you sign in, such as age-restricted posts.',
            ],
          },
          { p: 'If a link fails with a message about a private post or a login, the video is not available to the downloader.' },
        ],
      },
      {
        h: 'Carousels with several videos',
        blocks: [{ p: 'For a post with several slides, the downloader saves the video it finds in the post. Photo-only posts have no video to download.' }],
      },
      LEGAL_DL,
    ],
    faq: [
      { q: 'Can I download Instagram Stories?', a: 'No. Stories need a signed-in Instagram session, which the downloader does not use.' },
      { q: 'Can I download from a private account?', a: 'No. Only public Reels and video posts are supported.' },
      { q: 'Can I keep only the music from a Reel?', a: 'Yes. Set the switch to Audio only to get the soundtrack as M4A.' },
    ],
    related: ['download-tiktok-videos', 'download-audio-from-videos', 'remove-metadata-from-videos'],
    updated: UPDATED,
  },
  {
    slug: 'download-audio-from-videos',
    kind: 'download',
    title: 'How to download audio from YouTube, TikTok, X and Instagram',
    metaTitle: 'Download Audio from YouTube, TikTok & Instagram (M4A)',
    description:
      'Keep only the sound of a YouTube, TikTok, X or Instagram video as an M4A file. Paste the link, switch to Audio only and download. No app needed.',
    short: 'Download audio only (M4A)',
    tool: 'youtube',
    cta: 'Open the downloaders',
    intro: [
      'Every {site} downloader has a Video / Audio only switch. With Audio only, you get the video’s original soundtrack as an M4A file: usually the AAC audio the platform already stores, copied without being re-encoded, so there is no quality loss. If a platform serves another codec, it is converted to AAC at high quality.',
    ],
    steps: [
      { name: 'Copy the video link', text: 'Use the Share then Copy link button in the YouTube, TikTok, X or Instagram app, or copy the page address on a computer.' },
      { name: 'Open the matching downloader', text: 'Pick the tab for that platform in {site}.' },
      { name: 'Switch to Audio only', text: 'Set the switch above the link box to Audio only and paste the link.' },
      { name: 'Download the M4A', text: 'Press Download and save the file. M4A plays in Apple Music, VLC, Windows Media Player and most editing apps.' },
    ],
    sections: [
      {
        h: 'Why M4A and not MP3',
        blocks: [
          {
            p: 'These platforms almost always store sound as AAC. M4A is simply AAC in an MP4-style file, so it can be saved as-is. Turning it into MP3 would mean decoding and compressing it again, which loses a little quality and gains nothing: every current phone, computer and editing app plays M4A.',
          },
          { p: 'If you need an MP3 for an old device, convert the M4A with a free tool such as VLC (Media → Convert / Save) or ffmpeg:' },
          { code: 'ffmpeg -i sound.m4a -c:a libmp3lame -q:a 2 sound.mp3' },
        ],
      },
      {
        h: 'Already have the video?',
        blocks: [
          {
            p: 'Each finished video download in {site} also has a Get audio button, which pulls the soundtrack out of the MP4 you just downloaded.',
          },
        ],
      },
      LEGAL_DL,
    ],
    faq: [
      { q: 'Is the audio re-encoded?', a: 'Not when the platform serves AAC, which is the usual case: the stream is copied into an M4A file as it is. Other codecs are converted to AAC.' },
      { q: 'Can I download a whole playlist as audio?', a: 'Not in one go. Paste the individual video links, one per line.' },
    ],
    related: ['download-youtube-videos', 'download-tiktok-videos', 'download-instagram-reels'],
    updated: UPDATED,
  },

  // ------------------------------------------------------------------ privacy
  {
    slug: 'remove-gps-location-from-photos',
    kind: 'privacy',
    title: 'How to remove the GPS location from photos',
    metaTitle: 'How to Remove GPS Location from Photos (iPhone, Android, PC)',
    description:
      'Photos can store the exact place they were taken. Learn how to check for GPS data and remove it on iPhone, Android, Windows and Mac, or in one step for any photo.',
    short: 'Remove GPS location from photos',
    tool: 'strip',
    cta: 'Remove location data now',
    intro: [
      'Most phones save the exact latitude and longitude in every photo they take, often to within a few metres. Anyone who gets the original file can read it and put a pin on a map: your home, your school, your workplace. Some apps remove it when you post, but email, messaging apps that send “original quality”, cloud links and marketplaces often keep it.',
      'This guide shows how to check a photo for location data and remove it, either with the settings already on your phone or computer, or in one step with the {site} metadata remover.',
    ],
    steps: [
      { name: 'Open the metadata remover', text: 'Go to the Strip tab in {site}.' },
      { name: 'Add your photos', text: 'Drop in one or many photos: JPEG, PNG, WebP, HEIC, AVIF, TIFF or GIF.' },
      { name: 'Choose where it runs', text: 'Pick This device to clean the files in your browser without uploading them, or Server to process them on {site} and have them deleted straight after.' },
      { name: 'Download the clean copies', text: 'All metadata, including the GPS block, is removed from every file. Download and share the clean copy instead of the original.' },
    ],
    sections: [
      {
        h: 'Where the location is stored',
        blocks: [
          {
            p: 'In JPEG, HEIC and TIFF photos the location lives in the EXIF GPS block: latitude, longitude, altitude, direction the camera faced, and a GPS timestamp. It can also be copied into XMP metadata by editing apps, and some phones write it into the embedded thumbnail’s metadata too. Removing only one of them can leave the others behind, which is why a full strip is safer than deleting one field.',
          },
        ],
      },
      {
        h: 'How to check if a photo has a location',
        blocks: [
          {
            ul: [
              'iPhone: open the photo in Photos and swipe up. If a map appears, the photo has a location.',
              'Android (Google Photos): open the photo, swipe up and look for a map or place name.',
              'Windows: right-click the file, Properties, Details tab, and look under GPS.',
              'Mac: open it in Preview, Tools then Show Inspector, and look for a GPS tab.',
            ],
          },
        ],
      },
      {
        h: 'Remove it with your phone or computer’s own settings',
        blocks: [
          {
            ul: [
              'iPhone, when sharing: select the photos, tap Share, tap Options at the top of the sheet and turn off Location. This only affects that share.',
              'iPhone, for future photos: Settings, Privacy & Security, Location Services, Camera, set to Never.',
              'Android: open the Camera app’s settings and turn off the location or geotag option (the name varies by phone). In Google Photos, Settings then Sharing has an option to remove location from items you share by link.',
              'Windows: right-click the file, Properties, Details, then Remove Properties and Personal Information. Choose to create a copy with all possible properties removed.',
              'Mac: in Preview, Tools, Show Inspector, GPS tab, then Remove Location Info.',
            ],
          },
          {
            note: 'These built-in options mostly remove the GPS fields only. The camera model, serial number, dates and editing history usually stay in the file.',
          },
        ],
      },
      {
        h: 'Remove it with exiftool (command line)',
        blocks: [
          { p: 'If you are comfortable with a terminal, the free exiftool removes the GPS block, or everything, in place. It keeps a backup ending in `_original`.' },
          { code: 'exiftool -gps:all= -xmp:geotag= photo.jpg   # location only\nexiftool -all= photo.jpg                     # all metadata' },
        ],
      },
      {
        h: 'What else a photo can give away',
        blocks: [
          {
            p: 'Location is the most sensitive field, but the same file can also carry the phone or camera model and its serial number, the exact date and time, the software it was edited with, your name or copyright line, face-tag regions from photo apps, and a small preview of the uncropped original. See [how to remove EXIF data](/guides/remove-exif-data-from-photos/) for the full list.',
          },
        ],
      },
    ],
    faq: [
      { q: 'Do Instagram and Facebook remove the location from photos?', a: 'Large social apps generally strip EXIF data, including GPS, from the copy they show to other people. Files sent by email, cloud links, some chat apps in original-quality mode, and many forums and marketplaces can keep it, so it is safer to clean the file before you send it.' },
      { q: 'Does a screenshot have location data?', a: 'Usually not, because the screenshot is a new image. But it can still show a location inside the picture itself, such as a street sign or a map.' },
      { q: 'Will the photo look different afterwards?', a: 'No. The clean copy is saved at high quality and looks the same in normal viewing; only the hidden data is gone.' },
    ],
    related: ['remove-exif-data-from-photos', 'remove-metadata-from-iphone-photos', 'remove-metadata-from-videos'],
    updated: UPDATED,
  },
  {
    slug: 'remove-exif-data-from-photos',
    kind: 'privacy',
    title: 'How to remove EXIF data and other metadata from photos',
    metaTitle: 'How to Remove EXIF Data & Metadata from Photos',
    description:
      'What EXIF, XMP, IPTC and ICC metadata reveal about you, how to view it, and how to remove all of it from JPEG, PNG, HEIC, WebP and other photos.',
    short: 'Remove EXIF data from photos',
    tool: 'strip',
    cta: 'Strip photo metadata now',
    intro: [
      'EXIF is the block of information a camera or phone writes into every photo: the device, the settings, the date and, often, the place. Editing apps add their own layers on top (XMP and IPTC), and some files carry C2PA Content Credentials with an editing history. None of it is visible in the picture, but anyone with the file can read it.',
    ],
    steps: [
      { name: 'Open the metadata remover', text: 'Go to the Strip tab in {site}.' },
      { name: 'Add the photos', text: 'Drop in your files. Batches are fine.' },
      { name: 'Pick This device or Server', text: 'This device cleans the photos in your browser and never uploads them. Server processes them on {site} and deletes them right after.' },
      { name: 'Download the clean copy', text: 'Every file comes back without EXIF, GPS, XMP, IPTC, ICC, C2PA, maker notes, thumbnails or comments.' },
    ],
    sections: [
      {
        h: 'What photo metadata contains',
        blocks: [
          {
            ul: [
              'EXIF: camera or phone make and model, lens, serial numbers, exposure settings, the date and time the photo was taken and edited, and GPS location.',
              'Maker notes: a manufacturer-specific EXIF area that can hold extra identifiers, such as an internal serial number or shutter count.',
              'XMP: written by editing apps such as Lightroom and Photoshop. Can include your name, edit history, ratings, keywords and a copy of the GPS data.',
              'IPTC: captions, credits, copyright, the photographer’s name and contact details, and the Digital Source Type field some tools use to mark AI-generated images.',
              'ICC profile: describes the colours. Mostly harmless, but some profiles name the device or software that made them.',
              'Embedded thumbnail: a small preview stored inside the file. It may show the photo before it was cropped or edited.',
              'C2PA Content Credentials: a signed record of where the image came from and how it was edited. See [removing C2PA](/guides/remove-c2pa-content-credentials/).',
              'Comments and text chunks: PNG files in particular can carry free-form text, such as the prompt and settings used by an AI image generator.',
            ],
          },
        ],
      },
      {
        h: 'Formats {site} cleans',
        blocks: [
          {
            p: 'JPEG, PNG, WebP, HEIC/HEIF, AVIF, TIFF and GIF. HEIC photos come back as JPEG so they open everywhere.',
          },
        ],
      },
      {
        h: 'Other ways to remove EXIF',
        blocks: [
          {
            ul: [
              'Windows: Properties, Details, Remove Properties and Personal Information, then create a clean copy. It does not remove every field in every format.',
              'Mac: Preview can remove the location (Tools, Show Inspector, GPS, Remove Location Info) but not the rest. Exporting from Photos with Location unchecked also drops GPS.',
              'exiftool: `exiftool -all= photo.jpg` removes everything it can write; add `-r folder/` for a whole folder.',
              'Re-saving or screenshotting: removes most metadata, but lowers quality and can still keep some fields depending on the app.',
            ],
          },
        ],
      },
    ],
    faq: [
      { q: 'Does removing EXIF reduce quality?', a: 'Not visibly. {site} saves the clean copy at high quality, so it looks the same in normal viewing.' },
      { q: 'Will the colours change if the ICC profile is removed?', a: 'Photos from phones and most cameras use standard sRGB or Display P3 colours and look the same. Files in an unusual colour space may look slightly different.' },
      { q: 'Can removed metadata be recovered?', a: 'Not from the clean copy. It is gone from that file; your original file still has it, so share the clean copy.' },
    ],
    related: ['remove-gps-location-from-photos', 'remove-metadata-from-iphone-photos', 'remove-c2pa-content-credentials'],
    updated: UPDATED,
  },
  {
    slug: 'remove-metadata-from-iphone-photos',
    kind: 'privacy',
    title: 'How to remove metadata from iPhone photos (HEIC and JPEG)',
    metaTitle: 'How to Remove Metadata from iPhone Photos (HEIC)',
    description:
      'iPhone photos store location, device, date and editing data. How to turn it off on iPhone, remove it when sharing, and strip all of it from HEIC and JPEG files.',
    short: 'Remove metadata from iPhone photos',
    tool: 'strip',
    cta: 'Clean iPhone photos now',
    intro: [
      'An iPhone photo is usually a HEIC file with a full set of metadata: the iPhone model, lens, exact time, location if Location Services is on for the Camera, and, after editing, the apps used. iOS can drop the location when you share, but not the rest. Here is how to deal with both.',
    ],
    steps: [
      { name: 'Save the photos to Files', text: 'In Photos, select the photos, tap Share, then Save to Files. (Or AirDrop or copy them to a computer.)' },
      { name: 'Open {site} in Safari', text: 'Go to the Strip tab and tap to add files from Files or your photo library.' },
      { name: 'Clean them', text: 'Pick This device to keep them on your iPhone, or Server for speed. HEIC photos come back as JPEG.' },
      { name: 'Save the clean copies', text: 'Download them, then open each one and tap Share, Save Image to put the clean copy back in Photos.' },
    ],
    sections: [
      {
        h: 'Remove the location when you share',
        blocks: [
          {
            p: 'Select the photos, tap Share, then tap Options at the top of the share sheet and turn off Location. iOS sends copies without GPS data for that share only. Turning on All Photos Data does the opposite and includes everything.',
          },
          { note: 'Picking photos from the photo library inside a website can still send the original file, with its metadata. Use the Options switch or clean the file first.' },
        ],
      },
      {
        h: 'Stop saving the location',
        blocks: [
          { p: 'Settings, Privacy & Security, Location Services, Camera, then Never. New photos will have no GPS data. Photos you already took keep theirs.' },
        ],
      },
      {
        h: 'Why HEIC becomes JPEG',
        blocks: [
          {
            p: 'HEIC is Apple’s default format. Many websites, Windows apps and older Android phones can’t open it, so {site} saves cleaned HEIC photos as high-quality JPEG. If you want your iPhone to take JPEG photos to begin with, choose Settings, Camera, Formats, Most Compatible.',
          },
        ],
      },
      {
        h: 'Live Photos, Portrait and edits',
        blocks: [
          {
            p: 'A Live Photo is a still image plus a short MOV video, and each has its own metadata. Cleaning the still image does not clean the video part; share it as a still, or clean the video separately with the [video metadata remover](/guides/remove-metadata-from-videos/). Portrait mode depth data and edit history are dropped from the clean copy.',
          },
        ],
      },
    ],
    faq: [
      { q: 'Does AirDrop keep the metadata?', a: 'Yes. AirDrop sends the full original, including location, unless you turn off Location under Options first.' },
      { q: 'Does iMessage remove the location?', a: 'Not reliably. Turn off Location under Options when sharing, or clean the photo before you send it.' },
    ],
    related: ['remove-gps-location-from-photos', 'remove-exif-data-from-photos', 'remove-metadata-from-videos'],
    updated: UPDATED,
  },
  {
    slug: 'remove-metadata-from-videos',
    kind: 'privacy',
    title: 'How to remove metadata from videos (MP4, MOV and more)',
    metaTitle: 'How to Remove Metadata from Videos (MP4, MOV, MKV)',
    description:
      'Videos store GPS, device, dates, timecode and encoder tags. How to see them and remove all of it from MP4, MOV, MKV, WebM and other videos.',
    short: 'Remove metadata from videos',
    tool: 'strip',
    cta: 'Strip video metadata now',
    intro: [
      'Phone and camera videos carry as much metadata as photos, and sometimes more: a location, the device model, creation dates, timecode, the encoder used and, on drones and action cameras, a full GPS or telemetry track recorded alongside the picture. Editing apps add project and software tags on top.',
    ],
    steps: [
      { name: 'Open the metadata remover', text: 'Go to the Strip tab in {site}.' },
      { name: 'Add the videos', text: 'MP4, MOV, M4V, MKV, WebM, AVI, MTS/M2TS, TS, 3GP, WMV or FLV.' },
      { name: 'Pick This device or Server', text: 'This device works in your browser without uploading. Server is faster on large files, which are deleted straight after.' },
      { name: 'Download the clean copy', text: 'Every tag, data track and C2PA box is removed; the video and sound are kept.' },
    ],
    sections: [
      {
        h: 'What video metadata contains',
        blocks: [
          {
            ul: [
              'Global tags: title, creation time, device make and model, software, and location (for example the `©xyz` tag and `com.apple.quicktime.location.ISO6709` in iPhone videos).',
              'Stream tags: per-track names, languages, handler names and encoder strings.',
              'Data tracks: GPS and sensor telemetry from drones, dashcams and action cameras, stored as separate tracks next to video and audio.',
              'Timecode tracks and chapter titles.',
              'Cover art and thumbnails attached to the file.',
              'C2PA boxes: signed Content Credentials, increasingly added by cameras, editing apps and AI video tools.',
            ],
          },
        ],
      },
      {
        h: 'Does the video look different?',
        blocks: [
          {
            p: 'No. Metadata lives in the container around the video and audio, not in the picture. {site} saves the clean copy at high quality, so it looks and sounds the same in normal viewing. The file is not byte-for-byte identical to the original, which is expected.',
          },
        ],
      },
      {
        h: 'Do it yourself with ffmpeg',
        blocks: [
          { p: 'With the free ffmpeg, this copies only the video and audio, and drops global tags, chapters and data tracks:' },
          { code: 'ffmpeg -i in.mov -map 0:v -map 0:a? -map_metadata -1 -map_chapters -1 \\\n  -fflags +bitexact -c copy out.mp4' },
          {
            p: 'Check the result with `ffprobe -hide_banner out.mp4` or `exiftool out.mp4`. Some per-stream tags such as handler names can remain; {site} clears those too.',
          },
        ],
      },
    ],
    faq: [
      { q: 'Does YouTube or TikTok remove video metadata?', a: 'They re-encode uploads, which drops most of it from what viewers download. The original file you send by email, cloud link or chat still has it.' },
      { q: 'Will the video lose quality?', a: 'Not visibly. The clean copy is saved at high quality.' },
    ],
    related: ['remove-gps-location-from-photos', 'remove-c2pa-content-credentials', 'download-youtube-videos'],
    updated: UPDATED,
  },
  {
    slug: 'remove-c2pa-content-credentials',
    kind: 'privacy',
    title: 'What C2PA Content Credentials are, and how to remove them',
    metaTitle: 'What Are C2PA Content Credentials & How to Remove Them',
    description:
      'C2PA Content Credentials record who made a photo or video, with which tools and edits. How to check a file for them, what they reveal, and how to strip them.',
    short: 'Remove C2PA Content Credentials',
    tool: 'strip',
    cta: 'Check and strip a file',
    intro: [
      'C2PA (from the Coalition for Content Provenance and Authenticity) is a standard for attaching a signed record, called a manifest or Content Credentials, to a photo, video or audio file. It is added by some cameras and phones, editing apps such as Photoshop and Lightroom, and AI tools including Adobe Firefly, OpenAI’s image and video tools, and Microsoft’s image generators.',
      'The manifest is useful for showing where a file came from, but it can also carry personal details you may not want to publish. This guide explains what is inside, how to check a file, and how to remove the embedded manifest.',
    ],
    steps: [
      { name: 'Check the file', text: 'Upload it to the Content Credentials Verify site (contentcredentials.org/verify) to see whether it has a manifest and what it says.' },
      { name: 'Open the {site} metadata remover', text: 'Go to the Strip tab and add the file.' },
      { name: 'Strip it', text: 'Pick This device or Server. The C2PA manifest is removed along with EXIF, XMP and the other metadata.' },
      { name: 'Check again', text: 'Upload the clean copy to the Verify site. It should report no embedded Content Credentials.' },
    ],
    sections: [
      {
        h: 'What a C2PA manifest can contain',
        blocks: [
          {
            ul: [
              'The name or account of the person or organisation that signed it, if they chose to include it.',
              'The device, app or AI service that created the file, and the software used to edit it.',
              'A list of edits (actions), such as crop, colour changes, or “created with a generative AI tool”.',
              'Dates and times, and sometimes a location.',
              'Thumbnails of earlier versions, and “ingredients”: references to the source files that were combined.',
              'A cryptographic signature that shows whether the file has changed since it was signed.',
            ],
          },
        ],
      },
      {
        h: 'Where it is stored in the file',
        blocks: [
          {
            p: 'In JPEG files the manifest sits in APP11 segments (JUMBF boxes). In PNG it is a `caBX` chunk, in MP4 and MOV a `uuid` box, and in HEIC, WebP and AVIF its own metadata box. Because it is a separate block, removing it does not touch the picture.',
          },
        ],
      },
      {
        h: 'What removing it does, and does not, do',
        blocks: [
          {
            p: 'Stripping removes the manifest that is embedded in the file. It does not remove:',
          },
          {
            ul: [
              'Visible watermarks or logos drawn into the picture.',
              'Copies of the manifest kept online by the tool that made the file. Some services store Content Credentials in the cloud and can look them up again from the image itself.',
              'Invisible watermarks in the pixels, such as Google’s SynthID. {site} disrupts SynthID separately, but no tool can guarantee a watermark detector will miss it.',
              'Any duty to disclose. Laws and platform rules on labelling AI-generated or edited content still apply to the file.',
            ],
          },
          {
            note: 'Removing Content Credentials does not stop a platform from labelling a file as AI-generated. Platforms also use their own classifiers, watermark detectors and upload questions.',
          },
        ],
      },
      {
        h: 'Other ways to remove C2PA',
        blocks: [
          {
            ul: [
              'exiftool: `exiftool -jumbf:all= -c2pa:all= photo.jpg` (recent versions) removes C2PA from JPEG; for other formats `exiftool -all= file` is simpler.',
              'Re-saving in an app that does not support C2PA usually drops it, but some apps, including Photoshop, add a new manifest instead.',
              'Screenshots create a new file without the original manifest, at lower quality.',
            ],
          },
        ],
      },
    ],
    faq: [
      { q: 'Is it legal to remove C2PA data?', a: 'Removing metadata from your own files is generally allowed, but some laws and platform rules require AI-generated content to be labelled. Removing Content Credentials does not change those obligations.' },
      { q: 'Does stripping C2PA change how the image looks?', a: 'No. The manifest is a separate block in the file; the picture stays the same.' },
      { q: 'Why does the Verify site still find Content Credentials?', a: 'It can match some images against credentials stored online by the service that made them. That record is held by the service, not in your file.' },
    ],
    related: ['remove-exif-data-from-photos', 'remove-metadata-from-videos', 'remove-gps-location-from-photos'],
    updated: UPDATED,
  },
];

export const guideBySlug = (slug: string) => GUIDES.find((g) => g.slug === slug);
export const guidePath = (slug: string) => `/guides/${slug}/`;
