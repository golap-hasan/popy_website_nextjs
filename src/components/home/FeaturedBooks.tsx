import Image from "next/image";
import { Button } from "@/components/ui/button";
import PageLayout from "@/tools/PageLayout";
import { ShoppingCart } from "lucide-react";

const featuredBooks = [
  {
    title: "Popy English For Today",
    author: "Popy Publications",
    price: "৳575",
    tag: "New",
    description: "A complete guide aligned with the latest NCTB syllabus.",
    image: "/english.png",
  },
  {
    title: "পপি মাধ্যমিক বিজ্ঞান",
    author: "Md. Shafiqul Islam",
    price: "৳416",
    tag: "Best Seller",
    description: "Step-by-step explanations and exam-focused notes for class 9-10.",
    image: "/biggan.png",
  },
  {
    title: "পপি মাধ্যমিক গণিত",
    author: "Kamrul Hasan",
    price: "৳648",
    tag: "Top Rated",
    description: "Concept-driven problem sets with solved model tests.",
    image: "/gonit.png",
  },
  {
    title: "The Rural Diaries",
    author: "Hilarie Burton",
    price: "৳880",
    tag: "Imported",
    description: "Heartwarming stories that celebrate simple living and community.",
    image: "/banking.png",
  },
];

const FeaturedBooks = () => {
  return (
      <PageLayout>
        <div className="flex flex-col gap-3 text-center">
          <span className="mx-auto rounded-full bg-secondary/20 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-secondary-foreground">
            Featured selection
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            This month’s readers’ favourites
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Curated picks from our community and editors to help you decide what to read next.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {featuredBooks.map((book) => (
            <div
              key={book.title}
              className="group relative flex h-full flex-col gap-4 rounded-3xl border border-border/50 bg-background/80 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
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
                <span className="absolute left-3 top-3 inline-flex rounded-full bg-primary/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-foreground">
                  {book.tag}
                </span>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground">
                  {book.title}
                </h3>
                <p className="text-sm text-muted-foreground">{book.author}</p>
                <p className="text-sm text-muted-foreground/90">{book.description}</p>
              </div>
              <div className="mt-auto flex items-center justify-between">
                <span className="text-xl font-bold text-primary">{book.price}</span>
                <Button size="sm" className="rounded-full px-4">
                  <ShoppingCart className="mr-2 size-4" />
                  Add to cart
                </Button>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-1 rounded-b-3xl bg-linear-to-r from-primary/20 via-primary/40 to-primary/20 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </PageLayout>
  );
};

export default FeaturedBooks;
