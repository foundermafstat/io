import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface CheckoutRequest {
	propertyId: string;
	name: string;
	phone: string;
	meetingDate: string;
	meetingTime: string;
	notes?: string;
}

export async function POST(request: NextRequest) {
	try {
		const body: CheckoutRequest = await request.json();
		const { propertyId, name, phone, meetingDate, meetingTime, notes } = body;

		// Валидация обязательных полей
		if (!propertyId || !name || !phone || !meetingDate || !meetingTime) {
			return NextResponse.json(
				{ error: 'Не все обязательные поля заполнены' },
				{ status: 400 }
			);
		}

		// Проверка существования недвижимости
		const property = await prisma.property.findUnique({
			where: { id: propertyId },
		});

		if (!property) {
			return NextResponse.json(
				{ error: 'Недвижимость не найдена' },
				{ status: 404 }
			);
		}

		// Создание записи о заказе/встрече
		const meeting = await prisma.propertyReservation.create({
			data: {
				propertyId,
				userId: 'anonymous', // Для анонимных пользователей
				operationType: property.operationType as any,
				startDate: new Date(meetingDate),
				endDate: new Date(meetingDate), // Однодневная встреча
				totalPrice: 0, // Встреча бесплатная
				currency: property.currency || 'USD',
				status: 'PENDING',
				notes: `Имя: ${name}\nТелефон: ${phone}\nВремя: ${meetingTime}\n${
					notes || ''
				}`.trim(),
			},
			include: {
				property: true,
			},
		});

		// Здесь можно добавить отправку уведомлений
		// Например, email агенту или SMS клиенту

		return NextResponse.json({
			success: true,
			meetingId: meeting.id,
			message: 'Заказ успешно создан',
		});
	} catch (error) {
		console.error('Error creating checkout:', error);
		return NextResponse.json(
			{ error: 'Внутренняя ошибка сервера' },
			{ status: 500 }
		);
	}
}
