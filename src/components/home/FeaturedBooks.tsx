import Image from "next/image";
import { Button } from "@/components/ui/button";
import PageLayout from "@/tools/PageLayout";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

const featuredBooks = [
  {
    id: 1,
    title: "Popy English For Today",
    author: "Popy Publications",
    price: "৳575",
    tag: "New",
    description: "Aligned with the latest NCTB syllabus for confident exam prep.",
    image: "/english.png",
  },
  {
    id: 2,
    title: "HSC Bangla Literature Anthology",
    author: "Dr. Muhammed Zafar Iqbal",
    price: "৳420",
    tag: "Best Seller",
    description: "Curated poems, prose, and annotations tailored for board exams.",
    image: "/tottho.png",
  },
  {
    id: 3,
    title: "BCS Question Bank",
    author: "Notion Press",
    price: "৳690",
    tag: "Focus Series",
    description: "Solved papers and strategy tips covering recent BCS examinations.",
    image: "/banking.png",
  },
  {
    id: 5,
    title: "Science Olympiad Playbook",
    author: "Chotoder Biggan",
    price: "৳480",
    tag: "Academic",
    description: "Problem drills and concept refreshers for school and college olympiads.",
    image: "/biggan.png",
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
            <article
              key={book.id}
              className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-3xl border border-border/50 bg-background/80 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <Link
                href={`/shop/${book.id}`}
                className="flex flex-1 flex-col gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
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
                  <span className="absolute left-3 top-3 inline-flex rounded-full bg-primary/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-foreground">
                    {book.tag}
                  </span>
                </div>
                <div className="space-y-2">
                  <h3 className="line-clamp-1 text-lg font-semibold text-foreground">
                    {book.title}
                  </h3>
                  <p className="line-clamp-1 text-sm text-muted-foreground">{book.author}</p>
                  <p className="line-clamp-1 text-sm text-muted-foreground/90">{book.description}</p>
                </div>
              </Link>
              <div className="mt-auto flex items-center justify-between">
                <span className="text-xl font-bold text-primary">{book.price}</span>
                <Button size="sm" className="rounded-full px-4">
                  <ShoppingCart />
                  Add to cart
                </Button>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-1 rounded-b-3xl bg-linear-to-r from-primary/20 via-primary/40 to-primary/20 transition-opacity duration-300 group-hover:opacity-100" />
            </article>
          ))}
        </div>
      </PageLayout>
  );
};

export default FeaturedBooks;
