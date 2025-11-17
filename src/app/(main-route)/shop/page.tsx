 
import type { Metadata } from 'next';
// import ShopHero from '@/components/shop/ShopHero';
import ShopLayout from '@/components/shop/ShopLayout';
import { getBooks, getCategories } from '@/services/shop';

import { getPageMetadata, getPriceDescription, processSortText } from './utils';
import { SHOP_CONSTANTS } from './constants';

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

type ShopSearchParams = { [key: string]: string | string[] | undefined };

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const sp = await searchParams;
  const searchTerm = (sp?.searchTerm as string) ?? '';
  const category = (sp?.category as string) ?? '';

  // Get base metadata
  const { title, description } = getPageMetadata(searchTerm, category);

  // Handle price range
  const pricePart = getPriceDescription(
    sp?.minPrice as string | undefined,
    sp?.maxPrice as string | undefined
  );

  // Process sort text if available
  let finalDescription = description;
  if (sp?.sort) {
    const sortText = processSortText(sp.sort as string);
    const baseDescription = description.endsWith('.') ? description.slice(0, -1) : description;
    finalDescription = `${baseDescription}${pricePart} sorted by ${sortText}.`;
  } else if (pricePart) {
    finalDescription = `${description.endsWith('.') ? description.slice(0, -1) : description}${pricePart}.`;
  }

  const metadata = { 
    title: title || SHOP_CONSTANTS.BASE_TITLE,
    description: finalDescription || SHOP_CONSTANTS.BASE_DESCRIPTION 
  };
  
  return {
    ...metadata,
    openGraph: metadata,
    twitter: metadata,
    metadataBase: new URL('https://popy.library.com')
  };
}

async function fetchBooks(params: ShopSearchParams) {
  try {
    const response = await getBooks(params);
    return {
      books: Array.isArray(response.data) ? response.data : [],
      meta: response.meta ?? {}
    };
  } catch (error) {
    console.error('Error fetching books:', error);
    return { books: [], meta: {} };
  }
}

async function fetchCategories() {
  try {
    const response = await getCategories();
    return Array.isArray(response?.data) ? response.data : [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export default async function ShopPage({ searchParams }: PageProps) {
  const params = await searchParams;
  
  // Fetch data in parallel for better performance
  const [{ books, meta }, categories] = await Promise.all([
    fetchBooks(params),
    fetchCategories()
  ]);

  return (
    <>
      {/* <ShopHero /> */}
      <ShopLayout
        initialBooks={books}
        initialMeta={meta}
        initialCategories={categories}
      />
    </>
  );
}