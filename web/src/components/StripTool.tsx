import { useRef, useState, type DragEvent } from 'react';
import { useJobs, type Runner } from '../lib/jobs';
import { postForBlob, formatSize } from '../lib/request';
import { useStored } from '../lib/storage';
import { IconFile, IconPlus } from './Icons';
import JobList from './JobList';
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
  const synthRef = useRef(synthid);
  synthRef.current = synthid;

  const runner: Runner<File> = async (job, update, signal) => {
    const fd = new FormData();
    fd.append('synthid', String(synthRef.current));
    fd.append('file', job.input);
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
    const filename = res.filename ?? job.input.name;
    let message = formatSize(res.blob.size);
    if (rep) {
      const count = rep.before.found.length + Object.keys(rep.before.tags ?? {}).length;
      message = count ? `Removed ${rep.before.found.join(', ') || `${count} tags`}` : 'Nothing found, already clean';
    }
    update({ status: 'done', progress: 1, message, result: { url: URL.createObjectURL(res.blob), filename } });
  };

  const { jobs, add, clear } = useJobs(runner);

  const addFiles = (files: FileList | null) => {
    if (!files?.length) return;
    add(
      [...files].map((f) => {
        const kind = f.type.startsWith('image/') ? 'image' : f.type.startsWith('video/') ? 'video' : null;
        return { input: f, name: f.name, preview: kind ? { url: URL.createObjectURL(f), kind } : undefined };
      }),
    );
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
        <Switch
          checked={synthid}
          onChange={setSynthid}
          label="Strip SynthID watermarks"
          hint="Disrupts invisible AI watermarks. Near-lossless."
        />
      </div>

      <JobList jobs={jobs} icon={<IconFile />} onClear={clear} />
    </>
  );
}
