import type { ReactNode } from 'react';
import type { Job } from '../lib/jobs';
import { IconClose, IconDownload } from './Icons';

interface Props {
  jobs: Job<unknown>[];
  icon: ReactNode;
  onRemove: (id: string) => void;
  onClear: () => void;
}

/** Result rows, styled like the playbook's comparison table rows. */
export default function JobList({ jobs, icon, onRemove, onClear }: Props) {
  if (!jobs.length) return null;
  const done = jobs.filter((j) => j.result);

  const downloadAll = () => {
    done.forEach((j, i) =>
      setTimeout(() => {
        const a = document.createElement('a');
        a.href = j.result!.url;
        a.download = j.result!.filename;
        a.click();
      }, i * 250),
    );
  };

  return (
    <div className="results">
      <ul className="rows">
        {jobs.map((j) => (
          <li key={j.id} className={`row is-${j.status}`}>
            <div className="thumb">
              {icon}
              {j.preview && (
                <img
                  src={j.preview}
                  alt=""
                  onError={(e) => {
                    e.currentTarget.hidden = true;
                  }}
                />
              )}
            </div>
            <div className="row-main">
              <div className="row-name" title={j.name}>{j.result?.filename ?? j.name}</div>
              <div className="row-sub" title={j.message}>
                {j.status === 'done' && <b>Ready</b>}
                {j.status === 'done' ? ` · ${j.message}` : j.message}
              </div>
            </div>
            <div className="row-meter">
              {(j.status === 'active' || j.status === 'waiting') && (
                <div className={`meter ${j.progress == null && j.status === 'active' ? 'busy' : ''}`}>
                  <i style={{ width: `${(j.progress ?? 0) * 100}%` }} />
                </div>
              )}
              {j.status === 'done' && <div className="meter full"><i /></div>}
            </div>
            <span className="row-actions">
              {j.result && (
                <a className="row-action" href={j.result.url} download={j.result.filename} title={`Download ${j.result.filename}`}>
                  <IconDownload />
                </a>
              )}
              <button type="button" className="row-remove" aria-label={`Remove ${j.name}`} title="Remove" onClick={() => onRemove(j.id)}>
                <IconClose />
              </button>
            </span>
          </li>
        ))}
      </ul>
      <div className="results-bar">
        <span className="legend">
          <i className="dot green" /> {done.length} ready
          {jobs.length - done.length > 0 && (
            <>
              <i className="dot gray" /> {jobs.length - done.length} in progress or failed
            </>
          )}
        </span>
        <span className="results-actions">
          {done.length > 1 && (
            <button type="button" className="pill-btn" onClick={downloadAll}>
              Download all
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
