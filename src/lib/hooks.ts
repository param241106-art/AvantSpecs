import { useEffect, useRef, useState } from 'react';

export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit,
) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, ...options },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return { ref, visible };
}

export function useCountUp(target: number, duration = 1000) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const animate = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { ref, value };
}

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return progress;
}

export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return scrolled;
}

function setMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/**
 * Sets a per-route document title, meta description, and canonical URL.
 *
 * Note: this runs client-side after React mounts, so it only reaches
 * crawlers that execute JS (Google does; GPTBot/ClaudeBot/PerplexityBot
 * currently do not — see the SEO audit's GEO findings). Google's own
 * guidance also treats a JS-inserted rel=canonical as less reliable than one
 * present in the initial HTML response, so this is a real improvement over
 * every route sharing one title, but not a substitute for server-side
 * rendering if that's ever prioritized.
 */
export function useDocumentHead(title: string, description: string, canonicalPath: string) {
  useEffect(() => {
    document.title = title;
    setMeta('description', description);
    setMeta('og:title', title, 'property');
    setMeta('og:description', description, 'property');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);

    const canonicalUrl = `https://avantspecs.com${canonicalPath}`;
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', canonicalUrl);
    setMeta('og:url', canonicalUrl, 'property');
  }, [title, description, canonicalPath]);
}

/**
 * Injects a single per-route JSON-LD <script> into <head>. Same
 * JS-execution caveat as useDocumentHead applies for real-time visitors,
 * but the prerender step (scripts/prerender.mjs) runs this via a headless
 * browser and bakes the result into the static HTML, so crawlers that don't
 * execute JS still see it in the raw response.
 */
export function useStructuredData(schema: object | null) {
  useEffect(() => {
    if (!schema) return;
    let el = document.head.querySelector<HTMLScriptElement>('script[data-ld-json]');
    if (!el) {
      el = document.createElement('script');
      el.type = 'application/ld+json';
      el.setAttribute('data-ld-json', '');
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(schema);
    return () => el?.remove();
  }, [schema]);
}
