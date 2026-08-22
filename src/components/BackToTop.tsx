import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { useRoute } from '@/lib/router';

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const route = useRoute();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      // Product pages add a full-width sticky "Request a Quote" bar at the
      // bottom on mobile (see ProductDetailPage) — sit above it there so the
      // two fixed elements don't overlap.
      className={`fixed right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-green text-white shadow-soft transition-all hover:bg-green-mid ${
        route === 'product' ? 'bottom-24 sm:bottom-6' : 'bottom-6'
      }`}
      aria-label="Back to top"
    >
      <ArrowUp size={20} />
    </button>
  );
}
