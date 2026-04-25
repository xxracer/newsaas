import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const domain = searchParams.get('domain');

    if (!domain) {
      return NextResponse.json(
        { error: 'Domain parameter is required' },
        { status: 400 }
      );
    }

    const normalizedDomain = domain.toLowerCase().replace('www.', '');

    const studio = await prisma.businessSettings.findFirst({
      where: {
        domain: normalizedDomain,
        isPublished: true,
      },
      select: {
        businessName: true,
        businessType: true,
        tagline: true,
        address: true,
        city: true,
        state: true,
        zip: true,
        country: true,
        phone: true,
        email: true,
        hours: true,
        logoUrl: true,
        themeId: true,
        colors: true,
        instagram: true,
        facebook: true,
        tiktok: true,
      },
    });

    if (!studio) {
      return NextResponse.json(
        { error: 'Studio not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ studio });
  } catch (error: any) {
    console.error('Lookup studio error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to lookup studio' },
      { status: 500 }
    );
  }
}
