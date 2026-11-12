// Lossless, in-browser metadata removal for JPEG, PNG, WebP and GIF: the
// container is rewritten without its metadata blocks while the compressed
// image data is copied byte for byte. When that can't give a correct result
// (rotated JPEGs, non-sRGB color profiles, SynthID mode, formats we can't
// rewrite) the image is decoded and re-encoded through a canvas instead.

export class NeedsReencode extends Error {}

const ascii = (b: Uint8Array, start: number, len: number) =>
  String.fromCharCode(...b.subarray(start, start + len));
const u16be = (b: Uint8Array, i: number) => (b[i] << 8) | b[i + 1];
const u32be = (b: Uint8Array, i: number) => ((b[i] << 24) >>> 0) + (b[i + 1] << 16) + (b[i + 2] << 8) + b[i + 3];
const u32le = (b: Uint8Array, i: number) => b[i] + (b[i + 1] << 8) + (b[i + 2] << 16) + ((b[i + 3] << 24) >>> 0);

function concat(parts: Uint8Array[]): Uint8Array<ArrayBuffer> {
  const out = new Uint8Array(parts.reduce((n, p) => n + p.length, 0));
  let o = 0;
  for (const p of parts) {
    out.set(p, o);
    o += p.length;
  }
  return out;
}

// sRGB primaries, chromatically adapted to D50 as stored in ICC rXYZ/gXYZ/bXYZ.
const SRGB_PRIMARIES: Record<string, [number, number, number]> = {
  rXYZ: [0.4361, 0.2225, 0.0139],
  gXYZ: [0.3851, 0.7169, 0.0971],
  bXYZ: [0.1431, 0.0606, 0.7141],
};

/**
 * True when an ICC profile describes sRGB (so dropping it changes no colors).
 * Checks the colorant primaries, falling back to the profile's name.
 */
function isSrgbProfile(p: Uint8Array) {
  try {
    const count = u32be(p, 128);
    let matched = 0;
    for (let i = 0; i < count && i < 64; i++) {
      const e = 132 + i * 12;
      const sig = ascii(p, e, 4);
      const want = SRGB_PRIMARIES[sig];
      if (!want) continue;
      const off = u32be(p, e + 4) + 8; // skip 'XYZ ' type + reserved
      const val = [0, 1, 2].map((k) => (u32be(p, off + k * 4) | 0) / 65536);
      if (val.every((v, k) => Math.abs(v - want[k]) < 0.005)) matched++;
      else return false;
    }
    if (matched === 3) return true;
  } catch {
    /* fall through to the name check */
  }
  const s = ascii(p, 0, Math.min(p.length, 4096)).replace(/\0/g, '');
  return /sRGB|IEC61966/.test(s);
}

/* ---------------- JPEG ---------------- */

function exifOrientation(seg: Uint8Array): number {
  // seg = APP1 payload starting at "Exif\0\0"
  const t = 6;
  const le = seg[t] === 0x49;
  const r16 = (i: number) => (le ? seg[t + i] | (seg[t + i + 1] << 8) : u16be(seg, t + i));
  const r32 = (i: number) => (le ? u32le(seg, t + i) : u32be(seg, t + i));
  try {
    const ifd = r32(4);
    const n = r16(ifd);
    for (let k = 0; k < n; k++) {
      const e = ifd + 2 + k * 12;
      if (r16(e) === 0x0112) return r16(e + 8);
    }
  } catch {
    /* malformed EXIF */
  }
  return 1;
}

export function stripJpeg(b: Uint8Array): Uint8Array<ArrayBuffer> {
  if (b[0] !== 0xff || b[1] !== 0xd8) throw new Error('Not a JPEG');
  const out: Uint8Array[] = [b.subarray(0, 2)];
  let pos = 2;
  while (pos < b.length) {
    if (b[pos] !== 0xff) throw new Error('Corrupt JPEG');
    const m = b[pos + 1];
    if (m === 0xff) {
      pos++;
      continue;
    }
    if (m === 0xd9) {
      out.push(b.subarray(pos, pos + 2)); // EOI; anything after it (MPF images, trailers) is dropped
      break;
    }
    if ((m >= 0xd0 && m <= 0xd7) || m === 0x01) {
      out.push(b.subarray(pos, pos + 2));
      pos += 2;
      continue;
    }
    const len = u16be(b, pos + 2);
    const seg = b.subarray(pos, pos + 2 + len);
    const payload = seg.subarray(4);
    let keep = true;
    if (m >= 0xe0 && m <= 0xef) {
      const id = ascii(payload, 0, 12);
      if (m === 0xe0 && id.startsWith('JFIF\0')) keep = true; // JFXX (thumbnails) is dropped
      else if (m === 0xee && id.startsWith('Adobe')) keep = true; // color transform flag, needed to decode
      else {
        if (m === 0xe1 && id.startsWith('Exif\0') && exifOrientation(payload) !== 1) throw new NeedsReencode('rotated');
        if (m === 0xe2 && id.startsWith('ICC_PROFILE') && !isSrgbProfile(payload.subarray(14))) throw new NeedsReencode('icc');
        keep = false;
      }
    } else if (m === 0xfe) {
      keep = false; // COM
    }
    if (keep) out.push(seg);
    pos += 2 + len;
    if (m === 0xda) {
      // Entropy-coded scan data runs until the next real marker.
      let e = pos;
      while (e < b.length - 1 && !(b[e] === 0xff && b[e + 1] !== 0x00 && !(b[e + 1] >= 0xd0 && b[e + 1] <= 0xd7))) e++;
      out.push(b.subarray(pos, e));
      pos = e;
    }
  }
  return concat(out);
}

