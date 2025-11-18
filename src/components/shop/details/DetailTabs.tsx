import { Book } from '@/types/shop';
import HighlightsSpecs from './HighlightsSpecs';
import ReviewsSection from './ReviewsSection';
// import SupportInfo from './SupportInfo';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IMeta, BookReview } from '@/types';

const DetailTabs = ({ book, reviews, reviewsMeta }: { book: Book; reviews: BookReview[]; reviewsMeta: IMeta }) => {
  return (
    <section className="space-y-6 bg-background/95 ">
      <Tabs defaultValue="description" className="space-y-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="space-y-10">
          <HighlightsSpecs book={book} />
          {/* <SupportInfo /> */}
        </TabsContent>

        <TabsContent value="reviews" className="space-y-10">
          <ReviewsSection
            rating={Number(book.rating) || 0}
            reviewsCount={book.reviewsCount ?? reviews.length ?? 0}
            reviews={reviews}
            reviewsMeta={reviewsMeta}
          />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default DetailTabs;
