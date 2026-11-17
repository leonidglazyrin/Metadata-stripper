import type { Job } from '../lib/jobs';
import type { DownloaderId, Platform } from '../tools';
import type { Input, Mode } from './DownloadTool';
import { IconClose, IconDownload, IconRetry, ToolIcon } from './Icons';

/** One link in the list, seen in the format that's picked. */
export interface Post {
  url: string;
  platform: Platform | null;
  /** Its row in the picked format, if it was ever fetched in it. */
  cur?: Job<Input>;
  /** Its row in the other format. Shown only for its name and picture. */
  other?: Job<Input>;
  /** Can't be fetched on this tab at all (wrong site, or no site we support). */
  blocked: boolean;
}

interface Props {
  posts: Post[];
  mode: Mode;
  tool: DownloaderId;
  onRemove: (url: string) => void;
  onRetry: (id: string) => void;
  onFetch: (url: string) => void;
  onDownloadAll: () => void;
  onClear: () => void;
}

const bare = (u: string) => u.replace(/^https?:\/\/(www\.|m\.)?/, '');

/**
 * The downloads, one row per link. Each row shows the link in the format
 * picked above and nothing else: on Audio, only audio can be saved, and a
 * link that has no audio yet offers "Get audio" instead of its video.
 */
export default function DownloadList({ posts, mode, tool, onRemove, onRetry, onFetch, onDownloadAll, onClear }: Props) {
  if (!posts.length) return null;
  const word = mode === 'audio' ? 'audio' : 'video';
  const Word = mode === 'audio' ? 'Audio' : 'Video';
  const ready = posts.filter((p) => p.cur?.status === 'done').length;
  const pending = posts.filter((p) => p.cur && (p.cur.status === 'waiting' || p.cur.status === 'active')).length;
  const failed = posts.filter((p) => p.cur?.status === 'error').length;
  const notYet = posts.filter((p) => !p.cur && !p.blocked).length;
  const showAll = posts.length > 1 && ready + pending + notYet > 0;

  return (
    <div className="results">
      <ul className="rows">
        {posts.map((p) => {
          const j = p.cur;
          const base = (j ?? p.other)!;
          // A name the server gave beats the bare link the row started with.
          const name = [j?.name, p.other?.name].find((n) => n && n !== bare(p.url)) ?? base.name;
          const preview = j?.preview ?? p.other?.preview;
          const status = j?.status ?? 'idle';
          return (
            <li key={p.url} className={`row is-${status}`}>
              <div className="thumb">
                <ToolIcon tool={p.platform ?? tool} size={26} />
                {preview && (
                  <img
                    src={preview}
                    alt=""
                    onError={(e) => {
                      e.currentTarget.hidden = true;
                    }}
                  />
                )}
              </div>
              <div className="row-main">
                <div className="row-name" title={name}>
                  {name}
                </div>
                <a className="row-link" href={p.url} target="_blank" rel="noreferrer noopener" title={p.url}>
                  {bare(p.url)}
                </a>
                <div className="row-sub" title={j?.message}>
                  {!j ? (
                    <>
                      <span className="fmt-tag">{Word}</span> Not fetched yet
                    </>
                  ) : j.status === 'done' ? (
                    <>
                      <b>Ready</b>
                      {j.message && ` · ${j.message}`}
                    </>
                  ) : j.status === 'error' && j.message.startsWith('Expired · ') ? (
                    <>
                      <b>Expired</b>
                      {j.message.slice('Expired'.length)}
                    </>
                  ) : (
                    j.message
                  )}
                </div>
              </div>
              <div className="row-meter">
                {j && (j.status === 'active' || j.status === 'waiting') && (
                  <>
                    <div className={`meter ${j.progress == null && j.status === 'active' ? 'busy' : ''}`}>
                      <i style={{ width: `${(j.progress ?? 0) * 100}%` }} />
                    </div>
                    {j.status === 'active' && j.progress != null && <span className="pct">{Math.floor(j.progress * 100)}%</span>}
                  </>
                )}
                {j?.status === 'done' && (
                  <div className="meter full">
                    <i />
                  </div>
                )}
              </div>
              <span className="row-actions">
                {j?.status === 'error' && !p.blocked && (
                  <button type="button" className="row-retry" aria-label={`Retry ${name}`} title="Retry" onClick={() => onRetry(j.id)}>
                    <IconRetry />
                  </button>
                )}
                {!j && !p.blocked && (
                  <button type="button" className="row-get" title={`Download the ${word} of this post`} onClick={() => onFetch(p.url)}>
                    <IconDownload />
                    <span>Get {word}</span>
                  </button>
                )}
                {j?.result && (
                  <a className="row-action" href={j.result.url} download={j.result.filename} title={`Save ${j.result.filename}`}>
                    <IconDownload />
                  </a>
                )}
                <button type="button" className="row-remove" aria-label={`Remove ${name}`} title="Remove" onClick={() => onRemove(p.url)}>
                  <IconClose />
                </button>
              </span>
            </li>
          );
        })}
      </ul>
      <div className="results-bar">
        <span className="legend">
          <i className="dot green" /> {ready} ready
          {pending > 0 && (
            <>
              <i className="dot gray" /> {pending} in progress
            </>
          )}
          {notYet > 0 && (
            <>
              <i className="dot hollow" /> {notYet} {word} not fetched
            </>
          )}
          {failed > 0 && (
            <>
              <i className="dot red" /> {failed} failed
            </>
          )}
        </span>
        <span className="results-actions">
          {showAll && (
            <button type="button" className="pill-btn" onClick={onDownloadAll}>
              <IconDownload />
              Download all {mode === 'audio' ? 'audio' : 'videos'}
            </button>
          )}
          <button type="button" className="pill-btn ghost" onClick={onClear}>
            Clear
          </button>
        </span>
      </div>
    </div>
  );
}
