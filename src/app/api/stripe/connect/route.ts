import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/stripe/connect
 * Create Stripe Connect account for a studio (Mock mode)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { studioId, userId } = body;

    if (!studioId || !userId) {
      return NextResponse.json(
        { error: 'Studio ID and User ID are required' },
        { status: 400 }
      );
    }

    // Mock mode - return mock response
    // In production this would use Firebase and Stripe
    const mockAccountId = `acct_mock_${Date.now()}`;

    return NextResponse.json({
      success: true,
      accountLink: `/admin/settings/billing?success=true&mock=true`,
      mockAccountId,
      mock: true,
    });
  } catch (error: any) {
    console.error('Stripe Connect error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create Stripe account' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/stripe/connect
 * Get Stripe Connect account status for a studio (Mock mode)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const studioId = searchParams.get('studioId');

    if (!studioId) {
      return NextResponse.json(
        { error: 'Studio ID is required' },
        { status: 400 }
      );
    }

    // Mock mode - return mock status
    return NextResponse.json({
      connected: false,
      needsOnboarding: true,
      mock: true,
    });
  } catch (error: any) {
    console.error('Stripe Connect status error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to get Stripe status' },
      { status: 500 }
    );
  }
}
