import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/studio/lookup
 * Lookup studio by domain (Mock mode)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const domain = searchParams.get('domain');

    if (!domain) {
      return NextResponse.json(
        { error: 'Domain parameter is required' },
        { status: 400 }
      );
    }

    // Mock mode - return mock studio data
    // In production this would use Firebase
    return NextResponse.json({
      exists: true,
      studio: {
        id: 'studio_mock',
        domain: domain,
        businessName: 'Demo Studio',
        tagline: 'Tu destino de belleza',
        logoUrl: null,
        theme: { id: 'waxing-rose-gold', name: 'Rose Gold Elegance' },
        colors: {
          primary: '#EC4899',
          secondary: '#F472B6',
          accent: '#FCD34D',
          background: '#FDF8F5',
        },
        address: '123 Main Street',
        city: 'Miami',
        state: 'FL',
        phone: '(305) 555-0123',
        email: 'info@demo-studio.com',
        instagram: '@demo-studio',
        facebook: 'demo-studio',
        tiktok: null,
      },
      mock: true,
    });
  } catch (error) {
    console.error('Studio lookup error:', error);
    return NextResponse.json(
      { error: 'Failed to lookup studio' },
      { status: 500 }
    );
  }
}
