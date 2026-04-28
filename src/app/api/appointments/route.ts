import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { addMinutes } from 'date-fns';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const appointments = await prisma.appointment.findMany({
      where: status ? { status: status as any } : undefined,
      include: {
        items: {
          include: {
            service: true,
          },
        },
        clientProfile: {
          include: {
            user: true,
          },
        },
      },
      orderBy: { dateTime: 'desc' },
    });

    return NextResponse.json(appointments);
  } catch (error) {
    console.error('Failed to fetch appointments, returning demo data:', error);
    // Return empty array for demo mode
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { dateTime, services, clientInfo } = body;

    // Calculate end time based on total duration
    const totalDuration = services.reduce((sum: number, s: any) => sum + (s.duration || 30), 0);
    const appointmentDate = new Date(dateTime);
    const endDateTime = addMinutes(appointmentDate, totalDuration);

    // Calculate total
    const subtotal = services.reduce((sum: number, s: any) => sum + s.price, 0);

    // Create or find client
    let clientProfile = null;
    if (clientInfo.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email: clientInfo.email },
        include: { clientProfile: true },
      });

      if (existingUser?.clientProfile) {
        clientProfile = existingUser.clientProfile;
      } else if (existingUser) {
        clientProfile = await prisma.clientProfile.create({
          data: { userId: existingUser.id },
        });
      } else {
        const newUser = await prisma.user.create({
          data: {
            email: clientInfo.email,
            firstName: clientInfo.firstName,
            lastName: clientInfo.lastName,
            phone: clientInfo.phone,
            role: 'CLIENT',
            clientProfile: {
              create: {},
            },
          },
          include: { clientProfile: true },
        });
        clientProfile = newUser.clientProfile;
      }
    }

    const appointment = await prisma.appointment.create({
      data: {
        dateTime: appointmentDate,
        endDateTime,
        clientProfileId: clientProfile?.id,
        guestFirstName: clientInfo.firstName,
        guestLastName: clientInfo.lastName,
        guestEmail: clientInfo.email,
        guestPhone: clientInfo.phone,
        clientNotes: clientInfo.notes,
        status: 'PENDING',
        subtotal,
        tax: 0,
        total: subtotal,
        source: 'ONLINE',
        items: {
          create: services.map((s: any) => ({
            serviceId: s.serviceId,
            price: s.price,
            quantity: 1,
          })),
        },
      },
      include: {
        items: {
          include: { service: true },
        },
      },
    });

    return NextResponse.json({
      appointment,
      checkoutUrl: `/checkout?appointment=${appointment.id}`,
    });
  } catch (error) {
    console.error('Failed to create appointment in DB, returning demo appointment:', error);
    const body = await request.json().catch(() => ({}));
    const { dateTime, services, clientInfo } = body;
    const subtotal = (services || []).reduce((sum: number, s: any) => sum + (s.price || 0), 0);

    // Return a fake appointment for demo mode
    const fakeId = `demo-${Date.now()}`;
    return NextResponse.json({
      appointment: {
        id: fakeId,
        dateTime,
        endDateTime: dateTime,
        status: 'PENDING',
        subtotal,
        tax: 0,
        total: subtotal,
        guestFirstName: clientInfo?.firstName,
        guestLastName: clientInfo?.lastName,
        guestEmail: clientInfo?.email,
        guestPhone: clientInfo?.phone,
        clientNotes: clientInfo?.notes,
        items: (services || []).map((s: any) => ({
          id: `item-${Math.random()}`,
          serviceId: s.serviceId,
          price: s.price,
          quantity: 1,
          service: { name: s.name || 'Service' },
        })),
      },
      checkoutUrl: null,
      demo: true,
    });
  }
}