/* ---------------- PNG ---------------- */

async function inflate(data: Uint8Array): Promise<Uint8Array> {
  const stream = new Blob([data.slice()]).stream().pipeThrough(new DecompressionStream('deflate'));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

// Ancillary chunks that only describe how to render the pixels.
const PNG_KEEP = new Set(['tRNS', 'gAMA', 'cHRM', 'sRGB', 'cICP', 'sBIT', 'bKGD', 'pHYs', 'acTL', 'fcTL', 'fdAT']);

export async function stripPng(b: Uint8Array): Promise<Uint8Array<ArrayBuffer>> {
  if (ascii(b, 1, 3) !== 'PNG') throw new Error('Not a PNG');
  const out: Uint8Array[] = [b.subarray(0, 8)];
  let pos = 8;
  const animated = ascii(b, 0, Math.min(b.length, 4096)).includes('acTL');
  while (pos + 8 <= b.length) {
    const len = u32be(b, pos);
    const type = ascii(b, pos + 4, 4);
    const chunk = b.subarray(pos, pos + 12 + len);
    const critical = type.charCodeAt(0) < 97; // uppercase first letter
    if (type === 'iCCP' && !animated) {
      // name\0, compression method byte, then a zlib-compressed profile
      const data = b.subarray(pos + 8, pos + 8 + len);
      const nul = data.indexOf(0);
      const profile = await inflate(data.subarray(nul + 2)).catch(() => null);
      if (!(profile ? isSrgbProfile(profile) : /sRGB/i.test(ascii(data, 0, nul)))) throw new NeedsReencode('icc');
    }
    if (critical || PNG_KEEP.has(type)) out.push(chunk);
    pos += 12 + len;
    if (type === 'IEND') break;
  }
  return concat(out);
}

/* ---------------- WebP ---------------- */

export function stripWebp(b: Uint8Array): Uint8Array<ArrayBuffer> {
  if (ascii(b, 0, 4) !== 'RIFF' || ascii(b, 8, 4) !== 'WEBP') throw new Error('Not a WebP');
  const chunks: Uint8Array[] = [];
  let pos = 12;
  let animated = false;
  while (pos + 8 <= b.length) {
    const type = ascii(b, pos, 4);
    const len = u32le(b, pos + 4);
    const full = b.subarray(pos, pos + 8 + len + (len & 1));
    if (type === 'VP8X') animated = (b[pos + 8] & 0x02) !== 0;
    if (type === 'ICCP' && !animated && !isSrgbProfile(b.subarray(pos + 8, pos + 8 + len))) throw new NeedsReencode('icc');
    if (type !== 'EXIF' && type !== 'XMP ' && type !== 'ICCP') {
      if (type === 'VP8X') {
        const copy = full.slice();
        copy[8] &= ~0x2c; // clear ICC, EXIF and XMP flags
        chunks.push(copy);
      } else {
        chunks.push(full);
      }
    }
    pos += 8 + len + (len & 1);
  }
  const body = concat(chunks);
  const head = new Uint8Array(12);
  head.set(b.subarray(0, 12));
  new DataView(head.buffer).setUint32(4, body.length + 4, true);
  return concat([head, body]);
}

/* ---------------- GIF ---------------- */

export function stripGif(b: Uint8Array): Uint8Array<ArrayBuffer> {
  if (ascii(b, 0, 3) !== 'GIF') throw new Error('Not a GIF');
  const out: Uint8Array[] = [];
  let pos = 13;
  if (b[10] & 0x80) pos += 3 * (1 << ((b[10] & 0x07) + 1)); // global color table
  out.push(b.subarray(0, pos));
  const skipSubBlocks = (p: number) => {
    while (p < b.length && b[p] !== 0) p += b[p] + 1;
    return p + 1;
  };
  while (pos < b.length) {
    const start = pos;
    const t = b[pos];
    if (t === 0x3b) {
      out.push(b.subarray(pos, pos + 1));
      break;
    } else if (t === 0x2c) {
      let p = pos + 10;
      if (b[pos + 9] & 0x80) p += 3 * (1 << ((b[pos + 9] & 0x07) + 1));
      p = skipSubBlocks(p + 1); // LZW min code size, then image data
      out.push(b.subarray(start, p));
      pos = p;
    } else if (t === 0x21) {
      const label = b[pos + 1];
      const p = skipSubBlocks(pos + 2);
      let keep = label === 0xf9 || label === 0x01; // graphic control, plain text
      if (label === 0xff) keep = /^(NETSCAPE2\.0|ANIMEXTS1\.0)/.test(ascii(b, pos + 3, 11)); // looping
      if (keep) out.push(b.subarray(start, p));
      pos = p;
    } else {
      throw new Error('Corrupt GIF');
    }
  }
  return concat(out);
}

/* ---------------- Canvas re-encode ---------------- */

// Strength of the on-device SynthID disruption. Raise these for a harsher strip
// at the cost of more visible texture; lower them to stay closer to the source.
const CORE_T = 12; // detail below ≈this many code values is treated as watermark and crushed
const SHARP = 1.0; // gain on the surviving (edge) detail (1 = keep edges, don't re-amplify)
const LP_PASSES = 2; // width of the low/high-pass split: more passes core a wider band
const GRAIN = 6; // ± code values of fresh high-frequency grain over the result
const VN_PEAK = 4; // ± code values of smooth low/mid-frequency value noise (buries the low-freq remnant)

/** One separable 3-tap [1,2,1] low-pass of the RGB channels; alpha copied. */
function blurPass(src: Uint8ClampedArray, dst: Uint8ClampedArray, tmp: Float32Array, w: number, h: number) {
  const n = w * h;
  for (let c = 0; c < 3; c++) {
    for (let y = 0; y < h; y++) {
      const row = y * w;
      for (let x = 0; x < w; x++) {
        const i = row + x;
        const l = x > 0 ? i - 1 : i;
        const r = x < w - 1 ? i + 1 : i;
        tmp[i] = (src[(l << 2) + c] + 2 * src[(i << 2) + c] + src[(r << 2) + c]) * 0.25;
      }
    }
    for (let y = 0; y < h; y++) {
      const up = (y > 0 ? y - 1 : y) * w;
      const mid = y * w;
      const dn = (y < h - 1 ? y + 1 : y) * w;
      for (let x = 0; x < w; x++) dst[((mid + x) << 2) + c] = (tmp[up + x] + 2 * tmp[mid + x] + tmp[dn + x]) * 0.25;
    }
  }
  for (let i = 0; i < n; i++) dst[(i << 2) + 3] = src[(i << 2) + 3];
}

/** `passes` low-pass passes; returns whichever buffer holds the result. */
function lowPass(src: Uint8ClampedArray, w: number, h: number, passes: number): Uint8ClampedArray {
  const tmp = new Float32Array(w * h);
  const a = new Uint8ClampedArray(src.length);
  const b = passes > 1 ? new Uint8ClampedArray(src.length) : a;
  let inp = src;
  let outp = a;
  for (let p = 0; p < passes; p++) {
    blurPass(inp, outp, tmp, w, h);
    inp = outp;
    outp = outp === a ? b : a;
  }
  return inp;
}

/** A smooth n-octave scalar field sampler built from random control grids. */
function scalarField(w: number, h: number, rnd: () => number, octs: { cell: number; amp: number }[]) {
  const grids = octs.map(({ cell, amp }) => {
    const gw = Math.floor((w - 1) / cell) + 2;
    const gh = Math.floor((h - 1) / cell) + 2;
    const v = new Float32Array(gw * gh);
    for (let i = 0; i < v.length; i++) v[i] = (rnd() * 2 - 1) * amp;
    return { cell, gw, v };
  });
  return (x: number, y: number) => {
    let s = 0;
    for (let k = 0; k < grids.length; k++) {
      const g = grids[k];
      const fx = x / g.cell;
      const fy = y / g.cell;
      const gx = fx | 0;
      const gy = fy | 0;
      const tx = fx - gx;
      const ty = fy - gy;
      const r0 = gy * g.gw + gx;
      const r1 = r0 + g.gw;
      s +=
        g.v[r0] * (1 - tx) * (1 - ty) + g.v[r0 + 1] * tx * (1 - ty) + g.v[r1] * (1 - tx) * ty + g.v[r1 + 1] * tx * ty;
    }
    return s;
  };
}

/**
 * Harsh, on-device disruption of a pixel-level watermark (SynthID and the like).
 * Without a generative model to repaint the image there is nothing to resynthesise
 * the watermark-carrying noise layer, so instead we attack it three ways at once
 * with pure signal processing. The caller has already run a real downscale→upscale
 * resample (a low-pass that drops the finest watermark detail); here we then:
 *   1. desynchronise — a smooth multi-scale displacement field pulls every pixel
 *      off the grid the watermark was embedded on, so what survives is misaligned;
 *   2. crush amplitude — split into a low-pass and a high-pass and apply a smooth
 *      amplitude gate (d³/(d²+T²)) to the high-pass: small-amplitude detail, which
 *      is exactly where an invisible watermark lives, is driven to ~0, while real
 *      edges (large amplitude) pass through almost untouched;
 *   3. bury the remnant — a watermark is broadband, and the share of it that sits
 *      in the low frequencies can't be filtered out without visibly wrecking the
 *      image, so instead we drown it: a smooth multi-octave value field lowers its
 *      signal-to-noise in the low/mid band, and fresh per-pixel grain does the same
 *      up top.
 * The picture ends up a touch softer, lightly grained and faintly mottled — that
 * is the cost of destroying as much of the watermark as classical processing can.
 */
function disruptWatermark(ctx: OffscreenCanvasRenderingContext2D, w: number, h: number) {
  const img = ctx.getImageData(0, 0, w, h);
  const src = img.data; // Uint8ClampedArray: writes are clamped to 0–255

  // Deterministic within a call, fresh each run (new field + grain every strip).
  let seed = (Math.random() * 0x100000000) >>> 0 || 1;
  const rnd = () => {
    seed ^= seed << 13;
    seed ^= seed >>> 17;
    seed ^= seed << 5;
    return (seed >>> 0) / 0x100000000;
  };

  // --- 1) Geometric desync: three octaves of smooth value noise form a
  // displacement field (coarse random grids, bilinearly interpolated so it is
  // seamless). Long wavelengths carry the larger amplitudes, so lines stay
  // straight while pixels move at every scale the watermark can live on.
  const warped = new Uint8ClampedArray(src.length);
  const diag = Math.hypot(w, h);
  const peak = Math.min(9, Math.max(3, diag / 700));
  const octaves = [
    { cell: Math.max(24, diag / 14), amp: peak },
    { cell: Math.max(14, diag / 45), amp: peak * 0.5 },
    { cell: Math.max(9, diag / 130), amp: peak * 0.22 },
  ].map(({ cell, amp }) => {
    const gw = Math.floor((w - 1) / cell) + 2;
    const gh = Math.floor((h - 1) / cell) + 2;
    const vx = new Float32Array(gw * gh);
    const vy = new Float32Array(gw * gh);
    for (let i = 0; i < vx.length; i++) {
      vx[i] = (rnd() * 2 - 1) * amp;
      vy[i] = (rnd() * 2 - 1) * amp;
    }
    return { cell, gw, vx, vy };
  });

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let dx = 0;
      let dy = 0;
      for (let k = 0; k < octaves.length; k++) {
        const g = octaves[k];
        const fx = x / g.cell;
        const fy = y / g.cell;
        const gx = fx | 0;
        const gy = fy | 0;
        const tx = fx - gx;
        const ty = fy - gy;
        const r0 = gy * g.gw + gx;
        const r1 = r0 + g.gw;
        const w00 = (1 - tx) * (1 - ty);
        const w10 = tx * (1 - ty);
        const w01 = (1 - tx) * ty;
        const w11 = tx * ty;
        dx += g.vx[r0] * w00 + g.vx[r0 + 1] * w10 + g.vx[r1] * w01 + g.vx[r1 + 1] * w11;
        dy += g.vy[r0] * w00 + g.vy[r0 + 1] * w10 + g.vy[r1] * w01 + g.vy[r1 + 1] * w11;
      }
      let sx = x + dx;
      let sy = y + dy;
      sx = sx < 0 ? 0 : sx > w - 1 ? w - 1 : sx;
      sy = sy < 0 ? 0 : sy > h - 1 ? h - 1 : sy;
      const x0 = sx | 0;
      const y0 = sy | 0;
      const x1 = x0 + 1 < w ? x0 + 1 : x0;
      const y1 = y0 + 1 < h ? y0 + 1 : y0;
      const tx = sx - x0;
      const ty = sy - y0;
      const i00 = (y0 * w + x0) * 4;
      const i10 = (y0 * w + x1) * 4;
      const i01 = (y1 * w + x0) * 4;
      const i11 = (y1 * w + x1) * 4;
      const o = (y * w + x) * 4;
      for (let c = 0; c < 4; c++) {
        const top = src[i00 + c] * (1 - tx) + src[i10 + c] * tx;
        const bot = src[i01 + c] * (1 - tx) + src[i11 + c] * tx;
        warped[o + c] = top * (1 - ty) + bot * ty;
      }
    }
  }

  // --- 2) Low/high-pass split and amplitude-core the high-pass; 3) bury the
  // low-frequency remnant (which no edit can remove without wrecking the image)
  // under a smooth multi-octave value field, plus per-pixel grain up top.
  // Written back into the source buffer (no longer needed).
  const lp = lowPass(warped, w, h, LP_PASSES);
  const vnoise = scalarField(w, h, rnd, [
    { cell: Math.max(20, diag / 20), amp: VN_PEAK },
    { cell: Math.max(10, diag / 70), amp: VN_PEAK * 0.5 },
  ]);
  const t2 = CORE_T * CORE_T;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const o = (y * w + x) << 2;
      const vn = vnoise(x, y); // smooth low/mid-frequency burial, shared across channels
      const g = ((rnd() * (2 * GRAIN + 1)) | 0) - GRAIN; // high-frequency grain
      for (let c = 0; c < 3; c++) {
        const base = lp[o + c];
        const d = warped[o + c] - base; // high-pass detail
        const cored = (d * d * d) / (d * d + t2); // ≈0 for |d|≪T, ≈d for |d|≫T
        src[o + c] = base + cored * SHARP + vn + g;
      }
      src[o + 3] = warped[o + 3];
    }
  }
  ctx.putImageData(img, 0, 0);
}

