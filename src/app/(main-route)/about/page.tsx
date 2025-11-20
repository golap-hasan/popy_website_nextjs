import type { Metadata } from "next";
import PageLayout from "@/tools/PageLayout";
import { Separator } from "@/components/ui/separator";
import { getLegalPageData } from "@/services/legal";

export const metadata: Metadata = {
  title: "About Us | Popy Library",
  description:
    "Learn about Popy Library’s mission, values, and our commitment to quality education for all learners in Bangladesh.",
};

const AboutPage = async () => {
  const result = await getLegalPageData("about-us");

  return (
    <PageLayout className="screen-height">
      <div className="space-y-8">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/80">
            Company
          </p>
          <h1 className="text-3xl font-semibold text-foreground md:text-4xl">
            About Popy Library
          </h1>
          <p className="max-w-3xl text-sm text-muted-foreground">
            Popy Library is dedicated to empowering students and educators across Bangladesh. Learn who we are, what we stand for, and why thousands trust our books and resources every day.
          </p>
        </div>
        <Separator />

        <div className="prose max-w-none pt-2">
          {result?.success && result.data?.content ? (
            <div dangerouslySetInnerHTML={{ __html: result.data.content }} />
          ) : (
            <div>Content not available.</div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default AboutPage;