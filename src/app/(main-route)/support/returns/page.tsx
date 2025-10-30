import type { Metadata } from "next";
import PageLayout from "@/tools/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Returns & Refunds | Popy Library",
  description: "Understand Popy Library's return policy and how to request a refund.",
};

const ReturnsPage = () => {
  return (
    <PageLayout className="screen-height">
      <div className="space-y-8">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/80">Support</p>
          <h1 className="text-3xl font-semibold text-foreground md:text-4xl">Returns & Refunds</h1>
          <p className="max-w-3xl text-sm text-muted-foreground">How to initiate returns and our refund policy.</p>
        </div>
        <Separator />
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-border/50 bg-background/95">
            <CardContent className="space-y-3 p-6">
              <h2 className="text-lg font-semibold text-foreground">Policy summary</h2>
              <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                <li>Eligible for returns within 7 days of delivery</li>
                <li>Accepted for manufacturing defects or wrong items</li>
                <li>Items must be unused and in original condition</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-background/95">
            <CardContent className="space-y-3 p-6">
              <h2 className="text-lg font-semibold text-foreground">How to start a return</h2>
              <ol className="list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
                <li>Contact support with order ID and issue details</li>
                <li>Share photos if the item is damaged/defective</li>
                <li>Pack securely and hand over to the assigned courier</li>
              </ol>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-background/95 md:col-span-2">
            <CardContent className="space-y-3 p-6">
              <h2 className="text-lg font-semibold text-foreground">Refunds</h2>
              <p className="text-sm text-muted-foreground">Refunds are processed to the original payment method within 5–7 business days after the returned item passes quality checks.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default ReturnsPage;
