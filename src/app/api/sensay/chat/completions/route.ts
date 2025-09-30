import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Получаем параметры из запроса
    const { replicaUuid, content, skipChatHistory = false } = body;
    
    if (!replicaUuid) {
      return NextResponse.json(
        { error: "replicaUuid is required" },
        { status: 400 }
      );
    }

    if (!content) {
      return NextResponse.json(
        { error: "content is required" },
        { status: 400 }
      );
    }

    // Получаем API ключи из переменных окружения
    const apiKey = process.env.SENSAY_API_KEY;
    const orgId = process.env.SENSAY_ORG_ID;
    const userId = process.env.SENSAY_USER_ID;

    if (!apiKey || !orgId || !userId) {
      return NextResponse.json(
        { error: "Missing required API settings in environment variables (SENSAY_API_KEY, SENSAY_ORG_ID, SENSAY_USER_ID)" },
        { status: 400 }
      );
    }

    console.log('Sending message to replica:', { 
      replicaUuid, 
      contentLength: content.length,
      skipChatHistory 
    });

    // Выполняем запрос к Sensay API для отправки сообщения
    const url = `https://api.sensay.io/v1/replicas/${replicaUuid}/chat/completions`;
    console.log(`Sending POST request to: ${url}`);
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "X-ORGANIZATION-SECRET": apiKey,
        "X-USER-ID": userId,
        "Content-Type": "application/json",
        "X-API-Version": "2025-03-25",
        "x-organization-id": orgId,
      },
      body: JSON.stringify({
        content,
        skip_chat_history: skipChatHistory,
        source: 'web',
      }),
    });

    console.log(`Response status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error response: ${errorText}`);
      return NextResponse.json(
        { error: `Failed to send message: ${response.status} ${response.statusText}`, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('Message sent successfully');

    // Возвращаем ответ от реплики
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in chat completions route:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Failed to send message: ${errorMessage}` },
      { status: 500 }
    );
  }
}

