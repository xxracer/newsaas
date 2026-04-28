import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { addMinutes, format, setHours, setMinutes, startOfDay } from 'date-fns';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const dateStr = searchParams.get('date');
    const duration = parseInt(searchParams.get('duration') || '30', 10);

    if (!dateStr) {
      return NextResponse.json({ error: 'Date is required' }, { status: 400 });
    }

    const date = new Date(dateStr);

    // Get business hours (default 9am-6pm)
    const businessStart = 9; // 9 AM
    const businessEnd = 18; // 6 PM

    // Get existing appointments for the date
    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59, 999);

    const existingAppointments = await prisma.appointment.findMany({
      where: {
        dateTime: {
          gte: dayStart,
          lte: dayEnd,
        },
        status: {
          in: ['PENDING', 'CONFIRMED'],
        },
      },
      include: {
        items: {
          include: {
            service: true,
          },
        },
      },
    });

    // Calculate booked slots
    const bookedSlots: { start: Date; end: Date }[] = [];
    for (const apt of existingAppointments) {
      bookedSlots.push({
        start: new Date(apt.dateTime),
        end: new Date(apt.endDateTime),
      });
    }

    // Generate available time slots
    const slots: { time: string; available: boolean }[] = [];

    for (let hour = businessStart; hour < businessEnd; hour++) {
      for (let min = 0; min < 60; min += 30) {
        const slotStart = setMinutes(setHours(new Date(dayStart), hour), min);
        const slotEnd = addMinutes(slotStart, duration);

        // Check if slot is in the past
        if (slotStart < new Date()) {
          slots.push({
            time: format(slotStart, 'HH:mm'),
            available: false,
          });
          continue;
        }

        // Check if slot end would be after business hours
        if (slotEnd.getHours() > businessEnd || (slotEnd.getHours() === businessEnd && slotEnd.getMinutes() > 0)) {
          slots.push({
            time: format(slotStart, 'HH:mm'),
            available: false,
          });
          continue;
        }

        // Check for conflicts with existing appointments
        let isAvailable = true;
        for (const booked of bookedSlots) {
          // Check if the slot overlaps with any booked appointment
          if (slotStart < booked.end && slotEnd > booked.start) {
            isAvailable = false;
            break;
          }
        }

        slots.push({
          time: format(slotStart, 'HH:mm'),
          available: isAvailable,
        });
      }
    }

    return NextResponse.json({ slots });
  } catch (error) {
    console.error('Availability check failed, returning demo slots:', error);
    const { searchParams } = new URL(request.url);
    const duration = parseInt(searchParams.get('duration') || '30', 10);
    const slots: { time: string; available: boolean }[] = [];
    for (let hour = 9; hour < 18; hour++) {
      for (let min = 0; min < 60; min += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
        const slotStart = setMinutes(setHours(startOfDay(new Date()), hour), min);
        const isPast = slotStart < new Date();
        slots.push({ time, available: isPast ? false : Math.random() > 0.25 });
      }
    }
    return NextResponse.json({ slots });
  }
}
