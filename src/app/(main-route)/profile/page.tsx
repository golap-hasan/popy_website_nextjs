import { Metadata } from "next";
import PageLayout from "@/tools/PageLayout";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileOrders from "@/components/profile/ProfileOrders";
import ProfileAccountHub from "@/components/profile/ProfileAccountHub";

export const metadata: Metadata = {
  title: "Profile | Popy Publications",
  description:
    "Manage your account details, track orders, and explore personalised recommendations.",
};

const ProfilePage = () => {
  return (
    <PageLayout paddingSize="small">
      <div className="space-y-8">
        <ProfileHeader />
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <ProfileOrders />
          <ProfileAccountHub />
        </div>
      </div>
    </PageLayout>
  );
};

export default ProfilePage;
