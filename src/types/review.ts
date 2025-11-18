export type BookReviewUser = {
  name?: string;
  image?: string;
};

export type BookReview = {
  createdAt: string;
  rating: number | string;
  review: string;
  userData?: BookReviewUser;
};
