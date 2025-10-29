import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {detail.related.map((relatedBook) => (
          <Card key={relatedBook.id} className="group border-border/50 bg-background/92">
            <CardContent className="space-y-4 p-6">
              <div className="relative overflow-hidden rounded-2xl border border-border/40 bg-muted/20">
                <Image
                  src={relatedBook.coverImage}
                  alt={`${relatedBook.title} cover`}
                  width={220}
                  height={300}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-foreground line-clamp-2">{relatedBook.title}</p>
                <p className="text-xs text-muted-foreground">{relatedBook.author}</p>
                <p className="text-sm font-semibold text-primary">{relatedBook.price}</p>
              </div>
              <Button className="w-full rounded-full">
                <Link href={`/shop/${relatedBook.id}`}>View details</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default RelatedBooks;
