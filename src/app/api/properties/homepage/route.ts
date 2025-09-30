import { NextRequest, NextResponse } from 'next/server';
import { PropertyAPI } from '@/lib/api/property-api';

// GET /api/properties/homepage - Получение объектов для главной страницы
export async function GET(request: NextRequest) {
  try {
    const homepageData = await PropertyAPI.getHomepageProperties();

    return NextResponse.json(homepageData);
  } catch (error) {
    console.error('Error getting homepage properties:', error);
    return NextResponse.json(
      { error: 'Ошибка при получении объектов для главной страницы' },
      { status: 500 }
    );
  }
}
