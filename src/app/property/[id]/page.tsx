'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Property } from '@/types/property';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
	MapPin,
	Bed,
	Bath,
	Square,
	Star,
	Eye,
	Heart,
	Calendar,
	Phone,
	Mail,
	Share2,
	ArrowLeft,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from '@/components/translations-context';
import { toast } from 'sonner';

// Удаляем статические лейблы, будем использовать переводы

export default function PropertyDetailPage() {
	const { t } = useTranslations();
	const params = useParams();
	const propertyId = params.id as string;

	const [property, setProperty] = useState<Property | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchProperty = async () => {
			try {
				setLoading(true);
				const response = await fetch(`/api/properties/${propertyId}`);

				if (!response.ok) {
					throw new Error(`Ошибка загрузки: ${response.status}`);
				}

				const data = await response.json();
				setProperty(data);
			} catch (err) {
				const errorMessage =
					err instanceof Error
						? err.message
						: 'Произошла ошибка при загрузке объекта';
				setError(errorMessage);
				toast.error(errorMessage);
			} finally {
				setLoading(false);
			}
		};

		if (propertyId) {
			fetchProperty();
		}
	}, [propertyId]);

	const formatPrice = (price: number) => {
		if (price >= 1000000) {
			return `$${(price / 1000000).toFixed(1)}M`;
		}
		return `$${(price / 1000).toFixed(0)}K`;
	};

	const getDisplayPrice = (property: Property) => {
		if (property.operationType === 'RENT' && property.rentPrice) {
			return `${formatPrice(property.rentPrice)}/мес`;
		} else if (property.operationType === 'SALE' && property.salePrice) {
			return formatPrice(property.salePrice);
		} else if (property.operationType === 'BOTH') {
			if (property.rentPrice && property.salePrice) {
				return `${formatPrice(property.rentPrice)}/мес • ${formatPrice(
					property.salePrice
				)}`;
			} else if (property.rentPrice) {
				return `${formatPrice(property.rentPrice)}/мес`;
			} else if (property.salePrice) {
				return formatPrice(property.salePrice);
			}
		}
		return 'Цена не указана';
	};

	const getMainImage = (property: Property) => {
		if (
			property.images &&
			Array.isArray(property.images) &&
			property.images.length > 0
		) {
			return property.images[0];
		}
		return '/placeholder.jpg';
	};

	if (loading) {
		return (
			<div className="container mx-auto px-4 py-8">
				<div className="mb-6">
					<Skeleton className="h-8 w-48 mb-4" />
					<Skeleton className="h-4 w-32" />
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					<div className="lg:col-span-2 space-y-6">
						<Skeleton className="h-96 w-full" />
						<Skeleton className="h-32 w-full" />
						<Skeleton className="h-32 w-full" />
					</div>
					<div className="space-y-6">
						<Skeleton className="h-48 w-full" />
						<Skeleton className="h-32 w-full" />
					</div>
				</div>
			</div>
		);
	}

	if (error || !property) {
		return (
			<div className="container mx-auto px-4 py-8">
				<Card className="border-red-200 bg-red-50">
					<CardContent className="p-6 text-center">
						<h3 className="text-lg font-semibold text-red-800 mb-2">
							{error || 'Объект не найден'}
						</h3>
						<Link href="/properties">
							<Button variant="outline">
								<ArrowLeft className="h-4 w-4 mr-2" />
								Вернуться к списку
							</Button>
						</Link>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8">
			{/* Навигация */}
			<div className="mb-6">
				<Link href="/properties">
					<Button variant="ghost" className="mb-4">
						<ArrowLeft className="h-4 w-4 mr-2" />
						Вернуться к списку
					</Button>
				</Link>

				<div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
					<span>{property.city}</span>
					<span>•</span>
					<span>{property.address}</span>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Основная информация */}
				<div className="lg:col-span-2 space-y-6">
					{/* Изображение */}
					<Card className="overflow-hidden">
						<div className="relative h-96">
							<Image
								src={getMainImage(property)}
								alt={property.title}
								fill
								className="object-cover"
							/>
						</div>
					</Card>

					{/* Описание */}
					<Card>
						<CardContent className="p-6">
							<h1 className="text-2xl font-bold mb-4">{property.title}</h1>
							<div className="flex items-center gap-4 mb-4">
								<Badge variant="outline">
									{t(
										`propertyDetail.propertyType.${property.propertyType.toLowerCase()}`
									)}
								</Badge>
								<Badge variant="secondary">
									{t(
										`propertyDetail.operationType.${property.operationType.toLowerCase()}`
									)}
								</Badge>
								{property.isFeatured && (
									<Badge className="bg-yellow-500">
										<Star className="h-3 w-3 mr-1" />
										{t('propertyDetail.featured')}
									</Badge>
								)}
								{property.isVerified && (
									<Badge className="bg-green-500 text-white">
										{t('propertyDetail.verified')}
									</Badge>
								)}
							</div>
							<p className="text-gray-700 leading-relaxed">
								{property.description}
							</p>
						</CardContent>
					</Card>

					{/* Характеристики */}
					<Card>
						<CardContent className="p-6">
							<h2 className="text-xl font-semibold mb-4">
								{t('propertyDetail.characteristics')}
							</h2>
							<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
								{property.bedrooms && (
									<div className="flex items-center gap-2">
										<Bed className="h-5 w-5 text-gray-400" />
										<span>
											{property.bedrooms} {t('propertyDetail.bedrooms')}
										</span>
									</div>
								)}
								{property.bathrooms && (
									<div className="flex items-center gap-2">
										<Bath className="h-5 w-5 text-gray-400" />
										<span>
											{property.bathrooms} {t('propertyDetail.bathrooms')}
										</span>
									</div>
								)}
								{property.area && (
									<div className="flex items-center gap-2">
										<Square className="h-5 w-5 text-gray-400" />
										<span>
											{property.area} {t('propertyDetail.area')}
										</span>
									</div>
								)}
								{property.floor && (
									<div className="flex items-center gap-2">
										<span className="text-gray-400">
											{t('propertyDetail.floor')}:
										</span>
										<span>{property.floor}</span>
									</div>
								)}
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Боковая панель */}
				<div className="space-y-6">
					{/* Цена и действия */}
					<Card>
						<CardContent className="p-6">
							<div className="text-3xl font-bold text-primary mb-4">
								{getDisplayPrice(property)}
							</div>

							<div className="space-y-3">
								<Button className="w-full" size="lg">
									<Phone className="h-4 w-4 mr-2" />
									{t('propertyDetail.contact')}
								</Button>
								<Button variant="outline" className="w-full">
									<Heart className="h-4 w-4 mr-2" />
									{t('propertyDetail.addToFavorites')}
								</Button>
								<Button variant="outline" className="w-full">
									<Share2 className="h-4 w-4 mr-2" />
									{t('propertyDetail.share')}
								</Button>
							</div>
						</CardContent>
					</Card>

					{/* Информация о просмотрах */}
					<Card>
						<CardContent className="p-6">
							<div className="flex items-center gap-2 text-sm text-gray-600">
								<Eye className="h-4 w-4" />
								<span>
									{property.views} {t('propertyDetail.views')}
								</span>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
