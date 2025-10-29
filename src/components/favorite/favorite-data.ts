import type { StaticImageData } from "next/image";

export type SavedBook = {
  id: string;
  title: string;
  author: string;
  category: string;
  price: string;
  coverImage: string | StaticImageData;
  lastVisited: string;
  status: "In stock" | "Low stock" | "Pre-order";
  description: string;
};

export type FavoriteCuratedList = {
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
};

export const savedBooks: SavedBook[] = [
  {
    id: "1",
    title: "Popy English For Today",
    author: "Popy Publications",
    category: "SSC Essentials",
    price: "৳575",
    coverImage: "/english.png",
    lastVisited: "2 days ago",
    status: "In stock",
    description: "Exam-smart grammar walkthroughs with interactive speaking prompts.",
  },
  {
    id: "2",
    title: "BCS Question Bank",
    author: "Notion Press",
    category: "Career Prep",
    price: "৳690",
    coverImage: "/banking.png",
    lastVisited: "Last week",
    status: "Low stock",
    description: "Solved papers with annotation layers from serving cadres and mentors.",
  },
  {
    id: "3",
    title: "Science Olympiad Playbook",
    author: "Chotoder Biggan",
    category: "STEM Boost",
    price: "৳480",
    coverImage: "/biggan.png",
    lastVisited: "4 hours ago",
    status: "In stock",
    description: "Daily drills and concept refreshers designed for olympiad finalists.",
  },
];

export const curatedLists: FavoriteCuratedList[] = [
  {
    title: "New arrivals",
    description: "See what fellow readers are saving this week across languages and classes.",
    ctaLabel: "Browse new releases",
    href: "/shop?sort=newest",
  },
  {
    title: "Staff picks",
    description: "Handpicked study companions trusted by our librarians for exam season.",
    ctaLabel: "View staff picks",
    href: "/collections",
  },
  {
    title: "Reading goals",
    description: "Build a balanced stack with literature, problem-solving, and creative reads.",
    ctaLabel: "Set goals",
    href: "/collections?tab=goals",
  },
];
