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
    v.onloadedmetadata = () => {
      // A little way in, to skip black first frames.
      const d = Number.isFinite(v.duration) ? v.duration : 0;
      v.currentTime = Math.min(1, d * 0.25);
    };
    v.onseeked = () => {
      const w = v.videoWidth;
      const h = v.videoHeight;
      if (!w || !h) return done(null);
      const scale = Math.min(1, maxSize / Math.max(w, h));
      const c = document.createElement('canvas');
      c.width = Math.round(w * scale);
      c.height = Math.round(h * scale);
      const ctx = c.getContext('2d');
      if (!ctx) return done(null);
      ctx.drawImage(v, 0, 0, c.width, c.height);
      c.toBlob((b) => done(b ? URL.createObjectURL(b) : null), 'image/jpeg', 0.8);
    };
    v.src = url;
  });
}

export const isVideoName = (name: string) => /\.(mp4|m4v|mov|webm|mkv|avi|3gp|ts|mts|m2ts|wmv|flv)$/i.test(name);
export const isImageName = (name: string) => /\.(jpe?g|png|webp|gif|avif|tiff?|heic|heif)$/i.test(name);
