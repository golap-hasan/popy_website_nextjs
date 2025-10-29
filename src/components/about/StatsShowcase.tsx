import PageLayout from "@/tools/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { stats } from "./about-data";

const StatsShowcase = () => {
  return (
    <section>
      <PageLayout>
        <div className="space-y-10">
          <div className="space-y-3 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/70">
              Impact in numbers
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              A growing community of curious readers
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-muted-foreground">
              From classroom support to professional development, Popy Library
              continues to expand access to curated learning experiences across
              Bangladesh.
            </p>
          </div>
          <div className="grid gap-4 rounded-3xl border border-border/60 bg-background/80 p-6 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item) => (
              <Card
                key={item.label}
                className="border-none bg-transparent shadow-none"
              >
                <CardContent className="space-y-2 p-0 text-center">
                  <p className="text-3xl font-semibold text-primary md:text-4xl">
                    {item.value}
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {item.label}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </PageLayout>
    </section>
  );
};

export default StatsShowcase;
