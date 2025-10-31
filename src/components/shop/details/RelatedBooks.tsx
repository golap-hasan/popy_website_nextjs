import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import type { Book } from './book-details-data';

const RelatedBooks = ({ book }: { book: Book }) => {
  return (
    <section className="space-y-8 rounded-3xl bg-background/95">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/80">
            You may also like
          </p>
          <h2 className="text-2xl font-semibold text-foreground md:text-3xl">
            Keep your study momentum going
          </h2>
          <p className="max-w-3xl text-sm text-muted-foreground">
            Pair this guide with other community-loved titles to build a
            complete learning stack around your goals.
          </p>
        </div>
      </div>
      <Carousel opts={{ align: 'start', slidesToScroll: 1 }}>
        <div className="relative">
          <CarouselContent>
            {book.related.map(relatedBook => (
              <CarouselItem
                key={relatedBook.id}
                className="basis-[80%] sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <Card className="group h-full overflow-hidden rounded-3xl border-border/50 bg-background/92 transition-all duration-500 hover:-translate-y-1.5">
                  <CardContent className="flex h-full flex-col gap-5">
                    <div className="relative overflow-hidden rounded-2xl border border-border/40 bg-linear-to-br from-primary/5 via-background to-background">
                      <Image
                        src={relatedBook.coverImage}
                        alt={`${relatedBook.title} cover`}
                        width={260}
                        height={320}
                        className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="absolute left-3 top-3 flex items-center gap-2">
                        <Badge className="rounded-full bg-primary/90 text-primary-foreground ">
                          Featured
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-base font-semibold leading-tight text-foreground line-clamp-1">
                        {relatedBook.title}
                      </p>
                      <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                        {relatedBook.author}
                      </p>
                      <p className="text-sm font-semibold text-primary">
                        {relatedBook.price}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      className="mt-auto inline-flex items-center justify-center rounded-full px-5"
                    >
                      <Link href={`/shop/${relatedBook.id}`}>View details</Link>
                    </Button>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden items-center gap-3 py-6 lg:flex">
            <CarouselPrevious className="size-10 rounded-full border border-border/60 bg-background/80 text-foreground  transition hover:bg-primary hover:text-primary-foreground" />
            <CarouselNext className="size-10 rounded-full border border-border/60 bg-background/80 text-foreground  transition hover:bg-primary hover:text-primary-foreground" />
          </div>
          <CarouselPrevious className="-left-4 top-1/2 flex size-10 -translate-y-1/2 rounded-full border border-border/60 bg-background/80 text-foreground  transition hover:bg-primary hover:text-primary-foreground lg:hidden" />
          <CarouselNext className="-right-4 top-1/2 flex size-10 -translate-y-1/2 rounded-full border border-border/60 bg-background/80 text-foreground  transition hover:bg-primary hover:text-primary-foreground lg:hidden" />
        </div>
      </Carousel>
    </section>
  );
};

export default RelatedBooks;
