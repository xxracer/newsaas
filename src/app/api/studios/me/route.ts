import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth/config';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const studio = await prisma.businessSettings.findUnique({
      where: { userId: session.user.id },
    });

    if (!studio) {
      return NextResponse.json({ studio: null }, { status: 200 });
    }

    return NextResponse.json({ studio });
  } catch (error: any) {
    console.error('Get studio error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to get studio' },
      { status: 500 }
    );
  }
}
