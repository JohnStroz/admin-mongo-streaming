import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const { password } = await request.json();
  if (password === process.env.PASSWORD_ADMIN) {
    const cookieStore = await cookies();
    cookieStore.set('adminAuth', password, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 3600,
      path: '/',
    });
    return NextResponse.json({ message: 'Login successful' });
  } else {
    return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
  }
}