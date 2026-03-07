import { NextRequest, NextResponse } from 'next/server';
import {
  ADMIN_AUTH_COOKIE,
  ADMIN_AUTH_TOKEN,
  isValidAdminCredentials,
} from '@/lib/adminAuth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = typeof body?.email === 'string' ? body.email.trim() : '';
    const password = typeof body?.password === 'string' ? body.password : '';

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Vui long nhap day du email va mat khau' },
        { status: 400 }
      );
    }

    if (!isValidAdminCredentials(email, password)) {
      return NextResponse.json(
        { error: 'Sai thong tin dang nhap' },
        { status: 401 }
      );
    }

    const response = NextResponse.json({ message: 'Login successful' });
    response.cookies.set({
      name: ADMIN_AUTH_COOKIE,
      value: ADMIN_AUTH_TOKEN,
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: 'Dang nhap that bai' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ message: 'Logout successful' });
  response.cookies.set({
    name: ADMIN_AUTH_COOKIE,
    value: '',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  });

  return response;
}
