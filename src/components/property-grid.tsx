'use client';

import { Property, OperationType, PropertyType } from '@/types/property';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { 
	MapPin, 
	Bed, 
	Bath, 
	Square, 
	Star, 
	Eye,
	Heart,
	Calendar
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from '@/components/translations-context';

interface PropertyGridProps {
	properties: Property[];
	loading?: boolean;
	onPropertyClick?: (property: Property) => void;
}

const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
	[PropertyType.APARTMENT]: 'Квартира',
	[PropertyType.HOUSE]: 'Дом',
	[PropertyType.CONDO]: 'Кондо',
	[PropertyType.TOWNHOUSE]: 'Таунхаус',
	[PropertyType.STUDIO]: 'Студия',
	[PropertyType.LOFT]: 'Лофт',
	[PropertyType.PENTHOUSE]: 'Пентхаус',
	[PropertyType.VILLA]: 'Вилла',
	[PropertyType.COMMERCIAL]: 'Коммерческая',
	[PropertyType.OFFICE]: 'Офис',
	[PropertyType.RETAIL]: 'Торговая',
	[PropertyType.WAREHOUSE]: 'Склад',
	[PropertyType.LAND]: 'Земля',
	[PropertyType.FARM]: 'Ферма',
	[PropertyType.OTHER]: 'Другое'
};

const OPERATION_TYPE_LABELS: Record<OperationType, string> = {
	[OperationType.RENT]: 'Аренда',
	[OperationType.SALE]: 'Продажа',
	[OperationType.BOTH]: 'Аренда и продажа'
};

export default function PropertyGrid({ properties, loading = false, onPropertyClick }: PropertyGridProps) {
	const { t } = useTranslations();
	const formatPrice = (price: number, operationType: OperationType) => {
		if (price >= 1000000) {
			return `$${(price / 1000000).toFixed(1)}M`;
		}
		return `$${(price / 1000).toFixed(0)}K`;
	};

	const getDisplayPrice = (property: Property) => {
		if (property.operationType === OperationType.RENT && property.rentPrice) {
			return `${formatPrice(property.rentPrice, OperationType.RENT)}${t('propertyGrid.pricePerMonth')}`;
		} else if (property.operationType === OperationType.SALE && property.salePrice) {
			return formatPrice(property.salePrice, OperationType.SALE);
		} else if (property.operationType === OperationType.BOTH) {
			if (property.rentPrice && property.salePrice) {
				return `${formatPrice(property.rentPrice, OperationType.RENT)}${t('propertyGrid.pricePerMonth')} • ${formatPrice(property.salePrice, OperationType.SALE)}`;
			} else if (property.rentPrice) {
				return `${formatPrice(property.rentPrice, OperationType.RENT)}${t('propertyGrid.pricePerMonth')}`;
			} else if (property.salePrice) {
				return formatPrice(property.salePrice, OperationType.SALE);
			}
		}
		return t('propertyGrid.priceNotSpecified');
	};

	const getMainImage = (property: Property) => {
		if (property.images && Array.isArray(property.images) && property.images.length > 0) {
			return property.images[0];
		}
		return '/placeholder.jpg';
	};

	if (loading) {
		return (
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{Array.from({ length: 8 }).map((_, index) => (
					<Card key={index} className="overflow-hidden">
						<Skeleton className="h-48 w-full" />
						<CardContent className="p-4 space-y-3">
							<Skeleton className="h-4 w-3/4" />
							<Skeleton className="h-3 w-1/2" />
							<Skeleton className="h-3 w-1/3" />
							<Skeleton className="h-8 w-full" />
						</CardContent>
					</Card>
				))}
			</div>
		);
	}

	if (properties.length === 0) {
		return (
			<div className="text-center py-12">
				<div className="text-gray-500 text-lg mb-4">
					{t('propertyGrid.noResults')}
				</div>
				<p className="text-gray-400">
					{t('propertyGrid.tryDifferentFilters')}
				</p>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
			{properties.map((property) => (
				<Card 
					key={property.id} 
					className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
					onClick={() => onPropertyClick?.(property)}
				>
					{/* Изображение */}
					<div className="relative h-48 overflow-hidden">
						<Image
							src={getMainImage(property)}
							alt={property.title}
							fill
							className="object-cover group-hover:scale-105 transition-transform duration-300"
						/>
						
						{/* Бейджи */}
						<div className="absolute top-3 left-3 flex flex-col gap-2">
							{property.isFeatured && (
								<Badge variant="default" className="bg-yellow-500">
									<Star className="h-3 w-3 mr-1" />
									Рекомендуем
								</Badge>
							)}
							{property.isVerified && (
								<Badge variant="secondary" className="bg-green-500 text-white">
									Проверено
								</Badge>
							)}
						</div>

						{/* Тип операции */}
						<div className="absolute top-3 right-3">
							<Badge variant="outline" className="bg-white/90">
								{OPERATION_TYPE_LABELS[property.operationType]}
							</Badge>
						</div>

						{/* Избранное */}
						<Button
							variant="ghost"
							size="sm"
							className="absolute bottom-3 right-3 bg-white/90 hover:bg-white"
						>
							<Heart className="h-4 w-4" />
						</Button>
					</div>

					<CardContent className="p-4">
						{/* Заголовок и тип */}
						<div className="mb-3">
							<h3 className="font-semibold text-lg line-clamp-2 mb-1">
								{property.title}
							</h3>
							<div className="flex items-center gap-2 text-sm text-gray-600">
								<Badge variant="outline" className="text-xs">
									{PROPERTY_TYPE_LABELS[property.propertyType]}
								</Badge>
							</div>
						</div>

						{/* Адрес */}
						<div className="flex items-start gap-2 mb-3">
							<MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
							<span className="text-sm text-gray-600 line-clamp-1">
								{property.city}, {property.address}
							</span>
						</div>

						{/* Характеристики */}
						<div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
							{property.bedrooms && (
								<div className="flex items-center gap-1">
									<Bed className="h-4 w-4" />
									<span>{property.bedrooms}</span>
								</div>
							)}
							{property.bathrooms && (
								<div className="flex items-center gap-1">
									<Bath className="h-4 w-4" />
									<span>{property.bathrooms}</span>
								</div>
							)}
							{property.area && (
								<div className="flex items-center gap-1">
									<Square className="h-4 w-4" />
									<span>{property.area} м²</span>
								</div>
							)}
						</div>

						{/* Цена и действия */}
						<div className="flex items-center justify-between">
							<div>
								<div className="text-lg font-bold text-primary">
									{getDisplayPrice(property)}
								</div>
								{property.views > 0 && (
									<div className="flex items-center gap-1 text-xs text-gray-500">
										<Eye className="h-3 w-3" />
										<span>{property.views} просмотров</span>
									</div>
								)}
							</div>
							
							<Link href={`/property/${property.id}`}>
								<Button size="sm">
									Подробнее
								</Button>
							</Link>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
