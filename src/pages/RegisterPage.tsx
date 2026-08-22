import { ProductsSection } from '@/components/sections/ProductsSection';
import { OrderPortalSection } from '@/components/sections/OrderPortalSection';
import { consumePendingProduct } from '@/lib/router';
import { useCallback, useEffect, useState } from 'react';

function scrollToPortal() {
  document.getElementById('portal-page')?.scrollIntoView({ behavior: 'smooth' });
}

export function RegisterPage() {
  const [preselectedProduct, setPreselectedProduct] = useState<string | null>(null);
  const [resetSignal, setResetSignal] = useState(0);

  useEffect(() => {
    const pending = consumePendingProduct();
    if (pending) {
      setPreselectedProduct(pending);
      requestAnimationFrame(scrollToPortal);
    }
  }, []);

  const handleRequestSpecs = useCallback((productId: string) => {
    setPreselectedProduct(null);
    setResetSignal((s) => s + 1);
    requestAnimationFrame(() => {
      setPreselectedProduct(productId);
      requestAnimationFrame(scrollToPortal);
    });
  }, []);

  return (
    <>
      <ProductsSection onRequestSpecs={handleRequestSpecs} headingLevel="h1" />
      <OrderPortalSection preselectedProduct={preselectedProduct} resetSignal={resetSignal} />
    </>
  );
}
