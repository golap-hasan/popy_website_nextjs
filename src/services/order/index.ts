/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { getValidAccessTokenForServerActions } from "@/lib/getValidAccessToken";
import { updateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

// Place Order
export const placeOrder = async(data: FieldValues)=>{
  const accessToken = await getValidAccessTokenForServerActions();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/order`,
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    updateTag("ORDERS",)
    
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
}

//  Get Orders
export const getOrders = async (): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerActions();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/order`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        next: {
          tags: ['ORDERS'],
        },
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

//  Track Order
export const trackOrder = async (id: string): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/order/track/${id}`,
      {
        method: 'GET',
        next: {
          tags: ['TRACKS'],
        },
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};