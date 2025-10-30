import type { Metadata } from "next";
import PageLayout from "@/tools/PageLayout";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Academic Books | Popy Library",
  description:
    "Browse academic books for SSC, HSC, and university levels at Popy Library. Updated, syllabus-aligned study guides and resources.",
};

const AcademicCollectionPage = () => {
  return (
    <PageLayout className="screen-height">
      <div className="space-y-8">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/80">Collections</p>
          <h1 className="text-3xl font-semibold text-foreground md:text-4xl">Academic</h1>
          <p className="max-w-3xl text-sm text-muted-foreground">Syllabus-aligned study guides and workbooks for SSC, HSC, and university entrance preparation.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-border/50 bg-background/95">
            <CardContent className="space-y-2 p-6">
              <p className="text-lg font-semibold text-foreground">SSC</p>
              <p className="text-sm text-muted-foreground">Core subjects, model tests, and exam strategies.</p>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-background/95">
            <CardContent className="space-y-2 p-6">
              <p className="text-lg font-semibold text-foreground">HSC</p>
              <p className="text-sm text-muted-foreground">Advanced practice sets and revision notes.</p>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-background/95">
            <CardContent className="space-y-2 p-6">
              <p className="text-lg font-semibold text-foreground">University</p>
              <p className="text-sm text-muted-foreground">Admission prep and subject primers.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default AcademicCollectionPage;
