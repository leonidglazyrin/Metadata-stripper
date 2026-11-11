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
    // Same idea as the server: a near-unity shrink and re-grow resamples every
    // pixel, which breaks invisible watermark lattices.
    const sw = Math.max(1, Math.round(w * 0.995));
    const sh = Math.max(1, Math.round(h * 0.995));
    const small = new OffscreenCanvas(sw, sh);
    const sctx = small.getContext('2d')!;
    sctx.imageSmoothingQuality = 'high';
    sctx.drawImage(bmp, 0, 0, sw, sh);
    ctx.drawImage(small, 0, 0, w, h);
  } else {
    ctx.drawImage(bmp, 0, 0);
  }
  bmp.close();
  return canvas.convertToBlob({ type, quality });
}
