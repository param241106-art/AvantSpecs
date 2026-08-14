import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createSupabaseMock } from '@/test/supabaseMock';

const supabaseMock = createSupabaseMock();
vi.mock('@/lib/supabase', () => ({
  get supabase() {
    return supabaseMock;
  },
}));

import { Footer } from '@/components/Footer';

describe('Footer newsletter form', () => {
  beforeEach(() => {
    supabaseMock.from.mockClear();
    supabaseMock.insert.mockClear();
  });

  it('rejects an email without an @ via its own validation, without calling supabase', async () => {
    // The <form> has no `noValidate`, so a real click on the submit button goes
    // through the browser's native type="email" constraint validation first,
    // which already blocks submission for a string with no "@". We dispatch
    // the submit event directly to exercise the component's own JS validation
    // branch (`!email.includes('@')`) in isolation.
    const user = userEvent.setup();
    const { container } = render(<Footer />);
    const input = screen.getByLabelText('Email for newsletter');

    await user.type(input, 'not-an-email');
    fireEvent.submit(container.querySelector('form')!);

    expect(await screen.findByText('Please enter a valid email address.')).toBeInTheDocument();
    expect(supabaseMock.from).not.toHaveBeenCalled();
  });

  it('is blocked by native HTML5 validation before the JS handler ever runs on a real click', async () => {
    const user = userEvent.setup();
    render(<Footer />);
    const input = screen.getByLabelText('Email for newsletter') as HTMLInputElement;
    const button = screen.getByRole('button', { name: 'Subscribe' });

    await user.type(input, 'not-an-email');
    expect(input.checkValidity()).toBe(false);

    await user.click(button);

    // Native validation blocked the submit event entirely: no JS-level error
    // message appears and supabase is never called.
    expect(screen.queryByText('Please enter a valid email address.')).not.toBeInTheDocument();
    expect(supabaseMock.from).not.toHaveBeenCalled();
  });

  it('submits a valid email to the newsletter_submissions table and shows success', async () => {
    const user = userEvent.setup();
    render(<Footer />);
    const input = screen.getByLabelText('Email for newsletter');
    const button = screen.getByRole('button', { name: 'Subscribe' });

    await user.type(input, 'buyer@example.com');
    await user.click(button);

    await waitFor(() => {
      expect(supabaseMock.from).toHaveBeenCalledWith('newsletter_submissions');
    });
    expect(supabaseMock.insert).toHaveBeenCalledWith({ email: 'buyer@example.com' });
    expect(await screen.findByText('Thank you for subscribing.')).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  it('shows an error message when the insert fails', async () => {
    supabaseMock.insert.mockResolvedValueOnce({ data: null, error: { message: 'boom' } });
    const user = userEvent.setup();
    render(<Footer />);
    const input = screen.getByLabelText('Email for newsletter');

    await user.type(input, 'buyer@example.com');
    await user.click(screen.getByRole('button', { name: 'Subscribe' }));

    expect(await screen.findByText('Please enter a valid email address.')).toBeInTheDocument();
  });

  it('renders footer navigation and category links', () => {
    render(<Footer />);
    expect(screen.getByText('AvantSpecs')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /param@avantspecs.com/ })).toHaveAttribute(
      'href',
      'mailto:param@avantspecs.com',
    );
  });

  it('hides the contact details block on the Contact page only', () => {
    window.history.pushState({}, '', `${import.meta.env.BASE_URL}contact`);
    render(<Footer />);
    expect(screen.queryByRole('link', { name: /param@avantspecs.com/ })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /\+971 50 665 0173/ })).not.toBeInTheDocument();
    window.history.pushState({}, '', import.meta.env.BASE_URL);
  });
});
