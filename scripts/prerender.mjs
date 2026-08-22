// Post-build step: renders every URL in public/sitemap.xml through a real
// (headless) browser and overwrites dist/<route>/index.html with the fully
// rendered DOM — head *and* body — so GitHub Pages serves real content to
// crawlers that don't execute JS (GPTBot, ClaudeBot, PerplexityBot,
// Google-Extended), not just an empty <div id="root">.
//
// react-snap was tried first (per the standard Vite prerender playbook) but
// its only dependency chain pulls puppeteer@1.20.0 (deprecated since 2019,
// no maintained release since), which fails to install cleanly and bundles
// a 2018-era Chromium build with no realistic chance of launching on a
// current OS/Node. This script does the same job with a current `puppeteer`
// instead: build once with Vite (already produces correct per-route <head>
// tags and real JS behavior for browsers), spin up a tiny static server
// with SPA fallback over dist/, visit each sitemap URL, wait for the route's
// lazy chunk to render (see waitForRouteReady below), and replace that
// route's index.html with page.content().
//
// Real browsers still get the exact same JS bundle and hydrate/re-render
// over this HTML via createRoot in src/main.tsx — this only changes what a
// non-JS fetch sees before that happens.

import { createServer } from 'node:http';
import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import puppeteer from 'puppeteer';

const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

async function readSitemapPaths() {
  const xml = await readFile(path.join(root, 'public', 'sitemap.xml'), 'utf-8');
  const locs = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
  return locs.map((loc) => new URL(loc).pathname);
}

// Serves the pre-prerender dist/ output: real files (JS/CSS/images) as-is;
// every route path falls back to the pristine Vite-built index.html (the
// SPA shell). That template is captured once into `shellHtml` up front and
// reused as a constant in-memory fallback for every request — not re-read
// from disk — because this loop writes its own output to dist/index.html
// for the '/' route partway through, and a disk re-read would let that
// finished, fully-rendered homepage leak into every route processed after
// it (its <script data-ld-json> tag sits in <head>, which React never
// touches, so nothing would ever clear it back out on other routes).
function startServer(shellHtml) {
  const server = createServer(async (req, res) => {
    const url = new URL(req.url, 'http://localhost');
    const resolved = path.join(dist, decodeURIComponent(url.pathname));
    const withinDist = resolved.startsWith(dist + path.sep);
    try {
      if (withinDist && !(await stat(resolved)).isDirectory()) {
        const data = await readFile(resolved);
        const ext = path.extname(resolved);
        res.writeHead(200, { 'Content-Type': MIME[ext] ?? 'application/octet-stream' });
        res.end(data);
        return;
      }
    } catch {
      // Not a real file — fall through to the SPA shell below.
    }
    res.writeHead(200, { 'Content-Type': MIME['.html'] });
    res.end(shellHtml);
  });
  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => resolve(server));
  });
}

// The app renders eagerly for '/', but every other route lazy-loads its page
// chunk inside a Suspense boundary whose fallback shows literal text
// "Loading…" (see App.tsx's RouteFallback). Waiting for that text to
// disappear, on top of Puppeteer's own networkidle0 wait, confirms the real
// route content — not the fallback — is what got captured.
async function waitForRouteReady(page) {
  await page.waitForFunction(
    () => !document.querySelector('main')?.textContent?.includes('Loading…'),
    { timeout: 10_000 },
  );
}

// useReveal and useCountUp (src/lib/hooks.ts) gate their effect — fading a
// card in, counting a stat up from 0 — behind an IntersectionObserver that
// only fires once the element is actually scrolled into view. A capture
// taken at scrollY=0 right after waitForRouteReady freezes those elements in
// their pre-animation state forever for any crawler that doesn't execute JS
// (GPTBot, ClaudeBot, PerplexityBot) — e.g. HomeSection's stat counters
// getting baked into the static HTML as literal "0". Scrolling the whole
// page top to bottom before capturing triggers every one of those
// observers, and the trailing wait lets useCountUp's 1s ease-out finish, so
// the snapshot reflects real end-state content, not an empty first frame.
async function settleScrollTriggeredAnimations(page) {
  await page.evaluate(async () => {
    const step = 400;
    const delay = (ms) => new Promise((r) => setTimeout(r, ms));
    let y = 0;
    const max = document.body.scrollHeight;
    while (y < max) {
      y += step;
      window.scrollTo(0, y);
      await delay(50);
    }
  });
  await new Promise((r) => setTimeout(r, 1100));
  await page.evaluate(() => window.scrollTo(0, 0));
}

async function writeRoute(urlPath, html) {
  const outDir = urlPath === '/' ? dist : path.join(dist, urlPath.replace(/^\//, ''));
  await mkdir(outDir, { recursive: true });
  await writeFile(path.join(outDir, 'index.html'), html);
}

async function main() {
  const routes = await readSitemapPaths();
  const shellHtml = await readFile(path.join(dist, 'index.html'), 'utf-8');
  const server = await startServer(shellHtml);
  const port = server.address().port;

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    let count = 0;
    for (const urlPath of routes) {
      await page.goto(`http://127.0.0.1:${port}${urlPath}`, { waitUntil: 'networkidle0' });
      await waitForRouteReady(page);
      await settleScrollTriggeredAnimations(page);
      const html = await page.content();
      await writeRoute(urlPath, html);
      count++;
      console.log(`prerendered ${urlPath}`);
    }
    console.log(`Prerendered ${count} route(s) from sitemap.xml.`);
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
