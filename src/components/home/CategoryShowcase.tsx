import Link from "next/link";
import {
  GraduationCap,
  BookOpenCheck,
  Globe,
  PenLine,
  BookCopy,
  Sparkles,
} from "lucide-react";
import PageLayout from "@/tools/PageLayout";

const categories = [
  {
    title: "Play Group & Nursery",
    description: "Picture books, activity kits, and early learning cards for curious beginners.",
    href: "/collections/play-group-nursery",
    accent: "from-emerald-200/40 via-emerald-100/30 to-transparent",
    icon: BookOpenCheck,
  },
  {
    title: "KG & Class One",
    description: "Phonics, handwriting, and foundational math to build classroom confidence.",
    href: "/collections/kg-class-one",
    accent: "from-indigo-200/40 via-indigo-100/30 to-transparent",
    icon: Sparkles,
  },
  {
    title: "Primary (Class Two-Five)",
    description: "NCTB-aligned guides, homework helpers, and PSC preparation resources.",
    href: "/collections/primary-class-two-five",
    accent: "from-amber-200/40 via-amber-100/30 to-transparent",
    icon: PenLine,
  },
  {
    title: "Junior Secondary (Class Six-Eight)",
    description: "Textbooks, guide books, and model tests to stay ahead of classwork.",
    href: "/collections/junior-secondary",
    accent: "from-violet-200/40 via-violet-100/30 to-transparent",
    icon: BookCopy,
  },
  {
    title: "Secondary (Class Nine-SSC)",
    description: "Board question banks, creative answers, and SSC exam strategies.",
    href: "/collections/secondary-ssc",
    accent: "from-sky-200/40 via-sky-100/30 to-transparent",
    icon: Globe,
  },
  {
    title: "Higher Secondary (HSC)",
    description: "Suggestions, model tests, and admission prep designed for HSC success.",
    href: "/collections/hsc",
    accent: "from-rose-200/40 via-rose-100/30 to-transparent",
    icon: GraduationCap,
  },
];

const CategoryShowcase = () => {
  return (
      <PageLayout>
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Browse by collection
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Reading for every chapter of life
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            Discover curated collections tailored to students, lifelong learners, and avid readers.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className="group relative overflow-hidden rounded-3xl border border-border/40 bg-background/80 p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div
                className={`absolute inset-x-0 top-0 h-32 bg-linear-to-b ${category.accent} pointer-events-none`}
              />
              <div className="relative flex h-full flex-col gap-4">
                <div className="inline-flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary shadow-sm">
                  <category.icon className="size-6" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-foreground">{category.title}</h3>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </div>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  Explore collection
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
                <div className="mt-auto h-px w-full bg-border/60" />
              </div>
            </Link>
          ))}
        </div>
      </PageLayout>
  );
};

export default CategoryShowcase;
