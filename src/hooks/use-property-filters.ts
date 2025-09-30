'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PropertySearchFilters, OperationType } from '@/types/property';

export function usePropertyFilters() {
	const router = useRouter();
	const searchParams = useSearchParams();
	
	const [filters, setFilters] = useState<PropertySearchFilters>(() => ({
		query: searchParams.get('query') || '',
		operationType: (searchParams.get('operationType') as OperationType) || undefined,
		city: searchParams.get('city') || '',
		minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
		maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
	}));

	// Обновляем URL при изменении фильтров
	const updateFilters = useCallback((newFilters: Partial<PropertySearchFilters>) => {
		const updatedFilters = { ...filters, ...newFilters };
		setFilters(updatedFilters);

		// Обновляем URL
		const params = new URLSearchParams();
		
		Object.entries(updatedFilters).forEach(([key, value]) => {
			if (value !== undefined && value !== '') {
				if (Array.isArray(value)) {
					params.set(key, value.join(','));
				} else {
					params.set(key, value.toString());
				}
			}
		});

		const newUrl = `${window.location.pathname}?${params.toString()}`;
		router.replace(newUrl, { scroll: false });
	}, [filters, router]);

	// Сброс фильтров
	const resetFilters = useCallback(() => {
		const emptyFilters: PropertySearchFilters = {
			query: '',
			operationType: undefined,
			city: '',
			minPrice: undefined,
			maxPrice: undefined,
		};
		setFilters(emptyFilters);
		
		// Очищаем URL
		router.replace(window.location.pathname, { scroll: false });
	}, [router]);

	// Получение активных фильтров
	const getActiveFiltersCount = useCallback(() => {
		let count = 0;
		if (filters.query) count++;
		if (filters.operationType) count++;
		if (filters.city) count++;
		if (filters.minPrice !== undefined) count++;
		if (filters.maxPrice !== undefined) count++;
		return count;
	}, [filters]);

	return {
		filters,
		updateFilters,
		resetFilters,
		getActiveFiltersCount,
	};
}
