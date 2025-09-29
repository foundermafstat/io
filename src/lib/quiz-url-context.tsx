'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export interface QuizStep {
	id: string;
	title: string;
	description: string;
	completed: boolean;
	current: boolean;
}

export interface QuizState {
	steps: QuizStep[];
	currentStepIndex: number;
	userPreferences: {
		purpose: 'rent' | 'buy' | null;
		budget: { min: number; max: number } | null;
		propertyType: string[];
		location: string | null;
		features: string[];
	};
	selectedProperty: string | null;
	// Фильтры для отображения объектов
	filters: {
		city: string | null;
		operationType: 'rent' | 'sale' | 'both' | null;
		propertyTypes: string[];
	};
}

const initialSteps: QuizStep[] = [
	{
		id: 'intro',
		title: 'Welcome',
		description: 'Let\'s find your perfect property',
		completed: false,
		current: true,
	},
	{
		id: 'purpose',
		title: 'Purpose',
		description: 'Rent or Buy?',
		completed: false,
		current: false,
	},
	{
		id: 'budget',
		title: 'Budget',
		description: 'Set your price range',
		completed: false,
		current: false,
	},
	{
		id: 'type',
		title: 'Property Type',
		description: 'Apartment, House, etc.',
		completed: false,
		current: false,
	},
	{
		id: 'location',
		title: 'Location',
		description: 'Where do you want to live?',
		completed: false,
		current: false,
	},
	{
		id: 'features',
		title: 'Features',
		description: 'Must-have amenities',
		completed: false,
		current: false,
	},
	{
		id: 'result',
		title: 'Results',
		description: 'Your personalized matches',
		completed: false,
		current: false,
	},
];

interface QuizUrlContextType {
	state: QuizState;
	updateUrl: (updates: Partial<QuizState['userPreferences'] | { step?: number; selectedProperty?: string | null }>) => void;
	nextStep: () => void;
	prevStep: () => void;
	setStep: (index: number) => void;
	completeStep: (index: number) => void;
	updatePreferences: (preferences: Partial<QuizState['userPreferences']>, step?: number) => void;
	selectProperty: (propertyId: string | null) => void;
	resetQuiz: () => void;
	updateFilters: (filters: Partial<QuizState['filters']>) => void;
}

const QuizUrlContext = createContext<QuizUrlContextType | undefined>(undefined);

