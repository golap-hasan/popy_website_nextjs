import { IBook } from './book';
import { TUser } from './user';

export type TOrder = {
  user: TUser;
  books: IOrderBook[];

  totalPrice: number;
  deliveryCharge: number;
  finalAmount: number;

  shippingAddress: string;
  paymentMethod: 'COD' | 'Online';

  status: 'Pending' | 'Completed' | 'Cancelled'; // default: 'Pending', if COD then 'Completed', if Online then 'Pending'
  paymentStatus: 'Pending' | 'Paid' | 'Failed'; // default: 'Pending', if COD then 'Pending', if Online then 'Pending'
  deliveryStatus: 'Processing' | 'Delivered' | 'Cancelled'; // default: 'Processing', if COD then 'Processing', if Online then 'Processing'

  rating?: number;
  review?: string;

  isDeleted: boolean; // default: false

  createdAt: Date;
  updatedAt: Date;
};

export interface IOrderBook {
  book: IBook;
  quantity: number;
  unitPrice: number;
}
