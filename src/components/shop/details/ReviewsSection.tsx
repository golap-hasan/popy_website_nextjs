import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import type { Book } from './book-details-data';

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }).map((_, index) => {
    const filled = index + 1 <= Math.round(rating);
    return (
      <Star
        key={index}
        className={`size-4 ${
          filled ? 'fill-primary text-primary' : 'text-muted-foreground'
        }`}
      />
    );
  });
};

const ReviewsSection = ({ book }: { book: Book }) => {
  return (
    <section id="reviews" className="space-y-6 bg-background/95">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/80">
          Community voices
        </p>
        <h2 className="text-2xl font-semibold text-foreground md:text-3xl">
          {book.reviewsCount}+ learners are growing with this guide
        </h2>
        <p className="max-w-3xl text-sm text-muted-foreground">
          Honest reflections curated from recent buyers and educators. Each
          review is verified before publication to keep insights trustworthy.
        </p>
      </div>
      <div className="space-y-6">
        <Card className="border-border/50 bg-background/92 shadow-none">
          <CardContent className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="grid size-24 place-items-center rounded-full bg-primary/10 text-3xl font-semibold text-primary">
                  {book.rating.toFixed(1)}
                </div>
                <div className="space-y-1">
                  <p className="text-xl font-semibold text-foreground">
                    Overall rating
                  </p>
                  <div className="flex items-center gap-1 text-primary">
                    {renderStars(book.rating)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Based on {book.reviewsCount} reviews from students,
                    teachers, and parents
                  </p>
                </div>
              </div>
              <div className="rounded-2xl border border-border/40 bg-background/70 p-4 text-xs text-muted-foreground sm:max-w-xs">
                <p className="font-semibold text-foreground">
                  What readers highlight most
                </p>
                <ul className="mt-3 space-y-2">
                  <li>• 94% say the book improved exam time management</li>
                  <li>• 88% loved the real-life speaking prompts</li>
                  <li>• 9/10 recommend pairing with Popy's weekly clinics</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">
              Learner & mentor reviews
            </h3>
            <p className="text-sm text-muted-foreground">
              Recent reflections from the community. New reviews arrive every
              week.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {book.reviews.map(review => (
              <Card
                key={`${review.reviewer}-${review.date}`}
                className="border-border/50 bg-background/92 p-0"
              >
                <CardContent className="space-y-4 p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-12">
                        <AvatarFallback>
                          {review.reviewer.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {review.reviewer}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {review.role}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-primary">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-foreground">
                      {review.summary}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {review.content}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Reviewed {review.date}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
