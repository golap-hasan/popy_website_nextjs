import type { Metadata } from 'next';
import PageLayout from '@/tools/PageLayout';
import SummarySection from '@/components/shop/details/SummarySection';
import DetailTabs from '@/components/shop/details/DetailTabs';
import RelatedBooks from '@/components/shop/details/RelatedBooks';
import { notFound } from 'next/navigation';
import { getSingleBookBySlug } from '@/services/shop';

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
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) => {
  const { slug } = await params;
  const res = await getSingleBookBySlug(slug);
  const data = res?.data;
  const book = Array.isArray(data) ? data[0] : data;

  if (!book) {
    notFound();
  }

  return (
    <PageLayout paddingSize="small">
      <div className="space-y-12">
        <SummarySection book={book} />
        <DetailTabs book={book} />
        <RelatedBooks book={book} />
      </div>
    </PageLayout>
  );
};

export default ShopDetailPage;
