import type { Metadata } from "next";
import PageLayout from "@/tools/PageLayout";
import { Separator } from "@/components/ui/separator";
import { getLegalPageData } from "@/services/legal";

export const metadata: Metadata = {
  title: "Returns & Refunds | Popy Library",
  description:
    "Understand Popy Library's return policy and how to request a refund.",
};

const ReturnsPage = async () => {
  const result = await getLegalPageData("terms-and-conditions");
  return (
    <PageLayout className="screen-height">
      <div className="space-y-8">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/80">
            Support
          </p>
          <h1 className="text-3xl font-semibold text-foreground md:text-4xl">
            Returns & Refunds
          </h1>
          <p className="max-w-3xl text-sm text-muted-foreground">
            How to initiate returns and our refund policy.
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

export default ReturnsPage;
