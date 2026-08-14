import { HomeSection } from '@/components/sections/HomeSection';
import { ProductsSection } from '@/components/sections/ProductsSection';
import { OrderPortalSection } from '@/components/sections/OrderPortalSection';
import { navigateToOrderPortalWithProduct } from '@/lib/router';
import { useCallback, useMemo } from 'react';
import { useStructuredData } from '@/lib/hooks';
import { organizationSchema } from '@/lib/structuredData';
import { team } from '@/data/content';

export function HomePage() {
  const handleRequestSpecs = useCallback((productId: string) => {
    navigateToOrderPortalWithProduct(productId);
  }, []);

  useStructuredData(useMemo(() => organizationSchema(team), []));

  return (
    <>
      <HomeSection />
      <ProductsSection onRequestSpecs={handleRequestSpecs} />
      <OrderPortalSection preselectedProduct={null} resetSignal={0} />
    </>
  );
}
