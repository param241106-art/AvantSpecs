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

import { ContactSection } from '@/components/sections/ContactSection';

describe('ContactSection form', () => {
  beforeEach(() => {
    supabaseMock.from.mockClear();
    supabaseMock.insert.mockClear();
  });

  it('blocks submission and flags required fields when empty', async () => {
    const user = userEvent.setup();
    render(<ContactSection />);
    await user.click(screen.getByRole('button', { name: 'Send Message' }));

    expect(
      await screen.findByText('Please fill in all required fields correctly.'),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/^Name/)).toHaveClass('input-field-error');
    expect(screen.getByLabelText(/^Email/)).toHaveClass('input-field-error');
    expect(screen.getByLabelText(/^Message/)).toHaveClass('input-field-error');
    expect(supabaseMock.from).not.toHaveBeenCalled();
  });

  it('rejects an email missing an @ sign', async () => {
    const user = userEvent.setup();
    render(<ContactSection />);
    await user.type(screen.getByLabelText(/^Name/), 'Jane Buyer');
    await user.type(screen.getByLabelText(/^Email/), 'jane.at.example.com');
    await user.type(screen.getByLabelText(/^Message/), 'Interested in bulk lemongrass oil.');
    await user.click(screen.getByRole('button', { name: 'Send Message' }));

    expect(
      await screen.findByText('Please fill in all required fields correctly.'),
    ).toBeInTheDocument();
    expect(supabaseMock.from).not.toHaveBeenCalled();
  });

  it('submits valid input to contact_submissions and resets the form', async () => {
    const user = userEvent.setup();
    render(<ContactSection />);
    await user.type(screen.getByLabelText(/^Name/), 'Jane Buyer');
    await user.type(screen.getByLabelText('Company'), 'Buyer Co');
    await user.type(screen.getByLabelText(/^Email/), 'jane@example.com');
    await user.type(screen.getByLabelText('Country'), 'Germany');
    await user.type(screen.getByLabelText('Phone / WhatsApp'), '+1 555 000 0000');
    await user.selectOptions(screen.getByLabelText('Product of Interest'), 'Lemongrass Oil');
    await user.type(screen.getByLabelText(/^Message/), 'Interested in bulk lemongrass oil.');
    await user.click(screen.getByRole('button', { name: 'Send Message' }));

    await waitFor(() => {
      expect(supabaseMock.from).toHaveBeenCalledWith('contact_submissions');
    });
    expect(supabaseMock.insert).toHaveBeenCalledWith({
      name: 'Jane Buyer',
      company: 'Buyer Co',
      email: 'jane@example.com',
      phone: '+1 555 000 0000',
      country: 'Germany',
      product_interest: 'Lemongrass Oil',
      message: 'Interested in bulk lemongrass oil.',
    });
    expect(
      await screen.findByText('Message sent. We will respond within 48 hours.'),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/^Name/)).toHaveValue('');
  });

  it('shows an error flash when the insert fails', async () => {
    supabaseMock.insert.mockResolvedValueOnce({ data: null, error: { message: 'db down' } });
    const user = userEvent.setup();
    render(<ContactSection />);
    await user.type(screen.getByLabelText(/^Name/), 'Jane Buyer');
    await user.type(screen.getByLabelText(/^Email/), 'jane@example.com');
    await user.type(screen.getByLabelText(/^Message/), 'Interested in bulk lemongrass oil.');
    await user.click(screen.getByRole('button', { name: 'Send Message' }));

    expect(
      await screen.findByText('Something went wrong. Please try again or email us directly.'),
    ).toBeInTheDocument();
  });

  it('renders the FAQ list', () => {
    render(<ContactSection />);
    expect(screen.getByText('What is the minimum order quantity?')).toBeInTheDocument();
  });
});
