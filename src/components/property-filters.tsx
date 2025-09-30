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

interface PropertyFiltersProps {
	onFiltersChange: (filters: PropertySearchFilters) => void;
	loading?: boolean;
}

const OPERATION_OPTIONS = [
	{ value: 'RENT', label: 'Аренда' },
	{ value: 'SALE', label: 'Продажа' },
	{ value: 'BOTH', label: 'Аренда и продажа' },
];

// Список городов будет загружаться из API

export default function PropertyFilters({ onFiltersChange, loading = false }: PropertyFiltersProps) {
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
			setPriceRange([0, 500000]);
		} else if (filters.operationType === 'SALE') {
			setPriceRange([1000000, 50000000]);
		} else {
			setPriceRange([0, 10000000]);
		}
	}, [filters.operationType]);

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
					placeholder="Поиск недвижимости..."
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
								Фильтры
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
							Очистить
						</Button>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
						{/* Тип операции */}
						<div className="space-y-2">
							<Label htmlFor="operation-type">Тип операции</Label>
							<Select
								value={filters.operationType || 'any'}
								onValueChange={handleOperationTypeChange}
								disabled={loading}
							>
								<SelectTrigger>
									<SelectValue placeholder="Выберите тип" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="any">Все типы</SelectItem>
									{OPERATION_OPTIONS.map((option) => (
										<SelectItem key={option.value} value={option.value}>
											{option.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						{/* Город */}
						<div className="space-y-2">
							<Label htmlFor="city">Город</Label>
							<Select
								value={filters.city || 'any'}
								onValueChange={handleCityChange}
								disabled={loading || citiesLoading}
							>
								<SelectTrigger>
									<SelectValue placeholder={citiesLoading ? "Загрузка..." : "Выберите город"} />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="any">Все города</SelectItem>
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
							<Label>Диапазон цен</Label>
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
									<span>{formatPrice(priceRange[0])}</span>
									<span>{formatPrice(priceRange[1])}</span>
								</div>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
