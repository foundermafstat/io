import { PrismaClient } from '../../../generated/prisma';
import { 
  PropertyAIMemory, 
  CreateAIMemoryDto, 
  MemoryType 
} from '@/types/property';

const prisma = new PrismaClient();

export class PropertyAIMemoryAPI {
  // Создание памяти ИИ агента
  static async createMemory(data: CreateAIMemoryDto): Promise<PropertyAIMemory> {
    const memory = await prisma.propertyAIMemory.create({
      data: {
        propertyId: data.propertyId,
        replicaId: data.replicaId,
        memoryType: data.memoryType,
        title: data.title,
        content: data.content,
        context: data.context,
        importance: data.importance || 1,
        expiresAt: data.expiresAt,
      },
      include: {
        property: true,
      },
    });

    return memory as PropertyAIMemory;
  }

  // Получение памяти по ID
  static async getMemoryById(id: string): Promise<PropertyAIMemory | null> {
    const memory = await prisma.propertyAIMemory.findUnique({
      where: { id },
      include: {
        property: true,
      },
    });

    return memory as PropertyAIMemory | null;
  }

  // Получение всех воспоминаний о недвижимости
  static async getPropertyMemories(
    propertyId: string,
    memoryType?: MemoryType,
    isActive: boolean = true
  ): Promise<PropertyAIMemory[]> {
    const where: any = {
      propertyId,
      isActive,
    };

    if (memoryType) {
      where.memoryType = memoryType;
    }

    const memories = await prisma.propertyAIMemory.findMany({
      where,
      include: {
        property: true,
      },
      orderBy: [
        { importance: 'desc' },
        { createdAt: 'desc' },
      ],
    });

    return memories as PropertyAIMemory[];
  }

  // Получение воспоминаний по реплике
  static async getReplicaMemories(
    replicaId: string,
    isActive: boolean = true
  ): Promise<PropertyAIMemory[]> {
    const memories = await prisma.propertyAIMemory.findMany({
      where: {
        replicaId,
        isActive,
      },
      include: {
        property: true,
      },
      orderBy: [
        { importance: 'desc' },
        { createdAt: 'desc' },
      ],
    });

    return memories as PropertyAIMemory[];
  }

  // Обновление памяти
  static async updateMemory(
    id: string,
    data: Partial<CreateAIMemoryDto>
  ): Promise<PropertyAIMemory> {
    const memory = await prisma.propertyAIMemory.update({
      where: { id },
      data: {
        title: data.title,
        content: data.content,
        context: data.context,
        importance: data.importance,
        expiresAt: data.expiresAt,
      },
      include: {
        property: true,
      },
    });

    return memory as PropertyAIMemory;
  }

  // Деактивация памяти
  static async deactivateMemory(id: string): Promise<boolean> {
    try {
      await prisma.propertyAIMemory.update({
        where: { id },
        data: { isActive: false },
      });
      return true;
    } catch (error) {
      console.error('Error deactivating memory:', error);
      return false;
    }
  }

  // Удаление памяти
  static async deleteMemory(id: string): Promise<boolean> {
    try {
      await prisma.propertyAIMemory.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      console.error('Error deleting memory:', error);
      return false;
    }
  }

