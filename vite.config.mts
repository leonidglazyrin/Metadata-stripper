import { defineConfig, createServer, type Plugin, type ViteDevServer } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

const webRoot = fileURLToPath(new URL('./web', import.meta.url));
const RENDER = '/src/landing/render.tsx';

// Renders the landing page (web/src/landing) to static HTML and puts it in
// web/index.html where <!--landing--> is. The page ships with no JS, so it is
// fast and fully readable by crawlers. In dev it re-renders on every request;
// in a build it spins up a throwaway Vite server just to load the component.
function prerenderLanding(): Plugin {
  let dev: ViteDevServer | undefined;
  return {
    name: 'prerender-landing',
    configureServer(server) {
      dev = server;
    },
    async transformIndexHtml(html) {
      // The server fills in the real origin; in dev, links stay relative.
      if (dev) html = html.replaceAll('__SITE_URL__', '');
      if (!html.includes('<!--landing-->')) return html;
      let server = dev;
      if (!server) {
        server = await createServer({
          configFile: false,
          root: webRoot,
          logLevel: 'error',
          plugins: [react()],
          server: { middlewareMode: true, hmr: false },
          appType: 'custom',
        });
      }
      try {
        const { render } = await server.ssrLoadModule(RENDER);
        const out = html.replace('<!--landing-->', render());
        return dev ? out.replaceAll('__SITE_URL__', '') : out;
      } finally {
        if (server !== dev) await server.close();
      }
    },
  };
}

// The React app lives in web/ and builds to dist/, which the Express server
// serves in production. In dev, Vite proxies /api to the server on :3000.
//   /      → web/index.html      static landing page
//   /app/  → web/app/index.html  the tools (React)
export default defineConfig({
  root: 'web',
  plugins: [react(), prerenderLanding()],
  // ffmpeg.wasm spawns its own worker; let Vite bundle it as-is.
  optimizeDeps: { exclude: ['@ffmpeg/ffmpeg', '@ffmpeg/util'] },
  worker: { format: 'es' },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    // heic-to (libheif) is a ~3 MB lazy chunk, loaded only for HEIC on-device.
    chunkSizeWarningLimit: 4000,
    rollupOptions: {
      input: {
        landing: fileURLToPath(new URL('./web/index.html', import.meta.url)),
        app: fileURLToPath(new URL('./web/app/index.html', import.meta.url)),
      },
    },
  },
  server: {
    port: 5173,
    proxy: { '/api': { target: `http://localhost:${process.env.PORT || 3000}`, changeOrigin: true } },
  },
});
