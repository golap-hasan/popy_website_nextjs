/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

// GET ALL BOOKS
export const getBooks = async (query: {
  [key: string]: string | string[] | undefined;
}) => {
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      params.set(key, value.toString());
    }
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/book?${params.toString()}`,
    { next: { revalidate: 300, tags: ["BOOK"] } }
  );

  const result = await res.json();
  return result;
};

// GET CATEGORIES
export const getCategories = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/category`, {
      method: "GET",
      next: {
        revalidate: 300,
        tags: ["CATEGORY"],
      },
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// GET SINGLE BOOKS
export const getSingleBookBySlug = async (slug:string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/book/${slug}`)
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error)
  }
}

// GET REVIEWS
export const getReviews = async (id:string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/book/reviews/${id}`)
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error)
  }
}

