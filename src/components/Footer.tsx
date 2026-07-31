import { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { navigate, useRoute } from '@/lib/router';
import type { Route } from '@/lib/router';
import { Picture } from '@/components/Picture';

const navLinks: { label: string; route: Route }[] = [
  { label: 'Home', route: 'home' },
  { label: 'Product Register', route: 'register' },
  { label: 'The House', route: 'house' },
  { label: 'About Us', route: 'about' },
  { label: 'Trade & Markets', route: 'trade' },
  { label: 'Contact', route: 'contact' },
];

const categoryLinks: { label: string; route: Route }[] = [
  { label: 'Essential Oils', route: 'register' },
  { label: 'Oleoresins', route: 'register' },
];

export function Footer() {
  const route = useRoute();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    const { error } = await supabase.from('newsletter_submissions').insert({ email });
    if (error) {
      setStatus('error');
      return;
    }
    setStatus('success');
    setEmail('');
    setTimeout(() => setStatus('idle'), 4000);
  };

  return (
    <footer className="border-t border-line bg-green text-white">
      <div className="container-wrap py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <Picture
                src="/images/logo.jpg"
                alt="AvantSpecs logo"
                width={96}
                height={96}
                className="h-10 w-10 rounded-sm object-cover"
              />
              <div className="leading-none">
                <p className="font-heading text-base font-semibold text-white">AvantSpecs</p>
                <p className="font-mono text-[0.6rem] uppercase tracking-wider text-gold-light">
                  Synergistic Herbal Solutions
                </p>
              </div>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
              A merchant export house sourcing, testing, and shipping essential oils and
              oleoresins to wholesale buyers worldwide.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold-light">
              Navigate
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => navigate(link.route)}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold-light">
              Categories
            </h4>
            <ul className="space-y-2.5">
              {categoryLinks.map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => navigate(link.route)}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
            {route !== 'contact' && (
              <div className="mt-6 space-y-2.5">
                <a
                  href="mailto:param@avantspecs.com"
                  className="flex items-center gap-2 text-sm text-white/70 hover:text-white"
                >
                  <Mail size={15} /> param@avantspecs.com
                </a>
                <a
                  href="tel:+971506650173"
                  className="flex items-center gap-2 text-sm text-white/70 hover:text-white"
                >
                  <Phone size={15} /> +971 50 665 0173
                </a>
                <p className="flex items-center gap-2 text-sm text-white/70">
                  <MapPin size={15} /> Rohtak, India 124001
                </p>
              </div>
            )}
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold-light">
              Newsletter
            </h4>
            <p className="mb-3 text-sm text-white/70">
              New-crop availability and market notes, direct to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={
                  status === 'success'
                    ? 'Subscribed'
                    : status === 'error'
                      ? 'Enter a valid email'
                      : 'you@company.com'
                }
                className="w-full rounded-sm border border-white/20 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-gold focus:outline-none"
                aria-label="Email for newsletter"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="shrink-0 rounded-sm bg-gold px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gold-light disabled:opacity-60"
              >
                {status === 'loading' ? '...' : 'Subscribe'}
              </button>
            </form>
            {status === 'success' && (
              <p className="mt-2 text-xs text-gold-light">Thank you for subscribing.</p>
            )}
            {status === 'error' && (
              <p className="mt-2 text-xs text-rust">Please enter a valid email address.</p>
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-white/50">
            &copy; {new Date().getFullYear()} AvantSpecs. All rights reserved.
          </p>
          <p className="text-xs text-white/50">Rohtak, India &middot; param@avantspecs.com</p>
        </div>
      </div>
    </footer>
  );
}
