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
        {books.map(book => (
          <article
            key={book.slug}
            className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/50 bg-background/80 p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <Link
              href={`/shop/${book.slug}`}
              className="flex flex-1 flex-col gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              aria-label={`View details for ${book.title}`}
            >
              <div className="relative overflow-hidden rounded-xl border border-border/40 bg-muted/20">
                <div className="aspect-2/3 w-full mx-auto">
                  <Image
                    src={book.coverImage}
                    alt={`${book.title} cover`}
                    width={160}
                    height={220}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(min-width: 1280px) 200px, (min-width: 768px) 220px, 80vw"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="line-clamp-1 text-sm font-semibold text-foreground">
                  {book.title}
                </h3>
              </div>
            </Link>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-base font-bold text-primary">
                ৳{book.price}
              </span>
              <Button
                size="icon"
                className="h-8 w-8 rounded-full"
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
                <ShoppingCart className="h-4 w-4" />
                <span className="sr-only">Add to cart</span>
              </Button>
            </div>
          </article>
        ))}
      </div>
    </PageLayout>
  );
};

export default FeaturedBooks;
