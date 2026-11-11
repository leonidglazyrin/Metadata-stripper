// In-browser video remux with ffmpeg.wasm. The core (~30 MB) is bundled with
// the app and only downloaded the first time a video is stripped on-device.

import type { FFmpeg } from '@ffmpeg/ffmpeg';

let loading: Promise<FFmpeg> | null = null;
let lock: Promise<unknown> = Promise.resolve();

async function getFFmpeg(onStatus: (msg: string) => void): Promise<FFmpeg> {
  if (!loading) {
    onStatus('Loading video engine…');
    loading = (async () => {
      const [{ FFmpeg }, { default: coreURL }, { default: wasmURL }] = await Promise.all([
        import('@ffmpeg/ffmpeg'),
        import('@ffmpeg/core?url'),
        import('@ffmpeg/core/wasm?url'),
      ]);
      const ff = new FFmpeg();
      await ff.load({ coreURL, wasmURL });
      return ff;
    })();
    loading.catch(() => {
      loading = null;
    });
  }
  return loading;
}

/** ffmpeg.wasm runs one command at a time; queue callers. */
function exclusive<T>(fn: () => Promise<T>): Promise<T> {
  const run = lock.then(fn, fn);
  lock = run.catch(() => {});
  return run;
}

async function exec(ff: FFmpeg, args: string[]) {
  const lines: string[] = [];
  const onLog = ({ message }: { message: string }) => lines.push(message);
  ff.on('log', onLog);
  try {
    const code = await ff.exec(args);
    return { code, log: lines.join('\n') };
  } finally {
    ff.off('log', onLog);
  }
}

const IGNORE_TAGS = new Set(['major_brand', 'minor_version', 'compatible_brands', 'duration', 'language', 'vendor_id']);
const GENERIC_HANDLERS = /^(VideoHandler|SoundHandler|SubtitleHandler|TextHandler|Core Media \w+)?$/;

/** Pull what `ffmpeg -i` reports: codecs, tags, data tracks, chapters. */
function parseProbe(log: string) {
  const found = new Set<string>();
  const tags: string[] = [];
  for (const m of log.matchAll(/^\s{4,}([\w.:@©-]+)\s*:\s*(.*)$/gm)) {
    const [, key, value] = m;
    const k = key.toLowerCase();
    if (IGNORE_TAGS.has(k)) continue;
    if (k === 'encoder' && /^Lavf/.test(value) && !/\d/.test(value)) continue;
    if (k === 'handler_name' && GENERIC_HANDLERS.test(value.trim())) continue;
    if (/^(Stream|Duration|Chapter|Input|Output)/.test(key)) continue;
    tags.push(key);
  }
  if (tags.length) found.add('Container / stream tags');
  if (/Stream #\d+:\d+.*: Data:/.test(log)) found.add('Data track (GPS / telemetry / timecode)');
  if (/Chapter #/.test(log)) found.add('Chapters');
  if (tags.some((t) => /location|xyz/i.test(t))) found.add('GPS / location');
  const videoCodecs = [...log.matchAll(/Stream #\d+:\d+.*?: Video: (\w+)/g)]
    .filter((m) => !/attached pic/.test(m[0]))
    .map((m) => m[1]);
  return { found: [...found], videoCodecs };
}

export interface VideoResult {
  blob: Blob;
  ext: string;
  found: string[];
}

export async function stripVideoInBrowser(
  file: File,
  ext: string,
  onStatus: (msg: string, progress?: number | null) => void,
  { synthid = false } = {},
): Promise<VideoResult> {
  if (file.size > 1.8 * 1024 ** 3) throw new Error('Too large to process in the browser (max ~1.8 GB). Switch to Server.');
  const ff = await getFFmpeg((m) => onStatus(m, null));
  return exclusive(async () => {
    const dir = `/job${Math.random().toString(36).slice(2)}`;
    await ff.createDir(dir);
    // WORKERFS reads the File in place instead of copying it into memory.
    await ff.mount('WORKERFS' as never, { files: [file] }, dir);
    const input = `${dir}/${file.name}`;
    const outputs: string[] = [];
    const onProgress = ({ progress }: { progress: number }) => {
      if (progress >= 0 && progress <= 1) {
        onStatus(synthid ? 'Removing SynthID (slow engine)' : 'Cleaning', progress);
      }
    };
    try {
      onStatus('Reading metadata…', null);
      const probe = parseProbe((await exec(ff, ['-hide_banner', '-i', input])).log);
      const codecs = probe.videoCodecs;

      const attempt = async (outExt: string) => {
        const out = `/out${Math.random().toString(36).slice(2)}${outExt}`;
        outputs.push(out);
        const args = [
          '-hide_banner', '-y', '-i', input,
          '-map', '0:V?', '-map', '0:a?', '-map', '0:s?', '-dn',
          '-map_metadata', '-1',
          '-map_metadata:s:v', '-1', '-map_metadata:s:a', '-1', '-map_metadata:s:s', '-1',
          '-map_chapters', '-1',
          '-fflags', '+bitexact', '-flags:v', '+bitexact', '-flags:a', '+bitexact',
          '-metadata', 'creation_time=', '-metadata:s', 'handler_name=', '-metadata:s', 'vendor_id=',
        ];
        if (synthid) {
          // Same filters, codec and CRF as the server. Only the x264 preset is
          // faster: it changes compression efficiency, not the filtering.
          args.push(
            '-vf', 'gblur=sigma=0.3,noise=c0s=2:c0f=t,unsharp=3:3:0.4:3:3:0',
            '-c:v', 'libx264', '-crf', '18', '-preset', 'veryfast', '-pix_fmt', 'yuv420p',
            '-c:a', 'aac', '-b:a', '256k', '-af', 'aresample=async=1',
          );
        } else {
          args.push('-c', 'copy');
          if (codecs.length === 1 && codecs[0] === 'h264') args.push('-bsf:v', 'filter_units=remove_types=6');
          if (codecs.length === 1 && codecs[0] === 'hevc') args.push('-bsf:v', 'filter_units=remove_types=39|40');
        }
        if (outExt === '.mp4' && ext !== '.mp4') args.push('-c:s', 'mov_text');
        if (['.mp4', '.mov', '.m4v'].includes(outExt)) args.push('-movflags', '+faststart');
        args.push(out);
        const { code, log } = await exec(ff, args);
        if (code !== 0) throw new Error(log.trim().split('\n').slice(-2).join(' ') || 'ffmpeg failed');
        return out;
      };

      const preferred = synthid && ext === '.webm' ? '.mkv'
        : ['.avi', '.wmv', '.flv', '.mts', '.m2ts', '.ts', '.3gp'].includes(ext) ? '.mp4' : ext;
      ff.on('progress', onProgress);
      let out: string;
      let outExt = preferred;
      try {
        out = await attempt(preferred);
      } catch {
        // Codec can't go back into its original container: use MKV.
        outExt = '.mkv';
        out = await attempt('.mkv');
      } finally {
        ff.off('progress', onProgress);
      }
      const data = (await ff.readFile(out)) as Uint8Array;
      const blob = new Blob([data.slice().buffer], { type: 'application/octet-stream' });
      return { blob, ext: outExt, found: probe.found };
    } finally {
      for (const o of outputs) await ff.deleteFile(o).catch(() => {});
      await ff.unmount(dir).catch(() => {});
      await ff.deleteDir(dir).catch(() => {});
    }
  });
}
