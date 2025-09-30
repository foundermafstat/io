'use client';

import { useState, useEffect } from 'react';
import { Property } from '@/types/property';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { PropertyCard } from '@/components/property-card';
import { useTranslations } from '@/components/translations-context';

interface PropertyGridProps {
	properties: Property[];
	loading?: boolean;
	onPropertyClick?: (property: Property) => void;
}

// Удаляем статические лейблы, будем использовать переводы

export default function PropertyGrid({
	properties,
	loading = false,
	onPropertyClick,
}: PropertyGridProps) {
	const { t } = useTranslations();
	const [isVisible, setIsVisible] = useState(false);
	const [previousCount, setPreviousCount] = useState(0);

	// Анимация появления при изменении количества карточек
	useEffect(() => {
		if (properties.length !== previousCount) {
			setIsVisible(false);
			const timer = setTimeout(() => {
				setIsVisible(true);
				setPreviousCount(properties.length);
			}, 50);
			return () => clearTimeout(timer);
		}
	}, [properties.length, previousCount]);

	if (loading) {
		return (
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{Array.from({ length: 6 }).map((_, index) => (
					<Card key={index} className="overflow-hidden">
						<Skeleton className="h-48 w-full" />
						<CardContent className="p-4 space-y-3">
							<Skeleton className="h-5 w-3/4" />
							<Skeleton className="h-4 w-1/2" />
							<div className="flex gap-2">
								<Skeleton className="h-6 w-16" />
								<Skeleton className="h-6 w-16" />
							</div>
							<Skeleton className="h-8 w-full" />
						</CardContent>
					</Card>
				))}
			</div>
		);
	}

	if (properties.length === 0) {
		return (
			<div className="text-center py-12">
				<div className="text-gray-500 text-lg mb-4">
					{t('propertyGrid.noResults')}
				</div>
				<p className="text-gray-400">{t('propertyGrid.tryDifferentFilters')}</p>
			</div>
		);
	}

	return (
		<div
			className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500 ${
				isVisible ? 'opacity-100' : 'opacity-0'
			}`}
		>
			{properties.map((property, index) => (
				<div
					key={property.id}
					className={`transition-all duration-500 ${
						isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
					}`}
					style={{
						transitionDelay: `${index * 100}ms`,
					}}
				>
					<PropertyCard
						property={property}
						showActions={true}
						onPropertyClick={onPropertyClick}
					/>
				</div>
			))}
		</div>
	);
}
