// Byte-level detection of common metadata blocks, mirroring the server's
// report so both modes say the same thing.

const SIGNATURES: { label: string; needles: string[] }[] = [
  { label: 'C2PA / Content Credentials', needles: ['c2pa', 'jumb', 'contentauth'] },
  { label: 'XMP', needles: ['<x:xmpmeta', 'http://ns.adobe.com/xap/1.0/', 'XML:com.adobe.xmp', 'XMP DataXMP'] },
  { label: 'EXIF', needles: ['Exif\0\0', 'eXIf'] },
  { label: 'IPTC / Photoshop IRB', needles: ['Photoshop 3.0', '8BIM'] },
  { label: 'ICC color profile', needles: ['ICC_PROFILE', 'iCCP', 'ICCP'] },
  { label: 'MPF (multi-picture)', needles: ['MPF\0'] },
  { label: 'Apple maker data', needles: ['Apple iOS', 'com.apple.quicktime'] },
  { label: 'GPS / location', needles: ['GPSLatitude', '©xyz', 'com.apple.quicktime.location'] },
  { label: 'Camera / software info', needles: ['com.apple.quicktime.make', 'com.apple.quicktime.software'] },
  { label: 'Text comments', needles: ['tEXt', 'iTXt', 'zTXt'] },
];

const LIMIT = 16 * 1024 * 1024;

/** Decode bytes as latin1 so every byte maps to one char, then search. */
function latin1(bytes: Uint8Array) {
  let s = '';
  const CHUNK = 0x8000;
  for (let i = 0; i < bytes.length; i += CHUNK) {
    s += String.fromCharCode.apply(null, bytes.subarray(i, i + CHUNK) as unknown as number[]);
  }
  return s;
}

export async function scanMetadata(blob: Blob): Promise<string[]> {
  // Metadata lives near the start or the end of a file; scan both ends.
  const parts =
    blob.size > LIMIT * 2 ? [blob.slice(0, LIMIT), blob.slice(blob.size - LIMIT)] : [blob];
  let text = '';
  for (const p of parts) text += latin1(new Uint8Array(await p.arrayBuffer()));
  return SIGNATURES.filter((s) => s.needles.some((n) => text.includes(n))).map((s) => s.label);
}
