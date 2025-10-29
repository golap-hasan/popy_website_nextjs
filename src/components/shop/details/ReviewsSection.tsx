import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Star } from "lucide-react";
import type { BookDetail } from "./book-details-data";

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }).map((_, index) => {
    const filled = index + 1 <= Math.round(rating);
    return <Star key={index} className={`size-4 ${filled ? "fill-primary text-primary" : "text-muted-foreground"}`} />;
  });
};

const ReviewsSection = ({ detail }: { detail: BookDetail }) => {
  return (
    <section id="reviews" className="space-y-6 rounded-3xl border border-border/60 bg-background/95 p-8 shadow-sm">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/80">Community voices</p>
        <h2 className="text-2xl font-semibold text-foreground md:text-3xl">
          {detail.reviewsCount}+ learners are growing with this guide
        </h2>
        <p className="max-w-3xl text-sm text-muted-foreground">
          Honest reflections curated from recent buyers and educators. Each review is verified before publication to keep
          insights trustworthy.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
        <Card className="border-border/50 bg-background/92">
          <CardContent className="space-y-6 p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="grid size-14 place-items-center rounded-full bg-primary/10 text-2xl font-semibold text-primary">
                  {detail.rating.toFixed(1)}
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-foreground">Overall rating</p>
                  <div className="flex items-center gap-1 text-primary">{renderStars(detail.rating)}</div>
                  <p className="text-xs text-muted-foreground">
                    Based on {detail.reviewsCount} reviews from students, teachers, and parents
                  </p>
                </div>
              </div>
              <Separator />
              <ul className="space-y-3 text-xs text-muted-foreground">
                <li>• 94% say the book improved exam time management</li>
                <li>• 88% loved the real-life speaking prompts</li>
                <li>• 9/10 recommend pairing with Popy's weekly clinics</li>
              </ul>
            </div>
          </CardContent>
        </Card>
        <div className="space-y-6">
          {detail.reviews.map((review) => (
            <Card key={`${review.reviewer}-${review.date}`} className="border-border/50 bg-background/92">
              <CardContent className="space-y-4 p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-12">
                      <AvatarFallback>{review.reviewer.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{review.reviewer}</p>
                      <p className="text-xs text-muted-foreground">{review.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-primary">{renderStars(review.rating)}</div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-foreground">{review.summary}</p>
                  <p className="text-sm text-muted-foreground">{review.content}</p>
                </div>
                <p className="text-xs text-muted-foreground">Reviewed {review.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
