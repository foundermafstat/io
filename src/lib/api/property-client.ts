import { 
  Property, 
  CreatePropertyDto, 
  UpdatePropertyDto, 
  PropertySearchFilters, 
  PropertySearchResult,
  PropertyStats
} from '@/types/property';

export class PropertyClient {
  private static baseUrl = '/api/properties';

  // Получение рекомендуемых объектов
  static async getFeaturedProperties(limit: number = 10): Promise<Property[]> {
    const response = await fetch(`${this.baseUrl}/featured?limit=${limit}`);
    if (!response.ok) {
      throw new Error('Ошибка при получении рекомендуемых объектов');
    }
    return response.json();
  }

  // Получение недавно добавленных объектов
  static async getRecentProperties(limit: number = 10): Promise<Property[]> {
    const response = await fetch(`${this.baseUrl}/recent?limit=${limit}`);
    if (!response.ok) {
      throw new Error('Ошибка при получении новых объектов');
    }
    return response.json();
  }

  // Получение статистики
  static async getPropertyStats(): Promise<PropertyStats> {
    const response = await fetch(`${this.baseUrl}/stats`);
    if (!response.ok) {
      throw new Error('Ошибка при получении статистики');
    }
    return response.json();
  }

  // Поиск недвижимости
  static async searchProperties(
    filters: PropertySearchFilters,
    page: number = 1,
    limit: number = 20
  ): Promise<PropertySearchResult> {
    const searchParams = new URLSearchParams();
    
    // Добавляем параметры пагинации
    searchParams.append('page', page.toString());
    searchParams.append('limit', limit.toString());

    // Добавляем фильтры
    if (filters.query) searchParams.append('query', filters.query);
    if (filters.propertyTypes?.length) {
      searchParams.append('propertyTypes', filters.propertyTypes.join(','));
    }
    if (filters.operationType && filters.operationType !== 'any') {
      searchParams.append('operationType', filters.operationType);
    }
    if (filters.minPrice) searchParams.append('minPrice', filters.minPrice.toString());
    if (filters.maxPrice) searchParams.append('maxPrice', filters.maxPrice.toString());
    if (filters.minArea) searchParams.append('minArea', filters.minArea.toString());
    if (filters.maxArea) searchParams.append('maxArea', filters.maxArea.toString());
    if (filters.bedrooms) searchParams.append('bedrooms', filters.bedrooms.toString());
    if (filters.bathrooms) searchParams.append('bathrooms', filters.bathrooms.toString());
    if (filters.city) searchParams.append('city', filters.city);
    if (filters.state) searchParams.append('state', filters.state);
    if (filters.country) searchParams.append('country', filters.country);
    if (filters.isFeatured !== undefined) {
      searchParams.append('isFeatured', filters.isFeatured.toString());
    }
    if (filters.isVerified !== undefined) {
      searchParams.append('isVerified', filters.isVerified.toString());
    }
    if (filters.latitude) searchParams.append('latitude', filters.latitude.toString());
    if (filters.longitude) searchParams.append('longitude', filters.longitude.toString());
    if (filters.radius) searchParams.append('radius', filters.radius.toString());

    const response = await fetch(`${this.baseUrl}?${searchParams.toString()}`);
    if (!response.ok) {
      throw new Error('Ошибка при поиске недвижимости');
    }
    return response.json();
  }

  // Поиск по местоположению
  static async searchByLocation(
    latitude: number,
    longitude: number,
    radius: number,
    page: number = 1,
    limit: number = 20
  ): Promise<PropertySearchResult> {
    const searchParams = new URLSearchParams({
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      radius: radius.toString(),
      page: page.toString(),
      limit: limit.toString(),
    });

    const response = await fetch(`${this.baseUrl}/location?${searchParams.toString()}`);
    if (!response.ok) {
      throw new Error('Ошибка при поиске по местоположению');
    }
    return response.json();
  }

  // Получение недвижимости по ID
  static async getPropertyById(id: string): Promise<Property> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    if (!response.ok) {
      throw new Error('Ошибка при получении недвижимости');
    }
    return response.json();
  }

  // Создание недвижимости
  static async createProperty(data: CreatePropertyDto): Promise<Property> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Ошибка при создании недвижимости');
    }
    return response.json();
  }

  // Обновление недвижимости
  static async updateProperty(data: UpdatePropertyDto): Promise<Property> {
    const response = await fetch(`${this.baseUrl}/${data.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Ошибка при обновлении недвижимости');
    }
    return response.json();
  }

  // Удаление недвижимости
  static async deleteProperty(id: string): Promise<boolean> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Ошибка при удалении недвижимости');
    }
    return true;
  }
}
