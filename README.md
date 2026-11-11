# Sharona · creator tools

A web app for creators:

- **Strip metadata** from photos and videos (EXIF, GPS, XMP, IPTC, ICC, C2PA, container tags), with optional SynthID watermark disruption.
- **Download** videos (or just the audio) from **YouTube**, **X**, **Instagram** and **TikTok** links.

## Architecture

```
web/        React + Vite frontend (TypeScript)      → builds to dist/
server/     Node + Express API                      → serves /api/* and dist/
  index.js        /api/strip (sharp + ffmpeg)
  downloaders.js  /api/download/:platform (yt-dlp)
```

Vite + React is the **frontend only**. The backend stays a Node service because the work it does needs native tools: `sharp`/libvips for images, `ffmpeg`/`ffprobe` for video, and `yt-dlp` (Python) for downloads. None of those run on edge runtimes like Cloudflare Workers, so the API ships as a container (see `Dockerfile`). If you later add accounts, billing or a database, a Workers/Hono layer can sit in front for that, while the media work stays in this container.

## What gets removed

**Images** (JPEG, PNG, WebP, HEIC/HEIF, AVIF, TIFF, GIF) are decoded to raw pixels and re-encoded into a fresh file, so nothing from the original container survives: EXIF (camera, serial numbers, timestamps, GPS), XMP, IPTC / Photoshop IRB, ICC profiles (converted to sRGB first), C2PA / Content Credentials (JUMBF), MPF, maker notes, embedded thumbnails, PNG/GIF text comments. EXIF orientation is applied to the pixels first so images stay upright. HEIC is output as JPEG.

**Videos** (MP4, MOV, M4V, MKV, WebM, AVI, MTS/M2TS, TS, 3GP, WMV, FLV) are remuxed with ffmpeg:
- only real video/audio/subtitle streams are kept; data tracks (GPS/telemetry, timecode, camera metadata), attachments and cover art are dropped
- all global, per-stream and chapter metadata is removed
- unknown boxes such as C2PA `uuid` manifests are not carried over
- H.264/HEVC SEI user-data units (encoder strings) are filtered from the bitstream
- streams are copied losslessly unless SynthID stripping is on; if a codec can't go back into its original container the output is MKV

Each result shows what was detected and removed.

## Downloads

| Platform  | Accepted links | Notes |
|-----------|----------------|-------|
| YouTube   | `youtube.com` (watch, Shorts), `youtu.be` | MP4 (H.264 + AAC) up to 1080p |
| X         | `x.com`, `twitter.com` | The video attached to a post |
| Instagram | `instagram.com` (Reels, video posts) | Often needs a logged-in session, see `YTDLP_COOKIES` |
| TikTok    | `tiktok.com`, `vm.`/`vt.` short links | |

Each tool can save **video** or **audio only** (M4A). Links are checked against each platform's domains, so the API can't be used to fetch arbitrary URLs. `POST /api/tiktok` still works for older clients.

Only download content you own or have permission to use. Downloading can break a platform's terms of service, and you are responsible for how the app is used.

## Running

Requires Node.js 20.19+ with `ffmpeg`/`ffprobe` and `yt-dlp` on `PATH` (`brew install ffmpeg yt-dlp`, or `pip install yt-dlp`; the server also tries `python3 -m yt_dlp`, or set `YTDLP_PATH`). Keep yt-dlp updated, since platforms change often.

```bash
npm install
npm run dev        # Vite on http://localhost:5173, API on :3000 (proxied)

npm run build      # type-check + build the frontend into dist/
npm start          # API + built frontend on http://localhost:3000
```

Or with Docker (ffmpeg and yt-dlp included):

```bash
docker build -t sharona .
docker run -p 3000:3000 sharona
```

### Environment variables

| Variable | Default | |
|----------|---------|---|
| `PORT` | `3000` | |
| `MAX_UPLOAD_MB` | `2048` | Max upload for the stripper |
| `MAX_DOWNLOAD_MB` | `2048` | Max file size yt-dlp will fetch |
| `YTDLP_PATH` | | Path to yt-dlp if not on `PATH` |
| `YTDLP_COOKIES` | | Netscape cookies file for Instagram / age-gated content |
| `ALLOWED_ORIGINS` | | Comma-separated origins allowed to call the API when the frontend is hosted elsewhere |
| `VITE_API_URL` | | Build-time: API base URL if the frontend is hosted separately |

Uploads and downloads are written to a temp directory and deleted as soon as the response is sent. Nothing is stored.
