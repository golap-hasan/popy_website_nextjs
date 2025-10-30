import type { Metadata } from "next";
import PageLayout from "@/tools/PageLayout";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Best Sellers | Popy Library",
  description:
    "Discover the most-loved and top-selling books at Popy Library. Updated weekly based on sales and ratings.",
};

const BestSellersCollectionPage = () => {
  return (
    <PageLayout className="screen-height">
      <div className="space-y-8">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/80">Collections</p>
          <h1 className="text-3xl font-semibold text-foreground md:text-4xl">Best Sellers</h1>
          <p className="max-w-3xl text-sm text-muted-foreground">Community favorites with high ratings and consistent results.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-border/50 bg-background/95">
            <CardContent className="space-y-2 p-6">
              <p className="text-lg font-semibold text-foreground">English Mastery</p>
              <p className="text-sm text-muted-foreground">Top-rated for clarity and practice.</p>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-background/95">
            <CardContent className="space-y-2 p-6">
              <p className="text-lg font-semibold text-foreground">BCS Question Bank</p>
              <p className="text-sm text-muted-foreground">Trusted by aspirants for exam prep.</p>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-background/95">
            <CardContent className="space-y-2 p-6">
              <p className="text-lg font-semibold text-foreground">Math Sprint</p>
              <p className="text-sm text-muted-foreground">High-speed problem-solving drills.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default BestSellersCollectionPage;
