export type Product = {
  id: string;
  name: string;
  // SEO-targeted phrase for this product's <title> tag and its detail
  // page's top heading (see App.tsx and ProductDetailPage.tsx). Kept
  // separate from `name` so the short name can stay the label used on
  // cards, the CTA button, and image alt text.
  seoTitle: string;
  latinBinomial: string;
  category: 'oils' | 'oleoresins' | 'spices' | 'nuts' | 'powders' | 'disposables';
  extractionMethod:
    | 'Steam Distilled'
    | 'Solvent Extracted'
    | 'Hand-Harvested & Sun Dried'
    | 'Cleaned & Sieved'
    | 'Roasted & Graded'
    | 'Milled & Sieved'
    | 'Dehydrated & Milled'
    | 'Heat-Pressed';
  origin: string;
  description: string;
  moq: string;
  coaAvailable: boolean;
  photoUrl: string;
};

export const categoryLabels: Record<Product['category'], string> = {
  oils: 'Essential Oil',
  oleoresins: 'Oleoresin',
  spices: 'Spice',
  nuts: 'Nut',
  powders: 'Powder',
  disposables: 'Eco Disposable',
};

export type Region = {
  id: string;
  name: string;
  countries: string[];
  description: string;
  photoUrl: string;
};

export type ShipmentDocument = {
  code: string;
  name: string;
  description: string;
};

