"use client";

import Image from "next/image";
import Link from "next/link";
import PageLayout from "@/tools/PageLayout";
import { Button } from "@/components/ui/button";
import { Award, BookOpen, Sparkles, Star } from "lucide-react";

const categories = [
  {
    name: "Academic mastery",
    count: "1,200+ textbooks",
    icon: <BookOpen className="size-5" />,
  },
  {
    name: "Bangla literature",
    count: "850+ classics",
    icon: <Award className="size-5" />,
  },
  {
    name: "Best sellers",
    count: "500+ favourites",
    icon: <Star className="size-5" />,
  },
  {
    name: "Creative reads",
    count: "400+ picks",
    icon: <Sparkles className="size-5" />,
  },
];

const bookCovers = [
  { src: "/english.png", alt: "Popy English for Today cover" },
  { src: "/gonit.png", alt: "Popy Mathematics guide cover" },
  { src: "/biggan.png", alt: "Popy Science companion cover" },
  { src: "/podartho.png", alt: "Popy Physics guide cover" },
  { src: "/banking.png", alt: "Banking reference book cover" },
  { src: "/tottho.png", alt: "Information technology guide cover" },
];

const readerFavourites = [
  {
    title: "Popy English For Today",
    author: "Popy Publications",
    price: "৳575",
  },
  {
    title: "পপি মাধ্যমিক বিজ্ঞান",
    author: "Popy Publications",
    price: "৳416",
  },
  {
    title: "পপি মাধ্যমিক গণিত",
    author: "Popy Publications",
    price: "৳648",
  },
];

const trustSignals = [
  { label: "Happy readers", value: "58K+", helper: "Across Bangladesh" },
  { label: "Curated titles", value: "12K+", helper: "Print & digital" },
  { label: "Delivery speed", value: "48h", helper: "Inside Dhaka" },
  { label: "Support hours", value: "9am–10pm", helper: "Everyday" },
];

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-background via-muted/40 to-background">
      <div className="absolute inset-0 opacity-[0.12]">
        <div className="absolute inset-0 bg-[url('/pattern.png')] bg-repeat opacity-30" />
      </div>

      <PageLayout className="relative z-10 py-20">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <span className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                Read beyond the syllabus
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Discover curated learning journeys for every Bangladeshi reader
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
                From exam-ready study guides to inspiring novels, the Popy shelves are stocked with expert-approved picks
                you can browse online and receive anywhere in the country.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
              <Button size="lg" className="px-6" >
                <Link href="/collections">Browse collections</Link>
              </Button>
              <Button variant="ghost" size="lg" className="px-6" >
                <Link href="/about">Meet the librarians</Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {categories.map((category) => (
                <div
                  key={category.name}
                  className="group rounded-2xl border border-border/50 bg-background/80 p-4 text-left transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex size-9 items-center justify-center rounded-full border border-border/40 bg-muted/40 text-primary">
                      {category.icon}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{category.name}</p>
                      <p className="text-xs text-muted-foreground">{category.count}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 hidden rounded-[48px] bg-linear-to-tr from-primary/15 via-primary/5 to-transparent blur-3xl lg:block" />
            <div className="relative overflow-hidden rounded-[42px] border border-border/40 bg-background/90 p-6 shadow-xl backdrop-blur">
              <div className="grid gap-4 sm:grid-cols-3">
                {bookCovers.map((book, index) => (
                  <div
                    key={book.src}
                    className={`relative aspect-3/4 overflow-hidden rounded-2xl border border-border/40 bg-muted/30 shadow-sm transition-transform duration-300 ${
                      index % 3 === 0 ? "translate-y-4" : index % 3 === 1 ? "-translate-y-2" : "translate-y-6"
                    }`}
                  >
                    <Image src={book.src} alt={book.alt} fill sizes="(min-width: 1024px) 220px, 45vw" className="object-cover" />
                  </div>
                ))}
              </div>

              <div className="mt-8 space-y-4 rounded-2xl border border-border/40 bg-background/95 p-6 text-sm text-muted-foreground shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                    Reader favourites
                  </span>
                  <Link href="/collections" className="text-xs font-semibold text-primary hover:underline">
                    See all
                  </Link>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {readerFavourites.map((book) => (
                    <div key={book.title} className="space-y-1">
                      <p className="text-sm font-semibold text-foreground line-clamp-2">{book.title}</p>
                      <p className="text-xs text-muted-foreground">{book.author}</p>
                      <p className="text-sm font-semibold text-primary">{book.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-4 rounded-3xl border border-border/40 bg-background/90 p-6 shadow-sm md:grid-cols-2 lg:grid-cols-4">
          {trustSignals.map((signal) => (
            <div key={signal.label} className="rounded-2xl border border-border/40 bg-background/70 p-5 text-center">
              <p className="text-3xl font-bold text-primary">{signal.value}</p>
              <p className="text-sm font-semibold text-foreground">{signal.label}</p>
              <p className="text-xs text-muted-foreground">{signal.helper}</p>
            </div>
          ))}
        </div>
      </PageLayout>
    </section>
  );
};

export default Hero;
