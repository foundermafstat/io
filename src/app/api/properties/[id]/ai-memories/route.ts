import { NextRequest, NextResponse } from 'next/server';
import { PropertyAIMemoryAPI } from '@/lib/api/property-ai-memory';
import { CreateAIMemoryDto, MemoryType } from '@/types/property';

// GET /api/properties/[id]/ai-memories - Получение воспоминаний о недвижимости
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id: propertyId } = params;
    const { searchParams } = new URL(request.url);
    
    const memoryType = searchParams.get('memoryType') as MemoryType;
    const isActive = searchParams.get('isActive') !== 'false';
    
    if (!propertyId) {
      return NextResponse.json(
        { error: 'ID недвижимости не указан' },
        { status: 400 }
      );
    }

    const memories = await PropertyAIMemoryAPI.getPropertyMemories(
      propertyId,
      memoryType,
      isActive
    );
    
    return NextResponse.json(memories);
  } catch (error) {
    console.error('Error getting AI memories:', error);
    return NextResponse.json(
      { error: 'Ошибка при получении воспоминаний ИИ' },
      { status: 500 }
    );
  }
}

// POST /api/properties/[id]/ai-memories - Создание воспоминания ИИ
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id: propertyId } = params;
    const body = await request.json();
    
    if (!propertyId) {
      return NextResponse.json(
        { error: 'ID недвижимости не указан' },
        { status: 400 }
      );
    }

    const memoryData: CreateAIMemoryDto = {
      propertyId,
      ...body,
    };

    // Валидация обязательных полей
    if (!memoryData.title || !memoryData.content || !memoryData.memoryType) {
      return NextResponse.json(
        { error: 'Отсутствуют обязательные поля' },
        { status: 400 }
      );
    }

    const memory = await PropertyAIMemoryAPI.createMemory(memoryData);
    
    return NextResponse.json(memory, { status: 201 });
  } catch (error) {
    console.error('Error creating AI memory:', error);
    return NextResponse.json(
      { error: 'Ошибка при создании воспоминания ИИ' },
      { status: 500 }
    );
  }
}
