export type ToolId = 'strip' | 'youtube' | 'x' | 'instagram' | 'tiktok';
export type Platform = Exclude<ToolId, 'strip'>;

export interface ToolInfo {
  id: ToolId;
  /** Label on the chip */
  chip: string;
  /** Headline: plain part, then the blue accent part */
  title: [string, string];
  blurb: string;
  placeholder?: string;
}

export const TOOLS: ToolInfo[] = [
  {
    id: 'strip',
    chip: 'SynthID & metadata',
    title: ['Your files.', 'No trace.'],
    blurb: 'Drop photos or videos. We strip the SynthID watermark and remove EXIF, GPS, XMP, C2PA and container tags, then hand back a clean copy.',
  },
  {
    id: 'youtube',
    chip: 'YouTube',
    title: ['Save it from', 'YouTube.'],
    blurb: 'Paste video or Shorts links. You get an MP4 up to 1080p, or just the audio.',
    placeholder: 'Paste a YouTube or Shorts link',
  },
  {
    id: 'x',
    chip: 'X',
    title: ['Save it from', 'X.'],
    blurb: 'Paste a post link from x.com or twitter.com and get the video attached to it.',
    placeholder: 'Paste an x.com or twitter.com post link',
  },
  {
    id: 'instagram',
    chip: 'Instagram',
    title: ['Save it from', 'Instagram.'],
    blurb: 'Paste a Reel or video post link. Public posts work out of the box.',
    placeholder: 'Paste an Instagram Reel or post link',
  },
  {
    id: 'tiktok',
    chip: 'TikTok',
    title: ['Save it from', 'TikTok.'],
    blurb: 'Paste TikTok links, including vm. and vt. short links, and get the video back.',
    placeholder: 'Paste a TikTok link',
  },
];

export const toolById = (id: string) => TOOLS.find((t) => t.id === id);
