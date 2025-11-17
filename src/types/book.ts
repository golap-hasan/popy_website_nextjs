import { ICategory } from './category';

export interface IBook {
  _id: string;

  title: string;
  subtitle: string;
  author: string;
  slug: string;
  category: string | ICategory;

  quantity: number;
  price: number;
  originalPrice?: number;

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
  };

  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;
}

// Shared detail page types (aligned with API response and components)
export type RelatedItem = {
  _id: string;
  slug?: string;
  title: string;
  author?: string;
  price?: number | string;
  originalPrice?: number | string;
  coverImage?: string;
};

export type TBook = {
  _id: string;
  title: string;
  subtitle?: string;
  author: string;
  slug: string;
  price: number;
  originalPrice?: number;
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
  };
  // API may provide either related or relatedBooks; components handle both
  related?: RelatedItem[];
  relatedBooks?: RelatedItem[];
};

export type BookReview = {
  createdAt: string;
  rating: number;
  review: string;
  userData?: {
    name?: string;
    image?: string;
  };
};

