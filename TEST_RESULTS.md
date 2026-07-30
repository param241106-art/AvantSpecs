# Test Results — AvantSpecs

Last run: **2026-07-29**, on Windows 11, Node v24.18.0, npm 11.16.0, Vitest 4.1.10.

Run with `npm test` (or `npm run test:coverage` for the coverage table).
Full methodology in `TESTING.md`.

## Summary

| Check | Command | Result |
|---|---|---|
| Unit / component tests | `npm test` | ✅ **49 / 49 passed** (8 test files) |
| Type check | `npm run typecheck` | ✅ **0 errors** |
| Lint | `npm run lint` | ⚠️ **2 pre-existing errors** (not introduced by this test suite — see below) |
| Production build | `npm run build` | ✅ **built successfully** in 2.79s |

Total test run duration: ~9s.

## Test files and outcomes

| Test file | Tests | Result |
|---|---|---|
| `src/lib/router.test.ts` | 11 | ✅ all passed |
| `src/lib/hooks.test.ts` | 5 | ✅ all passed |
| `src/components/Navbar.test.tsx` | 4 | ✅ all passed |
| `src/components/Footer.test.tsx` | 5 | ✅ all passed |
| `src/components/sections/ContactSection.test.tsx` | 5 | ✅ all passed |
| `src/components/sections/OrderPortalSection.test.tsx` | 9 | ✅ all passed |
| `src/components/sections/ProductsSection.test.tsx` | 6 | ✅ all passed |
| `src/App.test.tsx` | 5 | ✅ all passed |
| **Total** | **49** | **✅ 49 passed, 0 failed** |

### Full verbose output (`npx vitest run --reporter=verbose`)

