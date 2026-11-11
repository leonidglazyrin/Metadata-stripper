// The server's SynthID video filter, applied directly to decoded YUV planes:
//
//   gblur=sigma=0.3            3×3 blur on every plane, matched to ffmpeg's response
//   noise=c0s=2:c0f=t          ±1 code value of uniform noise on luma, new pattern every frame
//   unsharp=3:3:0.4:3:3:0      3×3 unsharp mask on luma, amount 0.4, chroma untouched
//
// Working in YUV, like ffmpeg does, avoids a YUV→RGB→YUV round trip that would
// cost far more quality than the filter itself.

import type { VideoSample, VideoSamplePixelFormat } from 'mediabunny';

// ffmpeg's gblur is an IIR approximation, wider than a true sigma-0.3 Gaussian.
// Its measured impulse response is ≈ [0.0015, 0.038, 0.921, 0.038, 0.0015] per
// axis; these 3 taps fold the outer pair in so the strength matches.
const G1 = 0.0395;
const G0 = 1 - 2 * G1;
const AMOUNT = 0.4;

type Plane = Uint8Array | Uint16Array;

interface Layout {
  /** Plane index → [width divisor, height divisor, interleaved components] */
  planes: [number, number, number][];
  bits: 8 | 10 | 12;
  hasAlpha: boolean;
}

function layoutOf(format: VideoSamplePixelFormat | null): Layout | null {
  if (!format) return null;
  if (format === 'NV12') return { planes: [[1, 1, 1], [2, 2, 2]], bits: 8, hasAlpha: false };
  const m = format.match(/^I4(20|22|44)(A?)(?:P(10|12))?$/);
  if (!m) return null;
  const [sx, sy] = m[1] === '20' ? [2, 2] : m[1] === '22' ? [2, 1] : [1, 1];
  const planes: [number, number, number][] = [[1, 1, 1], [sx, sy, 1], [sx, sy, 1]];
  if (m[2]) planes.push([1, 1, 1]);
  return { planes, bits: (Number(m[3]) || 8) as 8 | 10 | 12, hasAlpha: !!m[2] };
}

export const canFilterYuv = (format: VideoSamplePixelFormat | null) => layoutOf(format) !== null;

let rowA = new Float32Array(0);
let rowB = new Float32Array(0);
let tmp = new Float32Array(0);
let lumaTmp: Plane = new Uint8Array(0);
let res: Plane = new Uint8Array(0);

/** 3×3 separable Gaussian into `dst`. Edges are clamped; `comps` handles interleaved NV12 chroma. */
function gblur(src: Plane, offset: number, stride: number, w: number, h: number, comps: number, dst: Float32Array) {
  const rw = w * comps;
  if (rowA.length < rw) rowA = new Float32Array(rw);
  // Vertical pass into `dst`, then horizontal in place via a row buffer.
  for (let y = 0; y < h; y++) {
    const up = offset + Math.max(0, y - 1) * stride;
    const mid = offset + y * stride;
    const dn = offset + Math.min(h - 1, y + 1) * stride;
    const o = y * rw;
    for (let x = 0; x < rw; x++) dst[o + x] = G0 * src[mid + x] + G1 * (src[up + x] + src[dn + x]);
  }
  for (let y = 0; y < h; y++) {
    const o = y * rw;
    rowA.set(dst.subarray(o, o + rw));
    for (let x = 0; x < rw; x++) {
      const l = x - comps < 0 ? x : x - comps;
      const r = x + comps >= rw ? x : x + comps;
      dst[o + x] = G0 * rowA[x] + G1 * (rowA[l] + rowA[r]);
    }
  }
}

/** Copies a tightly packed plane into `out`, rotated clockwise by `rot` degrees. */
function writePlane(res: Plane, out: Plane, base: number, pw: number, ph: number, comps: number, rot: number) {
  const rw = pw * comps;
  if (rot === 0) {
    out.set(res.subarray(0, rw * ph), base);
    return;
  }
  // Destination is ph × pw for 90/270, pw × ph for 180.
  const dw = (rot === 180 ? pw : ph) * comps;
  for (let y = 0; y < ph; y++) {
    for (let x = 0; x < pw; x++) {
      let dx: number, dy: number;
      if (rot === 90) { dx = ph - 1 - y; dy = x; }
      else if (rot === 180) { dx = pw - 1 - x; dy = ph - 1 - y; }
      else { dx = y; dy = pw - 1 - x; }
      const s = y * rw + x * comps;
      const d = base + dy * dw + dx * comps;
      for (let c = 0; c < comps; c++) out[d + c] = res[s + c];
    }
  }
}

/** Whether `filterYuv` can also bake this rotation in (4:2:2 chroma can't be turned sideways). */
export const canRotateYuv = (format: VideoSamplePixelFormat | null, rot: number) =>
  rot % 180 === 0 || !format?.startsWith('I422');

