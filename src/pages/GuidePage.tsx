import { useMemo } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Section, CTABand } from '@/components/Section';
import { useStructuredData } from '@/lib/hooks';
import { faqPageSchema } from '@/lib/structuredData';
import { guideChecklist, guideFaqs, shipmentDocuments } from '@/data/content';

export function GuidePage() {
  useStructuredData(useMemo(() => faqPageSchema(guideFaqs), []));

  return (
    <Section id="guide" bg="plain">
      <div className="container-tight">
        <p className="eyebrow">Buyer's Guide</p>
        <h1 className="mt-3 text-4xl leading-tight md:text-5xl">
          How to Choose an Essential Oil Export Partner in India
        </h1>
        <span className="heading-accent" />

        <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-secondary">
          <p>
            Sourcing essential oils, oleoresins, or spices directly from India can cut out
            several layers of markup and get you closer to origin quality, but it also means
            trusting a supplier you may never visit in person, thousands of miles from your
            own quality team. If you are a formulator, distributor, or buyer outside India
            evaluating export partners, the real question is not which supplier has the
            nicest catalog. It is which supplier can actually document what they are
            selling you.
          </p>
          <p>
            This guide covers what documentation a legitimate exporter should provide, a
            checklist for vetting a prospective export partner, and answers to the questions
            buyers most often ask before placing a first order.
          </p>
        </div>
      </div>

      <div className="container-wrap mt-16">
        <div className="container-tight">
          <p className="eyebrow">What to Expect</p>
          <h2 className="mt-3 text-3xl leading-tight md:text-4xl">
            What documentation should a legitimate exporter provide?
          </h2>
          <span className="heading-accent" />
          <p className="mt-4 text-base leading-relaxed text-ink-secondary">
            Every consignment should ship with a full document set, not just an invoice and a
            certificate of analysis. Each document below serves a specific purpose in customs
            clearance, regulatory compliance, or quality verification:
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {shipmentDocuments.map((doc) => (
            <div
              key={doc.code}
              className="flex items-start gap-4 rounded-md border border-line bg-surface p-5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-green-tint font-mono text-[0.65rem] font-bold text-green">
                {doc.code}
              </div>
              <div>
                <h3 className="text-sm font-semibold">{doc.name}</h3>
                <p className="mt-1 text-xs leading-relaxed text-ink-secondary">
                  {doc.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="container-tight mt-8">
          <p className="text-base leading-relaxed text-ink-secondary">
            Beyond that base set, quality should be lab-verified rather than label-claimed:
            GC-MS constituent profiling, plus microbial and heavy-metal panels, run on every
            batch before it ships. A Certificate of Analysis that lists a batch number,
            harvest year, origin district, and extraction date is a signal the exporter is
            actually testing what they sell, not repeating a generic spec sheet.
          </p>
        </div>
      </div>

      <div className="container-wrap mt-20">
        <div className="container-tight">
          <p className="eyebrow">The Checklist</p>
          <h2 className="mt-3 text-3xl leading-tight md:text-4xl">
            A framework for vetting an export partner
          </h2>
          <span className="heading-accent" />
          <p className="mt-4 text-base leading-relaxed text-ink-secondary">
            Six things to confirm before you commit to a bulk order:
          </p>
        </div>

        <ol className="mt-8 space-y-4">
          {guideChecklist.map((item, i) => (
            <li
              key={item.title}
              className="flex items-start gap-4 rounded-md border border-line bg-surface p-5"
            >
              <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-green" />
              <div>
                <h3 className="text-sm font-semibold text-ink">
                  {i + 1}. {item.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-secondary">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="container-wrap mt-20">
        <div className="container-tight">
          <p className="eyebrow">FAQ</p>
          <h2 className="mt-3 text-3xl leading-tight md:text-4xl">
            Common questions from first-time buyers
          </h2>
          <span className="heading-accent" />
        </div>

        <div className="container-tight mt-8 space-y-6">
          {guideFaqs.map((item) => (
            <div key={item.question} className="border-b border-line pb-6">
              <h3 className="text-base font-semibold text-ink">{item.question}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20">
        <CTABand
          title="Ready to vet AvantSpecs against this checklist?"
          description="Request a quote through the Order Portal and see the document set, testing standards, and response time for yourself."
          primaryLabel="Request a Quote"
          primaryRoute="register"
          secondaryLabel="Contact the Trade Desk"
          secondaryRoute="contact"
        />
      </div>
    </Section>
  );
}
