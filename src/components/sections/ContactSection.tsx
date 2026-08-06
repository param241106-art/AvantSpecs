import { useState } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import { Section, SectionHeader } from '@/components/Section';
import { Picture } from '@/components/Picture';
import { useReveal } from '@/lib/hooks';
import { faqs, products } from '@/data/content';
import type { FAQItem as FAQItemType } from '@/data/content';
import { supabase } from '@/lib/supabase';

function FAQItem({ faq, index }: { faq: FAQItemType; index: number }) {
  const { ref, visible } = useReveal();
  return (
    <details
      ref={ref as unknown as React.RefObject<HTMLDetailsElement>}
      className={`group rounded-md border border-line bg-surface reveal ${visible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <summary className="flex cursor-pointer items-center justify-between p-5 text-sm font-semibold text-ink">
        {faq.question}
        <ChevronDown
          size={18}
          className="shrink-0 text-ink-muted transition-transform group-open:rotate-180"
        />
      </summary>
      <p className="px-5 pb-5 text-sm leading-relaxed text-ink-secondary">
        {faq.answer}
      </p>
    </details>
  );
}

export function ContactSection() {
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    country: '',
    productInterest: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [flashMsg, setFlashMsg] = useState('');
  const headerReveal = useReveal();
  const faqReveal = useReveal();

  const validate = () => {
    const newErrors: Record<string, boolean> = {};
    if (!form.name.trim()) newErrors.name = true;
    if (!form.email.trim() || !form.email.includes('@')) newErrors.email = true;
    if (!form.message.trim()) newErrors.message = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      setFlashMsg('Please fill in all required fields correctly.');
      setTimeout(() => setFlashMsg(''), 3500);
      return;
    }
    setStatus('loading');
    const { error } = await supabase.from('contact_submissions').insert({
      name: form.name,
      company: form.company,
      email: form.email,
      phone: form.phone,
      country: form.country,
      product_interest: form.productInterest,
      message: form.message,
    });
    if (error) {
      setStatus('error');
      setFlashMsg('Something went wrong. Please try again or email us directly.');
      setTimeout(() => setFlashMsg(''), 5000);
      return;
    }
    setStatus('success');
    setForm({
      name: '',
      company: '',
      email: '',
      phone: '',
      country: '',
      productInterest: '',
      message: '',
    });
    setFlashMsg('Message sent. We will respond within 48 hours.');
    setTimeout(() => {
      setFlashMsg('');
      setStatus('idle');
    }, 5000);
  };

  return (
    <Section id="contact" bg="plain">
      <div className="container-wrap">
        <div ref={headerReveal.ref} className={`reveal ${headerReveal.visible ? 'is-visible' : ''}`}>
          <SectionHeader
            eyebrow="Contact"
            title="Reach the trade desk"
            description="For questions about products, documentation, or shipping — or if you are not ready for a full RFQ. We respond within 48 hours."
          />
        </div>
      </div>

      <div className="container-wrap mt-12 grid gap-12 lg:grid-cols-2">
        <div>
          <form onSubmit={handleSubmit} className="card p-8" noValidate>
            {flashMsg && (
              <div
                role="alert"
                aria-live="assertive"
                className={`mb-6 rounded-sm border px-4 py-3 text-sm animate-flash-in ${
                  status === 'error'
                    ? 'border-rust bg-rust/5 text-rust'
                    : 'border-green bg-green-tint text-green'
                }`}
              >
                {flashMsg}
              </div>
            )}
            <p className="mb-6 text-xs text-ink-muted">
              Fields marked with <span className="text-rust">*</span> are required.
            </p>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="label-field" htmlFor="c-name">
                  Name <span className="text-rust">*</span>
                </label>
                <input
                  id="c-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={`input-field ${errors.name ? 'input-field-error' : ''}`}
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="label-field" htmlFor="c-company">
                  Company
                </label>
                <input
                  id="c-company"
                  type="text"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="input-field"
                  placeholder="Company name"
                />
              </div>
              <div>
                <label className="label-field" htmlFor="c-email">
                  Email <span className="text-rust">*</span>
                </label>
                <input
                  id="c-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={`input-field ${errors.email ? 'input-field-error' : ''}`}
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label className="label-field" htmlFor="c-country">
                  Country
                </label>
                <input
                  id="c-country"
                  type="text"
                  value={form.country}
                  onChange={(e) => setForm({ ...form, country: e.target.value })}
                  className="input-field"
                  placeholder="Destination country"
                />
              </div>
              <div>
                <label className="label-field" htmlFor="c-phone">
                  Phone / WhatsApp
                </label>
                <input
                  id="c-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="input-field"
                  placeholder="+1 555 000 0000"
                />
              </div>
              <div>
                <label className="label-field" htmlFor="c-product">
                  Product of Interest
                </label>
                <select
                  id="c-product"
                  value={form.productInterest}
                  onChange={(e) => setForm({ ...form, productInterest: e.target.value })}
                  className="input-field"
                >
                  <option value="">General enquiry</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.name}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-5">
              <label className="label-field" htmlFor="c-message">
                Message <span className="text-rust">*</span>
              </label>
              <textarea
                id="c-message"
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={`input-field resize-none ${errors.message ? 'input-field-error' : ''}`}
                placeholder="Tell us what you need — product, volume, destination, or any question."
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-gold mt-6 w-full sm:w-auto"
            >
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        <div>
          <div className="overflow-hidden rounded-md border border-line">
            <Picture
              src="/images/Rohtak.jpg"
              alt="AvantSpecs office in Rohtak, India"
              width={1024}
              height={512}
              className="h-64 w-full object-cover"
            />
            <div className="bg-surface p-6">
              <p className="flex items-center gap-2 text-sm font-semibold text-ink">
                <MapPin size={16} className="text-gold" /> AvantSpecs
              </p>
              <p className="mt-1 text-sm text-ink-secondary">Rohtak, India 124001</p>
              <p className="mt-3 text-sm text-ink-muted">
                param@avantspecs.com &middot; aadi.singh@avantspecs.com &middot; +971 50 665 0173
              </p>
            </div>
          </div>

          <div ref={faqReveal.ref} className="mt-8">
            <p className="eyebrow">Common Questions</p>
            <div className="mt-4 space-y-3">
              {faqs.map((faq, i) => (
                <FAQItem key={i} faq={faq} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
