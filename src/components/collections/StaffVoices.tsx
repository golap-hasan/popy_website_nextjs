import PageLayout from "@/tools/PageLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { staffRecommendations } from "./collection-data";

const StaffVoices = () => {
  return (
    <PageLayout paddingSize="small">
      <div className=" space-y-6">
        <div className="space-y-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/70">
            Voices from the library
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Curators who know these shelves
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-muted-foreground">
            Librarians, editors, and learning coaches share why these
            collections matter for readers across Bangladesh.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {staffRecommendations.map((staff) => (
            <Card
              key={staff.name}
              className="border-border/50 bg-background/80"
            >
              <CardHeader className="flex items-center gap-4">
                <Avatar className="size-12">
                  <AvatarFallback>
                    {staff.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1 text-sm">
                  <p className="font-semibold text-foreground">{staff.name}</p>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    {staff.role}
                  </p>
                  <p className="text-xs text-primary">Focus: {staff.focus}</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p className="italic text-foreground/90">“{staff.quote}”</p>
                <div className="rounded-2xl border border-border/50 bg-muted/30 px-4 py-3 text-xs">
                  Curator tip: Keep 30 minutes weekly for reflection to get the
                  most out of this bundle.
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default StaffVoices;
