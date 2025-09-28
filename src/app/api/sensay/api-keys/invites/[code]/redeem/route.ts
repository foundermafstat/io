import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const { code } = params;
    const body = await request.json();

    // Валидация входных данных
    if (!code) {
      return NextResponse.json(
        { error: 'Invitation code is required' },
        { status: 400 }
      );
    }

    if (!body.organizationName || !body.name || !body.email) {
      return NextResponse.json(
        { error: 'organizationName, name, and email are required' },
        { status: 400 }
      );
    }

    // Выполняем запрос к Sensay API
    const response = await fetch(
      `https://api.sensay.io/v1/api-keys/invites/${code}/redeem`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Version': '2025-03-25',
        },
        body: JSON.stringify({
          organizationName: body.organizationName,
          name: body.name,
          email: body.email,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Sensay API Error:', response.status, errorData);
      return NextResponse.json(
        { error: 'Failed to redeem invitation', details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Error redeeming API key invitation:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

