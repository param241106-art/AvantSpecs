import { useMemo, useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { Section, SectionHeader, CTABand } from '@/components/Section';
import { Picture } from '@/components/Picture';
import { useReveal } from '@/lib/hooks';
import { navigateToProduct } from '@/lib/router';
import { products, categoryLabels } from '@/data/content';
import type { Product } from '@/data/content';

type Filter = 'all' | Product['category'];

type Props = {
  onRequestSpecs: (productId: string) => void;
};

export function ProductsSection({ onRequestSpecs }: Props) {
  const [filter, setFilter] = useState<Filter>('all');
  const [search, setSearch] = useState('');
  const headerReveal = useReveal();

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = filter === 'all' || p.category === filter;
      const q = search.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        p.name.toLowerCase().includes(q) ||
        p.latinBinomial.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [filter, search]);

  const tabs: { value: Filter; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'oils', label: 'Essential Oils' },
    { value: 'oleoresins', label: 'Oleoresins' },
    { value: 'spices', label: 'Spices' },
    { value: 'nuts', label: 'Nuts' },
    { value: 'powders', label: 'Powders' },
    { value: 'disposables', label: 'Eco Disposables' },
  ];

  return (
    <Section id="products" bg="plain">
      <div className="container-wrap">
        <div ref={headerReveal.ref} className={`reveal ${headerReveal.visible ? 'is-visible' : ''}`}>
          <SectionHeader
            eyebrow="The Product Register"
            title="Browse available SKUs"
            description={`${products.length} core products in register. Filter by category or search by product name or Latin binomial. Click "Request Specs" on any card to start a quote.`}
          />
        </div>
      </div>

      <div className="container-wrap mt-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => setFilter(tab.value)}
                className={`rounded-sm px-4 py-2.5 text-sm font-semibold transition-colors ${
                  filter === tab.value
                    ? 'bg-green text-white'
                    : 'border border-line bg-surface text-ink-secondary hover:border-green hover:text-green'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="relative sm:w-72">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or Latin name"
              className="input-field pl-10"
              aria-label="Search products"
            />
          </div>
        </div>
      </div>

      <div className="container-wrap mt-8">
        {filtered.length === 0 ? (
          <div className="rounded-md border border-line bg-surface py-20 text-center">
            <p className="text-sm text-ink-muted">
              No products match your search. Try a different term or category.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                index={i}
                onRequestSpecs={onRequestSpecs}
              />
            ))}
          </div>
        )}
      </div>

      <div className="mt-20">
        <CTABand
          title="Need a custom or unlisted specification?"
          description="If you need a product or spec not shown in the register, tell us what you are looking for. We source to order for qualified buyers."
          primaryLabel="Make a Custom Request"
          primaryOnClick={() =>
            document.getElementById('portal-page')?.scrollIntoView({ behavior: 'smooth' })
          }
          secondaryLabel="Contact Us"
          secondaryRoute="contact"
        />
      </div>
    </Section>
  );
}

function ProductCard({
  product,
  index,
  onRequestSpecs,
}: {
  product: Product;
  index: number;
  onRequestSpecs: (id: string) => void;
}) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`card card-glow relative overflow-hidden reveal ${visible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <button
        type="button"
        onClick={() => navigateToProduct(product.id)}
        aria-label={`View details for ${product.name}`}
        className="relative block aspect-[4/3] w-full overflow-hidden border-0 bg-transparent p-0 text-left"
      >
        {product.photoUrl.startsWith('/') ? (
          <Picture
            src={product.photoUrl}
            alt={product.name}
            width={760}
            height={425}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          />
        ) : (
          <img
            src={product.photoUrl}
            alt={product.name}
            width={800}
            height={450}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          />
        )}
        <span className="badge absolute left-3 top-3 border-white/20 bg-white/90 text-green">
          {categoryLabels[product.category]}
        </span>
      </button>
      <div className="p-6">
        <p className="text-xs italic text-ink-muted">{product.latinBinomial}</p>
        <h3 className="mt-1 text-lg">{product.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
          {product.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-muted">
          <span>{product.extractionMethod}</span>
          <span>&middot;</span>
          <span>{product.origin}</span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="badge border-line bg-bg text-ink-secondary">
            MOQ: {product.moq}
          </span>
          {product.coaAvailable && (
            <span className="badge border-green/20 bg-green-tint text-green">
              COA Available
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={() => onRequestSpecs(product.id)}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-green transition-colors hover:text-gold"
        >
          Request Specs <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}
