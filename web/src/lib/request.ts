// XHR rather than fetch: we want upload *and* download progress.

export interface Progress {
  onUpload?: (fraction: number) => void;
  onUploaded?: () => void;
  onDownload?: (fraction: number) => void;
}

export interface BlobResponse {
  blob: Blob;
  filename: string | null;
  header: (name: string) => string | null;
}

export class RequestError extends Error {}

/** Base URL for the API; empty means same origin (or the Vite dev proxy). */
const API = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '') ?? '';

export function postForBlob(
  path: string,
  body: FormData | object,
  progress: Progress,
  signal: AbortSignal,
): Promise<BlobResponse> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', API + path);
    xhr.responseType = 'blob';
    signal.addEventListener('abort', () => xhr.abort());
    xhr.onabort = () => reject(new DOMException('Aborted', 'AbortError'));
    xhr.onerror = () => reject(new RequestError('Network error, is the server running?'));
    xhr.upload.onprogress = (e) => {
      if (!e.lengthComputable) return;
      const p = e.loaded / e.total;
      progress.onUpload?.(p);
      if (p >= 1) progress.onUploaded?.();
    };
    xhr.onprogress = (e) => {
      if (e.lengthComputable && xhr.status === 200) progress.onDownload?.(e.loaded / e.total);
    };
    xhr.onload = async () => {
      if (xhr.status !== 200) return reject(new RequestError(await errorMessage(xhr)));
      const disp = xhr.getResponseHeader('Content-Disposition') || '';
      resolve({
        blob: xhr.response as Blob,
        filename: (disp.match(/filename="([^"]+)"/) || [])[1] ?? null,
        header: (n) => xhr.getResponseHeader(n),
      });
    };
    if (body instanceof FormData) {
      xhr.send(body);
    } else {
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify(body));
    }
  });
}

async function errorMessage(xhr: XMLHttpRequest) {
  let text = '';
  try {
    text = await (xhr.response as Blob).text();
    const msg = JSON.parse(text).error;
    if (msg) return String(msg);
  } catch {
    /* not JSON */
  }
  if (xhr.status === 404) return 'Server is missing this feature, restart it with the latest code';
  if (xhr.status === 413) return 'File too large';
  if (xhr.status === 502 || xhr.status === 504) return `Server timed out or unreachable (HTTP ${xhr.status})`;
  const pre = (text.match(/<pre>([\s\S]*?)<\/pre>/i) || [])[1];
  return `Server error (HTTP ${xhr.status})${pre ? ': ' + pre.trim() : ''}`;
}

export const formatSize = (n: number) =>
  n < 1024 ? `${n} B` : n < 1048576 ? `${(n / 1024).toFixed(0)} KB` : `${(n / 1048576).toFixed(1)} MB`;
