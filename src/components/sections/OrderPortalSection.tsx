import { useEffect, useState } from 'react';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Package,
  Ship,
  User,
  ClipboardList,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { Section } from '@/components/Section';
import { useReveal } from '@/lib/hooks';
import { products, volumeOptions, incotermOptions } from '@/data/content';
import { supabase } from '@/lib/supabase';
import { navigate } from '@/lib/router';

type PortalData = {
  selectedProducts: string[];
  volume: string;
  incoterm: string;
  port: string;
  company: string;
  country: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
};

const emptyData: PortalData = {
  selectedProducts: [],
  volume: '',
  incoterm: '',
  port: '',
  company: '',
  country: '',
  name: '',
  email: '',
  phone: '',
  notes: '',
};

const steps = [
  { label: 'Products', icon: Package },
  { label: 'Shipping', icon: Ship },
  { label: 'Buyer', icon: User },
  { label: 'Review', icon: ClipboardList },
  { label: 'Confirm', icon: CheckCircle2 },
];

type Props = {
  preselectedProduct: string | null;
  resetSignal: number;
};

export function OrderPortalSection({ preselectedProduct, resetSignal }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<PortalData>(emptyData);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [flashMsg, setFlashMsg] = useState('');
  const [reference, setReference] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const reveal = useReveal();

  useEffect(() => {
    if (preselectedProduct) {
      setData((prev) => ({
        ...emptyData,
        selectedProducts: [preselectedProduct],
      }));
      setCurrentStep(0);
      setErrors({});
      setFlashMsg('');
      setReference('');
    }
  }, [preselectedProduct, resetSignal]);

  const showFlash = (msg: string) => {
    setFlashMsg(msg);
    setTimeout(() => setFlashMsg(''), 3500);
  };

  const validateStep = (): boolean => {
    const newErrors: Record<string, boolean> = {};
    if (currentStep === 0) {
      if (data.selectedProducts.length === 0) {
        showFlash('Select at least one product to continue.');
        return false;
      }
    } else if (currentStep === 1) {
      if (!data.volume) newErrors.volume = true;
      if (!data.incoterm) newErrors.incoterm = true;
      if (!data.port.trim()) newErrors.port = true;
      if (Object.keys(newErrors).length > 0) {
        showFlash('Volume, incoterm, and port are all required.');
        setErrors(newErrors);
        return false;
      }
    } else if (currentStep === 2) {
      if (!data.company.trim()) newErrors.company = true;
      if (!data.country.trim()) newErrors.country = true;
      if (!data.name.trim()) newErrors.name = true;
      if (!data.email.trim() || !data.email.includes('@')) newErrors.email = true;
      if (Object.keys(newErrors).length > 0) {
        showFlash('Please complete all required fields with a valid email.');
        setErrors(newErrors);
        return false;
      }
    }
    setErrors({});
    return true;
  };

  const next = () => {
    if (!validateStep()) return;
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const back = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const generateReference = () => {
    const year = new Date().getFullYear();
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 5; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    return `AVS-${year}-${code}`;
  };

  const submit = async () => {
    setSubmitting(true);
    const ref = generateReference();
    setReference(ref);
    const productNames = data.selectedProducts
      .map((id) => products.find((p) => p.id === id)?.name)
      .filter((name): name is string => Boolean(name));

    await supabase.from('rfq_submissions').insert({
      reference: ref,
      products: data.selectedProducts,
      volume: data.volume,
      incoterm: data.incoterm,
      port: data.port,
      company: data.company,
      country: data.country,
      contact_name: data.name,
      email: data.email,
      phone: data.phone,
      notes: data.notes,
    });

    try {
      await supabase.functions.invoke('send-rfq-email', {
        body: {
          reference: ref,
          products: productNames,
          volume: volumeOptions.find((v) => v.value === data.volume)?.label || data.volume,
          incoterm: data.incoterm,
          port: data.port,
          company: data.company,
          country: data.country,
          contactName: data.name,
          email: data.email,
          phone: data.phone,
          notes: data.notes,
        },
      });
    } catch {
      // Confirmation email is best-effort: the reference number and DB
      // record already exist, so a failed send here shouldn't block the
      // user from seeing their confirmation.
    }

    setSubmitting(false);
    setCurrentStep(4);
  };

  const toggleProduct = (id: string) => {
    setData((prev) => ({
      ...prev,
      selectedProducts: prev.selectedProducts.includes(id)
        ? prev.selectedProducts.filter((p) => p !== id)
        : [...prev.selectedProducts, id],
    }));
  };

  const update = (field: keyof PortalData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: false }));
  };

  const summaryRows: { label: string; value: string }[] = [
    { label: 'Products', value: data.selectedProducts.map((id) => products.find((p) => p.id === id)?.name).filter(Boolean).join(', ') },
    { label: 'Volume Range', value: volumeOptions.find((v) => v.value === data.volume)?.label || 'N/A' },
    { label: 'Incoterm', value: data.incoterm || 'N/A' },
    { label: 'Destination Port', value: data.port || 'N/A' },
    { label: 'Company', value: data.company || 'N/A' },
    { label: 'Country', value: data.country || 'N/A' },
    { label: 'Contact Name', value: data.name || 'N/A' },
    { label: 'Email', value: data.email || 'N/A' },
    { label: 'Phone / WhatsApp', value: data.phone || 'N/A' },
    { label: 'Notes', value: data.notes || 'N/A' },
  ];

  return (
    <Section id="portal-page" bg="gold">
      <div className="container-tight" ref={reveal.ref}>
        <div className={`reveal ${reveal.visible ? 'is-visible' : ''}`}>
          <p className="eyebrow">Order Portal</p>
          <h2 className="mt-3 text-4xl leading-tight md:text-5xl">Request a Quote</h2>
          <span className="heading-accent" />
          <p className="mt-4 text-base leading-relaxed text-ink-secondary">
            Four short steps. You will receive a reference number to track your enquiry,
            and our trade desk will respond within 48 hours.
          </p>
        </div>

        <div className="mt-10 card p-6 md:p-10">
          {/* Step indicator */}
          <div className="flex items-center justify-between">
            {steps.map((step, i) => {
              const StepIcon = step.icon;
              const isActive = i === currentStep;
              const isDone = i < currentStep;
              return (
                <div key={step.label} className="flex flex-1 items-center">
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors ${
                        isActive
                          ? 'border-gold bg-gold text-white'
                          : isDone
                            ? 'border-green bg-green text-white'
                            : 'border-line bg-surface text-ink-muted'
                      }`}
                    >
                      {isDone ? <Check size={18} /> : <StepIcon size={18} />}
                    </div>
                    <span
                      className={`hidden text-[0.7rem] font-semibold uppercase tracking-wide sm:block ${
                        isActive ? 'text-gold' : isDone ? 'text-green' : 'text-ink-muted'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      className={`mx-2 h-0.5 flex-1 rounded transition-colors ${
                        i < currentStep ? 'bg-green' : 'bg-line'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Flash message */}
          {flashMsg && (
            <div
              role="alert"
              aria-live="assertive"
              className="mt-6 flex items-center gap-2 rounded-sm border border-rust bg-rust/5 px-4 py-3 text-sm text-rust animate-flash-in"
            >
              <AlertCircle size={17} className="shrink-0" />
              {flashMsg}
            </div>
          )}

          {/* Step content */}
          <div className="mt-8">
            {/* Step 1: Product selection */}
            {currentStep === 0 && (
              <div>
                <h3 className="text-xl">Select products</h3>
                <p className="mt-2 text-sm text-ink-secondary">
                  Choose one or more products to include in your quote request.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {products.map((product) => {
                    const selected = data.selectedProducts.includes(product.id);
                    return (
                      <button
                        key={product.id}
                        type="button"
                        onClick={() => toggleProduct(product.id)}
                        className={`flex items-center gap-2 rounded-full border-2 px-4 py-2.5 text-sm font-semibold transition-all ${
                          selected
                            ? 'border-green bg-green text-white'
                            : 'border-line bg-surface text-ink-secondary hover:border-green'
                        }`}
                      >
                        {selected && <Check size={15} />}
                        {product.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 2: Shipping details */}
            {currentStep === 1 && (
              <div>
                <h3 className="text-xl">Shipping details</h3>
                <p className="mt-2 text-sm text-ink-secondary">
                  Tell us the volume range and delivery terms you need.
                </p>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="label-field" htmlFor="volume">
                      Volume Range <span className="text-rust">*</span>
                    </label>
                    <select
                      id="volume"
                      value={data.volume}
                      onChange={(e) => update('volume', e.target.value)}
                      className={`input-field ${errors.volume ? 'input-field-error' : ''}`}
                    >
                      <option value="">Select volume range...</option>
                      {volumeOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="label-field" htmlFor="incoterm">
                      Incoterm <span className="text-rust">*</span>
                    </label>
                    <select
                      id="incoterm"
                      value={data.incoterm}
                      onChange={(e) => update('incoterm', e.target.value)}
                      className={`input-field ${errors.incoterm ? 'input-field-error' : ''}`}
                    >
                      <option value="">Select incoterm...</option>
                      {incotermOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="label-field" htmlFor="port">
                      Destination Port <span className="text-rust">*</span>
                    </label>
                    <input
                      id="port"
                      type="text"
                      value={data.port}
                      onChange={(e) => update('port', e.target.value)}
                      className={`input-field ${errors.port ? 'input-field-error' : ''}`}
                      placeholder="e.g. Port of Hamburg, Jebel Ali, Port of Los Angeles"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Buyer details */}
            {currentStep === 2 && (
              <div>
                <h3 className="text-xl">Buyer details</h3>
                <p className="mt-2 text-sm text-ink-secondary">
                  Fields marked with <span className="text-rust">*</span> are required.
                </p>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="label-field" htmlFor="company">
                      Company Name <span className="text-rust">*</span>
                    </label>
                    <input
                      id="company"
                      type="text"
                      value={data.company}
                      onChange={(e) => update('company', e.target.value)}
                      className={`input-field ${errors.company ? 'input-field-error' : ''}`}
                      placeholder="Your company"
                    />
                  </div>
                  <div>
                    <label className="label-field" htmlFor="country">
                      Country <span className="text-rust">*</span>
                    </label>
                    <input
                      id="country"
                      type="text"
                      value={data.country}
                      onChange={(e) => update('country', e.target.value)}
                      className={`input-field ${errors.country ? 'input-field-error' : ''}`}
                      placeholder="Destination country"
                    />
                  </div>
                  <div>
                    <label className="label-field" htmlFor="name">
                      Contact Name <span className="text-rust">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={data.name}
                      onChange={(e) => update('name', e.target.value)}
                      className={`input-field ${errors.name ? 'input-field-error' : ''}`}
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="label-field" htmlFor="email">
                      Email <span className="text-rust">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={data.email}
                      onChange={(e) => update('email', e.target.value)}
                      className={`input-field ${errors.email ? 'input-field-error' : ''}`}
                      placeholder="you@company.com"
                    />
                  </div>
                  <div>
                    <label className="label-field" htmlFor="phone">
                      Phone / WhatsApp <span className="text-ink-muted font-normal">(optional)</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={data.phone}
                      onChange={(e) => update('phone', e.target.value)}
                      className="input-field"
                      placeholder="+1 555 000 0000"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="label-field" htmlFor="notes">
                      Additional Notes <span className="text-ink-muted font-normal">(optional)</span>
                    </label>
                    <textarea
                      id="notes"
                      rows={3}
                      value={data.notes}
                      onChange={(e) => update('notes', e.target.value)}
                      className="input-field resize-none"
                      placeholder="Any specific requirements, packaging, or timing needs."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Review */}
            {currentStep === 3 && (
              <div>
                <h3 className="text-xl">Review your enquiry</h3>
                <p className="mt-2 text-sm text-ink-secondary">
                  Please confirm the details below before submitting.
                </p>
                <dl className="mt-6 divide-y divide-line rounded-md border border-line bg-bg">
                  {summaryRows.map((row) => (
                    <div key={row.label} className="grid grid-cols-3 gap-4 px-5 py-3.5">
                      <dt className="text-sm font-semibold text-ink-muted">{row.label}</dt>
                      <dd className="col-span-2 text-sm text-ink">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {/* Step 5: Confirmation */}
            {currentStep === 4 && (
              <div className="py-8 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-tint">
                  <CheckCircle2 size={36} className="text-green" />
                </div>
                <h3 className="mt-6 text-2xl">Enquiry filed</h3>
                <p className="mt-3 text-sm text-ink-secondary">
                  Your quote request has been received. Our trade desk will respond within
                  48 hours. Please quote this reference in any follow-up communication.
                </p>
                <div className="mx-auto mt-8 max-w-sm rounded-md border-2 border-gold bg-gold-tint p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                    Your Reference Number
                  </p>
                  <p className="mt-2 font-mono text-2xl font-bold text-green">
                    {reference}
                  </p>
                </div>
                <button type="button" onClick={() => navigate('contact')} className="btn-outline mt-8">
                  Contact the Trade Desk
                </button>
              </div>
            )}
          </div>

          {/* Navigation buttons */}
          {currentStep < 4 && (
            <div className="mt-10 flex items-center justify-between border-t border-line pt-6">
              <button
                type="button"
                onClick={back}
                disabled={currentStep === 0}
                className="btn-ghost disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={17} /> Back
              </button>
              {currentStep < 3 ? (
                <button type="button" onClick={next} className="btn-gold">
                  Next <ChevronRight size={17} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={submit}
                  disabled={submitting}
                  className="btn-gold"
                >
                  {submitting ? 'Filing request...' : 'Submit Enquiry'}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
