'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Property, PropertyReview } from '@/types/property';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
	Wifi,
	Car,
	Shield,
	Thermometer,
	Wind,
	Sun,
	Snowflake,
	Utensils,
	WashingMachine,
	Monitor,
	WifiIcon,
	ParkingCircle,
	Home,
	Building,
	TreePine,
	Mountain,
	Waves,
	Users,
	Clock,
	CheckCircle,
	XCircle,
	AlertCircle,
	Info,
	ChevronRight,
	ChevronLeft,
	Maximize2,
	Minimize2,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from '@/components/translations-context';
import { toast } from 'sonner';

// Удаляем статические лейблы, будем использовать переводы

export default function PropertyDetailPage() {
	const { t } = useTranslations();
	const params = useParams();
	const router = useRouter();
	const propertyId = params.id as string;

	const [property, setProperty] = useState<Property | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [reviews, setReviews] = useState<PropertyReview[]>([]);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [isImageModalOpen, setIsImageModalOpen] = useState(false);

	useEffect(() => {
		const fetchProperty = async () => {
			try {
				setLoading(true);
				const [propertyResponse, reviewsResponse] = await Promise.all([
					fetch(`/api/properties/${propertyId}`),
					fetch(`/api/properties/${propertyId}/reviews`),
				]);

				if (!propertyResponse.ok) {
					throw new Error(
						`${t('estateDetail.loadingError')}: ${propertyResponse.status}`
					);
				}

				const propertyData = await propertyResponse.json();
				setProperty(propertyData);

				// Загружаем отзывы, если они есть
				if (reviewsResponse.ok) {
					const reviewsData = await reviewsResponse.json();
					setReviews(reviewsData);
				}
			} catch (err) {
				const errorMessage =
					err instanceof Error ? err.message : t('estateDetail.loadingError');
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
			return `${formatPrice(property.rentPrice)}${t('estateDetail.perMonth')}`;
		} else if (property.operationType === 'SALE' && property.salePrice) {
			return formatPrice(property.salePrice);
		} else if (property.operationType === 'BOTH') {
			if (property.rentPrice && property.salePrice) {
				return `${formatPrice(property.rentPrice)}${t(
					'estateDetail.perMonth'
				)} • ${formatPrice(property.salePrice)}`;
			} else if (property.rentPrice) {
				return `${formatPrice(property.rentPrice)}${t(
					'estateDetail.perMonth'
				)}`;
			} else if (property.salePrice) {
				return formatPrice(property.salePrice);
			}
		}
		return t('estateDetail.priceNotSpecified');
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

	const getImages = (property: Property) => {
		if (property.images && Array.isArray(property.images)) {
			return property.images;
		}
		return ['/placeholder.jpg'];
	};

	const getAverageRating = (reviews: PropertyReview[]) => {
		if (reviews.length === 0) return 0;
		const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
		return sum / reviews.length;
	};

	const getAmenityIcon = (amenity: string) => {
		const iconMap: { [key: string]: any } = {
			WiFi: Wifi,
			Parking: Car,
			Security: Shield,
			'Air Conditioning': Thermometer,
			Heating: Sun,
			Kitchen: Utensils,
			Laundry: WashingMachine,
			TV: Monitor,
			Garden: TreePine,
			Pool: Waves,
			Gym: Building,
		};
		return iconMap[amenity] || Home;
	};

	const getAmenityTranslation = (amenity: string) => {
		return t(`estateDetail.amenitiesList.${amenity}` as any) || amenity;
	};

	const handleBookViewing = () => {
		// Используем Next.js роутер для навигации без перезагрузки
		router.push(`/checkout/${propertyId}`, { scroll: false });
	};

	const renderStars = (rating: number) => {
		return Array.from({ length: 5 }, (_, i) => (
			<Star
				key={i}
				className={`h-4 w-4 ${
					i < Math.floor(rating)
						? 'text-yellow-400 fill-yellow-400'
						: 'text-gray-300'
				}`}
			/>
		));
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
							{error || t('estateDetail.propertyNotFound')}
						</h3>
						<Link href="/catalog">
							<Button variant="outline">
								<ArrowLeft className="h-4 w-4 mr-2" />
								{t('estateDetail.backToList')}
							</Button>
						</Link>
					</CardContent>
				</Card>
			</div>
		);
	}

	const images = getImages(property);
	const averageRating = getAverageRating(reviews);

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
			{/* Hero Section */}
			<div className="relative">
				{/* Навигация */}
				<div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/20 to-transparent">
					<div className="container mx-auto px-4 py-6">
						<Link href="/catalog">
							<Button variant="ghost" className="text-white hover:bg-white/20">
								<ArrowLeft className="h-4 w-4 mr-2" />
								{t('estateDetail.back')}
							</Button>
						</Link>
					</div>
				</div>

				{/* Галерея изображений */}
				<div className="relative h-[70vh] overflow-hidden">
					<Image
						src={images[currentImageIndex]}
						alt={property.title}
						fill
						className="object-cover"
						priority
					/>

					{/* Overlay с информацией */}
					<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
						<div className="absolute bottom-0 left-0 right-0 p-8">
							<div className="container mx-auto">
								<div className="flex items-end justify-between">
									<div className="text-white">
										<h1 className="text-4xl font-bold mb-2">
											{property.title}
										</h1>
										<div className="flex items-center gap-4 mb-4">
											<div className="flex items-center gap-2">
												<MapPin className="h-5 w-5" />
												<span className="text-lg">
													{property.city}, {property.state}
												</span>
											</div>
											{reviews.length > 0 && (
												<div className="flex items-center gap-2">
													<div className="flex">
														{renderStars(averageRating)}
													</div>
													<span className="text-lg font-semibold">
														{averageRating.toFixed(1)} ({reviews.length}{' '}
														{t('estateDetail.reviewsCount')})
													</span>
												</div>
											)}
										</div>
									</div>
									<div className="text-right text-white">
										<div className="text-5xl font-bold mb-2">
											{getDisplayPrice(property)}
										</div>
										<div className="flex gap-2">
											{property.isFeatured && (
												<Badge className="bg-yellow-500 text-black">
													<Star className="h-3 w-3 mr-1" />
													{t('estateDetail.featured')}
												</Badge>
											)}
											{property.isVerified && (
												<Badge className="bg-green-500">
													<CheckCircle className="h-3 w-3 mr-1" />
													{t('estateDetail.verified')}
												</Badge>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Навигация по изображениям */}
					{images.length > 1 && (
						<>
							<Button
								variant="ghost"
								size="icon"
								className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
								onClick={() =>
									setCurrentImageIndex((prev) =>
										prev === 0 ? images.length - 1 : prev - 1
									)
								}
							>
								<ChevronLeft className="h-6 w-6" />
							</Button>
							<Button
								variant="ghost"
								size="icon"
								className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
								onClick={() =>
									setCurrentImageIndex((prev) =>
										prev === images.length - 1 ? 0 : prev + 1
									)
								}
							>
								<ChevronRight className="h-6 w-6" />
							</Button>
							<Button
								variant="ghost"
								size="icon"
								className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white"
								onClick={() => setIsImageModalOpen(true)}
							>
								<Maximize2 className="h-5 w-5" />
							</Button>
						</>
					)}
				</div>

				{/* Миниатюры изображений */}
				{images.length > 1 && (
					<div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
						{images.map((_, index) => (
							<button
								key={index}
								className={`w-3 h-3 rounded-full transition-all ${
									index === currentImageIndex
										? 'bg-white'
										: 'bg-white/50 hover:bg-white/70'
								}`}
								onClick={() => setCurrentImageIndex(index)}
							/>
						))}
					</div>
				)}
			</div>

			{/* Основной контент */}
			<div className="container mx-auto px-4 py-12">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
					{/* Левая колонка - детальная информация */}
					<div className="lg:col-span-2 space-y-8">
						{/* Описание */}
						<Card className="border-0 shadow-xl">
							<CardHeader>
								<CardTitle className="text-2xl">
									{t('estateDetail.aboutProperty')}
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-gray-700 leading-relaxed text-lg">
									{property.description}
								</p>
							</CardContent>
						</Card>

						{/* Характеристики */}
						<Card className="border-0 shadow-xl">
							<CardHeader>
								<CardTitle className="text-2xl flex items-center gap-2">
									<Home className="h-6 w-6" />
									{t('estateDetail.characteristics')}
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
									{property.bedrooms && (
										<div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
											<Bed className="h-6 w-6 text-primary" />
											<div>
												<div className="text-2xl font-bold">
													{property.bedrooms}
												</div>
												<div className="text-sm text-gray-600">
													{t('estateDetail.bedrooms')}
												</div>
											</div>
										</div>
									)}
									{property.bathrooms && (
										<div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
											<Bath className="h-6 w-6 text-primary" />
											<div>
												<div className="text-2xl font-bold">
													{property.bathrooms}
												</div>
												<div className="text-sm text-gray-600">
													{t('estateDetail.bathrooms')}
												</div>
											</div>
										</div>
									)}
									{property.area && (
										<div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
											<Square className="h-6 w-6 text-primary" />
											<div>
												<div className="text-2xl font-bold">
													{property.area}
												</div>
												<div className="text-sm text-gray-600">
													{t('estateDetail.area')}
												</div>
											</div>
										</div>
									)}
									{property.floor && (
										<div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
											<Building className="h-6 w-6 text-primary" />
											<div>
												<div className="text-2xl font-bold">
													{property.floor}
												</div>
												<div className="text-sm text-gray-600">
													{t('estateDetail.floor')}
												</div>
											</div>
										</div>
									)}
								</div>
							</CardContent>
						</Card>

						{/* Удобства */}
						{property.amenities &&
							Array.isArray(property.amenities) &&
							property.amenities.length > 0 && (
								<Card className="border-0 shadow-xl">
									<CardHeader>
										<CardTitle className="text-2xl flex items-center gap-2">
											<Star className="h-6 w-6" />
											{t('estateDetail.amenities')}
										</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
											{property.amenities.map((amenity, index) => {
												const IconComponent = getAmenityIcon(amenity);
												return (
													<div
														key={index}
														className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg"
													>
														<IconComponent className="h-5 w-5 text-primary" />
														<span className="font-medium">
															{getAmenityTranslation(amenity)}
														</span>
													</div>
												);
											})}
										</div>
									</CardContent>
								</Card>
							)}

						{/* Отзывы */}
						{reviews.length > 0 && (
							<Card className="border-0 shadow-xl">
								<CardHeader>
									<CardTitle className="text-2xl flex items-center gap-2">
										<Users className="h-6 w-6" />
										{t('estateDetail.reviews')} ({reviews.length})
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="space-y-6">
										{reviews.map((review) => (
											<div
												key={review.id}
												className="border-b pb-6 last:border-b-0"
											>
												<div className="flex items-start justify-between mb-3">
													<div>
														<div className="flex items-center gap-2 mb-1">
															<h4 className="font-semibold">{review.title}</h4>
															{review.isVerified && (
																<Badge variant="secondary" className="text-xs">
																	<CheckCircle className="h-3 w-3 mr-1" />
																	{t('estateDetail.verifiedReview')}
																</Badge>
															)}
														</div>
														<div className="flex items-center gap-2">
															<div className="flex">
																{renderStars(review.rating)}
															</div>
															<span className="text-sm text-gray-600">
																{new Date(review.createdAt).toLocaleDateString(
																	'ru-RU'
																)}
															</span>
														</div>
													</div>
												</div>
												<p className="text-gray-700 leading-relaxed">
													{review.comment}
												</p>

												{/* Детальные оценки */}
												{(review.cleanliness ||
													review.location ||
													review.value ||
													review.communication) && (
													<div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
														{review.cleanliness && (
															<div className="text-sm">
																<span className="text-gray-600">
																	{t('estateDetail.cleanliness')}:{' '}
																</span>
																<span className="font-medium">
																	{review.cleanliness}/5
																</span>
															</div>
														)}
														{review.location && (
															<div className="text-sm">
																<span className="text-gray-600">
																	{t('estateDetail.location')}:{' '}
																</span>
																<span className="font-medium">
																	{review.location}/5
																</span>
															</div>
														)}
														{review.value && (
															<div className="text-sm">
																<span className="text-gray-600">
																	{t('estateDetail.value')}:{' '}
																</span>
																<span className="font-medium">
																	{review.value}/5
																</span>
															</div>
														)}
														{review.communication && (
															<div className="text-sm">
																<span className="text-gray-600">
																	{t('estateDetail.communication')}:{' '}
																</span>
																<span className="font-medium">
																	{review.communication}/5
																</span>
															</div>
														)}
													</div>
												)}
											</div>
										))}
									</div>
								</CardContent>
							</Card>
						)}
					</div>

					{/* Правая колонка - действия и дополнительная информация */}
					<div className="space-y-6">
						{/* Бронирование */}
						<Card className="border-0 shadow-xl sticky top-6">
							<CardContent className="p-6">
								<div className="text-center mb-6">
									<div className="text-4xl font-bold text-primary mb-2">
										{getDisplayPrice(property)}
									</div>
									<Badge variant="outline" className="text-sm">
										{t(
											`estateDetail.operationType.${property.operationType.toLowerCase()}`
										)}
									</Badge>
								</div>

								<div className="space-y-3">
									<Button
										className="w-full"
										size="lg"
										onClick={handleBookViewing}
									>
										<Calendar className="h-5 w-5 mr-2" />
										{t('estateDetail.bookViewing')}
									</Button>
									<Button variant="outline" className="w-full" size="lg">
										<Phone className="h-5 w-5 mr-2" />
										{t('estateDetail.contact')}
									</Button>
									<div className="flex gap-2">
										<Button variant="outline" className="flex-1">
											<Heart className="h-4 w-4 mr-2" />
											{t('estateDetail.addToFavorites')}
										</Button>
										<Button variant="outline" className="flex-1">
											<Share2 className="h-4 w-4 mr-2" />
											{t('estateDetail.share')}
										</Button>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Статистика */}
						<Card className="border-0 shadow-xl">
							<CardContent className="p-6">
								<h3 className="font-semibold mb-4">
									{t('estateDetail.statistics')}
								</h3>
								<div className="space-y-3">
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-2">
											<Eye className="h-4 w-4 text-gray-500" />
											<span className="text-sm">{t('estateDetail.views')}</span>
										</div>
										<span className="font-medium">{property.views || 0}</span>
									</div>
									{reviews.length > 0 && (
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-2">
												<Star className="h-4 w-4 text-gray-500" />
												<span className="text-sm">
													{t('estateDetail.rating')}
												</span>
											</div>
											<div className="flex items-center gap-2">
												<span className="font-medium">
													{averageRating.toFixed(1)}
												</span>
												<div className="flex">{renderStars(averageRating)}</div>
											</div>
										</div>
									)}
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-2">
											<Users className="h-4 w-4 text-gray-500" />
											<span className="text-sm">
												{t('estateDetail.reviews')}
											</span>
										</div>
										<span className="font-medium">{reviews.length}</span>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Информация о владельце */}
						<Card className="border-0 shadow-xl">
							<CardContent className="p-6">
								<h3 className="font-semibold mb-4">
									{t('estateDetail.owner')}
								</h3>
								<div className="flex items-center gap-3">
									<div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
										<Building className="h-6 w-6 text-primary" />
									</div>
									<div>
										<div className="font-medium">
											{t('estateDetail.realEstateAgency')}
										</div>
										<div className="text-sm text-gray-600">
											{t('estateDetail.verifiedPartner')}
										</div>
									</div>
								</div>
								<div className="mt-4 space-y-2">
									<Button variant="outline" size="sm" className="w-full">
										<Phone className="h-4 w-4 mr-2" />
										{t('estateDetail.call')}
									</Button>
									<Button variant="outline" size="sm" className="w-full">
										<Mail className="h-4 w-4 mr-2" />
										{t('estateDetail.write')}
									</Button>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
