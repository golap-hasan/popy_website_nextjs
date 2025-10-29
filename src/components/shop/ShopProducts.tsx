import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";

const books = [
  {
    title: "Popy English For Today",
    author: "Popy Publications",
    price: "৳575",
    rating: 4.8,
    badge: "New",
    description: "Aligned with the latest NCTB syllabus for confident exam prep.",
  },
  {
    title: "HSC Bangla Literature Anthology",
    author: "Dr. Muhammed Zafar Iqbal",
    price: "৳420",
    rating: 4.6,
    badge: "Best Seller",
    description: "Curated poems, prose, and annotations tailored for board exams.",
  },
  {
    title: "BCS Question Bank",
    author: "Notion Press",
    price: "৳690",
    rating: 4.7,
    badge: "Focus Series",
    description: "Solved papers and strategy tips covering 38th to latest BCS exams.",
  },
  {
    title: "IELTS Writing Masterclass",
    author: "Redowan Hasan",
    price: "৳520",
    rating: 4.5,
    badge: "English",
    description: "Step-by-step frameworks to secure band 7+ in the writing module.",
  },
  {
    title: "Science Olympiad Playbook",
    author: "Chotoder Biggan",
    price: "৳480",
    rating: 4.9,
    badge: "Academic",
    description: "Problem drills and concept refreshers for school & college olympiads.",
  },
  {
    title: "Story-Driven Programming",
    author: "Tasnia Raihan",
    price: "৳450",
    rating: 4.4,
    badge: "Kids",
    description: "A playful introduction to coding concepts for curious young minds.",
  },
];

const ShopProducts = () => {
  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-foreground">Featured titles</h2>
        <p className="text-sm text-muted-foreground">
          Recommendations inspired by what readers are browsing right now.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {books.map((book) => (
          <div
            key={book.title}
            className="group relative flex h-full flex-col gap-5 rounded-3xl border border-border/40 bg-background/90 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <span className="inline-flex w-fit items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              {book.badge}
            </span>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">
                {book.title}
              </h3>
              <p className="text-sm text-muted-foreground">{book.author}</p>
              <p className="text-sm text-muted-foreground/90">{book.description}</p>
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="inline-flex items-center gap-1 rounded-full bg-primary/5 px-3 py-1 text-primary">
                <Star className="size-4 fill-current" />
                {book.rating}
              </div>
              <span className="text-lg font-semibold text-primary">{book.price}</span>
            </div>

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
