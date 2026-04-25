import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/auth/config';

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      where: { isActive: true },
      include: { category: true },
      orderBy: [{ category: { sortOrder: 'asc' } }, { sortOrder: 'asc' }],
    });

    return NextResponse.json(services);
  } catch (error) {
    console.error('Failed to fetch services:', error);
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !((session.user as any)?.role === 'ADMIN' || (session.user as any)?.role === 'SUPER_ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, slug, description, price, duration, categoryId, gender, imageUrl, bufferBefore, bufferAfter, isActive, sortOrder } = body;

    const service = await prisma.service.create({
      data: {
        name,
        slug,
        description,
        price,
        duration,
        categoryId,
        gender,
        imageUrl,
        bufferBefore: bufferBefore || 0,
        bufferAfter: bufferAfter || 0,
        isActive: isActive ?? true,
        sortOrder: sortOrder || 0,
      },
    });

    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    console.error('Failed to create service:', error);
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
  }
}
