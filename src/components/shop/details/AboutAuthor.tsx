import { Card, CardContent } from "@/components/ui/card";
import type { BookDetail } from "./book-details-data";

const AboutAuthor = ({ detail }: { detail: BookDetail }) => {
  return (
    <section className="space-y-6 rounded-3xl border border-border/60 bg-background/95 p-8 shadow-sm">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/80">About the author</p>
        <h2 className="text-2xl font-semibold text-foreground md:text-3xl">Meet the minds behind the guides</h2>
        <p className="max-w-3xl text-sm text-muted-foreground">
          {detail.aboutAuthor.bio}
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border/50 bg-background/90">
          <CardContent className="space-y-4 p-6">
            <p className="text-sm font-semibold text-foreground">Why learners trust them</p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {detail.aboutAuthor.achievements.map((achievement) => (
                <li key={achievement} className="rounded-2xl border border-border/40 bg-muted/20 p-4">
                  {achievement}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-background/90">
          <CardContent className="space-y-4 p-6">
            <p className="text-sm font-semibold text-foreground">At a glance</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="rounded-2xl border border-border/40 bg-muted/20 p-4">
                <span className="font-semibold text-foreground">Primary audience:</span> Students & educators seeking applied learning
              </li>
              {detail.aboutAuthor.hometown ? (
                <li className="rounded-2xl border border-border/40 bg-muted/20 p-4">
                  <span className="font-semibold text-foreground">Rooted in:</span> {detail.aboutAuthor.hometown}
                </li>
              ) : null}
              <li className="rounded-2xl border border-border/40 bg-muted/20 p-4">
                <span className="font-semibold text-foreground">Signature style:</span> Practical guidance with emotional support
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AboutAuthor;
