import type { LucideIcon } from 'lucide-react';
import { ArrowRight, FileCheck, FlaskConical, Ship } from 'lucide-react';
import { useReveal, useCountUp } from '@/lib/hooks';
import { navigate } from '@/lib/router';
import { Picture } from '@/components/Picture';
import { stats } from '@/data/content';

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, value: count } = useCountUp(value);
  return (
    <div className="text-center">
      <p className="font-numeric text-4xl font-semibold text-gold-light md:text-5xl">
        <span ref={ref}>{count}</span>
        {suffix}
      </p>
      <p className="mt-2 text-sm text-white/70">{label}</p>
    </div>
  );
}

const valueProps = [
  {
    icon: FileCheck,
    title: 'Documented to Spec',
    description:
      'Every consignment ships with a full document set — COA, TDS, SDS, and origin certificates — so your customs clearance is never held up by missing paperwork.',
  },
  {
    icon: FlaskConical,
    title: 'Lab-Verified Quality',
    description:
      'GC-MS constituent profiling and microbial/heavy-metal panels on every batch. You receive the actual lab report, not a generic spec sheet, before you pay.',
  },
  {
    icon: Ship,
    title: 'Global Trade Desk',
    description:
      'We map the exact certificate set your destination market requires — from USFDA to Halaal — and handle freight, documentation, and incoterm logistics end to end.',
  },
];

function ValuePropCard({
  icon,
  title,
  description,
  index,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}) {
  const { ref, visible } = useReveal();
  const Icon = icon;
  return (
    <div
      ref={ref}
      className={`card card-glow relative overflow-hidden p-8 reveal ${visible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-green-tint text-green">
        <Icon size={24} />
      </div>
      <h3 className="mt-5 text-xl">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-ink-secondary">{description}</p>
    </div>
  );
}

export function HomeSection() {
  const heroReveal = useReveal();
  const statsReveal = useReveal({ threshold: 0.3 });
  const valuesReveal = useReveal();

  return (
    <section id="home" className="scroll-mt-20 overflow-hidden bg-bg pt-16">
      <div className="container-wrap py-20 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div ref={heroReveal.ref} className={`reveal ${heroReveal.visible ? 'is-visible' : ''}`}>
            <p className="eyebrow">Rohtak, India</p>
            <h1 className="mt-4 text-5xl leading-[1.05] md:text-7xl">
              Essential oils and oleoresins, fully documented to spec.
            </h1>
            <span className="heading-accent" />
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-secondary">
              AvantSpecs is a merchant export house sourcing, testing, and shipping botanical
              ingredients to wholesale buyers, formulators, and flavour houses worldwide. Every
              consignment arrives with a complete paper trail — from origin to your dock.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button type="button" onClick={() => navigate('register')} className="btn-gold">
                Request a Quote <ArrowRight size={17} />
              </button>
              <button type="button" onClick={() => navigate('register')} className="btn-outline">
                Browse the Register
              </button>
            </div>
          </div>

          <div
            className={`reveal ${heroReveal.visible ? 'is-visible' : ''} aspect-[3/2] overflow-hidden rounded-lg border border-line shadow-soft`}
            style={{ transitionDelay: '150ms' }}
          >
            <Picture
              src="/images/Shipping.jpg"
              alt="A shipping container being loaded onto a cargo vessel at port"
              width={612}
              height={410}
              loading="eager"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      <div ref={statsReveal.ref} className="border-y border-green-mid bg-green">
        <div className="container-wrap grid grid-cols-2 gap-8 py-12 md:grid-cols-4">
          {stats.map((stat) => (
            <StatCounter key={stat.label} {...stat} />
          ))}
        </div>
      </div>

      <div ref={valuesReveal.ref} className="container-wrap py-20">
        <div className={`reveal ${valuesReveal.visible ? 'is-visible' : ''} mx-auto max-w-2xl`}>
          <p className="eyebrow">Why AvantSpecs</p>
          <h2 className="mt-3 text-4xl leading-tight md:text-5xl">
            Built to bridge origin and formulation
          </h2>
          <span className="heading-accent" />
          <p className="mt-4 text-base leading-relaxed text-ink-secondary">
            We sit between the farm and the formulation lab — procuring directly from
            origin regions, testing every batch, and shipping with documentation that
            clears customs on the first try.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {valueProps.map((prop, i) => (
            <ValuePropCard key={prop.title} {...prop} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
