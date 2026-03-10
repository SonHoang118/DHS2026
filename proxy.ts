import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_AUTH_COOKIE, isAuthenticatedToken } from '@/lib/adminAuth';

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isLoginRoute = pathname === '/admin/login';
  const token = request.cookies.get(ADMIN_AUTH_COOKIE)?.value;
  const isAuthenticated = isAuthenticatedToken(token);

  if (!isAuthenticated && !isLoginRoute) {
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthenticated && isLoginRoute) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
