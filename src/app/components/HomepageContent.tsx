'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
	MapPin,
	Phone,
	Shield,
	Navigation,
	Sparkles,
	Star,
	Building,
	Home as HomeIcon,
	Store,
	Warehouse,
	TreePine,
	Loader2
} from 'lucide-react';
import { useTranslations } from '@/components/translations-context';

interface PopularPropertyType {
	type: string;
	count: number;
}

interface PopularLocation {
	city: string | null;
	state: string | null;
	country: string | null;
	count: number;
}

interface CityStats {
	city: string;
	propertyCount: number;
	averageRentPrice: number;
	averageSalePrice: number;
}

interface HomepageContentProps {
	popularTypes: PopularPropertyType[];
	popularLocations: PopularLocation[];
	cityStats: CityStats[];
}

export default function HomepageContent({
	popularTypes,
	popularLocations,
	cityStats
}: HomepageContentProps) {
	const { t, getTranslation } = useTranslations();

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat('ru-RU', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(price);
	};

	const getPropertyTypeIcon = (type: string) => {
		const iconMap: { [key: string]: any } = {
			APARTMENT: Building,
			HOUSE: HomeIcon,
			VILLA: HomeIcon,
			COMMERCIAL: Store,
			WAREHOUSE: Warehouse,
			LAND: TreePine,
		};
		return iconMap[type] || Building;
	};

	const getPropertyTypeLabel = (type: string) => {
		const labelMap: { [key: string]: string } = {
			APARTMENT: 'Квартира',
			HOUSE: 'Дом',
			VILLA: 'Вилла',
			COMMERCIAL: 'Коммерческая',
			WAREHOUSE: 'Склад',
			LAND: 'Земля',
		};
		return labelMap[type] || type;
	};

	return (
		<div className="min-h-screen bg-background">
			{/* Header */}
			<header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
				<div className=" px-4 py-4 flex items-center justify-between">
					<div className="flex items-center space-x-2">
						<div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
							<Building className="w-5 h-5 text-primary-foreground" />
						</div>
						<span className="text-xl font-bold text-foreground"></span>
					</div>
					<div className="flex items-center space-x-4">
						<Button variant="ghost" size="sm">Menu</Button>
						<div className="w-8 h-8 bg-gray-200 rounded-full"></div>
					</div>
				</div>
			</header>

			{/* Hero Section */}
			<section className="py-20 px-4 text-center">
				<div className="container mx-auto max-w-4xl">
					<h1 className="text-5xl md:text-6xl font-bold text-foreground mb-8">
						{t('homepage.hero.title')}
					</h1>

					{/* Location badges */}
					{popularLocations.length > 0 ? (
						<div className="flex flex-wrap justify-center gap-4 mb-12">
							{popularLocations.slice(0, 7).map((location, index) => (
								<Badge key={index} variant="outline" className="flex items-center gap-2 px-4 py-2">
									<div className="w-2 h-2 bg-green-500 rounded-full"></div>
									{location.city && location.state
										? `${location.city}, ${location.state}`
										: location.city || 'Неизвестно'
									}
									{location.count > 0 && (
										<span className="text-xs text-muted-foreground">
											({location.count})
										</span>
									)}
								</Badge>
							))}
						</div>
					) : (
						<div className="text-center mb-12">
							<p className="text-muted-foreground">
								{t('homepage.hero.locationPlaceholder')}
							</p>
						</div>
					)}

					{/* Call to action */}
					<div className="flex flex-col items-center space-y-4">
						<Button size="lg" className="w-16 h-16 rounded-full bg-primary hover:bg-primary/90">
							<Phone className="w-6 h-6" />
						</Button>
						<Button variant="outline" size="lg" className="px-8">
							{t('homepage.hero.callToAction')}
						</Button>
					</div>

					{/* Property logos */}
					<div className="mt-16 grid grid-cols-8 gap-8 items-center opacity-60">
						{(getTranslation('homepage.hero.propertyLogos') as string[]).map((type: string, index: number) => (
							<div key={index} className="text-center">
								<div className="w-12 h-12 bg-gray-300 rounded mx-auto mb-2"></div>
								<span className="text-xs text-muted-foreground">{type}</span>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Popular Property Types */}
			<section className="py-20 px-4 bg-muted/30">
				<div className="container mx-auto max-w-6xl">
					<h2 className="text-3xl font-bold text-center mb-12">{t('homepage.popularTypes.title')}</h2>
					{popularTypes.length > 0 ? (
						<div className="grid grid-cols-2 md:grid-cols-3 gap-6">
							{popularTypes.slice(0, 6).map((property, index) => {
								const IconComponent = getPropertyTypeIcon(property.type);
								const label = getPropertyTypeLabel(property.type);

								return (
									<Card key={index} className="group hover:shadow-lg transition-shadow">
										<CardContent className="p-6">
											<div className="w-full h-48 bg-gray-200 rounded-lg mb-4 relative overflow-hidden flex items-center justify-center">
												<IconComponent className="w-16 h-16 text-gray-400" />
												<div className="absolute top-2 left-2 bg-white/90 px-2 py-1 rounded text-xs font-medium">
													{label}
												</div>
												<div className="absolute bottom-2 right-2 bg-primary/90 text-primary-foreground px-2 py-1 rounded text-xs font-medium">
													{property.count} {t('homepage.popularTypes.objects')}
												</div>
											</div>
										</CardContent>
									</Card>
								);
							})}
						</div>
					) : (
						<div className="text-center py-12">
							<Building className="w-24 h-24 text-gray-300 mx-auto mb-4" />
							<p className="text-muted-foreground text-lg">
								{t('homepage.popularTypes.placeholder')}
							</p>
						</div>
					)}
				</div>
			</section>

			{/* Trending Locations */}
			<section className="py-20 px-4">
				<div className="container mx-auto max-w-6xl">
					<h2 className="text-3xl font-bold text-center mb-12">{t('homepage.trending.title')}</h2>
					{cityStats.length > 0 ? (
						<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
							{cityStats.slice(0, 4).map((location, index) => {
								const avgPrice = location.averageRentPrice > 0
									? location.averageRentPrice
									: location.averageSalePrice > 0
									? location.averageSalePrice
									: 0;

								return (
									<Card key={index} className="group hover:shadow-lg transition-shadow">
										<CardContent className="p-0">
											<div className="w-full h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
												<MapPin className="w-16 h-16 text-gray-400" />
											</div>
											<div className="p-4">
												<h3 className="font-semibold mb-1">{location.city}</h3>
												<p className="text-sm text-muted-foreground">
													{location.propertyCount} {t('homepage.trending.objects')}
												</p>
												{avgPrice > 0 && (
													<p className="text-sm font-medium text-primary">
														{t('homepage.trending.from')} {formatPrice(avgPrice)}
													</p>
												)}
											</div>
										</CardContent>
									</Card>
								);
							})}
						</div>
					) : (
						<div className="text-center py-12">
							<MapPin className="w-24 h-24 text-gray-300 mx-auto mb-4" />
							<p className="text-muted-foreground text-lg">
								{t('homepage.trending.placeholder')}
							</p>
						</div>
					)}
				</div>
			</section>

			{/* Why Choose Us */}
			<section className="py-20 px-4 bg-muted/30">
				<div className="container mx-auto max-w-6xl">
					<h2 className="text-3xl font-bold text-center mb-12">{t('homepage.features.title')}</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div className="text-center">
							<div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
								<Sparkles className="w-8 h-8 text-primary-foreground" />
							</div>
							<h3 className="text-xl font-semibold mb-4">{t('homepage.features.convenientSearch.title')}</h3>
							<p className="text-muted-foreground">
								{t('homepage.features.convenientSearch.description')}
							</p>
						</div>
						<div className="text-center">
							<div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
								<Shield className="w-8 h-8 text-primary-foreground" />
							</div>
							<h3 className="text-xl font-semibold mb-4">{t('homepage.features.secureTransactions.title')}</h3>
							<p className="text-muted-foreground">
								{t('homepage.features.secureTransactions.description')}
							</p>
						</div>
						<div className="text-center">
							<div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
								<Navigation className="w-8 h-8 text-primary-foreground" />
							</div>
							<h3 className="text-xl font-semibold mb-4">{t('homepage.features.smartNavigation.title')}</h3>
							<p className="text-muted-foreground">
								{t('homepage.features.smartNavigation.description')}
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Testimonials */}
			<section className="py-20 px-4">
				<div className="container mx-auto max-w-6xl">
					<h2 className="text-3xl font-bold text-center mb-12">{t('homepage.testimonials.title')}</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{(getTranslation('homepage.testimonials.reviews') as any[]).map((testimonial: any, index: number) => (
							<Card key={index} className="p-6">
								<p className="text-sm mb-4 italic">"{testimonial.text}"</p>
								<div className="flex items-center space-x-3">
									<div className="w-10 h-10 bg-gray-300 rounded-full"></div>
									<div>
										<p className="font-semibold text-sm">{testimonial.name}</p>
										<p className="text-xs text-muted-foreground">{testimonial.handle}</p>
									</div>
								</div>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Final CTA */}
			<section className="py-20 px-4 text-center bg-primary text-primary-foreground">
				<div className="container mx-auto max-w-4xl">
					<h2 className="text-4xl font-bold mb-8">{t('homepage.cta.title')}</h2>
					<Button size="lg" variant="secondary" className="px-8">
						{t('homepage.cta.button')}
					</Button>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-muted/50 py-16 px-4">
				<div className="container mx-auto max-w-6xl">
					<div className="grid grid-cols-1 md:grid-cols-5 gap-8">
						<div className="col-span-1">
							<div className="flex items-center space-x-2 mb-4">
								<div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
									<Building className="w-5 h-5 text-primary-foreground" />
								</div>
								<span className="text-xl font-bold">{t('homepage.footer.company')}</span>
							</div>
						</div>

						<div>
							<h4 className="font-semibold mb-4">{t('homepage.footer.sections.destinations')}</h4>
							<ul className="space-y-2 text-sm text-muted-foreground">
								{(getTranslation('homepage.footer.sections.destinationsItems') as string[]).map((item: string, index: number) => (
									<li key={index}>{item}</li>
								))}
							</ul>
						</div>

						<div>
							<h4 className="font-semibold mb-4">{t('homepage.footer.sections.resources')}</h4>
							<ul className="space-y-2 text-sm text-muted-foreground">
								{(getTranslation('homepage.footer.sections.resourcesItems') as string[]).map((item: string, index: number) => (
									<li key={index}>{item}</li>
								))}
							</ul>
						</div>

						<div>
							<h4 className="font-semibold mb-4">{t('homepage.footer.sections.policies')}</h4>
							<ul className="space-y-2 text-sm text-muted-foreground">
								{(getTranslation('homepage.footer.sections.policiesItems') as string[]).map((item: string, index: number) => (
									<li key={index}>{item}</li>
								))}
							</ul>
						</div>

						<div>
							<h4 className="font-semibold mb-4">{t('homepage.footer.sections.newsletter')}</h4>
							<p className="text-sm text-muted-foreground mb-4">
								{t('homepage.footer.sections.newsletterText')}
							</p>
							<div className="flex space-x-2">
								<input
									type="email"
									placeholder={t('homepage.footer.sections.newsletterPlaceholder')}
									className="flex-1 px-3 py-2 border border-input rounded-md text-sm"
								/>
								<Button size="sm">{t('homepage.footer.sections.newsletterButton')}</Button>
							</div>
						</div>
					</div>

					<div className="border-t mt-8 pt-8 flex justify-between items-center text-sm text-muted-foreground">
						<p>{t('homepage.footer.copyright')}</p>
						<Button size="icon" variant="outline" className="rounded-full">
							<Phone className="w-4 h-4" />
						</Button>
					</div>
				</div>
			</footer>
		</div>
	);
}
