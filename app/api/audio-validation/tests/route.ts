import { NextResponse } from 'next/server';

export async function GET() {
  // Mock data - in production this would come from the backend analysis service
  const tests = [
    {
      id: 'test-001',
      timestamp: '2026-04-26T06:00:00Z',
      persona: 'cooperative_clear',
      scenario: 'takeaway_simple',
      difficulty: 1,
      outcome: 'passed' as const,
      turns: 5,
      callerAudioUrl: '/audio/demos/test-audio/test-session-001.raw',
      agentAudioUrl: '/audio/demos/test-audio/test-session-001.raw',
      summary: 'Order confirmed: Pizza Margherita, Coca-Cola. Pickup: 18:30 at counter.',
    },
    {
      id: 'test-002',
      timestamp: '2026-04-26T05:30:00Z',
      persona: 'cooperative_clear',
      scenario: 'wine_availability',
      difficulty: 1,
      outcome: 'passed' as const,
      turns: 3,
      callerAudioUrl: '/audio/demos/de-hotel.mp3',
      agentAudioUrl: '/audio/demos/de-hotel.mp3',
      summary: 'Wine inquiry: Riesling 2020 in stock. Two bottles reserved.',
    },
  ];

  return NextResponse.json(
    { tests, total: tests.length },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      },
    }
  );
}
