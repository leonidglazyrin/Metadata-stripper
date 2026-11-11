import { useEffect, useState } from 'react';
import { TOOLS, toolById, type ToolId } from './tools';
import { load, save, useStored } from './lib/storage';
import { HeroArt, ToolIcon } from './components/Icons';
import StripTool from './components/StripTool';
import DownloadTool from './components/DownloadTool';

function initialTool(): ToolId {
  const fromHash = toolById(location.hash.slice(1));
  if (fromHash) return fromHash.id;
  return toolById(load('tool', 'strip'))?.id ?? 'strip';
}

export default function App() {
  const [active, setActive] = useState<ToolId>(initialTool);
  const [multi, setMulti] = useStored('multiLinks', true);
  const tool = toolById(active)!;

  useEffect(() => {
    save('tool', active);
    history.replaceState(null, '', `#${active}`);
  }, [active]);

  useEffect(() => {
    const onHash = () => {
      const t = toolById(location.hash.slice(1));
      if (t) setActive(t.id);
    };
    addEventListener('hashchange', onHash);
    return () => removeEventListener('hashchange', onHash);
  }, []);

  const onChipKey = (e: React.KeyboardEvent, i: number) => {
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    const next = TOOLS[(i + d + TOOLS.length) % TOOLS.length];
    setActive(next.id);
    document.getElementById(`chip-${next.id}`)?.focus();
  };

  return (
    <div className="page">
      <section className="card hero">
        <header className="card-head">
          <Wordmark />
          <span className="kicker">Creator tools · 2026</span>
        </header>

        <div className="hero-body">
          <div className="hero-copy">
            <h1 className="display">
              Clean files. <span className="accent">Save clips.</span> Post&nbsp;faster.
            </h1>
            <p className="lede">Strip hidden metadata from your photos and videos, and grab clips from YouTube, X, Instagram and TikTok.</p>

            <div className="chips" role="tablist" aria-label="Tools">
              {TOOLS.map((t, i) => (
                <button
                  key={t.id}
                  id={`chip-${t.id}`}
                  type="button"
                  role="tab"
                  className="chip"
                  aria-selected={t.id === active}
                  aria-controls={`panel-${t.id}`}
                  tabIndex={t.id === active ? 0 : -1}
                  onClick={() => setActive(t.id)}
                  onKeyDown={(e) => onChipKey(e, i)}
                >
                  <ToolIcon tool={t.id} size={24} />
                  {t.chip}
                </button>
              ))}
            </div>
          </div>
          <HeroArt />
        </div>

        <div className="codebar" aria-label="Current tool">
          <span className="prompt">$</span> {tool.cmd[0]}
          <span className="hl">{tool.cmd[1]}</span>
          {tool.cmd[2]}
        </div>
      </section>

      {TOOLS.map((t) => (
        // All tools stay mounted so switching chips never drops work in flight.
        <section
          key={t.id}
          id={`panel-${t.id}`}
          role="tabpanel"
          aria-labelledby={`chip-${t.id}`}
          className="card tool"
          hidden={t.id !== active}
        >
          <header className="card-head">
            <Wordmark />
            <span className="kicker">{t.eyebrow}</span>
          </header>
          <div className="tool-head">
            <ToolIcon tool={t.id} size={56} />
            <div>
              <h2 className="display sm">
                {t.title[0]} <span className="accent">{t.title[1]}</span>
              </h2>
              <p className="lede">{t.blurb}</p>
            </div>
          </div>

          {t.id === 'strip' ? <StripTool /> : <DownloadTool tool={t} multi={multi} setMulti={setMulti} />}

          <ul className="facts">
            {t.facts.map((f) => (
              <li key={f.label} className="fact">
                <span className="fact-label">{f.label}</span>
                <span className="fact-title">{f.title}</span>
                <span className="fact-sub">{f.sub}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <footer className="foot">
        <p>
          <b>Private by default:</b> files are processed and deleted right away. Nothing is stored.
        </p>
        <p>
          Only download content you own or have permission to use. Downloading may break a platform&rsquo;s terms of service.
        </p>
      </footer>
    </div>
  );
}

function Wordmark() {
  return (
    <span className="wordmark" aria-label="Sharona">
      sharon<span>a</span>
    </span>
  );
}
