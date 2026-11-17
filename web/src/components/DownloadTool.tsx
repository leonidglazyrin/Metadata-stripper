import { useEffect, useMemo, useRef, useState, type ClipboardEvent, type KeyboardEvent } from 'react';
import { useJobs, type Job, type Runner } from '../lib/jobs';
import { apiUrl, formatSize, getBlob, RequestError, requestJson } from '../lib/request';
import { gateError, preflight, refreshAccount, useAccountState } from '../lib/account';
import { load, save, useStored } from '../lib/storage';
import { platformOf, PLATFORM_LABEL, type DownloaderId, type Platform, type ToolInfo } from '../tools';
import { IconClose } from './Icons';
import DownloadList, { type Post } from './DownloadList';
import { videoFrame } from '../lib/thumb';

export type Mode = 'video' | 'audio';
export interface Input {
  url: string;
  mode: Mode;
  /** The site the link is from; null when it's none we support (the row only shows the error). */
  platform: Platform | null;
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
  /** Channel or account that posted it */
  author?: string | null;
  /** "Video title - Channel" */
  name?: string | null;
  thumbnail: boolean;
  error: string | null;
  /** 'extract' while audio is being pulled from a video already on the server */
  step?: 'extract' | null;
  filename?: string | null;
  size?: number | null;
  /** When the server deletes the job (ms since epoch) */
  expiresAt?: number | null;
}

/** A row from the account's history on the server (GET /api/download/history/:platform). */
interface HistoryRow {
  id: string;
  url: string;
  mode: Mode;
  name: string | null;
  serverId: string | null;
  status: 'pending' | 'ready' | 'error' | 'expired';
  message: string | null;
}

