import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { BookDetail } from "./book-details-data";

const RelatedBooks = ({ detail }: { detail: BookDetail }) => {
  return (
    <section className="space-y-6 rounded-3xl border border-border/60 bg-background/95 p-8 shadow-sm">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/80">You may also like</p>
        <h2 className="text-2xl font-semibold text-foreground md:text-3xl">Keep your study momentum going</h2>
        <p className="max-w-3xl text-sm text-muted-foreground">
          Pair this guide with other community-loved titles to build a complete learning stack around your goals.
        </p>
      </div>
      <div className="relative">
        <Carousel opts={{ align: "start", slidesToScroll: 1 }}>
          <CarouselContent className="-ml-3 md:-ml-4">
            {detail.related.map((relatedBook) => (
              <CarouselItem key={relatedBook.id} className="pl-3 md:pl-4 basis-3/4 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <Card className="group h-full border-border/40 bg-background/92">
                  <CardContent className="flex h-full flex-col gap-4 p-4">
                    <div className="relative mx-auto h-44 w-36 overflow-hidden rounded-xl border border-border/30 bg-muted/20">
                      <Image
                        src={relatedBook.coverImage}
                        alt={`${relatedBook.title} cover`}
                        fill
                        sizes="(min-width: 1280px) 180px, (min-width: 1024px) 160px, 45vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-foreground line-clamp-2">{relatedBook.title}</p>
                      <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{relatedBook.author}</p>
                      <p className="text-sm font-semibold text-primary">{relatedBook.price}</p>
                    </div>
                    <Button size="sm" className="mt-auto rounded-full">
                      <Link href={`/shop/${relatedBook.id}`}>View details</Link>
                    </Button>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-4 hidden md:flex" />
          <CarouselNext className="-right-4 hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
};

export default RelatedBooks;