/**
 * Filters a frame and returns a new sample, with the clockwise rotation `rot`
 * baked in (as the server's ffmpeg does). The input sample is left for the
 * caller to close.
 */
export async function filterYuv(
  sample: VideoSample,
  mb: typeof import('mediabunny'),
  frameIndex: number,
  colorSpace: VideoColorSpaceInit,
  rot = 0,
): Promise<VideoSample> {
  const L = layoutOf(sample.format)!;
  const { width: w, height: h } = sample.visibleRect;
  const bytesPer = L.bits === 8 ? 1 : 2;
  const src = new ArrayBuffer(sample.allocationSize());
  const layout = await sample.copyTo(src);
  const max = (1 << L.bits) - 1;
  const view = (b: ArrayBuffer): Plane => (bytesPer === 1 ? new Uint8Array(b) : new Uint16Array(b));
  const data = view(src);

  const sizes = L.planes.map(([dx, dy, comps]) => Math.ceil(w / dx) * Math.ceil(h / dy) * comps);
  const out = view(new ArrayBuffer(sizes.reduce((a, b) => a + b, 0) * bytesPer));
  const outLayout: PlaneLayout[] = [];
  let base = 0;

  for (let p = 0; p < L.planes.length; p++) {
    const [dx, dy, comps] = L.planes[p];
    const pw = Math.ceil(w / dx);
    const ph = Math.ceil(h / dy);
    const rw = pw * comps;
    const n = rw * ph;
    const offset = layout[p].offset / bytesPer;
    const stride = layout[p].stride / bytesPer;
    if (res.length < n || res.BYTES_PER_ELEMENT !== bytesPer) res = bytesPer === 1 ? new Uint8Array(n) : new Uint16Array(n);
    const dw = rot % 180 === 0 ? rw : ph * comps;
    outLayout.push({ offset: base * bytesPer, stride: dw * bytesPer });

    if (L.hasAlpha && p === 3) {
      // Alpha is copied as-is.
      for (let y = 0; y < ph; y++) res.set(data.subarray(offset + y * stride, offset + y * stride + rw), y * rw);
      writePlane(res, out, base, pw, ph, comps, rot);
      base += n;
      continue;
    }

    if (tmp.length < n) tmp = new Float32Array(n);
    gblur(data, offset, stride, pw, ph, comps, tmp);

    if (p > 0) {
      for (let i = 0; i < n; i++) res[i] = Math.round(tmp[i]);
    } else {
      // Luma: noise, then unsharp. The noise scale follows bit depth (±1 at 8-bit).
      if (lumaTmp.length < n || lumaTmp.BYTES_PER_ELEMENT !== bytesPer) lumaTmp = bytesPer === 1 ? new Uint8Array(n) : new Uint16Array(n);
      const scale = 1 << (L.bits - 8);
      let seed = (frameIndex * 0x9e3779b1 + 0x6d2b79f5) >>> 0 || 1;
      for (let i = 0; i < n; i++) {
        // xorshift32: fast, and a fresh pattern every frame (temporal noise).
        seed ^= seed << 13;
        seed ^= seed >>> 17;
        seed ^= seed << 5;
        const noise = ((seed >>> 0) % 3) - 1;
        const v = Math.round(tmp[i]) + noise * scale;
        lumaTmp[i] = v < 0 ? 0 : v > max ? max : v;
      }
      // unsharp: v + amount · (v − 3×3 box mean), edges clamped.
      if (rowB.length < rw) rowB = new Float32Array(rw);
      for (let y = 0; y < ph; y++) {
        const up = Math.max(0, y - 1) * rw;
        const mid = y * rw;
        const dn = Math.min(ph - 1, y + 1) * rw;
        for (let x = 0; x < rw; x++) rowB[x] = lumaTmp[up + x] + lumaTmp[mid + x] + lumaTmp[dn + x];
        for (let x = 0; x < rw; x++) {
          const l = x === 0 ? 0 : x - 1;
          const r = x === rw - 1 ? x : x + 1;
          const v = lumaTmp[mid + x];
          const o = Math.round(v + AMOUNT * (v - (rowB[l] + rowB[x] + rowB[r]) / 9));
          res[mid + x] = o < 0 ? 0 : o > max ? max : o;
        }
      }
    }
    writePlane(res, out, base, pw, ph, comps, rot);
    base += n;
  }

  const [ow, oh] = rot % 180 === 0 ? [w, h] : [h, w];
  return new mb.VideoSample(out, {
    format: sample.format!,
    codedWidth: ow,
    codedHeight: oh,
    layout: outLayout,
    timestamp: sample.timestamp,
    duration: sample.duration,
    colorSpace,
  });
}
