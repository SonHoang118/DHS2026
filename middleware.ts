import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // TODO: Implement authentication check for admin routes
  // Check if user is authenticated before allowing access to /admin routes

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
