import type { Metadata } from "next";
import PageLayout from "@/tools/PageLayout";
import SummarySection from "@/components/shop/details/SummarySection";
import HighlightsSpecs from "@/components/shop/details/HighlightsSpecs";
import AboutAuthor from "@/components/shop/details/AboutAuthor";
import ReviewsSection from "@/components/shop/details/ReviewsSection";
import SupportInfo from "@/components/shop/details/SupportInfo";
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
  const { id } = await params;
  const detail = bookDetails[id];

  if (!detail) {
    notFound();
  }

  return (
    <PageLayout>
      <div className="space-y-12">
        <SummarySection detail={detail} />
        <HighlightsSpecs detail={detail} />
        <AboutAuthor detail={detail} />
        <ReviewsSection detail={detail} />
        <SupportInfo detail={detail} />
        <RelatedBooks detail={detail} />
      </div>
    </PageLayout>
  );
};

export default ShopDetailPage;
