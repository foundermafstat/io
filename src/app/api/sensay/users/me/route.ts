import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Получаем API ключи из переменных окружения
    const apiKey = process.env.SENSAY_API_KEY;
    const orgId = process.env.SENSAY_ORG_ID;
    const userId = process.env.SENSAY_USER_ID;

    if (!apiKey || !orgId) {
      return NextResponse.json(
        { error: "Missing required API settings in environment variables (SENSAY_API_KEY, SENSAY_ORG_ID)" },
        { status: 400 }
      );
    }

    console.log(`Getting user info for user ID: ${userId || 'not provided'}`);

    // Выполняем запрос к Sensay API для получения информации о пользователе
    const url = "https://api.sensay.io/v1/users/me";
    console.log(`Sending GET request to: ${url}`);
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-ORGANIZATION-SECRET": apiKey,
        "X-USER-ID": userId || apiKey,
        "X-API-Version": "2025-03-25",
        "x-organization-id": orgId,
      },
    });

    console.log(`Response status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error response: ${errorText}`);
      return NextResponse.json(
        { error: `Failed to get user info: ${response.status} ${response.statusText}`, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('User info retrieved successfully:', data);

    // Возвращаем данные пользователя
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in user info route:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Failed to get user info: ${errorMessage}` },
      { status: 500 }
    );
  }
}

