import { NextRequest, NextResponse } from 'next/server';
import { PropertyAPI } from '@/lib/api/property-api';

// GET /api/properties/cities - Получение списка городов
export async function GET(request: NextRequest) {
  try {
    const cities = await PropertyAPI.getCities();
    
    return NextResponse.json({ cities });
  } catch (error) {
    console.error('Error fetching cities:', error);
    return NextResponse.json(
      { 
        error: 'Ошибка при получении списка городов',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
