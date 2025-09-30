import { NextRequest, NextResponse } from 'next/server';
import { PropertyAPI } from '@/lib/api/property-api';

// GET /api/properties/debug - Отладочная информация о базе данных
export async function GET(request: NextRequest) {
  try {
    // Получаем статистику
    const stats = await PropertyAPI.getPropertyStats();

    // Получаем первые 5 записей
    const sampleProperties = await PropertyAPI.searchProperties({}, 1, 5);

    // Получаем популярные типы
    const popularTypes = await PropertyAPI.getPopularPropertyTypes(5);

    // Получаем популярные локации
    const popularLocations = await PropertyAPI.getPopularLocations(5);

    // Получаем статистику по городам
    const cityStats = await PropertyAPI.getCityStats();

    return NextResponse.json({
      stats,
      sampleProperties: sampleProperties.properties,
      popularTypes,
      popularLocations,
      cityStats,
      totalSample: sampleProperties.totalCount,
    });
  } catch (error) {
    console.error('Error in debug endpoint:', error);
    return NextResponse.json(
      {
        error: 'Ошибка при получении отладочной информации',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
