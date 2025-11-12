import type { Metadata } from 'next';
import ShopHero from '@/components/shop/ShopHero';
import ShopLayout from '@/components/shop/ShopLayout';

export const metadata: Metadata = {
  title: 'Shop Books | Popy Library',
  description:
    'Browse and purchase books online from Popy Library. Discover best sellers, academic guides, and new arrivals.',
};

const ShopPage = () => {
  return (
    <>
      <ShopHero />
      <ShopLayout />
    </>
  );
};

export default ShopPage;
