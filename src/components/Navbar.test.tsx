import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Navbar } from '@/components/Navbar';

describe('Navbar', () => {
  beforeEach(() => {
    window.location.hash = '';
  });

  it('renders all primary nav links and the CTA', () => {
    render(<Navbar />);
    const desktopNav = screen.getAllByRole('button', { name: 'Home' })[0];
    expect(desktopNav).toBeInTheDocument();
    ['Register', 'House', 'Trade', 'Contact'].forEach((label) => {
      expect(screen.getAllByRole('button', { name: label }).length).toBeGreaterThan(0);
    });
    expect(screen.getByRole('button', { name: 'Request a Quote' })).toBeInTheDocument();
  });

  it('navigates by updating the URL hash when a link is clicked', async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    await user.click(screen.getAllByRole('button', { name: 'Contact' })[0]);
    expect(window.location.hash).toBe('#/contact');
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
    const mobileTradeLink = within(mobilePanel as HTMLElement).getByRole('button', { name: 'Trade' });
    await user.click(mobileTradeLink);
    expect(window.location.hash).toBe('#/trade');
    expect(screen.queryByRole('button', { name: 'Close menu' })).not.toBeInTheDocument();
  });
});
