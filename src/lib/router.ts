import { useEffect, useState } from 'react';

export type Route = 'home' | 'register' | 'house' | 'about' | 'trade' | 'contact' | 'product';

// Real pathnames (relative to the app's base) — these must be unique, crawlable
// URLs so Google can index and rank each page independently. Previously this
// app used hash routing (#/register etc.), which collapses to a single
// indexable URL and hides every route from crawlers.
const routeMap: Record<string, Route> = {
  '/': 'home',
  '/home': 'home',
  '/register': 'register',
  '/house': 'house',
  '/about': 'about',
  '/trade': 'trade',
  '/contact': 'contact',
};

const pathForRoute: Record<Exclude<Route, 'product'>, string> = {
  home: '/',
  register: '/register',
  house: '/house',
  about: '/about',
  trade: '/trade',
  contact: '/contact',
};

// A custom event fired on every programmatic navigation. `popstate` alone
// only fires on back/forward, not on pushState, so components that need to
// react to in-app navigation (useRoute, useProductId) listen for both.
const NAVIGATE_EVENT = 'avantspecs:navigate';

function getBase(): string {
  // import.meta.env.BASE_URL always has a leading and trailing slash
  // (e.g. "/" or "/AvantSpecs/"), matching Vite's `base` config. Resolving
  // against it keeps routing correct whether the app is served from the
  // domain root or a sub-path.
  return import.meta.env.BASE_URL;
}

function stripBase(pathname: string): string {
  const base = getBase();
  if (base !== '/' && pathname.startsWith(base)) {
    return '/' + pathname.slice(base.length);
  }
  return pathname;
}

export function resolvePath(path: string): string {
  const base = getBase();
  const relative = path.startsWith('/') ? path.slice(1) : path;
  return relative === '' ? base : `${base}${relative}`;
}

export function routeHref(route: Exclude<Route, 'product'>): string {
  return resolvePath(pathForRoute[route]);
}

export function productHref(productId: string): string {
  return resolvePath(`product/${encodeURIComponent(productId)}`);
}

/** The real, base-independent path for a route — always relative to the
 * production domain root (avantspecs.com), regardless of how the app is
 * currently being served (e.g. a GitHub Pages sub-path). Use this for
 * canonical URLs, not `routeHref`, which is base-aware for actual `<a href>`
 * attributes so links still work when previewed under a sub-path. */
export function canonicalPathForRoute(route: Exclude<Route, 'product'>): string {
  return pathForRoute[route];
}

export function canonicalPathForProduct(productId: string): string {
  return `/product/${encodeURIComponent(productId)}`;
}

function getProductIdFromPath(): string | null {
  const path = stripBase(window.location.pathname);
  const match = path.match(/^\/product\/(.+?)\/?$/i);
  return match ? decodeURIComponent(match[1]) : null;
}

const labelToRoute: Record<string, Route> = {
  home: 'home',
  register: 'register',
  house: 'house',
  about: 'about',
  trade: 'trade',
  contact: 'contact',
};

export function getRouteFromPath(): Route {
  let path = stripBase(window.location.pathname).toLowerCase();
  // Static per-route shells (see scripts/prerender-shells.mjs) are served
  // from a directory index, so GitHub Pages serves them at a trailing-slash
  // URL (e.g. /register/) — strip it before matching so both /register and
  // /register/ resolve the same way.
  if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);
  if (/^\/product\/.+/i.test(path)) return 'product';
  return routeMap[path] ?? 'home';
}

function pushPath(path: string) {
  const href = resolvePath(path);
  if (window.location.pathname === href) return;
  window.history.pushState({}, '', href);
  window.dispatchEvent(new Event(NAVIGATE_EVENT));
}

export function navigate(route: Exclude<Route, 'product'>) {
  pushPath(pathForRoute[route]);
  window.scrollTo({ top: 0, behavior: 'auto' });
}

export function navigateToProduct(productId: string) {
  pushPath(`product/${encodeURIComponent(productId)}`);
  window.scrollTo({ top: 0, behavior: 'auto' });
}

let pendingProductId: string | null = null;

export function navigateToOrderPortalWithProduct(productId: string) {
  pendingProductId = productId;
  navigate('register');
}

export function consumePendingProduct(): string | null {
  const id = pendingProductId;
  pendingProductId = null;
  return id;
}

export function navigateToOrderPortal() {
  const existing = document.getElementById('portal-page');
  if (existing) {
    existing.scrollIntoView({ behavior: 'smooth' });
    return;
  }

  navigate('register');
  const observer = new MutationObserver(() => {
    const el = document.getElementById('portal-page');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
  setTimeout(() => observer.disconnect(), 5000);
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(getRouteFromPath);

  useEffect(() => {
    const onChange = () => setRoute(getRouteFromPath());
    window.addEventListener('popstate', onChange);
    window.addEventListener(NAVIGATE_EVENT, onChange);
    return () => {
      window.removeEventListener('popstate', onChange);
      window.removeEventListener(NAVIGATE_EVENT, onChange);
    };
  }, []);

  return route;
}

export function useProductId(): string | null {
  const [productId, setProductId] = useState<string | null>(getProductIdFromPath);

  useEffect(() => {
    const onChange = () => setProductId(getProductIdFromPath());
    window.addEventListener('popstate', onChange);
    window.addEventListener(NAVIGATE_EVENT, onChange);
    return () => {
      window.removeEventListener('popstate', onChange);
      window.removeEventListener(NAVIGATE_EVENT, onChange);
    };
  }, []);

  return productId;
}

export function routeFromLabel(label: string): Route {
  return labelToRoute[label.toLowerCase()] ?? 'home';
}

/** Click handler for real <a href> route links: lets modifier-key/middle
 * clicks (open in new tab, etc.) behave natively, and intercepts a plain
 * left click to navigate client-side instead of a full page reload. */
export function handleRouteLinkClick(
  e: React.MouseEvent<HTMLAnchorElement>,
  onNavigate: () => void,
) {
  if (e.defaultPrevented || e.button !== 0) return;
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  e.preventDefault();
  onNavigate();
}
