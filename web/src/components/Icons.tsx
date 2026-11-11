import { useId, type ReactNode } from 'react';
import type { ToolId } from '../tools';

// Glossy, "3D-style" icons drawn in SVG: a gradient body lit from the top
// left, a soft specular highlight, and a glyph with its own small shadow.
// CSS adds the drop shadow under each icon (.icon3d).

interface TileProps {
  from: string;
  to: string;
  size?: number;
  shape?: 'tile' | 'orb';
  children: ReactNode;
  className?: string;
}

export function Tile({ from, to, size = 28, shape = 'tile', children, className }: TileProps) {
  const id = useId().replace(/:/g, '');
  return (
    <svg
      className={`icon3d ${className ?? ''}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`b${id}`} x1="0.15" y1="0" x2="0.85" y2="1">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
        <radialGradient id={`h${id}`} cx="0.32" cy="0.18" r="0.75">
          <stop offset="0" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="0.45" stopColor="#fff" stopOpacity="0.08" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`s${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.6" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.22" />
        </linearGradient>
        <filter id={`g${id}`} x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="1.6" stdDeviation="1.4" floodColor="#000" floodOpacity="0.25" />
        </filter>
      </defs>
      {shape === 'orb' ? (
        <>
          <circle cx="32" cy="32" r="29" fill={`url(#b${id})`} />
          <circle cx="32" cy="32" r="29" fill={`url(#s${id})`} />
          <circle cx="32" cy="32" r="29" fill={`url(#h${id})`} />
          <circle cx="32" cy="32" r="28.2" fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth="1.2" />
        </>
      ) : (
        <>
          <rect x="3" y="3" width="58" height="58" rx="17" fill={`url(#b${id})`} />
          <rect x="3" y="3" width="58" height="58" rx="17" fill={`url(#s${id})`} />
          <rect x="3" y="3" width="58" height="58" rx="17" fill={`url(#h${id})`} />
          <rect x="3.6" y="3.6" width="56.8" height="56.8" rx="16.4" fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth="1.2" />
        </>
      )}
      <g filter={`url(#g${id})`}>{children}</g>
    </svg>
  );
}

/* ---------- Glyphs (drawn in a 64×64 box, white) ---------- */

const StripGlyph = () => (
  <g fill="none" stroke="#fff" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M32 15 46 20v11c0 9-6 15.5-14 18-8-2.5-14-9-14-18V20z" fill="#fff" fillOpacity="0.18" />
    <path d="m25 32 5 5 9-10" />
  </g>
);

const PlayGlyph = () => <path d="M26 21.5v21l17-10.5z" fill="#fff" stroke="#fff" strokeWidth="2.5" strokeLinejoin="round" />;

const XGlyph = () => (
  <g fill="none" strokeLinecap="round">
    <path d="M20 19 44 45" stroke="#fff" strokeWidth="6" />
    <path d="M44.5 18.5 19.5 45.5" stroke="#fff" strokeWidth="3.4" />
  </g>
);

const CameraGlyph = () => (
  <g fill="none" stroke="#fff" strokeWidth="4.2">
    <rect x="17" y="17" width="30" height="30" rx="9.5" />
    <circle cx="32" cy="32" r="7" />
    <circle cx="40.8" cy="23.4" r="1.4" fill="#fff" stroke="none" />
  </g>
);

const NoteGlyph = () => (
  <g fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M35 17v20.5a7.5 7.5 0 1 1-6-7.35" stroke="#25f4ee" strokeWidth="4.2" transform="translate(-1.4 -1)" />
    <path d="M35 17v20.5a7.5 7.5 0 1 1-6-7.35" stroke="#fe2c55" strokeWidth="4.2" transform="translate(1.4 1)" />
    <path d="M35 17v20.5a7.5 7.5 0 1 1-6-7.35M35 17c1 5 4.5 8 9.5 8.5" stroke="#fff" strokeWidth="4.2" />
  </g>
);

export const DownloadGlyph = () => (
  <g fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M32 18v22m0 0-9-9m9 9 9-9M21 46h22" />
  </g>
);

const PhotoGlyph = () => (
  <g>
    <circle cx="25" cy="25" r="5" fill="#ffd34d" />
    <path d="M14 46 27 32l8 8 6-6 9 12z" fill="#fff" />
  </g>
);

const SparkGlyph = () => (
  <path d="M32 14c2 10 7 15 18 18-11 3-16 8-18 18-2-10-7-15-18-18 11-3 16-8 18-18z" fill="#fff" />
);

/* ---------- Composed icons ---------- */

export const TOOL_COLORS: Record<ToolId, [string, string]> = {
  strip: ['#4ade80', '#16a34a'],
  youtube: ['#ff5a52', '#d91c1c'],
  x: ['#3a4250', '#0b0f17'],
  instagram: ['#ffb341', '#c026d3'],
  tiktok: ['#323a48', '#05070b'],
};

const GLYPHS: Record<ToolId, () => ReactNode> = {
  strip: StripGlyph,
  youtube: PlayGlyph,
  x: XGlyph,
  instagram: CameraGlyph,
  tiktok: NoteGlyph,
};

export function ToolIcon({ tool, size }: { tool: ToolId; size?: number }) {
  const [from, to] = TOOL_COLORS[tool];
  const Glyph = GLYPHS[tool];
  return (
    <Tile from={from} to={to} size={size}>
      <Glyph />
    </Tile>
  );
}

/** The floating cluster on the right of the hero card. */
export function HeroArt() {
  return (
    <div className="hero-art" aria-hidden="true">
      <span className="float f1"><Tile from="#4ade80" to="#15803d" size={118} shape="orb"><StripGlyph /></Tile></span>
      <span className="float f2"><Tile from="#ff6a5f" to="#d11a1a" size={100}><PlayGlyph /></Tile></span>
      <span className="float f3"><Tile from="#60a5fa" to="#1d4ed8" size={112}><PhotoGlyph /></Tile></span>
      <span className="float f4"><Tile from="#3b82f6" to="#1e40af" size={92} shape="orb"><DownloadGlyph /></Tile></span>
      <span className="float f5"><Tile from="#ffd34d" to="#f59e0b" size={62} shape="orb"><SparkGlyph /></Tile></span>
    </div>
  );
}

/* ---------- Flat UI icons ---------- */

export const IconDownload = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 4v12m0 0-5-5m5 5 5-5M5 20h14" />
  </svg>
);

export const IconClose = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" aria-hidden="true">
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const IconPlus = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const IconFile = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
    <path d="M14 3v5h5" />
  </svg>
);
