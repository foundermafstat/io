import { NextRequest, NextResponse } from 'next/server';
import { PropertyAPI } from '@/lib/api/property-api';

// GET /api/properties/recent - Получение недавно добавленных объектов
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');

    const properties = await PropertyAPI.getRecentProperties(limit);
    
    return NextResponse.json(properties);
  } catch (error) {
    console.error('Error getting recent properties:', error);
    return NextResponse.json(
      { error: 'Ошибка при получении новых объектов' },
      { status: 500 }
    );
  }
}
