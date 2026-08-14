// Post-build step: generates a real static index.html per route
// (dist/register/index.html, dist/product/saffron/index.html, etc.) so
// GitHub Pages serves a genuine 200 for direct navigation to any route,
// instead of a real HTTP 404 recovered only by the public/404.html
// client-side redirect (see that file's comment for why GH Pages needs the
// redirect trick at all: no server-side rewrite support, unlike the
// .htaccess used for the GoDaddy deployment).
//
// Each generated shell only swaps <title>/meta description/canonical/OG
// tags to the correct per-route values — the app body is still the same
// client-rendered SPA bundle (no real SSR/prerendered content), and
// src/App.tsx's useDocumentHead hook re-applies the same values once React
// mounts, so this is purely about (a) a genuine 200 status instead of a
// 404-then-redirect, and (b) correct <head> metadata for crawlers that
// don't execute JS and therefore never see useDocumentHead's client-side
// update at all.
//
// NOTE: this data is intentionally duplicated (not imported) from
// src/App.tsx's `routeHead` and src/data/content.ts's `products` — this
// project has no tsx/ts-node to import .ts files from a plain Node script.
// If either source changes, update this list to match.

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const dist = path.resolve(import.meta.dirname, '../dist');

const routes = [
  {
    path: 'register',
    title: 'Product Register | AvantSpecs',
    description:
      'Browse AvantSpecs’ full product register: essential oils, oleoresins, spices, nuts, powders, and eco disposables, each with MOQ and COA availability. Filter by category or search by name or Latin binomial.',
  },
  {
    path: 'house',
    title: 'The House | AvantSpecs',
    description:
      'How AvantSpecs sources, tests, and documents every consignment — from origin procurement to lab verification to the certificate set your customs clearance needs.',
  },
  {
    path: 'about',
    title: 'About Us | AvantSpecs',
    description:
      'Meet the team behind AvantSpecs: Paramjeet Singh and Aadi Kumar Singh built AvantSpecs to connect Indian-origin botanical producers directly with international formulators and flavour houses.',
  },
  {
    path: 'trade',
    title: 'Trade & Markets | AvantSpecs',
    description:
      'The export markets AvantSpecs serves, with region-specific documentation: REACH compliance for Europe, Halaal certification for the Middle East, and more.',
  },
  {
    path: 'contact',
    title: 'Contact | AvantSpecs',
    description:
      'Get in touch with the AvantSpecs trade desk to request a quote, ask about a specification, or start a new export relationship.',
  },
];

const products = [
  {
    id: 'eucalyptus-oil',
    name: 'Eucalyptus Oil',
    description:
      'A high-cineole eucalyptus oil suited for pharmaceutical formulations, chest rubs, and antiseptic applications. Consistent 1,8-cineole content batch over batch.',
  },
  {
    id: 'clove-bud-oil',
    name: 'Clove Bud Oil',
    description:
      'Rich in eugenol, this clove bud oil is ideal for dental care products, fragrances, and flavour formulations. Sourced from hand-picked buds for superior aroma profile.',
  },
  {
    id: 'lemongrass-oil',
    name: 'Lemongrass Oil',
    description:
      'A citrusy, grassy-sweet oil with high citral content (75-85%), widely used in soaps, detergents, insect repellents, and flavour applications. Bright, clean aroma.',
  },
  {
    id: 'citronella-oil',
    name: 'Citronella Oil',
    description:
      'A classic mosquito-repellent oil with strong geraniol and citronellal content. Used in candles, topical repellents, and industrial insect-control formulations.',
  },
  {
    id: 'black-pepper-oleoresin',
    name: 'Black Pepper Oleoresin',
    description:
      'A concentrated, full-spectrum oleoresin capturing both pungency (piperine 40%) and aroma. Used in food seasoning, sauces, and nutraceutical formulations.',
  },
  {
    id: 'saffron',
    name: 'Saffron',
    description:
      'Premium all-red saffron threads with high crocin, picrocrocin, and safranal content for strong color, bitterness, and aroma. Hand-picked and sun dried for consistent grade.',
  },
  {
    id: 'cumin-seed',
    name: 'Cumin Seed',
    description:
      'Bold, earthy cumin seed cleaned and sieved to a consistent grade for whole-seed use or in-house milling. Widely used in spice blends, seasonings, and flavour applications.',
  },
  {
    id: 'areca-leaf-plates',
    name: 'Areca Leaf Plates',
    description:
      'Fully compostable tableware heat-pressed from fallen areca palm leaf sheaths, with no chemical treatment or binding agents. Sturdy, microwave-safe, and available in round and square profiles.',
  },
  {
    id: 'cashew-kernels',
    name: 'Cashew Kernels',
    description:
      'Whole cashew kernels roasted and hand-graded to standard export grades (W240/W320). Consistent size, color, and moisture content for retail packing and food manufacturing.',
  },
  {
    id: 'guar-gum-powder',
    name: 'Guar Gum Powder',
    description:
      'High-viscosity guar gum powder milled from guar split for food, textile, and industrial thickening applications. Available in multiple mesh sizes and viscosity grades.',
  },
  {
    id: 'onion-powder',
    name: 'Onion Powder',
    description:
      'Dehydrated and finely milled onion powder with strong, consistent flavour for seasoning blends, snack coatings, and ready-to-eat food manufacturing.',
  },
  {
    id: 'potato-powder',
    name: 'Potato Powder',
    description:
      'Fine dehydrated potato powder for snack manufacturing, instant food mixes, and as a binding agent. Clean, neutral flavour with low moisture content for extended shelf life.',
  },
];

function applyHead(html, { urlPath, title, description }) {
  const canonicalUrl = `https://avantspecs.com/${urlPath}`;
  return html
    .replace(/<title>.*?<\/title>/s, `<title>${title}</title>`)
    .replace(
      /<meta\s+name="description"\s+content=".*?"\s*\/>/s,
      `<meta name="description" content="${description}" />`,
    )
    .replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${canonicalUrl}" />`)
    .replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${canonicalUrl}" />`)
    .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${title}" />`)
    .replace(
      /<meta\s+property="og:description"\s+content=".*?"\s*\/>/s,
      `<meta property="og:description" content="${description}" />`,
    )
    .replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${title}" />`)
    .replace(
      /<meta\s+name="twitter:description"\s+content=".*?"\s*\/>/s,
      `<meta name="twitter:description" content="${description}" />`,
    );
}

async function writeShell(urlPath, head, template) {
  const html = applyHead(template, { urlPath, ...head });
  const outDir = path.join(dist, urlPath);
  await mkdir(outDir, { recursive: true });
  await writeFile(path.join(outDir, 'index.html'), html);
}

const template = await readFile(path.join(dist, 'index.html'), 'utf-8');

for (const route of routes) {
  await writeShell(route.path, { title: route.title, description: route.description }, template);
}

for (const product of products) {
  await writeShell(
    `product/${product.id}`,
    { title: `${product.name} | AvantSpecs`, description: product.description },
    template,
  );
}

console.log(`Generated ${routes.length + products.length} static route shells.`);
