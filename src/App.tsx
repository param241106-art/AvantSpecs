import { lazy, Suspense } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ScrollProgress } from '@/components/ScrollProgress';
import { BackToTop } from '@/components/BackToTop';
import { useRoute, useProductId } from '@/lib/router';
import { HomePage } from '@/pages/HomePage';

// Home is the default route and stays eager so the first paint has no
// Suspense round-trip; every other route is fetched on demand so its code
// doesn't add to the initial bundle a visitor has to download for Home.
const RegisterPage = lazy(() =>
  import('@/pages/RegisterPage').then((m) => ({ default: m.RegisterPage })),
);
const HousePage = lazy(() => import('@/pages/HousePage').then((m) => ({ default: m.HousePage })));
const AboutUsPage = lazy(() =>
  import('@/pages/AboutUsPage').then((m) => ({ default: m.AboutUsPage })),
);
const TradePage = lazy(() => import('@/pages/TradePage').then((m) => ({ default: m.TradePage })));
const ContactPage = lazy(() =>
  import('@/pages/ContactPage').then((m) => ({ default: m.ContactPage })),
);
const ProductDetailPage = lazy(() =>
  import('@/pages/ProductDetailPage').then((m) => ({ default: m.ProductDetailPage })),
);

function RouteFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <p className="text-sm text-ink-muted">Loading…</p>
    </div>
  );
}

export default function App() {
  const route = useRoute();
  const productId = useProductId();

  return (
    <div className="min-h-screen bg-bg">
      <ScrollProgress />
      <Navbar />
      <main>
        {route === 'home' && <HomePage />}
        {route !== 'home' && (
          <Suspense fallback={<RouteFallback />}>
            {route === 'register' && <RegisterPage />}
            {route === 'house' && <HousePage />}
            {route === 'about' && <AboutUsPage />}
            {route === 'trade' && <TradePage />}
            {route === 'contact' && <ContactPage />}
            {route === 'product' && <ProductDetailPage productId={productId} />}
          </Suspense>
        )}
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
