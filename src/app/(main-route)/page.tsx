import Hero from "@/components/home/Hero";
import Highlights from "@/components/home/Highlights";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import FeaturedBooks from "@/components/home/FeaturedBooks";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <Highlights />
      <CategoryShowcase />
      <FeaturedBooks />
      <Testimonials />
    </>
  );
}