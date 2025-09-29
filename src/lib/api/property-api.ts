import { PrismaClient } from '../../../generated/prisma';
import { 
  Property, 
  CreatePropertyDto, 
  UpdatePropertyDto, 
  PropertySearchFilters, 
  PropertySearchResult,
  PropertyStats,
  UserPropertyStats,
  PropertyType,
  OperationType,
  PropertyStatus
} from '@/types/property';

const prisma = new PrismaClient();

export class PropertyAPI {
  // Создание недвижимости
  static async createProperty(data: CreatePropertyDto): Promise<Property> {
    const property = await prisma.property.create({
      data: {
        title: data.title,
        description: data.description,
        propertyType: data.propertyType,
        operationType: data.operationType,
        address: data.address,
        city: data.city,
        state: data.state,
        country: data.country,
        postalCode: data.postalCode,
        latitude: data.latitude,
        longitude: data.longitude,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        area: data.area,
        floor: data.floor,
        totalFloors: data.totalFloors,
        yearBuilt: data.yearBuilt,
        rentPrice: data.rentPrice,
        salePrice: data.salePrice,
        currency: data.currency || 'USD',
        features: data.features || [],
        amenities: data.amenities || [],
        images: data.images || [],
        isFeatured: data.isFeatured || false,
        isVerified: data.isVerified || false,
        ownerId: data.ownerId,
        agentId: data.agentId,
        locationId: data.locationId,
      },
      include: {
        owner: true,
        agent: true,
        location: true,
        reservations: true,
        aiMemories: true,
        reviews: true,
      },
    });

    return property as Property;
  }

  // Получение недвижимости по ID
  static async getPropertyById(id: string): Promise<Property | null> {
    const property = await prisma.property.findUnique({
      where: { id },
      include: {
        owner: true,
        agent: true,
        location: true,
        reservations: true,
        aiMemories: true,
        reviews: {
          include: {
            user: true,
          },
        },
      },
    });

    if (property) {
      // Увеличиваем счетчик просмотров
      await prisma.property.update({
        where: { id },
        data: { views: { increment: 1 } },
      });
    }

    return property as Property | null;
  }

  // Обновление недвижимости
  static async updateProperty(data: UpdatePropertyDto): Promise<Property> {
    const { id, ...updateData } = data;
    
    const property = await prisma.property.update({
      where: { id },
      data: updateData,
      include: {
        owner: true,
        agent: true,
        location: true,
        reservations: true,
        aiMemories: true,
        reviews: true,
      },
    });

    return property as Property;
  }

  // Удаление недвижимости
  static async deleteProperty(id: string): Promise<boolean> {
    try {
      await prisma.property.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      console.error('Error deleting property:', error);
      return false;
    }
  }

