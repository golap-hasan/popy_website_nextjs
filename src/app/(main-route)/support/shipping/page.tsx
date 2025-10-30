import PageLayout from "@/tools/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const ShippingPage = () => {
  return (
    <PageLayout className="screen-height">
      <div className="space-y-8">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/80">Support</p>
          <h1 className="text-3xl font-semibold text-foreground md:text-4xl">Shipping & Delivery</h1>
          <p className="max-w-3xl text-sm text-muted-foreground">Information about delivery timelines, charges, and coverage.</p>
        </div>
        <Separator />
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-border/50 bg-background/95">
            <CardContent className="space-y-3 p-6">
              <h2 className="text-lg font-semibold text-foreground">Delivery timelines</h2>
              <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                <li>Inside Dhaka: 2–3 business days</li>
                <li>Outside Dhaka: 3–5 business days</li>
                <li>Pre-orders ship once stock arrives</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-background/95">
            <CardContent className="space-y-3 p-6">
              <h2 className="text-lg font-semibold text-foreground">Delivery charges</h2>
              <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                <li>Inside Dhaka: ৳60–80 (weight-dependent)</li>
                <li>Outside Dhaka: ৳100–130 via courier partners</li>
                <li>Free delivery during selected promotions</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-background/95 md:col-span-2">
            <CardContent className="space-y-3 p-6">
              <h2 className="text-lg font-semibold text-foreground">Coverage & handling</h2>
              <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                <li>Nationwide delivery through trusted couriers</li>
                <li>Orders placed after 5 PM are processed next business day</li>
                <li>Inspect packages upon delivery and report any issues within 24 hours</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default ShippingPage;
