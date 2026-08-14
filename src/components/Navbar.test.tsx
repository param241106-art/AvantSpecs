import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Navbar } from '@/components/Navbar';

const base = import.meta.env.BASE_URL;

describe('Navbar', () => {
  beforeEach(() => {
    window.history.pushState({}, '', base);
  });

  it('renders all primary nav links and the CTA', () => {
    render(<Navbar />);
    const desktopNav = screen.getAllByRole('link', { name: 'Home' })[0];
    expect(desktopNav).toBeInTheDocument();
    ['Register', 'House', 'Trade', 'Contact'].forEach((label) => {
      expect(screen.getAllByRole('link', { name: label }).length).toBeGreaterThan(0);
    });
    expect(screen.getByRole('button', { name: 'Request a Quote' })).toBeInTheDocument();
  });

  it('navigates by updating the URL pathname when a link is clicked', async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    await user.click(screen.getAllByRole('link', { name: 'Contact' })[0]);
    expect(window.location.pathname).toBe(`${base}contact`);
  });

  it('opens and closes the mobile menu', async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    expect(screen.getByRole('button', { name: 'Close menu' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Close menu' }));
    expect(screen.queryByRole('button', { name: 'Close menu' })).not.toBeInTheDocument();
  });

  it('closes the mobile menu after navigating', async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    const mobilePanel = screen.getByRole('button', { name: 'Close menu' }).closest('div.fixed');
    expect(mobilePanel).not.toBeNull();
    const mobileTradeLink = within(mobilePanel as HTMLElement).getByRole('link', { name: 'Trade' });
    await user.click(mobileTradeLink);
    expect(window.location.pathname).toBe(`${base}trade`);
    expect(screen.queryByRole('button', { name: 'Close menu' })).not.toBeInTheDocument();
  });
});
