import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useScrolled } from '@/lib/hooks';
import { useRoute, navigate, navigateToOrderPortal, routeHref, handleRouteLinkClick } from '@/lib/router';
import type { Route } from '@/lib/router';
import { Picture } from '@/components/Picture';

const navLinks: { label: string; route: Exclude<Route, 'product'> }[] = [
  { label: 'Home', route: 'home' },
  { label: 'Register', route: 'register' },
  { label: 'House', route: 'house' },
  { label: 'About Us', route: 'about' },
  { label: 'Trade', route: 'trade' },
  { label: 'Contact', route: 'contact' },
];

export function Navbar() {
  const scrolled = useScrolled(24);
  const [mobileOpen, setMobileOpen] = useState(false);
  const currentRoute = useRoute();

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const go = (route: Exclude<Route, 'product'>) => {
    navigate(route);
    setMobileOpen(false);
  };

  const requestQuote = () => {
    navigateToOrderPortal();
    setMobileOpen(false);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 bg-green transition-all duration-300 ${
          scrolled
            ? 'border-b border-green-mid shadow-soft backdrop-blur'
            : 'border-b border-transparent'
        }`}
      >
        <nav className="container-wrap flex h-16 items-center justify-between">
          <a
            href={routeHref('home')}
            onClick={(e) => handleRouteLinkClick(e, () => go('home'))}
            className="flex items-center gap-2.5"
          >
            <Picture
              src="/images/logo.jpg"
              alt="AvantSpecs logo"
              width={96}
              height={96}
              loading="eager"
              className="h-10 w-10 rounded-sm object-cover"
            />
            <div className="leading-none">
              <p className="font-heading text-base font-semibold text-white">AvantSpecs</p>
              <p className="font-mono text-[0.6rem] uppercase tracking-wider text-gold-light">
                Synergistic Herbal Solutions
              </p>
            </div>
          </a>

          <div className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.route}
                href={routeHref(link.route)}
                onClick={(e) => handleRouteLinkClick(e, () => go(link.route))}
                className={`text-sm font-medium transition-colors hover:text-gold-light ${
                  currentRoute === link.route ? 'text-gold-light' : 'text-white/80'
                }`}
              >
                {link.label}
              </a>
            ))}
            <button type="button" onClick={requestQuote} className="btn-gold">
              Request a Quote
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-sm text-white md:hidden"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </nav>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-bg md:hidden">
          <div className="container-wrap flex h-16 items-center justify-between">
            <a
              href={routeHref('home')}
              onClick={(e) => handleRouteLinkClick(e, () => go('home'))}
              className="flex items-center gap-2.5"
            >
              <Picture
                src="/images/logo.jpg"
                alt="AvantSpecs logo"
                width={96}
                height={96}
                loading="eager"
                className="h-10 w-10 rounded-sm object-cover"
              />
              <p className="font-heading text-base font-semibold text-ink">AvantSpecs</p>
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="flex h-10 w-10 items-center justify-center text-green"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>
          <nav className="container-wrap mt-8 flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.route}
                href={routeHref(link.route)}
                onClick={(e) => handleRouteLinkClick(e, () => go(link.route))}
                className={`rounded-sm px-4 py-4 text-left text-lg font-medium hover:bg-green-tint ${
                  currentRoute === link.route ? 'bg-green-tint text-green' : 'text-ink'
                }`}
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={requestQuote}
              className="btn-gold mt-4 w-full"
            >
              Request a Quote
            </button>
          </nav>
        </div>
      )}
    </>
  );
}
