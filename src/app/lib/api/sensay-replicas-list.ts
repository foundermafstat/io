import { sensayClient } from './sensay';

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

export interface SensayReplicasResponse {
  success: boolean;
  type: string;
  items: SensayReplica[];
  total: number;
  message?: string;
}

export interface ReplicasListParams {
  ownerUuid?: string;
  pageIndex?: number;
  pageSize?: number;
  slug?: string;
  search?: string;
  tags?: string[];
  sort?: 'name' | 'popularity';
  integration?: 'telegram' | 'discord';
}

/**
 * Сервис для работы со списком реплик Sensay
 */
export class SensayReplicasListService {
  /**
   * Получить список реплик через SDK
   * @param params - Параметры запроса
   * @returns Промис с ответом API
   */
  static async getReplicas(params: ReplicasListParams = {}): Promise<SensayReplicasResponse> {
    try {
      console.log('Получение списка реплик через SDK:', params);

      const result = await sensayClient.replicas.getV1Replicas(
        params.ownerUuid,
        params.pageIndex || 1,
        params.pageSize || 24,
        params.slug,
        params.search,
        params.tags,
        params.sort || 'name',
        params.integration,
        '2025-03-25'
      );

      console.log('Список реплик получен через SDK:', {
        success: result.success,
        total: result.total,
        itemsCount: result.items?.length || 0,
      });

      return result;
    } catch (error) {
      console.error('Ошибка при получении списка реплик через SDK:', error);
      throw error;
    }
  }

  /**
   * Получить список реплик через прямой API вызов
   * @param params - Параметры запроса
   * @returns Промис с ответом API
   */
  static async getReplicasDirect(params: ReplicasListParams = {}): Promise<SensayReplicasResponse> {
    try {
      console.log('Прямое получение списка реплик:', params);

      // Получаем API ключи из переменных окружения
      const apiKey = process.env.SENSAY_API_KEY;
      const orgId = process.env.SENSAY_ORG_ID;
      const userId = process.env.SENSAY_USER_ID;

      if (!apiKey || !orgId) {
        throw new Error('Missing required API settings in environment variables (SENSAY_API_KEY, SENSAY_ORG_ID)');
      }

      // Формируем URL с параметрами
      const baseUrl = "https://api.sensay.io/v1/replicas";
      const urlParams = new URLSearchParams();
      
      if (params.ownerUuid) urlParams.append('ownerUuid', params.ownerUuid);
      if (params.pageIndex) urlParams.append('pageIndex', params.pageIndex.toString());
      if (params.pageSize) urlParams.append('pageSize', params.pageSize.toString());
      if (params.slug) urlParams.append('slug', params.slug);
      if (params.search) urlParams.append('search', params.search);
      if (params.tags) urlParams.append('tags', params.tags.join(','));
      if (params.sort) urlParams.append('sort', params.sort);
      if (params.integration) urlParams.append('integration', params.integration);

      const url = `${baseUrl}?${urlParams.toString()}`;
      console.log(`Отправка GET запроса на: ${url}`);
      
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "X-ORGANIZATION-SECRET": apiKey,
          "X-USER-ID": userId || apiKey,
          "X-API-Version": "2025-03-25",
          "x-organization-id": orgId,
        },
      });

      console.log(`Статус ответа: ${response.status} ${response.statusText}`);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Ошибка ответа: ${errorText}`);
        throw new Error(`Ошибка API (${response.status}): ${errorText}`);
      }

      const data = await response.json() as SensayReplicasResponse;
      console.log('Список реплик получен напрямую:', {
        success: data.success,
        total: data.total,
        itemsCount: data.items?.length || 0,
      });

      return data;
    } catch (error) {
      console.error('Ошибка при прямом получении списка реплик:', error);
      throw error;
    }
  }

  /**
   * Получить список реплик через наш API роут
   * @param params - Параметры запроса
   * @returns Промис с ответом API
   */
  static async getReplicasViaRoute(params: ReplicasListParams = {}): Promise<SensayReplicasResponse> {
    try {
      console.log('Получение списка реплик через API роут:', params);

      // Формируем URL с параметрами
      const urlParams = new URLSearchParams();
      
      if (params.ownerUuid) urlParams.append('ownerUuid', params.ownerUuid);
      if (params.pageIndex) urlParams.append('pageIndex', params.pageIndex.toString());
      if (params.pageSize) urlParams.append('pageSize', params.pageSize.toString());
      if (params.slug) urlParams.append('slug', params.slug);
      if (params.search) urlParams.append('search', params.search);
      if (params.tags) urlParams.append('tags', params.tags.join(','));
      if (params.sort) urlParams.append('sort', params.sort);
      if (params.integration) urlParams.append('integration', params.integration);

      const url = `/api/sensay/replicas/list?${urlParams.toString()}`;
      console.log(`Отправка GET запроса на: ${url}`);
      
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(`Статус ответа: ${response.status} ${response.statusText}`);

      if (!response.ok) {
        const errorData = await response.json();
        console.error(`Ошибка ответа:`, errorData);
        throw new Error(`Ошибка API (${response.status}): ${errorData.error || 'Unknown error'}`);
      }

      const data = await response.json() as SensayReplicasResponse;
      console.log('Список реплик получен через роут:', {
        success: data.success,
        total: data.total,
        itemsCount: data.items?.length || 0,
      });

      return data;
    } catch (error) {
      console.error('Ошибка при получении списка реплик через роут:', error);
      throw error;
    }
  }
}

