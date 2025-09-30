import { NextRequest, NextResponse } from 'next/server';
import { PropertyAPI } from '@/lib/api/property-api';

// GET /api/test-property - Тест API недвижимости
export async function GET(request: NextRequest) {
  try {
    // Тест получения статистики
    const stats = await PropertyAPI.getPropertyStats();
    
    return NextResponse.json({
      success: true,
      message: 'API недвижимости работает корректно',
      stats,
    });
  } catch (error) {
    console.error('Error testing property API:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Ошибка при тестировании API недвижимости',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
