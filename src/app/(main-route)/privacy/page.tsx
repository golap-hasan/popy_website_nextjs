import type { Metadata } from "next";
import PageLayout from "@/tools/PageLayout";
import { Separator } from "@/components/ui/separator";
import { getLegalPageData } from "@/services/legal";

export const metadata: Metadata = {
  title: "Privacy Policy | Popy Library",
  description:
    "Read Popy Library's Privacy Policy. Learn how we collect, use, and protect your data.",
};

const PrivacyPage = async () => {
  const result = await getLegalPageData("privacy-policy");

  if (!result?.success || !result.data?.content) {
    return (
      <PageLayout className="screen-height">
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-foreground">Privacy Policy</h1>
          </div>
          <Separator />
          <div>Content not available.</div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout className="screen-height">
      <div className="space-y-8">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/80">Legal</p>
          <h1 className="text-3xl font-semibold text-foreground md:text-4xl">Privacy Policy</h1>
          <p className="max-w-3xl text-sm text-muted-foreground">
            Your privacy matters. This page explains how we handle your personal information.
          </p>
        </div>
        <Separator />
        {/* Content data */}
        <div className="prose max-w-none pt-2">
          <div dangerouslySetInnerHTML={{ __html: result.data.content }} />
        </div>
      </div>
    </PageLayout>
  );
};

export default PrivacyPage;