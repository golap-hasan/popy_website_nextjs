/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

// getContentPagesData
export const getContentPagesData = async (type:string): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/page/retrieve/${type}`,
      {
        method: 'GET',

        next: {
          tags: ['PAGES'],
        },
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};