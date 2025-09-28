import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Получаем API ключи из переменных окружения
    const apiKey = process.env.SENSAY_API_KEY;
    const orgId = process.env.SENSAY_ORG_ID;

    if (!apiKey || !orgId) {
      return NextResponse.json(
        { error: "Missing required API settings in environment variables (SENSAY_API_KEY, SENSAY_ORG_ID)" },
        { status: 400 }
      );
    }

    console.log('Creating user with data:', { 
      name: body.name, 
      email: body.email,
      id: body.id 
    });

    // Выполняем запрос к Sensay API для создания пользователя
    const url = "https://api.sensay.io/v1/users";
    console.log(`Sending POST request to: ${url}`);
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "X-ORGANIZATION-SECRET": apiKey,
        "Content-Type": "application/json",
        "X-API-Version": "2025-03-25",
        "x-organization-id": orgId,
      },
      body: JSON.stringify({
        name: body.name,
        email: body.email,
        id: body.id,
      }),
    });

    console.log(`Response status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error response: ${errorText}`);
      return NextResponse.json(
        { error: `Failed to create user: ${response.status} ${response.statusText}`, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('User created successfully:', data);

    // Возвращаем данные созданного пользователя
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in user creation route:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Failed to create user: ${errorMessage}` },
      { status: 500 }
    );
  }
}

