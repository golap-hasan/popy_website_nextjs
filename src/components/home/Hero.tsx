"use client";
import {
  Search,
  BookOpen,
  Award,
  Star,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useRef, useState } from "react";
import type { CarouselApi } from "@/components/ui/carousel";
import PageLayout from "@/tools/PageLayout";

const Hero = () => {
  const categories = [
    {
      name: "Academic",
      count: "1,200+ Books",
      icon: <BookOpen className="w-5 h-5" />,
    },
    {
      name: "Bangla Literature",
      count: "850+ Books",
      icon: <Award className="w-5 h-5" />,
    },
    {
      name: "Best Sellers",
      count: "500+ Books",
      icon: <Star className="w-5 h-5" />,
    },
  ];

  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!carouselApi) return;
    setCount(carouselApi.scrollSnapList().length);
    setCurrent(carouselApi.selectedScrollSnap());

    const onSelect = () => setCurrent(carouselApi.selectedScrollSnap());
    carouselApi.on("select", onSelect);
    carouselApi.on("reInit", onSelect);

    return () => {
      carouselApi.off("select", onSelect);
      carouselApi.off("reInit", onSelect);
    };
  }, [carouselApi]);

  useEffect(() => {
    if (!carouselApi) return;
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      if (!carouselApi) return;
      if (carouselApi.canScrollNext()) carouselApi.scrollNext();
      else carouselApi.scrollTo(0);
    }, 3000);
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [carouselApi]);

  const featuredBooks = [
    {
      title: "Popy English For Today { A Helping Book}",
      author: "Popy Publications",
      price: "৳575",
    },
    {
      title: "পপি মাধ্যমিক বিজ্ঞান",
      author: "Popy Publications",
      price: "৳416",
    },
    {
      title: "পপি মাধ্যমিক গনিত",
      author: "Popy Publications",
      price: "৳648",
    },
    {
      title: "The Namesake",
      author: "Jhumpa Lahiri",
      price: "৳350",
    },
  ];

  return (
    <section className="flex flex-col justify-center items-center relative bg-linear-to-r from-background to-muted/50 overflow-hidden h-[calc(100vh-81px)]">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
        <div className="absolute inset-0 bg-[url('/pattern.png')] bg-repeat opacity-5" />
      </div>
      <div className="pointer-events-none absolute -top-24 -left-24 size-96 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 size-96 rounded-full bg-secondary/15 blur-3xl" />

      <PageLayout className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Discover Your Next{" "}
              <span className="bg-linear-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">
                Favorite Book
              </span>{" "}
              in Bangladesh
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              Explore thousands of books from Bangladeshi authors and
              publishers. Get your favorite books delivered to your doorstep.
            </p>

            {/* Search bar */}
            <div className="relative max-w-2xl mx-auto lg:mx-0">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for books, authors, or categories..."
                className="pl-12 pr-36 py-6 rounded-full border border-border/60 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-background/70 backdrop-blur supports-backdrop-filter:backdrop-saturate-150 shadow-sm"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
                <Button
                  size="lg"
                  className="rounded-full px-6 h-10 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Search
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-6 h-10"
                >
                  Browse
                </Button>
              </div>
            </div>

            {/* Categories */}
            <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-3">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-card text-card-foreground px-4 py-2 rounded-full shadow-sm border hover:shadow-md hover:scale-105 transition-all duration-200 cursor-pointer"
                >
                  <span className="text-primary">{category.icon}</span>
                  <div className="text-left">
                    <p className="text-sm font-medium">
                      {category.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {category.count}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right content - Book showcase */}
          <div className="relative hidden lg:block">
            <div className="relative w-full h-[560px]">
              <div className="absolute -right-10 -top-10 w-72 h-96 bg-primary/10 rounded-3xl blur-xl" />
              <div className="absolute -left-12 -bottom-12 w-80 h-96 bg-secondary/10 rounded-3xl blur-xl" />
              <div className="relative w-full h-full flex items-center justify-center">
                <Carousel
                  className="w-full max-w-3xl"
                  opts={{ loop: true, align: "center" }}
                  setApi={setCarouselApi}
                >
                  <CarouselContent>
                    {featuredBooks.map((book, index) => (
                      <CarouselItem key={index} className="basis-auto">
                        <div className="relative rounded-[28px] p-0.5 bg-linear-to-br from-primary/40 via-primary/10 to-transparent">
                          <div className="w-[420px] h-[460px] max-w-full bg-card text-card-foreground rounded-[26px] shadow-xl overflow-hidden transition-all duration-300 ring-1 ring-border/60 hover:ring-primary/40 hover:shadow-2xl">
                            <div className="h-[62%] bg-linear-to-br from-primary/15 via-primary/25 to-secondary/20 relative overflow-hidden">
                              <div className="absolute inset-0 bg-[url('/book-pattern.png')] opacity-5" />
                              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-4/5 h-1 bg-white/40 rounded-full" />
                            </div>
                            <div className="p-6 flex flex-col gap-3">
                              <h3 className="text-xl font-semibold text-foreground line-clamp-2">
                                {book.title}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {book.author}
                              </p>
                              <div className="mt-auto flex items-center justify-between">
                                <span className="text-2xl font-bold text-primary">
                                  {book.price}
                                </span>
                                <Button size="sm" className="rounded-full px-4">
                                  <ShoppingCart className="h-4 w-4 mr-1" />
                                  Add
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  {/* <CarouselPrevious className="left-6 size-11 border-border/60 bg-background/90 backdrop-blur hover:bg-background" />
                  <CarouselNext className="right-6 size-11 border-border/60 bg-background/90 backdrop-blur hover:bg-background" /> */}
                </Carousel>
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
                  {Array.from({ length: count }).map((_, i) => (
                    <button
                      key={i}
                      aria-label={`Go to slide ${i + 1}`}
                      onClick={() => carouselApi?.scrollTo(i)}
                      className={
                        "h-3 w-3 rounded-full transition-all " +
                        (i === current ? "bg-primary w-8" : "bg-muted-foreground/30")
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-3xl font-bold text-primary">
                10K+
              </h3>
              <p className="text-muted-foreground">Happy Readers</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-primary">
                50K+
              </h3>
              <p className="text-muted-foreground">
                Books Available
              </p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-primary">
                100%
              </h3>
              <p className="text-muted-foreground">
                Authentic Books
              </p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-primary">
                24/7
              </h3>
              <p className="text-muted-foreground">
                Customer Support
              </p>
            </div>
          </div>
        </div>
      </PageLayout>
    </section>
  );
};

export default Hero;
