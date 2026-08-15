import { lazy, Suspense } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ScrollProgress } from '@/components/ScrollProgress';
import { BackToTop } from '@/components/BackToTop';
import { useRoute, useProductId, canonicalPathForRoute, canonicalPathForProduct } from '@/lib/router';
import { useDocumentHead } from '@/lib/hooks';
import { HomePage } from '@/pages/HomePage';
import { products } from '@/data/content';
import type { Route } from '@/lib/router';

const routeHead: Record<Exclude<Route, 'product'>, { title: string; description: string }> = {
  home: {
    title: 'AvantSpecs — Synergistic Herbal Solutions',
    description:
      'AvantSpecs — a merchant export house sourcing, testing, and shipping essential oils, oleoresins, spices, nuts, powders, and eco disposables to wholesale buyers worldwide. Every consignment fully documented to spec.',
  },
  register: {
    title: 'Product Register | AvantSpecs',
    description:
      'Browse AvantSpecs’ full product register: essential oils, oleoresins, spices, nuts, powders, and eco disposables, each with MOQ and COA availability. Filter by category or search by name or Latin binomial.',
  },
  house: {
    title: 'The House | AvantSpecs',
    description:
      'How AvantSpecs sources, tests, and documents every consignment — from origin procurement to lab verification to the certificate set your customs clearance needs.',
  },
  about: {
    title: 'About Us | AvantSpecs',
    description:
      'Meet the team behind AvantSpecs: Paramjeet Singh and Aadi Kumar Singh built AvantSpecs to connect Indian-origin botanical producers directly with international formulators and flavour houses.',
  },
  trade: {
    title: 'Trade & Markets | AvantSpecs',
    description:
      'The export markets AvantSpecs serves, with region-specific documentation: REACH compliance for Europe, Halaal certification for the Middle East, and more.',
  },
  contact: {
    title: 'Contact | AvantSpecs',
    description:
      'Get in touch with the AvantSpecs trade desk to request a quote, ask about a specification, or start a new export relationship.',
  },
  guide: {
    title: 'How to Choose an Essential Oil Export Partner | AvantSpecs',
    description:
      'A buyer’s guide to vetting a botanical export partner in India: what documentation to expect, how testing should work, and the certificate set your destination market requires.',
  },
};

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
const GuidePage = lazy(() => import('@/pages/GuidePage').then((m) => ({ default: m.GuidePage })));

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

  const product = route === 'product' ? products.find((p) => p.id === productId) : undefined;
  const head =
    route === 'product'
      ? product
        ? {
            title: `${product.name} | AvantSpecs`,
            description: product.description,
            canonicalPath: canonicalPathForProduct(product.id),
          }
        : {
            title: 'Product Not Found | AvantSpecs',
            description: routeHead.register.description,
            canonicalPath: canonicalPathForRoute('register'),
          }
      : { ...routeHead[route], canonicalPath: canonicalPathForRoute(route) };

  useDocumentHead(head.title, head.description, head.canonicalPath);

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
            {route === 'guide' && <GuidePage />}
          </Suspense>
        )}
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
