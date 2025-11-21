import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from './services/Auth';

type Role = keyof typeof roleBasedPrivateRoutes;

const authRoutes = [
  '/auth/forgot-password',
  '/auth/login',
  '/auth/register',
  '/auth/reset-password',
  '/auth/verify-otp',
];

const roleBasedPrivateRoutes = {
  USER: [/^\/profile/, /^\/my-orders/, /^\/checkout/],
};

export const proxy = async (request: NextRequest) => {
  const { pathname, origin } = request.nextUrl;

  const user = await getCurrentUser();

  if (!user) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(`${origin}/auth/login?redirectPath=${pathname}`);
    }
  }

  if (user?.role && roleBasedPrivateRoutes[user?.role as Role]) {
    const routes = roleBasedPrivateRoutes[user?.role as Role];
    if (routes.some(route => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL('/', request.url));
};

export const config = {
  matcher: [
    '/auth/:page',
    '/profile',
    '/profile/:page',
    '/my-orders',
    '/checkout',
  ],
};
