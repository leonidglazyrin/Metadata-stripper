export type ToolId = 'strip' | 'youtube' | 'x' | 'instagram' | 'tiktok' | 'mix';
/** A site we download from. */
export type Platform = Exclude<ToolId, 'strip' | 'mix'>;
/** A downloader tab: one site, or the mix of all four. */
export type DownloaderId = Exclude<ToolId, 'strip'>;

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
  {
    id: 'mix',
    chip: 'Meli-melo',
    title: ['Any link.', 'One list.'],
    blurb: 'Paste YouTube, X, Instagram and TikTok links in any mix and any number. Each one goes to the right downloader.',
    placeholder: 'Paste any YouTube, X, Instagram or TikTok link',
  },
];

export const toolById = (id: string) => TOOLS.find((t) => t.id === id);

// The same hosts the server accepts (server/platforms.js), so Meli-melo can
// send each link to its own downloader. The server checks them again.
const HOSTS: Record<Platform, RegExp> = {
  youtube: /(^|\.)(youtube\.com|youtu\.be|youtube-nocookie\.com)$/i,
  x: /(^|\.)(x\.com|twitter\.com|fxtwitter\.com|vxtwitter\.com|fixupx\.com)$/i,
  instagram: /(^|\.)(instagram\.com|instagr\.am)$/i,
  tiktok: /(^|\.)tiktok\.com$/i,
};
export const PLATFORM_LABEL: Record<Platform, string> = { youtube: 'YouTube', x: 'X', instagram: 'Instagram', tiktok: 'TikTok' };

/** Which site a link is from, or null when it's none of the four. */
export function platformOf(url: string): Platform | null {
  let host: string;
  try {
    host = new URL(url).hostname;
  } catch {
    return null;
  }
  return (Object.keys(HOSTS) as Platform[]).find((p) => HOSTS[p].test(host)) ?? null;
}
