import { NextRequest, NextResponse } from 'next/server';

export interface SensayReplicaLLM {
  model: string;
  tools: string[];
  memoryMode: string;
  systemMessage: string;
}

export interface SensayReplicaIntegration {
  token: string;
  is_active?: boolean;
  service_name: string;
}

export interface SensayReplica {
  llm: SensayReplicaLLM;
  name: string;
  slug: string;
  tags: string[];
  type: string;
  uuid: string;
  ownerID: string;
  private: boolean;
  purpose: string;
  greeting: string;
  created_at: string;
  owner_uuid: string;
  elevenLabsID?: string;
  introduction?: string;
  profileImage?: string;
  profile_image?: string;
  video_enabled: boolean;
  voice_enabled: boolean;
  system_message: string;
  whitelistEmails?: string[];
  shortDescription?: string;
  short_description?: string;
  chat_history_count: number;
  suggestedQuestions?: string[];
  discord_integration?: SensayReplicaIntegration;
  telegram_integration?: SensayReplicaIntegration;
}

interface SensayReplicasResponse {
  success: boolean;
  type: string;
  items: SensayReplica[];
  total: number;
  message?: string;
}

/**
 * Получить список реплик с поддержкой параметров запроса
 */
export async function GET(request: NextRequest) {
  try {
    // Получаем параметры запроса
    const { searchParams } = new URL(request.url);
    const ownerUuid = searchParams.get('ownerUuid');
    const pageIndex = parseInt(searchParams.get('pageIndex') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '24');
    const slug = searchParams.get('slug');
    const search = searchParams.get('search');
    const tags = searchParams.get('tags');
    const sort = searchParams.get('sort') || 'name';
    const integration = searchParams.get('integration');

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

    console.log(`Using API key: ${apiKey.substring(0, 5)}...`);
    console.log(`Using organization ID: ${orgId}`);
    console.log(`Using user ID: ${userId || apiKey}`);

    // Формируем URL с параметрами
    const baseUrl = "https://api.sensay.io/v1/replicas";
    const urlParams = new URLSearchParams();
    
    if (ownerUuid) urlParams.append('ownerUuid', ownerUuid);
    if (pageIndex) urlParams.append('pageIndex', pageIndex.toString());
    if (pageSize) urlParams.append('pageSize', pageSize.toString());
    if (slug) urlParams.append('slug', slug);
    if (search) urlParams.append('search', search);
    if (tags) urlParams.append('tags', tags);
    if (sort) urlParams.append('sort', sort);
    if (integration) urlParams.append('integration', integration);

    const url = `${baseUrl}?${urlParams.toString()}`;
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
        { error: `Failed to fetch replicas: ${response.status} ${response.statusText}`, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json() as SensayReplicasResponse;
    console.log('Response data received');

    if (!data.success) {
      console.error('API returned success: false');
      return NextResponse.json(
        { error: `API Error: ${data.message || 'Unknown error'}` },
        { status: 400 }
      );
    }

    // Возвращаем полный ответ с метаданными
    console.log(`Retrieved ${data.items?.length || 0} replicas.`);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in replicas list GET route:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Failed to fetch replicas: ${errorMessage}` },
      { status: 500 }
    );
  }
}

