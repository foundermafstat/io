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
	const [formData, setFormData] = useState<CheckoutFormData>({
		name: '',
		phone: '',
		meetingDate: undefined,
		meetingTime: '',
		notes: '',
	});

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
					...formData,
					meetingDate: formData.meetingDate?.toISOString(),
				}),
			});

			if (!response.ok) {
				throw new Error('Ошибка при создании заказа');
			}

			toast.success(t('checkout.successMessage'));
			router.push('/properties');
		} catch (error) {
			console.error('Error submitting form:', error);
			toast.error(t('checkout.errorMessage'));
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
					<Button onClick={() => router.push('/properties')}>
						{t('checkout.backToCatalog')}
					</Button>
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
			{/* Hero Section */}
			<div className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-transparent">
				<div className="container mx-auto px-4 py-8">
					{/* Навигация */}
					<div className="mb-8">
						<Button
							variant="ghost"
							onClick={() => router.back()}
							className="mb-6 hover:bg-primary/10"
						>
							<ArrowLeft className="h-4 w-4 mr-2" />
							{t('checkout.back')}
						</Button>

						<div className="text-center">
							<div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
								<Sparkles className="h-4 w-4" />
								Вы выбрали отличную недвижимость!
							</div>
							<h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-2">
								{t('checkout.title')}
							</h1>
							<p className="text-xl text-gray-600 max-w-2xl mx-auto">
								{t('checkout.subtitle')}
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className="container mx-auto px-4 py-8 max-w-7xl">
				<div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
					{/* Левая колонка - Информация о недвижимости */}
					<div className="xl:col-span-1 space-y-6">
						{/* Карточка недвижимости */}
						<Card className="border-0 shadow-xl overflow-hidden">
							{/* Изображение */}
							<div className="relative h-64 bg-gradient-to-br from-primary/20 to-primary/5">
								<Image
									src={getMainImage()}
									alt={property.title}
									fill
									className="object-cover"
								/>
								<div className="absolute top-4 left-4">
									<Badge className="bg-green-500 text-white">
										<CheckCircle className="h-3 w-3 mr-1" />
										Выбрано
									</Badge>
								</div>
								{property.isFeatured && (
									<div className="absolute top-4 right-4">
										<Badge className="bg-yellow-500 text-black">
											<Star className="h-3 w-3 mr-1" />
											Премиум
										</Badge>
									</div>
								)}
							</div>

							<CardContent className="p-6">
								{/* Основная информация */}
								<div className="mb-6">
									<h3 className="text-2xl font-bold mb-3">{property.title}</h3>
									<div className="flex items-center text-gray-600 mb-4">
										<MapPin className="w-5 h-5 mr-2 text-primary" />
										<span className="text-lg">
											{[property.city, property.state, property.country]
												.filter(Boolean)
												.join(', ')}
										</span>
									</div>
								</div>

								{/* Характеристики */}
								<div className="grid grid-cols-3 gap-4 mb-6">
									{property.bedrooms && (
										<div className="text-center p-3 bg-slate-50 rounded-lg">
											<Bed className="w-6 h-6 mx-auto mb-2 text-primary" />
											<div className="text-xl font-bold">
												{property.bedrooms}
											</div>
											<div className="text-sm text-gray-600">
												{t('checkout.bedrooms')}
											</div>
										</div>
									)}
									{property.bathrooms && (
										<div className="text-center p-3 bg-slate-50 rounded-lg">
											<Bath className="w-6 h-6 mx-auto mb-2 text-primary" />
											<div className="text-xl font-bold">
												{property.bathrooms}
											</div>
											<div className="text-sm text-gray-600">
												{t('checkout.bathrooms')}
											</div>
										</div>
									)}
									{property.area && (
										<div className="text-center p-3 bg-slate-50 rounded-lg">
											<Square className="w-6 h-6 mx-auto mb-2 text-primary" />
											<div className="text-xl font-bold">{property.area}</div>
											<div className="text-sm text-gray-600">
												{t('checkout.area')}
											</div>
										</div>
									)}
								</div>

								{/* Цена */}
								<div className="text-center p-6 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl mb-6">
									<div className="flex items-center justify-center mb-2">
										<Euro className="w-8 h-8 text-primary mr-2" />
										<span className="text-4xl font-bold text-primary">
											{price?.toLocaleString()}
										</span>
									</div>
									{priceLabel && (
										<div className="text-gray-600 mb-3">{priceLabel}</div>
									)}
									<Badge variant="outline" className="text-sm">
										{property.operationType === 'RENT'
											? t('propertyDetail.operationType.rent')
											: t('propertyDetail.operationType.sale')}
									</Badge>
								</div>

								{/* Действия */}
								<div className="space-y-3">
									<Button variant="outline" className="w-full">
										<Heart className="h-4 w-4 mr-2" />В избранное
									</Button>
									<Button variant="outline" className="w-full">
										<Share2 className="h-4 w-4 mr-2" />
										Поделиться
									</Button>
								</div>
							</CardContent>
						</Card>

						{/* Преимущества */}
						<Card className="border-0 shadow-xl">
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Zap className="h-5 w-5 text-yellow-500" />
									Почему выбирают нас
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-center gap-3">
									<div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
										<Shield className="h-5 w-5 text-green-600" />
									</div>
									<div>
										<div className="font-semibold">Гарантия качества</div>
										<div className="text-sm text-gray-600">
											Проверенные объекты
										</div>
									</div>
								</div>
								<div className="flex items-center gap-3">
									<div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
										<Target className="h-5 w-5 text-blue-600" />
									</div>
									<div>
										<div className="font-semibold">Персональный подход</div>
										<div className="text-sm text-gray-600">
											Индивидуальные решения
										</div>
									</div>
								</div>
								<div className="flex items-center gap-3">
									<div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
										<TrendingUp className="h-5 w-5 text-purple-600" />
									</div>
									<div>
										<div className="font-semibold">Лучшие цены</div>
										<div className="text-sm text-gray-600">
											Конкурентные предложения
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Центральная и правая колонки - Форма */}
					<div className="xl:col-span-2">
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
							{/* Форма заказа */}
							<div className="lg:col-span-1">
								<Card className="border-0 shadow-xl">
									<CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
										<CardTitle className="flex items-center gap-2">
											<CalendarIcon className="h-6 w-6 text-primary" />
											{t('checkout.bookMeeting')}
										</CardTitle>
										<p className="text-gray-600">
											Заполните форму и мы свяжемся с вами в течение 15 минут
										</p>
									</CardHeader>
									<CardContent className="p-6">
										<form onSubmit={handleSubmit} className="space-y-6">
											{/* Имя */}
											<div className="space-y-2">
												<Label htmlFor="name" className="text-base font-medium">
													{t('checkout.yourName')} *
												</Label>
												<Input
													id="name"
													type="text"
													placeholder={t('checkout.namePlaceholder')}
													value={formData.name}
													onChange={(e) =>
														updateFormData('name', e.target.value)
													}
													required
													className="h-12 text-base"
												/>
											</div>

											{/* Телефон */}
											<div className="space-y-2">
												<Label
													htmlFor="phone"
													className="text-base font-medium"
												>
													{t('checkout.phone')} *
												</Label>
												<Input
													id="phone"
													type="tel"
													placeholder={t('checkout.phonePlaceholder')}
													value={formData.phone}
													onChange={(e) =>
														updateFormData('phone', e.target.value)
													}
													required
													className="h-12 text-base"
												/>
											</div>

											{/* Дата встречи */}
											<div className="space-y-2">
												<Label className="text-base font-medium">
													{t('checkout.meetingDate')} *
												</Label>
												<Popover>
													<PopoverTrigger asChild>
														<Button
															variant="outline"
															className={cn(
																'w-full justify-start text-left font-normal h-12 text-base',
																!formData.meetingDate && 'text-muted-foreground'
															)}
														>
															<CalendarIcon className="mr-2 h-5 w-5" />
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
													className="text-base font-medium"
												>
													{t('checkout.meetingTime')} *
												</Label>
												<Select
													value={formData.meetingTime}
													onValueChange={(value) =>
														updateFormData('meetingTime', value)
													}
												>
													<SelectTrigger className="h-12 text-base">
														<SelectValue
															placeholder={t('checkout.selectTime')}
														/>
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
												<Label
													htmlFor="notes"
													className="text-base font-medium"
												>
													{t('checkout.additionalNotes')}
												</Label>
												<Textarea
													id="notes"
													placeholder={t('checkout.notesPlaceholder')}
													value={formData.notes}
													onChange={(e) =>
														updateFormData('notes', e.target.value)
													}
													rows={4}
													className="text-base"
												/>
											</div>

											{/* Кнопка отправки */}
											<Button
												type="submit"
												className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
												disabled={submitting}
											>
												{submitting ? (
													<>
														<Loader2 className="mr-2 h-5 w-5 animate-spin" />
														{t('checkout.submitting')}
													</>
												) : (
													<>
														<ChevronRight className="mr-2 h-5 w-5" />
														{t('checkout.submitBooking')}
													</>
												)}
											</Button>
										</form>
									</CardContent>
								</Card>
							</div>

							{/* Дополнительная информация */}
							<div className="lg:col-span-1 space-y-6">
								{/* Гарантии */}
								<Card className="border-0 shadow-xl">
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<Shield className="h-5 w-5 text-green-600" />
											Наши гарантии
										</CardTitle>
									</CardHeader>
									<CardContent className="space-y-4">
										<div className="flex items-start gap-3">
											<CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
											<div>
												<div className="font-medium">Быстрый ответ</div>
												<div className="text-sm text-gray-600">
													Свяжемся в течение 15 минут
												</div>
											</div>
										</div>
										<div className="flex items-start gap-3">
											<CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
											<div>
												<div className="font-medium">
													Бесплатная консультация
												</div>
												<div className="text-sm text-gray-600">
													Экспертная помощь без доплат
												</div>
											</div>
										</div>
										<div className="flex items-start gap-3">
											<CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
											<div>
												<div className="font-medium">Гибкое время</div>
												<div className="text-sm text-gray-600">
													Подберем удобное время встречи
												</div>
											</div>
										</div>
										<div className="flex items-start gap-3">
											<CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
											<div>
												<div className="font-medium">Конфиденциальность</div>
												<div className="text-sm text-gray-600">
													Ваши данные в безопасности
												</div>
											</div>
										</div>
									</CardContent>
								</Card>

								{/* Контакты */}
								<Card className="border-0 shadow-xl">
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<Users className="h-5 w-5 text-primary" />
											Свяжитесь с нами
										</CardTitle>
									</CardHeader>
									<CardContent className="space-y-4">
										<div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
											<div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
												<Phone className="h-5 w-5 text-primary" />
											</div>
											<div>
												<div className="font-medium">Телефон</div>
												<div className="text-sm text-gray-600">
													+7 (999) 123-45-67
												</div>
											</div>
										</div>
										<div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
											<div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
												<Mail className="h-5 w-5 text-primary" />
											</div>
											<div>
												<div className="font-medium">Email</div>
												<div className="text-sm text-gray-600">
													info@realestate.com
												</div>
											</div>
										</div>
										<div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
											<div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
												<Clock className="h-5 w-5 text-primary" />
											</div>
											<div>
												<div className="font-medium">Режим работы</div>
												<div className="text-sm text-gray-600">
													Пн-Вс: 9:00 - 21:00
												</div>
											</div>
										</div>
									</CardContent>
								</Card>

								{/* Информация о безопасности */}
								<Card className="border-0 shadow-xl bg-green-50 border-green-200">
									<CardContent className="p-6">
										<div className="flex items-start gap-3">
											<Lock className="h-6 w-6 text-green-600 mt-0.5" />
											<div>
												<div className="font-semibold text-green-800 mb-2">
													Ваши данные защищены
												</div>
												<p className="text-sm text-green-700">
													{t('checkout.infoText')}
												</p>
											</div>
										</div>
									</CardContent>
								</Card>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
