import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import authOptions from '@/lib/auth/config';

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function requireAuth(): Promise<{ user: { id: string; email?: string; name?: string; role: string } }> {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) as any;
  }
  return session as any;
}

export async function requireAdmin(): Promise<{ user: { id: string; email?: string; name?: string; role: string } }> {
  const session = await requireAuth();
  if ((session?.user as any)?.role !== 'ADMIN' && (session?.user as any)?.role !== 'SUPER_ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 }) as any;
  }
  return session;
}