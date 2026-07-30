/*
# Add phone and product-of-interest to contact_submissions

1. Changes
- `contact_submissions.phone` (text, optional) — buyer's phone/WhatsApp number.
- `contact_submissions.product_interest` (text, optional) — which product
  (by name) the enquiry is about, or blank for a general enquiry.
*/

ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS phone text;
ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS product_interest text;