export type TeamMember = {
  name: string;
  role: string;
  photoUrl: string;
  bio: string;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export const products: Product[] = [
  {
    id: 'eucalyptus-oil',
    name: 'Eucalyptus Oil',
    seoTitle: 'Eucalyptus Oil Exporter India',
    latinBinomial: 'Eucalyptus globulus',
    category: 'oils',
    extractionMethod: 'Steam Distilled',
    origin: 'Himachal Pradesh & Uttarakhand',
    description:
      'A high-cineole Eucalyptus globulus oil suited for pharmaceutical-grade formulations, chest rubs, and antiseptic applications, with consistent 1,8-cineole content batch over batch. AvantSpecs supplies it in bulk to wholesale buyers as a steam-distilled eucalyptus oil exporter based in India.',
    moq: '25 kg',
    coaAvailable: true,
    photoUrl: 'https://images.pexels.com/photos/6720282/pexels-photo-6720282.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'clove-bud-oil',
    name: 'Clove Bud Oil',
    seoTitle: 'Clove Bud Oil Exporter India',
    latinBinomial: 'Syzygium aromaticum',
    category: 'oils',
    extractionMethod: 'Steam Distilled',
    origin: 'Tamil Nadu & Karnataka',
    description:
      'Rich in eugenol, this Syzygium aromaticum clove bud oil is ideal for dental care manufacturing, fragrances, and flavour formulations, sourced from hand-picked buds for a superior aroma profile. As a clove bud oil exporter based in India, AvantSpecs is a bulk clove oil supplier serving wholesale eugenol buyers.',
    moq: '25 kg',
    coaAvailable: true,
    photoUrl: '/images/Clove_Buds.jpg',
  },
  {
    id: 'lemongrass-oil',
    name: 'Lemongrass Oil',
    seoTitle: 'Lemongrass Oil Exporter India',
    latinBinomial: 'Cymbopogon flexuosus',
    category: 'oils',
    extractionMethod: 'Steam Distilled',
    origin: 'Kerala & Assam',
    description:
      'A citrusy, grassy-sweet Cymbopogon flexuosus oil with high citral content (75-85%), widely used in soap manufacturing, detergents, insect repellents, and flavour applications, with a bright, clean aroma. AvantSpecs exports it wholesale from India as a bulk lemongrass oil supplier.',
    moq: '25 kg',
    coaAvailable: true,
    photoUrl: '/images/Lemon_Grass.jpg',
  },
  {
    id: 'citronella-oil',
    name: 'Citronella Oil',
    seoTitle: 'Citronella Oil Exporter India',
    latinBinomial: 'Cymbopogon winterianus',
    category: 'oils',
    extractionMethod: 'Steam Distilled',
    origin: 'Assam & West Bengal',
    description:
      'A classic Cymbopogon winterianus mosquito-repellent oil with strong geraniol and citronellal content, used in candles, topical repellents, and industrial insect-control formulations. AvantSpecs is a bulk citronella oil supplier, exporting wholesale citronella oil from India to candle and repellent manufacturers worldwide.',
    moq: '25 kg',
    coaAvailable: true,
    photoUrl: '/images/Citronella_Oil.jpg',
  },
  {
    id: 'black-pepper-oleoresin',
    name: 'Black Pepper Oleoresin',
    seoTitle: 'Black Pepper Oleoresin Exporter India',
    latinBinomial: 'Piper nigrum',
    category: 'oleoresins',
    extractionMethod: 'Solvent Extracted',
    origin: 'Kerala & Karnataka',
    description:
      'A concentrated, full-spectrum Piper nigrum oleoresin capturing both pungency (piperine 40%) and aroma, used in food seasoning, sauces, and nutraceutical formulations. A bulk black pepper oleoresin supplier, AvantSpecs exports wholesale piperine oleoresin from India to food and nutraceutical manufacturers.',
    moq: '10 kg',
    coaAvailable: true,
    photoUrl: '/images/Black_Pepper_Oleoresin.jpg',
  },
  {
    id: 'saffron',
    name: 'Saffron',
    seoTitle: 'Saffron Exporter India',
    latinBinomial: 'Crocus sativus',
    category: 'spices',
    extractionMethod: 'Hand-Harvested & Sun Dried',
    origin: 'Kashmir',
    description:
      'Premium all-red Crocus sativus saffron threads with high crocin, picrocrocin, and safranal content for strong color, bitterness, and aroma, hand-picked and sun dried for a consistent grade. As a saffron exporter in India, AvantSpecs supplies bulk saffron and wholesale Kashmir saffron to formulators worldwide.',
    moq: '500 g',
    coaAvailable: true,
    photoUrl: '/images/Saffron.jpg',
  },
  {
    id: 'cumin-seed',
    name: 'Cumin Seed',
    seoTitle: 'Cumin Seed Exporter India',
    latinBinomial: 'Cuminum cyminum',
    category: 'spices',
    extractionMethod: 'Cleaned & Sieved',
    origin: 'Gujarat & Rajasthan',
    description:
      'Bold, earthy Cuminum cyminum cumin seed, cleaned and sieved to a consistent grade for whole-seed use or in-house milling, widely used in spice blends, seasonings, and flavour applications. AvantSpecs exports wholesale cumin seed from India as a bulk cumin seed supplier to spice blenders worldwide.',
    moq: '25 kg',
    coaAvailable: true,
    photoUrl: '/images/Cumin.jpg',
  },
  {
    id: 'areca-leaf-plates',
    name: 'Areca Leaf Plates',
    seoTitle: 'Areca Leaf Plates Wholesale Supplier',
    latinBinomial: 'Areca catechu',
    category: 'disposables',
    extractionMethod: 'Heat-Pressed',
    origin: 'Karnataka & Kerala',
    description:
      'Fully compostable Areca catechu tableware heat-pressed from fallen areca palm leaf sheaths, with no chemical treatment or binding agents, sturdy, microwave-safe, and available in round and square profiles. AvantSpecs is an areca leaf plates wholesale supplier and bulk compostable tableware exporter, manufacturing biodegradable tableware for export from India.',
    moq: '5,000 pieces',
    coaAvailable: false,
    photoUrl: '/images/Areca_Plates.jpg',
  },
  {
    id: 'cashew-kernels',
    name: 'Cashew Kernels',
    seoTitle: 'Cashew Kernels Exporter India',
    latinBinomial: 'Anacardium occidentale',
    category: 'nuts',
    extractionMethod: 'Roasted & Graded',
    origin: 'Kerala & Goa',
    description:
      'Whole Anacardium occidentale cashew kernels, roasted and hand-graded to standard export grades (W240/W320), with consistent size, color, and moisture content for retail packing and food manufacturing. A bulk cashew kernels exporter in India, AvantSpecs supplies wholesale roasted cashew kernels to buyers worldwide.',
    moq: '25 kg',
    coaAvailable: true,
    photoUrl: '/images/Cashews.jpg',
  },
  {
    id: 'guar-gum-powder',
    name: 'Guar Gum Powder',
    seoTitle: 'Guar Gum Powder Exporter India',
    latinBinomial: 'Cyamopsis tetragonoloba',
    category: 'powders',
    extractionMethod: 'Milled & Sieved',
    origin: 'Rajasthan & Gujarat',
    description:
      'High-viscosity Cyamopsis tetragonoloba guar gum powder milled from guar split for food, textile, and industrial thickening applications, available in multiple mesh sizes and viscosity grades. AvantSpecs is a bulk guar gum powder supplier and exporter in India, supplying wholesale guar gum as a food thickener.',
    moq: '25 kg',
    coaAvailable: true,
    photoUrl: '/images/Guar_Gum.jpg',
  },
  {
    id: 'onion-powder',
    name: 'Onion Powder',
    seoTitle: 'Onion Powder Exporter India',
    latinBinomial: 'Allium cepa',
    category: 'powders',
    extractionMethod: 'Dehydrated & Milled',
    origin: 'Maharashtra & Gujarat',
    description:
      'Dehydrated and finely milled Allium cepa onion powder with strong, consistent flavour for seasoning blends, snack coatings, and ready-to-eat food manufacturing. As a bulk dehydrated onion powder supplier, AvantSpecs exports wholesale onion powder seasoning from India.',
    moq: '25 kg',
    coaAvailable: true,
    photoUrl: '/images/Onion_Powder.jpg',
  },
  {
    id: 'potato-powder',
    name: 'Potato Powder',
    seoTitle: 'Potato Powder Exporter India',
    latinBinomial: 'Solanum tuberosum',
    category: 'powders',
    extractionMethod: 'Dehydrated & Milled',
    origin: 'Uttar Pradesh & Punjab',
    description:
      'Fine dehydrated Solanum tuberosum potato powder for snack manufacturing, instant food mixes, and as a binding agent, with a clean, neutral flavour and low moisture content for extended shelf life. AvantSpecs exports wholesale potato powder from India as a bulk dehydrated potato powder supplier.',
    moq: '25 kg',
    coaAvailable: true,
    photoUrl: '/images/Potato_Powder.jpg',
  },
];

export const regions: Region[] = [
  {
    id: 'europe',
    name: 'Europe',
    countries: ['Germany', 'France', 'Netherlands', 'United Kingdom', 'Spain'],
    description:
      'REACH-compliant documentation and allergen declarations for EU importers. Serves flavour, fragrance, and cosmetic formulation houses.',
    photoUrl: '/images/Europe.jpg',
  },
  {
    id: 'middle-east',
    name: 'Middle East',
    countries: ['UAE', 'Saudi Arabia', 'Qatar', 'Oman', 'Kuwait'],
    description:
      'Halaal-certified consignments with Arabic-labelled documentation. Buyers include fragrance houses and traditional medicine manufacturers.',
    photoUrl: '/images/Middle_East.jpg',
  },
];

export const shipmentDocuments: ShipmentDocument[] = [
  { code: 'COA', name: 'Certificate of Analysis', description: 'Batch-specific lab report listing key constituents, microbial, and heavy-metal results.' },
  { code: 'TDS', name: 'Technical Data Sheet', description: 'Product specification sheet with physical, chemical, and organoleptic properties.' },
  { code: 'SDS', name: 'Safety Data Sheet', description: 'Handling, storage, and hazard information per GHS standards for safe transport.' },
  { code: 'COO', name: 'Certificate of Origin', description: 'Chamber-of-commerce-attested document confirming Indian origin of goods.' },
  { code: 'PHYTO', name: 'Phytosanitary Certificate', description: 'Plant quarantine authority certificate confirming goods are free from pests.' },
  { code: 'CIPL', name: 'Commercial Invoice & Packing List', description: 'Customs declaration with itemised quantities, values, and packaging details.' },
  { code: 'BOL', name: 'Bill of Lading', description: 'Transport document issued by the carrier serving as receipt and title of goods.' },
  { code: 'ALLERGEN', name: 'Allergen & Non-GMO Declaration', description: 'Declaration confirming absence of allergens and genetically modified organisms.' },
];

export const team: TeamMember[] = [
  {
    name: 'Paramjeet Singh',
    role: 'Chief Executive Officer',
    photoUrl: '/images/Paramjeet_Singh.jpg',
    bio: 'Paramjeet started AvantSpecs while still in college, after seeing local farmers and small distillers sell high-quality essential oils for a fraction of their real worth simply because they had no direct route to international buyers. He founded AvantSpecs to close that gap, building the testing, documentation, and trade relationships needed so Indian-origin botanicals could reach global formulators on fair terms.',
  },
  {
    name: 'Aadi Kumar Singh',
    role: 'Chief Operating Officer',
    photoUrl: '/images/Aadi_Kumar_Singh.jpg',
    bio: 'Aadi came on board as COO from the same classroom, taking ownership of the day-to-day: sourcing logistics, lab coordination, and keeping every shipment’s paperwork airtight. While Paramjeet focuses on trade relationships and growth, Aadi makes sure the operational side never becomes the reason a buyer’s order slips.',
  },
];

export const faqs: FAQItem[] = [
  {
    question: 'What is the minimum order quantity?',
    answer: 'MOQ varies by product: 25 kg for essential oils and 10 kg for oleoresins. Sample quantities under 1 kg are available on request for qualified buyers.',
  },
  {
    question: 'What are the typical shipment lead times?',
    answer: 'Lead times range from 7-10 days for air freight to 25-35 days for sea freight, depending on destination region and documentation requirements.',
  },
  {
    question: 'Do you provide samples before a bulk order?',
    answer: 'Yes. We provide 10-50 g samples with COA for qualified buyers. Sample shipping costs are borne by the buyer and credited against the first bulk order.',
  },
  {
    question: 'What documents come with each consignment?',
    answer: 'Every consignment ships with COA, TDS, SDS, Certificate of Origin, Phytosanitary Certificate, Commercial Invoice, Packing List, Bill of Lading, and Allergen/Non-GMO Declaration.',
  },
  {
    question: 'How do I request a quote?',
    answer: 'Use the Order Portal to select products, specify volume and shipping terms, and enter your company details. You will receive a reference number to track your enquiry.',
  },
];

export const volumeOptions = [
  { value: 'sample', label: 'Sample (<1 kg)' },
  { value: 'small', label: 'Small (1-25 kg)' },
  { value: 'medium', label: 'Medium (25-500 kg)' },
  { value: 'large', label: 'Large (500 kg-5 MT)' },
  { value: 'bulk', label: 'Bulk (5 MT+)' },
];

export const incotermOptions = ['EXW', 'FOB', 'CIF', 'DAP', 'DDP'];

export const stats = [
  { value: 12, suffix: '', label: 'Core SKUs in register' },
  { value: 48, suffix: 'h', label: 'Quote response window' },
  { value: 8, suffix: '', label: 'Documents per consignment' },
];

export type ChecklistItem = {
  title: string;
  description: string;
};

// Content for /guide/how-to-choose-an-essential-oil-export-partner.
// IMPORTANT: this text is hand-duplicated (not imported) into
// scripts/prerender-shells.mjs, both as static article HTML and as the
// FAQPage JSON-LD, following the same pattern already used there for
// `routes` and `products` (see that file's top comment — this Node script
// has no tsx/ts-node to import .ts files). If this content changes, update
// prerender-shells.mjs to match, word for word, or the static shell served
// to non-JS crawlers will drift from what this component renders.
export const guideChecklist: ChecklistItem[] = [
  {
    title: 'Batch-specific testing, not a generic spec sheet',
    description:
      'Ask whether they run GC-MS constituent profiling plus microbial and heavy-metal panels on every batch, and whether the COA you receive is for your actual lot or a template. AvantSpecs generates a batch-specific Certificate of Analysis before any consignment is cleared to ship.',
  },
  {
    title: 'Traceability to origin',
    description:
      'A legitimate exporter can tell you the batch number, harvest year, origin district, and extraction method and date for what you are buying, not just a product name.',
  },
  {
    title: 'Transparent MOQ and sample policy',
    description:
      'MOQ should be stated upfront (commonly 25 kg for essential oils, 10 kg for oleoresins), and a small sample with its own COA should be available before you commit to a bulk order.',
  },
  {
    title: 'Response time',
    description:
      'Time a request for quote. A well-run trade desk should confirm pricing and terms within 48 hours; a multi-week silence on a simple RFQ is a signal to look elsewhere.',
  },
  {
    title: 'Certificate coverage for your destination market',
    description:
      'The exporter should ask where you are importing to and map the exact certificate set your market requires (REACH for Europe, Halaal for the Middle East, USFDA-relevant documentation for the US) before shipment, not after your goods are held at customs.',
  },
  {
    title: 'The full document set at shipment',
    description:
      'Confirm the consignment will ship with COA, TDS, SDS, Certificate of Origin, Phytosanitary Certificate, Commercial Invoice and Packing List, Bill of Lading, and an Allergen/Non-GMO Declaration — eight documents, not just an invoice and a COA.',
  },
];

export const guideFaqs: FAQItem[] = [
  {
    question: 'What documents come with a bulk essential oil shipment from India?',
    answer:
      'A properly documented consignment ships with a Certificate of Analysis (COA), Technical Data Sheet (TDS), Safety Data Sheet (SDS), Certificate of Origin, Phytosanitary Certificate, Commercial Invoice and Packing List, Bill of Lading, and an Allergen/Non-GMO Declaration. Ask for this full set before you commit to an order, not just a COA.',
  },
  {
    question: "What's a typical MOQ for essential oils and spices from India?",
    answer:
      'Minimum order quantities vary by product: essential oils typically start around 25 kg, oleoresins around 10 kg, and high-value spices like saffron can be as low as 500 g. Reputable exporters can also send a sample under 1 kg with COA before you commit to a bulk order.',
  },
  {
    question: 'How is quality verified before an essential oil shipment leaves India?',
    answer:
      'Each batch should undergo GC-MS constituent profiling to confirm key actives, along with microbial and heavy-metal panels and organoleptic evaluation. A Certificate of Analysis is generated for that specific batch before it is cleared to ship — if a lot does not meet the agreed specification, it should not leave the warehouse.',
  },
  {
    question: 'Can I get a sample before placing a bulk order?',
    answer:
      'Yes, and you should insist on it. A legitimate exporter provides a 10-50 g sample with its own COA so you can verify quality before committing. Sample shipping costs are typically borne by the buyer and credited against the first bulk order.',
  },
  {
    question: 'How long does it take to get a quote, and how long does shipping take?',
    answer:
      'A responsive export desk should confirm pricing and terms within 48 hours of a request. Shipping lead times then run roughly 7-10 days by air freight or 25-35 days by sea freight, depending on your destination region and the documentation required for customs clearance.',
  },
  {
    question: 'What certifications should I ask for based on my destination market?',
    answer:
      'The certificate set differs by region: buyers in Europe typically need REACH-compliant documentation and allergen declarations, while buyers in the Middle East need Halaal certification and Arabic-labelled documentation; US buyers should ask about USFDA-relevant documentation. Tell your exporter your destination market at the quote stage so they can confirm the exact certificate set before you commit.',
  },
  {
    question: "What's the difference between an essential oil manufacturer and a merchant export house?",
    answer:
      'A manufacturer or distiller processes the raw material but may not handle international documentation, freight, or destination-market compliance. A merchant export house like AvantSpecs does not manufacture; it sources from origin, tests and verifies each batch, and handles the documentation and logistics needed to get a compliant shipment to your dock.',
  },
];
