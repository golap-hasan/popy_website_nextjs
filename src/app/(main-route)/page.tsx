import Hero from "@/components/home/Hero";
import Highlights from "@/components/home/Highlights";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import FeaturedBooks from "@/components/home/FeaturedBooks";
import Testimonials from "@/components/home/Testimonials";
import { getBooksForHomepage } from "@/services/shop";

export default async function Home() {
  const { data: books } = await getBooksForHomepage();

  return (
    <>
      <Hero books={books} />
      <FeaturedBooks books={books} />
      <Highlights />
      <CategoryShowcase />
      <Testimonials />
    </>
  );
}
