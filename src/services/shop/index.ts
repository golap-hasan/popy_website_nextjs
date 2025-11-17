/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

// GET BOOKS
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
