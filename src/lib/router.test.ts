import { describe, it, expect, beforeEach } from 'vitest';
import { getRouteFromHash, navigate, routeFromLabel } from '@/lib/router';

describe('getRouteFromHash', () => {
  beforeEach(() => {
    window.location.hash = '';
  });

  it('defaults to home when hash is empty', () => {
    expect(getRouteFromHash()).toBe('home');
  });

  it('defaults to home when hash is unrecognized', () => {
    window.location.hash = '#/nonexistent';
    expect(getRouteFromHash()).toBe('home');
  });

  it.each([
    ['#/home', 'home'],
    ['#/register', 'register'],
    ['#/house', 'house'],
    ['#/trade', 'trade'],
    ['#/contact', 'contact'],
  ])('maps %s to %s', (hash, expected) => {
    window.location.hash = hash;
    expect(getRouteFromHash()).toBe(expected);
  });

  it('is case-insensitive', () => {
    window.location.hash = '#/CONTACT';
    expect(getRouteFromHash()).toBe('contact');
  });
});

describe('navigate', () => {
  it('sets window.location.hash to the given route', () => {
    navigate('trade');
    expect(window.location.hash).toBe('#/trade');
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
