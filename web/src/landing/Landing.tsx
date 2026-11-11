// The public landing page. It is rendered to static HTML at build time
// (see vite.config.mts) and ships with no JavaScript, so it loads fast and
// search engines see the full text.

import type { ReactNode } from 'react';
import { HeroArt, Tile, ToolIcon } from '../components/Icons';
import { FAQ, SITE_NAME } from './content';

const APP = '/app/';

export default function Landing({ siteUrl }: { siteUrl: string }) {
  return (
    <>
      <div className="page">
        <section className="card hero" aria-labelledby="top">
          <header className="card-head">
            <a className="wordmark" href="/" aria-label={`${SITE_NAME} home`}>
              sharon<span>a</span>
            </a>
            <nav className="nav" aria-label="Main">
              <a href="#synthid">SynthID</a>
              <a href="#metadata">Metadata</a>
              <a href="#downloaders">Downloaders</a>
              <a href="#faq">FAQ</a>
              <a className="pill-btn" href={APP}>Open tools</a>
            </nav>
          </header>

          <div className="hero-body">
            <div className="hero-copy">
              <p className="eyebrow">SynthID stripping · metadata removal · video downloads</p>
              <h1 id="top" className="display">
                SynthID Stripper <span className="accent">&amp; Metadata Remover.</span>
              </h1>
              <p className="lede">
                Drop a photo or video and get back a clean copy: hidden EXIF, GPS and C2PA tags removed, and SynthID
                watermarks disrupted with a near-lossless touch. Run it on our server or right on your device.
              </p>
              <div className="cta-row">
                <a className="cta" href={`${APP}#strip`}>Strip a file</a>
                <a className="cta ghost" href={`${APP}#youtube`}>Download a video</a>
              </div>
              <ul className="chips" aria-label="Tools">
                <ToolChip href="#strip" tool="strip">SynthID &amp; metadata</ToolChip>
                <ToolChip href="#youtube" tool="youtube">YouTube</ToolChip>
                <ToolChip href="#tiktok" tool="tiktok">TikTok</ToolChip>
                <ToolChip href="#x" tool="x">X</ToolChip>
                <ToolChip href="#instagram" tool="instagram">Instagram</ToolChip>
              </ul>
            </div>
            <HeroArt />
          </div>
        </section>

        <section id="synthid" className="card" aria-labelledby="synthid-h">
          <SectionHead icon={<ToolIcon tool="strip" size={56} />} id="synthid-h" title={['SynthID Remover', 'that keeps the look.']}>
            SynthID is an invisible watermark that Google hides in the pixels of AI images and videos. Sharona’s SynthID
            stripping re-processes those pixels just enough to break the pattern, so your file looks the same and plays
            the same.
          </SectionHead>
          <div className="grid3">
            <Feature title="Photos">
              A near-unity resample and a gentle sharpen touch every pixel, then the image is saved fresh at high quality.
            </Feature>
            <Feature title="Videos">
              A visually transparent re-encode (CRF 18) with a faint blur and matching sharpen, plus a trace of temporal noise.
            </Feature>
            <Feature title="Honest by design">
              SynthID is built to survive edits, so no SynthID stripper can guarantee a detector will miss it. We disrupt it;
              we don’t promise the impossible.
            </Feature>
          </div>
        </section>

        <section id="metadata" className="card" aria-labelledby="metadata-h">
          <SectionHead icon={<Tile from="#60a5fa" to="#1d4ed8" size={56}><PhotoGlyph /></Tile>} id="metadata-h" title={['Metadata Remover', 'for photos and videos.']}>
            Every photo and clip carries more than you see: where it was taken, the device, serial numbers, editing
            history. The metadata remover takes all of it out and shows you what it found.
          </SectionHead>
          <div className="split">
            <div>
              <h3>Removed from photos</h3>
              <ul className="tags">
                {['EXIF', 'GPS location', 'XMP', 'IPTC', 'ICC profiles', 'C2PA / Content Credentials', 'Maker notes', 'Thumbnails', 'Text comments'].map((t) => <li key={t}>{t}</li>)}
              </ul>
              <p className="small">JPEG, PNG, WebP, HEIC/HEIF, AVIF, TIFF, GIF. HEIC comes back as JPEG.</p>
            </div>
            <div>
              <h3>Removed from videos</h3>
              <ul className="tags">
                {['Global & stream tags', 'Chapter tags', 'GPS & telemetry tracks', 'Timecode', 'Cover art', 'C2PA boxes', 'Encoder strings'].map((t) => <li key={t}>{t}</li>)}
              </ul>
              <p className="small">MP4, MOV, M4V, MKV, WebM, AVI, MTS/M2TS, TS, 3GP, WMV, FLV. Streams are copied without re-encoding.</p>
            </div>
          </div>
        </section>

        <section className="card" aria-labelledby="where-h">
          <h2 id="where-h" className="display sm">
            Server <span className="accent">or this device.</span>
          </h2>
          <p className="lede">Pick where the SynthID stripper and metadata remover run, with a single switch.</p>
          <div className="split modes">
            <div className="mode">
              <h3>Server</h3>
              <p>Your file is uploaded, cleaned and deleted right after. Nothing is stored. Handles every format, and SynthID stripping for photos and videos.</p>
            </div>
            <div className="mode">
              <h3>This device</h3>
              <p>Your file never leaves the browser. Photos are cleaned losslessly; videos load a ~30 MB engine once. SynthID stripping works on photos here.</p>
            </div>
          </div>
        </section>

        <section id="downloaders" className="split cards" aria-label="Video downloaders">
          <Downloader
            tool="youtube"
            title={['YouTube', 'Downloader']}
            href={`${APP}#youtube`}
            text="Paste YouTube video or Shorts links and save an MP4 up to 1080p, or just the audio as M4A. Add several links at once."
          />
          <Downloader
            tool="tiktok"
            title={['TikTok', 'Downloader']}
            href={`${APP}#tiktok`}
            text="Paste tiktok.com links, including vm. and vt. short links, and get the video back as MP4, or the sound as M4A."
          />
        </section>
        <p className="also">
          Also included: an <a href={`${APP}#x`}>X video downloader</a> for x.com and twitter.com posts, and an{' '}
          <a href={`${APP}#instagram`}>Instagram Reels downloader</a> for public posts.
        </p>

        <section className="card" aria-labelledby="how-h">
          <h2 id="how-h" className="display sm">
            How to remove SynthID <span className="accent">and metadata.</span>
          </h2>
          <ol className="steps">
            <li><b>Drop your files.</b> Photos or videos, several at a time.</li>
            <li><b>Choose your options.</b> Server or this device, with SynthID stripping on or off.</li>
            <li><b>Download clean copies.</b> Each row lists what was found and removed.</li>
          </ol>
          <a className="cta" href={`${APP}#strip`}>Open the SynthID stripper</a>
        </section>

        <section id="faq" className="card" aria-labelledby="faq-h">
          <h2 id="faq-h" className="display sm">
            SynthID stripping <span className="accent">FAQ.</span>
          </h2>
          <div className="faq">
            {FAQ.map((f) => (
              <details key={f.q}>
                <summary><h3>{f.q}</h3></summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <footer className="foot">
          <p>
            <b>{SITE_NAME}</b> · SynthID stripper, metadata remover, YouTube downloader and TikTok downloader.{' '}
            <a href={APP}>Open the tools</a>
          </p>
          <p>
            Only process and download content you own or have permission to use, and label AI-generated content where
            the rules require it. {SITE_NAME} is not affiliated with Google, YouTube, TikTok, X or Instagram.
          </p>
        </footer>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(siteUrl) }} />
    </>
  );
}

function ToolChip({ href, tool, children }: { href: string; tool: Parameters<typeof ToolIcon>[0]['tool']; children: ReactNode }) {
  return (
    <li>
      <a className="chip" href={`${APP}${href}`}>
        <ToolIcon tool={tool} size={24} />
        {children}
      </a>
    </li>
  );
}

function SectionHead({ icon, id, title, children }: { icon: ReactNode; id: string; title: [string, string]; children: ReactNode }) {
  return (
    <div className="tool-head">
      {icon}
      <div>
        <h2 id={id} className="display sm">
          {title[0]} <span className="accent">{title[1]}</span>
        </h2>
        <p className="lede">{children}</p>
      </div>
    </div>
  );
}

function Feature({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="feature">
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}

function Downloader({ tool, title, href, text }: { tool: 'youtube' | 'tiktok'; title: [string, string]; href: string; text: string }) {
  return (
    <div className="card dl" aria-labelledby={`${tool}-h`}>
      <ToolIcon tool={tool} size={56} />
      <h2 id={`${tool}-h`} className="display xs">
        {title[0]} <span className="accent">{title[1]}</span>
      </h2>
      <p>{text}</p>
      <a className="cta" href={href}>Open the {title.join(' ')}</a>
    </div>
  );
}

const PhotoGlyph = () => (
  <g>
    <circle cx="25" cy="25" r="5" fill="#ffd34d" />
    <path d="M14 46 27 32l8 8 6-6 9 12z" fill="#fff" />
  </g>
);

function jsonLd(siteUrl: string) {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: `${SITE_NAME}: SynthID Stripper & Metadata Remover`,
        alternateName: ['SynthID Remover', 'Metadata Remover', 'YouTube Downloader', 'TikTok Downloader'],
        url: `${siteUrl}/`,
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'Any (web browser)',
        browserRequirements: 'Requires a modern web browser with JavaScript.',
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
      {
        '@type': 'FAQPage',
        mainEntity: FAQ.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };
  // Keep "</script>" and friends from ending the tag early.
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
