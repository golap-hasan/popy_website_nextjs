"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";

const books = [
  {
    id: 1,
    title: "Popy English For Today",
    author: "Popy Publications",
    price: "৳575",
    rating: 4.8,
    badge: "New",
    description: "Aligned with the latest NCTB syllabus for confident exam prep.",
    image: "/english.png",
  },
  {
    id: 2,
    title: "HSC Bangla Literature Anthology",
    author: "Dr. Muhammed Zafar Iqbal",
    price: "৳420",
    rating: 4.6,
    badge: "Best Seller",
    description: "Curated poems, prose, and annotations tailored for board exams.",
    image: "/tottho.png",
  },
  {
    id: 3,
    title: "BCS Question Bank",
    author: "Notion Press",
    price: "৳690",
    rating: 4.7,
    badge: "Focus Series",
    description: "Solved papers and strategy tips covering 38th to latest BCS exams.",
    image: "/banking.png",
  },
  {
    id: 4,
    title: "IELTS Writing Masterclass",
    author: "Redowan Hasan",
    price: "৳520",
    rating: 4.5,
    badge: "English",
    description: "Step-by-step frameworks to secure band 7+ in the writing module.",
    image: "/english.png",
  },
  {
    id: 5,
    title: "Science Olympiad Playbook",
    author: "Chotoder Biggan",
    price: "৳480",
    rating: 4.9,
    badge: "Academic",
    description: "Problem drills and concept refreshers for school & college olympiads.",
    image: "/biggan.png",
  },
  {
    id: 6,
    title: "Story-Driven Programming",
    author: "Tasnia Raihan",
    price: "৳450",
    rating: 4.4,
    badge: "Kids",
    description: "A playful introduction to coding concepts for curious young minds.",
    image: "/gonit.png",
  },
  {
    id: 7,
    title: "IELTS Writing Masterclass",
    author: "Redowan Hasan",
    price: "৳520",
    rating: 4.5,
    badge: "English",
    description: "Step-by-step frameworks to secure band 7+ in the writing module.",
    image: "/english.png",
  },
  {
    id: 8,
    title: "Science Olympiad Playbook",
    author: "Chotoder Biggan",
    price: "৳480",
    rating: 4.9,
    badge: "Academic",
    description: "Problem drills and concept refreshers for school & college olympiads.",
    image: "/biggan.png",
  },
  {
    id: 9,
    title: "Story-Driven Programming",
    author: "Tasnia Raihan",
    price: "৳450",
    rating: 4.4,
    badge: "Kids",
    description: "A playful introduction to coding concepts for curious young minds.",
    image: "/gonit.png",
  },
];

export type SortOption = "popularity" | "newest" | "price_low_high";

type ShopProductsProps = {
  searchTerm: string;
  sortOption: SortOption;
  onResultsChange?: (count: number) => void;
};

const normalisePrice = (price: string) => {
  const numeric = price.replace(/[^0-9]/g, "");
  return Number.parseInt(numeric || "0", 10);
};

const ShopProducts = ({ searchTerm, sortOption, onResultsChange }: ShopProductsProps) => {
  const query = searchTerm.trim().toLowerCase();

  const filteredBooks = books.filter((book) => {
    if (!query) {
      return true;
    }

    return (
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.badge.toLowerCase().includes(query)
    );
  });

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortOption) {
      case "price_low_high":
        return normalisePrice(a.price) - normalisePrice(b.price);
      case "newest":
        return (b.id ?? 0) - (a.id ?? 0);
      case "popularity":
      default:
        return b.rating - a.rating;
    }
  });

  useEffect(() => {
    onResultsChange?.(sortedBooks.length);
  }, [onResultsChange, sortedBooks.length]);

  if (sortedBooks.length === 0) {
    return (
      <section className="space-y-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-foreground">Featured titles</h2>
          <p className="text-sm text-muted-foreground">
            Recommendations inspired by what readers are browsing right now.
          </p>
        </div>

        <div className="rounded-3xl border border-dashed border-border/60 bg-background/80 p-8 text-center text-sm text-muted-foreground">
          No books matched your search. Try adjusting the filters or browsing another category.
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-8">
      {/* <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-foreground">Featured titles</h2>
        <p className="text-sm text-muted-foreground">
          Recommendations inspired by what readers are browsing right now.
        </p>
      </div> */}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {sortedBooks.map((book) => (
          <div
            key={book.id}
            className="group relative flex h-full flex-col gap-5 rounded-3xl border border-border/40 bg-background/90 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <Link
              href={`/shop/${book.id}`}
              className="flex flex-1 flex-col gap-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              aria-label={`View details for ${book.title}`}
            >
              <div className="relative overflow-hidden rounded-2xl border border-border/40 bg-muted/20">
                <Image
                  src={book.image}
                  alt={`${book.title} cover`}
                  width={260}
                  height={340}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(min-width: 1280px) 220px, (min-width: 768px) 240px, 80vw"
                />
                <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-primary/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-foreground">
                  {book.badge}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground line-clamp-1">
                  {book.title}
                </h3>
                <p className="text-sm text-muted-foreground">{book.author}</p>
                <p className="text-sm text-muted-foreground/90">{book.description}</p>
              </div>

              <div className="mt-auto flex items-center justify-between text-sm text-muted-foreground">
                <div className="inline-flex items-center gap-1 rounded-full bg-primary/5 px-3 py-1 text-primary">
                  <Star className="size-4 fill-current" />
                  {book.rating}
                </div>
                <span className="text-lg font-semibold text-primary">{book.price}</span>
              </div>
            </Link>

            <Button className="rounded-full" size="sm">
              <ShoppingCart className="mr-2 size-4" />
              Add to cart
            </Button>

            <div className="absolute inset-x-6 bottom-0 h-px bg-border/60" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShopProducts;
