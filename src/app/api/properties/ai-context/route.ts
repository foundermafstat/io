import { NextRequest, NextResponse } from 'next/server';
import { PropertyAPI } from '@/lib/api/property-api';

// GET /api/properties/ai-context - Получить данные о недвижимости для контекста ИИ
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Параметры для загрузки всех объектов
    const limit = parseInt(searchParams.get('limit') || '1000'); // Увеличиваем лимит для загрузки всех объектов
    const featuredOnly = searchParams.get('featured') === 'true'; // Только рекомендованные

    // Получаем все доступные объекты недвижимости
    const filters: any = {
      status: 'AVAILABLE', // Только доступные объекты
      ...(featuredOnly && { isFeatured: true })
    };

    // Удаляем undefined значения
    Object.keys(filters).forEach(key => {
      if (filters[key] === undefined) {
        delete filters[key];
      }
    });

    // Загружаем все объекты с большим лимитом
    const properties = await PropertyAPI.searchProperties(filters, 1, limit);

    // Форматируем данные для контекста ИИ
    const aiContext = {
      totalProperties: properties.properties.length,
      properties: properties.properties.map((property: any) => ({
        id: property.id,
        title: property.title,
        type: property.propertyType,
        operation: property.operationType,
        location: {
          address: property.address,
          city: property.city,
          state: property.state,
          country: property.country
        },
        price: {
          rent: property.rentPrice,
          sale: property.salePrice,
          currency: property.currency
        },
        details: {
          bedrooms: property.bedrooms,
          bathrooms: property.bathrooms,
          area: property.area,
          floor: property.floor,
          yearBuilt: property.yearBuilt
        },
        features: property.features || [],
        amenities: property.amenities || [],
        description: property.description,
        isFeatured: property.isFeatured,
        isVerified: property.isVerified
      })),
      lastUpdated: new Date().toISOString()
    };

    return NextResponse.json(aiContext);
  } catch (error) {
    console.error('Error fetching properties for AI context:', error);
    return NextResponse.json(
      {
        error: 'Ошибка при получении данных о недвижимости',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
