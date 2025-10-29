import type { Metadata } from "next";
import PageLayout from "@/tools/PageLayout";
import SummarySection from "@/components/shop/details/SummarySection";
import DetailTabs from "@/components/shop/details/DetailTabs";
import RelatedBooks from "@/components/shop/details/RelatedBooks";
import { bookDetails } from "@/components/shop/details/book-details-data";
import { notFound } from "next/navigation";

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
  const detail = bookDetails[id];

  if (!detail) {
    return {
      title: "Book not found · Popy Library",
    };
  }

  return {
    title: `${detail.title} · Popy Library`,
    description: detail.description,
    openGraph: {
      title: detail.title,
      description: detail.description,
    },
  };
};

const ShopDetailPage = async ({ params }: ShopDetailPageProps) => {
  // const { id } = await params;
  const id = 1;
  const detail = bookDetails[id];

  if (!detail) {
    notFound();
  }

  return (
    <PageLayout paddingSize="small">
      <div className="space-y-12">
        <SummarySection detail={detail} />
        <DetailTabs detail={detail} />
        <RelatedBooks detail={detail} />
      </div>
    </PageLayout>
  );
};

export default ShopDetailPage;
