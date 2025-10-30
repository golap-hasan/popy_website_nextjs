import type { Metadata } from "next";
import PageLayout from "@/tools/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Terms & Conditions | Popy Library",
  description:
    "Read the Terms & Conditions for using Popy Library's website and services.",
};

const TermsPage = () => {
  return (
    <PageLayout className="screen-height">
      <div className="space-y-8">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/80">Legal</p>
          <h1 className="text-3xl font-semibold text-foreground md:text-4xl">Terms & Conditions</h1>
          <p className="max-w-3xl text-sm text-muted-foreground">Please read these terms carefully before using our website and purchasing products.</p>
        </div>
        <Separator />
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-border/50 bg-background/95">
            <CardContent className="space-y-3 p-6">
              <h2 className="text-lg font-semibold text-foreground">Use of the site</h2>
              <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                <li>Your account information must be accurate and kept secure.</li>
                <li>Do not misuse the site or engage in fraudulent activity.</li>
                <li>We may restrict access in case of suspicious behavior.</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-background/95">
            <CardContent className="space-y-3 p-6">
              <h2 className="text-lg font-semibold text-foreground">Orders & payment</h2>
              <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                <li>All orders are subject to acceptance and availability.</li>
                <li>Prices are subject to change; you’ll see the final amount at checkout.</li>
                <li>We reserve the right to cancel orders for valid reasons.</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-background/95">
            <CardContent className="space-y-3 p-6">
              <h2 className="text-lg font-semibold text-foreground">Shipping & returns</h2>
              <p className="text-sm text-muted-foreground">We aim to deliver on schedule. Returns are handled per our Returns & Refunds policy.</p>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-background/95">
            <CardContent className="space-y-3 p-6">
              <h2 className="text-lg font-semibold text-foreground">Liability & changes</h2>
              <p className="text-sm text-muted-foreground">Popy Publications is not liable for issues beyond reasonable control. Terms may be updated; continued use indicates acceptance.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default TermsPage;
