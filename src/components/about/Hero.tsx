import Link from "next/link";
import { Sparkles } from "lucide-react";
import PageLayout from "@/tools/PageLayout";
import { Button } from "@/components/ui/button";

const AboutHero = () => {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-primary/5 via-background to-background">
      <div className="absolute -top-32 left-1/2 size-[520px] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
      <PageLayout>
        <div className="relative z-10 flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-primary/80">
              About Popy Library
            </span>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-foreground md:text-[54px] md:leading-[60px]">
                Empowering Bangladeshi learners with curated books, guidance,
                and community
              </h1>
              <p className="max-w-2xl text-base text-muted-foreground">
                From a single neighborhood shelf to a national learning
                platform, we help students and lifelong learners find the right
                resources—and the confidence—to chase their next big milestone.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-primary" />
                <span>Curated by librarians & subject coaches</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-primary" />
                <span>Hybrid learning experiences across Bangladesh</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="lg">
                <Link href="/shop">Explore collections</Link>
              </Button>
              <Button variant="ghost" size="lg">
                <Link href="/contact">
                  <span>Meet the team</span>
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative grid w-full gap-4 rounded-3xl border border-border/60 bg-background/80 p-8 text-sm text-muted-foreground shadow-xl lg:max-w-md">
            <div className="rounded-2xl border border-primary/30 bg-primary/10 p-6 text-primary">
              “Popy Library exists so every learner—no matter their postcode—can
              access the resources and mentors they need.”
            </div>
            <div className="space-y-2">
              <p className="text-base font-semibold text-foreground">
                What we believe
              </p>
              <ul className="space-y-1 text-sm">
                <li>
                  • Libraries are catalysts for confident, independent learning.
                </li>
                <li>
                  • Community mentorship accelerates exam prep and creative
                  growth.
                </li>
                <li>
                  • Local stories deserve world-class publishing and
                  distribution.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </PageLayout>
    </section>
  );
};

export default AboutHero;
