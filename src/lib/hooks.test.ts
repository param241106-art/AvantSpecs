import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useScrolled, useScrollProgress } from '@/lib/hooks';

describe('useScrolled', () => {
  beforeEach(() => {
    window.scrollY = 0;
  });

  it('is false below the threshold', () => {
    const { result } = renderHook(() => useScrolled(24));
    expect(result.current).toBe(false);
  });

  it('becomes true once scrollY exceeds the threshold', () => {
    const { result } = renderHook(() => useScrolled(24));
    act(() => {
      window.scrollY = 100;
      window.dispatchEvent(new Event('scroll'));
    });
    expect(result.current).toBe(true);
  });

  it('respects a custom threshold', () => {
    const { result } = renderHook(() => useScrolled(500));
    act(() => {
      window.scrollY = 100;
      window.dispatchEvent(new Event('scroll'));
    });
    expect(result.current).toBe(false);
  });
});

describe('useScrollProgress', () => {
  it('reports 0 when the document does not overflow the viewport', () => {
    vi.spyOn(document.documentElement, 'scrollHeight', 'get').mockReturnValue(800);
    Object.defineProperty(window, 'innerHeight', { value: 800, configurable: true });
    const { result } = renderHook(() => useScrollProgress());
    expect(result.current).toBe(0);
  });

  it('computes a percentage when the page is scrollable', () => {
    vi.spyOn(document.documentElement, 'scrollHeight', 'get').mockReturnValue(1800);
    Object.defineProperty(window, 'innerHeight', { value: 800, configurable: true });
    window.scrollY = 500;
    const { result } = renderHook(() => useScrollProgress());
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });
    expect(result.current).toBeCloseTo(50, 5);
  });
});
