import type { Metadata } from 'next';
import ShopHero from '@/components/shop/ShopHero';
import ShopLayout from '@/components/shop/ShopLayout';
import type { Category, Book, ApiMeta } from '@/types/shop';

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
  const params = new URLSearchParams();

  if (sp?.searchTerm) {
    params.append('searchTerm', sp.searchTerm as string);
  }
  if (sp?.category) {
    params.append('category', sp.category as string);
  }
  if (sp?.minPrice) {
    params.append('minPrice', sp.minPrice as string);
  }
  if (sp?.maxPrice) {
    params.append('maxPrice', sp.maxPrice as string);
  }
  if (sp?.sort) {
    params.append('sort', sp.sort as string);
  }
  if (sp?.page) {
    params.append('page', sp.page as string);
  }
  if (sp?.rating) {
    params.append('rating', sp.rating as string);
  }
  if (sp?.authors) {
    params.append('authors', sp.authors as string);
  }
  if (sp?.publishers) {
    params.append('publishers', sp.publishers as string);
  }

  const booksRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/book?${params.toString()}`,
    { next: { revalidate: 300, tags: ['BOOK'] } }
  );
  const booksJson = (await booksRes.json()) as { data: Book[]; meta?: ApiMeta };
  const initialBooks = Array.isArray(booksJson?.data) ? booksJson.data : [];
  const initialMeta = booksJson?.meta ?? {};

  const catRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/category`, {
    next: { revalidate: 300, tags: ['CATEGORY'] },
  });
  const catJson = (await catRes.json()) as { data: Category[] };
  const categories = Array.isArray(catJson?.data) ? catJson.data : [];

  return (
    <>
      <ShopHero />
      <ShopLayout
        initialBooks={initialBooks}
        initialMeta={initialMeta}
        initialCategories={categories}
      />
    </>
  );
}