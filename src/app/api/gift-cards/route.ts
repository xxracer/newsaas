import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { randomBytes } from 'crypto';
import QRCode from 'qrcode';

function generateGiftCardCode(): string {
  return randomBytes(8).toString('hex').toUpperCase();
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, purchaserEmail, purchasedForName, purchasedForEmail, message } = body;

    if (!amount || amount < 1) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    const code = generateGiftCardCode();
    const qrCodeData = JSON.stringify({ type: 'GIFT_CARD', code });

    const qrCode = await QRCode.toDataURL(qrCodeData, {
      width: 300,
      margin: 2,
      color: {
        dark: '#D8006E',
        light: '#F9E4EE',
      },
    });

    const giftCard = await prisma.giftCard.create({
      data: {
        code,
        qrCodeData: qrCode,
        originalAmount: amount,
        currentBalance: amount,
        purchasedForName,
        purchasedForEmail,
        message,
        user: purchaserEmail
          ? {
              connect: { email: purchaserEmail },
            }
          : undefined,
      },
    });

    await prisma.giftCardTransaction.create({
      data: {
        giftCardId: giftCard.id,
        amount,
        type: 'PURCHASE',
      },
    });

    return NextResponse.json({
      giftCard,
      qrCode,
    });
  } catch (error) {
    console.error('Gift card creation failed:', error);
    return NextResponse.json({ error: 'Failed to create gift card' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const giftCards = await prisma.giftCard.findMany({
      include: {
        user: {
          select: { email: true },
        },
        transactions: {
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(giftCards);
  } catch (error) {
    console.error('Failed to fetch gift cards:', error);
    return NextResponse.json({ error: 'Failed to fetch gift cards' }, { status: 500 });
  }
}
