import { useEffect, useRef, useState, type ClipboardEvent, type KeyboardEvent } from 'react';
import { useJobs, type Runner } from '../lib/jobs';
import { apiUrl, formatSize, getBlob, requestJson } from '../lib/request';
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

// Links pasted or typed with or without the scheme: "youtube.com/watch?v=…",
// "www.tiktok.com/@a/video/1" and "https://x.com/a/status/1" all count.
const extractUrls = (text: string) =>
  (text.match(/(?:https?:\/\/|(?<![\w.@/-])(?:[a-z0-9-]+\.)+[a-z]{2,}\/)[^\s"'<>]*/gi) || [])
    .map((u) => u.replace(/[),.;]+$/, ''))
    .map((u) => (/^https?:\/\//i.test(u) ? u : `https://${u}`))
    .filter((u) => /^https?:\/\/[^/\s]+\.[^/\s]+/i.test(u));
const looksLikeLink = (v: string) => extractUrls(v).length > 0;
interface JobStatus {
  state: 'downloading' | 'processing' | 'ready' | 'error';
  progress: number | null;
  title: string | null;
  thumbnail: boolean;
  error: string | null;
}

const sleep = (ms: number, signal: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    const t = setTimeout(resolve, ms);
    signal.addEventListener('abort', () => {
      clearTimeout(t);
      reject(new DOMException('Aborted', 'AbortError'));
    }, { once: true });
  });

/** Resolves true once the image loads, false if it can't be shown. */
const loadImage = (src: string) =>
  new Promise<boolean>((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img.naturalWidth > 0);
    img.onerror = () => resolve(false);
    img.src = src;
  });

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
    update({ message: 'Starting on the server…', progress: null });
    const { id } = await requestJson<{ id: string }>('POST', `/api/download/${platform}/jobs`, job.input, signal);
    const base = `/api/download/jobs/${id}`;
    // Removing or clearing the row cancels the server side too.
    const cancel = () => void requestJson('DELETE', base).catch(() => {});
    signal.addEventListener('abort', cancel, { once: true });

    let thumb: Promise<void> | null = null;
    for (;;) {
      const s = await requestJson<JobStatus>('GET', base, undefined, signal);
      if (s.title) update({ name: s.title });
      if (s.thumbnail && !thumb) {
        const src = apiUrl(`${base}/thumb`);
        thumb = loadImage(src).then((ok) => {
          if (ok && !signal.aborted) update({ preview: src });
        });
      }
      if (s.state === 'error') throw new Error(s.error || 'Download failed');
      if (s.state === 'ready') break;
      if (s.state === 'processing') update({ message: 'Processing on the server', progress: null });
      else if (s.progress != null) update({ message: 'Downloading on the server', progress: s.progress });
      else update({ message: 'Fetching on the server…', progress: null });
      await sleep(700, signal);
    }

    update({ message: 'Sending to you', progress: 0 });
    const res = await getBlob(`${base}/file`, { onDownload: (p) => update({ progress: p }) }, signal);
    signal.removeEventListener('abort', cancel);
    const filename = res.filename ?? `${platform}.${job.input.mode === 'audio' ? 'm4a' : 'mp4'}`;
    update({
      status: 'done',
      progress: 1,
      message: `${job.input.mode === 'audio' ? 'Audio' : 'Video'} · ${formatSize(res.blob.size)}`,
      result: { url: URL.createObjectURL(res.blob), filename },
    });
    // No usable thumbnail from the platform: fall back to a frame of the video.
    await thumb;
    if (!jobsRef.current.find((j) => j.id === job.id)?.preview && job.input.mode === 'video') {
      const frame = await videoFrame(res.blob);
      if (frame) update({ preview: frame });
    }
  };

  const { jobs, add, remove, retry, clear } = useJobs(runner);
  const jobsRef = useRef(jobs);
  jobsRef.current = jobs;

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

      <JobList jobs={jobs} icon={<ToolIcon tool={platform} size={26} />} onRemove={remove} onRetry={retry} onClear={clear} />
    </>
  );
}
