import { useEffect, useState } from 'react';

export type Route = 'home' | 'register' | 'house' | 'about' | 'trade' | 'contact' | 'product';

const routeMap: Record<string, Route> = {
  '#/home': 'home',
  '#/register': 'register',
  '#/house': 'house',
  '#/about': 'about',
  '#/trade': 'trade',
  '#/contact': 'contact',
};

function getProductIdFromHash(): string | null {
  const match = window.location.hash.match(/^#\/product\/(.+)$/i);
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

export function getRouteFromHash(): Route {
  const hash = window.location.hash.toLowerCase();
  if (hash.startsWith('#/product/')) return 'product';
  return routeMap[hash] ?? 'home';
}

export function navigate(route: Route) {
  window.location.hash = `#/${route}`;
}

export function navigateToProduct(productId: string) {
  window.location.hash = `#/product/${encodeURIComponent(productId)}`;
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
  const [route, setRoute] = useState<Route>(getRouteFromHash);

  useEffect(() => {
    const onHashChange = () => {
      setRoute(getRouteFromHash());
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return route;
}

export function useProductId(): string | null {
  const [productId, setProductId] = useState<string | null>(getProductIdFromHash);

  useEffect(() => {
    const onHashChange = () => setProductId(getProductIdFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return productId;
}

export function routeFromLabel(label: string): Route {
  return labelToRoute[label.toLowerCase()] ?? 'home';
}
