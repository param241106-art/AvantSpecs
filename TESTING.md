# Testing Guide — AvantSpecs

AvantSpecs is a Vite + React 18 + TypeScript single-page marketing/trade site
with hash-based client-side routing (`src/lib/router.ts`) and three
Supabase-backed lead-capture forms: the newsletter signup (`Footer.tsx`), the
contact form (`ContactSection.tsx`), and the multi-step RFQ "Order Portal"
(`OrderPortalSection.tsx`).

No test framework existed in the project before this change. This document
describes the test framework that was added, what it covers, and how to run
it. See `TEST_RESULTS.md` for the actual output of the last run.

## Stack

- **Vitest** (test runner, config lives in `vite.config.ts` under the `test` key)
- **jsdom** (DOM environment)
- **@testing-library/react** + **@testing-library/user-event** (render components, simulate real user interaction)
- **@testing-library/jest-dom** (DOM matchers like `toBeInTheDocument`, `toHaveClass`)
- **@vitest/coverage-v8** (coverage reporting)

Setup file: `src/test/setup.ts` — imports jest-dom matchers, and stubs
`IntersectionObserver`, `window.matchMedia`, and `window.scrollTo`, none of
which exist in jsdom but which the app's scroll/reveal hooks and "back to
top" button depend on.

Supabase mock: `src/test/supabaseMock.ts` — a `createSupabaseMock()` factory
returning a `{ from, insert }` pair of `vi.fn()`s. Every test file that
renders a component touching `@/lib/supabase` calls `vi.mock('@/lib/supabase', ...)`
to swap in this mock, so **no test ever makes a real network call to the
live Supabase project** referenced in `.env`.

## Running the tests

```bash
npm install       # first time only — installs the new devDependencies
npm test          # runs the full suite once (vitest run)
npm run test:watch      # watch mode for development
npm run test:coverage   # runs once and prints a coverage table
```

Also useful while working on this codebase:

```bash
npm run typecheck   # tsc --noEmit
npm run lint         # eslint .
npm run build        # production build (vite build)
npm run dev           # local dev server
```

## What's covered

| File | Focus |
|---|---|
| `src/lib/router.test.ts` | Hash → route mapping, `navigate()`, `routeFromLabel()`, case-insensitivity, unknown-route fallback to `home` |
| `src/lib/hooks.test.ts` | `useScrolled` (threshold behavior), `useScrollProgress` (0% when page doesn't overflow, correct % when it does) |
| `src/components/Navbar.test.tsx` | Renders nav links + CTA, clicking a link updates the URL hash, mobile menu open/close, mobile menu auto-closes after navigating |
| `src/components/Footer.test.tsx` | Newsletter form: rejects invalid email via the component's own JS validation, is *also* blocked by native HTML5 `type="email"` validation on a real click (see finding below), successful submit inserts into `newsletter_submissions` and resets the field, error path when Supabase returns an error |
| `src/components/sections/ContactSection.test.tsx` | Required-field validation (name/email/message), rejects an email with no `@`, successful submit inserts into `contact_submissions` and resets the form, error path when Supabase returns an error, FAQ list renders |
| `src/components/sections/OrderPortalSection.test.tsx` | Full 5-step RFQ wizard: blocked with no product selected, product toggle on/off, `preselectedProduct`/`resetSignal` prop-driven pre-selection, step-2 (shipping) required-field validation, step-3 (buyer) required-field + email validation, review-step summary reflects entered data, successful submit inserts into `rfq_submissions` and shows an `AVS-YYYY-XXXXX` reference, Back button navigation |
| `src/components/sections/ProductsSection.test.tsx` | Renders all products by default, category filter (oils/oleoresins), search by name, search by Latin binomial, empty-state message, "Request Specs" callback fires with the right product id |
| `src/App.test.tsx` | Integration: default route is Home, navbar navigation updates the hash and swaps in the right page content (House, Trade, Contact), Footer renders on every route |

Deliberately **not** covered (would need a real browser / Supabase project
or add little value relative to effort):

- Visual/animation behavior (`reveal`/`is-visible` CSS transitions, count-up
  easing curve in `useCountUp`, scroll-progress bar width)
- Actual network behavior against the live Supabase project (RLS policies,
  real inserts) — the SQL migration in `supabase/migrations/` defines the
  expected schema and policies but isn't exercised by this suite
- Cross-browser/real-device testing, responsive layout, accessibility audit
  (axe), Lighthouse/performance

## A real behavior this suite surfaced

`Footer.tsx`'s newsletter `<form>` has no `noValidate`, while
`ContactSection.tsx`'s form does. Because the newsletter input is
`type="email"`, a real click on **Subscribe** with a value that fails the
browser's native email constraint validation (e.g. `not-an-email`, missing
`@`) is blocked by the browser *before* React's `onSubmit` handler ever
runs. That means the component's own `if (!email.includes('@'))` branch and
its "Please enter a valid email address." message are effectively
unreachable through normal keyboard/mouse use in a standards-compliant
browser — only email strings that already satisfy the native email format
can reach that code, and any such string necessarily contains `@` already.
This is not a test bug: `Footer.test.tsx` has two tests that pin down both
halves of this — one dispatches the `submit` event directly to prove the
JS branch works in isolation, the other clicks the real button to prove the
native browser validation intercepts it first. Consider adding `noValidate`
to the newsletter form (matching the contact form) if the intent is for the
custom error copy to actually display.

## Adding new tests

- Co-locate test files next to the source file as `*.test.ts(x)`.
- If a component imports `@/lib/supabase`, mock it with
  `createSupabaseMock()` from `src/test/supabaseMock.ts` — never let a test
  hit the real Supabase project.
- Prefer `@testing-library/user-event` over `fireEvent` for anything a real
  user would do (typing, clicking); reach for `fireEvent` only when you
  need to bypass browser behavior on purpose (see the Footer native-validation
  case above).
