import { useRef, useState, type DragEvent } from 'react';
import { useJobs, type Runner, type Update } from '../lib/jobs';

type Where = 'server' | 'device';
import { postForBlob, requestJson } from '../lib/request';
import { gateError, preflight, refreshAccount } from '../lib/account';
import { useStored } from '../lib/storage';
import { IconFile, IconPlus } from './Icons';
import JobList from './JobList';
import { isImageName, isVideoName, videoFrame } from '../lib/thumb';
import Switch from './Switch';

export default function StripTool() {
  // SynthID stripping is on by default; metadata is always removed regardless.
  const [synthid, setSynthid] = useStored('synthid', true);
  const [over, setOver] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const [where, setWhere] = useStored<Where>('stripWhere', 'server');
  const synthRef = useRef(synthid);
  synthRef.current = synthid;
  const whereRef = useRef(where);
  whereRef.current = where;

  const stripOnServer = async (file: File, update: Update, signal: AbortSignal) => {
    const fd = new FormData();
    fd.append('synthid', String(synthRef.current));
    fd.append('file', file);
    update({ message: 'Uploading…', progress: 0 });
    const res = await postForBlob(
      '/api/strip',
      fd,
      {
        onUpload: (p) => update({ progress: p, message: 'Uploading' }),
        onUploaded: () => update({ progress: null, message: 'Cleaning…' }),
      },
      signal,
    );
    return { blob: res.blob, filename: res.filename ?? file.name };
  };

  const stripOnDevice = async (file: File, update: Update) => {
    // Nothing is uploaded, but the strip still counts against the account.
    update({ message: 'Checking your plan…', progress: null });
    const { credit } = await requestJson<{ credit?: string | null }>('POST', '/api/usage/strip');
    try {
      const { stripInBrowser } = await import('../lib/strip');
      const r = await stripInBrowser(file, { synthid: synthRef.current }, (message, progress = null) =>
        update({ message, progress }),
      );
      return { blob: r.blob, filename: r.filename };
    } catch (e) {
      // The strip failed: give back the strip pack credit it used, if any.
      if (credit) await requestJson('POST', '/api/usage/strip/refund', { credit }).catch(() => {});
      throw e;
    }
  };

  const runner: Runner<File> = async (job, update, signal) => {
    let out;
    try {
      out = whereRef.current === 'device' ? await stripOnDevice(job.input, update) : await stripOnServer(job.input, update, signal);
    } catch (e) {
      throw gateError(e, 'strip');
    }
    const { blob, filename } = out;
    void refreshAccount();
    if (signal.aborted) return;
    // Just "Ready": no extra text after it.
    update({ status: 'done', progress: 1, message: '', result: { url: URL.createObjectURL(blob), filename } });
    // Show the cleaned file itself: HEIC comes back as a browser-viewable JPEG.
    if (!job.preview && isImageName(filename)) update({ preview: URL.createObjectURL(blob) });
    if (!job.preview && isVideoName(filename)) {
      const frame = await videoFrame(blob);
      if (frame) update({ preview: frame });
    }
  };

  const { jobs, add, remove, retry, clear, setPreview } = useJobs(runner);

  // Asks the account first (sign-in, free uses, today's free trials), so a
  // file that would be refused is never queued or uploaded.
  const allowed = () => preflight(whereRef.current === 'device' ? 'strip' : 'server_strip');

  const addFiles = async (files: ArrayLike<File> | null) => {
    if (!files?.length) return;
    const list = Array.from(files);
    if (!(await allowed())) return;
    const ids = add(
      list.map((f) => ({
        input: f,
        name: f.name,
        // HEIC/HEIF won't render in most browsers; it gets a preview once cleaned.
        preview: f.type.startsWith('image/') && !/hei[cf]/i.test(f.type) ? URL.createObjectURL(f) : undefined,
      })),
    );
    // Videos: grab one frame from the original as the thumbnail.
    list.forEach(async (f, i) => {
      if (!f.type.startsWith('video/') && !isVideoName(f.name)) return;
      const frame = await videoFrame(f);
      if (frame) setPreview(ids[i], frame);
    });
  };

  const onDrag = (e: DragEvent, on: boolean) => {
    e.preventDefault();
    setOver(on);
  };

  return (
    <>
      <label
        className={`drop ${over ? 'over' : ''}`}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            input.current?.click();
          }
        }}
        onDragEnter={(e) => onDrag(e, true)}
        onDragOver={(e) => onDrag(e, true)}
        onDragLeave={(e) => onDrag(e, false)}
        onDrop={(e) => {
          onDrag(e, false);
          void addFiles(e.dataTransfer.files);
        }}
      >
        <input
          ref={input}
          type="file"
          multiple
          hidden
          accept="image/*,video/*,.heic,.heif,.mkv,.mts,.m2ts"
          onChange={(e) => {
            // Copy the list before clearing the input, which empties it.
            void addFiles(e.target.files ? Array.from(e.target.files) : null);
            e.target.value = '';
          }}
        />
        <span className="drop-plus"><IconPlus /></span>
        <strong>Drop files or click to upload</strong>
        <small>JPEG, PNG, HEIC, WebP, MP4, MOV, MKV and more</small>
      </label>

      <div className="options">
        <Switch
          className="synth-opt"
          checked={synthid}
          onChange={setSynthid}
          label={<><span className="synth-badge">SynthID</span> Strip AI watermarks</>}
          hint={where === 'device' ? 'Videos are re-encoded on this device, so they take a while.' : 'Works hard to break up the invisible watermark in AI photos and videos. Photos come out a touch softer and lightly grained.'}
        />
        <div className="where" role="radiogroup" aria-label="Where to clean files">
          {(['device', 'server'] as const).map((w) => (
            <button key={w} type="button" role="radio" aria-checked={where === w} onClick={() => setWhere(w)}>
              {w === 'device' ? (
                <>On this device <small>the server never sees it</small></>
              ) : (
                <>On the server <small>faster</small></>
              )}
            </button>
          ))}
        </div>
      </div>

      <JobList jobs={jobs} icon={<IconFile />} onRemove={remove} onRetry={(id) => void allowed().then((ok) => ok && retry(id))} onClear={clear} />
    </>
  );
}
