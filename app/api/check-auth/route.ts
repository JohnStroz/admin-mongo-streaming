import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  const adminAuth = cookieStore.get('adminAuth');
  if (adminAuth?.value === process.env.PASSWORD_ADMIN) {
    return NextResponse.json({ message: 'Authenticated' });
  } else {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }
}