export async function reencode(
  source: Blob | ImageBitmap,
  type: 'image/jpeg' | 'image/png' | 'image/webp',
  { synthid = false, quality = 0.98 } = {},
): Promise<Blob> {
  // Decoding applies EXIF orientation and converts to sRGB; the canvas
  // output carries no metadata at all.
  const bmp =
    source instanceof Blob
      ? await createImageBitmap(source, { imageOrientation: 'from-image', colorSpaceConversion: 'default' })
      : source;
  const { width: w, height: h } = bmp;
  const canvas = new OffscreenCanvas(w, h);
  const ctx = canvas.getContext('2d')!;
  ctx.imageSmoothingQuality = 'high';
  if (type === 'image/jpeg') {
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, w, h);
  }
  if (synthid) {
    // Harsh, on-device SynthID disruption (no model, nothing uploaded). SynthID
    // rides in the image's low-level noise layer and is built to survive gentle
    // edits, so a light touch is read straight through. Instead: first a real
    // downscale→upscale resample — a genuine low-pass that discards the finest
    // watermark detail and forces every pixel through interpolation — then a warp
    // + amplitude coring + fresh grain (see disruptWatermark) that crush and
    // replace what is left. Finally the file is saved at a lower quality so the
    // encoder's own quantisation scrambles the pattern further.
    const r = 0.85;
    const sw = Math.max(1, Math.round(w * r));
    const sh = Math.max(1, Math.round(h * r));
    const small = new OffscreenCanvas(sw, sh);
    const sctx = small.getContext('2d')!;
    sctx.imageSmoothingQuality = 'high';
    sctx.drawImage(bmp, 0, 0, sw, sh);
    ctx.drawImage(small, 0, 0, w, h);
    disruptWatermark(ctx, w, h);
  } else {
    ctx.drawImage(bmp, 0, 0);
  }
  bmp.close();
  // Lossy re-encode at a lower quality for SynthID mode adds DCT quantisation on
  // top of the pixel work; PNG is lossless so quality does not apply there.
  const q = synthid && type !== 'image/png' ? 0.85 : quality;
  const out = await canvas.convertToBlob({ type, quality: q });
  // Chrome tags canvas JPEG / WebP output with its own sRGB ICC profile
  // ("Google Inc. 2016"). Drop it too, so the file carries no metadata at all.
  if (type === 'image/png') return out;
  const bytes = new Uint8Array(await out.arrayBuffer());
  try {
    return new Blob([type === 'image/jpeg' ? stripJpeg(bytes) : stripWebp(bytes)], { type });
  } catch {
    return out;
  }
}
