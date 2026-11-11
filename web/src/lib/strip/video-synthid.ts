// On-device SynthID stripping for videos.
//
// Mirrors the server's re-encode (server/index.js, stripVideo with synthid):
//   -vf gblur=sigma=0.3,noise=c0s=2:c0f=t,unsharp=3:3:0.4:3:3:0
//   -c:v libx264 -crf 18   -c:a aac -b:a 256k
//
// Fast path: WebCodecs (hardware decode + encode where the device has it) via
// Mediabunny, in a worker, with the same filters applied to each decoded YUV
// frame. No tags are written. Fallback: ffmpeg.wasm with the server's exact
// filter chain, for browsers without WebCodecs or containers Mediabunny can't
// read (AVI, WMV, FLV…). It works everywhere but is many times slower.

import type { VideoResult } from './video';
import type { WorkerReply } from './video-synthid.worker';

type Status = (msg: string, progress?: number | null) => void;

// WebCodecs output is held in memory until it's written out.
const MAX_FAST_BYTES = 1.5 * 1024 ** 3;

function runWorker(file: File, ext: string, onStatus: Status): Promise<VideoResult | { unsupported: string }> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL('./video-synthid.worker.ts', import.meta.url), { type: 'module' });
    const started = performance.now();
    worker.onmessage = (e: MessageEvent<WorkerReply>) => {
      const m = e.data;
      if (m.type === 'progress') {
        const secs = (performance.now() - started) / 1000;
        const eta = m.progress > 0.03 ? ` · ~${Math.max(1, Math.round((secs / m.progress) * (1 - m.progress)))}s left` : '';
        onStatus(`Removing SynthID · ${Math.round(m.progress * 100)}%${eta}`, m.progress);
        return;
      }
      worker.terminate();
      if (m.type === 'done') {
        console.info(`[synthid] ${m.codec} via ${m.path} in ${((performance.now() - started) / 1000).toFixed(1)}s`);
        resolve({ blob: new Blob([m.buffer], { type: m.mime }), ext: m.ext, found: m.found });
      } else if (m.type === 'unsupported') resolve({ unsupported: m.reason });
      else reject(new Error(m.message));
    };
    worker.onerror = (e) => {
      worker.terminate();
      resolve({ unsupported: e.message || 'worker failed to start' });
    };
    onStatus('Loading video engine…', null);
    worker.postMessage({ file, ext });
  });
}

export async function stripVideoSynthidInBrowser(file: File, ext: string, onStatus: Status): Promise<VideoResult> {
  let reason = 'file too large for the fast path';
  if (file.size <= MAX_FAST_BYTES && typeof Worker !== 'undefined') {
    const r = await runWorker(file, ext, onStatus);
    if (!('unsupported' in r)) return r;
    reason = r.unsupported;
  }
  console.info('[synthid] using ffmpeg.wasm:', reason);
  const { stripVideoInBrowser } = await import('./video');
  return stripVideoInBrowser(file, ext, onStatus, { synthid: true });
}
