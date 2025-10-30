import type { Metadata } from "next";
import PageLayout from "@/tools/PageLayout";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "New Arrivals | Popy Library",
  description:
    "Explore new arrivals at Popy Library. Fresh releases and updated editions for smarter study.",
};

const NewArrivalsCollectionPage = () => {
  return (
    <PageLayout className="screen-height">
      <div className="space-y-8">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/80">Collections</p>
          <h1 className="text-3xl font-semibold text-foreground md:text-4xl">New Arrivals</h1>
          <p className="max-w-3xl text-sm text-muted-foreground">Fresh off the press—latest releases and updated editions.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-border/50 bg-background/95">
            <CardContent className="space-y-2 p-6">
              <p className="text-lg font-semibold text-foreground">Recent Release A</p>
              <p className="text-sm text-muted-foreground">Quick overview of a new title.</p>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-background/95">
            <CardContent className="space-y-2 p-6">
              <p className="text-lg font-semibold text-foreground">Recent Release B</p>
              <p className="text-sm text-muted-foreground">Another new book to explore.</p>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-background/95">
            <CardContent className="space-y-2 p-6">
              <p className="text-lg font-semibold text-foreground">Recent Release C</p>
              <p className="text-sm text-muted-foreground">Updated edition highlights.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default NewArrivalsCollectionPage;
