'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Filter, X } from 'lucide-react';
import { OperationType, PropertySearchFilters } from '@/types/property';
import { usePropertyFilters } from '@/hooks/use-property-filters';
import { useTranslations } from '@/components/translations-context';

interface PropertyFiltersProps {
	onFiltersChange: (filters: PropertySearchFilters) => void;
	loading?: boolean;
}

export default function PropertyFilters({ onFiltersChange, loading = false }: PropertyFiltersProps) {
	const { t } = useTranslations();
	const { filters, updateFilters, resetFilters, getActiveFiltersCount } = usePropertyFilters();
	
	const [priceRange, setPriceRange] = useState<[number, number]>([
		filters.minPrice || 0,
		filters.maxPrice || 10000000,
	]);
	
	const [cities, setCities] = useState<string[]>([]);
	const [citiesLoading, setCitiesLoading] = useState(true);

	// Загружаем список городов
	useEffect(() => {
		const fetchCities = async () => {
			try {
				setCitiesLoading(true);
				const response = await fetch('/api/properties/cities');
				if (response.ok) {
					const data = await response.json();
					setCities(data.cities || []);
				}
			} catch (error) {
				console.error('Error fetching cities:', error);
			} finally {
				setCitiesLoading(false);
			}
		};

		fetchCities();
	}, []);

	// Обновляем родительский компонент при изменении фильтров
	useEffect(() => {
		onFiltersChange(filters);
	}, [filters, onFiltersChange]);

	// Обновляем слайдер при изменении типа операции
	useEffect(() => {
		if (filters.operationType === 'RENT') {
			const newRange: [number, number] = [filters.minPrice || 0, filters.maxPrice || 500000];
			setPriceRange(newRange);
		} else if (filters.operationType === 'SALE') {
			const newRange: [number, number] = [filters.minPrice || 1000000, filters.maxPrice || 50000000];
			setPriceRange(newRange);
		} else {
			const newRange: [number, number] = [filters.minPrice || 0, filters.maxPrice || 10000000];
			setPriceRange(newRange);
		}
	}, [filters.operationType, filters.minPrice, filters.maxPrice]);

	const handleSearchChange = (value: string) => {
		updateFilters({ query: value });
	};

	const handleOperationTypeChange = (value: string) => {
		const operationType = value === 'any' ? undefined : (value as OperationType);
		updateFilters({ operationType });
	};

	const handleCityChange = (value: string) => {
		updateFilters({ city: value });
	};

	const handlePriceRangeChange = (value: [number, number]) => {
		setPriceRange(value);
		updateFilters({
			minPrice: value[0],
			maxPrice: value[1],
		});
	};

	const clearFilters = () => {
		resetFilters();
		setPriceRange([0, 10000000]);
	};

	const formatPrice = (price: number) => {
		if (price >= 1000000) {
			return `${(price / 1000000).toFixed(1)}М ₽`;
		}
		return `${(price / 1000).toFixed(0)}К ₽`;
	};

	const getPriceRange = () => {
		if (filters.operationType === 'RENT') {
			return { min: 0, max: 500000, step: 10000 };
		} else if (filters.operationType === 'SALE') {
			return { min: 1000000, max: 50000000, step: 500000 };
		}
		return { min: 0, max: 10000000, step: 100000 };
	};

	const priceRangeConfig = getPriceRange();

	return (
		<div className="space-y-6">
			{/* Поисковая строка */}
			<div className="relative">
				<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
				<Input
					placeholder={t('propertyFilters.searchPlaceholder')}
					value={filters.query}
					onChange={(e) => handleSearchChange(e.target.value)}
					className="pl-10 h-12 text-lg"
				/>
			</div>

			{/* Фильтры */}
			<Card>
				<CardContent className="p-6">
					<div className="flex items-center justify-between mb-4">
						<div className="flex items-center gap-2">
							<Filter className="h-5 w-5" />
							<h3 className="text-lg font-semibold">
								{t('propertyFilters.title')}
								{getActiveFiltersCount() > 0 && (
									<span className="ml-2 text-sm text-primary">
										({getActiveFiltersCount()})
									</span>
								)}
							</h3>
						</div>
						<Button
							variant="outline"
							size="sm"
							onClick={clearFilters}
							disabled={loading || getActiveFiltersCount() === 0}
						>
							<X className="h-4 w-4 mr-2" />
							{t('propertyFilters.clear')}
						</Button>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
						{/* Тип операции */}
						<div className="space-y-2">
							<Label htmlFor="operation-type">{t('propertyFilters.operationType')}</Label>
							<Select
								value={filters.operationType || 'any'}
								onValueChange={handleOperationTypeChange}
								disabled={loading}
							>
								<SelectTrigger>
									<SelectValue placeholder={t('propertyFilters.selectOperationType')} />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="any">{t('propertyFilters.allTypes')}</SelectItem>
									<SelectItem value="RENT">{t('propertyFilters.rent')}</SelectItem>
									<SelectItem value="SALE">{t('propertyFilters.sale')}</SelectItem>
									<SelectItem value="BOTH">{t('propertyFilters.both')}</SelectItem>
								</SelectContent>
							</Select>
						</div>

						{/* Город */}
						<div className="space-y-2">
							<Label htmlFor="city">{t('propertyFilters.city')}</Label>
							<Select
								value={filters.city || 'any'}
								onValueChange={handleCityChange}
								disabled={loading || citiesLoading}
							>
								<SelectTrigger>
									<SelectValue placeholder={citiesLoading ? t('propertyFilters.loading') : t('propertyFilters.selectCity')} />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="any">{t('propertyFilters.allCities')}</SelectItem>
									{cities.map((city) => (
										<SelectItem key={city} value={city}>
											{city}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						{/* Диапазон цен */}
						<div className="space-y-2 lg:col-span-2">
							<Label>{t('propertyFilters.priceRange')}</Label>
							<div className="px-2">
								<Slider
									value={priceRange}
									onValueChange={handlePriceRangeChange}
									min={priceRangeConfig.min}
									max={priceRangeConfig.max}
									step={priceRangeConfig.step}
									className="w-full"
									disabled={loading}
								/>
								<div className="flex justify-between text-sm text-gray-600 mt-2">
									<span>{t('propertyFilters.from')}: {formatPrice(priceRange[0])}</span>
									<span>{t('propertyFilters.to')}: {formatPrice(priceRange[1])}</span>
								</div>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
