import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/helpers';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = session.user as any;
  if (user.role !== 'SUPER_ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const businesses = await prisma.businessSettings.findMany({
    include: { user: { select: { email: true, firstName: true, lastName: true } } },
    orderBy: { businessName: 'asc' },
  });

  return NextResponse.json(businesses);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = session.user as any;
  if (user.role !== 'SUPER_ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { email, password, domain, businessName } = body;

    if (!email || !password || !domain) {
      return NextResponse.json({ error: 'Email, password and domain are required' }, { status: 400 });
    }

    // Check if domain or email already exists
    const existingDomain = await prisma.businessSettings.findUnique({ where: { domain } });
    if (existingDomain) {
      return NextResponse.json({ error: 'Domain already registered' }, { status: 409 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
    }

    // Create admin user and business settings
    const bcrypt = require('bcryptjs');
    const passwordHash = await bcrypt.hash(password, 12);

    const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // Create user first
      const adminUser = await tx.user.create({
        data: {
          email,
          passwordHash,
          role: 'ADMIN',
          firstName: 'Admin',
        },
      });

      // Then create business settings linked to user
      await tx.businessSettings.create({
        data: {
          userId: adminUser.id,
          domain,
          businessName: businessName || domain,
        },
      });

      return adminUser;
    });

    return NextResponse.json({ message: 'Business created successfully', domain }, { status: 201 });
  } catch (error) {
    console.error('Business creation error:', error);
    return NextResponse.json({ error: 'Failed to create business' }, { status: 500 });
  }
}