import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2026-03-25.dahlia',
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { appointmentId, services, customerEmail, customerName } = body;

    if (!appointmentId || !services?.length) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: customerEmail,
      line_items: services.map((service: any) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: service.name,
            description: `${service.duration} minutes`,
          },
          unit_amount: Math.round(service.price * 100),
        },
        quantity: 1,
      })),
      metadata: {
        appointmentId,
        type: 'appointment',
      },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9002'}/book/success?session_id={CHECKOUT_SESSION_ID}&appointment=${appointmentId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9002'}/book?cancelled=true`,
    });

    return NextResponse.json({ checkoutUrl: session.url });
  } catch (error) {
    console.error('Stripe checkout creation failed:', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
