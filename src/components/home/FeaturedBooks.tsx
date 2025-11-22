"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageLayout from '@/tools/PageLayout';
import { useAddToCart } from '@/hooks/useAddToCart';
import type { Book } from '@/types/shop';
type HomepageBook = {
  title: string;
  slug: string;
  price: number;
  coverImage: string;
};

type FeaturedBooksProps = {
  books: HomepageBook[];
};

const FeaturedBooks = ({ books }: FeaturedBooksProps) => {
  const { handleAddToCart } = useAddToCart();

  return (
    <PageLayout>
      <div className="flex flex-col gap-3 text-center">
        <span className="mx-auto rounded-full bg-secondary/20 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-secondary-foreground">
          Featured selection
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          This month&apos;s readers&apos; favourites
        </h2>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Curated picks from our community and editors to help you decide what
          to read next.
        </p>
      </div>

      <div className="mt-10 grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
        {books.map((book, index) => (
          <article
            key={book.slug}
            className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/40 bg-background/90 p-3 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
          >
            {/* Top ribbon */}
            <div className="pointer-events-none absolute left-0 top-0 z-10 rounded-br-2xl bg-primary/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-foreground">
              {index === 0 ? "Editors pick" : "Featured"}
            </div>

            <Link
              href={`/shop/${book.slug}`}
              className="flex flex-1 flex-col gap-3 pt-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              aria-label={`View details for ${book.title}`}
            >
              <div className="relative overflow-hidden rounded-xl border border-border/40 bg-muted/20">
                <div className="aspect-2/3 w-full mx-auto">
                  <Image
                    src={book.coverImage}
                    alt={`${book.title} cover`}
                    width={160}
                    height={220}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[1.5deg]"
                    sizes="(min-width: 1280px) 200px, (min-width: 768px) 220px, 80vw"
                  />
                </div>

                {/* Soft hover overlay */}
                <div className="pointer-events-none absolute inset-0 opacity-0 bg-linear-to-t from-background/60 via-transparent to-transparent transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              <div className="space-y-1">
                <h3 className="line-clamp-1 text-sm font-semibold text-foreground">
                  {book.title}
                </h3>
                <p className="text-[11px] text-muted-foreground">
                  Curated by Popy editors
                </p>
              </div>
            </Link>

            {/* Price + cart pill */}
            <div className="mt-3 flex items-center justify-between rounded-full bg-primary/5 px-2 py-1">
              <span className="text-xs font-semibold text-primary">
                ৳{book.price}
              </span>
              <Button
                size="icon"
                className="h-7 w-7 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => {
                  const minimalBook: Partial<Book> & {
                    title: string;
                    price: number | string;
                    slug: string;
                    coverImage?: string;
                  } = {
                    _id: book.slug,
                    slug: book.slug,
                    title: book.title,
                    price: book.price,
                    coverImage: book.coverImage,
                  };

                  handleAddToCart(minimalBook as Book);
                }}
              >
                <ShoppingCart className="h-3.5 w-3.5" />
                <span className="sr-only">Add to cart</span>
              </Button>
            </div>

            {/* Subtle bottom accent */}
            <div className="pointer-events-none absolute inset-x-3 bottom-2 h-px rounded-full bg-linear-to-r from-primary/10 via-primary/40 to-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </article>
        ))}
      </div>
    </PageLayout>
  );
};

export default FeaturedBooks;
