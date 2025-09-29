import { NextRequest, NextResponse } from 'next/server';
import { PropertyAPI } from '@/lib/api/property-api';
import { PropertySearchFilters } from '@/types/property';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { preferences, currentStep } = body;

    // Создаем фильтры на основе предпочтений квиза
    const filters: PropertySearchFilters = {};

    // Базовые фильтры
    if (preferences.purpose) {
      filters.operationType = preferences.purpose === 'rent' ? 'RENT' : 'SALE';
    }

    if (preferences.budget) {
      if (preferences.purpose === 'rent') {
        filters.minPrice = preferences.budget.min;
        filters.maxPrice = preferences.budget.max;
      } else {
        // Для покупки используем salePrice
        filters.minPrice = preferences.budget.min;
        filters.maxPrice = preferences.budget.max;
      }
    }

    if (preferences.propertyType && preferences.propertyType.length > 0) {
      filters.propertyTypes = preferences.propertyType.map((type: string) => 
        type.toUpperCase() as any
      );
    }

    if (preferences.location) {
      // Маппинг локаций к городам
      const locationMap: { [key: string]: string } = {
        'City Center': 'Barcelona',
        'Suburbs': 'Barcelona',
        'Beach Area': 'Barcelona',
        'Mountains': 'Barcelona',
        'University Area': 'Barcelona',
        'Business District': 'Barcelona',
        'Historic Center': 'Barcelona',
        'Green Areas': 'Barcelona',
      };
      
      filters.city = locationMap[preferences.location] || preferences.location;
    }

    // Дополнительные фильтры на основе особенностей
    if (preferences.features && preferences.features.length > 0) {
      // Здесь можно добавить логику для фильтрации по особенностям
      // Пока что просто ищем в описании
      const featureKeywords = preferences.features.map((feature: string) => 
        feature.replace('_', ' ').toLowerCase()
      );
      filters.query = featureKeywords.join(' ');
    }

    // Ограничиваем количество результатов в зависимости от этапа
    let limit = 20;
    if (currentStep <= 2) {
      limit = 50; // Показываем больше на ранних этапах
    } else if (currentStep <= 4) {
      limit = 30; // Среднее количество
    } else {
      limit = 10; // Меньше на финальных этапах
    }

    // Выполняем поиск
    const result = await PropertyAPI.searchProperties(filters, 1, limit);

    return NextResponse.json({
      success: true,
      data: result,
      currentStep,
      appliedFilters: filters,
    });

  } catch (error) {
    console.error('Error searching properties for quiz:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to search properties',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
