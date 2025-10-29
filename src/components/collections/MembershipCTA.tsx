import Link from "next/link";
import PageLayout from "@/tools/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { membershipBenefits } from "./collection-data";

const MembershipCTA = () => {
  return (
    <section id="membership" className="bg-linear-to-b from-muted/40 via-background to-background">
      <PageLayout>
        <Card className="overflow-hidden border-border/50 bg-background/80 shadow-lg">
          <CardContent className="grid gap-10 p-10 lg:grid-cols-[1.4fr_0.6fr]">
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-primary">
                <Sparkles className="size-6" />
                <span className="text-xs font-semibold uppercase tracking-[0.35em]">Popy membership</span>
              </div>
              <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  Unlock curated collections delivered to you every month
                </h2>
                <p className="max-w-xl text-sm text-muted-foreground">
                  Join the Popy membership to receive personalised bundles, early access to new launches, and exclusive
                  invites to study clubs and workshops.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {membershipBenefits.map((benefit) => (
                  <div key={benefit.title} className="rounded-2xl border border-border/50 bg-muted/30 p-4">
                    <div className="flex items-center gap-3 text-primary">
                      <benefit.icon className="size-5" />
                      <p className="text-sm font-semibold text-foreground">{benefit.title}</p>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">{benefit.description}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <Button size="lg" className="px-6">
                  <Link href="/membership">Become a member</Link>
                </Button>
                <Button variant="ghost" size="lg" className="px-6">
                  <Link href="/contact">Talk to a curator</Link>
                </Button>
              </div>
            </div>
            <div className="space-y-5 rounded-3xl border border-border/50 bg-muted/40 p-8 text-sm text-muted-foreground">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.35em] text-primary/70">How it works</p>
                <h3 className="text-xl font-semibold text-foreground">Curated, delivered, enjoyed</h3>
                <p>
                  Tell us your learning goals and our librarians craft personalised bundles with books, digital resources,
                  and companion guides.
                </p>
              </div>
              <div className="space-y-2 rounded-2xl border border-border/50 bg-background/80 p-4">
                <p className="text-sm font-semibold text-foreground">What members say</p>
                <p className="text-xs text-muted-foreground">
                  "The monthly curation keeps my teen motivated. She&apos;s exploring Bangla literature alongside science prep!"
                </p>
                <p className="text-xs text-primary">— Samira, parent of a Class 9 student</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </PageLayout>
    </section>
  );
};

export default MembershipCTA;
