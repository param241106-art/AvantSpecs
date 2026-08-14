import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductsSection } from '@/components/sections/ProductsSection';
import { products } from '@/data/content';

const base = import.meta.env.BASE_URL;

describe('ProductsSection', () => {
  beforeEach(() => {
    window.history.pushState({}, '', base);
  });

  it('renders every product by default', () => {
    render(<ProductsSection onRequestSpecs={vi.fn()} />);
    products.forEach((p) => {
      expect(screen.getByText(p.name)).toBeInTheDocument();
    });
  });

  it('filters to oleoresins only', async () => {
    const user = userEvent.setup();
    render(<ProductsSection onRequestSpecs={vi.fn()} />);
    await user.click(screen.getByRole('button', { name: 'Oleoresins' }));
    expect(screen.getByText('Black Pepper Oleoresin')).toBeInTheDocument();
    expect(screen.queryByText('Eucalyptus Oil')).not.toBeInTheDocument();
  });

  it('searches by product name', async () => {
    const user = userEvent.setup();
    render(<ProductsSection onRequestSpecs={vi.fn()} />);
    await user.type(screen.getByLabelText('Search products'), 'lemongrass');
    expect(screen.getByText('Lemongrass Oil')).toBeInTheDocument();
    expect(screen.queryByText('Clove Bud Oil')).not.toBeInTheDocument();
  });

  it('searches by Latin binomial', async () => {
    const user = userEvent.setup();
    render(<ProductsSection onRequestSpecs={vi.fn()} />);
    await user.type(screen.getByLabelText('Search products'), 'Piper nigrum');
    expect(screen.getByText('Black Pepper Oleoresin')).toBeInTheDocument();
    expect(screen.queryByText('Eucalyptus Oil')).not.toBeInTheDocument();
  });

  it('shows an empty state when no product matches', async () => {
    const user = userEvent.setup();
    render(<ProductsSection onRequestSpecs={vi.fn()} />);
    await user.type(screen.getByLabelText('Search products'), 'nonexistent-spec-xyz');
    expect(
      screen.getByText('No products match your search. Try a different term or category.'),
    ).toBeInTheDocument();
  });

  it('calls onRequestSpecs with the product id when "Request Specs" is clicked', async () => {
    const user = userEvent.setup();
    const onRequestSpecs = vi.fn();
    render(<ProductsSection onRequestSpecs={onRequestSpecs} />);
    const card = screen.getByText('Eucalyptus Oil').closest('div.card');
    const button = within(card as HTMLElement).getByRole('button', { name: /Request Specs/ });
    await user.click(button);
    expect(onRequestSpecs).toHaveBeenCalledWith('eucalyptus-oil');
  });

  it('navigates to the product detail page when its image is clicked', async () => {
    const user = userEvent.setup();
    render(<ProductsSection onRequestSpecs={vi.fn()} />);
    const card = screen.getByText('Eucalyptus Oil').closest('div.card');
    const imageLink = within(card as HTMLElement).getByRole('link', {
      name: 'View details for Eucalyptus Oil',
    });
    await user.click(imageLink);
    expect(window.location.pathname).toBe(`${base}product/eucalyptus-oil`);
  });
});
