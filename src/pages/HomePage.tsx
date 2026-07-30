import { HomeSection } from '@/components/sections/HomeSection';
import { ProductsSection } from '@/components/sections/ProductsSection';
import { OrderPortalSection } from '@/components/sections/OrderPortalSection';
import { navigateToOrderPortalWithProduct } from '@/lib/router';
import { useCallback } from 'react';

export function HomePage() {
  const handleRequestSpecs = useCallback((productId: string) => {
    navigateToOrderPortalWithProduct(productId);
  }, []);

  return (
    <>
      <HomeSection />
      <ProductsSection onRequestSpecs={handleRequestSpecs} />
      <OrderPortalSection preselectedProduct={null} resetSignal={0} />
    </>
  );
}
