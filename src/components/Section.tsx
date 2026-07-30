import type { ReactNode } from 'react';
import { navigate } from '@/lib/router';
import type { Route } from '@/lib/router';

type SectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
  bg?: 'plain' | 'green' | 'gold';
};

const bgClasses = {
  plain: 'bg-bg',
  green: 'bg-green-tint',
  gold: 'bg-gold-tint',
};

export function Section({ id, children, className = '', bg = 'plain' }: SectionProps) {
  return (
    <section id={id} className={`scroll-mt-20 py-20 ${bgClasses[bg]} ${className}`}>
      {children}
    </section>
  );
}

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
}: SectionHeaderProps) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 text-4xl leading-tight md:text-5xl">{title}</h2>
      <span className={`heading-accent ${align === 'center' ? 'mx-auto' : ''}`} />
      {description && (
        <p className="mt-4 text-base leading-relaxed text-ink-secondary">{description}</p>
      )}
    </div>
  );
}

type CTABandProps = {
  title: string;
  description?: string;
  primaryLabel: string;
  primaryRoute?: Route;
  primaryHref?: string;
  primaryOnClick?: () => void;
  secondaryLabel?: string;
  secondaryRoute?: Route;
  secondaryHref?: string;
};

export function CTABand({
  title,
  description,
  primaryLabel,
  primaryRoute,
  primaryHref,
  primaryOnClick,
  secondaryLabel,
  secondaryRoute,
  secondaryHref,
}: CTABandProps) {
  return (
    <div className="container-wrap">
      <div className="rounded-lg bg-green px-8 py-12 text-center text-white md:px-16">
        <h3 className="text-3xl text-white md:text-4xl">{title}</h3>
        <span className="heading-accent mx-auto" />
        {description && (
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/80">
            {description}
          </p>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {primaryOnClick ? (
            <button type="button" onClick={primaryOnClick} className="btn-gold">
              {primaryLabel}
            </button>
          ) : primaryRoute ? (
            <button type="button" onClick={() => navigate(primaryRoute)} className="btn-gold">
              {primaryLabel}
            </button>
          ) : (
            <a href={primaryHref} className="btn-gold">
              {primaryLabel}
            </a>
          )}
          {secondaryLabel && (secondaryRoute || secondaryHref) && (
            secondaryRoute ? (
              <button
                type="button"
                onClick={() => navigate(secondaryRoute)}
                className="btn border border-white/40 text-white hover:bg-white/10"
              >
                {secondaryLabel}
              </button>
            ) : (
              <a
                href={secondaryHref}
                className="btn border border-white/40 text-white hover:bg-white/10"
              >
                {secondaryLabel}
              </a>
            )
          )}
        </div>
      </div>
    </div>
  );
}
