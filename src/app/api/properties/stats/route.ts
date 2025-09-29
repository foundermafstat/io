import { NextRequest, NextResponse } from 'next/server';
import { PropertyAPI } from '@/lib/api/property-api';

// GET /api/properties/stats - Получение статистики недвижимости
export async function GET(request: NextRequest) {
  try {
    const stats = await PropertyAPI.getPropertyStats();
    
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error getting property stats:', error);
    return NextResponse.json(
      { error: 'Ошибка при получении статистики' },
      { status: 500 }
    );
  }
}
