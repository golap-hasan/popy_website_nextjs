import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Save } from "lucide-react";

import PageLayout from "@/tools/PageLayout";
import { Button, buttonVariants } from "@/components/ui/button";
import PersonalInfoCard from "@/components/profile/update-profile/PersonalInfoCard";
import PasswordUpdateCard from "@/components/profile/update-profile/PasswordUpdateCard";
import DeliveryPreferencesCard from "@/components/profile/update-profile/DeliveryPreferencesCard";

export const metadata: Metadata = {
  title: "Update profile | Popy Publications",
  description:
    "Fine-tune your personal details, delivery preferences, and alerts to keep your Popy account up to date.",
};

const UpdateProfilePage = () => {
  return (
    <PageLayout paddingSize="small">
      <div className="space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Profile settings
            </p>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Update your details
            </h1>
            <p className="text-sm text-muted-foreground">
              Keep your personal info, addresses, and alerts current so orders
              and notifications arrive on time.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
            <Link
              href="/profile"
            >
              <Button className="rounded-full">
                <ArrowLeft className="size-4" />
                Back to profile
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.75fr_1fr]">
          <div className="space-y-8">
            <PersonalInfoCard />
            <PasswordUpdateCard />
          </div>
          <div>
            <DeliveryPreferencesCard />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default UpdateProfilePage;
