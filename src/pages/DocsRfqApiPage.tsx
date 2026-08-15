import { Section, CTABand } from '@/components/Section';

const CURL_EXAMPLE = `curl -X POST 'https://wkpnnmjjkicsplvwcebk.supabase.co/rest/v1/rfq_submissions' \\
  -H "apikey: <SUPABASE_ANON_KEY>" \\
  -H "Authorization: Bearer <SUPABASE_ANON_KEY>" \\
  -H "Content-Type: application/json" \\
  -H "Prefer: return=minimal" \\
  -d '{
    "reference": "AVS-2026-7K2QX",
    "products": ["saffron", "cumin-seed"],
    "volume": "500-1000kg",
    "incoterm": "FOB",
    "port": "Nhava Sheva",
    "company": "Example Formulators Ltd",
    "country": "Germany",
    "contact_name": "Jane Buyer",
    "email": "jane@example-formulators.example",
    "phone": "+49 30 1234567",
    "notes": "Need COA and TDS with the first shipment."
  }'`;

const fields: { name: string; type: string; description: string }[] = [
  { name: 'reference', type: 'string (required)', description: 'Client-generated reference code, format AVS-<year>-<5 alphanumeric chars>.' },
  { name: 'products', type: 'string[]', description: 'Product IDs from the register (see /register), e.g. "saffron", "cumin-seed".' },
  { name: 'volume', type: 'string', description: 'Requested order volume range.' },
  { name: 'incoterm', type: 'string', description: 'Requested Incoterm, e.g. FOB, CIF, EXW.' },
  { name: 'port', type: 'string', description: 'Destination or loading port.' },
  { name: 'company', type: 'string', description: 'Buyer company name.' },
  { name: 'country', type: 'string', description: 'Buyer country.' },
  { name: 'contact_name', type: 'string', description: 'Buyer contact name.' },
  { name: 'email', type: 'string', description: 'Buyer contact email.' },
  { name: 'phone', type: 'string', description: 'Buyer contact phone / WhatsApp number.' },
  { name: 'notes', type: 'string', description: 'Free-text notes on the enquiry.' },
];

export function DocsRfqApiPage() {
  return (
    <Section id="docs-rfq-api" bg="plain">
      <div className="container-tight">
        <p className="eyebrow">API Reference</p>
        <h1 className="mt-3 text-4xl leading-tight md:text-5xl">RFQ Submission API</h1>
        <span className="heading-accent" />
        <p className="mt-4 text-base leading-relaxed text-ink-secondary">
          This is the same endpoint the AvantSpecs Order Portal calls when a buyer submits a
          Request for Quote. It accepts a single public write operation — creating a new RFQ
          record — and nothing else. Row Level Security on the underlying table grants the
          public anon key INSERT-only access: there is no public read, update, or delete
          endpoint for submitted data.
        </p>
        <p className="mt-4 text-base leading-relaxed text-ink-secondary">
          The full machine-readable definition is published as an OpenAPI 3.0 document at{' '}
          <a href="/openapi/rfq-submissions.json" className="text-green underline underline-offset-2">
            /openapi/rfq-submissions.json
          </a>
          .
        </p>
      </div>

      <div className="container-wrap mt-16">
        <div className="container-tight">
          <p className="eyebrow">Endpoint</p>
          <h2 className="mt-3 text-3xl leading-tight md:text-4xl">POST /rest/v1/rfq_submissions</h2>
          <span className="heading-accent" />
          <p className="mt-4 text-base leading-relaxed text-ink-secondary">
            Base URL: <code className="text-sm">https://wkpnnmjjkicsplvwcebk.supabase.co/rest/v1</code>
          </p>
        </div>

        <div className="container-tight mt-8">
          <h3 className="text-sm font-semibold text-ink">Required headers</h3>
          <dl className="mt-4 divide-y divide-line rounded-md border border-line bg-bg">
            <div className="grid grid-cols-3 gap-4 px-5 py-3.5">
              <dt className="text-sm font-semibold text-ink-muted">apikey</dt>
              <dd className="col-span-2 text-sm text-ink">
                Supabase project anon key. Public by design; access is limited entirely by RLS.
              </dd>
            </div>
            <div className="grid grid-cols-3 gap-4 px-5 py-3.5">
              <dt className="text-sm font-semibold text-ink-muted">Authorization</dt>
              <dd className="col-span-2 text-sm text-ink">Bearer &lt;same anon key&gt;</dd>
            </div>
            <div className="grid grid-cols-3 gap-4 px-5 py-3.5">
              <dt className="text-sm font-semibold text-ink-muted">Content-Type</dt>
              <dd className="col-span-2 text-sm text-ink">application/json</dd>
            </div>
            <div className="grid grid-cols-3 gap-4 px-5 py-3.5">
              <dt className="text-sm font-semibold text-ink-muted">Prefer</dt>
              <dd className="col-span-2 text-sm text-ink">
                return=minimal (default) or return=representation to get the created row back.
              </dd>
            </div>
          </dl>
        </div>

        <div className="container-tight mt-8">
          <h3 className="text-sm font-semibold text-ink">Request body fields</h3>
          <dl className="mt-4 divide-y divide-line rounded-md border border-line bg-bg">
            {fields.map((field) => (
              <div key={field.name} className="grid grid-cols-3 gap-4 px-5 py-3.5">
                <dt className="text-sm font-semibold text-ink-muted">
                  {field.name}
                  <span className="block text-xs font-normal text-ink-muted/70">{field.type}</span>
                </dt>
                <dd className="col-span-2 text-sm text-ink">{field.description}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="container-tight mt-8">
          <h3 className="text-sm font-semibold text-ink">Example request</h3>
          <pre className="mt-4 overflow-x-auto rounded-md border border-line bg-ink p-5 text-xs leading-relaxed text-white">
            <code>{CURL_EXAMPLE}</code>
          </pre>
        </div>

        <div className="container-tight mt-8">
          <h3 className="text-sm font-semibold text-ink">Responses</h3>
          <dl className="mt-4 divide-y divide-line rounded-md border border-line bg-bg">
            <div className="grid grid-cols-3 gap-4 px-5 py-3.5">
              <dt className="text-sm font-semibold text-ink-muted">201 Created</dt>
              <dd className="col-span-2 text-sm text-ink">
                Submission stored. Body is empty unless Prefer: return=representation was sent.
              </dd>
            </div>
            <div className="grid grid-cols-3 gap-4 px-5 py-3.5">
              <dt className="text-sm font-semibold text-ink-muted">400 Bad Request</dt>
              <dd className="col-span-2 text-sm text-ink">Malformed request body.</dd>
            </div>
            <div className="grid grid-cols-3 gap-4 px-5 py-3.5">
              <dt className="text-sm font-semibold text-ink-muted">401 Unauthorized</dt>
              <dd className="col-span-2 text-sm text-ink">Missing or invalid apikey / Authorization header.</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="mt-20">
        <CTABand
          title="Prefer to talk to a person instead?"
          description="The Order Portal on the Product Register submits to this same endpoint through a guided form — no API client required."
          primaryLabel="Open the Order Portal"
          primaryRoute="register"
          secondaryLabel="Contact the Trade Desk"
          secondaryRoute="contact"
        />
      </div>
    </Section>
  );
}
