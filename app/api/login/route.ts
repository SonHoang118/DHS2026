import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // TODO: Implement admin login logic
    return NextResponse.json({ message: 'Login successful' });
  } catch (error) {
    return NextResponse.json({ error: 'Login failed' }, { status: 401 });
  }
}
