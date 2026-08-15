import { Globe, Award, FileText, Info, ShieldCheck, BadgeCheck, ClipboardCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Section, SectionHeader, CTABand } from '@/components/Section';
import { Picture } from '@/components/Picture';
import { InteractiveMap } from '@/components/sections/InteractiveMap';
import { useReveal } from '@/lib/hooks';
import { regions, shipmentDocuments, certifications } from '@/data/content';
import type { Region, ShipmentDocument, Certification } from '@/data/content';

// Distinct small icon per certification — standing in for a logo without
// reproducing any certifying body's actual trademarked/regulated mark.
const certIcons: Record<string, LucideIcon> = {
  FSSAI: ShieldCheck,
  'ISO 9001': BadgeCheck,
  'ISO 22000': ClipboardCheck,
};

function RegionCard({ region, index }: { region: Region; index: number }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`card card-glow relative overflow-hidden reveal ${visible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="aspect-[16/10] overflow-hidden">
        <Picture
          src={region.photoUrl}
          alt={`${region.name} trade region`}
          width={760}
          height={425}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-lg">{region.name}</h3>
        <p className="mt-1.5 font-mono text-xs uppercase tracking-wider text-gold">
          {region.countries.join(' · ')}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
          {region.description}
        </p>
      </div>
    </div>
  );
}

function CertCard({ cert, index }: { cert: Certification; index: number }) {
  const { ref, visible } = useReveal();
  const Icon = certIcons[cert.code] ?? Award;
  return (
    <div
      ref={ref}
      className={`card card-glow relative overflow-hidden p-6 reveal ${visible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gold-tint text-gold">
        <Icon size={22} />
      </div>
      <h3 className="mt-4 text-base">{cert.code}</h3>
      <p className="mt-2 text-xs leading-relaxed text-ink-secondary">{cert.description}</p>
    </div>
  );
}

function DocRow({ doc, index }: { doc: ShipmentDocument; index: number }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`flex items-start gap-4 rounded-md border border-line bg-surface p-5 reveal ${visible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-green-tint font-mono text-[0.65rem] font-bold text-green">
        {doc.code}
      </div>
      <div>
        <h3 className="text-sm font-semibold">{doc.name}</h3>
        <p className="mt-1 text-xs leading-relaxed text-ink-secondary">{doc.description}</p>
      </div>
    </div>
  );
}

export function MarketsSection() {
  const headerReveal = useReveal();
  const regionReveal = useReveal();
  const certReveal = useReveal();
  const docReveal = useReveal();

  return (
    <Section id="markets" bg="green">
      <div className="container-wrap">
        <div ref={headerReveal.ref} className={`reveal ${headerReveal.visible ? 'is-visible' : ''}`}>
          <SectionHeader
            eyebrow="Trade & Markets"
            title="Shipping from India to the world"
            description="Two regional desks, each with the documentation set its buyers need for customs clearance. Tell us your destination market at RFQ stage and we map the exact certificate set required."
          />
        </div>
      </div>

      <div ref={regionReveal.ref} className="container-wrap mt-12">
        <p className="eyebrow flex items-center gap-2"><Globe size={14} /> Regional Desks</p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {regions.map((region, i) => (
            <RegionCard key={region.id} region={region} index={i} />
          ))}
        </div>
      </div>

      <div className="container-wrap mt-12">
        <InteractiveMap />
      </div>

      <div ref={certReveal.ref} className="container-wrap mt-20">
        <div id="certs" className="scroll-mt-20">
          <p className="eyebrow flex items-center gap-2"><Award size={14} /> Certifications</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert, i) => (
              <CertCard key={cert.code} cert={cert} index={i} />
            ))}
          </div>
        </div>
      </div>

      <div ref={docReveal.ref} className="container-wrap mt-20">
        <p className="eyebrow flex items-center gap-2"><FileText size={14} /> Documentation Matrix</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {shipmentDocuments.map((doc, i) => (
            <DocRow key={doc.code} doc={doc} index={i} />
          ))}
        </div>

        <div className="mt-8 flex items-start gap-3 rounded-md border-l-4 border-gold bg-gold-tint p-5">
          <Info size={20} className="mt-0.5 shrink-0 text-gold" />
          <div>
            <p className="text-sm font-semibold text-ink">Compliance Note</p>
            <p className="mt-1 text-sm text-ink-secondary">
              You specify your destination market at the RFQ stage. AvantSpecs maps the exact
              certificate set your country requires, from REACH documentation for Europe to
              Halaal certification for the Middle East, and ships with that set included. No
              surprise documentation gaps at customs.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <CTABand
          title="Need a document set for your market?"
          description="Tell us your destination country and we will confirm the exact certificate set before you commit."
          primaryLabel="Request a Quote"
          primaryRoute="register"
          secondaryLabel="Ask a Question"
          secondaryRoute="contact"
        />
      </div>
    </Section>
  );
}
