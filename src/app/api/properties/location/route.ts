import { NextRequest, NextResponse } from 'next/server';
import { PropertyAPI } from '@/lib/api/property-api';

// GET /api/properties/location - Поиск недвижимости по местоположению
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const latitude = parseFloat(searchParams.get('latitude') || '0');
    const longitude = parseFloat(searchParams.get('longitude') || '0');
    const radius = parseFloat(searchParams.get('radius') || '10');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    if (!latitude || !longitude) {
      return NextResponse.json(
        { error: 'Координаты не указаны' },
        { status: 400 }
      );
    }

    const result = await PropertyAPI.searchByLocation(latitude, longitude, radius, page, limit);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error searching by location:', error);
    return NextResponse.json(
      { error: 'Ошибка при поиске по местоположению' },
      { status: 500 }
    );
  }
}
