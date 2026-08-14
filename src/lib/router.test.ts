import { describe, it, expect, beforeEach } from 'vitest';
import { getRouteFromPath, navigate, routeFromLabel, routeHref, productHref } from '@/lib/router';

// Routing must work whatever `base` is configured to in vite.config.ts (the
// app root or a sub-path), so tests compute expected paths against the real
// configured base rather than assuming '/'.
const base = import.meta.env.BASE_URL;

function resetPath() {
  window.history.pushState({}, '', base);
}

describe('getRouteFromPath', () => {
  beforeEach(resetPath);

  it('defaults to home at the root path', () => {
    expect(getRouteFromPath()).toBe('home');
  });

  it('defaults to home for an unrecognized path', () => {
    window.history.pushState({}, '', `${base}nonexistent`);
    expect(getRouteFromPath()).toBe('home');
  });

  it.each([
    ['home', 'home'],
    ['register', 'register'],
    ['house', 'house'],
    ['trade', 'trade'],
    ['contact', 'contact'],
  ])('maps %s to %s', (segment, expected) => {
    window.history.pushState({}, '', `${base}${segment}`);
    expect(getRouteFromPath()).toBe(expected);
  });

  it('is case-insensitive', () => {
    window.history.pushState({}, '', `${base}CONTACT`);
    expect(getRouteFromPath()).toBe('contact');
  });

  it('maps /product/:id to the product route', () => {
    window.history.pushState({}, '', `${base}product/eucalyptus-oil`);
    expect(getRouteFromPath()).toBe('product');
  });
});

describe('navigate', () => {
  beforeEach(resetPath);

  it('pushes the resolved pathname for the given route', () => {
    navigate('trade');
    expect(window.location.pathname).toBe(`${base}trade`);
  });
});

describe('routeHref / productHref', () => {
  it('resolves route paths', () => {
    expect(routeHref('home')).toBe(base);
    expect(routeHref('contact')).toBe(`${base}contact`);
  });

  it('resolves a product path with the id encoded', () => {
    expect(productHref('clove bud oil')).toBe(`${base}product/clove%20bud%20oil`);
  });
});

describe('routeFromLabel', () => {
  it('resolves known labels case-insensitively', () => {
    expect(routeFromLabel('Contact')).toBe('contact');
    expect(routeFromLabel('HOUSE')).toBe('house');
  });

  it('falls back to home for unknown labels', () => {
    expect(routeFromLabel('nope')).toBe('home');
  });
});
