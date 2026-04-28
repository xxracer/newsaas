import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getDemoCategories } from '@/lib/demo-data';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const businessType = searchParams.get('businessType');

    const where: any = { isActive: true };
    if (businessType) {
      where.businessType = businessType;
    }

    const categories = await prisma.category.findMany({
      where,
      orderBy: { sortOrder: 'asc' },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error('Failed to fetch categories from DB, returning demo data:', error);
    const { searchParams } = new URL(request.url);
    const businessType = searchParams.get('businessType');
    const demoCategories = getDemoCategories(businessType);
    return NextResponse.json(demoCategories);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, slug, description, imageUrl, sortOrder, gender, businessType } = body;

    const category = await prisma.category.create({
      data: {
        name,
        slug,
        description,
        imageUrl,
        sortOrder: sortOrder || 0,
        gender: gender || 'FEMALE',
        businessType: businessType || 'waxing',
      },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error('Failed to create category:', error);
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}
