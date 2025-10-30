import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/tools/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Help Center | Popy Library",
  description:
    "Help Center for Popy Library: FAQs, shipping & delivery, returns & refunds, and order tracking.",
};

const HelpPage = () => {
  return (
    <PageLayout className="screen-height">
      <div className="space-y-8">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/80">Support</p>
          <h1 className="text-3xl font-semibold text-foreground md:text-4xl">Help Center</h1>
          <p className="max-w-3xl text-sm text-muted-foreground">Find answers quickly or reach out to our team for assistance.</p>
        </div>
        <Separator />
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-border/50 bg-background/95">
            <CardContent className="space-y-3 p-6">
              <h2 className="text-lg font-semibold text-foreground">Browse topics</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                <Button variant="outline" className="justify-center rounded-full"><Link href="/support/faqs">FAQs</Link></Button>
                <Button variant="outline" className="justify-center rounded-full"><Link href="/support/shipping">Shipping & Delivery</Link></Button>
                <Button variant="outline" className="justify-center rounded-full"><Link href="/support/returns">Returns & Refunds</Link></Button>
                <Button variant="outline" className="justify-center rounded-full"><Link href="/track-order">Track Order</Link></Button>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-background/95">
            <CardContent className="space-y-3 p-6">
              <h2 className="text-lg font-semibold text-foreground">Contact support</h2>
              <p className="text-sm text-muted-foreground">Can’t find what you need? Reach us and we’ll help you resolve it.</p>
              <div className="flex gap-3">
                <Button className="rounded-full px-6"><Link href="/contact">Send a message</Link></Button>
                <Button variant="outline" className="rounded-full px-6"><Link href="tel:+8801234567890">Call hotline</Link></Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default HelpPage;
