// Runs the on-device video SynthID re-encode off the main thread:
// Mediabunny demuxes, WebCodecs decodes/encodes (hardware where available),
// and each frame goes through the server's filter chain in between.

import * as mb from 'mediabunny';
import { canFilterYuv, canRotateYuv, filterYuv } from './synthid-yuv';
import { GlFilter } from './synthid-gl';

export type WorkerRequest = { file: File; ext: string };
export type WorkerReply =
  | { type: 'progress'; progress: number }
  | { type: 'done'; buffer: ArrayBuffer; ext: string; mime: string; found: string[]; codec: string; path: string }
  | { type: 'unsupported'; reason: string }
  | { type: 'error'; message: string };

class Unsupported extends Error {}

const post = (msg: WorkerReply, transfer: Transferable[] = []) =>
  (self as unknown as Worker).postMessage(msg, transfer);

/** What the original carried, for the report (the byte-signature scan adds the rest). */
async function describe(input: mb.Input): Promise<string[]> {
  const found: string[] = [];
  const tags = (await input.getMetadataTags().catch(() => ({}))) as Record<string, unknown>;
  const { raw = {}, ...rest } = tags as { raw?: Record<string, unknown> };
  const set = Object.values(rest).filter((v) => v != null && !(Array.isArray(v) && !v.length));
  if (set.length || Object.keys(raw).length) found.push('Container / stream tags');
  if (Object.keys(raw).some((k) => /location|xyz|gps/i.test(k))) found.push('GPS / location');
  return found;
}

const enc = new TextEncoder();
const BRAND = enc.encode('Mediabunny');

/**
 * Clean up the header after muxing.
 *
 * Mediabunny names itself in the handler names, the codec's compressor name
 * and Matroska's muxing/writing app. Blank those in place (same length, NUL
 * padded) so the output carries no tool fingerprint, like the server's
 * `-metadata:s handler_name=`. Only the header region is scanned.
 */
function scrubHeader(buf: ArrayBuffer, webm: boolean, colorSpace: VideoColorSpaceInit) {
  const bytes = new Uint8Array(buf);
  let start = 0;
  let end = Math.min(bytes.length, 1 << 16);
  if (!webm) {
    // Find the moov box among the top-level boxes.
    const dv = new DataView(buf);
    for (let pos = 0; pos + 8 <= bytes.length; ) {
      let size = dv.getUint32(pos);
      const type = String.fromCharCode(...bytes.subarray(pos + 4, pos + 8));
      if (size === 1) size = Number(dv.getBigUint64(pos + 8));
      if (size < 8) break;
      if (type === 'moov') {
        start = pos;
        end = Math.min(bytes.length, pos + size);
        break;
      }
      pos += size;
    }
  }
  if (!webm) restoreColr(bytes, start, end, colorSpace);
  outer: for (let i = start; i <= end - BRAND.length; i++) {
    for (let j = 0; j < BRAND.length; j++) if (bytes[i + j] !== BRAND[j]) continue outer;
    let k = i;
    if (webm && bytes[i - 1] & 0x80) k = i + (bytes[i - 1] & 0x7f); // EBML string: 1-byte size before it
    else while (k < end && bytes[k] >= 0x20 && bytes[k] < 0x7f) k++;
    if (!webm && bytes[i - 1] === k - i) bytes[i - 1] = 0; // Pascal string (compressorname)
    const text = new TextDecoder().decode(bytes.subarray(i, k));
    const generic = text.match(/^Mediabunny((?:Video|Sound|Text)Handler)$/)?.[1] ?? '';
    bytes.fill(0, i, k);
    bytes.set(enc.encode(generic), i);
    i = k;
  }
}

const PRIMARIES: Record<string, number> = { bt709: 1, bt470bg: 5, smpte170m: 6, bt2020: 9, smpte432: 12 };
const TRANSFER: Record<string, number> = { bt709: 1, smpte170m: 6, linear: 8, 'iec61966-2-1': 13, pq: 16, hlg: 18 };
const MATRIX: Record<string, number> = { rgb: 0, bt709: 1, bt470bg: 5, smpte170m: 6, 'bt2020-ncl': 9 };

/**
 * Encoders tag their output with their own colour guesses (Chrome writes an
 * sRGB transfer for untagged input), which shifts colours on playback. The
 * pixels are filtered in place, not converted, so restore the source's tags in
 * the MP4 'colr' box; 2 means unspecified, like the original.
 */
function restoreColr(bytes: Uint8Array, start: number, end: number, cs: VideoColorSpaceInit) {
  const dv = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  for (let i = start; i + 15 <= end; i++) {
    if (bytes[i] !== 0x63 || bytes[i + 1] !== 0x6f || bytes[i + 2] !== 0x6c || bytes[i + 3] !== 0x72) continue; // 'colr'
    if (String.fromCharCode(...bytes.subarray(i + 4, i + 8)) !== 'nclx') continue;
    dv.setUint16(i + 8, PRIMARIES[cs.primaries ?? ''] ?? 2);
    dv.setUint16(i + 10, TRANSFER[cs.transfer ?? ''] ?? 2);
    dv.setUint16(i + 12, MATRIX[cs.matrix ?? ''] ?? 2);
    bytes[i + 14] = cs.fullRange ? 0x80 : 0;
  }
}

