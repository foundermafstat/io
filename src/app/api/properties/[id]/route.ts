import { NextRequest, NextResponse } from 'next/server';
import { PropertyAPI } from '@/lib/api/property-api';

// GET /api/properties/[id] - Получение конкретного объекта недвижимости
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const propertyId = params.id;
    
    if (!propertyId) {
      return NextResponse.json(
        { error: 'ID объекта не указан' },
        { status: 400 }
      );
    }

    const property = await PropertyAPI.getPropertyById(propertyId);
    
    if (!property) {
      return NextResponse.json(
        { error: 'Объект не найден' },
        { status: 404 }
      );
    }

    // Увеличиваем счетчик просмотров
    await PropertyAPI.incrementViews(propertyId);
    
    return NextResponse.json(property);
  } catch (error) {
    console.error('Error fetching property:', error);
    return NextResponse.json(
      { 
        error: 'Ошибка при получении объекта недвижимости',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// PUT /api/properties/[id] - Обновление объекта недвижимости
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const propertyId = params.id;
    const body = await request.json();
    
    if (!propertyId) {
      return NextResponse.json(
        { error: 'ID объекта не указан' },
        { status: 400 }
      );
    }

    const updatedProperty = await PropertyAPI.updateProperty(propertyId, body);
    
    return NextResponse.json(updatedProperty);
  } catch (error) {
    console.error('Error updating property:', error);
    return NextResponse.json(
      { 
        error: 'Ошибка при обновлении объекта недвижимости',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// DELETE /api/properties/[id] - Удаление объекта недвижимости
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const propertyId = params.id;
    
    if (!propertyId) {
      return NextResponse.json(
        { error: 'ID объекта не указан' },
        { status: 400 }
      );
    }

    await PropertyAPI.deleteProperty(propertyId);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting property:', error);
    return NextResponse.json(
      { 
        error: 'Ошибка при удалении объекта недвижимости',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}