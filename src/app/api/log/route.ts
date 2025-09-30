import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db-init';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const event = searchParams.get('event');
  const selector = searchParams.get('selector');
  const payload = searchParams.get('payload');
  const type = searchParams.get('type') || 'dom_event';

  if (!event) {
    return NextResponse.json({ error: 'Missing event parameter' }, { status: 400 });
  }

  try {
    await prisma.agentEvent.create({
      data: {
        type,
        event,
        selector: selector || null,
        payload: payload || null,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error logging event:', error);
    return NextResponse.json({ error: 'Failed to log event' }, { status: 500 });
  }
}
