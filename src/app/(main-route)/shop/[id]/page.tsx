import type { Metadata } from 'next';
import PageLayout from '@/tools/PageLayout';
import SummarySection from '@/components/shop/details/SummarySection';
import DetailTabs from '@/components/shop/details/DetailTabs';
import RelatedBooks from '@/components/shop/details/RelatedBooks';
import { books } from '@/components/shop/details/book-details-data';
import { notFound } from 'next/navigation';

type ShopDetailPageParams = Promise<{
  id: string;
}>;

type ShopDetailPageProps = {
  params: ShopDetailPageParams;
};

export const generateMetadata = async ({
  params,
}: ShopDetailPageProps): Promise<Metadata> => {
  const { id } = await params;
  const book = books.find(book => book.id === id);

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

const ShopDetailPage = async ({ params }: ShopDetailPageProps) => {
  const { id } = await params;
  const book = books.find(book => book.id === id);

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
