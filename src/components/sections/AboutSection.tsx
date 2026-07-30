import { FlaskConical, ShieldCheck } from 'lucide-react';
import { Section, SectionHeader, CTABand } from '@/components/Section';
import { useReveal } from '@/lib/hooks';
import { navigate } from '@/lib/router';

const processSteps = [
  {
    number: '01',
    title: 'Sourcing & Procurement',
    description:
      'We procure directly from origin regions across India — eucalyptus from the Himalayan foothills, clove from Tamil Nadu, lemongrass from Kerala. Every lot is traceable to its district.',
  },
  {
    number: '02',
    title: 'Testing & Quality Control',
    description:
      'Each batch undergoes GC-MS constituent profiling, microbial and heavy-metal panels, and organoleptic evaluation. A Certificate of Analysis is generated before any consignment is cleared.',
  },
  {
    number: '03',
    title: 'Freight & Delivery',
    description:
      'We handle incoterm logistics, export documentation, and freight forwarding. Your consignment ships with the full document set your destination market requires.',
  },
];

const qualityPoints = [
  'GC-MS constituent breakdown (key actives and trace compounds)',
  'Microbial panel: total plate count, yeast, mould, E. coli, Salmonella',
  'Heavy-metal panel: lead, arsenic, cadmium, mercury',
  'Batch number, harvest year, and origin district',
  'Extraction method and date of distillation',
  'Shelf life and recommended storage conditions',
];

const certificationsTeaser = ['FSSAI', 'ISO 9001:2015', 'ISO 22000:2018', 'HACCP', 'GMP', 'USFDA', 'Kosher', 'Halaal'];

function ProcessCard({
  number,
  title,
  description,
  index,
}: {
  number: string;
  title: string;
  description: string;
  index: number;
}) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`card relative p-8 reveal ${visible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <p className="font-mono text-3xl font-bold text-gold/40">{number}</p>
      <h3 className="mt-4 text-xl">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-ink-secondary">{description}</p>
    </div>
  );
}

function QualityPoint({ point, index }: { point: string; index: number }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`flex items-start gap-3 rounded-md border border-line bg-surface p-4 reveal ${visible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <ShieldCheck size={18} className="mt-0.5 shrink-0 text-green" />
      <p className="text-sm text-ink-secondary">{point}</p>
    </div>
  );
}

export function AboutSection() {
  const introReveal = useReveal();
  const processReveal = useReveal();
  const qualityReveal = useReveal();

  return (
    <Section id="about" bg="plain">
      <div className="container-wrap">
        <div ref={introReveal.ref} className={`reveal ${introReveal.visible ? 'is-visible' : ''}`}>
          <SectionHeader
            eyebrow="The House"
            title="The House of AvantSpecs"
            description="A newly launched, boutique trade house based in Rohtak, India. We are not a manufacturer — we are a merchant exporter, which means our job is to find the right product, verify it, document it, and deliver it. Every consignment is fully documented to spec."
          />
        </div>
      </div>

      <div ref={processReveal.ref} className="container-wrap mt-16">
        <p className="eyebrow">Three steps, fully documented</p>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {processSteps.map((step, i) => (
            <ProcessCard key={step.number} {...step} index={i} />
          ))}
        </div>
      </div>

      <div ref={qualityReveal.ref} className="container-wrap mt-20">
        <div className={`reveal ${qualityReveal.visible ? 'is-visible' : ''}`}>
          <SectionHeader
            eyebrow="Quality & Testing"
            title="What every COA carries"
            description="A Certificate of Analysis is not a formality — it is the document your regulator, your lab, and your customer will reference. Every AvantSpecs COA includes:"
          />
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="grid gap-4 sm:grid-cols-2">
            {qualityPoints.map((point, i) => (
              <QualityPoint key={point} point={point} index={i} />
            ))}
          </div>
          <div className="rounded-lg bg-green p-8 text-white">
            <FlaskConical size={28} className="text-gold-light" />
            <h3 className="mt-4 text-xl text-white">Lab-verified, not label-claimed</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/80">
              We test every batch before it ships. If a lot does not meet the agreed
              specification, it does not leave our warehouse. You receive the actual lab
              report for your specific batch — not a generic spec sheet.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {certificationsTeaser.map((cert) => (
                <span key={cert} className="badge border-white/20 bg-white/5 text-white/80">
                  {cert}
                </span>
              ))}
            </div>
            <button type="button" onClick={() => navigate('trade')} className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-gold-light hover:text-gold">
              See full certifications
            </button>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <CTABand
          title="Ready to place your first enquiry?"
          description="Submit a request for quote and receive a reference number to track your enquiry. We respond within 48 hours."
          primaryLabel="Open the Order Portal"
          primaryRoute="register"
          secondaryLabel="Contact the Trade Desk"
          secondaryRoute="contact"
        />
      </div>
    </Section>
  );
}
