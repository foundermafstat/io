import { NextRequest, NextResponse } from 'next/server';
import { PropertyAPI } from '@/lib/api/property-api';
import { PropertyType, OperationType, PropertyStatus } from '@/types/property';

// POST /api/properties/seed - Создание тестовых данных
export async function POST(request: NextRequest) {
  try {
    const testProperties = [
      {
        title: 'Современная квартира в центре',
        description: 'Прекрасная квартира с видом на город, полностью меблированная',
        propertyType: PropertyType.APARTMENT,
        operationType: OperationType.RENT,
        address: 'ул. Ленина, 15',
        city: 'Москва',
        state: 'Москва',
        country: 'Россия',
        postalCode: '101000',
        latitude: 55.7558,
        longitude: 37.6176,
        bedrooms: 2,
        bathrooms: 1,
        area: 75.5,
        floor: 3,
        totalFloors: 9,
        yearBuilt: 2015,
        rentPrice: 85000,
        salePrice: 12000000,
        currency: 'RUB',
        features: ['балкон', 'парковка', 'охрана'],
        amenities: ['лифт', 'консьерж', 'спортзал'],
        images: ['https://example.com/image1.jpg'],
        isFeatured: true,
        isVerified: true,
        ownerId: 'test-owner-1',
      },
      {
        title: 'Загородный дом с садом',
        description: 'Просторный дом с большим участком, идеально для семьи',
        propertyType: PropertyType.HOUSE,
        operationType: OperationType.SALE,
        address: 'Садовая улица, 42',
        city: 'Санкт-Петербург',
        state: 'Ленинградская область',
        country: 'Россия',
        postalCode: '197000',
        latitude: 59.9343,
        longitude: 30.3351,
        bedrooms: 4,
        bathrooms: 2.5,
        area: 180.0,
        floor: 1,
        totalFloors: 2,
        yearBuilt: 2010,
        rentPrice: 150000,
        salePrice: 25000000,
        currency: 'RUB',
        features: ['гараж', 'сад', 'терраса'],
        amenities: ['камин', 'сауна', 'бассейн'],
        images: ['https://example.com/image2.jpg'],
        isFeatured: true,
        isVerified: true,
        ownerId: 'test-owner-2',
      },
      {
        title: 'Коммерческое помещение в бизнес-центре',
        description: 'Отличное помещение для офиса или магазина',
        propertyType: PropertyType.COMMERCIAL,
        operationType: OperationType.RENT,
        address: 'просп. Мира, 88',
        city: 'Екатеринбург',
        state: 'Свердловская область',
        country: 'Россия',
        postalCode: '620000',
        latitude: 56.8389,
        longitude: 60.6057,
        bedrooms: 0,
        bathrooms: 2,
        area: 120.0,
        floor: 2,
        totalFloors: 5,
        yearBuilt: 2018,
        rentPrice: 95000,
        salePrice: 18000000,
        currency: 'RUB',
        features: ['витринные окна', 'кондиционер', 'охрана'],
        amenities: ['парковка', 'лифт', 'ресепшн'],
        images: ['https://example.com/image3.jpg'],
        isFeatured: false,
        isVerified: true,
        ownerId: 'test-owner-3',
      },
      {
        title: 'Стильная студия в новом ЖК',
        description: 'Компактная студия с современной отделкой',
        propertyType: PropertyType.STUDIO,
        operationType: OperationType.SALE,
        address: 'ул. Строителей, 7',
        city: 'Казань',
        state: 'Татарстан',
        country: 'Россия',
        postalCode: '420000',
        latitude: 55.7961,
        longitude: 49.1089,
        bedrooms: 0,
        bathrooms: 1,
        area: 35.0,
        floor: 8,
        totalFloors: 12,
        yearBuilt: 2020,
        rentPrice: 30000,
        salePrice: 4500000,
        currency: 'RUB',
        features: ['панорамные окна', 'балкон', 'кондиционер'],
        amenities: ['консьерж', 'видеонаблюдение', 'фитнес-центр'],
        images: ['https://example.com/image4.jpg'],
        isFeatured: false,
        isVerified: true,
        ownerId: 'test-owner-4',
      },
      {
        title: 'Вилла у моря',
        description: 'Роскошная вилла с бассейном и видом на море',
        propertyType: PropertyType.VILLA,
        operationType: OperationType.SALE,
        address: 'Приморская улица, 25',
        city: 'Сочи',
        state: 'Краснодарский край',
        country: 'Россия',
        postalCode: '354000',
        latitude: 43.5855,
        longitude: 39.7231,
        bedrooms: 5,
        bathrooms: 4,
        area: 320.0,
        floor: 1,
        totalFloors: 2,
        yearBuilt: 2019,
        rentPrice: 500000,
        salePrice: 85000000,
        currency: 'RUB',
        features: ['бассейн', 'сад', 'гараж', 'терраса'],
        amenities: ['охрана', 'спа', 'теннисный корт'],
        images: ['https://example.com/image5.jpg'],
        isFeatured: true,
        isVerified: true,
        ownerId: 'test-owner-5',
      },
    ];

    const createdProperties = [];

    for (const propertyData of testProperties) {
      try {
        const property = await PropertyAPI.createProperty(propertyData);
        createdProperties.push(property);
      } catch (error) {
        console.error('Error creating test property:', error);
      }
    }

    return NextResponse.json({
      message: `Создано ${createdProperties.length} тестовых объектов`,
      properties: createdProperties,
    });
  } catch (error) {
    console.error('Error seeding properties:', error);
    return NextResponse.json(
      {
        error: 'Ошибка при создании тестовых данных',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
