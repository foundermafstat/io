import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getRandomEstateImages } from '@/lib/utils/estate-images';

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
				specialties: ['residential', 'commercial'],
			},
		});

		// Функция для получения случайных изображений для объекта
		const getPropertyImages = (propertyId: string) => {
			return getRandomEstateImages(2, propertyId);
		};

		// Создаем тестовые объекты недвижимости
		const properties = [
			{
				id: 'cmg5byi3h0009sx8cgub9jxbt',
				title: 'Современная квартира в центре города',
				description:
					'Просторная квартира с современным ремонтом, расположенная в самом центре города. Идеально подходит для молодой семьи или пары.',
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
				images: getPropertyImages('cmg5byi3h0009sx8cgub9jxbt'),
				isFeatured: true,
				isVerified: true,
				views: 0,
				ownerId: user.id,
				agentId: user.id,
			},
			{
				id: 'cmg5byi3h0009sx8cgub9jxbt2',
				title: 'Дом с садом в пригороде',
				description:
					'Уютный дом с большим садом, идеально подходит для семьи с детьми. Тихий район, хорошая экология.',
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
				images: getPropertyImages('cmg5byi3h0009sx8cgub9jxbt2'),
				isFeatured: false,
				isVerified: true,
				views: 0,
				ownerId: user.id,
				agentId: user.id,
			},
			{
				id: 'cmg5byi3h0009sx8cgub9jxbt3',
				title: 'Студия в новостройке',
				description:
					'Компактная студия с современной планировкой и панорамными окнами. Отличный вариант для молодых специалистов.',
				propertyType: 'STUDIO',
				operationType: 'RENT',
				status: 'AVAILABLE',
				address: 'пр. Мира, 78',
				city: 'Санкт-Петербург',
				state: 'Ленинградская область',
				country: 'Россия',
				postalCode: '190000',
				latitude: 59.9311,
				longitude: 30.3609,
				bedrooms: 0,
				bathrooms: 1,
				area: 35.0,
				floor: 12,
				totalFloors: 25,
				yearBuilt: 2023,
				rentPrice: 85000,
				currency: 'RUB',
				features: ['панорамные окна', 'кондиционер', 'встроенная кухня'],
				amenities: ['охрана', 'консьерж', 'фитнес-центр'],
				images: getPropertyImages('cmg5byi3h0009sx8cgub9jxbt3'),
				isFeatured: true,
				isVerified: true,
				views: 0,
				ownerId: user.id,
				agentId: user.id,
			},
			{
				id: 'cmg5byi3h0009sx8cgub9jxbt4',
				title: 'Пентхаус с террасой',
				description:
					'Роскошный пентхаус с частной террасой и видом на город. Идеально для тех, кто ценит комфорт и престиж.',
				propertyType: 'PENTHOUSE',
				operationType: 'SALE',
				status: 'AVAILABLE',
				address: 'ул. Тверская, 15',
				city: 'Москва',
				state: 'Московская область',
				country: 'Россия',
				postalCode: '125009',
				latitude: 55.7616,
				longitude: 37.6066,
				bedrooms: 4,
				bathrooms: 3,
				area: 200.0,
				floor: 20,
				totalFloors: 20,
				yearBuilt: 2021,
				salePrice: 25000000,
				currency: 'RUB',
				features: ['терраса', 'панорамные окна', 'камин', 'гардеробная'],
				amenities: ['охрана', 'консьерж', 'спа-центр', 'парковка'],
				images: getPropertyImages('cmg5byi3h0009sx8cgub9jxbt4'),
				isFeatured: true,
				isVerified: true,
				views: 0,
				ownerId: user.id,
				agentId: user.id,
			},
			{
				id: 'cmg5byi3h0009sx8cgub9jxbt5',
				title: 'Офисное помещение в бизнес-центре',
				description:
					'Современное офисное помещение в престижном бизнес-центре. Готово к использованию, есть вся необходимая инфраструктура.',
				propertyType: 'OFFICE',
				operationType: 'RENT',
				status: 'AVAILABLE',
				address: 'ул. Красная Площадь, 1',
				city: 'Москва',
				state: 'Московская область',
				country: 'Россия',
				postalCode: '109012',
				latitude: 55.7539,
				longitude: 37.6208,
				bedrooms: 0,
				bathrooms: 2,
				area: 150.0,
				floor: 8,
				totalFloors: 15,
				yearBuilt: 2019,
				rentPrice: 300000,
				currency: 'RUB',
				features: ['кондиционер', 'интернет', 'парковка', 'конференц-зал'],
				amenities: ['охрана', 'ресепшн', 'кафе', 'банкомат'],
				images: getPropertyImages('cmg5byi3h0009sx8cgub9jxbt5'),
				isFeatured: false,
				isVerified: true,
				views: 0,
				ownerId: user.id,
				agentId: user.id,
			},
		];

		for (const propertyData of properties) {
			await prisma.property.upsert({
				where: { id: propertyData.id },
				update: propertyData,
				create: propertyData,
			});
		}

		return NextResponse.json({
			success: true,
			message: 'Тестовые данные успешно созданы!',
			data: {
				userCount: 1,
				propertyCount: properties.length,
			},
		});
	} catch (error) {
		console.error('Error seeding data:', error);
		return NextResponse.json(
			{
				success: false,
				error: 'Internal server error',
				details: error instanceof Error ? error.message : 'Unknown error',
			},
			{ status: 500 }
		);
	} finally {
		await prisma.$disconnect();
	}
}
