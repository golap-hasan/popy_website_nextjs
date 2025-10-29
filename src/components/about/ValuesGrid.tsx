import PageLayout from "@/tools/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { values } from "./about-data";

const ValuesGrid = () => {
  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="space-y-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/70">
            Our principles
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Curated with heart, delivered with purpose
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-muted-foreground">
            Everything we create is grounded in accessibility, cultural
            relevance, and the belief that reading can transform futures.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {values.map((value) => (
            <Card
              key={value.title}
              className="border-border/60 bg-background/80"
            >
              <CardContent className="space-y-3 p-6 text-sm text-muted-foreground">
                <div className="inline-flex size-12 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
                  <value.icon className="size-5" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    {value.title}
                  </h3>
                  <p>{value.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default ValuesGrid;
