import { defineConfig, createServer, type Plugin, type ViteDevServer } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs/promises';
import path from 'node:path';

const webRoot = fileURLToPath(new URL('./web', import.meta.url));
const RENDER = '/src/landing/render.tsx';
// Guides and legal pages, rendered into the same template (see web/src/pages).
const PAGES = '/src/pages/render.tsx';

// Renders the landing page (web/src/landing) to static HTML, once per
// language: English goes to index.html, every other language to
// <code>/index.html (/es/, /fr/ ...), each with its own <head> tags. The pages
// ship with no JS, so they are fast and fully readable by crawlers.
// In dev, /<code>/ falls back to web/index.html and is rendered on request.
// In a build, index.html keeps its placeholders through the bundle and is
// filled in afterwards, using a throwaway Vite server to load the component.
type Rendered = { lang: string; head: string; body: string };
type RenderModule = { render: (lang?: string) => Rendered; LANGS: { code: string }[]; langPath: (code: string) => string };
type PagesModule = { PAGES: { path: string; priority: string }[]; pageFor: (path: string) => unknown; renderPage: (path: string) => Rendered };

const fillPage = (html: string, page: Rendered) =>
  // (Replacer functions, so a "$" in the copy is never read as a pattern.)
  html.replace('__LANG__', () => page.lang).replace('<!--head-->', () => page.head).replace('<!--landing-->', () => page.body);

function prerenderLanding(): Plugin {
  let dev: ViteDevServer | undefined;
  return {
    name: 'prerender-landing',
    configureServer(server) {
      dev = server;
    },
    async transformIndexHtml(html, ctx) {
      // The server fills in the real origin; in dev, links stay relative.
      if (!dev || !html.includes('<!--landing-->')) return html;
      const pages = (await dev.ssrLoadModule(PAGES)) as PagesModule;
      const url = (ctx.originalUrl || '/').split(/[?#]/)[0];
      if (pages.pageFor(url)) return fillPage(html, pages.renderPage(url)).replaceAll('__SITE_URL__', '').replaceAll('__CONTACT_EMAIL__', 'support@localhost');
      const mod = (await dev.ssrLoadModule(RENDER)) as RenderModule;
      const code = url.split('/')[1];
      const lang = mod.LANGS.some((l) => l.code === code) ? code : 'en';
      return fillPage(html, mod.render(lang)).replaceAll('__SITE_URL__', '');
    },
    async writeBundle(options, bundle) {
      if (!bundle['index.html']) return;
      const outDir = options.dir!;
      const template = await fs.readFile(path.join(outDir, 'index.html'), 'utf8');
      const server = await createServer({
        configFile: false,
        root: webRoot,
        logLevel: 'error',
        plugins: [react()],
        server: { middlewareMode: true, hmr: false },
        appType: 'custom',
      });
      try {
        const mod = (await server.ssrLoadModule(RENDER)) as RenderModule;
        for (const { code } of mod.LANGS) {
          const file = path.join(outDir, mod.langPath(code), 'index.html');
          await fs.mkdir(path.dirname(file), { recursive: true });
          await fs.writeFile(file, fillPage(template, mod.render(code)));
        }
        // The server reads this for the sitemap.
        const langs = mod.LANGS.map((l) => ({ code: l.code, path: mod.langPath(l.code) }));
        await fs.writeFile(path.join(outDir, 'landing-langs.json'), JSON.stringify(langs));

        const pages = (await server.ssrLoadModule(PAGES)) as PagesModule;
        for (const { path: p } of pages.PAGES) {
          const file = path.join(outDir, p, 'index.html');
          await fs.mkdir(path.dirname(file), { recursive: true });
          await fs.writeFile(file, fillPage(template, pages.renderPage(p)));
        }
        // The server reads this for its routes and the sitemap.
        await fs.writeFile(path.join(outDir, 'pages.json'), JSON.stringify(pages.PAGES.map(({ path: p, priority }) => ({ path: p, priority }))));
      } finally {
        await server.close();
      }
    },
  };
}

// The React app lives in web/ and builds to dist/, which the Express server
// serves in production. In dev, Vite proxies /api to the server on :3000.
//   /      → web/index.html      static landing page (English)
//   /es/ … → dist/es/index.html  the same page in other languages
//   /app/  → web/app/index.html  the tools (React)
//   /guides/…, /privacy/, /terms/ → dist/<path>/index.html  static content pages
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
    // xfwd: the API sees the page's own host, for sign-in and Stripe return links.
    proxy: { '/api': { target: `http://localhost:${process.env.PORT || 3000}`, changeOrigin: true, xfwd: true } },
  },
});
