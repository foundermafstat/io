import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/api/prisma-client';

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id: propertyId } = await params;

		if (!propertyId) {
			return NextResponse.json(
				{ error: 'ID недвижимости обязателен' },
				{ status: 400 }
			);
		}

		// Проверяем, существует ли недвижимость
		const property = await prisma.property.findUnique({
			where: { id: propertyId },
		});

		if (!property) {
			return NextResponse.json(
				{ error: 'Недвижимость не найдена' },
				{ status: 404 }
			);
		}

		// Получаем отзывы для недвижимости
		const reviews = await prisma.propertyReview.findMany({
			where: { propertyId },
			orderBy: { createdAt: 'desc' },
			include: {
				user: {
					select: {
						id: true,
						name: true,
						email: true,
					},
				},
			},
		});

		return NextResponse.json(reviews);
	} catch (error) {
		console.error('Error fetching reviews:', error);
		return NextResponse.json(
			{ error: 'Внутренняя ошибка сервера' },
			{ status: 500 }
		);
	}
}
