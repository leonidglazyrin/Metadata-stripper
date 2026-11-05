# Metadata Stripper

A small self-hosted web app that removes metadata from photos and videos.

## What gets removed

**Images** (JPEG, PNG, WebP, HEIC/HEIF, AVIF, TIFF, GIF) are decoded to raw pixels and re-encoded into a fresh file, so nothing from the original container survives:
EXIF (camera, serial numbers, timestamps, GPS), XMP, IPTC / Photoshop IRB, ICC profiles (converted to sRGB first), C2PA / Content Credentials (JUMBF), MPF, maker notes, embedded thumbnails, PNG/GIF text comments.
EXIF orientation is applied to the pixels before stripping so images stay upright. HEIC is output as JPEG.

**Videos** (MP4, MOV, M4V, MKV, WebM, AVI, MTS/M2TS, TS, 3GP, WMV, FLV) are remuxed with ffmpeg:
- only real video/audio/subtitle streams are kept — data tracks (GPS/telemetry, timecode, camera metadata tracks), attachments and cover art are dropped
- all global, per-stream and chapter metadata is removed (title, artist, location, creation time, device make/model/software, handler names…)
- unknown boxes such as C2PA `uuid` manifests are not carried over
- H.264/HEVC SEI user-data units (encoder strings) are filtered from the bitstream
- streams are always copied losslessly — nothing is re-encoded; if a codec can't go back into its original container the output is MKV

Each result shows a before/after report of what was detected and removed.

## TikTok downloads

The **TikTok** tab takes TikTok links in single-line fields — with *Multiple TikTok links* on (settings ⚙, top right), a new field appears after each link so you can queue several; pasting text with several links splits them into fields —, downloads each video with [yt-dlp](https://github.com/yt-dlp/yt-dlp) and hands it back as-is (no stripping). Only `tiktok.com` links (including `vm.`/`vt.` short links) are accepted.

**Not covered:** invisible watermarks embedded in the pixel/audio content itself (e.g. SynthID) are not metadata, and this tool does not try to remove them.

## Running

Requires Node.js 18+ and `ffmpeg`/`ffprobe` on `PATH`. The TikTok tab also needs `yt-dlp` (`brew install yt-dlp` or `pip install yt-dlp`; if it isn't on `PATH`, the server falls back to `python3 -m yt_dlp`, or set `YTDLP_PATH`); keep it updated, as TikTok changes often break older versions.

```bash
npm install
npm start          # http://localhost:3000
```

Environment variables: `PORT` (default 3000), `MAX_UPLOAD_MB` (default 2048).

Uploads are written to a temp directory and deleted as soon as the response is sent. Nothing is stored.
