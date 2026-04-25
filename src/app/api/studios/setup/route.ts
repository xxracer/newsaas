import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth/config';
import prisma from '@/lib/prisma';
import { THEME_COLORS } from '@/lib/firebase-mock';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      businessName,
      businessType = 'waxing',
      email,
      phone,
      address,
      city,
      state,
      zip,
      country = 'USA',
      themeId,
      domain,
    } = body;

    if (!businessName || !email) {
      return NextResponse.json(
        { error: 'Business name and email are required' },
        { status: 400 }
      );
    }

    const colors = themeId && THEME_COLORS[themeId]
      ? JSON.stringify(THEME_COLORS[themeId])
      : null;

    const data = await prisma.businessSettings.upsert({
      where: { userId: session.user.id },
      update: {
        businessName,
        businessType,
        email,
        phone: phone || null,
        address: address || null,
        city: city || null,
        state: state || null,
        zip: zip || null,
        country,
        themeId: themeId || 'waxing-rose-gold',
        colors,
        domain: domain || null,
        isPublished: !!domain,
      },
      create: {
        userId: session.user.id,
        businessName,
        businessType,
        email,
        phone: phone || null,
        address: address || null,
        city: city || null,
        state: state || null,
        zip: zip || null,
        country,
        domain: domain || '',
        themeId: themeId || 'waxing-rose-gold',
        colors,
        isPublished: !!domain,
      },
    });

    return NextResponse.json({ success: true, studio: data });
  } catch (error: any) {
    console.error('Studio setup error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to save studio' },
      { status: 500 }
    );
  }
}
