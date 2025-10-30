import PageLayout from "@/tools/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const TrackOrderPage = () => {
  return (
    <PageLayout className="screen-height">
      <div className="space-y-8">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/80">Support</p>
          <h1 className="text-3xl font-semibold text-foreground md:text-4xl">Track Order</h1>
          <p className="max-w-3xl text-sm text-muted-foreground">Enter your order details to check the latest status.</p>
        </div>
        <Card className="border-border/50 bg-background/95">
          <CardContent className="space-y-5 p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="order-id">Order ID</Label>
                <Input id="order-id" placeholder="e.g. POPY-2025-12345" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" />
              </div>
            </div>
            <div>
              <Button className="rounded-full px-6">Track order</Button>
            </div>
            <p className="text-xs text-muted-foreground">You’ll see courier details after the order is dispatched. For urgent help, contact support.</p>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default TrackOrderPage;
