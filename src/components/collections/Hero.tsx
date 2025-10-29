import Link from "next/link";
import { Sparkles } from "lucide-react";
import PageLayout from "@/tools/PageLayout";
import { Button } from "@/components/ui/button";

const CollectionHero = () => {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-primary/10 via-primary/5 to-transparent">
      <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-primary/30 via-primary/20 to-transparent blur-3xl" />
      <PageLayout>
        <div className="relative z-10 flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-6 mb-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-primary/80">
            Curated collections
          </span>
          <div className="space-y-4">
            <h1 className="max-w-5xl text-4xl font-semibold leading-tight text-foreground md:text-[54px] md:leading-[60px]">
              Discover learning journeys handpicked for every reader
            </h1>
            <p className="max-w-xl text-base text-muted-foreground">
              Whether you&apos;re preparing for exams, exploring literature, or building new habits—our librarians have
              curated bundles to keep your bookshelf inspiring year-round.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-primary" />
              <span>12 themed collections updated monthly</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-primary" />
              <span>Guided reading roadmaps & study prompts</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="lg">Start browsing collections</Button>
            <Button variant="ghost" size="lg">
              <Link href="#membership">Membership perks</Link>
            </Button>
          </div>
        </div>
        <div className="relative mt-8 grid w-full gap-4 rounded-3xl border border-primary/20 bg-background/80 p-6 text-sm text-muted-foreground shadow-xl lg:mt-0 lg:max-w-sm">
          <div className="rounded-2xl border border-primary/30 bg-primary/10 p-5 text-primary">
            “We built these collections for Bangladeshi learners craving guidance beyond the syllabus.”
          </div>
          <div className="space-y-2">
            <p className="text-base font-semibold text-foreground">Why collections?</p>
            <ul className="space-y-1 text-sm">
              <li>• Organised learning tracks crafted by librarians</li>
              <li>• Mix of print, digital, and multimedia resources</li>
              <li>• Bundled savings vs. buying single titles</li>
            </ul>
          </div>
        </div>
      </div>
      </PageLayout>
    </section>
  );
};

export default CollectionHero;
