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
    <section className="space-y-6 rounded-3xl bg-background/95 shadow-sm">
      <Tabs defaultValue="description" className="space-y-8">
        <TabsList className="grid w-full grid-cols-2 rounded-full bg-muted/40 p-1">
          <TabsTrigger
            value="description"
            className="rounded-full text-sm font-semibold data-[state=active]:bg-background data-[state=active]:text-foreground"
          >
            Description
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="rounded-full text-sm font-semibold data-[state=active]:bg-background data-[state=active]:text-foreground"
          >
            Reviews
          </TabsTrigger>
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
