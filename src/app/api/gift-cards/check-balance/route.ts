import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (!code) {
      return NextResponse.json({ error: 'Gift card code is required' }, { status: 400 });
    }

    const giftCard = await prisma.giftCard.findUnique({
      where: { code },
      include: {
        transactions: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!giftCard) {
      return NextResponse.json({ error: 'Gift card not found' }, { status: 404 });
    }

    return NextResponse.json({
      code: giftCard.code,
      originalAmount: giftCard.originalAmount,
      currentBalance: giftCard.currentBalance,
      isActive: giftCard.isActive,
      validUntil: giftCard.validUntil,
      purchasedForName: giftCard.purchasedForName,
    });
  } catch (error) {
    console.error('Gift card lookup failed:', error);
    return NextResponse.json({ error: 'Failed to lookup gift card' }, { status: 500 });
  }
}
