import HighlightsSpecs from './HighlightsSpecs';
// import ReviewsSection from './ReviewsSection';
import SupportInfo from './SupportInfo';
import type { TBook } from '@/types/book';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const DetailTabs = ({ book }: { book: TBook }) => {
  return (
    <section className="space-y-6 bg-background/95 ">
      <Tabs defaultValue="description" className="space-y-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="space-y-10">
          <HighlightsSpecs book={book} />
          <SupportInfo />
        </TabsContent>

        <TabsContent value="reviews" className="space-y-10">
          {/* <ReviewsSection book={book} /> */}
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default DetailTabs;