/** One row as remembered in localStorage, so a reload brings it back. */
interface SavedRow {
  id: string;
  url: string;
  mode: Mode;
  platform?: Platform | null;
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
const NOT_SUPPORTED = 'Not a YouTube, X, Instagram or TikTok link';
const ext = (mode: Mode) => (mode === 'audio' ? 'm4a' : 'mp4');

/** Save a finished file. Spaced out, since browsers drop clicks that come too fast. */
let nextSave = 0;
function saveFile(result: { url: string; filename: string }) {
  const at = Math.max(Date.now(), nextSave);
  nextSave = at + 300;
  setTimeout(() => {
    const a = document.createElement('a');
    a.href = result.url;
    a.download = result.filename;
    a.click();
  }, at - Date.now());
}

export default function DownloadTool({ tool }: { tool: ToolInfo }) {
  // One site's tab, or 'mix' (Meli-melo): any of the four, each link sent to
  // its own site's downloader.
  const tab = tool.id as DownloaderId;
  const mixed = tab === 'mix';
  /** The site a link goes to on this tab; null when it can't go anywhere. */
  const routeOf = (url: string): Platform | null => {
    const p = platformOf(url);
    return mixed ? p : p && p !== tab ? p : (tab as Platform);
  };
  /** Why a link can't be fetched on this tab, or null when it can. Checked before anything is sent. */
  const blocked = (platform: Platform | null) =>
    !platform
      ? NOT_SUPPORTED
      : !mixed && platform !== tab
        ? `That’s a ${PLATFORM_LABEL[platform]} link. Open the ${PLATFORM_LABEL[platform]} tab, or Meli-melo for a mix.`
        : null;
  // Switching this only changes what the page shows and what the next click
  // fetches. It never starts anything on the server by itself.
  const [mode, setMode] = useStored<Mode>(`mode:${tab}`, 'video');
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

  // Rows belong to the signed-in account: the server keeps them, so they
  // show on every device and after a reload. localStorage is a per-account
  // cache (and the only store when there are no accounts).
  const { account } = useAccountState();
  const who = account ? (account.signedIn ? account.user?.email || 'account' : '') : null;
  const synced = Boolean(account?.paywall && account.signedIn);
  const keyFor = (t: DownloaderId) => (who ? `downloads:${t}:${who}` : `downloads:${t}`);
  const storeKey = keyFor(tab);

  const runner: Runner<Input> = async (job, update, signal) => {
    const platform = job.input.platform;
    const why = blocked(platform);
    if (why || !platform) throw new Error(why ?? NOT_SUPPORTED);
    let id = serverIds.current.get(job.id);
    const resumed = Boolean(id);
    if (!id) {
      update({ message: 'Starting on the server…', progress: null });
      try {
        const { url, mode, from } = job.input;
        id = (await requestJson<{ id: string }>('POST', `/api/download/${platform}/jobs`, { url, mode, ...(from ? { from } : {}), rowId: job.id }, signal)).id;
      } catch (e) {
        throw gateError(e, 'download');
      }
      void refreshAccount();
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
    // Tracked here, not read back from the rows: a state update made just
    // before isn't rendered yet, so the rows would say there's no preview and
    // the video-frame fallback would replace the real thumbnail.
    let gotThumb = false;
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
      if (s.name || s.title) update({ name: (s.name || s.title)! });
      if (s.thumbnail && !thumb) {
        const src = apiUrl(`${base}/thumb`);
        thumb = loadImage(src).then((ok) => {
          if (ok && !signal.aborted) {
            gotThumb = true;
            update({ preview: src });
          }
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
        result: { url: apiUrl(`${base}/file`), filename: s.filename ?? `${platform}.${ext(job.input.mode)}` },
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
    const filename = res.filename ?? `${platform}.${ext(job.input.mode)}`;
    update({
      status: 'done',
      progress: 1,
      message: `${kind} · ${formatSize(res.blob.size)}`,
      result: { url: URL.createObjectURL(res.blob), filename },
    });
    // No usable thumbnail from the platform: fall back to a frame of the video.
    await thumb;
    if (!gotThumb && job.input.mode === 'video') {
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
      platform: j.input.platform,
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

  // Load the rows whenever who is signed in changes (and once the account is
  // known). Signed in: the account's rows from the server, plus any local
  // rows that never reached it. Otherwise: this browser's rows.
  useEffect(() => {
    if (who === null) return;
    let cancelled = false;
    setRestored(false);
    clear();
    serverIds.current.clear();
    expiry.current.clear();
    (async () => {
      const local = load<SavedRow[]>(storeKey, []);
      let saved: SavedRow[] = Array.isArray(local) ? local : [];
      // The server keeps rows per site. Meli-melo's rows are kept on the site
      // they went to, and this browser remembers which ones were Meli-melo's
      // so they show there and not twice. (On another device they show on
      // their own site's tab.)
      if (synced && !mixed) {
        try {
          const h = await requestJson<{ enabled: boolean; rows: HistoryRow[] }>('GET', `/api/download/history/${tab}`);
          if (h.enabled) {
            const mixRows = load<SavedRow[]>(keyFor('mix'), []);
            const inMix = new Set(Array.isArray(mixRows) ? mixRows.map((r) => r.id) : []);
            const rows = h.rows.filter((r) => !inMix.has(r.id));
            const onServer = new Set(rows.map((r) => r.id));
            const fromServer: SavedRow[] = rows.map((r) => ({
              id: r.id,
              url: r.url,
              mode: r.mode,
              name: r.name || shortUrl(r.url),
              ...(r.serverId ? { serverId: r.serverId } : {}),
              ...(r.status === 'error' && !r.serverId ? { status: 'error' as const, message: r.message || 'Download failed' } : {}),
              ...(r.status === 'expired' ? { status: 'error' as const, message: EXPIRED } : {}),
            }));
            // Local rows the server has never seen (still queued here).
            const queued = saved.filter((r) => !r.serverId && !r.status && !onServer.has(r.id));
            saved = [...queued, ...fromServer];
          }
        } catch {
          /* offline or the account store is down: show the local copy */
        }
      }
      if (cancelled) return;
      if (saved.length) {
        for (const r of saved) if (r.serverId) serverIds.current.set(r.id, r.serverId);
        // add() puts the first item at the bottom; saved rows are newest first.
        add(
          [...saved].reverse().map((r) => ({
            id: r.id,
            input: { url: r.url, mode: r.mode, platform: r.platform !== undefined ? r.platform : routeOf(r.url), ...(r.from ? { from: r.from } : {}) },
            name: r.name,
            // Server job: poll it now. Failed row: just show it. Never started: queue it.
            immediate: Boolean(r.serverId),
            ...(r.status === 'error' && !r.serverId ? { status: 'error' as const, message: r.message || 'Download failed' } : {}),
          })),
        );
      }
      setRestored(true);
    })();
    // React's dev double-mount, or another account: start over cleanly.
    return () => {
      cancelled = true;
      clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [who, tab]);

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
    autoSave.current.delete(id);
    if (sid) void requestJson('DELETE', `/api/download/jobs/${sid}`).catch(() => {});
  };
  const dropHistory = (j: Job<Input>) => {
    if (synced && j.input.platform) void requestJson('DELETE', `/api/download/history/${j.input.platform}/${j.id}`).catch(() => {});
  };
  /** Remove a link: both its formats go. */
  const onRemove = (url: string) => {
    for (const j of jobsRef.current.filter((k) => k.input.url === url)) {
      dropOnServer(j.id);
      dropHistory(j);
      remove(j.id);
    }
  };
  const onClear = () => {
    for (const j of jobsRef.current) dropOnServer(j.id);
    if (synced) {
      // A site's tab clears that site's history; Meli-melo only its own rows.
      if (mixed) jobsRef.current.forEach(dropHistory);
      else void requestJson('DELETE', `/api/download/history/${tab}`).catch(() => {});
    }
    clear();
  };
  const onRetry = async (id: string) => {
    if (!(await preflight('download'))) return;
    expiry.current.delete(id);
    retry(id);
  };

  // One row per link. The row shows the link in the format picked above: a
  // finished audio row stays hidden while Video is picked, and the other way
  // round. A link not fetched in this format yet shows a "Get" button; only a
  // click on it (or on Download all) asks the server for anything.
  const posts = useMemo<Post[]>(() => {
    const byUrl = new Map<string, Job<Input>[]>();
    // Oldest first, so a link keeps its place when its other format is added.
    for (const j of [...jobs].reverse()) {
      const list = byUrl.get(j.input.url);
      if (list) list.push(j);
      else byUrl.set(j.input.url, [j]);
    }
    return [...byUrl.entries()].reverse().map(([url, list]) => {
      const newest = [...list].reverse();
      const other = newest.find((j) => j.input.mode !== mode);
      const platform = newest[0].input.platform;
      const no = Boolean(blocked(platform));
      // A link that can't be fetched shows why, whichever format is picked.
      const cur = newest.find((j) => j.input.mode === mode) ?? (no ? other : undefined);
      return { url, platform, cur, other, blocked: no };
    });
  }, [jobs, mode]);

  /** Rows to save to disk once they're ready (Download all). */
  const autoSave = useRef(new Set<string>());
  useEffect(() => {
    for (const j of jobs) {
      if (!autoSave.current.has(j.id)) continue;
      if (j.status === 'done' && j.result) {
        autoSave.current.delete(j.id);
        saveFile(j.result);
      } else if (j.status === 'error') autoSave.current.delete(j.id);
    }
  }, [jobs]);

  /** Fetch a link in the picked format (or retry it if that failed). */
  const fetchPost = (post: Post, save = false) => {
    if (blocked(post.platform)) return;
    if (post.cur) {
      if (post.cur.status === 'error') {
        expiry.current.delete(post.cur.id);
        retry(post.cur.id);
        if (save) autoSave.current.add(post.cur.id);
      } else if (save && post.cur.status !== 'done') autoSave.current.add(post.cur.id);
      return;
    }
    const src = post.other;
    // Audio of a video the server already has comes out of that file.
    const from = mode === 'audio' && src?.input.mode === 'video' && src.status === 'done' ? serverIds.current.get(src.id) : undefined;
    const [id] = add([
      {
        input: { url: post.url, mode, platform: post.platform, ...(from ? { from } : {}) },
        name: src?.name ?? shortUrl(post.url),
        // Blob previews belong to their row and are revoked with it.
        preview: src?.preview && !src.preview.startsWith('blob:') ? src.preview : undefined,
      },
    ]);
    if (save) autoSave.current.add(id);
  };
  const onFetch = async (url: string) => {
    const post = posts.find((p) => p.url === url);
    if (!post || !(await preflight('download'))) return;
    fetchPost(post);
  };

  /** Every link in the picked format: saves the ready ones and fetches the rest, saving each as it lands. */
  const onDownloadAll = async () => {
    const toFetch = posts.filter((p) => !blocked(p.platform) && (!p.cur || p.cur.status === 'waiting' || p.cur.status === 'active'));
    if (toFetch.some((p) => !p.cur) && !(await preflight('download'))) return;
    for (const p of posts) if (p.cur?.status === 'done' && p.cur.result) saveFile(p.cur.result);
    for (const p of toFetch) fetchPost(p, true);
  };

  const submit = async () => {
    if (!urls.length) return refs.current[0]?.focus();
    // Signed out or out of free downloads: say so before sending anything.
    if (!(await preflight('download'))) return;
    const fresh: string[] = [];
    for (const url of urls) {
      const post = posts.find((p) => p.url === url);
      // Already in the list: fetch it in this format if it isn't yet.
      if (post) fetchPost(post);
      else fresh.push(url);
    }
    add(
      fresh.map((url) => {
        const platform = routeOf(url);
        const why = blocked(platform);
        return {
          input: { url, mode, platform },
          name: shortUrl(url),
          // Not a link this tab can fetch: show why, send nothing.
          ...(why ? { status: 'error' as const, message: why } : {}),
        };
      }),
    );
    setFields(['']);
    focusNext.current = 0;
  };

  const noun = mode === 'audio' ? 'audio' : urls.length > 1 ? 'videos' : 'video';

  return (
    <>
      <div className="options format-row">
        <div className="segmented format" role="radiogroup" aria-label="What to download">
          {(['video', 'audio'] as const).map((m) => (
            <button key={m} type="button" role="radio" aria-checked={mode === m} onClick={() => setMode(m)}>
              {m === 'video' ? <IconFilm /> : <IconNote />}
              {m === 'video' ? 'Video' : 'Audio'}
              <small>{m === 'video' ? 'MP4' : 'M4A'}</small>
            </button>
          ))}
        </div>
        <small className="options-note">
          Public videos only. Switching format fetches nothing until you download.
        </small>
      </div>

      <form
        className="paste"
        autoComplete="off"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          void submit();
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
          {urls.length > 1 ? `Download ${urls.length} ${noun}` : `Download ${noun}`}
        </button>
      </form>

      <DownloadList
        posts={posts}
        mode={mode}
        tool={tab}
        onRemove={onRemove}
        onRetry={(id) => void onRetry(id)}
        onFetch={(url) => void onFetch(url)}
        onDownloadAll={() => void onDownloadAll()}
        onClear={onClear}
      />
    </>
  );
}

const IconFilm = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="m10 9.5 4.5 2.5-4.5 2.5z" fill="currentColor" />
  </svg>
);

const IconNote = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 18V6l11-2v12" />
    <circle cx="6.5" cy="18" r="2.5" />
    <circle cx="17.5" cy="16" r="2.5" />
  </svg>
);
