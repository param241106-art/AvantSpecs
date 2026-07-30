/*
# Create AvantSpecs lead-capture tables (single-tenant, no auth)

1. New Tables
- `rfq_submissions` — stores Order Portal (Request for Quote) submissions.
  Columns: id, reference, products (text[]), volume, incoterm, port,
  company, country, contact_name, email, phone, notes, created_at.
- `contact_submissions` — stores contact form submissions.
  Columns: id, name, company, email, country, message, created_at.
- `newsletter_submissions` — stores newsletter signup emails.
  Columns: id, email, created_at.

2. Security
- RLS enabled on all three tables.
- All tables allow anon + authenticated INSERT (public form submissions)
  and SELECT is locked to no role (only the service-role key can read).
  This prevents public reads of stored leads while letting the anon-key
  frontend write new submissions.
- UPDATE and DELETE are denied for anon/authenticated (no policies created).
*/

CREATE TABLE IF NOT EXISTS rfq_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference text NOT NULL,
  products text[] NOT NULL DEFAULT '{}',
  volume text,
  incoterm text,
  port text,
  company text,
  country text,
  contact_name text,
  email text,
  phone text,
  notes text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE rfq_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_rfq" ON rfq_submissions;
CREATE POLICY "anon_insert_rfq"
ON rfq_submissions FOR INSERT
TO anon, authenticated WITH CHECK (true);

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  company text,
  email text NOT NULL,
  country text,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_contact" ON contact_submissions;
CREATE POLICY "anon_insert_contact"
ON contact_submissions FOR INSERT
TO anon, authenticated WITH CHECK (true);

CREATE TABLE IF NOT EXISTS newsletter_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE newsletter_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_newsletter" ON newsletter_submissions;
CREATE POLICY "anon_insert_newsletter"
ON newsletter_submissions FOR INSERT
TO anon, authenticated WITH CHECK (true);
