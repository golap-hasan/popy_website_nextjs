import { BookOpen, Sparkles, Target, Users } from "lucide-react";

export const collectionHighlights = [
  {
    title: "Exam Excellence",
    description:
      "Board exam survival kits with chapter-wise notes, quick revision cards, and mock assessments.",
    accent: "from-amber-300/30 via-amber-200/20 to-transparent",
    icon: Target,
  },
  {
    title: "University Bound",
    description:
      "Admission guides, past papers, and faculty-approved reading lists for top Bangladeshi universities.",
    accent: "from-indigo-300/30 via-indigo-200/20 to-transparent",
    icon: BookOpen,
  },
  {
    title: "Creative Sparks",
    description:
      "Curated novels, essays, and poetry to fuel imagination and storytelling for all ages.",
    accent: "from-rose-300/30 via-rose-200/20 to-transparent",
    icon: Sparkles,
  },
];

export const featuredCollections = [
  {
    id: "teen",
    title: "Teen Ambition",
    subtitle: "Class 8-10 achievers",
    description:
      "Weekly study planners, MCQ boosters, and English speaking kits to help teens stay ahead.",
    tags: ["SSC prep", "English", "Science"],
  },
  {
    id: "admission",
    title: "Admission Fast Track",
    subtitle: "University hopefuls",
    description:
      "Crash course bundles, mentor notes, and practice tests covering medical, engineering, and public universities.",
    tags: ["Medical", "Engineering", "University"],
  },
  {
    id: "lifelong",
    title: "Lifelong Learners",
    subtitle: "Curious minds",
    description:
      "Global non-fiction, productivity guides, and creative workshops for professional growth.",
    tags: ["Productivity", "Design", "Leadership"],
  },
];

export const staffRecommendations = [
  {
    name: "Arifa Nahar",
    role: "Lead Curator",
    quote:
      "Students keep telling us how the ‘Exam Excellence’ bundle makes the final revision week calmer and more focused.",
    focus: "SSC & HSC boosters",
  },
  {
    name: "Tanvir Ahmed",
    role: "Publishing Lead",
    quote:
      "I love recommending our Bangla literature curation—classic authors with new commentary that keeps learners engaged.",
    focus: "Bangla literature gems",
  },
  {
    name: "Farzana Rahman",
    role: "Learning Coach",
    quote:
      "The Lifelong Learners collection is perfect for working professionals looking to build habits without overwhelm.",
    focus: "Professional development",
  },
];

export const membershipBenefits = [
  {
    title: "Curated lists every month",
    description: "Fresh reading journeys selected by librarians and educators, delivered to your inbox.",
    icon: Users,
  },
  {
    title: "Workshops & study clubs",
    description: "Access members-only live classes, reading circles, and productivity sessions.",
    icon: Sparkles,
  },
  {
    title: "Partner discounts",
    description: "Enjoy exclusive pricing on stationery, coaching centres, and co-learning spaces.",
    icon: Target,
  },
];
