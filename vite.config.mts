import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The React app lives in web/ and builds to dist/, which the Express server
// serves in production. In dev, Vite proxies /api to the server on :3000.
export default defineConfig({
  root: 'web',
  plugins: [react()],
  build: { outDir: '../dist', emptyOutDir: true },
  server: {
    port: 5173,
    proxy: { '/api': { target: `http://localhost:${process.env.PORT || 3000}`, changeOrigin: true } },
  },
});
