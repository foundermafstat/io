'use client';

import React from 'react';
import {
	Property,
	PropertyType,
	OperationType,
	PropertyStatus,
} from '@/types/property';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Heart,
	MapPin,
	Bed,
	Bath,
	Square,
	Star,
	Eye,
	Euro,
	Phone,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from '@/components/translations-context';
import { getRandomEstateImage } from '@/lib/utils/estate-images';

interface PropertyCardProps {
	property: Property;
	showActions?: boolean;
	onFavorite?: (propertyId: string) => void;
	onContact?: (propertyId: string) => void;
	onPropertyClick?: (property: Property) => void;
	isFavorite?: boolean;
}

// Удаляем статические лейблы, будем использовать переводы

const getStatusColor = (status: PropertyStatus) => {
	switch (status) {
		case PropertyStatus.AVAILABLE:
			return 'bg-green-100 text-green-800';
		case PropertyStatus.RENTED:
			return 'bg-blue-100 text-blue-800';
		case PropertyStatus.SOLD:
			return 'bg-purple-100 text-purple-800';
		case PropertyStatus.PENDING:
			return 'bg-yellow-100 text-yellow-800';
		case PropertyStatus.MAINTENANCE:
			return 'bg-orange-100 text-orange-800';
		case PropertyStatus.UNAVAILABLE:
			return 'bg-red-100 text-red-800';
		default:
			return 'bg-gray-100 text-gray-800';
	}
};

export function PropertyCard({
	property,
	showActions = true,
	onFavorite,
	onContact,
	onPropertyClick,
	isFavorite = false,
}: PropertyCardProps) {
	const { t } = useTranslations();
	const [imageLoading, setImageLoading] = React.useState(true);
	const [imageError, setImageError] = React.useState(false);

	const formatPrice = (price: number, currency: string = 'USD') => {
		return new Intl.NumberFormat('ru-RU', {
			style: 'currency',
			currency: currency,
			minimumFractionDigits: 0,
		}).format(price);
	};

	const getMainImage = () => {
		// Если у объекта есть изображения, используем первое
		if (property.images && property.images.length > 0) {
			return property.images[0];
		}

		// Иначе выбираем случайное изображение из директории estate
		return getRandomEstateImage(property.id);
	};

	const getAverageRating = () => {
		if (!property.reviews || property.reviews.length === 0) return 0;
		const sum = property.reviews.reduce(
			(acc, review) => acc + review.rating,
			0
		);
		return sum / property.reviews.length;
	};

	const averageRating = getAverageRating();

	const price =
		property.operationType === OperationType.RENT
			? property.rentPrice
			: property.salePrice;

	const priceLabel =
		property.operationType === OperationType.RENT ? '/мес' : '';

	const handleImageLoad = () => {
		setImageLoading(false);
	};

	const handleImageError = () => {
		setImageLoading(false);
		setImageError(true);
	};

	return (
		<Card
			className="group hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer hover:scale-[1.02]"
			onClick={() => onPropertyClick?.(property)}
		>
			{/* Image */}
			<div className="relative h-48 bg-muted">
				{!imageError ? (
					<Image
						src={getMainImage()}
						alt={property.title}
						fill
						className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
							imageLoading ? 'opacity-0' : 'opacity-100'
						}`}
						placeholder="blur"
						blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSIxMjAwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjEyMDAiIGZpbGw9IiNFQUVBRUEiIHJ4PSIzIi8+PC9zdmc+"
						onLoad={handleImageLoad}
						onError={handleImageError}
					/>
				) : (
					<div className="flex items-center justify-center h-full text-muted-foreground bg-muted">
						<div className="text-center">
							<MapPin className="w-8 h-8 mx-auto mb-2 opacity-50" />
							<p className="text-xs">{t('propertyGrid.imageNotAvailable')}</p>
						</div>
					</div>
				)}

				{/* Loading overlay */}
				{imageLoading && (
					<div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
						<div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
					</div>
				)}

				{/* Убираем все бейджи с изображений */}

				{/* Favorite button */}
				{showActions && onFavorite && (
					<div className="absolute bottom-2 right-2">
						<Button
							size="sm"
							variant="secondary"
							className="h-8 w-8 p-0 bg-white/90 hover:bg-white shadow-sm"
							onClick={(e) => {
								e.stopPropagation();
								onFavorite(property.id);
							}}
						>
							<Heart
								className={`h-4 w-4 ${
									isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
								}`}
							/>
						</Button>
					</div>
				)}
			</div>

			<CardContent className="p-4">
				{/* Title and location */}
				<div className="space-y-2 mb-3">
					<CardTitle className="text-lg line-clamp-1 group-hover:text-primary transition-colors">
						{property.title}
					</CardTitle>
					<div className="flex items-center text-sm text-muted-foreground">
						<MapPin className="w-4 h-4 mr-1" />
						<span className="line-clamp-1">
							{[property.city, property.state, property.country]
								.filter(Boolean)
								.join(', ')}
						</span>
					</div>
				</div>

				{/* Property details */}
				<div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
					{property.bedrooms && (
						<div className="flex items-center">
							<Bed className="w-4 h-4 mr-1" />
							{property.bedrooms}
						</div>
					)}
					{property.bathrooms && (
						<div className="flex items-center">
							<Bath className="w-4 h-4 mr-1" />
							{property.bathrooms}
						</div>
					)}
					{property.area && (
						<div className="flex items-center">
							<Square className="w-4 h-4 mr-1" />
							{property.area}
							{t('propertyGrid.area')}
						</div>
					)}
				</div>

				{/* Features */}
				{property.features &&
					Array.isArray(property.features) &&
					property.features.length > 0 && (
						<div className="flex flex-wrap gap-1 mb-3">
							{property.features.slice(0, 3).map((feature, index) => (
								<Badge key={index} variant="outline" className="text-xs">
									{feature}
								</Badge>
							))}
							{property.features.length > 3 && (
								<Badge variant="outline" className="text-xs">
									+{property.features.length - 3} {t('propertyGrid.more')}
								</Badge>
							)}
						</div>
					)}

				{/* Price and actions */}
				<div className="flex items-center justify-between">
					<div className="flex items-center">
						<Euro className="w-4 h-4 mr-1" />
						<span className="text-lg font-semibold">
							{price?.toLocaleString()}
						</span>
						{priceLabel && (
							<span className="text-sm text-muted-foreground ml-1">
								{priceLabel}
							</span>
						)}
					</div>

					<div className="flex items-center gap-2">
						<Button
							variant="outline"
							size="sm"
							className="h-8 w-8 p-0"
							onClick={(e) => {
								e.stopPropagation();
								window.location.href = `/estate/${property.id}`;
							}}
							title={t('propertyGrid.details')}
						>
							<Eye className="w-4 h-4" />
						</Button>
						<Button
							variant="default"
							size="sm"
							className="h-8 w-8 p-0"
							onClick={(e) => {
								e.stopPropagation();
								window.location.href = `/checkout/${property.id}`;
							}}
							title={t('propertyGrid.bookViewing')}
						>
							<Phone className="w-4 h-4" />
						</Button>
					</div>
				</div>

				{/* Stats */}
				<div className="flex items-center justify-between text-xs text-muted-foreground mt-2 pt-2 border-t">
					<span>
						{property.views || 0} {t('propertyGrid.views')}
					</span>
					<span>
						{Array.isArray(property.reviews) ? property.reviews.length : 0}{' '}
						{t('propertyGrid.reviews')}
					</span>
				</div>
			</CardContent>
		</Card>
	);
}
