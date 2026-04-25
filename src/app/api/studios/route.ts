import { NextRequest, NextResponse } from 'next/server';
import { LUXURY_THEMES, THEME_COLORS } from '@/lib/firebase-mock';

/**
 * POST /api/studios
 * Create a new studio (Mock mode)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      domain,
      businessName,
      email,
      userId,
      theme = 'waxing-rose-gold',
    } = body;

    // Validate required fields
    if (!domain || !businessName || !email) {
      return NextResponse.json(
        { error: 'Domain, business name, and email are required' },
        { status: 400 }
      );
    }

    // Validate theme
    const validThemes = LUXURY_THEMES.map((t) => t.id);
    if (!validThemes.includes(theme)) {
      return NextResponse.json(
        { error: 'Invalid theme selection' },
        { status: 400 }
      );
    }

    // Mock mode - return success response
    // In production this would use Firebase
    const mockStudioId = 'studio_' + Date.now();

    return NextResponse.json({
      success: true,
      studioId: mockStudioId,
      message: 'Studio created successfully (Mock mode)',
      mock: true,
    });
  } catch (error) {
    console.error('Create studio error:', error);
    return NextResponse.json(
      { error: 'Failed to create studio' },
      { status: 500 }
    );
  }
}
