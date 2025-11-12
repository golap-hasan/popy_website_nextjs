export type AuthUser = {
  _id: string;

  name: string;
  address: string;
  phone: string;
  email: string;
  image: string;
  role: 'USER' | 'ADMIN';

  iat?: number;
  exp?: number;
};

export type TUser = {
  _id: string;

  name: string;
  address: string;
  phone: string;
  image: string;

  email: string;

  isVerifiedByOTP: boolean;

  role: 'USER';
  isActive: boolean;
  isDeleted: boolean;
  deactivationReason: string;

  createdAt: Date;
  updatedAt: Date;
};
