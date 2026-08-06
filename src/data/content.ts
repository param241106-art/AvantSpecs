export type Product = {
  id: string;
  name: string;
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
    latinBinomial: 'Eucalyptus globulus',
    category: 'oils',
    extractionMethod: 'Steam Distilled',
    origin: 'Himachal Pradesh & Uttarakhand',
    description:
      'A high-cineole eucalyptus oil suited for pharmaceutical formulations, chest rubs, and antiseptic applications. Consistent 1,8-cineole content batch over batch.',
    moq: '25 kg',
    coaAvailable: true,
    photoUrl: 'https://images.pexels.com/photos/6720282/pexels-photo-6720282.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'clove-bud-oil',
    name: 'Clove Bud Oil',
    latinBinomial: 'Syzygium aromaticum',
    category: 'oils',
    extractionMethod: 'Steam Distilled',
    origin: 'Tamil Nadu & Karnataka',
    description:
      'Rich in eugenol, this clove bud oil is ideal for dental care products, fragrances, and flavour formulations. Sourced from hand-picked buds for superior aroma profile.',
    moq: '25 kg',
    coaAvailable: true,
    photoUrl: '/images/Clove_Buds.jpg',
  },
  {
    id: 'lemongrass-oil',
    name: 'Lemongrass Oil',
    latinBinomial: 'Cymbopogon flexuosus',
    category: 'oils',
    extractionMethod: 'Steam Distilled',
    origin: 'Kerala & Assam',
    description:
      'A citrusy, grassy-sweet oil with high citral content (75-85%), widely used in soaps, detergents, insect repellents, and flavour applications. Bright, clean aroma.',
    moq: '25 kg',
    coaAvailable: true,
    photoUrl: '/images/Lemon_Grass.jpg',
  },
  {
    id: 'citronella-oil',
    name: 'Citronella Oil',
    latinBinomial: 'Cymbopogon winterianus',
    category: 'oils',
    extractionMethod: 'Steam Distilled',
    origin: 'Assam & West Bengal',
    description:
      'A classic mosquito-repellent oil with strong geraniol and citronellal content. Used in candles, topical repellents, and industrial insect-control formulations.',
    moq: '25 kg',
    coaAvailable: true,
    photoUrl: '/images/Citronella_Oil.jpg',
  },
  {
    id: 'black-pepper-oleoresin',
    name: 'Black Pepper Oleoresin',
    latinBinomial: 'Piper nigrum',
    category: 'oleoresins',
    extractionMethod: 'Solvent Extracted',
    origin: 'Kerala & Karnataka',
    description:
      'A concentrated, full-spectrum oleoresin capturing both pungency (piperine 40%) and aroma. Used in food seasoning, sauces, and nutraceutical formulations.',
    moq: '10 kg',
    coaAvailable: true,
    photoUrl: '/images/Black_Pepper_Oleoresin.jpg',
  },
  {
    id: 'saffron',
    name: 'Saffron',
    latinBinomial: 'Crocus sativus',
    category: 'spices',
    extractionMethod: 'Hand-Harvested & Sun Dried',
    origin: 'Kashmir',
    description:
      'Premium all-red saffron threads with high crocin, picrocrocin, and safranal content for strong color, bitterness, and aroma. Hand-picked and sun dried for consistent grade.',
    moq: '500 g',
    coaAvailable: true,
    photoUrl: '/images/Saffron.jpg',
  },
  {
    id: 'cumin-seed',
    name: 'Cumin Seed',
    latinBinomial: 'Cuminum cyminum',
    category: 'spices',
    extractionMethod: 'Cleaned & Sieved',
    origin: 'Gujarat & Rajasthan',
    description:
      'Bold, earthy cumin seed cleaned and sieved to a consistent grade for whole-seed use or in-house milling. Widely used in spice blends, seasonings, and flavour applications.',
    moq: '25 kg',
    coaAvailable: true,
    photoUrl: '/images/Cumin.jpg',
  },
  {
    id: 'areca-leaf-plates',
    name: 'Areca Leaf Plates',
    latinBinomial: 'Areca catechu',
    category: 'disposables',
    extractionMethod: 'Heat-Pressed',
    origin: 'Karnataka & Kerala',
    description:
      'Fully compostable tableware heat-pressed from fallen areca palm leaf sheaths, with no chemical treatment or binding agents. Sturdy, microwave-safe, and available in round and square profiles.',
    moq: '5,000 pieces',
    coaAvailable: false,
    photoUrl: '/images/Areca_Plates.jpg',
  },
  {
    id: 'cashew-kernels',
    name: 'Cashew Kernels',
    latinBinomial: 'Anacardium occidentale',
    category: 'nuts',
    extractionMethod: 'Roasted & Graded',
    origin: 'Kerala & Goa',
    description:
      'Whole cashew kernels roasted and hand-graded to standard export grades (W240/W320). Consistent size, color, and moisture content for retail packing and food manufacturing.',
    moq: '25 kg',
    coaAvailable: true,
    photoUrl: '/images/Cashews.jpg',
  },
  {
    id: 'guar-gum-powder',
    name: 'Guar Gum Powder',
    latinBinomial: 'Cyamopsis tetragonoloba',
    category: 'powders',
    extractionMethod: 'Milled & Sieved',
    origin: 'Rajasthan & Gujarat',
    description:
      'High-viscosity guar gum powder milled from guar split for food, textile, and industrial thickening applications. Available in multiple mesh sizes and viscosity grades.',
    moq: '25 kg',
    coaAvailable: true,
    photoUrl: '/images/Guar_Gum.jpg',
  },
  {
    id: 'onion-powder',
    name: 'Onion Powder',
    latinBinomial: 'Allium cepa',
    category: 'powders',
    extractionMethod: 'Dehydrated & Milled',
    origin: 'Maharashtra & Gujarat',
    description:
      'Dehydrated and finely milled onion powder with strong, consistent flavour for seasoning blends, snack coatings, and ready-to-eat food manufacturing.',
    moq: '25 kg',
    coaAvailable: true,
    photoUrl: '/images/Onion_Powder.jpg',
  },
  {
    id: 'potato-powder',
    name: 'Potato Powder',
    latinBinomial: 'Solanum tuberosum',
    category: 'powders',
    extractionMethod: 'Dehydrated & Milled',
    origin: 'Uttar Pradesh & Punjab',
    description:
      'Fine dehydrated potato powder for snack manufacturing, instant food mixes, and as a binding agent. Clean, neutral flavour with low moisture content for extended shelf life.',
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
    bio: 'Paramjeet started AvantSpecs while still in college, after seeing local farmers and small distillers sell high-quality essential oils for a fraction of their real worth simply because they had no direct route to international buyers. He founded AvantSpecs to close that gap — building the testing, documentation, and trade relationships needed so Indian-origin botanicals could reach global formulators on fair terms.',
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
