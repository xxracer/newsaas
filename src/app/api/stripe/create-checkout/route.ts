import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/stripe/create-checkout
 * Create a checkout session for a payment (Mock mode)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      studioId,
      amount,
      currency = 'usd',
      description,
      metadata = {},
    } = body;

    if (!studioId || !amount) {
      return NextResponse.json(
        { error: 'Studio ID and amount are required' },
        { status: 400 }
      );
    }

    // Mock mode - simulate Stripe checkout
    // In production this would use Firebase and create real Stripe sessions
    const mockSessionId = `cs_mock_${Date.now()}`;

    return NextResponse.json({
      sessionId: mockSessionId,
      url: `/stripe/success?session_id=${mockSessionId}`,
      mock: true,
    });
  } catch (error: any) {
    console.error('Create checkout error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