  // Очистка истекших воспоминаний
  static async cleanupExpiredMemories(): Promise<number> {
    const result = await prisma.propertyAIMemory.updateMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
        isActive: true,
      },
      data: {
        isActive: false,
      },
    });

    return result.count;
  }

  // Поиск воспоминаний по содержимому
  static async searchMemories(
    query: string,
    propertyId?: string,
    replicaId?: string,
    memoryType?: MemoryType
  ): Promise<PropertyAIMemory[]> {
    const where: any = {
      isActive: true,
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { content: { contains: query, mode: 'insensitive' } },
      ],
    };

    if (propertyId) {
      where.propertyId = propertyId;
    }

    if (replicaId) {
      where.replicaId = replicaId;
    }

    if (memoryType) {
      where.memoryType = memoryType;
    }

    const memories = await prisma.propertyAIMemory.findMany({
      where,
      include: {
        property: true,
      },
      orderBy: [
        { importance: 'desc' },
        { createdAt: 'desc' },
      ],
    });

    return memories as PropertyAIMemory[];
  }

  // Получение статистики воспоминаний
  static async getMemoryStats(propertyId?: string, replicaId?: string) {
    const where: any = { isActive: true };

    if (propertyId) {
      where.propertyId = propertyId;
    }

    if (replicaId) {
      where.replicaId = replicaId;
    }

    const [
      totalMemories,
      memoriesByType,
      averageImportance,
    ] = await Promise.all([
      prisma.propertyAIMemory.count({ where }),
      prisma.propertyAIMemory.groupBy({
        by: ['memoryType'],
        where,
        _count: { memoryType: true },
      }),
      prisma.propertyAIMemory.aggregate({
        where,
        _avg: { importance: true },
      }),
    ]);

    return {
      totalMemories,
      memoriesByType: memoriesByType.reduce((acc, item) => {
        acc[item.memoryType] = item._count.memoryType;
        return acc;
      }, {} as Record<string, number>),
      averageImportance: averageImportance._avg.importance || 0,
    };
  }

  // Получение контекста для ИИ агента
  static async getAIContext(
    propertyId: string,
    replicaId?: string,
    limit: number = 10
  ): Promise<{
    memories: PropertyAIMemory[];
    context: string;
  }> {
    const where: any = {
      propertyId,
      isActive: true,
    };

    if (replicaId) {
      where.replicaId = replicaId;
    }

    const memories = await prisma.propertyAIMemory.findMany({
      where,
      include: {
        property: true,
      },
      orderBy: [
        { importance: 'desc' },
        { createdAt: 'desc' },
      ],
      take: limit,
    });

    // Формирование контекста для ИИ
    const context = memories
      .map(memory => {
        let contextItem = `[${memory.memoryType}] ${memory.title}: ${memory.content}`;
        if (memory.context) {
          contextItem += `\nКонтекст: ${JSON.stringify(memory.context)}`;
        }
        return contextItem;
      })
      .join('\n\n');

    return {
      memories: memories as PropertyAIMemory[],
      context,
    };
  }

  // Создание воспоминания на основе взаимодействия
  static async createInteractionMemory(
    propertyId: string,
    replicaId: string,
    interaction: string,
    userFeedback?: string,
    importance: number = 3
  ): Promise<PropertyAIMemory> {
    const title = `Взаимодействие с пользователем`;
    const content = `Взаимодействие: ${interaction}${userFeedback ? `\nОбратная связь: ${userFeedback}` : ''}`;
    
    return this.createMemory({
      propertyId,
      replicaId,
      memoryType: MemoryType.INTERACTION,
      title,
      content,
      importance,
    });
  }

  // Создание воспоминания о предпочтениях
  static async createPreferenceMemory(
    propertyId: string,
    replicaId: string,
    preferences: string,
    importance: number = 5
  ): Promise<PropertyAIMemory> {
    const title = `Предпочтения пользователя`;
    const content = `Предпочтения: ${preferences}`;
    
    return this.createMemory({
      propertyId,
      replicaId,
      memoryType: MemoryType.PREFERENCE,
      title,
      content,
      importance,
    });
  }

  // Создание аналитического воспоминания
  static async createAnalysisMemory(
    propertyId: string,
    replicaId: string,
    analysis: string,
    context?: Record<string, any>,
    importance: number = 4
  ): Promise<PropertyAIMemory> {
    const title = `Анализ недвижимости`;
    const content = `Анализ: ${analysis}`;
    
    return this.createMemory({
      propertyId,
      replicaId,
      memoryType: MemoryType.ANALYSIS,
      title,
      content,
      context,
      importance,
    });
  }
}
