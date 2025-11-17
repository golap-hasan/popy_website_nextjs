import type { Metadata } from 'next';
import ShopHero from '@/components/shop/ShopHero';
import ShopLayout from '@/components/shop/ShopLayout';
import type { Category, Book, ApiMeta } from '@/types/shop';
import { getBooks, getCategories } from '@/services/shop';

const baseTitle = 'Shop Books | Popy Library';
const baseDescription =
  'Browse and purchase books online from Popy Library. Discover best sellers, academic guides, and new arrivals.';

const humanizeCategory = (slug: string) =>
  slug
    .split('-')
    .map((part) => (part ? part[0].toUpperCase() + part.slice(1) : ''))
    .join(' ')
    .trim();

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const sp = await searchParams;
  const searchTerm = (sp?.searchTerm as string) ?? '';
  const category = (sp?.category as string) ?? '';
  const minPrice = (sp?.minPrice as string) ?? '';
  const maxPrice = (sp?.maxPrice as string) ?? '';
  const sort = (sp?.sort as string) ?? '';

  let title = baseTitle;
  let description = baseDescription;

  const hasSearch = !!searchTerm;
  const hasCategory = !!category;

  if (hasSearch || hasCategory) {
    const catLabel = hasCategory ? humanizeCategory(category) : '';

    if (hasSearch && hasCategory) {
      title = `Books in ${catLabel} matching "${searchTerm}" | Popy Library`;
      description = `Browse books from the ${catLabel} category in Popy Library that match "${searchTerm}".`;
    } else if (hasSearch) {
      title = `Search results for "${searchTerm}" | Popy Library`;
      description = `Browse books from Popy Library that match your search for "${searchTerm}".`;
    } else if (hasCategory) {
      title = `${catLabel} Books | Popy Library`;
      description = `Discover ${catLabel} books from Popy Library, including best sellers and new arrivals.`;
    }
  }

  let pricePart = '';
  if (minPrice && maxPrice) {
    pricePart = ` with prices between ৳${minPrice} and ৳${maxPrice}`;
  } else if (minPrice) {
    pricePart = ` with prices above ৳${minPrice}`;
  } else if (maxPrice) {
    pricePart = ` with prices below ৳${maxPrice}`;
  }

  let sortPart = '';
  if (sort) {
    const sortFormatted = sort
      .replace(/,(\s*)/g, ' and ')
      .replace('-', 'descending ');
    sortPart = ` sorted by ${sortFormatted}`;
  }

  if (pricePart || sortPart) {
    description = description.endsWith('.')
      ? description.slice(0, -1)
      : description;
    description += `${pricePart}${sortPart}.`;
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    twitter: {
      title,
      description,
    },
  };
}

export default async function ShopPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const booksRes = (await getBooks(sp)) as { data: Book[]; meta?: ApiMeta };
  const books = Array.isArray(booksRes.data) ? booksRes.data : [];
  const meta = booksRes?.meta ?? {};

  const catRes = (await getCategories()) as { data: Category[] };
  const categories = Array.isArray(catRes?.data) ? catRes.data : [];

  return (
    <>
      <ShopHero />
      <ShopLayout
        initialBooks={books}
        initialMeta={meta}
        initialCategories={categories}
      />
    </>
  );
}