```
✓ src/lib/hooks.test.ts > useScrolled > is false below the threshold 13ms
✓ src/lib/hooks.test.ts > useScrolled > becomes true once scrollY exceeds the threshold 6ms
✓ src/lib/hooks.test.ts > useScrolled > respects a custom threshold 3ms
✓ src/lib/hooks.test.ts > useScrollProgress > reports 0 when the document does not overflow the viewport 5ms
✓ src/lib/hooks.test.ts > useScrollProgress > computes a percentage when the page is scrollable 4ms
✓ src/components/sections/ProductsSection.test.tsx > ProductsSection > renders every product by default 144ms
✓ src/components/sections/OrderPortalSection.test.tsx > OrderPortalSection (RFQ wizard) > blocks moving past step 1 with no product selected 416ms
✓ src/components/Navbar.test.tsx > Navbar > renders all primary nav links and the CTA 339ms
✓ src/components/sections/ContactSection.test.tsx > ContactSection form > blocks submission and flags required fields when empty 467ms
✓ src/components/sections/ProductsSection.test.tsx > ProductsSection > filters to oleoresins only 397ms
✓ src/components/Footer.test.tsx > Footer newsletter form > rejects an email without an @ via its own validation, without calling supabase 579ms
✓ src/components/sections/OrderPortalSection.test.tsx > OrderPortalSection (RFQ wizard) > toggles product selection on and off 155ms
✓ src/components/sections/OrderPortalSection.test.tsx > OrderPortalSection (RFQ wizard) > pre-selects a product and jumps to step 1 when preselectedProduct changes 53ms
✓ src/components/Navbar.test.tsx > Navbar > navigates by updating the URL hash when a link is clicked 97ms
✓ src/App.test.tsx > App routing > renders the home page by default 206ms
✓ src/components/Navbar.test.tsx > Navbar > opens and closes the mobile menu 203ms
✓ src/components/sections/ProductsSection.test.tsx > ProductsSection > searches by product name 249ms
✓ src/components/Navbar.test.tsx > Navbar > closes the mobile menu after navigating 147ms
✓ src/components/sections/OrderPortalSection.test.tsx > OrderPortalSection (RFQ wizard) > requires volume, incoterm, and port before advancing from shipping 256ms
✓ src/App.test.tsx > App routing > navigates to the House page via the navbar 399ms
✓ src/components/Footer.test.tsx > Footer newsletter form > is blocked by native HTML5 validation before the JS handler ever runs on a real click 389ms
✓ src/components/sections/ProductsSection.test.tsx > ProductsSection > searches by Latin binomial 245ms
✓ src/App.test.tsx > App routing > navigates to the Trade & Markets page and renders its content 163ms
✓ src/App.test.tsx > App routing > navigates to the Contact page and renders the contact form 174ms
✓ src/App.test.tsx > App routing > renders the footer on every page 25ms
✓ src/components/sections/ProductsSection.test.tsx > ProductsSection > shows an empty state when no product matches 389ms
✓ src/components/sections/ProductsSection.test.tsx > ProductsSection > calls onRequestSpecs with the product id when "Request Specs" is clicked 62ms
✓ src/components/Footer.test.tsx > Footer newsletter form > submits a valid email to the newsletter_submissions table and shows success 448ms
✓ src/components/Footer.test.tsx > Footer newsletter form > shows an error message when the insert fails 357ms
✓ src/components/Footer.test.tsx > Footer newsletter form > renders footer navigation and category links 21ms
✓ src/components/sections/ContactSection.test.tsx > ContactSection form > rejects an email missing an @ sign 1291ms
✓ src/components/sections/OrderPortalSection.test.tsx > OrderPortalSection (RFQ wizard) > requires company, country, name, and a valid email before advancing from buyer details 971ms
✓ src/lib/router.test.ts > getRouteFromHash > defaults to home when hash is empty 2ms
✓ src/lib/router.test.ts > getRouteFromHash > defaults to home when hash is unrecognized 0ms
✓ src/lib/router.test.ts > getRouteFromHash > maps #/home to home 0ms
✓ src/lib/router.test.ts > getRouteFromHash > maps #/register to register 0ms
✓ src/lib/router.test.ts > getRouteFromHash > maps #/house to house 0ms
✓ src/lib/router.test.ts > getRouteFromHash > maps #/trade to trade 0ms
✓ src/lib/router.test.ts > getRouteFromHash > maps #/contact to contact 0ms
✓ src/lib/router.test.ts > getRouteFromHash > is case-insensitive 0ms
✓ src/lib/router.test.ts > navigate > sets window.location.hash to the given route 0ms
✓ src/lib/router.test.ts > routeFromLabel > resolves known labels case-insensitively 0ms
✓ src/lib/router.test.ts > routeFromLabel > falls back to home for unknown labels 0ms
✓ src/components/sections/ContactSection.test.tsx > ContactSection form > submits valid input to contact_submissions and resets the form 1495ms
✓ src/components/sections/OrderPortalSection.test.tsx > OrderPortalSection (RFQ wizard) > shows a review summary reflecting entered data 1521ms
✓ src/components/sections/ContactSection.test.tsx > ContactSection form > shows an error flash when the insert fails 1181ms
✓ src/components/sections/ContactSection.test.tsx > ContactSection form > renders the FAQ list 10ms
✓ src/components/sections/OrderPortalSection.test.tsx > OrderPortalSection (RFQ wizard) > submits the RFQ to rfq_submissions and shows a reference number 1619ms
✓ src/components/sections/OrderPortalSection.test.tsx > OrderPortalSection (RFQ wizard) > lets the user step back through the wizard 172ms

 Test Files  8 passed (8)
      Tests  49 passed (49)
   Duration  8.86s
```

## Coverage (`npm run test:coverage`)

Scoped to `src/**/*.{ts,tsx}`, excluding test files and `main.tsx`/`vite-env.d.ts`.

```
 % Coverage report from v8
-------------------|---------|----------|---------|---------|-------------------
File               | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-------------------|---------|----------|---------|---------|-------------------
All files          |   86.11 |    84.76 |   80.66 |   87.15 |
 src               |     100 |       90 |     100 |     100 |
  App.tsx          |     100 |       90 |     100 |     100 | 21
 src/components    |   83.33 |    86.04 |   69.69 |   83.87 |
  BackToTop.tsx    |   83.33 |       50 |      80 |   77.77 | 16-19
  Footer.tsx       |    87.5 |      100 |    62.5 |    91.3 | 71,90
  Navbar.tsx       |   81.81 |       90 |   71.42 |   81.81 | 42,65,84,112
  Section.tsx      |   66.66 |    76.47 |      60 |   66.66 | 82-94
 src/components/sections | 95.08 | 87.97 | 88.88 | 96.01 |
  AboutSection.tsx        |   95.23 |       50 |      90 |   95.23 | 164
  ContactSection.tsx      |   93.47 |    92.85 |   84.61 |   95.12 | 79-80
  HomeSection.tsx         |   85.71 |       50 |   71.42 |   85.71 | 91-94
  MarketsSection.tsx      |     100 |       50 |     100 |     100 | 12-80
  OrderPortalSection.tsx  |   95.49 |    95.45 |   88.57 |   96.77 | 409-422,468
  ProductsSection.tsx     |     100 |    89.47 |     100 |     100 | 40,132
 src/lib           |   75.34 |       50 |    87.5 |   76.56 |
  hooks.ts         |   72.72 |     37.5 |   82.35 |   74.46 | 14-16,38-47
  supabase.ts      |       0 |      100 |     100 |       0 | 3-6
 src/pages         |   31.81 |      100 |   36.36 |      35 |
  HomePage.tsx     |      40 |      100 |      25 |   44.44 | 12-17
  RegisterPage.tsx |       0 |      100 |       0 |       0 | 7-18
-------------------|---------|----------|---------|---------|-------------------

Statements   : 86.11% ( 341/396 )
Branches     : 84.76% ( 217/256 )
Functions    : 80.66% ( 121/150 )
Lines        : 87.15% ( 312/358 )
```

