/**
 * Grab one frame from a video as a small JPEG and return an object URL for
 * it, or null if the browser can't decode the video (e.g. some MKV/AVI).
 */
export function videoFrame(src: Blob, maxSize = 160, timeoutMs = 8000): Promise<string | null> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(src);
    const v = document.createElement('video');
    let settled = false;
    const done = (result: string | null) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      v.removeAttribute('src');
      v.load();
      URL.revokeObjectURL(url);
      resolve(result);
    };
    const timer = setTimeout(() => done(null), timeoutMs);
    v.muted = true;
    v.playsInline = true;
    v.preload = 'auto';
    v.onerror = () => done(null);
    // Try a few points in: the first second is often a black fade-in, and
    // a frame drawn right after seeking can still be blank.
    let times: number[] = [];
    const draw = () => {
      const w = v.videoWidth;
      const h = v.videoHeight;
      if (!w || !h) return done(null);
      const scale = Math.min(1, maxSize / Math.max(w, h));
      const c = document.createElement('canvas');
      c.width = Math.round(w * scale);
      c.height = Math.round(h * scale);
      const ctx = c.getContext('2d', { willReadFrequently: true });
      if (!ctx) return done(null);
      ctx.drawImage(v, 0, 0, c.width, c.height);
      if (isBlank(ctx, c.width, c.height)) {
        // A black square is worse than the placeholder icon.
        if (!times.length) return done(null);
        v.currentTime = times.shift()!;
        return;
      }
      c.toBlob((b) => done(b ? URL.createObjectURL(b) : null), 'image/jpeg', 0.8);
    };
    v.onloadedmetadata = () => {
      const d = Number.isFinite(v.duration) ? v.duration : 0;
      times = [0.1, 0.25, 0.5].map((f) => d * f).filter((t) => t > 0);
      v.currentTime = times.shift() ?? 0;
    };
    v.onseeked = () => {
      // Wait until the seeked frame is actually presented before drawing it.
      // (Some browsers never fire that for a detached element, hence the timer.)
      let drawn = false;
      const once = () => {
        if (drawn || settled) return;
        drawn = true;
        draw();
      };
      const rvfc = (v as HTMLVideoElement & { requestVideoFrameCallback?: (cb: () => void) => number }).requestVideoFrameCallback;
      if (rvfc) rvfc.call(v, once);
      setTimeout(once, 400);
    };
    v.src = url;
  });
}

/** True when the frame is (nearly) all black, or all one flat color. */
function isBlank(ctx: CanvasRenderingContext2D, w: number, h: number) {
  let data: Uint8ClampedArray;
  try {
    data = ctx.getImageData(0, 0, w, h).data;
  } catch {
    return false;
  }
  let sum = 0;
  let min = 255;
  let max = 0;
  for (let i = 0; i < data.length; i += 16) {
    const y = (data[i] * 2 + data[i + 1] * 5 + data[i + 2]) >> 3;
    sum += y;
    if (y < min) min = y;
    if (y > max) max = y;
  }
  const mean = sum / (data.length / 16);
  return mean < 16 || max - min < 8;
}

export const isVideoName = (name: string) => /\.(mp4|m4v|mov|webm|mkv|avi|3gp|ts|mts|m2ts|wmv|flv)$/i.test(name);
export const isImageName = (name: string) => /\.(jpe?g|png|webp|gif|avif|tiff?|heic|heif)$/i.test(name);
