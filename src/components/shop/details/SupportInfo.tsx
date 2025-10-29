import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Truck, MessageCircle, Clock8 } from "lucide-react";
import type { BookDetail } from "./book-details-data";

const SupportInfo = ({ detail }: { detail: BookDetail }) => {
  return (
    <section className="grid gap-6 md:grid-cols-2">
      <Card className="border-border/50 bg-background/95">
        <CardContent className="space-y-4 p-6">
          <div className="flex items-center gap-3">
            <div className="grid size-12 place-items-center rounded-full bg-primary/10 text-primary">
              <Truck className="size-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Shipping & delivery</p>
              <p className="text-xs text-muted-foreground">Fast, reliable fulfilment across Bangladesh</p>
            </div>
          </div>
          <Separator />
          <ul className="space-y-2 text-sm text-muted-foreground">
            {detail.shippingNotes.map((note) => (
              <li key={note} className="rounded-2xl border border-border/40 bg-muted/20 p-4">
                {note}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card className="border-border/50 bg-background/95">
        <CardContent className="space-y-4 p-6">
          <div className="flex items-center gap-3">
            <div className="grid size-12 place-items-center rounded-full bg-secondary/10 text-secondary">
              <MessageCircle className="size-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Study support</p>
              <p className="text-xs text-muted-foreground">Stay on track with responsive mentors</p>
            </div>
          </div>
          <Separator />
          <ul className="space-y-2 text-sm text-muted-foreground">
            {detail.supportNotes.map((note) => (
              <li key={note} className="rounded-2xl border border-border/40 bg-muted/20 p-4">
                {note}
              </li>
            ))}
            <li className="rounded-2xl border border-border/40 bg-muted/20 p-4 text-xs text-muted-foreground/80">
              <span className="flex items-center gap-2 font-semibold text-foreground">
                <Clock8 className="size-4" /> Live support hours
              </span>
              Sunday – Thursday · 9am – 10pm (Bangladesh Standard Time)
            </li>
          </ul>
        </CardContent>
      </Card>
    </section>
  );
};

export default SupportInfo;
