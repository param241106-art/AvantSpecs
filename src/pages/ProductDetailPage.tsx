import { ChevronLeft } from 'lucide-react';
import { Section, CTABand } from '@/components/Section';
import { Picture } from '@/components/Picture';
import { navigate, navigateToOrderPortalWithProduct } from '@/lib/router';
import { products } from '@/data/content';

type Props = {
  productId: string | null;
};

export function ProductDetailPage({ productId }: Props) {
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <Section id="product-detail" bg="plain">
        <div className="container-tight text-center">
          <p className="eyebrow mx-auto justify-center">Product Register</p>
          <h2 className="mt-3 text-4xl leading-tight md:text-5xl">Product not found</h2>
          <span className="heading-accent mx-auto" />
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-ink-secondary">
            We could not find that product in the register. It may have been renamed or
            removed.
          </p>
          <button type="button" onClick={() => navigate('register')} className="btn-gold mt-8">
            Browse the Register
          </button>
        </div>
      </Section>
    );
  }

  const categoryLabel = product.category === 'oils' ? 'Essential Oil' : 'Oleoresin';

  const facts: { label: string; value: string }[] = [
    { label: 'Extraction Method', value: product.extractionMethod },
    { label: 'Origin', value: product.origin },
    { label: 'MOQ', value: product.moq },
    { label: 'COA Available', value: product.coaAvailable ? 'Yes' : 'On request' },
  ];

  return (
    <Section id="product-detail" bg="plain">
      <div className="container-wrap">
        <button type="button" onClick={() => navigate('register')} className="btn-ghost">
          <ChevronLeft size={17} /> Back to Register
        </button>

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-start">
          <div className="overflow-hidden rounded-md border border-line">
            <Picture
              src={product.photoUrl}
              alt={product.name}
              width={760}
              height={425}
              className="aspect-[4/3] w-full object-cover"
            />
          </div>

          <div>
            <p className="eyebrow">{categoryLabel}</p>
            <h2 className="mt-3 text-4xl leading-tight md:text-5xl">{product.name}</h2>
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

            <button
              type="button"
              onClick={() => navigateToOrderPortalWithProduct(product.id)}
              className="btn-gold mt-8"
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
