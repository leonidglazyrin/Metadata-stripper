import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The React app lives in web/ and builds to dist/, which the Express server
// serves in production. In dev, Vite proxies /api to the server on :3000.
export default defineConfig({
  root: 'web',
  plugins: [react()],
  // ffmpeg.wasm spawns its own worker; let Vite bundle it as-is.
  optimizeDeps: { exclude: ['@ffmpeg/ffmpeg', '@ffmpeg/util'] },
  worker: { format: 'es' },
  // heic-to (libheif) is a ~3 MB lazy chunk, loaded only for HEIC on-device.
  build: { outDir: '../dist', emptyOutDir: true, chunkSizeWarningLimit: 4000 },
  server: {
    port: 5173,
    proxy: { '/api': { target: `http://localhost:${process.env.PORT || 3000}`, changeOrigin: true } },
  },
});
