import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { BookDetail } from "./book-details-data";

const HighlightsSpecs = ({ detail }: { detail: BookDetail }) => {
  return (
    <section className="space-y-6 rounded-3xl bg-background/95">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/80">What's inside</p>
          <h2 className="text-2xl font-semibold text-foreground md:text-3xl">Build better study rituals</h2>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Every chapter is designed to move learners from passive reading to confident expression. These highlights and
            specs give you a quick feel for how the book is structured.
          </p>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="bg-background/90 p-0">
          <div className="space-y-4">
            <p className="text-sm font-semibold text-foreground">Key highlights</p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {detail.highlights.map((highlight) => (
                <li key={highlight} className="rounded-2xl border border-border/40 bg-muted/20 p-4">
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <Card className="border-border/50 bg-background/90">
          <CardContent className="space-y-4 p-6">
            <p className="text-sm font-semibold text-foreground">Product specs</p>
            <div className="space-y-3">
              {detail.specs.map((spec, index) => (
                <div key={spec.label} className="space-y-1">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">{spec.label}</span>
                    <span>{spec.value}</span>
                  </div>
                  {index < detail.specs.length - 1 ? <Separator /> : null}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </section>
  );
};

export default HighlightsSpecs;
