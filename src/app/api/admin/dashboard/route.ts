import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // In production, this would query the database for real stats
    // For now, return placeholder data
    const stats = {
      todayAppointments: 5,
      weekAppointments: 28,
      monthRevenue: 4250,
      activeClients: 156,
      recentAppointments: [
        {
          id: '1',
          clientName: 'Maria Garcia',
          service: 'Brazilian Wax',
          dateTime: '2024-01-15T10:00:00',
          status: 'CONFIRMED',
        },
        {
          id: '2',
          clientName: 'Jennifer Lopez',
          service: 'Full Leg Wax',
          dateTime: '2024-01-15T11:30:00',
          status: 'PENDING',
        },
      ],
    };

    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch dashboard stats' }, { status: 500 });
  }
}
