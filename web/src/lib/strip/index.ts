// Strip metadata entirely on this device: nothing is uploaded.

import { scanMetadata } from './detect';
import { NeedsReencode, reencode, stripGif, stripJpeg, stripPng, stripWebp } from './images';

export interface BrowserStripResult {
  blob: Blob;
  filename: string;
  /** Metadata found in the original (what was removed) */
  removed: string[];
  /** Metadata still detected in the output (should be empty) */
  remaining: string[];
}

const VIDEO_EXT = new Set(['.mp4', '.m4v', '.mov', '.mkv', '.webm', '.avi', '.3gp', '.mts', '.m2ts', '.ts', '.wmv', '.flv']);

const extOf = (name: string) => (name.match(/\.[^.]+$/)?.[0] ?? '').toLowerCase();
const baseOf = (name: string) =>
  name.replace(/\.[^.]+$/, '').replace(/[^\w.-]+/g, '_').slice(0, 80) || 'file';

async function isHeicFile(file: File, ext: string) {
  if (ext === '.heic' || ext === '.heif' || /hei[cf]/i.test(file.type)) return true;
  const head = new Uint8Array(await file.slice(4, 12).arrayBuffer());
  const brand = String.fromCharCode(...head);
  return /^ftyp(heic|heix|hevc|mif1|msf1)/.test(brand);
}

export async function stripInBrowser(
  file: File,
  opts: { synthid: boolean },
  onStatus: (msg: string, progress?: number | null) => void,
): Promise<BrowserStripResult> {
  let ext = extOf(file.name);
  const isVideo = file.type.startsWith('video/') || VIDEO_EXT.has(ext);
  const removed = new Set(await scanMetadata(file));

  let blob: Blob;
  let outExt = ext;

  if (isVideo) {
    if (!ext) ext = '.mp4';
    let r;
    if (opts.synthid) {
      const { stripVideoSynthidInBrowser } = await import('./video-synthid');
      r = await stripVideoSynthidInBrowser(file, ext, onStatus);
    } else {
      const { stripVideoInBrowser } = await import('./video');
      r = await stripVideoInBrowser(file, ext, onStatus);
    }
    r.found.forEach((f) => removed.add(f));
    blob = r.blob;
    outExt = r.ext;
  } else {
    onStatus('Cleaning…', null);
    const bytes = new Uint8Array(await file.arrayBuffer());
    const kind = sniffImage(bytes);
    try {
      if (opts.synthid && kind !== 'gif') throw new NeedsReencode('synthid');
      switch (kind) {
        case 'jpeg': blob = new Blob([stripJpeg(bytes)], { type: 'image/jpeg' }); outExt = ext || '.jpg'; break;
        case 'png': blob = new Blob([await stripPng(bytes)], { type: 'image/png' }); outExt = '.png'; break;
        case 'webp': blob = new Blob([stripWebp(bytes)], { type: 'image/webp' }); outExt = '.webp'; break;
        case 'gif': blob = new Blob([stripGif(bytes)], { type: 'image/gif' }); outExt = '.gif'; break;
        default: throw new NeedsReencode('format');
      }
    } catch (e) {
      if (!(e instanceof NeedsReencode)) throw e;
      ({ blob, outExt } = await reencodeImage(file, kind, ext, opts.synthid, onStatus));
    }
  }

  const remaining = await scanMetadata(blob);
  return { blob, filename: `${baseOf(file.name)}_clean${outExt}`, removed: [...removed], remaining };
}

type ImageKind = 'jpeg' | 'png' | 'webp' | 'gif' | 'other';

function sniffImage(b: Uint8Array): ImageKind {
  if (b[0] === 0xff && b[1] === 0xd8) return 'jpeg';
  if (b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47) return 'png';
  if (b[0] === 0x52 && b[1] === 0x49 && b[8] === 0x57 && b[9] === 0x45) return 'webp';
  if (b[0] === 0x47 && b[1] === 0x49 && b[2] === 0x46) return 'gif';
  return 'other';
}

async function reencodeImage(
  file: File,
  kind: ImageKind,
  ext: string,
  synthid: boolean,
  onStatus: (msg: string, progress?: number | null) => void,
): Promise<{ blob: Blob; outExt: string }> {
  if (kind === 'jpeg') return { blob: await reencode(file, 'image/jpeg', { synthid }), outExt: ext || '.jpg' };
  if (kind === 'png') return { blob: await reencode(file, 'image/png', { synthid }), outExt: '.png' };
  if (kind === 'webp') return { blob: await reencode(file, 'image/webp', { synthid }), outExt: '.webp' };

  if (await isHeicFile(file, ext)) {
    // Safari decodes HEIC natively; elsewhere use libheif compiled to wasm.
    let source: Blob | ImageBitmap = file;
    try {
      await createImageBitmap(file).then((b) => b.close());
    } catch {
      onStatus('Loading HEIC decoder…', null);
      const { heicTo } = await import('heic-to');
      onStatus('Decoding HEIC…', null);
      source = await heicTo({ blob: file, type: 'bitmap' });
    }
    return { blob: await reencode(source, 'image/jpeg', { synthid }), outExt: '.jpg' };
  }

  // AVIF, TIFF (Safari), BMP…: whatever the browser can decode, saved as PNG.
  try {
    return { blob: await reencode(file, 'image/png', { synthid }), outExt: '.png' };
  } catch {
    throw new Error('This browser can’t decode this format. Switch to Server to clean it.');
  }
}
