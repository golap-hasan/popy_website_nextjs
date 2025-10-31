import HighlightsSpecs from './HighlightsSpecs';
import ReviewsSection from './ReviewsSection';
import SupportInfo from './SupportInfo';
import type { Book } from './book-details-data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const DetailTabs = ({ book }: { book: Book }) => {
  return (
    <section className="space-y-6 bg-background/95 ">
      <Tabs defaultValue="description" className="space-y-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="space-y-10">
          <HighlightsSpecs detail={book} />
          <SupportInfo detail={book} />
        </TabsContent>

        <TabsContent value="reviews" className="space-y-10">
          <ReviewsSection detail={book} />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default DetailTabs;
