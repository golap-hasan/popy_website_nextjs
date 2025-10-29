import PageLayout from "@/tools/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { officeLocations } from "./contact-data";

const Locations = () => {
  return (
    <section className="bg-linear-to-b from-muted/30 via-background to-background">
      <PageLayout>
        <div className="space-y-6">
          <div className="space-y-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/70">Visit our studios</p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Drop by for curated recommendations
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-muted-foreground">
            Our librarians and learning coaches are ready to help you pick the right packages or plan your next workshop.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {officeLocations.map((location) => (
            <Card key={location.city} className="border-border/50 bg-background/80">
              <CardContent className="space-y-3 p-6 text-sm text-muted-foreground">
                <div className="space-y-1">
                  <p className="text-lg font-semibold text-foreground">{location.city} Studio</p>
                  <p>{location.addressLine}</p>
                </div>
                <div className="space-y-1 text-xs">
                  <p className="font-semibold uppercase tracking-wide text-primary/70">Availability</p>
                  <p>{location.availability}</p>
                </div>
                <div className="space-y-1 text-xs">
                  <p className="font-semibold uppercase tracking-wide text-primary/70">Contact</p>
                  <p>Phone: {location.phone}</p>
                  <p>Email: {location.email}</p>
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

export default Locations;
