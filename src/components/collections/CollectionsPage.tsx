import CollectionHero from "./Hero";
import CollectionHighlights from "./Highlights";
import FeaturedCollections from "./FeaturedCollections";
import StaffVoices from "./StaffVoices";
import MembershipCTA from "./MembershipCTA";

const CollectionsPage = () => {
  return (
    <main>
      <CollectionHero />
      <CollectionHighlights />
      <FeaturedCollections />
      <StaffVoices />
      <MembershipCTA />
    </main>
  );
};

export default CollectionsPage;
