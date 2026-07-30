export type Product = {
  id: string;
  name: string;
  latinBinomial: string;
  category: 'oils' | 'oleoresins';
  extractionMethod: 'Steam Distilled' | 'Solvent Extracted';
  origin: string;
  description: string;
  moq: string;
  coaAvailable: boolean;
  photoUrl: string;
};

export type Region = {
  id: string;
  name: string;
  countries: string[];
  description: string;
  photoUrl: string;
};

export type Certification = {
  code: string;
  shortLabel: string;
  description: string;
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
];

export const regions: Region[] = [
  {
    id: 'north-america',
    name: 'North America',
    countries: ['United States', 'Canada', 'Mexico'],
    description:
      'USFDA-registered facility documentation and full COA/SDS sets for customs clearance. Buyers include supplement manufacturers and personal-care brands.',
    photoUrl: '/images/North_America.jpg',
  },
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
  {
    id: 'asia-pacific',
    name: 'Asia Pacific',
    countries: ['Australia', 'Singapore', 'Japan', 'South Korea', 'Malaysia'],
    description:
      'Phytosanitary certificates and origin documentation for APAC quarantine requirements. Serves food, beverage, and personal-care manufacturers.',
    photoUrl: '/images/Asia_Pacific.jpg',
  },
  {
    id: 'latin-america',
    name: 'Latin America',
    countries: ['Brazil', 'Argentina', 'Chile', 'Colombia', 'Peru'],
    description:
      'Bilingual documentation (English/Spanish) and full traceability dossiers. Buyers include flavour houses and natural-product formulators.',
    photoUrl: '/images/Latin_America.jpg',
  },
];

export const certifications: Certification[] = [
  { code: 'FSSAI', shortLabel: 'FSSAI', description: 'Food Safety and Standards Authority of India registration for food-grade handling.' },
  { code: 'ISO 9001:2015', shortLabel: 'ISO 9001', description: 'Quality management system certification covering sourcing and export operations.' },
  { code: 'ISO 22000:2018', shortLabel: 'ISO 22000', description: 'Food safety management system for handling edible-grade oils and oleoresins.' },
  { code: 'HACCP', shortLabel: 'HACCP', description: 'Hazard analysis and critical control points certification for safe food handling.' },
  { code: 'GMP', shortLabel: 'GMP', description: 'Good Manufacturing Practice compliance for production and packaging facilities.' },
  { code: 'USFDA', shortLabel: 'USFDA', description: 'US Food and Drug Administration facility registration for shipments to the United States.' },
  { code: 'Kosher', shortLabel: 'Kosher', description: 'Kosher certification confirming compliance with Jewish dietary law requirements.' },
  { code: 'Halaal', shortLabel: 'Halaal', description: 'Halaal certification confirming compliance with Islamic dietary requirements.' },
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
    bio: 'A visionary leader guiding AvantSpecs’ direction and growth.',
  },
  {
    name: 'Aadi Kumar Singh',
    role: 'Chief Operating Officer',
    photoUrl: '/images/Aadi_Kumar_Singh.jpg',
    bio: 'A visionary operator keeping every shipment precise and on track.',
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
  { value: 5, suffix: '', label: 'Core SKUs in register' },
  { value: 48, suffix: 'h', label: 'Quote response window' },
  { value: 8, suffix: '', label: 'Documents per consignment' },
  { value: 5, suffix: '', label: 'Regional desks worldwide' },
];
