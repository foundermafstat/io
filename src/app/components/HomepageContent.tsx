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
	Loader2,
} from 'lucide-react';
import { useTranslations } from '@/components/translations-context';
import Link from 'next/link';
import { useEffect, useState } from 'react';

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
	cityStats,
}: HomepageContentProps) {
	const { t, getTranslation } = useTranslations();
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		setIsVisible(true);
	}, []);

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
			APARTMENT: t('estateGrid.estateType.apartment'),
			HOUSE: t('estateGrid.estateType.house'),
			VILLA: t('estateGrid.estateType.villa'),
			COMMERCIAL: t('estateGrid.estateType.commercial'),
			WAREHOUSE: t('estateGrid.estateType.warehouse'),
			LAND: t('estateGrid.estateType.land'),
		};
		return labelMap[type] || type;
	};

	return (
		<div className="min-h-screen bg-background">
			{/* Hero Section */}
			<section className="relative py-12 px-4 text-center overflow-hidden">
				{/* Background gradient */}
				<div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10"></div>

				<div className="container mx-auto max-w-6xl relative z-10">
					{/* Badge */}
					<div
						className={`inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-medium mb-6 transition-all duration-1000 ${
							isVisible
								? 'opacity-100 translate-y-0'
								: 'opacity-0 translate-y-4'
						}`}
						style={{ transitionDelay: '0.1s' }}
					>
						<Sparkles className="w-4 h-4" />
						{t('homepage.hero.badge')}
					</div>

					<h1
						className={`text-6xl md:text-7xl font-bold text-foreground mb-6 leading-tight transition-all duration-1000 ${
							isVisible
								? 'opacity-100 translate-y-0'
								: 'opacity-0 translate-y-8'
						}`}
						style={{ transitionDelay: '0.2s' }}
					>
						{t('homepage.hero.title')}
						<span className="block text-primary">
							{t('homepage.hero.titleHighlight')}
						</span>
					</h1>

					<p
						className={`text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 ${
							isVisible
								? 'opacity-100 translate-y-0'
								: 'opacity-0 translate-y-8'
						}`}
						style={{ transitionDelay: '0.3s' }}
					>
						{t('homepage.hero.subtitle')}
					</p>

					{/* Location badges */}
					{popularLocations.length > 0 ? (
						<div
							className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-1000 ${
								isVisible
									? 'opacity-100 translate-y-0'
									: 'opacity-0 translate-y-4'
							}`}
							style={{ transitionDelay: '0.4s' }}
						>
							{popularLocations.slice(0, 6).map((location, index) => (
								<Badge
									key={index}
									variant="outline"
									className="flex items-center gap-2 px-4 py-2 hover:bg-primary/10 transition-colors"
									style={{
										animationDelay: `${0.5 + index * 0.1}s`,
										animation: isVisible
											? 'fadeInUp 0.6s ease-out forwards'
											: 'none',
									}}
								>
									<div className="w-2 h-2 bg-green-500 rounded-full"></div>
									{location.city && location.state
										? `${location.city}, ${location.state}`
										: location.city || t('homepage.hero.unknown')}
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
					<div
						className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 transition-all duration-1000 ${
							isVisible
								? 'opacity-100 translate-y-0'
								: 'opacity-0 translate-y-4'
						}`}
						style={{ transitionDelay: '0.6s' }}
					>
						<Link href="/catalog">
							<Button
								size="lg"
								className="px-8 py-4 text-lg bg-primary hover:bg-primary/90 shadow-lg"
							>
								<Building className="w-5 h-5 mr-2" />
								{t('homepage.hero.startSearch')}
							</Button>
						</Link>
						<Link href="/catalog">
							<Button variant="outline" size="lg" className="px-8 py-4 text-lg">
								<MapPin className="w-5 h-5 mr-2" />
								{t('homepage.hero.viewCatalog')}
							</Button>
						</Link>
					</div>

					{/* Property showcase with real images */}
					<div
						className={`grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto transition-all duration-1000 ${
							isVisible
								? 'opacity-100 translate-y-0'
								: 'opacity-0 translate-y-8'
						}`}
						style={{ transitionDelay: '0.7s' }}
					>
						{['io-01.png', 'io-02.png', 'io-03.png', 'io-04.png'].map(
							(image, index) => (
								<div
									key={index}
									className="relative group"
									style={{
										animationDelay: `${0.8 + index * 0.1}s`,
										animation: isVisible
											? 'fadeInUp 0.6s ease-out forwards'
											: 'none',
									}}
								>
									<div className="aspect-square rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow">
										<img
											src={`/estate/${image}`}
											alt={`${t('homepage.hero.estate')} ${index + 1}`}
											className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
										/>
									</div>
									<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
										<div className="absolute bottom-3 left-3 text-white">
											<p className="text-sm font-medium">
												{t('homepage.hero.estateShowcase')}
											</p>
										</div>
									</div>
								</div>
							)
						)}
					</div>
				</div>
			</section>

			{/* Popular Property Types */}
			<section className="py-20 px-4 bg-muted/30">
				<div className="container mx-auto max-w-6xl">
					<div
						className={`text-center mb-16 transition-all duration-1000 ${
							isVisible
								? 'opacity-100 translate-y-0'
								: 'opacity-0 translate-y-8'
						}`}
						style={{ transitionDelay: '0.2s' }}
					>
						<h2 className="text-4xl font-bold text-foreground mb-4">
							{t('homepage.popularTypes.title')}
						</h2>
						<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
							{t('homepage.popularTypes.subtitle')}
						</p>
					</div>

					{popularTypes.length > 0 ? (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							{popularTypes.slice(0, 6).map((property, index) => {
								const IconComponent = getPropertyTypeIcon(property.type);
								const label = getPropertyTypeLabel(property.type);
								const estateImages = [
									'io-01.png',
									'io-02.png',
									'io-03.png',
									'io-04.png',
									'io-05.png',
									'io-06.png',
								];
								const imageIndex = index % estateImages.length;

								return (
									<Card
										key={index}
										className={`group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg ${
											isVisible
												? 'opacity-100 translate-y-0'
												: 'opacity-0 translate-y-8'
										}`}
										style={{
											transitionDelay: `${0.4 + index * 0.1}s`,
											animation: isVisible
												? 'fadeInUp 0.6s ease-out forwards'
												: 'none',
										}}
									>
										<CardContent className="p-0">
											<div className="relative h-64 overflow-hidden rounded-t-lg">
												<img
													src={`/estate/${estateImages[imageIndex]}`}
													alt={label}
													className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
												/>
												<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
												<div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
													{label}
												</div>
												<div className="absolute bottom-4 right-4 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
													{property.count} {t('homepage.popularTypes.objects')}
												</div>
											</div>
											<div className="p-6">
												<div className="flex items-center justify-between mb-2">
													<h3 className="text-xl font-semibold">{label}</h3>
													<IconComponent className="w-6 h-6 text-primary" />
												</div>
												<p className="text-muted-foreground text-sm mb-4">
													{property.count}{' '}
													{t('homepage.popularTypes.availableObjects')}
												</p>
												<Link
													href={`/catalog?type=${property.type.toLowerCase()}`}
												>
													<Button
														variant="outline"
														className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
													>
														{t('homepage.popularTypes.viewObjects')}
													</Button>
												</Link>
											</div>
										</CardContent>
									</Card>
								);
							})}
						</div>
					) : (
						<div className="text-center py-16">
							<div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
								<Building className="w-12 h-12 text-primary" />
							</div>
							<h3 className="text-xl font-semibold mb-2">
								{t('homepage.popularTypes.addingProperties')}
							</h3>
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
					<div
						className={`text-center mb-16 transition-all duration-1000 ${
							isVisible
								? 'opacity-100 translate-y-0'
								: 'opacity-0 translate-y-8'
						}`}
						style={{ transitionDelay: '0.2s' }}
					>
						<h2 className="text-4xl font-bold text-foreground mb-4">
							{t('homepage.trending.title')}
						</h2>
						<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
							{t('homepage.trending.subtitle')}
						</p>
					</div>

					{cityStats.length > 0 ? (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
							{cityStats.slice(0, 4).map((location, index) => {
								const avgPrice =
									location.averageRentPrice > 0
										? location.averageRentPrice
										: location.averageSalePrice > 0
										? location.averageSalePrice
										: 0;
								const estateImages = [
									'io-01.png',
									'io-02.png',
									'io-03.png',
									'io-04.png',
									'io-05.png',
									'io-06.png',
								];
								const imageIndex = index % estateImages.length;

								return (
									<Card
										key={index}
										className={`group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg overflow-hidden ${
											isVisible
												? 'opacity-100 translate-y-0'
												: 'opacity-0 translate-y-8'
										}`}
										style={{
											transitionDelay: `${0.4 + index * 0.1}s`,
											animation: isVisible
												? 'fadeInUp 0.6s ease-out forwards'
												: 'none',
										}}
									>
										<CardContent className="p-0">
											<div className="relative h-48 overflow-hidden">
												<img
													src={`/estate/${estateImages[imageIndex]}`}
													alt={location.city}
													className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
												/>
												<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
												<div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
													{location.city}
												</div>
												<div className="absolute bottom-4 right-4 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
													{location.propertyCount}{' '}
													{t('homepage.trending.objects')}
												</div>
											</div>
											<div className="p-6">
												<div className="flex items-center gap-2 mb-2">
													<MapPin className="w-5 h-5 text-primary" />
													<h3 className="text-lg font-semibold">
														{location.city}
													</h3>
												</div>
												<p className="text-muted-foreground text-sm mb-3">
													{location.propertyCount}{' '}
													{t('homepage.trending.availableObjects')}
												</p>
												{avgPrice > 0 && (
													<div className="flex items-center justify-between">
														<span className="text-sm text-muted-foreground">
															{t('homepage.trending.averagePrice')}
														</span>
														<span className="text-lg font-bold text-primary">
															{formatPrice(avgPrice)}
														</span>
													</div>
												)}
												<Link
													href={`/catalog?city=${encodeURIComponent(
														location.city
													)}`}
												>
													<Button
														variant="outline"
														size="sm"
														className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
													>
														{t('homepage.trending.explore')}
													</Button>
												</Link>
											</div>
										</CardContent>
									</Card>
								);
							})}
						</div>
					) : (
						<div className="text-center py-16">
							<div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
								<MapPin className="w-12 h-12 text-primary" />
							</div>
							<h3 className="text-xl font-semibold mb-2">
								{t('homepage.trending.analyzingMarket')}
							</h3>
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
					<div
						className={`text-center mb-16 transition-all duration-1000 ${
							isVisible
								? 'opacity-100 translate-y-0'
								: 'opacity-0 translate-y-8'
						}`}
						style={{ transitionDelay: '0.2s' }}
					>
						<h2 className="text-4xl font-bold text-foreground mb-4">
							{t('homepage.features.title')}
						</h2>
						<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
							{t('homepage.features.subtitle')}
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div
							className={`text-center group transition-all duration-1000 ${
								isVisible
									? 'opacity-100 translate-y-0'
									: 'opacity-0 translate-y-8'
							}`}
							style={{
								transitionDelay: '0.4s',
								animation: isVisible
									? 'fadeInUp 0.6s ease-out forwards'
									: 'none',
							}}
						>
							<div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
								<Building className="w-10 h-10 text-primary-foreground" />
							</div>
							<h3 className="text-2xl font-bold mb-4 text-foreground">
								{t('homepage.features.convenientSearch.title')}
							</h3>
							<p className="text-muted-foreground leading-relaxed">
								{t('homepage.features.convenientSearch.description')}
							</p>
						</div>
						<div
							className={`text-center group transition-all duration-1000 ${
								isVisible
									? 'opacity-100 translate-y-0'
									: 'opacity-0 translate-y-8'
							}`}
							style={{
								transitionDelay: '0.5s',
								animation: isVisible
									? 'fadeInUp 0.6s ease-out forwards'
									: 'none',
							}}
						>
							<div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
								<Shield className="w-10 h-10 text-primary-foreground" />
							</div>
							<h3 className="text-2xl font-bold mb-4 text-foreground">
								{t('homepage.features.secureTransactions.title')}
							</h3>
							<p className="text-muted-foreground leading-relaxed">
								{t('homepage.features.secureTransactions.description')}
							</p>
						</div>
						<div
							className={`text-center group transition-all duration-1000 ${
								isVisible
									? 'opacity-100 translate-y-0'
									: 'opacity-0 translate-y-8'
							}`}
							style={{
								transitionDelay: '0.6s',
								animation: isVisible
									? 'fadeInUp 0.6s ease-out forwards'
									: 'none',
							}}
						>
							<div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
								<MapPin className="w-10 h-10 text-primary-foreground" />
							</div>
							<h3 className="text-2xl font-bold mb-4 text-foreground">
								{t('homepage.features.smartNavigation.title')}
							</h3>
							<p className="text-muted-foreground leading-relaxed">
								{t('homepage.features.smartNavigation.description')}
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Testimonials */}
			<section className="py-20 px-4">
				<div className="container mx-auto max-w-6xl">
					<div
						className={`text-center mb-16 transition-all duration-1000 ${
							isVisible
								? 'opacity-100 translate-y-0'
								: 'opacity-0 translate-y-8'
						}`}
						style={{ transitionDelay: '0.2s' }}
					>
						<h2 className="text-4xl font-bold text-foreground mb-4">
							{t('homepage.testimonials.title')}
						</h2>
						<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
							{t('homepage.testimonials.subtitle')}
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{(getTranslation('homepage.testimonials.reviews') as any[]).map(
							(testimonial: any, index: number) => (
								<Card
									key={index}
									className={`p-6 group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg ${
										isVisible
											? 'opacity-100 translate-y-0'
											: 'opacity-0 translate-y-8'
									}`}
									style={{
										transitionDelay: `${0.4 + index * 0.1}s`,
										animation: isVisible
											? 'fadeInUp 0.6s ease-out forwards'
											: 'none',
									}}
								>
									<div className="flex items-center gap-1 mb-4">
										{[...Array(5)].map((_, i) => (
											<Star
												key={i}
												className="w-4 h-4 fill-yellow-400 text-yellow-400"
											/>
										))}
									</div>
									<p className="text-sm mb-6 italic text-muted-foreground leading-relaxed">
										"{testimonial.text}"
									</p>
									<div className="flex items-center space-x-3">
										<div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg">
											{testimonial.name.charAt(0)}
										</div>
										<div>
											<p className="font-semibold text-sm text-foreground">
												{testimonial.name}
											</p>
											<p className="text-xs text-muted-foreground">
												{testimonial.handle}
											</p>
										</div>
									</div>
								</Card>
							)
						)}
					</div>
				</div>
			</section>

			{/* Final CTA */}
			<section className="relative py-24 px-4 text-center bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground overflow-hidden">
				{/* Background pattern */}
				<div className="absolute inset-0 opacity-10">
					<div
						className="absolute inset-0"
						style={{
							backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
						}}
					></div>
				</div>

				<div className="container mx-auto max-w-4xl relative z-10">
					<h2
						className={`text-5xl md:text-6xl font-bold mb-6 leading-tight transition-all duration-1000 ${
							isVisible
								? 'opacity-100 translate-y-0'
								: 'opacity-0 translate-y-8'
						}`}
						style={{ transitionDelay: '0.2s' }}
					>
						{t('homepage.cta.title')}
						<span className="block text-primary-foreground/90">
							{t('homepage.cta.titleHighlight')}
						</span>
					</h2>
					<p
						className={`text-xl text-primary-foreground/80 mb-12 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 ${
							isVisible
								? 'opacity-100 translate-y-0'
								: 'opacity-0 translate-y-8'
						}`}
						style={{ transitionDelay: '0.3s' }}
					>
						{t('homepage.cta.subtitle')}
					</p>
					<div
						className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 ${
							isVisible
								? 'opacity-100 translate-y-0'
								: 'opacity-0 translate-y-4'
						}`}
						style={{ transitionDelay: '0.4s' }}
					>
						<Link href="/catalog">
							<Button
								size="lg"
								variant="secondary"
								className="px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
							>
								<Building className="w-5 h-5 mr-2" />
								{t('homepage.cta.viewObjects')}
							</Button>
						</Link>
					</div>
				</div>
			</section>

			{/* Minimal Footer */}
			<footer className="bg-muted/30 py-8 px-4">
				<div className="container mx-auto max-w-6xl">
					<div className="flex justify-between items-center text-sm text-muted-foreground">
						<div className="flex items-center space-x-2">
							<div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
								<Building className="w-4 h-4 text-primary-foreground" />
							</div>
							<span className="font-semibold">
								{t('homepage.footer.company')}
							</span>
						</div>
						<p>{t('homepage.footer.copyright')}</p>
					</div>
				</div>
			</footer>
		</div>
	);
}
