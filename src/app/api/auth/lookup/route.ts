import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/auth/lookup
 * Lookup user/studio by email for branded login (Mock mode)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { exists: false },
        { status: 400 }
      );
    }

    // Mock mode - return mock response
    // In production this would use Firebase
    return NextResponse.json({
      exists: true,
      isAdmin: true,
      needsSetup: false,
      domain: 'demo-studio',
      businessName: 'Demo Studio',
      logoUrl: null,
      primaryColor: '#EC4899',
      mock: true,
    });
  } catch (error) {
    console.error('Lookup error:', error);
    return NextResponse.json({ exists: false });
  }
}