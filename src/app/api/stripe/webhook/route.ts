import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';

/**
 * POST /api/stripe/webhook
 * Handle Stripe webhooks for payment events (Mock mode)
 */
export async function POST(request: NextRequest) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature') || '';

  try {
    // Mock mode - just return received without processing
    // In production this would use Firebase
    console.log('Webhook received (Mock mode):', body.substring(0, 100));

    return NextResponse.json({ received: true, mock: true });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: `Webhook error: ${error.message}` },
      { status: 400 }
    );
  }
}