  // Поиск недвижимости
  static async searchProperties(
    filters: PropertySearchFilters,
    page: number = 1,
    limit: number = 20
  ): Promise<PropertySearchResult> {
    const skip = (page - 1) * limit;
    
    // Построение условий поиска
    const where: any = {};

    if (filters.query) {
      where.OR = [
        { title: { contains: filters.query, mode: 'insensitive' } },
        { description: { contains: filters.query, mode: 'insensitive' } },
        { address: { contains: filters.query, mode: 'insensitive' } },
      ];
    }

    if (filters.propertyTypes && filters.propertyTypes.length > 0) {
      where.propertyType = { in: filters.propertyTypes };
    }

    if (filters.operationType) {
      where.operationType = filters.operationType;
    }

    if (filters.minPrice || filters.maxPrice) {
      where.OR = [
        {
          rentPrice: {
            gte: filters.minPrice,
            lte: filters.maxPrice,
          },
        },
        {
          salePrice: {
            gte: filters.minPrice,
            lte: filters.maxPrice,
          },
        },
      ];
    }

    if (filters.minArea || filters.maxArea) {
      where.area = {
        gte: filters.minArea,
        lte: filters.maxArea,
      };
    }

    if (filters.bedrooms) {
      where.bedrooms = filters.bedrooms;
    }

    if (filters.bathrooms) {
      where.bathrooms = filters.bathrooms;
    }

    if (filters.city) {
      where.city = { contains: filters.city, mode: 'insensitive' };
    }

    if (filters.state) {
      where.state = { contains: filters.state, mode: 'insensitive' };
    }

    if (filters.country) {
      where.country = { contains: filters.country, mode: 'insensitive' };
    }

    if (filters.isFeatured !== undefined) {
      where.isFeatured = filters.isFeatured;
    }

    if (filters.isVerified !== undefined) {
      where.isVerified = filters.isVerified;
    }

    // Геолокационный поиск
    if (filters.latitude && filters.longitude && filters.radius) {
      // Используем функцию для поиска в радиусе
      where.latitude = {
        gte: filters.latitude - (filters.radius / 111), // приблизительно 1 градус = 111 км
        lte: filters.latitude + (filters.radius / 111),
      };
      where.longitude = {
        gte: filters.longitude - (filters.radius / (111 * Math.cos(filters.latitude * Math.PI / 180))),
        lte: filters.longitude + (filters.radius / (111 * Math.cos(filters.latitude * Math.PI / 180))),
      };
    }

    // Выполнение запроса
    const [properties, totalCount] = await Promise.all([
      prisma.property.findMany({
        where,
        include: {
          owner: true,
          agent: true,
          location: true,
          reservations: true,
          aiMemories: true,
          reviews: true,
        },
        orderBy: [
          { isFeatured: 'desc' },
          { createdAt: 'desc' },
        ],
        skip,
        take: limit,
      }),
      prisma.property.count({ where }),
    ]);

    return {
      properties: properties as Property[],
      totalCount,
      page,
      limit,
      hasMore: skip + limit < totalCount,
      filters,
    };
  }

