import { useEffect, useRef, useState, type ClipboardEvent, type KeyboardEvent } from 'react';
import { useJobs, type Runner } from '../lib/jobs';
import { apiUrl, formatSize, getBlob, RequestError, requestJson } from '../lib/request';
import { load, save, useStored } from '../lib/storage';
import type { Platform, ToolInfo } from '../tools';
import { IconClose, ToolIcon } from './Icons';
import JobList from './JobList';
import { videoFrame } from '../lib/thumb';

type Mode = 'video' | 'audio';
interface Input {
  url: string;
  mode: Mode;
  /** Server job id of a finished video of the same post: the audio is taken from it */
  from?: string;
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
  /** 'extract' while audio is being pulled from a video already on the server */
  step?: 'extract' | null;
  filename?: string | null;
  size?: number | null;
  /** When the server deletes the job (ms since epoch) */
  expiresAt?: number | null;
}

/** One row as remembered in localStorage, so a reload brings it back. */
interface SavedRow {
  id: string;
  url: string;
  mode: Mode;
  name: string;
  /** The server's job id, once it has one */
  serverId?: string;
  from?: string;
  status?: 'error';
  message?: string;
}

const MAX_SAVED = 50;
const EXPIRED = 'Expired · the server deleted this download. Retry to fetch it again.';

