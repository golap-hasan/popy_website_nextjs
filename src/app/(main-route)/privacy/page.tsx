import type { Metadata } from "next";
import PageLayout from "@/tools/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Privacy Policy | Popy Library",
  description:
    "Read Popy Library's Privacy Policy. Learn how we collect, use, and protect your data.",
};

const PrivacyPage = () => {
  return (
    <PageLayout className="screen-height">
      <div className="space-y-8">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/80">Legal</p>
          <h1 className="text-3xl font-semibold text-foreground md:text-4xl">Privacy Policy</h1>
          <p className="max-w-3xl text-sm text-muted-foreground">Your privacy matters. This page explains how we handle your personal information.</p>
        </div>
        <Separator />
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-border/50 bg-background/95 md:col-span-2">
            <CardContent className="space-y-3 p-6">
              <h2 className="text-lg font-semibold text-foreground">Overview</h2>
              <p className="text-sm text-muted-foreground">We collect minimal data to process orders, improve our services, and communicate with you. We do not sell your personal information.</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-background/95">
            <CardContent className="space-y-3 p-6">
              <h2 className="text-lg font-semibold text-foreground">Information we collect</h2>
              <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                <li>Account details (name, email, phone)</li>
                <li>Order and delivery details (address, items)</li>
                <li>Usage data (pages visited, device/analytics)</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-background/95">
            <CardContent className="space-y-3 p-6">
              <h2 className="text-lg font-semibold text-foreground">How we use information</h2>
              <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                <li>Fulfil orders and provide customer support</li>
                <li>Improve products, content, and website experience</li>
                <li>Send important updates or service communications</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-background/95">
            <CardContent className="space-y-3 p-6">
              <h2 className="text-lg font-semibold text-foreground">Cookies & tracking</h2>
              <p className="text-sm text-muted-foreground">We use cookies and similar technologies for session management and analytics. You can control cookies through your browser settings.</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-background/95">
            <CardContent className="space-y-3 p-6">
              <h2 className="text-lg font-semibold text-foreground">Sharing & security</h2>
              <p className="text-sm text-muted-foreground">We may share data with payment and delivery partners strictly to complete your order. We implement reasonable safeguards to protect your information.</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-background/95 md:col-span-2">
            <CardContent className="space-y-3 p-6">
              <h2 className="text-lg font-semibold text-foreground">Your rights</h2>
              <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                <li>Access, update, or delete your personal information</li>
                <li>Opt out of non-essential communications</li>
                <li>Request details about how your data is used</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default PrivacyPage;
