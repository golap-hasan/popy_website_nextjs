import type { Metadata } from "next";
import PageLayout from "@/tools/PageLayout";
import { Separator } from "@/components/ui/separator";
import { getLegalPageData } from "@/services/legal";

export const metadata: Metadata = {
  title: "Terms & Conditions | Popy Library",
  description:
    "Read Popy Library's Terms and Conditions. Understand the rules and policies for using our website and services.",
};

const TermsPage = async () => {
  const result = await getLegalPageData("terms-and-conditions");

  return (
    <PageLayout className="screen-height">
      <div className="space-y-8">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/80">
            Legal
          </p>
          <h1 className="text-3xl font-semibold text-foreground md:text-4xl">
            Terms & Conditions
          </h1>
          <p className="max-w-3xl text-sm text-muted-foreground">
            Please read our Terms & Conditions carefully. These terms govern your use of Popy Library, set the rules for our website and services, and explain your rights and responsibilities as a user.
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

export default TermsPage;