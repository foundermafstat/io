'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import {
	Property,
	PropertySearchFilters,
	OperationType,
} from '@/types/property';
import PropertyFilters from '@/components/property-filters';
import PropertyGrid from '@/components/property-grid';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { RefreshCw, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslations } from '@/components/translations-context';

interface PropertySearchResult {
	properties: Property[];
	totalCount: number;
	page: number;
	limit: number;
	hasMore: boolean;
	filters: PropertySearchFilters;
}

export default function PropertiesPage() {
	const { t } = useTranslations();
	const searchParams = useSearchParams();
	const [properties, setProperties] = useState<Property[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [totalCount, setTotalCount] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [hasMore, setHasMore] = useState(false);
	const [isInitialLoad, setIsInitialLoad] = useState(true);

	// Функция для загрузки объектов
	const fetchProperties = useCallback(
		async (
			filters: PropertySearchFilters,
			page: number = 1,
			append: boolean = false
		) => {
			try {
				setLoading(true);
				setError(null);

				// Создаем URL с параметрами
				const params = new URLSearchParams();

				if (filters.query) params.set('query', filters.query);
				if (filters.operationType)
					params.set('operationType', filters.operationType);
				if (filters.city) params.set('city', filters.city);
				if (filters.minPrice)
					params.set('minPrice', filters.minPrice.toString());
				if (filters.maxPrice)
					params.set('maxPrice', filters.maxPrice.toString());

				params.set('page', page.toString());
				params.set('limit', '20');

				const response = await fetch(`/api/properties?${params.toString()}`);

				if (!response.ok) {
					throw new Error(`Ошибка загрузки: ${response.status}`);
				}

				const data: PropertySearchResult = await response.json();

				if (append) {
					setProperties((prev) => [...prev, ...data.properties]);
				} else {
					setProperties(data.properties);
				}

				setTotalCount(data.totalCount);
				setCurrentPage(data.page);
				setHasMore(data.hasMore);
			} catch (err) {
				const errorMessage =
					err instanceof Error ? err.message : t('properties.errorLoading');
				setError(errorMessage);
				toast.error(errorMessage);
				console.error('Error fetching properties:', err);
			} finally {
				setLoading(false);
				if (isInitialLoad) {
					setIsInitialLoad(false);
				}
			}
		},
		[t]
	);

	// Обработчик изменения фильтров
	const handleFiltersChange = useCallback(
		(filters: PropertySearchFilters) => {
			setCurrentPage(1);
			fetchProperties(filters, 1, false);
		},
		[fetchProperties]
	);

	// Загрузка дополнительных объектов
	const loadMore = useCallback(() => {
		if (!loading && hasMore) {
			const currentFilters: PropertySearchFilters = {
				query: searchParams.get('query') || undefined,
				operationType:
					(searchParams.get('operationType') as OperationType) || undefined,
				city: searchParams.get('city') || undefined,
				minPrice: searchParams.get('minPrice')
					? Number(searchParams.get('minPrice'))
					: undefined,
				maxPrice: searchParams.get('maxPrice')
					? Number(searchParams.get('maxPrice'))
					: undefined,
			};

			fetchProperties(currentFilters, currentPage + 1, true);
		}
	}, [loading, hasMore, currentPage, searchParams, fetchProperties]);

	// Обновление данных
	const refreshData = useCallback(() => {
		const currentFilters: PropertySearchFilters = {
			query: searchParams.get('query') || undefined,
			operationType:
				(searchParams.get('operationType') as OperationType) || undefined,
			city: searchParams.get('city') || undefined,
			minPrice: searchParams.get('minPrice')
				? Number(searchParams.get('minPrice'))
				: undefined,
			maxPrice: searchParams.get('maxPrice')
				? Number(searchParams.get('maxPrice'))
				: undefined,
		};

		fetchProperties(currentFilters, 1, false);
	}, [searchParams, fetchProperties]);

	// Загрузка при монтировании компонента
	useEffect(() => {
		const initialFilters: PropertySearchFilters = {
			query: searchParams.get('query') || undefined,
			operationType:
				(searchParams.get('operationType') as OperationType) || undefined,
			city: searchParams.get('city') || undefined,
			minPrice: searchParams.get('minPrice')
				? Number(searchParams.get('minPrice'))
				: undefined,
			maxPrice: searchParams.get('maxPrice')
				? Number(searchParams.get('maxPrice'))
				: undefined,
		};

		fetchProperties(initialFilters, 1, false);
	}, [searchParams, fetchProperties]);

	return (
		<div className="container mx-auto px-4 py-8">
			{/* Заголовок */}
			<div
				className={`mb-8 transition-all duration-700 ${
					isInitialLoad
						? 'opacity-0 translate-y-4'
						: 'opacity-100 translate-y-0'
				}`}
			>
				<h1 className="text-3xl font-bold mb-2">{t('properties.title')}</h1>
				<p className="text-gray-600">
					{loading
						? t('properties.loading')
						: t('properties.foundCount', {
								count: totalCount.toLocaleString(),
						  })}
				</p>
			</div>

			{/* Фильтры */}
			<div
				className={`transition-all duration-700 delay-200 ${
					isInitialLoad
						? 'opacity-0 translate-y-4'
						: 'opacity-100 translate-y-0'
				}`}
			>
				<PropertyFilters
					onFiltersChange={handleFiltersChange}
					loading={loading}
				/>
			</div>

			{/* Результаты */}
			<div
				className={`mt-8 transition-all duration-700 delay-300 ${
					isInitialLoad
						? 'opacity-0 translate-y-4'
						: 'opacity-100 translate-y-0'
				}`}
			>
				{error ? (
					<Card className="border-red-200 bg-red-50">
						<CardContent className="p-6 text-center">
							<AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
							<h3 className="text-lg font-semibold text-red-800 mb-2">
								{t('properties.errorTitle')}
							</h3>
							<p className="text-red-600 mb-4">{error}</p>
							<Button onClick={refreshData} variant="outline">
								<RefreshCw className="h-4 w-4 mr-2" />
								{t('properties.tryAgain')}
							</Button>
						</CardContent>
					</Card>
				) : (
					<>
						<PropertyGrid properties={properties} loading={loading} />

						{/* Кнопка "Загрузить еще" */}
						{hasMore && !loading && (
							<div className="text-center mt-8 animate-in fade-in-50 duration-500">
								<Button onClick={loadMore} size="lg">
									{t('properties.loadMore')}
								</Button>
							</div>
						)}

						{/* Индикатор загрузки для "Загрузить еще" */}
						{loading && properties.length > 0 && (
							<div className="text-center mt-8 animate-in fade-in-50 duration-300">
								<div className="flex items-center justify-center gap-2">
									<RefreshCw className="h-4 w-4 animate-spin" />
									<span>{t('properties.loading')}</span>
								</div>
							</div>
						)}
					</>
				)}
			</div>
		</div>
	);
}
