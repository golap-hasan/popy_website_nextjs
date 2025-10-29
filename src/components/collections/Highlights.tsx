import { Card, CardContent } from "@/components/ui/card";
import PageLayout from "@/tools/PageLayout";
import { collectionHighlights } from "./collection-data";

const CollectionHighlights = () => {
  return (
    <PageLayout paddingSize="small">
      <div className="space-y-3">
        <div className="space-y-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/70">
            Why readers love these
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Curated paths with a purpose
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-muted-foreground">
            Each collection blends textbooks, guides, and multimedia companions
            to solve real learning challenges faced by students, parents, and
            professionals across Bangladesh.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {collectionHighlights.map((highlight) => (
            <Card
              key={highlight.title}
              className="relative overflow-hidden border-border/50 bg-background/80"
            >
              <div
                className={`pointer-events-none absolute inset-0 bg-linear-to-br ${highlight.accent}`}
              />
              <CardContent className="relative flex h-full flex-col gap-4 p-6 text-sm text-muted-foreground">
                <div className="inline-flex size-12 items-center justify-center rounded-full border border-primary/40 bg-background/80 text-primary shadow-sm">
                  <highlight.icon className="size-5" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    {highlight.title}
                  </h3>
                  <p>{highlight.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default CollectionHighlights;
