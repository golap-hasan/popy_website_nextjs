/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidAccessTokenForServerActions } from "@/lib/getValidAccessToken";

interface ReviewPayload {
  rating: number;
  review: string;
}

// Post Review
export const postReview = async (
  orderId: string,
  data: ReviewPayload
): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerActions();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/review/${orderId}`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// Update Review
export const updateReview = async (
  reviewId: string,
  data: ReviewPayload
): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerActions();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/review/${reviewId}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// Delete Review
export const deleteReview = async (reviewId: string): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerActions();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/review/${reviewId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