async function convert({ file, ext }: WorkerRequest) {
  if (typeof VideoEncoder === 'undefined' || typeof VideoDecoder === 'undefined') throw new Unsupported('no WebCodecs');
  const input = new mb.Input({ source: new mb.BlobSource(file), formats: mb.ALL_FORMATS });
  try {
    try {
      await input.getFormat();
    } catch {
      throw new Unsupported('container not readable by Mediabunny');
    }
    const webm = ext === '.webm';
    const format = webm ? new mb.WebMOutputFormat() : new mb.Mp4OutputFormat({ fastStart: 'in-memory' });
    const vTrack = await input.getPrimaryVideoTrack();
    if (!vTrack) throw new Unsupported('no video track');
    if (!(await vTrack.canDecode())) throw new Unsupported(`cannot decode ${vTrack.codec}`);

    // H.264 like the server; WebM can only hold VP9/AV1/VP8.
    const vOrder: mb.VideoCodec[] = webm ? ['vp9', 'av1', 'vp8'] : ['avc', 'hevc', 'vp9', 'av1'];
    const vCodec = await mb.getFirstEncodableVideoCodec(
      vOrder.filter((c) => format.getSupportedVideoCodecs().includes(c)),
      { width: vTrack.codedWidth, height: vTrack.codedHeight },
    );
    if (!vCodec) throw new Unsupported('no video encoder');

    const aTrack = await input.getPrimaryAudioTrack();
    const aOrder: mb.AudioCodec[] = webm ? ['opus', 'vorbis'] : ['aac', 'opus'];
    const aCodec = aTrack
      ? await mb.getFirstEncodableAudioCodec(aOrder.filter((c) => format.getSupportedAudioCodecs().includes(c)), { bitrate: 256_000 })
      : null;
    // Losing the audio silently would be worse than taking the slow path.
    if (aTrack && !aCodec) throw new Unsupported('no audio encoder');

    // Keep the source's colour tags as they were (decoders fill in guesses,
    // e.g. sRGB transfer, which would shift colours on playback).
    // Untagged input gets the standard players already assume for it.
    const src = await vTrack.getColorSpace();
    const std = vTrack.codedHeight >= 720 ? 'bt709' : 'smpte170m';
    const colorSpace: VideoColorSpaceInit = {
      primaries: src.primaries ?? std,
      transfer: src.transfer ?? std,
      matrix: src.matrix ?? std,
      fullRange: src.fullRange ?? false,
    };
    // Mediabunny would render rotated video through an RGB canvas before
    // `process`, which costs quality. Cancel its rotation instead and bake the
    // rotation into the YUV planes ourselves, which also matches the server.
    const innate = await vTrack.getRotation();
    const flipped = await vTrack.getFlip();
    const firstFormat = await new mb.VideoSampleSink(vTrack)
      .getSample(await vTrack.getFirstTimestamp())
      .then((s) => {
        const f = s?.format ?? null;
        s?.close();
        return f;
      })
      .catch(() => null);
    const bakeOurselves = !flipped && canFilterYuv(firstFormat) && canRotateYuv(firstFormat, innate);
    const rot = bakeOurselves ? innate : 0;
    const [outW, outH] = rot % 180 === 0 ? [vTrack.codedWidth, vTrack.codedHeight] : [vTrack.codedHeight, vTrack.codedWidth];
    let frame = 0;
    let gl: GlFilter | null = null;
    let path = 'yuv';
    const target = new mb.BufferTarget();
    const conversion = await mb.Conversion.init({
      input,
      output: new mb.Output({ format, target }),
      tracks: 'primary',
      tags: { creationTime: null }, // no descriptive metadata, zeroed timestamps
      showWarnings: false,
      video: {
        codec: vCodec,
        quality: new mb.Quality('very-high'), // quantizer (CRF-like) where the encoder supports it
        forceTranscode: true,
        ...(bakeOurselves && innate ? { rotate: ((360 - innate) % 360) as mb.Rotation, processedWidth: outW, processedHeight: outH } : {}),
        process: async (sample) => {
          const i = frame++;
          if (canFilterYuv(sample.format) && canRotateYuv(sample.format, rot)) return filterYuv(sample, mb, i, colorSpace, rot);
          // Uncommon decoder output (RGB, unknown): filter on the GPU instead.
          path = 'webgl';
          gl ??= new GlFilter();
          const src = sample.toCanvasImageSource();
          const w = 'displayWidth' in src ? src.displayWidth : src.width;
          const h = 'displayHeight' in src ? src.displayHeight : src.height;
          gl.apply(src, w, h);
          return gl.canvas;
        },
      },
      audio: aCodec ? { codec: aCodec, quality: new mb.Quality({ bitrate: 256_000 }), forceTranscode: true } : { discard: true },
    });
    if (!conversion.isValid) throw new Unsupported(conversion.discardedTracks.map((t) => t.reason).join(', '));

    let last = -1;
    conversion.onProgress = (p) => {
      if (p - last >= 0.005) {
        last = p;
        post({ type: 'progress', progress: p });
      }
    };
    await conversion.execute();
    const buffer = target.buffer;
    if (!buffer) throw new Error('Video encode produced no output');
    scrubHeader(buffer, webm, colorSpace);
    post(
      {
        type: 'done',
        buffer,
        ext: webm ? '.webm' : '.mp4',
        mime: webm ? 'video/webm' : 'video/mp4',
        found: await describe(input),
        codec: `${vCodec}${aCodec ? `+${aCodec}` : ''}`,
        path,
      },
      [buffer],
    );
  } finally {
    input.dispose();
  }
}

self.onmessage = async (e: MessageEvent<WorkerRequest>) => {
  try {
    await convert(e.data);
  } catch (err) {
    if (err instanceof Unsupported) post({ type: 'unsupported', reason: err.message });
    else post({ type: 'error', message: err instanceof Error ? err.message : String(err) });
  }
};
