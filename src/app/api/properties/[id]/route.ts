import { NextRequest, NextResponse } from 'next/server';
import { PropertyAPI } from '@/lib/api/property-api';
import { UpdatePropertyDto } from '@/types/property';

// GET /api/properties/[id] - Получение недвижимости по ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID недвижимости не указан' },
        { status: 400 }
      );
    }

    const property = await PropertyAPI.getPropertyById(id);
    
    if (!property) {
      return NextResponse.json(
        { error: 'Недвижимость не найдена' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(property);
  } catch (error) {
    console.error('Error getting property:', error);
    return NextResponse.json(
      { error: 'Ошибка при получении недвижимости' },
      { status: 500 }
    );
  }
}

// PUT /api/properties/[id] - Обновление недвижимости
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID недвижимости не указан' },
        { status: 400 }
      );
    }

    const updateData: UpdatePropertyDto = {
      id,
      ...body,
    };

    const property = await PropertyAPI.updateProperty(updateData);
    
    return NextResponse.json(property);
  } catch (error) {
    console.error('Error updating property:', error);
    return NextResponse.json(
      { error: 'Ошибка при обновлении недвижимости' },
      { status: 500 }
    );
  }
}

// DELETE /api/properties/[id] - Удаление недвижимости
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID недвижимости не указан' },
        { status: 400 }
      );
    }

    const success = await PropertyAPI.deleteProperty(id);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Ошибка при удалении недвижимости' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ message: 'Недвижимость успешно удалена' });
  } catch (error) {
    console.error('Error deleting property:', error);
    return NextResponse.json(
      { error: 'Ошибка при удалении недвижимости' },
      { status: 500 }
    );
  }
}
