import type { Metadata } from "next";
import AboutPage from "@/components/about/AboutPage";

export const metadata: Metadata = {
  title: "About Popy Library | Popy Publications",
  description:
    "Discover the story of Popy Library and Popy Publications—our mission, history, and the team supporting learners across Bangladesh.",
};

const About = () => {
  return <AboutPage />;
};

export default About;