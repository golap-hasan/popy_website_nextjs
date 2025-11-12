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
