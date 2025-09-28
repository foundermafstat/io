import { sensayClient } from './sensay';

/**
 * Сервис для работы с API ключами Sensay
 */
export class SensayApiKeysService {
  /**
   * Погасить приглашение API ключа
   * @param code - Код приглашения
   * @param organizationName - Название организации
   * @param name - Имя контактного лица
   * @param email - Email контактного лица
   * @returns Промис с данными о созданной организации и API ключе
   */
  static async redeemInvitation(
    code: string,
    organizationName: string,
    name: string,
    email: string
  ) {
    try {
      console.log('Погашение приглашения API ключа:', { 
        code, 
        organizationName, 
        name, 
        email 
      });

      const result = await sensayClient.apiKeys.postV1ApiKeysInvitesRedeem(
        code,
        {
          organizationName,
          name,
          email,
        }
      );

      console.log('Приглашение успешно погашено:', {
        success: result.success,
        organizationID: result.organizationID,
        validUntil: result.validUntil,
      });

      return result;
    } catch (error) {
      console.error('Ошибка при погашении приглашения API ключа:', error);
      throw error;
    }
  }

  /**
   * Погасить приглашение через прямой API вызов
   * @param code - Код приглашения
   * @param organizationName - Название организации
   * @param name - Имя контактного лица
   * @param email - Email контактного лица
   * @returns Промис с данными о созданной организации и API ключе
   */
  static async redeemInvitationDirect(
    code: string,
    organizationName: string,
    name: string,
    email: string
  ) {
    try {
      console.log('Прямое погашение приглашения API ключа:', { 
        code, 
        organizationName, 
        name, 
        email 
      });

      const response = await fetch(
        `https://api.sensay.io/v1/api-keys/invites/${code}/redeem`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-API-Version': '2025-03-25',
          },
          body: JSON.stringify({
            organizationName,
            name,
            email,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Ошибка API при погашении приглашения:', response.status, errorData);
        throw new Error(`Ошибка API (${response.status}): ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      console.log('Приглашение успешно погашено:', {
        success: data.success,
        organizationID: data.organizationID,
        validUntil: data.validUntil,
      });

      return data;
    } catch (error) {
      console.error('Ошибка при прямом погашении приглашения API ключа:', error);
      throw error;
    }
  }
}

