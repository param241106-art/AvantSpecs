import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createSupabaseMock } from '@/test/supabaseMock';

const supabaseMock = createSupabaseMock();
vi.mock('@/lib/supabase', () => ({
  get supabase() {
    return supabaseMock;
  },
}));

import App from '@/App';

const base = import.meta.env.BASE_URL;

describe('App routing', () => {
  beforeEach(() => {
    window.history.pushState({}, '', base);
  });

  it('renders the home page by default', () => {
    render(<App />);
    expect(screen.getByText('Select products')).toBeInTheDocument();
  });

  it('navigates to the House page via the navbar', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getAllByRole('link', { name: 'House' })[0]);
    expect(window.location.pathname).toBe(`${base}house`);
  });

  it('navigates to the Trade & Markets page and renders its content', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getAllByRole('link', { name: 'Trade' })[0]);
    expect(window.location.pathname).toBe(`${base}trade`);
  });

  it('navigates to the Contact page and renders the contact form', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getAllByRole('link', { name: 'Contact' })[0]);
    expect(await screen.findByRole('button', { name: 'Send Message' })).toBeInTheDocument();
  });

  it('renders the footer on every page', () => {
    render(<App />);
    expect(screen.getByText(/AvantSpecs\. All rights reserved\./)).toBeInTheDocument();
  });
});
