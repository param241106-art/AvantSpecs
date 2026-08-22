import { useMemo } from 'react';
import { ChevronLeft, ShieldCheck } from 'lucide-react';
import { Section, CTABand } from '@/components/Section';
import { Picture } from '@/components/Picture';
import { navigate, navigateToOrderPortalWithProduct, routeHref, handleRouteLinkClick } from '@/lib/router';
import { products, categoryLabels, certifications } from '@/data/content';
import { useStructuredData } from '@/lib/hooks';
import { productSchema } from '@/lib/structuredData';

type Props = {
  productId: string | null;
};

export function ProductDetailPage({ productId }: Props) {
  const product = products.find((p) => p.id === productId);

  useStructuredData(useMemo(() => (product ? productSchema(product) : null), [product]));

  if (!product) {
    return (
      <Section id="product-detail" bg="plain">
        <div className="container-tight text-center">
          <p className="eyebrow mx-auto justify-center">Product Register</p>
          <h1 className="mt-3 text-4xl leading-tight md:text-5xl">Product not found</h1>
          <span className="heading-accent mx-auto" />
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-ink-secondary">
            We could not find that product in the register. It may have been renamed or
            removed.
          </p>
          <a
            href={routeHref('register')}
            onClick={(e) => handleRouteLinkClick(e, () => navigate('register'))}
            className="btn-gold mt-8"
          >
            Browse the Register
          </a>
        </div>
      </Section>
    );
  }

  const categoryLabel = categoryLabels[product.category];
  const isExtracted = product.category === 'oils' || product.category === 'oleoresins';

  const facts: { label: string; value: string }[] = [
    { label: isExtracted ? 'Extraction Method' : 'Processing Method', value: product.extractionMethod },
    { label: 'Origin', value: product.origin },
    { label: 'MOQ', value: product.moq },
    { label: 'COA Available', value: product.coaAvailable ? 'Yes' : 'On request' },
  ];

  return (
    <Section id="product-detail" bg="plain">
      <div className="container-wrap">
        <a
          href={routeHref('register')}
          onClick={(e) => handleRouteLinkClick(e, () => navigate('register'))}
          className="btn-ghost"
        >
          <ChevronLeft size={17} /> Back to Register
        </a>

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-start">
          <div className="overflow-hidden rounded-md border border-line">
            <Picture
              src={product.photoUrl}
              alt={product.name}
              width={760}
              height={425}
              loading="eager"
              fetchPriority="high"
              className="aspect-[4/3] max-h-[280px] w-full object-cover sm:max-h-none"
            />
          </div>

          <div>
            <p className="eyebrow">{categoryLabel}</p>
            <h1 className="mt-3 text-4xl leading-tight md:text-5xl">{product.name}</h1>
            <span className="heading-accent" />
            <p className="mt-3 text-base italic text-ink-muted">{product.latinBinomial}</p>
            <p className="mt-4 text-base leading-relaxed text-ink-secondary">
              {product.description}
            </p>

            <dl className="mt-8 divide-y divide-line rounded-md border border-line bg-bg">
              {facts.map((fact) => (
                <div key={fact.label} className="grid grid-cols-3 gap-4 px-5 py-3.5">
                  <dt className="text-sm font-semibold text-ink-muted">{fact.label}</dt>
                  <dd className="col-span-2 text-sm text-ink">{fact.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 rounded-md border border-line bg-green-tint p-5">
              <p className="flex items-center gap-2 text-sm font-semibold text-green">
                <ShieldCheck size={17} /> Verified & Documented
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
                Every batch of {product.name} undergoes GC-MS constituent profiling plus
                microbial and heavy-metal panels before it ships, and{' '}
                {product.coaAvailable
                  ? 'ships with a Certificate of Analysis for that specific lot'
                  : 'is verified against the agreed specification'}
                , not a generic spec sheet.{' '}
                <a
                  href={routeHref('guide')}
                  onClick={(e) => handleRouteLinkClick(e, () => navigate('guide'))}
                  className="font-semibold text-green underline underline-offset-2 hover:text-green-mid"
                >
                  See how we test and document every consignment
                </a>
                .
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {certifications.map((cert) => (
                  <span
                    key={cert.code}
                    className="badge border-green/20 bg-white text-green"
                    title={cert.description}
                  >
                    {cert.shortLabel}
                  </span>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigateToOrderPortalWithProduct(product.id)}
              className="btn-gold mt-6"
            >
              Request a Quote for {product.name}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <CTABand
          title="Need a custom or unlisted specification?"
          description="If you need a product or spec not shown in the register, tell us what you are looking for. We source to order for qualified buyers."
          primaryLabel="Contact the Trade Desk"
          primaryRoute="contact"
          secondaryLabel="Browse the Register"
          secondaryRoute="register"
        />
      </div>
    </Section>
  );
}
