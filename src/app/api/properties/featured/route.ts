import { NextRequest, NextResponse } from 'next/server';
import { PropertyAPI } from '@/lib/api/property-api';

// GET /api/properties/featured - Получение рекомендуемых объектов
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');

    const properties = await PropertyAPI.getFeaturedProperties(limit);
    
    return NextResponse.json(properties);
  } catch (error) {
    console.error('Error getting featured properties:', error);
    return NextResponse.json(
      { error: 'Ошибка при получении рекомендуемых объектов' },
      { status: 500 }
    );
  }
}