const clock = (ms: number) => new Date(ms).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

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

  /** Our row id → the server's job id. Kept in localStorage with the rows. */
  const serverIds = useRef(new Map<string, string>());
  /** Rows whose download link points at the server, and when it expires. */
  const expiry = useRef(new Map<string, number>());
  const storeKey = `downloads:${platform}`;

  const runner: Runner<Input> = async (job, update, signal) => {
    let id = serverIds.current.get(job.id);
    const resumed = Boolean(id);
    if (!id) {
      update({ message: 'Starting on the server…', progress: null });
      id = (await requestJson<{ id: string }>('POST', `/api/download/${platform}/jobs`, job.input, signal)).id;
      serverIds.current.set(job.id, id);
      persist();
    } else {
      update({ message: 'Checking on the server…', progress: null });
    }
    const base = `/api/download/jobs/${id}`;
    // The server's record is no use once it failed or is gone; a retry starts over.
    const forget = () => {
      serverIds.current.delete(job.id);
      persist();
    };

    let thumb: Promise<void> | null = null;
    let first = true;
    let s: JobStatus;
    for (;;) {
      try {
        s = await requestJson<JobStatus>('GET', base, undefined, signal);
      } catch (e) {
        if (e instanceof RequestError && e.status === 404) {
          forget();
          throw new Error(EXPIRED);
        }
        throw e;
      }
      if (s.title) update({ name: s.title });
      if (s.thumbnail && !thumb) {
        const src = apiUrl(`${base}/thumb`);
        thumb = loadImage(src).then((ok) => {
          if (ok && !signal.aborted) update({ preview: src });
        });
      }
      if (s.state === 'error') {
        forget();
        throw new Error(s.error || 'Download failed');
      }
      if (s.state === 'ready') break;
      if (s.step === 'extract') update({ message: 'Extracting the audio on the server', progress: s.progress });
      else if (s.state === 'processing') update({ message: 'Processing on the server', progress: null });
      else if (s.progress != null) update({ message: 'Downloading on the server', progress: s.progress });
      else update({ message: 'Fetching on the server…', progress: null });
      first = false;
      await sleep(700, signal);
    }

    const kind = job.input.mode === 'audio' ? 'Audio' : 'Video';
    if (resumed && first) {
      // Picked up after a reload and already finished: link straight to the
      // file on the server instead of pulling it into the page again.
      await thumb;
      if (s.expiresAt) expiry.current.set(job.id, s.expiresAt);
      update({
        status: 'done',
        progress: 1,
        message: `${kind}${s.size ? ` · ${formatSize(s.size)}` : ''}${s.expiresAt ? ` · on the server until ${clock(s.expiresAt)}` : ''}`,
        result: { url: apiUrl(`${base}/file`), filename: s.filename ?? `${platform}.${job.input.mode === 'audio' ? 'm4a' : 'mp4'}` },
      });
      return;
    }

    update({ message: 'Sending to you', progress: 0 });
    let res;
    try {
      res = await getBlob(`${base}/file`, { onDownload: (p) => update({ progress: p }) }, signal);
    } catch (e) {
      if (e instanceof RequestError && e.status === 404) {
        forget();
        throw new Error(EXPIRED);
      }
      throw e;
    }
    const filename = res.filename ?? `${platform}.${job.input.mode === 'audio' ? 'm4a' : 'mp4'}`;
    update({
      status: 'done',
      progress: 1,
      message: `${kind} · ${formatSize(res.blob.size)}`,
      result: { url: URL.createObjectURL(res.blob), filename },
    });
    // No usable thumbnail from the platform: fall back to a frame of the video.
    await thumb;
    if (!jobsRef.current.find((j) => j.id === job.id)?.preview && job.input.mode === 'video') {
      const frame = await videoFrame(res.blob);
      if (frame) update({ preview: frame });
    }
  };

  const { jobs, add, remove, retry, clear, update } = useJobs(runner);
  const jobsRef = useRef(jobs);
  jobsRef.current = jobs;

  // Remember the rows (and their server job ids) so a reload brings them back.
  const [restored, setRestored] = useState(false);
  function persist() {
    const rows: SavedRow[] = jobsRef.current.slice(0, MAX_SAVED).map((j) => ({
      id: j.id,
      url: j.input.url,
      mode: j.input.mode,
      ...(j.input.from ? { from: j.input.from } : {}),
      name: j.name,
      serverId: serverIds.current.get(j.id),
      ...(j.status === 'error' ? { status: 'error' as const, message: j.message } : {}),
    }));
    save(storeKey, rows);
  }
  useEffect(() => {
    if (restored) persist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobs, restored]);

  useEffect(() => {
    const saved = load<SavedRow[]>(storeKey, []);
    if (Array.isArray(saved) && saved.length) {
      for (const r of saved) if (r.serverId) serverIds.current.set(r.id, r.serverId);
      // add() puts the first item at the bottom; saved rows are newest first.
      add(
        [...saved].reverse().map((r) => ({
          id: r.id,
          input: { url: r.url, mode: r.mode, ...(r.from ? { from: r.from } : {}) },
          name: r.name,
          // Server job: poll it now. Failed row: just show it. Never started: queue it.
          immediate: Boolean(r.serverId),
          ...(r.status === 'error' && !r.serverId ? { status: 'error' as const, message: r.message || 'Download failed' } : {}),
        })),
      );
    }
    setRestored(true);
    // React's dev double-mount: start over cleanly on the second run.
    return () => clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Server links stop working when the server purges the file.
  useEffect(() => {
    const timers = jobs
      .filter((j) => j.status === 'done' && expiry.current.has(j.id))
      .map((j) =>
        setTimeout(() => {
          expiry.current.delete(j.id);
          serverIds.current.delete(j.id);
          update(j.id, { status: 'error', message: EXPIRED, result: undefined, progress: null });
        }, Math.max(0, expiry.current.get(j.id)! - Date.now())),
      );
    return () => timers.forEach(clearTimeout);
  }, [jobs, update]);

  // Removing or clearing rows deletes the server's copy too.
  const dropOnServer = (id: string) => {
    const sid = serverIds.current.get(id);
    serverIds.current.delete(id);
    expiry.current.delete(id);
    if (sid) void requestJson('DELETE', `/api/download/jobs/${sid}`).catch(() => {});
  };
  const onRemove = (id: string) => {
    dropOnServer(id);
    remove(id);
  };
  const onClear = () => {
    for (const j of jobsRef.current) dropOnServer(j.id);
    clear();
  };
  const onRetry = (id: string) => {
    expiry.current.delete(id);
    retry(id);
  };

  // A finished row in the other format than the switch: offer that format of
  // the same post. Audio from a video comes out of the file the server
  // already has; anything else is a fresh download.
  const canSwitch = (j: (typeof jobs)[number]) =>
    j.status === 'done' &&
    j.input.mode !== mode &&
    !jobs.some((k) => k.input.url === j.input.url && k.input.mode === mode && k.status !== 'error');
  const onSwitch = (id: string) => {
    const j = jobsRef.current.find((k) => k.id === id);
    if (!j) return;
    const from = mode === 'audio' && j.input.mode === 'video' ? serverIds.current.get(j.id) : undefined;
    add([
      {
        input: { url: j.input.url, mode, ...(from ? { from } : {}) },
        name: j.name,
        // Blob previews belong to their row and are revoked with it.
        preview: j.preview && !j.preview.startsWith('blob:') ? j.preview : undefined,
      },
    ]);
  };

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

      <JobList
        jobs={jobs}
        icon={<ToolIcon tool={platform} size={26} />}
        onRemove={onRemove}
        onRetry={onRetry}
        onClear={onClear}
        switchLabel={mode === 'audio' ? 'Get audio' : 'Get video'}
        canSwitch={(j) => canSwitch(j as (typeof jobs)[number])}
        onSwitch={onSwitch}
      />
    </>
  );
}
