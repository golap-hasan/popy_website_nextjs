export type OrderBookItem = {
  quantity: number;
  unitPrice: number;
  book?: {
    title?: string;
    coverImage?: string;
    slug?: string;
  };
};

export type Order = {
  _id: string;
  deliveryCharge: number;
  finalAmount: number;
  shippingAddress: string;
  paymentMethod: string;
  status: string;
  paymentStatus: string;
  deliveryStatus: string;
  books?: OrderBookItem[];
};