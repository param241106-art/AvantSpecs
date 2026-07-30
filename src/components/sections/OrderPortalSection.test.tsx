import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createSupabaseMock } from '@/test/supabaseMock';

const supabaseMock = createSupabaseMock();
vi.mock('@/lib/supabase', () => ({
  get supabase() {
    return supabaseMock;
  },
}));

import { OrderPortalSection } from '@/components/sections/OrderPortalSection';

async function fillShippingStep(user: ReturnType<typeof userEvent.setup>) {
  await user.selectOptions(screen.getByLabelText(/Volume Range/), 'small');
  await user.selectOptions(screen.getByLabelText(/Incoterm/), 'FOB');
  await user.type(screen.getByLabelText(/Destination Port/), 'Port of Hamburg');
}

async function fillBuyerStep(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/Company Name/), 'Buyer Co');
  await user.type(screen.getByLabelText(/^Country/), 'Germany');
  await user.type(screen.getByLabelText(/Contact Name/), 'Jane Buyer');
  await user.type(screen.getByLabelText(/^Email/), 'jane@example.com');
}

describe('OrderPortalSection (RFQ wizard)', () => {
  beforeEach(() => {
    supabaseMock.from.mockClear();
    supabaseMock.insert.mockClear();
  });

  it('blocks moving past step 1 with no product selected', async () => {
    const user = userEvent.setup();
    render(<OrderPortalSection preselectedProduct={null} resetSignal={0} />);
    await user.click(screen.getByRole('button', { name: /Next/ }));
    expect(
      await screen.findByText('Select at least one product to continue.'),
    ).toBeInTheDocument();
    expect(screen.getByText('Select products')).toBeInTheDocument();
  });

  it('toggles product selection on and off', async () => {
    const user = userEvent.setup();
    render(<OrderPortalSection preselectedProduct={null} resetSignal={0} />);
    const productBtn = screen.getByRole('button', { name: 'Eucalyptus Oil' });
    expect(productBtn.className).not.toContain('bg-green text-white');
    await user.click(productBtn);
    expect(productBtn.className).toContain('bg-green text-white');
    await user.click(productBtn);
    expect(productBtn.className).not.toContain('bg-green text-white');
  });

  it('pre-selects a product and jumps to step 1 when preselectedProduct changes', () => {
    const { rerender } = render(
      <OrderPortalSection preselectedProduct={null} resetSignal={0} />,
    );
    rerender(<OrderPortalSection preselectedProduct="clove-bud-oil" resetSignal={1} />);
    const productBtn = screen.getByRole('button', { name: 'Clove Bud Oil' });
    expect(productBtn.className).toContain('bg-green text-white');
  });

  it('requires volume, incoterm, and port before advancing from shipping', async () => {
    const user = userEvent.setup();
    render(<OrderPortalSection preselectedProduct={null} resetSignal={0} />);
    await user.click(screen.getByRole('button', { name: 'Eucalyptus Oil' }));
    await user.click(screen.getByRole('button', { name: /Next/ }));
    expect(screen.getByText('Shipping details')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /Next/ }));
    expect(
      await screen.findByText('Volume, incoterm, and port are all required.'),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Volume Range/)).toHaveClass('input-field-error');
  });

  it('requires company, country, name, and a valid email before advancing from buyer details', async () => {
    const user = userEvent.setup();
    render(<OrderPortalSection preselectedProduct={null} resetSignal={0} />);
    await user.click(screen.getByRole('button', { name: 'Eucalyptus Oil' }));
    await user.click(screen.getByRole('button', { name: /Next/ }));
    await fillShippingStep(user);
    await user.click(screen.getByRole('button', { name: /Next/ }));
    expect(screen.getByText('Buyer details')).toBeInTheDocument();

    await user.type(screen.getByLabelText(/^Email/), 'not-an-email');
    await user.click(screen.getByRole('button', { name: /Next/ }));
    expect(
      await screen.findByText('Please complete all required fields with a valid email.'),
    ).toBeInTheDocument();
  });

  it('shows a review summary reflecting entered data', async () => {
    const user = userEvent.setup();
    render(<OrderPortalSection preselectedProduct={null} resetSignal={0} />);
    await user.click(screen.getByRole('button', { name: 'Eucalyptus Oil' }));
    await user.click(screen.getByRole('button', { name: /Next/ }));
    await fillShippingStep(user);
    await user.click(screen.getByRole('button', { name: /Next/ }));
    await fillBuyerStep(user);
    await user.click(screen.getByRole('button', { name: /Next/ }));

    expect(screen.getByText('Review your enquiry')).toBeInTheDocument();
    expect(screen.getByText('Eucalyptus Oil')).toBeInTheDocument();
    expect(screen.getByText('Port of Hamburg')).toBeInTheDocument();
    expect(screen.getByText('Buyer Co')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
  });

  it('submits the RFQ to rfq_submissions and shows a reference number', async () => {
    const user = userEvent.setup();
    render(<OrderPortalSection preselectedProduct={null} resetSignal={0} />);
    await user.click(screen.getByRole('button', { name: 'Eucalyptus Oil' }));
    await user.click(screen.getByRole('button', { name: /Next/ }));
    await fillShippingStep(user);
    await user.click(screen.getByRole('button', { name: /Next/ }));
    await fillBuyerStep(user);
    await user.click(screen.getByRole('button', { name: /Next/ }));
    await user.click(screen.getByRole('button', { name: 'Submit Enquiry' }));

    await waitFor(() => {
      expect(supabaseMock.from).toHaveBeenCalledWith('rfq_submissions');
    });
    expect(supabaseMock.insert).toHaveBeenCalledWith(
      expect.objectContaining({
        products: ['eucalyptus-oil'],
        volume: 'small',
        incoterm: 'FOB',
        port: 'Port of Hamburg',
        company: 'Buyer Co',
        country: 'Germany',
        contact_name: 'Jane Buyer',
        email: 'jane@example.com',
      }),
    );

    expect(await screen.findByText('Enquiry filed')).toBeInTheDocument();
    const currentYear = new Date().getFullYear();
    const referenceEl = screen.getByText(new RegExp(`^AVS-${currentYear}-[A-Z0-9]{5}$`));
    expect(referenceEl).toBeInTheDocument();
  });

  it('lets the user step back through the wizard', async () => {
    const user = userEvent.setup();
    render(<OrderPortalSection preselectedProduct={null} resetSignal={0} />);
    await user.click(screen.getByRole('button', { name: 'Eucalyptus Oil' }));
    await user.click(screen.getByRole('button', { name: /Next/ }));
    expect(screen.getByText('Shipping details')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /Back/ }));
    expect(screen.getByText('Select products')).toBeInTheDocument();
  });
});
