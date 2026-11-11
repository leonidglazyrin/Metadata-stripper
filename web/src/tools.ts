export type ToolId = 'strip' | 'youtube' | 'x' | 'instagram' | 'tiktok';
export type Platform = Exclude<ToolId, 'strip'>;

export interface ToolInfo {
  id: ToolId;
  /** Label on the chip */
  chip: string;
  eyebrow: string;
  /** Headline: plain part, then the blue accent part */
  title: [string, string];
  blurb: string;
  /** Command shown in the dark code bar: [prefix, highlighted, suffix] */
  cmd: [string, string, string];
  placeholder?: string;
  /** What appears in the little fact cards under the tool */
  facts: { label: string; title: string; sub: string }[];
}

const downloadFacts = (name: string, extra: { label: string; title: string; sub: string }) => [
  { label: 'Format', title: 'MP4 · H.264', sub: 'Plays in every editor' },
  extra,
  { label: 'Audio only', title: 'M4A', sub: `Grab just the sound from ${name}` },
  { label: 'Batch', title: 'Many links', sub: 'Paste a list, get them all' },
  { label: 'Privacy', title: 'Nothing kept', sub: 'Deleted after it reaches you' },
];

export const TOOLS: ToolInfo[] = [
  {
    id: 'strip',
    chip: 'Strip metadata',
    eyebrow: 'Metadata stripper',
    title: ['Your files.', 'No trace.'],
    blurb: 'Drop photos or videos. We remove EXIF, GPS, XMP, C2PA and container tags, then hand back a clean copy.',
    cmd: ['strip ', 'photo.heic video.mov', ' --exif --gps --c2pa --synthid'],
    facts: [
      { label: 'Camera', title: 'EXIF', sub: 'Make, model, serial, dates' },
      { label: 'Location', title: 'GPS', sub: 'Coordinates in photos and clips' },
      { label: 'Provenance', title: 'C2PA', sub: 'Content Credentials manifests' },
      { label: 'Editors', title: 'XMP · IPTC', sub: 'Adobe and newsroom tags' },
      { label: 'Video', title: 'Container tags', sub: 'Device, software, data tracks' },
    ],
  },
  {
    id: 'youtube',
    chip: 'YouTube',
    eyebrow: 'YouTube downloader',
    title: ['Save it from', 'YouTube.'],
    blurb: 'Paste video or Shorts links. You get an MP4 up to 1080p, or just the audio.',
    cmd: ['save ', 'youtube.com/shorts/…', ' --mp4 --max 1080p'],
    placeholder: 'Paste a YouTube or Shorts link',
    facts: downloadFacts('YouTube', { label: 'Quality', title: 'Up to 1080p', sub: 'Best stream, merged with audio' }),
  },
  {
    id: 'x',
    chip: 'X',
    eyebrow: 'X downloader',
    title: ['Save it from', 'X.'],
    blurb: 'Paste a post link from x.com or twitter.com and get the video attached to it.',
    cmd: ['save ', 'x.com/user/status/…', ' --mp4'],
    placeholder: 'Paste an x.com or twitter.com post link',
    facts: downloadFacts('X', { label: 'Links', title: 'x.com · twitter.com', sub: 'Both domains work' }),
  },
  {
    id: 'instagram',
    chip: 'Instagram',
    eyebrow: 'Instagram downloader',
    title: ['Save it from', 'Instagram.'],
    blurb: 'Paste a Reel or video post link. Public posts work out of the box.',
    cmd: ['save ', 'instagram.com/reel/…', ' --mp4'],
    placeholder: 'Paste an Instagram Reel or post link',
    facts: downloadFacts('Instagram', { label: 'Posts', title: 'Reels · videos', sub: 'Video posts and Reels' }),
  },
  {
    id: 'tiktok',
    chip: 'TikTok',
    eyebrow: 'TikTok downloader',
    title: ['Save it from', 'TikTok.'],
    blurb: 'Paste TikTok links, including vm. and vt. short links, and get the video back.',
    cmd: ['save ', 'tiktok.com/@user/video/…', ' --mp4'],
    placeholder: 'Paste a TikTok link',
    facts: downloadFacts('TikTok', { label: 'Links', title: 'Short links too', sub: 'vm.tiktok.com, vt.tiktok.com' }),
  },
];

export const toolById = (id: string) => TOOLS.find((t) => t.id === id);
