/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

// GET BOOKS
export const getBooks = async (query: {
  [key: string]: string | string[] | undefined;
}) => {
  const params = new URLSearchParams();
  if (query.searchTerm) params.set("searchTerm", query.searchTerm.toString());
  if (query.category) params.set("category", query.category.toString());
  if (query.minPrice) params.set("minPrice", query.minPrice.toString());
  if (query.maxPrice) params.set("maxPrice", query.maxPrice.toString());
  if (query.sort) params.set("sort", query.sort.toString());
  if (query.page) params.set("page", query.page.toString());
  if (query.rating) params.set("rating", query.rating.toString());
  if (query.authors) params.set("authors", query.authors.toString());
  if (query.publishers) params.set("publishers", query.publishers.toString());

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/book?${params.toString()}`,
    { next: { revalidate: 300, tags: ["BOOK"] } }
  );

  const result = await res.json();
  return result;
};

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
