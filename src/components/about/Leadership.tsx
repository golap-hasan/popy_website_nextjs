import PageLayout from "@/tools/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { leadership } from "./about-data";

const Leadership = () => {
  return (
    <section>
      <PageLayout>
        <div className="space-y-8">
          <div className="space-y-3 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/70">
              Leadership
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Guided by educators & community builders
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-muted-foreground">
              Meet the people aligning publishing, pedagogy, and partnerships to
              keep Popy Library learner-focused.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {leadership.map((leader) => (
              <Card
                key={leader.name}
                className="border-border/60 bg-background/80"
              >
                <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
                  <Avatar className="size-16">
                    <AvatarFallback>
                      {leader.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <p className="text-lg font-semibold text-foreground">
                      {leader.name}
                    </p>
                    <p className="text-xs uppercase tracking-wide text-primary/70">
                      {leader.role}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {leader.bio}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </PageLayout>
    </section>
  );
};

export default Leadership;