  // Получение недвижимости пользователя
  static async getUserProperties(
    userId: string,
    type: 'owned' | 'agent' = 'owned'
  ): Promise<Property[]> {
    const where = type === 'owned' 
      ? { ownerId: userId }
      : { agentId: userId };

    const properties = await prisma.property.findMany({
      where,
      include: {
        owner: true,
        agent: true,
        location: true,
        reservations: true,
        aiMemories: true,
        reviews: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return properties as Property[];
  }

  // Получение рекомендуемой недвижимости
  static async getFeaturedProperties(limit: number = 10): Promise<Property[]> {
    const properties = await prisma.property.findMany({
      where: {
        isFeatured: true,
        status: PropertyStatus.AVAILABLE,
      },
      include: {
        owner: true,
        agent: true,
        location: true,
        reservations: true,
        aiMemories: true,
        reviews: true,
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    return properties as Property[];
  }

  // Получение недавно добавленной недвижимости
  static async getRecentProperties(limit: number = 10): Promise<Property[]> {
    const properties = await prisma.property.findMany({
      where: {
        status: PropertyStatus.AVAILABLE,
      },
      include: {
        owner: true,
        agent: true,
        location: true,
        reservations: true,
        aiMemories: true,
        reviews: true,
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    return properties as Property[];
  }

  // Получение статистики недвижимости
  static async getPropertyStats(): Promise<PropertyStats> {
    const [
      totalProperties,
      availableProperties,
      rentedProperties,
      soldProperties,
      averageRentPrice,
      averageSalePrice,
      totalViews,
      totalReservations,
      totalReviews,
      averageRating,
    ] = await Promise.all([
      prisma.property.count(),
      prisma.property.count({ where: { status: PropertyStatus.AVAILABLE } }),
      prisma.property.count({ where: { status: PropertyStatus.RENTED } }),
      prisma.property.count({ where: { status: PropertyStatus.SOLD } }),
      prisma.property.aggregate({
        where: { rentPrice: { not: null } },
        _avg: { rentPrice: true },
      }),
      prisma.property.aggregate({
        where: { salePrice: { not: null } },
        _avg: { salePrice: true },
      }),
      prisma.property.aggregate({
        _sum: { views: true },
      }),
      prisma.propertyReservation.count(),
      prisma.propertyReview.count(),
      prisma.propertyReview.aggregate({
        _avg: { rating: true },
      }),
    ]);

    return {
      totalProperties,
      availableProperties,
      rentedProperties,
      soldProperties,
      averageRentPrice: averageRentPrice._avg.rentPrice || 0,
      averageSalePrice: averageSalePrice._avg.salePrice || 0,
      totalViews: totalViews._sum.views || 0,
      totalReservations,
      totalReviews,
      averageRating: averageRating._avg.rating || 0,
    };
  }

  // Получение статистики пользователя
  static async getUserPropertyStats(userId: string): Promise<UserPropertyStats> {
    const [
      ownedProperties,
      agentProperties,
      totalReservations,
      totalReviews,
      averageRating,
      totalViews,
    ] = await Promise.all([
      prisma.property.count({ where: { ownerId: userId } }),
      prisma.property.count({ where: { agentId: userId } }),
      prisma.propertyReservation.count({ where: { userId } }),
      prisma.propertyReview.count({ where: { userId } }),
      prisma.propertyReview.aggregate({
        where: { userId },
        _avg: { rating: true },
      }),
      prisma.property.aggregate({
        where: { ownerId: userId },
        _sum: { views: true },
      }),
    ]);

    return {
      ownedProperties,
      agentProperties,
      totalReservations,
      totalReviews,
      averageRating: averageRating._avg.rating || 0,
      totalViews: totalViews._sum.views || 0,
    };
  }

  // Полнотекстовый поиск
  static async fullTextSearch(
    query: string,
    page: number = 1,
    limit: number = 20
  ): Promise<PropertySearchResult> {
    const skip = (page - 1) * limit;

    // Используем PostgreSQL полнотекстовый поиск
    const [properties, totalCount] = await Promise.all([
      prisma.$queryRaw`
        SELECT p.*, 
               ts_rank(to_tsvector('english', p.title || ' ' || p.description || ' ' || p.address), plainto_tsquery('english', ${query})) as rank
        FROM properties p
        WHERE to_tsvector('english', p.title || ' ' || p.description || ' ' || p.address) @@ plainto_tsquery('english', ${query})
        ORDER BY rank DESC, p.created_at DESC
        LIMIT ${limit} OFFSET ${skip}
      `,
      prisma.$queryRaw`
        SELECT COUNT(*) as count
        FROM properties p
        WHERE to_tsvector('english', p.title || ' ' || p.description || ' ' || p.address) @@ plainto_tsquery('english', ${query})
      `,
    ]);

    return {
      properties: properties as Property[],
      totalCount: (totalCount as any)[0].count,
      page,
      limit,
      hasMore: skip + limit < (totalCount as any)[0].count,
      filters: { query },
    };
  }

  // Геолокационный поиск
  static async searchByLocation(
    latitude: number,
    longitude: number,
    radius: number, // в километрах
    page: number = 1,
    limit: number = 20
  ): Promise<PropertySearchResult> {
    const skip = (page - 1) * limit;

    // Используем формулу гаверсинуса для точного расчета расстояния
    const [properties, totalCount] = await Promise.all([
      prisma.$queryRaw`
        SELECT p.*, 
               (6371 * acos(cos(radians(${latitude})) * cos(radians(p.latitude)) * 
                cos(radians(p.longitude) - radians(${longitude})) + 
                sin(radians(${latitude})) * sin(radians(p.latitude)))) AS distance
        FROM properties p
        WHERE p.latitude IS NOT NULL 
          AND p.longitude IS NOT NULL
          AND (6371 * acos(cos(radians(${latitude})) * cos(radians(p.latitude)) * 
               cos(radians(p.longitude) - radians(${longitude})) + 
               sin(radians(${latitude})) * sin(radians(p.latitude)))) <= ${radius}
        ORDER BY distance ASC
        LIMIT ${limit} OFFSET ${skip}
      `,
      prisma.$queryRaw`
        SELECT COUNT(*) as count
        FROM properties p
        WHERE p.latitude IS NOT NULL 
          AND p.longitude IS NOT NULL
          AND (6371 * acos(cos(radians(${latitude})) * cos(radians(p.latitude)) * 
               cos(radians(p.longitude) - radians(${longitude})) + 
               sin(radians(${latitude})) * sin(radians(p.latitude)))) <= ${radius}
      `,
    ]);

    return {
      properties: properties as Property[],
      totalCount: (totalCount as any)[0].count,
      page,
      limit,
      hasMore: skip + limit < (totalCount as any)[0].count,
      filters: { latitude, longitude, radius },
    };
  }
}
