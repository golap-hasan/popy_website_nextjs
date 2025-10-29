import PageLayout from "@/tools/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { featuredCollections } from "./collection-data";

const FeaturedCollections = () => {
  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/70">
            Spotlight bundles
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Collections to bookmark this month
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-muted-foreground">
            Hand-picked learning journeys curated with upcoming exams, campus
            prep, and ambitious reading goals in mind.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {featuredCollections.map((collection) => (
            <Card
              key={collection.id}
              className="flex h-full flex-col justify-between border-border/50 bg-background/80"
            >
              <CardHeader>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <Badge
                    variant="outline"
                    className="rounded-full border-border/50"
                  >
                    {collection.subtitle}
                  </Badge>
                  <span>#0{collection.id}</span>
                </div>
                <CardTitle className="text-xl font-semibold text-foreground">
                  {collection.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between gap-6 text-sm text-muted-foreground">
                <p>{collection.description}</p>
                <div className="flex flex-wrap gap-2">
                  {collection.tags.map((tag) => (
                    <Badge key={tag} className="bg-primary/10 text-primary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button
                  variant="ghost"
                  className="px-0 text-sm font-semibold text-primary hover:text-primary/80"
                >
                  <a href={`/collections/${collection.id}`}>Explore bundle</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default FeaturedCollections;
