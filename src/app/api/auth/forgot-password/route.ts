import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    // In production, this would:
    // 1. Check if user exists
    // 2. Generate a reset token
    // 3. Send email with reset link
    // 4. Return success regardless of whether user exists (security)

    return NextResponse.json({
      message: 'If an account exists with this email, a password reset link has been sent.',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
