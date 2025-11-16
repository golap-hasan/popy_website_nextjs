/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import {
  getValidAccessTokenForServerHandlerGet,
} from '@/lib/getValidAccessToken';

// getSingleClientBookings
export const getSingleClientBookings = async (
  page = '1',
  limit?: string,
  query?: { [key: string]: string | string[] | undefined }
): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerHandlerGet();

  const params = new URLSearchParams();
  // core pagination
  if (page) params.set('page', page.toString());
  if (limit) params.set('limit', limit.toString());
  // filters & options from Postman
  if (query?.searchTerm) params.set('searchTerm', query.searchTerm.toString());
  if (query?.category) params.set('category', query.category.toString());
  if (query?.minPrice) params.set('minPrice', query.minPrice.toString());
  if (query?.maxPrice) params.set('maxPrice', query.maxPrice.toString());
  if (query?.sort) params.set('sort', query.sort.toString());
  if (query?.fields) params.set('fields', query.fields.toString());

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/book?${params.toString()}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        next: {
          tags: ['BOOK'],
        },
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getCategories = async () => {
  const accessToken = await getValidAccessTokenForServerHandlerGet();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/category`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        next: {
          tags: ['CATEGORY'],
        },
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
