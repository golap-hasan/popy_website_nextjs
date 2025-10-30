import HighlightsSpecs from "./HighlightsSpecs";
import ReviewsSection from "./ReviewsSection";
import SupportInfo from "./SupportInfo";
import type { BookDetail } from "./book-details-data";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const DetailTabs = ({ detail }: { detail: BookDetail }) => {
  return (
    <section className="space-y-6 bg-background/95 ">
      <Tabs defaultValue="description" className="space-y-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="space-y-10">
          <HighlightsSpecs detail={detail} />
          <SupportInfo detail={detail} />
        </TabsContent>

        <TabsContent value="reviews" className="space-y-10">
          <ReviewsSection detail={detail} />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default DetailTabs;
