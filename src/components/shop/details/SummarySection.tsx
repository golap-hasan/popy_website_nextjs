"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, ShieldCheck, Truck, Bookmark, ShoppingBag } from "lucide-react";
import { useWishlist } from "@/hooks/useWishlist";
import { useAddToCart } from "@/hooks/useAddToCart";
import { Book } from "@/types/shop";

const SummarySection = ({ book }: { book: Book }) => {
  const { handleAddToWishlist } = useWishlist();
  const { handleAddToCart } = useAddToCart();
  const priceNumber = Number(book.price ?? 0);
  const originalNumber = Number(book.originalPrice ?? 0);

  const discount =
    originalNumber && priceNumber
      ? Math.max(
        0,
        Math.round(((originalNumber - priceNumber) / originalNumber) * 100)
      )
      : null;

  return (
    <section className="relative overflow-hidden bg-background/95">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="space-y-6">
          <Badge
            variant="secondary"
            className="w-fit bg-primary/15 text-primary"
          >
            {book.tag}
          </Badge>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-[48px]">
              {book.title}
            </h1>
            {book.subtitle ? (
              <p className="text-lg text-muted-foreground">{book.subtitle}</p>
            ) : null}
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-primary">
              <Star className="size-4 fill-current" />
              <span className="font-semibold text-foreground">
                {Number(book.rating ?? 0).toFixed(1)}
              </span>
              <span>({book.reviewsCount} reviews)</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/50 px-4 py-2">
              <ShieldCheck className="size-4 text-emerald-500" />
              Authentic Popy partners
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/50 px-4 py-2">
              <Truck className="size-4 text-primary" />
              48h delivery inside Dhaka
            </div>
          </div>
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            {book.description}
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <div className="space-y-1">
              <div className="flex items-end gap-2 text-3xl font-semibold text-primary">
                <span>৳{book.price}</span>
                {book.originalPrice ? (
                  <span className="text-base font-normal text-muted-foreground line-through">
                    ৳{book.originalPrice}
                  </span>
                ) : null}
              </div>
              {discount ? (
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-green-600">
                  Save {discount}% today
                </p>
              ) : null}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleAddToCart(book);
                }}
                size="lg"
                className="rounded-full px-8"
              >
                <ShoppingBag /> Add to cart
              </Button>
              <Button
                size="icon-lg"
                variant="outline"
                className="rounded-full"
                onClick={() => handleAddToWishlist(book)}
              >
                <Bookmark />
              </Button>
              {/* <Button size="lg" variant="outline" className="rounded-full px-8">
                <Link href="#reviews">Read reviews</Link>
              </Button> */}
            </div>
          </div>
          <Separator className="my-4" />
          <div className="grid gap-3 text-sm text-muted-foreground md:grid-cols-2">
            {book.highlights?.slice(0, 2).map((highlight) => (
              <div
                key={highlight}
                className="rounded-2xl border border-border/40 bg-muted/20 p-4"
              >
                {highlight}
              </div>
            ))}
          </div>
        </div>
        <div className="relative flex items-center justify-center">
          <div className="absolute -top-12 right-10 hidden size-72 rounded-full bg-primary/20 blur-3xl md:block" />
          <div className="absolute -bottom-12 left-0 hidden size-72 rounded-full bg-secondary/20 blur-3xl md:block" />
          <div className="relative overflow-hidden rounded-4xl border border-border/40 bg-background/70 p-5 shadow-lg">
            <div className="relative h-[420px] w-[300px] overflow-hidden rounded-2xl border border-border/40 bg-muted/30">
              <img
                src={book.coverImage}
                alt={`${book.title} cover`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SummarySection;
