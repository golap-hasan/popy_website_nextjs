import type { Metadata } from 'next';
import PageLayout from '@/tools/PageLayout';
import SummarySection from '@/components/shop/details/SummarySection';
import DetailTabs from '@/components/shop/details/DetailTabs';
import RelatedBooks from '@/components/shop/details/RelatedBooks';
import { notFound } from 'next/navigation';
import { getReviewsByBookSlug, getSingleBookBySlug } from '@/services/shop';

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}): Promise<Metadata> => {
  const { slug } = await params;
  const res = await getSingleBookBySlug(slug);
  const data = res?.data;
  const book = Array.isArray(data) ? data[0] : data;

  if (!book) {
    return {
      title: 'Book not found · Popy Library',
    };
  }

  return {
    title: `${book.title} · Popy Library`,
    description: book.description,
    openGraph: {
      title: book.title,
      description: book.description,
    },
  };
};

const ShopDetailPage = async ({
  searchParams,
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{ page?: string; limit?: string }>;
}) => {
  const { slug } = await params;
  const sp = (await searchParams) || {};
  const page = (Array.isArray(sp.page) ? sp.page[0] : sp.page) || '1';
  const limit = (Array.isArray(sp.limit) ? sp.limit[0] : sp.limit) || '1';

  const res = await getSingleBookBySlug(slug);
  const data = res?.data;
  const book = Array.isArray(data) ? data[0] : data;

  // get reviews
  const reviewsRes = await getReviewsByBookSlug(book?.slug,  page, limit );
  const reviewsList = reviewsRes?.data?.data ?? reviewsRes?.data ?? [];
  const reviewsMeta = reviewsRes?.data?.meta ?? reviewsRes?.meta;

  if (!book) {
    notFound();
  }

  return (
    <PageLayout paddingSize="small">
      <div className="space-y-12">
        <SummarySection book={book} />
        <DetailTabs
          reviews={reviewsList}
          reviewsMeta={reviewsMeta}
          book={book}
        />
        <RelatedBooks book={book} />
      </div>
    </PageLayout>
  );
};

export default ShopDetailPage;
