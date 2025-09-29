import { NextRequest, NextResponse } from 'next/server';
import { PropertyAPI } from '@/lib/api/property-api';
import { CreatePropertyDto, PropertySearchFilters } from '@/types/property';

// GET /api/properties - Поиск недвижимости
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Параметры пагинации
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    
    // Параметры поиска
    const filters: PropertySearchFilters = {
      query: searchParams.get('query') || undefined,
      propertyTypes: searchParams.get('propertyTypes')?.split(',') as any,
      operationType: searchParams.get('operationType') as any,
      minPrice: searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : undefined,
      maxPrice: searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined,
      minArea: searchParams.get('minArea') ? parseFloat(searchParams.get('minArea')!) : undefined,
      maxArea: searchParams.get('maxArea') ? parseFloat(searchParams.get('maxArea')!) : undefined,
      bedrooms: searchParams.get('bedrooms') ? parseInt(searchParams.get('bedrooms')!) : undefined,
      bathrooms: searchParams.get('bathrooms') ? parseFloat(searchParams.get('bathrooms')!) : undefined,
      city: searchParams.get('city') || undefined,
      state: searchParams.get('state') || undefined,
      country: searchParams.get('country') || undefined,
      isFeatured: searchParams.get('isFeatured') === 'true',
      isVerified: searchParams.get('isVerified') === 'true',
      latitude: searchParams.get('latitude') ? parseFloat(searchParams.get('latitude')!) : undefined,
      longitude: searchParams.get('longitude') ? parseFloat(searchParams.get('longitude')!) : undefined,
      radius: searchParams.get('radius') ? parseFloat(searchParams.get('radius')!) : undefined,
    };

    // Удаляем undefined значения
    Object.keys(filters).forEach(key => {
      if (filters[key as keyof PropertySearchFilters] === undefined) {
        delete filters[key as keyof PropertySearchFilters];
      }
    });

    const result = await PropertyAPI.searchProperties(filters, page, limit);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error searching properties:', error);
    return NextResponse.json(
      { error: 'Ошибка при поиске недвижимости' },
      { status: 500 }
    );
  }
}

// POST /api/properties - Создание недвижимости
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const propertyData: CreatePropertyDto = body;

    // Валидация обязательных полей
    if (!propertyData.title || !propertyData.description || !propertyData.address) {
      return NextResponse.json(
        { error: 'Отсутствуют обязательные поля' },
        { status: 400 }
      );
    }

    const property = await PropertyAPI.createProperty(propertyData);
    
    return NextResponse.json(property, { status: 201 });
  } catch (error) {
    console.error('Error creating property:', error);
    return NextResponse.json(
      { error: 'Ошибка при создании недвижимости' },
      { status: 500 }
    );
  }
}
