export type BookReview = {
  reviewer: string;
  role: string;
  rating: number;
  date: string;
  summary: string;
  content: string;
};

export type BookDetail = {
  id: string;
  title: string;
  subtitle?: string;
  author: string;
  price: string;
  originalPrice?: string;
  rating: number;
  reviewsCount: number;
  tag: string;
  coverImage: string;
  description: string;
  highlights: string[];
  specs: {
    label: string;
    value: string;
  }[];
  aboutAuthor: {
    bio: string;
    achievements: string[];
    hometown?: string;
  };
  reviews: BookReview[];
  shippingNotes: string[];
  supportNotes: string[];
  related: {
    id: string;
    title: string;
    author: string;
    price: string;
    coverImage: string;
  }[];
};

export const bookDetails: Record<string, BookDetail> = {
  "1": {
    id: "1",
    title: "Popy English For Today",
    subtitle: "Complete language mastery for classes 9-10",
    author: "Popy Publications",
    price: "৳575",
    originalPrice: "৳620",
    rating: 4.8,
    reviewsCount: 146,
    tag: "Best for SSC",
    coverImage: "/english.png",
    description:
      "A classroom-tested guide aligned with the latest NCTB syllabus. Includes model tests, grammar drills, and writing templates crafted by veteran examiners.",
    highlights: [
      "28 chapter-by-chapter breakdowns with vocabulary focus",
      "Exclusive writing templates for formal/informal letters",
      "Listening scripts paired with comprehension cues",
      "QR-access to supplementary speaking practice videos",
    ],
    specs: [
      { label: "Edition", value: "2025 Updated" },
      { label: "Language", value: "English & Bangla" },
      { label: "Pages", value: "416" },
      { label: "ISBN", value: "978-984-95585-12" },
      { label: "Format", value: "Softcover" },
    ],
    aboutAuthor: {
      bio: "Popy Publications has spent three decades guiding SSC candidates with empathetic, exam-smart resources that blend storytelling with syntax mastery.",
      achievements: [
        "Trusted by 500+ schools across Bangladesh",
        "Contributor team includes national curriculum trainers",
        "Winner of the 2024 Student Choice Award for study aids",
      ],
      hometown: "Dhaka, Bangladesh",
    },
    reviews: [
      {
        reviewer: "Mrittika S.",
        role: "SSC Candidate, Rajshahi Collegiate",
        rating: 5,
        date: "May 2025",
        summary: "Finally a guide that makes grammar click",
        content:
          "Every unit blends real-life examples with exam drills. The QR speaking practice helped me score a full band in the oral exam for the first time.",
      },
      {
        reviewer: "Rahnuma H.",
        role: "English Teacher, Govt. Laboratory School",
        rating: 4.5,
        date: "April 2025",
        summary: "Structured for effortless lesson planning",
        content:
          "The pacing charts and worksheet banks mean I no longer need separate prep. Students love the reflective prompts after each prose piece.",
      },
    ],
    shippingNotes: [
      "Same-day dispatch within Dhaka if ordered before 2pm",
      "Cash on delivery available nationwide",
      "Eco-friendly recycled packaging for all metro deliveries",
    ],
    supportNotes: [
      "Dedicated study coach support via Messenger",
      "Live grammar clinics every Saturday evening",
      "Worksheet request line: support@popylibrary.com",
    ],
    related: [
      {
        id: "2",
        title: "HSC Bangla Literature Anthology",
        author: "Dr. Muhammed Zafar Iqbal",
        price: "৳420",
        coverImage: "/tottho.png",
      },
      {
        id: "5",
        title: "Science Olympiad Playbook",
        author: "Chotoder Biggan",
        price: "৳480",
        coverImage: "/biggan.png",
      },
      {
        id: "6",
        title: "Story-Driven Programming",
        author: "Tasnia Raihan",
        price: "৳450",
        coverImage: "/gonit.png",
      },
    ],
  },
  "3": {
    id: "3",
    title: "BCS Question Bank",
    subtitle: "Solving strategies for cadres in the making",
    author: "Notion Press",
    price: "৳690",
    rating: 4.7,
    reviewsCount: 89,
    tag: "BCS Focus",
    coverImage: "/banking.png",
    description:
      "From preliminary MCQs to viva-ready briefs, this compendium reconstructs the 38th onwards BCS exams with coaching insights and mindset shifts.",
    highlights: [
      "12 full-length practice sets with difficulty zoning",
      "Mnemonic frameworks for Bangladesh affairs",
      "Answer breakdown annotated by ex-cadre mentors",
      "Time-tracking dashboards for mock test reflections",
    ],
    specs: [
      { label: "Edition", value: "9th" },
      { label: "Language", value: "Bangla" },
      { label: "Pages", value: "688" },
      { label: "ISBN", value: "978-984-55545-07" },
      { label: "Format", value: "Hardcover" },
    ],
    aboutAuthor: {
      bio: "Notion Press curates professional prep guides by pairing serving cadres with instructional designers to demystify the recruitment journey.",
      achievements: [
        "Over 40,000 candidates mentored since 2015",
        "Featured in Bangladesh Career Summit 2024",
        "Integrated with Popy's mock interview lab",
      ],
    },
    reviews: [
      {
        reviewer: "Touhid A.",
        role: "BCS 45th Preliminary Qualified",
        rating: 4.5,
        date: "June 2025",
        summary: "Gives you cadence, not just content",
        content:
          "The reflection sheets after every mock test kept me accountable. I loved how the authors explain why certain distractors keep appearing.",
      },
      {
        reviewer: "Shaila K.",
        role: "Career Coach, Dhaka",
        rating: 4.8,
        date: "March 2025",
        summary: "Coaching insights in print",
        content:
          "Every section starts with a mindset reset and a 7-day micro plan. Clients feel less anxious because they know exactly what to do next.",
      },
    ],
    shippingNotes: [
      "Free courier inside Dhaka city",
      "Bundled discounts when paired with mock viva sessions",
      "Ships with complementary sticky-note set",
    ],
    supportNotes: [
      "Access to BCS Telegram group with daily MCQs",
      "Weekly accountability emails from Popy mentors",
      "On-demand analytics for mock scores",
    ],
    related: [
      {
        id: "1",
        title: "Popy English For Today",
        author: "Popy Publications",
        price: "৳575",
        coverImage: "/english.png",
      },
      {
        id: "5",
        title: "Science Olympiad Playbook",
        author: "Chotoder Biggan",
        price: "৳480",
        coverImage: "/biggan.png",
      },
      {
        id: "7",
        title: "IELTS Writing Masterclass",
        author: "Redowan Hasan",
        price: "৳520",
        coverImage: "/english.png",
      },
    ],
  },
};
