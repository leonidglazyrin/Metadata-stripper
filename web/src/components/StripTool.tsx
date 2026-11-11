import { useRef, useState, type DragEvent } from 'react';
import { useJobs, type Runner, type Update } from '../lib/jobs';

type Where = 'server' | 'device';
import { postForBlob, formatSize } from '../lib/request';
import { useStored } from '../lib/storage';
import { IconFile, IconPlus } from './Icons';
import JobList from './JobList';
import { isImageName, isVideoName, videoFrame } from '../lib/thumb';
import Switch from './Switch';

interface Report {
  before: { found: string[]; tags?: Record<string, string> };
}

function decodeReport(b64: string | null): Report | null {
  if (!b64) return null;
  try {
    return JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(b64), (c) => c.charCodeAt(0))));
  } catch {
    return null;
  }
}

export default function StripTool() {
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
        onUpload: (p) => update({ progress: p, message: `Uploading · ${Math.round(p * 100)}%` }),
        onUploaded: () => update({ progress: null, message: 'Cleaning…' }),
      },
      signal,
    );
    const rep = decodeReport(res.header('X-Strip-Report'));
    let message = formatSize(res.blob.size);
    if (rep) {
      const count = rep.before.found.length + Object.keys(rep.before.tags ?? {}).length;
      message = count ? `Removed ${rep.before.found.join(', ') || `${count} tags`}` : 'Nothing found, already clean';
    }
    return { blob: res.blob, filename: res.filename ?? file.name, message };
  };

  const stripOnDevice = async (file: File, update: Update) => {
    const { stripInBrowser } = await import('../lib/strip');
    const r = await stripInBrowser(file, { synthid: synthRef.current }, (message, progress = null) =>
      update({ message, progress }),
    );
    const message = r.removed.length ? `Removed ${r.removed.join(', ')} · on this device` : 'Nothing found, already clean · on this device';
    return { blob: r.blob, filename: r.filename, message };
  };

  const runner: Runner<File> = async (job, update, signal) => {
    const { blob, filename, message } =
      whereRef.current === 'device' ? await stripOnDevice(job.input, update) : await stripOnServer(job.input, update, signal);
    if (signal.aborted) return;
    update({ status: 'done', progress: 1, message, result: { url: URL.createObjectURL(blob), filename } });
    // Show the cleaned file itself: HEIC comes back as a browser-viewable JPEG.
    if (!job.preview && isImageName(filename)) update({ preview: URL.createObjectURL(blob) });
    if (!job.preview && isVideoName(filename)) {
      const frame = await videoFrame(blob);
      if (frame) update({ preview: frame });
    }
  };

  const { jobs, add, remove, clear, setPreview } = useJobs(runner);

  const addFiles = (files: FileList | null) => {
    if (!files?.length) return;
    const list = [...files];
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
          addFiles(e.dataTransfer.files);
        }}
      >
        <input
          ref={input}
          type="file"
          multiple
          hidden
          accept="image/*,video/*,.heic,.heif,.mkv,.mts,.m2ts"
          onChange={(e) => {
            addFiles(e.target.files);
            e.target.value = '';
          }}
        />
        <span className="drop-plus"><IconPlus /></span>
        <strong>Drop files or click to upload</strong>
        <small>JPEG, PNG, HEIC, WebP, MP4, MOV, MKV and more</small>
      </label>

      <div className="options">
        <div className="where">
          <div className="segmented" role="radiogroup" aria-label="Where to clean files">
            {(['server', 'device'] as const).map((w) => (
              <button key={w} type="button" role="radio" aria-checked={where === w} onClick={() => setWhere(w)}>
                {w === 'server' ? 'Server' : 'This device'}
              </button>
            ))}
          </div>
          <small>
            {where === 'server'
              ? 'Uploaded, cleaned, then deleted right away. Handles every format.'
              : 'Never leaves your device. Photos are lossless; videos load a ~30 MB engine once.'}
          </small>
        </div>
        <Switch
          checked={synthid}
          onChange={setSynthid}
          label="Strip SynthID watermarks"
          hint={where === 'device' ? 'Videos are re-encoded on this device, so they take a while.' : 'Disrupts invisible AI watermarks. Near-lossless.'}
        />
      </div>

      <JobList jobs={jobs} icon={<IconFile />} onRemove={remove} onClear={clear} />
    </>
  );
}