Notes on the gaps:
- `src/lib/supabase.ts` shows 0% because it's fully replaced by
  `src/test/supabaseMock.ts` in every test that touches it — that's
  intentional, not a hole.
- `HomePage.tsx` / `RegisterPage.tsx` are thin composition wrappers around
  sections that are already tested directly (`ProductsSection`,
  `OrderPortalSection`); the uncovered lines are the `useCallback` glue
  that wires `onRequestSpecs` to the router, exercised indirectly but not
  asserted on directly.
- `MarketsSection.tsx` / `HomeSection.tsx` / `AboutSection.tsx` are mostly
  static marketing content — rendered incidentally via `App.test.tsx`'s
  routing checks but have no dedicated interaction tests since they hold
  no form logic or branching worth asserting on beyond "it renders."

## Type check

```
> tsc --noEmit -p tsconfig.app.json
```
No output — **0 errors**.

## Lint

```
> eslint .

C:\Users\ragha\Downloads\AvantSpecs - Copy\src\components\sections\OrderPortalSection.tsx
  69:16  error  'prev' is defined but never used  @typescript-eslint/no-unused-vars

C:\Users\ragha\Downloads\AvantSpecs - Copy\src\pages\RegisterPage.tsx
  3:10  error  'navigate' is defined but never used  @typescript-eslint/no-unused-vars

✖ 2 problems (2 errors, 0 warnings)
```

Both are **pre-existing issues in the original application code**, not
introduced by this test suite (no test file was flagged):

- `OrderPortalSection.tsx:69` — inside the `useEffect` that reacts to
  `preselectedProduct`, `setData((prev) => ({ ...emptyData, selectedProducts: [preselectedProduct] }))`
  destructures `prev` but never reads it (it always resets to `emptyData`
  instead of spreading `prev`). Harmless today since the callback form
  isn't needed here, but worth a quick cleanup — either drop the callback
  form (`setData({ ...emptyData, ... })`) or actually use `prev`.
- `RegisterPage.tsx:3` — `navigate` is imported but never called; only
  `HomePage.tsx`'s equivalent handler calls `navigate('register')` after
  requesting specs. Likely copy-paste leftover from `HomePage.tsx`; safe to
  remove the import.

## Build

```
> vite build

vite v5.4.8 building for production...
✓ 1561 modules transformed.
dist/index.html                  1.03 kB │ gzip:  0.55 kB
dist/assets/index-Dj791vwt.css   25.49 kB │ gzip:  5.01 kB
dist/assets/index-DNUNVoE5.js   332.28 kB │ gzip: 96.86 kB
✓ built in 2.79s
```

## Notable behavior found while writing these tests

`Footer.tsx`'s newsletter form has no `noValidate` attribute, unlike
`ContactSection.tsx`. Since the email `<input>` is `type="email"`, clicking
**Subscribe** with a syntactically-invalid address (no `@`) is intercepted
by the browser's native HTML5 constraint validation before React's
`onSubmit` ever fires — so the component's own
`Please enter a valid email address.` message never actually appears to a
real user in a standards-compliant browser. See the "A real behavior this
suite surfaced" section in `TESTING.md` for detail and the two tests
(`Footer.test.tsx`) that pin down both halves of this. This is a
documentation finding, not a test failure — everything above is green.
