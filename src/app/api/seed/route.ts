import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    // Создаем тестового пользователя
    const user = await prisma.user.upsert({
      where: { email: 'test@example.com' },
      update: {},
      create: {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        isAgent: true,
        isVerified: true,
        phone: '+1234567890',
        languages: ['en', 'ru'],
        specialties: ['residential', 'commercial']
      }
    });

    // Создаем тестовые объекты недвижимости
    const properties = [
      {
        id: 'cmg5byi3h0009sx8cgub9jxbt',
        title: 'Современная квартира в центре города',
        description: 'Просторная квартира с современным ремонтом, расположенная в самом центре города. Идеально подходит для молодой семьи или пары.',
        propertyType: 'APARTMENT',
        operationType: 'RENT',
        status: 'AVAILABLE',
        address: 'ул. Центральная, 123',
        city: 'Москва',
        state: 'Московская область',
        country: 'Россия',
        postalCode: '101000',
        latitude: 55.7558,
        longitude: 37.6176,
        bedrooms: 2,
        bathrooms: 1.5,
        area: 75.5,
        floor: 5,
        totalFloors: 9,
        yearBuilt: 2020,
        rentPrice: 120000,
        currency: 'RUB',
        features: ['кондиционер', 'балкон', 'парковка', 'лифт'],
        amenities: ['охрана', 'консьерж', 'спортзал'],
        images: ['/placeholder.jpg', '/placeholder.jpg'],
        isFeatured: true,
        isVerified: true,
        views: 0,
        ownerId: user.id,
        agentId: user.id
      },
      {
        id: 'cmg5byi3h0009sx8cgub9jxbt2',
        title: 'Дом с садом в пригороде',
        description: 'Уютный дом с большим садом, идеально подходит для семьи с детьми. Тихий район, хорошая экология.',
        propertyType: 'HOUSE',
        operationType: 'SALE',
        status: 'AVAILABLE',
        address: 'ул. Садовая, 45',
        city: 'Подольск',
        state: 'Московская область',
        country: 'Россия',
        postalCode: '142100',
        latitude: 55.4289,
        longitude: 37.5443,
        bedrooms: 3,
        bathrooms: 2,
        area: 120.0,
        floor: 1,
        totalFloors: 2,
        yearBuilt: 2018,
        salePrice: 8500000,
        currency: 'RUB',
        features: ['гараж', 'сауна', 'камин', 'терраса'],
        amenities: ['охрана', 'детская площадка'],
        images: ['/placeholder.jpg', '/placeholder.jpg'],
        isFeatured: false,
        isVerified: true,
        views: 0,
        ownerId: user.id,
        agentId: user.id
      }
    ];

    for (const propertyData of properties) {
      await prisma.property.upsert({
        where: { id: propertyData.id },
        update: propertyData,
        create: propertyData
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Тестовые данные успешно созданы!',
      data: {
        userCount: 1,
        propertyCount: properties.length
      }
    });

  } catch (error) {
    console.error('Error seeding data:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
