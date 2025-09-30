'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Property } from '@/types/property';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar } from '@/components/ui/calendar';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	CalendarIcon,
	Clock,
	MapPin,
	Bed,
	Bath,
	Square,
	Euro,
	ArrowLeft,
	CheckCircle,
	Loader2,
	Star,
	Shield,
	Phone,
	Mail,
	Users,
	Home,
	Building,
	Heart,
	Share2,
	ChevronRight,
	Sparkles,
	Zap,
	Target,
	TrendingUp,
	Lock,
	Eye,
	AlertCircle,
} from 'lucide-react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import Image from 'next/image';
import { useTranslations } from '@/components/translations-context';

interface CheckoutFormData {
	name: string;
	phone: string;
	meetingDate: Date | undefined;
	meetingTime: string;
	notes: string;
}

const TIME_SLOTS = [
	'09:00',
	'09:30',
	'10:00',
	'10:30',
	'11:00',
	'11:30',
	'12:00',
	'12:30',
	'13:00',
	'13:30',
	'14:00',
	'14:30',
	'15:00',
	'15:30',
	'16:00',
	'16:30',
	'17:00',
	'17:30',
	'18:00',
	'18:30',
	'19:00',
	'19:30',
	'20:00',
];

export default function CheckoutPage() {
	const params = useParams();
	const router = useRouter();
	const propertyId = params.id as string;
	const { t } = useTranslations();

	const [property, setProperty] = useState<Property | null>(null);
	const [loading, setLoading] = useState(true);
	const [submitting, setSubmitting] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [formData, setFormData] = useState<CheckoutFormData>({
		name: '',
		phone: '',
		meetingDate: undefined,
		meetingTime: '',
		notes: '',
	});

	// Инициализация формы только один раз
	const [isFormInitialized, setIsFormInitialized] = useState(false);

	// Сохранение формы при изменении
	useEffect(() => {
		if (isFormInitialized) {
			localStorage.setItem(
				`checkout-form-${propertyId}`,
				JSON.stringify(formData)
			);
		}
	}, [formData, propertyId, isFormInitialized]);

	// Инициализация формы из localStorage
	useEffect(() => {
		if (!isFormInitialized) {
			const savedFormData = localStorage.getItem(`checkout-form-${propertyId}`);
			if (savedFormData) {
				try {
					const parsed = JSON.parse(savedFormData);
					if (parsed.meetingDate) {
						parsed.meetingDate = new Date(parsed.meetingDate);
					}
					setFormData(parsed);
				} catch (error) {
					console.error('Error parsing saved form data:', error);
				}
			}
			setIsFormInitialized(true);
		}
	}, [propertyId, isFormInitialized]);

	// Загрузка данных недвижимости
	useEffect(() => {
		const fetchProperty = async () => {
			try {
				setLoading(true);
				const response = await fetch(`/api/properties/${propertyId}`);
				if (!response.ok) {
					throw new Error('Недвижимость не найдена');
				}
				const data = await response.json();
				setProperty(data);
			} catch (error) {
				console.error('Error fetching property:', error);
				toast.error(t('checkout.errorMessage'));
				router.push('/properties');
			} finally {
				setLoading(false);
			}
		};

		if (propertyId) {
			fetchProperty();
		}
	}, [propertyId, router]);

	// Обработка отправки формы
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (
			!formData.name ||
			!formData.phone ||
			!formData.meetingDate ||
			!formData.meetingTime
		) {
			toast.error(t('checkout.fillRequiredFields'));
			return;
		}

		try {
			setSubmitting(true);

			const response = await fetch('/api/checkout', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					propertyId,
					name: formData.name,
					phone: formData.phone,
					meetingDate: formData.meetingDate?.toISOString(),
					meetingTime: formData.meetingTime,
					notes: formData.notes || '',
				}),
			});

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.error || 'Ошибка при создании заказа');
			}

			toast.success(t('checkout.successMessage'));
			// Очищаем сохраненные данные формы после успешной отправки
			localStorage.removeItem(`checkout-form-${propertyId}`);
			setIsSuccess(true);
		} catch (error) {
			console.error('Error submitting form:', error);
			const errorMessage =
				error instanceof Error ? error.message : t('checkout.errorMessage');
			toast.error(errorMessage);
		} finally {
			setSubmitting(false);
		}
	};

	// Обновление формы
	const updateFormData = (field: keyof CheckoutFormData, value: any) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	if (loading) {
		return (
			<div className="min-h-screen bg-background flex items-center justify-center">
				<div className="flex items-center gap-2">
					<Loader2 className="h-6 w-6 animate-spin" />
					<span>{t('checkout.loading')}</span>
				</div>
			</div>
		);
	}

	if (!property) {
		return (
			<div className="min-h-screen bg-background flex items-center justify-center">
				<div className="text-center">
					<h1 className="text-2xl font-bold mb-4">
						{t('checkout.propertyNotFound')}
					</h1>
					<Button onClick={() => router.push('/catalog')}>
						{t('checkout.backToCatalog')}
					</Button>
				</div>
			</div>
		);
	}

	// Состояние благодарности
	if (isSuccess) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
				<div className="max-w-2xl mx-auto text-center p-8">
					<div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
						<CheckCircle className="h-12 w-12 text-white" />
					</div>
					<h1 className="text-4xl font-bold text-green-800 mb-6">
						{t('checkout.thankYou')}
					</h1>
					<p className="text-xl text-green-700 mb-8 leading-relaxed">
						{t('checkout.thankYouMessage')}
					</p>

					{/* Детали заявки */}
					<div className="bg-white rounded-lg p-6 mb-8 shadow-lg">
						<h3 className="text-lg font-semibold text-gray-800 mb-4">
							{t('checkout.bookingDetails')}
						</h3>
						<div className="space-y-3 text-left">
							<div className="flex justify-between">
								<span className="text-gray-600">{t('checkout.property')}:</span>
								<span className="font-medium">{property?.title}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-gray-600">{t('checkout.yourName')}:</span>
								<span className="font-medium">{formData.name}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-gray-600">{t('checkout.phone')}:</span>
								<span className="font-medium">{formData.phone}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-gray-600">
									{t('checkout.meetingDate')}:
								</span>
								<span className="font-medium">
									{formData.meetingDate &&
										format(formData.meetingDate, 'PPP', { locale: ru })}
								</span>
							</div>
							<div className="flex justify-between">
								<span className="text-gray-600">
									{t('checkout.meetingTime')}:
								</span>
								<span className="font-medium">{formData.meetingTime}</span>
							</div>
						</div>
					</div>

					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button
							onClick={() => router.push('/catalog')}
							className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
						>
							{t('checkout.backToProperties')}
						</Button>
						<Button
							onClick={() => router.push(`/estate/${propertyId}`)}
							variant="outline"
							className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 text-lg"
						>
							{t('checkout.viewProperty')}
						</Button>
					</div>
				</div>
			</div>
		);
	}

	const formatPrice = (price: number, currency: string = 'USD') => {
		return new Intl.NumberFormat('ru-RU', {
			style: 'currency',
			currency: currency,
			minimumFractionDigits: 0,
		}).format(price);
	};

	const getMainImage = () => {
		return property.images?.[0] || '/placeholder.svg';
	};

	const price =
		property.operationType === 'RENT' ? property.rentPrice : property.salePrice;
	const priceLabel =
		property.operationType === 'RENT' ? t('checkout.perMonth') : '';

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
			{/* Header */}
			<div className="bg-white border-b">
				<div className="container mx-auto px-4 py-6">
					<div className="flex items-center justify-between">
						<Button
							variant="ghost"
							onClick={() => router.back()}
							className="hover:bg-primary/10"
						>
							<ArrowLeft className="h-4 w-4 mr-2" />
							{t('checkout.back')}
						</Button>
						<h1 className="text-2xl font-bold text-center flex-1">
							{t('checkout.title')}
						</h1>
						<div className="w-20"></div> {/* Spacer */}
					</div>
				</div>
			</div>

			<div className="container mx-auto px-4 py-8 max-w-6xl">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{/* Левая колонка - Карточка недвижимости и процесс */}
					<div className="space-y-6">
						{/* Карточка недвижимости */}
						<Card className="border-0 shadow-lg overflow-hidden">
							<div className="relative h-48 bg-gradient-to-br from-primary/20 to-primary/5">
								<Image
									src={getMainImage()}
									alt={property.title}
									fill
									className="object-cover"
								/>
								<div className="absolute top-4 left-4">
									<Badge className="bg-green-500 text-white">
										<CheckCircle className="h-3 w-3 mr-1" />
										{t('checkout.selected')}
									</Badge>
								</div>
								{property.isFeatured && (
									<div className="absolute top-4 right-4">
										<Badge className="bg-yellow-500 text-black">
											<Star className="h-3 w-3 mr-1" />
											{t('checkout.premium')}
										</Badge>
									</div>
								)}
							</div>

							<CardContent className="p-6">
								<h3 className="text-xl font-bold mb-3">{property.title}</h3>
								<div className="flex items-center text-gray-600 mb-4">
									<MapPin className="w-4 h-4 mr-2 text-primary" />
									<span>
										{[property.city, property.state, property.country]
											.filter(Boolean)
											.join(', ')}
									</span>
								</div>

								{/* Характеристики */}
								<div className="grid grid-cols-3 gap-3 mb-4">
									{property.bedrooms && (
										<div className="text-center p-2 bg-slate-50 rounded">
											<Bed className="w-4 h-4 mx-auto mb-1 text-primary" />
											<div className="text-sm font-bold">
												{property.bedrooms}
											</div>
											<div className="text-xs text-gray-600">
												{t('checkout.bedrooms')}
											</div>
										</div>
									)}
									{property.bathrooms && (
										<div className="text-center p-2 bg-slate-50 rounded">
											<Bath className="w-4 h-4 mx-auto mb-1 text-primary" />
											<div className="text-sm font-bold">
												{property.bathrooms}
											</div>
											<div className="text-xs text-gray-600">
												{t('checkout.bathrooms')}
											</div>
										</div>
									)}
									{property.area && (
										<div className="text-center p-2 bg-slate-50 rounded">
											<Square className="w-4 h-4 mx-auto mb-1 text-primary" />
											<div className="text-sm font-bold">{property.area}</div>
											<div className="text-xs text-gray-600">
												{t('checkout.area')}
											</div>
										</div>
									)}
								</div>

								{/* Цена */}
								<div className="text-center p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg">
									<div className="flex items-center justify-center mb-1">
										<Euro className="w-6 h-6 text-primary mr-2" />
										<span className="text-2xl font-bold text-primary">
											{price?.toLocaleString()}
										</span>
									</div>
									{priceLabel && (
										<div className="text-sm text-gray-600 mb-2">
											{priceLabel}
										</div>
									)}
									<Badge variant="outline" className="text-xs">
										{property.operationType === 'RENT'
											? t('propertyDetail.operationType.rent')
											: t('propertyDetail.operationType.sale')}
									</Badge>
								</div>
							</CardContent>
						</Card>

						{/* Как проходит сделка */}
						<Card className="border-0 shadow-lg">
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Clock className="h-5 w-5 text-primary" />
									{t('checkout.howItWorks')}
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex gap-4">
									<div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
										1
									</div>
									<div>
										<div className="font-semibold">
											{t('checkout.step1.title')}
										</div>
										<div className="text-sm text-gray-600">
											{t('checkout.step1.description')}
										</div>
									</div>
								</div>
								<div className="flex gap-4">
									<div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
										2
									</div>
									<div>
										<div className="font-semibold">
											{t('checkout.step2.title')}
										</div>
										<div className="text-sm text-gray-600">
											{t('checkout.step2.description')}
										</div>
									</div>
								</div>
								<div className="flex gap-4">
									<div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
										3
									</div>
									<div>
										<div className="font-semibold">
											{t('checkout.step3.title')}
										</div>
										<div className="text-sm text-gray-600">
											{t('checkout.step3.description')}
										</div>
									</div>
								</div>
								<div className="flex gap-4">
									<div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
										4
									</div>
									<div>
										<div className="font-semibold">
											{t('checkout.step4.title')}
										</div>
										<div className="text-sm text-gray-600">
											{t('checkout.step4.description')}
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Правая колонка - Форма */}
					<div>
						<Card className="border-0 shadow-lg">
							<CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
								<CardTitle className="flex items-center gap-2">
									<CalendarIcon className="h-5 w-5 text-primary" />
									{t('checkout.bookMeeting')}
								</CardTitle>
								<p className="text-sm text-gray-600">
									{t('checkout.subtitle')}
								</p>
							</CardHeader>
							<CardContent className="p-6">
								<form onSubmit={handleSubmit} className="space-y-4">
									{/* Имя */}
									<div className="space-y-2">
										<Label htmlFor="name" className="text-sm font-medium">
											{t('checkout.yourName')} *
										</Label>
										<Input
											id="name"
											type="text"
											placeholder={t('checkout.namePlaceholder')}
											value={formData.name}
											onChange={(e) => updateFormData('name', e.target.value)}
											required
											className="h-10"
										/>
									</div>

									{/* Телефон */}
									<div className="space-y-2">
										<Label htmlFor="phone" className="text-sm font-medium">
											{t('checkout.phone')} *
										</Label>
										<Input
											id="phone"
											type="tel"
											placeholder={t('checkout.phonePlaceholder')}
											value={formData.phone}
											onChange={(e) => updateFormData('phone', e.target.value)}
											required
											className="h-10"
										/>
									</div>

									{/* Дата встречи */}
									<div className="space-y-2">
										<Label className="text-sm font-medium">
											{t('checkout.meetingDate')} *
										</Label>
										<Popover>
											<PopoverTrigger asChild>
												<Button
													variant="outline"
													className={cn(
														'w-full justify-start text-left font-normal h-10',
														!formData.meetingDate && 'text-muted-foreground'
													)}
												>
													<CalendarIcon className="mr-2 h-4 w-4" />
													{formData.meetingDate ? (
														format(formData.meetingDate, 'PPP', {
															locale: ru,
														})
													) : (
														<span>{t('checkout.selectDate')}</span>
													)}
												</Button>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0" align="start">
												<Calendar
													mode="single"
													selected={formData.meetingDate}
													onSelect={(date) =>
														updateFormData('meetingDate', date)
													}
													disabled={(date) => date < new Date()}
													initialFocus
												/>
											</PopoverContent>
										</Popover>
									</div>

									{/* Время встречи */}
									<div className="space-y-2">
										<Label
											htmlFor="meetingTime"
											className="text-sm font-medium"
										>
											{t('checkout.meetingTime')} *
										</Label>
										<Select
											value={formData.meetingTime}
											onValueChange={(value) =>
												updateFormData('meetingTime', value)
											}
										>
											<SelectTrigger className="h-10">
												<SelectValue placeholder={t('checkout.selectTime')} />
											</SelectTrigger>
											<SelectContent>
												{TIME_SLOTS.map((time) => (
													<SelectItem key={time} value={time}>
														<div className="flex items-center">
															<Clock className="w-4 h-4 mr-2" />
															{time}
														</div>
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>

									{/* Дополнительные пожелания */}
									<div className="space-y-2">
										<Label htmlFor="notes" className="text-sm font-medium">
											{t('checkout.additionalNotes')}
										</Label>
										<Textarea
											id="notes"
											placeholder={t('checkout.notesPlaceholder')}
											value={formData.notes}
											onChange={(e) => updateFormData('notes', e.target.value)}
											rows={3}
										/>
									</div>

									{/* Кнопка отправки */}
									<Button
										type="submit"
										className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
										disabled={submitting}
									>
										{submitting ? (
											<>
												<Loader2 className="mr-2 h-4 w-4 animate-spin" />
												{t('checkout.submitting')}
											</>
										) : (
											<>
												<ChevronRight className="mr-2 h-4 w-4" />
												{t('checkout.submitBooking')}
											</>
										)}
									</Button>
								</form>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
