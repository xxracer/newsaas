import { getAcuityPackages } from '@/ai/flows/acuity-booking-flow';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const packages = await getAcuityPackages();
    return NextResponse.json(packages);
  } catch (error) {
    console.error('Error fetching packages in API route:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
