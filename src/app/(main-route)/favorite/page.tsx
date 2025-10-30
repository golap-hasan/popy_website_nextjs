import type { Metadata } from "next";
import FavoritePage from "@/components/favorite/FavoritePage";

export const metadata: Metadata = {
  title: "Favorites | Popy Library",
  description: "Review and manage your saved books on Popy Library.",
};

const FavoriteRoute = () => {
  return <FavoritePage />;
};

export default FavoriteRoute;