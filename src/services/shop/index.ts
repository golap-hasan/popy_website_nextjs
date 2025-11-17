/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
const params = new URLSearchParams();

// GET ALL BOOKS
export const getBooks = async (query: {
  [key: string]: string | string[] | undefined;
}) => {
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
// export const getReviewsByBookSlug = async (
//   slug: string, 
//   page: string | string[] | undefined,
//   limit:string | string[] | undefined
// ) => {

//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_API}/review/${slug}?page=${page}&limit=${limit}}`
//     );
//     return await res.json();
//   } catch (error: any) {
//     return Error(error);
//   }
// };

export const getReviewsByBookSlug = async (
  slug: string,
  query: { 
    page?: string | number;
    limit?: string | number;
    [key: string]: string | string[] | number | undefined;
  } = {}
) => {
  const params = new URLSearchParams();
  
  if (query.page) params.set('page', query.page.toString());
  if (query.limit) params.set('limit', query.limit.toString());
  
  // Add other query params if needed
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== '' && !['page', 'limit'].includes(key)) {
      params.set(key, value.toString());
    }
  });

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/review/${slug}?${params.toString()}`
    );
    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};
