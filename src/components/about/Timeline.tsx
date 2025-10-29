import PageLayout from "@/tools/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { milestones } from "./about-data";

const Timeline = () => {
  return (
    <section>
      <PageLayout>
        <div className="space-y-8">
          <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/70">Milestones</p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Growing with our readers since 2014
          </h2>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Every chapter of Popy Library reflects collaboration with teachers, parents, and learners who wanted more
            than a traditional bookstore experience.
          </p>
        </div>
        <div className="relative space-y-6 border-l border-border/50 pl-6 md:pl-8">
          {milestones.map((milestone) => (
            <Card key={milestone.year} className="relative border-border/60 bg-background/80">
              <div className="absolute -left-[29px] top-6 flex size-5 items-center justify-center rounded-full border border-primary/40 bg-background/90 text-xs font-semibold text-primary md:-left-[33px]">
                {milestone.year.slice(2)}
              </div>
              <CardContent className="space-y-2 p-6">
                <p className="text-sm font-semibold uppercase tracking-wide text-primary/70">{milestone.year}</p>
                <h3 className="text-lg font-semibold text-foreground">{milestone.title}</h3>
                <p className="text-sm text-muted-foreground">{milestone.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        </div>
      </PageLayout>
    </section>
  );
};

export default Timeline;
