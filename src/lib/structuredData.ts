import type { Product, TeamMember } from '@/data/content';
import { categoryLabels } from '@/data/content';

// Single source of truth for JSON-LD @id values and the site origin, so the
// Organization graph node emitted here and the `brand`/`publisher` refs
// emitted elsewhere always resolve to the same @id.
const SITE_URL = 'https://avantspecs.com';
const ORGANIZATION_ID = `${SITE_URL}/#organization`;

/**
 * Organization + WebSite graph for the homepage only. Every field is pulled
 * from content already live elsewhere in the app (ContactSection's address/
 * email/phone, content.ts's `team`) — nothing here is invented.
 */
export function organizationSchema(team: TeamMember[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': ORGANIZATION_ID,
        name: 'AvantSpecs',
        alternateName: 'AvantSpecs — Synergistic Herbal Solutions',
        url: `${SITE_URL}/`,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/images/logo.jpg`,
          width: 512,
          height: 512,
        },
        image: `${SITE_URL}/images/logo.jpg`,
        description:
          'AvantSpecs is a merchant export house sourcing, testing, and shipping essential oils, oleoresins, spices, nuts, powders, and eco disposables to wholesale buyers, formulators, and flavour houses worldwide.',
        email: 'param@avantspecs.com',
        telephone: '+971-50-665-0173',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Rohtak',
          addressRegion: 'Haryana',
          postalCode: '124001',
          addressCountry: 'IN',
        },
        founder: team.map((member) => ({
          '@type': 'Person',
          name: member.name,
          jobTitle: member.role,
        })),
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'sales',
            email: 'param@avantspecs.com',
            telephone: '+971-50-665-0173',
            areaServed: 'Worldwide',
            availableLanguage: ['English'],
          },
          {
            '@type': 'ContactPoint',
            contactType: 'customer support',
            email: 'aadi.singh@avantspecs.com',
            areaServed: 'Worldwide',
            availableLanguage: ['English'],
          },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: 'AvantSpecs',
        description:
          'Merchant export house sourcing, testing, and shipping essential oils, oleoresins, spices, nuts, and powders to wholesale buyers worldwide.',
        publisher: { '@id': ORGANIZATION_ID },
        inLanguage: 'en',
      },
    ],
  };
}

/**
 * One Product graph per product page, generated from the same `Product`
 * record that drives the register and the product detail page — never
 * hand-authored per SKU. Pricing is quote-based and not published, so
 * `offers.priceSpecification` describes that instead of carrying a
 * fabricated price.
 */
export function productSchema(product: Product) {
  const additionalProperty = [
    { '@type': 'PropertyValue', name: 'Botanical name', value: product.latinBinomial },
    { '@type': 'PropertyValue', name: 'Processing method', value: product.extractionMethod },
    { '@type': 'PropertyValue', name: 'Origin region', value: `${product.origin}, India` },
    { '@type': 'PropertyValue', name: 'Minimum order quantity', value: product.moq },
    {
      '@type': 'PropertyValue',
      name: 'Certificate of Analysis',
      value: product.coaAvailable ? 'Available on request' : 'Not available',
    },
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    alternateName: product.latinBinomial,
    url: `${SITE_URL}/product/${product.id}`,
    image: product.photoUrl.startsWith('/') ? `${SITE_URL}${product.photoUrl}` : product.photoUrl,
    description: product.description,
    category: categoryLabels[product.category],
    brand: { '@id': ORGANIZATION_ID },
    additionalProperty,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceSpecification: {
        '@type': 'PriceSpecification',
        description: `Quote-based pricing, MOQ-gated at ${product.moq}. Contact the trade desk for a quotation.`,
      },
    },
  };
}
