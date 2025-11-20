"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart } from "lucide-react";
import type { Book } from "@/types/shop";
import { StarRating } from "@/tools/StarRating";
import { useAddToCart } from "@/hooks/useAddToCart";
import { useWishlist } from "@/hooks/useWishlist";
import Image from "next/image";
export type SortOption = "popularity" | "newest" | "price_low_high";
type ShopProductsProps = {
  books?: Book[];
};

const ShopProducts = ({ books }: ShopProductsProps) => {
  const { handleAddToCart } = useAddToCart();
  const { handleAddToWishlist } = useWishlist();
  const safeBooks: Book[] = Array.isArray(books) ? books : [];

  if (safeBooks.length === 0) {
    return (
      <section className="space-y-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-foreground">
            Featured titles
          </h2>
          <p className="text-sm text-muted-foreground">
            Recommendations inspired by what readers are browsing right now.
          </p>
        </div>

        <div className="rounded-3xl border border-dashed border-border/60 bg-background/80 p-8 text-center text-sm text-muted-foreground">
          No books matched your search. Try adjusting the filters or browsing
          another category.
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {safeBooks.map((book, i) => (
          <div
            key={String(
              book._id ?? book.id ?? book.slug ?? `${book.title}-${i}`
            )}
            className="group relative flex h-full flex-col gap-5 overflow-hidden rounded-lg border border-border/40 bg-background/90 p-2 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <Link
              href={book.slug ? `/shop/${book.slug}` : `/shop/1`}
              className="flex flex-1 flex-col gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              aria-label={`View details for ${book.title}`}
            >
              <div className="relative overflow-hidden rounded-lg border border-border/40 bg-muted/20">
                <Image
                  src={book.coverImage}
                  alt={`${book.title} cover`}
                  width={200} 
                  height={200}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 z-10 opacity-0 backdrop-blur-xs rounded-lg transition-opacity duration-200 group-hover:opacity-100" />
                {book.badge ? (
                  <Badge className="absolute left-3 top-3 z-20 bg-primary">
                    {book.badge}
                  </Badge>
                ) : null}
              </div>

              <div className="grid gap-2">
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-foreground line-clamp-1">
                    {book.title}
                  </h3>
                  {book.author ? (
                    <p className="text-xs text-muted-foreground">
                      {book.author}
                    </p>
                  ) : null}
                </div>

                <div className="mt-auto flex items-center justify-between text-sm text-muted-foreground">
                  <div className="inline-flex items-center gap-1 rounded-full text-primary">
                    <StarRating
                      rating={book?.rating as number}
                      totalStars={1}
                      size={14}
                    />
                    <span>{book?.rating?.toFixed(1)}</span>
                  </div>
                  <span className="text-xs font-semibold text-primary">
                    ৳
                    {typeof book.price === "number"
                      ? book.price
                      : book.price ?? ""}
                  </span>
                </div>
              </div>
            </Link>

            <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-end pb-24 gap-3">
              <Button
                size="sm"
                className="pointer-events-auto gap-2 rounded-full bg-primary text-primary-foreground opacity-0 shadow-lg transition-all duration-200 hover:bg-primary/90 focus-visible:opacity-100 focus-visible:shadow-xl group-hover:-translate-y-1 group-hover:opacity-100 group-hover:shadow-xl"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleAddToWishlist(book);
                }}
              >
                <Heart />
                Add to wishlist
              </Button>

              <Button
                size="sm"
                className="pointer-events-auto gap-2 rounded-full bg-primary text-primary-foreground opacity-0 shadow-lg transition-all duration-200 hover:bg-primary/90 focus-visible:opacity-100 focus-visible:shadow-xl group-hover:-translate-y-1 group-hover:opacity-100 group-hover:shadow-xl"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleAddToCart(book);
                }}
              >
                <ShoppingCart />
                <span className="hidden sm:inline">Add to cart</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShopProducts;
