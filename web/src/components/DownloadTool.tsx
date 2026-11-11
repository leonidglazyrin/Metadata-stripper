import { useEffect, useRef, useState, type ClipboardEvent, type KeyboardEvent } from 'react';
import { useJobs, type Runner } from '../lib/jobs';
import { postForBlob, formatSize } from '../lib/request';
import { useStored } from '../lib/storage';
import type { Platform, ToolInfo } from '../tools';
import { IconClose, ToolIcon } from './Icons';
import JobList from './JobList';
import { videoFrame } from '../lib/thumb';

type Mode = 'video' | 'audio';
interface Input {
  url: string;
  mode: Mode;
}

const extractUrls = (text: string) =>
  (text.match(/https?:\/\/[^\s"'<>]+/gi) || []).map((u) => u.replace(/[),.;]+$/, ''));
const looksLikeLink = (v: string) => /^https?:\/\/\S+\.\S+/i.test(v.trim()) || /\.(com|be|am)\//i.test(v);
const shortUrl = (u: string) => u.replace(/^https?:\/\/(www\.|m\.)?/, '');

export default function DownloadTool({ tool }: { tool: ToolInfo }) {
  const platform = tool.id as Platform;
  const [mode, setMode] = useStored<Mode>(`mode:${platform}`, 'video');
  const [fields, setFields] = useState<string[]>(['']);
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const focusNext = useRef<number | null>(null);

  useEffect(() => {
    if (focusNext.current != null) {
      refs.current[focusNext.current]?.focus();
      focusNext.current = null;
    }
  });

  // Always offer one empty field after the last link.
  const shown = looksLikeLink(fields[fields.length - 1]) ? [...fields, ''] : fields;
  const urls = [...new Set(extractUrls(fields.join(' ')))];

  const setField = (i: number, v: string) =>
    setFields((f) => {
      const next = [...f];
      next[i] = v;
      return next;
    });

  const removeField = (i: number) => {
    setFields((f) => (f.length > 1 ? f.filter((_, k) => k !== i) : ['']));
    focusNext.current = Math.max(0, i - 1);
  };

  const onPaste = (i: number, e: ClipboardEvent<HTMLInputElement>) => {
    const found = extractUrls(e.clipboardData.getData('text'));
    if (found.length < 2) return;
    e.preventDefault();
    setFields((f) => {
      const next = [...f];
      next.splice(i, 1, ...found);
      return next;
    });
    focusNext.current = i + found.length;
  };

  const onKeyDown = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !shown[i] && shown.length > 1 && i < fields.length) {
      e.preventDefault();
      removeField(i);
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      const k = i + (e.key === 'ArrowDown' ? 1 : -1);
      if (refs.current[k]) {
        e.preventDefault();
        refs.current[k]!.focus();
      }
    }
  };

  const runner: Runner<Input> = async (job, update, signal) => {
    update({ message: 'Fetching on the server…', progress: null });
    const res = await postForBlob(
      `/api/download/${platform}`,
      job.input,
      { onDownload: (p) => update({ progress: p, message: `Receiving · ${Math.round(p * 100)}%` }) },
      signal,
    );
    const filename = res.filename ?? `${platform}.${job.input.mode === 'audio' ? 'm4a' : 'mp4'}`;
    update({
      status: 'done',
      progress: 1,
      message: `${job.input.mode === 'audio' ? 'Audio' : 'Video'} · ${formatSize(res.blob.size)}`,
      result: { url: URL.createObjectURL(res.blob), filename },
    });
    if (job.input.mode === 'video') {
      const frame = await videoFrame(res.blob);
      if (frame) update({ preview: frame });
    }
  };

  const { jobs, add, remove, clear } = useJobs(runner);

  const submit = () => {
    if (!urls.length) return refs.current[0]?.focus();
    add(urls.map((url) => ({ input: { url, mode }, name: shortUrl(url) })));
    setFields(['']);
    focusNext.current = 0;
  };

  return (
    <>
      <form
        className="paste"
        autoComplete="off"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <div className="fields">
          {shown.map((v, i) => {
            const proposed = i === fields.length;
            return (
              <div key={i} className={`field ${proposed ? 'proposed' : ''}`}>
                <input
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  type="url"
                  inputMode="url"
                  spellCheck={false}
                  aria-label={`${tool.chip} link ${i + 1}`}
                  placeholder={i === 0 ? tool.placeholder : 'Add another link'}
                  value={v}
                  onChange={(e) => (proposed ? setFields((f) => [...f, e.target.value]) : setField(i, e.target.value))}
                  onPaste={(e) => onPaste(i, e)}
                  onKeyDown={(e) => onKeyDown(i, e)}
                />
                {!proposed && shown.length > 1 && (
                  <button type="button" className="field-rm" tabIndex={-1} aria-label="Remove link" onClick={() => removeField(i)}>
                    <IconClose />
                  </button>
                )}
              </div>
            );
          })}
        </div>
        <button className="go" type="submit" disabled={!urls.length}>
          {urls.length > 1 ? `Download ${urls.length}` : 'Download'}
        </button>
      </form>

      <div className="options">
        <div className="segmented" role="radiogroup" aria-label="What to save">
          {(['video', 'audio'] as const).map((m) => (
            <button key={m} type="button" role="radio" aria-checked={mode === m} onClick={() => setMode(m)}>
              {m === 'video' ? 'Video' : 'Audio only'}
            </button>
          ))}
        </div>
      </div>

      <JobList jobs={jobs} icon={<ToolIcon tool={platform} size={26} />} onRemove={remove} onClear={clear} />
    </>
  );
}