export function QuizUrlProvider({ children }: { children: ReactNode }) {
	const router = useRouter();
	const searchParams = useSearchParams();
	
	const [state, setState] = useState<QuizState>({
		steps: initialSteps,
		currentStepIndex: 0,
		userPreferences: {
			purpose: null,
			budget: null,
			propertyType: [],
			location: null,
			features: [],
		},
		selectedProperty: null,
		filters: {
			city: null,
			operationType: null,
			propertyTypes: [],
		},
	});

	// Инициализация состояния из URL параметров
	useEffect(() => {
		const step = searchParams.get('step');
		const purpose = searchParams.get('purpose') as 'rent' | 'buy' | null;
		const city = searchParams.get('city');
		const operationType = searchParams.get('operationType') as 'rent' | 'sale' | 'both' | null;
		const propertyTypes = searchParams.get('propertyTypes')?.split(',') || [];
		const selectedProperty = searchParams.get('selectedProperty');
		const minBudget = searchParams.get('minBudget');
		const maxBudget = searchParams.get('maxBudget');
		const location = searchParams.get('location');
		const features = searchParams.get('features')?.split(',') || [];

		const currentStepIndex = step ? parseInt(step, 10) : 0;
		
		setState(prevState => ({
			...prevState,
			currentStepIndex,
			userPreferences: {
				purpose,
				budget: minBudget && maxBudget ? { min: parseInt(minBudget, 10), max: parseInt(maxBudget, 10) } : null,
				propertyType: propertyTypes,
				location,
				features,
			},
			selectedProperty,
			filters: {
				city,
				operationType,
				propertyTypes,
			},
			steps: initialSteps.map((step, index) => ({
				...step,
				current: index === currentStepIndex,
				completed: index < currentStepIndex,
			})),
		}));
	}, [searchParams]);

	const updateUrl = (updates: Partial<QuizState['userPreferences'] | { step?: number; selectedProperty?: string | null }>) => {
		const params = new URLSearchParams(searchParams.toString());
		
		// Обновляем параметры на основе переданных данных
		if (updates.step !== undefined) {
			params.set('step', updates.step.toString());
		}
		
		if (updates.purpose !== undefined) {
			if (updates.purpose) {
				params.set('purpose', updates.purpose);
			} else {
				params.delete('purpose');
			}
		}
		
		if (updates.location !== undefined) {
			if (updates.location) {
				params.set('location', updates.location);
			} else {
				params.delete('location');
			}
		}
		
		if (updates.propertyType !== undefined) {
			if (updates.propertyType.length > 0) {
				params.set('propertyTypes', updates.propertyType.join(','));
			} else {
				params.delete('propertyTypes');
			}
		}
		
		if (updates.features !== undefined) {
			if (updates.features.length > 0) {
				params.set('features', updates.features.join(','));
			} else {
				params.delete('features');
			}
		}
		
		if (updates.budget !== undefined) {
			if (updates.budget) {
				params.set('minBudget', updates.budget.min.toString());
				params.set('maxBudget', updates.budget.max.toString());
			} else {
				params.delete('minBudget');
				params.delete('maxBudget');
			}
		}
		
		if (updates.selectedProperty !== undefined) {
			if (updates.selectedProperty) {
				params.set('selectedProperty', updates.selectedProperty);
			} else {
				params.delete('selectedProperty');
			}
		}

		// Обновляем URL без перезагрузки страницы
		router.replace(`/quiz?${params.toString()}`, { scroll: false });
	};

	const nextStep = () => {
		const nextIndex = Math.min(state.currentStepIndex + 1, state.steps.length - 1);
		// Обновляем только step, сохраняя все остальные параметры
		const params = new URLSearchParams(searchParams.toString());
		params.set('step', nextIndex.toString());
		router.replace(`/quiz?${params.toString()}`, { scroll: false });
	};

	const prevStep = () => {
		const prevIndex = Math.max(state.currentStepIndex - 1, 0);
		// Обновляем только step, сохраняя все остальные параметры
		const params = new URLSearchParams(searchParams.toString());
		params.set('step', prevIndex.toString());
		router.replace(`/quiz?${params.toString()}`, { scroll: false });
	};

	const setStep = (index: number) => {
		// Обновляем только step, сохраняя все остальные параметры
		const params = new URLSearchParams(searchParams.toString());
		params.set('step', index.toString());
		router.replace(`/quiz?${params.toString()}`, { scroll: false });
	};

	const completeStep = (index: number) => {
		setState(prevState => ({
			...prevState,
			steps: prevState.steps.map((step, stepIndex) =>
				stepIndex === index ? { ...step, completed: true } : step
			),
		}));
	};

	const updatePreferences = (preferences: Partial<QuizState['userPreferences']>, step?: number) => {
		updateUrl({ ...preferences, step });
	};

	const selectProperty = (propertyId: string | null) => {
		updateUrl({ selectedProperty: propertyId });
	};

	const resetQuiz = () => {
		router.replace('/quiz', { scroll: false });
	};

	const updateFilters = (filters: Partial<QuizState['filters']>) => {
		const params = new URLSearchParams(searchParams.toString());
		
		if (filters.city !== undefined) {
			if (filters.city) {
				params.set('city', filters.city);
			} else {
				params.delete('city');
			}
		}
		
		if (filters.operationType !== undefined) {
			if (filters.operationType) {
				params.set('operationType', filters.operationType);
			} else {
				params.delete('operationType');
			}
		}
		
		if (filters.propertyTypes !== undefined) {
			if (filters.propertyTypes.length > 0) {
				params.set('propertyTypes', filters.propertyTypes.join(','));
			} else {
				params.delete('propertyTypes');
			}
		}

		router.replace(`/quiz?${params.toString()}`, { scroll: false });
	};

	return (
		<QuizUrlContext.Provider
			value={{
				state,
				updateUrl,
				nextStep,
				prevStep,
				setStep,
				completeStep,
				updatePreferences,
				selectProperty,
				resetQuiz,
				updateFilters,
			}}
		>
			{children}
		</QuizUrlContext.Provider>
	);
}

export function useQuizUrl() {
	const context = useContext(QuizUrlContext);
	if (context === undefined) {
		throw new Error('useQuizUrl must be used within a QuizUrlProvider');
	}
	return context;
}
