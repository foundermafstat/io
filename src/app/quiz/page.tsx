'use client';

import React from 'react';
import { QuizUrlProvider, useQuizUrl } from '@/lib/quiz-url-context';
import { QuizProgressBadges } from '@/components/quiz-progress-badges';
import { QuizPropertyGrid } from '@/components/quiz-property-grid';
import VoiceChatInterface from '@/components/voice-chat-interface';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, Home, RotateCcw } from 'lucide-react';
import { Property } from '@/types/property';
import { useDynamicFilters } from '@/hooks/use-dynamic-filters';
import { useTranslations } from '@/components/translations-context';
import { TranslationsProvider } from '@/components/translations-context';


// Step content components (defined outside QuizContent for proper exports)
function IntroStep() {
	const { t, getTranslation } = useTranslations();
	
	return (
		<div className="w-full max-w-3xl mx-auto">
			<Card className="w-full">
				<CardHeader className="text-center pb-4">
					<CardTitle className="text-xl">{t('quiz.intro.title')}</CardTitle>
					<CardDescription>
						{t('quiz.intro.subtitle')}
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
						<Card className="p-3 border-2 border-dashed">
							<h3 className="font-semibold mb-2 text-sm">{t('quiz.intro.discover.title')}</h3>
							<ul className="text-xs space-y-1">
								{getTranslation('quiz.intro.discover.items').map((item: string, index: number) => (
									<li key={index}>• {item}</li>
								))}
							</ul>
						</Card>
						<Card className="p-3 border-2 border-dashed">
							<h3 className="font-semibold mb-2 text-sm">{t('quiz.intro.aiPowered.title')}</h3>
							<ul className="text-xs space-y-1">
								{(getTranslation('quiz.intro.aiPowered.items') as string[]).map((item: string, index: number) => (
									<li key={index}>• {item}</li>
								))}
							</ul>
						</Card>
					</div>
					<div className="text-center">
						<p className="text-muted-foreground text-sm">
							{t('quiz.intro.ready')}
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

function PurposeStep({ onChoice }: { onChoice: (purpose: 'rent' | 'buy') => void }) {
	const { t } = useTranslations();
	
	return (
		<div className="w-full max-w-2xl mx-auto">
			<Card className="w-full">
				<CardHeader className="text-center pb-4">
					<CardTitle className="text-xl">{t('quiz.steps.purpose.title')}</CardTitle>
					<CardDescription>
						{t('quiz.steps.purpose.subtitle')}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
						<Card
							className="p-4 cursor-pointer hover:border-primary transition-colors"
							onClick={() => onChoice('rent')}
						>
							<div className="text-center space-y-2">
								<h3 className="text-lg font-semibold">{t('quiz.steps.purpose.rent.title')}</h3>
								<p className="text-xs text-muted-foreground">
									{t('quiz.steps.purpose.rent.description')}
								</p>
							</div>
						</Card>
						<Card
							className="p-4 cursor-pointer hover:border-primary transition-colors"
							onClick={() => onChoice('buy')}
						>
							<div className="text-center space-y-2">
								<h3 className="text-lg font-semibold">{t('quiz.steps.purpose.buy.title')}</h3>
								<p className="text-xs text-muted-foreground">
									{t('quiz.steps.purpose.buy.description')}
								</p>
							</div>
						</Card>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

function BudgetStep({ onBudgetSelect, budgetRanges }: { 
	onBudgetSelect: (min: number, max: number) => void;
	budgetRanges: Array<{ label: string; min: number; max: number; count: number }>;
}) {
	const { t } = useTranslations();
	
	return (
		<div className="w-full max-w-3xl mx-auto">
			<Card className="w-full">
				<CardHeader className="text-center pb-4">
					<CardTitle className="text-xl">{t('quiz.steps.budget.title')}</CardTitle>
					<CardDescription>
						{t('quiz.steps.budget.subtitle')}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-2 md:grid-cols-3 gap-2">
						{budgetRanges.map((budget) => (
							<Button
								key={budget.label}
								variant="outline"
								size="sm"
								className="p-3 h-auto flex-col gap-1"
								onClick={() => onBudgetSelect(budget.min, budget.max)}
							>
								<span className="font-semibold text-xs">{budget.label}</span>
								<span className="text-xs text-muted-foreground">({budget.count})</span>
							</Button>
						))}
						<Button
							variant="outline"
							size="sm"
							className="p-3 h-auto flex-col gap-1"
							onClick={() => onBudgetSelect(0, 0)}
						>
							<span className="font-semibold text-xs">{t('quiz.steps.budget.custom')}</span>
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

function PropertyTypeStep({ onTypeSelect, selectedTypes, propertyTypes }: {
	onTypeSelect: (typeId: string) => void;
	selectedTypes: string[];
	propertyTypes: Array<{ id: string; label: string; icon: string; count: number }>;
}) {
	const { t } = useTranslations();
	
	return (
		<Card className="w-full max-w-3xl mx-auto">
			<CardHeader className="text-center">
				<CardTitle className="text-2xl">{t('quiz.steps.propertyType.title')}</CardTitle>
				<CardDescription>
					{t('quiz.steps.propertyType.subtitle')}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-2 md:grid-cols-3 gap-3">
					{propertyTypes.map((type) => {
						const isSelected = selectedTypes.includes(type.id);
						return (
							<Button
								key={type.id}
								variant={isSelected ? "default" : "outline"}
								className="p-4 h-auto flex-col gap-2"
								onClick={() => onTypeSelect(type.id)}
							>
								<span className="text-2xl">{type.icon}</span>
								<span className="font-medium">{type.label}</span>
								<span className="text-xs text-muted-foreground">({type.count})</span>
							</Button>
						);
					})}
				</div>
				{selectedTypes.length > 0 && (
					<div className="mt-4 text-center">
						<p className="text-sm text-muted-foreground">
							{t('quiz.steps.propertyType.selected')} {selectedTypes.join(', ')}
						</p>
					</div>
				)}
			</CardContent>
		</Card>
	);
}

function LocationStep({ onLocationSelect, locations }: { 
	onLocationSelect: (location: string) => void;
	locations: Array<{ value: string; label: string; count: number }>;
}) {
	const { t } = useTranslations();
	
	return (
		<div className="w-full max-w-3xl mx-auto">
			<Card className="w-full">
				<CardHeader className="text-center pb-4">
					<CardTitle className="text-xl">{t('quiz.steps.location.title')}</CardTitle>
					<CardDescription>
						{t('quiz.steps.location.subtitle')}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-2">
						{locations.map((location) => (
							<Button
								key={location.value}
								variant="outline"
								size="sm"
								className="p-2 h-auto text-xs flex flex-col gap-1"
								onClick={() => onLocationSelect(location.value)}
							>
								<span>{location.label}</span>
								<span className="text-muted-foreground">({location.count})</span>
							</Button>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

function FeaturesStep({ onFeatureSelect, selectedFeatures, features }: {
	onFeatureSelect: (featureId: string) => void;
	selectedFeatures: string[];
	features: Array<{ id: string; label: string; icon: string; count: number }>;
}) {
	const { t } = useTranslations();
	
	return (
		<div className="w-full max-w-3xl mx-auto">
			<Card className="w-full">
				<CardHeader className="text-center pb-4">
					<CardTitle className="text-xl">{t('quiz.steps.features.title')}</CardTitle>
					<CardDescription>
						{t('quiz.steps.features.subtitle')}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-2">
						{features.map((feature) => {
							const isSelected = selectedFeatures.includes(feature.id);
							return (
								<Button
									key={feature.id}
									variant={isSelected ? "default" : "outline"}
									size="sm"
									className="p-2 h-auto flex-col gap-1"
									onClick={() => onFeatureSelect(feature.id)}
								>
									<span className="text-lg">{feature.icon}</span>
									<span className="text-xs">{feature.label}</span>
									<span className="text-xs text-muted-foreground">({feature.count})</span>
								</Button>
							);
						})}
					</div>
					{selectedFeatures.length > 0 && (
						<div className="mt-3 flex flex-wrap gap-1 justify-center">
							{selectedFeatures.map((featureId) => {
								const feature = features.find(f => f.id === featureId);
								return (
									<Badge key={featureId} variant="secondary" className="text-xs">
										{feature?.label}
									</Badge>
								);
							})}
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}

function ResultsStep({ preferences, purpose, onReset }: {
	preferences: any;
	purpose: string;
	onReset: () => void;
}) {
	const { t } = useTranslations();
	
	return (
		<div className="w-full max-w-3xl mx-auto">
			<Card className="w-full">
				<CardHeader className="text-center pb-4">
					<CardTitle className="text-xl">{t('quiz.steps.results.title')}</CardTitle>
					<CardDescription>
						{t('quiz.steps.results.subtitle')}
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
						<div className="space-y-1">
							<h3 className="font-semibold text-sm">{t('quiz.steps.results.purpose')}</h3>
							<Badge variant="outline" className="text-sm p-1">
								{purpose.charAt(0).toUpperCase() + purpose.slice(1)}
							</Badge>
						</div>
						<div className="space-y-1">
							<h3 className="font-semibold text-sm">{t('quiz.steps.results.budget')}</h3>
							<Badge variant="outline" className="text-sm p-1">
								{preferences.budget ? `€${preferences.budget.min}-€${preferences.budget.max}` : t('quiz.steps.results.notSpecified')}
							</Badge>
						</div>
						<div className="space-y-1">
							<h3 className="font-semibold text-sm">{t('quiz.steps.results.propertyTypes')}</h3>
							<div className="flex flex-wrap gap-1">
								{preferences.propertyType?.map((type: string) => (
									<Badge key={type} variant="secondary" className="text-xs">
										{type}
									</Badge>
								)) || <Badge variant="outline" className="text-xs">{t('quiz.steps.results.notSpecified')}</Badge>}
							</div>
						</div>
						<div className="space-y-1">
							<h3 className="font-semibold text-sm">{t('quiz.steps.results.location')}</h3>
							<Badge variant="outline" className="text-sm p-1">
								{preferences.location || t('quiz.steps.results.notSpecified')}
							</Badge>
						</div>
					</div>

					<div className="space-y-1">
						<h3 className="font-semibold text-sm">{t('quiz.steps.results.features')}</h3>
						<div className="flex flex-wrap gap-1">
							{preferences.features?.map((feature: string) => (
								<Badge key={feature} variant="secondary" className="text-xs">
									{feature.replace('_', ' ')}
								</Badge>
							)) || <Badge variant="outline" className="text-xs">{t('quiz.steps.results.noFeatures')}</Badge>}
						</div>
					</div>

					<div className="bg-muted p-3 rounded-lg">
						<p className="text-center text-muted-foreground text-sm">
							{t('quiz.steps.results.searchMessage')}
						</p>
					</div>

					<div className="flex gap-2 justify-center">
						<Button onClick={onReset} variant="outline" size="sm">
							<RotateCcw className="w-4 h-4 mr-1" />
							{t('quiz.steps.results.startOver')}
						</Button>
						<Button size="sm">
							{t('quiz.steps.results.searchProperties')}
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

// Step content wrapper components
function IntroStepWrapper() {
	return <IntroStep />;
}

function PurposeStepWrapper() {
	const { state, updatePreferences, nextStep, updateFilters } = useQuizUrl();

	const handleChoice = (purpose: 'rent' | 'buy') => {
		// Обновляем предпочтения пользователя и переходим к следующему шагу одновременно
		const nextStepIndex = state.currentStepIndex + 1;
		updatePreferences({ purpose }, nextStepIndex);
		// Обновляем фильтры для отображения объектов
		updateFilters({ operationType: purpose === 'buy' ? 'sale' : purpose });
	};

	return <PurposeStep onChoice={handleChoice} />;
}

function BudgetStepWrapper({ budgetRanges }: { budgetRanges: Array<{ label: string; min: number; max: number; count: number }> }) {
	const { state, updatePreferences, nextStep } = useQuizUrl();

	const handleBudgetSelect = (min: number, max: number) => {
		// Обновляем предпочтения пользователя и переходим к следующему шагу одновременно
		const nextStepIndex = state.currentStepIndex + 1;
		updatePreferences({ budget: { min, max } }, nextStepIndex);
	};

	return <BudgetStep onBudgetSelect={handleBudgetSelect} budgetRanges={budgetRanges} />;
}

function PropertyTypeStepWrapper({ propertyTypes }: { propertyTypes: Array<{ id: string; label: string; icon: string; count: number }> }) {
	const { state, updatePreferences, nextStep, updateFilters } = useQuizUrl();

	const handleTypeSelect = (typeId: string) => {
		const currentTypes = state.userPreferences.propertyType || [];
		const newTypes = currentTypes.includes(typeId)
			? currentTypes.filter(t => t !== typeId)
			: [...currentTypes, typeId];

		// Обновляем предпочтения пользователя (это автоматически обновит URL)
		updatePreferences({ propertyType: newTypes });
		// Обновляем фильтры для отображения объектов
		updateFilters({ propertyTypes: newTypes });

		// Переходим к следующему шагу только если выбраны типы
		if (newTypes.length > 0) {
			setTimeout(() => nextStep(), 300);
		}
	};

	const selectedTypes = state.userPreferences.propertyType || [];

	return <PropertyTypeStep onTypeSelect={handleTypeSelect} selectedTypes={selectedTypes} propertyTypes={propertyTypes} />;
}

function LocationStepWrapper({ locations }: { locations: Array<{ value: string; label: string; count: number }> }) {
	const { state, updatePreferences, nextStep, updateFilters } = useQuizUrl();

	const handleLocationSelect = (location: string) => {
		// Обновляем предпочтения пользователя и переходим к следующему шагу одновременно
		const nextStepIndex = state.currentStepIndex + 1;
		updatePreferences({ location }, nextStepIndex);
		// Обновляем фильтры для отображения объектов
		updateFilters({ city: location });
	};

	return <LocationStep onLocationSelect={handleLocationSelect} locations={locations} />;
}

function FeaturesStepWrapper({ features }: { features: Array<{ id: string; label: string; icon: string; count: number }> }) {
	const { state, updatePreferences, nextStep } = useQuizUrl();

	const handleFeatureSelect = (featureId: string) => {
		const currentFeatures = state.userPreferences.features || [];
		const newFeatures = currentFeatures.includes(featureId)
			? currentFeatures.filter(f => f !== featureId)
			: [...currentFeatures, featureId];

		// Обновляем предпочтения пользователя (это автоматически обновит URL)
		updatePreferences({ features: newFeatures });
		
		// Переходим к следующему шагу после выбора особенностей
		setTimeout(() => nextStep(), 300);
	};

	const selectedFeatures = state.userPreferences.features || [];

	return <FeaturesStep onFeatureSelect={handleFeatureSelect} selectedFeatures={selectedFeatures} features={features} />;
}

function ResultsStepWrapper() {
	const { state, resetQuiz } = useQuizUrl();

	const preferences = state.userPreferences;
	const purpose = preferences.purpose === 'rent' ? 'renting' : 'buying';

	return <ResultsStep preferences={preferences} purpose={purpose} onReset={resetQuiz} />;
}

// Main quiz content component
function QuizContent() {
	const { state, nextStep, prevStep, setStep, completeStep, updatePreferences, selectProperty, resetQuiz, updateFilters } = useQuizUrl();
	const { t } = useTranslations();
	const [properties, setProperties] = React.useState<Property[]>([]);
	const [loading, setLoading] = React.useState(false);

	const currentStepIndex = state.currentStepIndex;
	
	// Получаем динамические фильтры на основе текущих объектов
	const { dynamicFilters } = useDynamicFilters(properties);

	// Функция для загрузки недвижимости - по умолчанию ВСЕ объекты
	const loadProperties = React.useCallback(async () => {
		setLoading(true);
		try {
			// Создаем фильтры - по умолчанию только статус AVAILABLE
			const filters: any = {
				status: 'AVAILABLE'
			};

			// Добавляем фильтры из URL только если они есть
			if (state.filters.city) {
				filters.city = state.filters.city;
			}
			
			if (state.filters.operationType && state.filters.operationType !== 'both') {
				filters.operationType = state.filters.operationType.toUpperCase();
			}
			
			if (state.filters.propertyTypes.length > 0) {
				filters.propertyTypes = state.filters.propertyTypes;
			}

			// Добавляем фильтры из предпочтений пользователя только если они есть
			if (state.userPreferences.purpose) {
				filters.operationType = state.userPreferences.purpose.toUpperCase();
			}
			
			if (state.userPreferences.location) {
				filters.city = state.userPreferences.location;
			}
			
			if (state.userPreferences.propertyType.length > 0) {
				filters.propertyTypes = state.userPreferences.propertyType;
			}

			// Если есть бюджет, добавляем его
			if (state.userPreferences.budget) {
				if (state.userPreferences.purpose === 'rent') {
					filters.minRentPrice = state.userPreferences.budget.min;
					filters.maxRentPrice = state.userPreferences.budget.max;
				} else {
					filters.minSalePrice = state.userPreferences.budget.min;
					filters.maxSalePrice = state.userPreferences.budget.max;
				}
			}

			// Создаем URL с параметрами для GET запроса
			const searchParams = new URLSearchParams();
			
			// Добавляем только определенные фильтры
			if (filters.city) searchParams.set('city', filters.city);
			if (filters.operationType) searchParams.set('operationType', filters.operationType);
			if (filters.propertyTypes && filters.propertyTypes.length > 0) {
				searchParams.set('propertyTypes', filters.propertyTypes.join(','));
			}
			if (filters.minRentPrice) searchParams.set('minPrice', filters.minRentPrice.toString());
			if (filters.maxRentPrice) searchParams.set('maxPrice', filters.maxRentPrice.toString());
			if (filters.minSalePrice) searchParams.set('minPrice', filters.minSalePrice.toString());
			if (filters.maxSalePrice) searchParams.set('maxPrice', filters.maxSalePrice.toString());
			
			// Увеличиваем лимит для отображения большего количества объектов
			searchParams.set('limit', '100');

			const url = `/api/properties?${searchParams.toString()}`;
			console.log('Fetching properties from:', url);
			
			const response = await fetch(url);

			// Проверяем статус ответа
			if (!response.ok) {
				console.error('API response not OK:', response.status, response.statusText);
				setProperties([]);
				return;
			}

			// Проверяем, что ответ не пустой
			const text = await response.text();
			if (!text) {
				console.warn('Empty response from API');
				setProperties([]);
				return;
			}

			let data;
			try {
				data = JSON.parse(text);
				console.log('Parsed API response:', data);
			} catch (parseError) {
				console.error('Failed to parse JSON response:', parseError);
				console.error('Response text:', text);
				setProperties([]);
				return;
			}
			
			if (data.properties) {
				console.log('Properties loaded:', data.properties.length);
				setProperties(data.properties || []);
			} else {
				console.error('No properties in response:', data);
				setProperties([]);
			}
		} catch (error) {
			console.error('Error loading properties:', error);
			setProperties([]);
		} finally {
			setLoading(false);
		}
	}, [state.filters, state.userPreferences]);

	// Загружаем недвижимость при изменении фильтров или предпочтений
	React.useEffect(() => {
		// Загружаем ВСЕГДА - по умолчанию все объекты, с фильтрацией если есть предпочтения
		loadProperties();
	}, [loadProperties]);

	// Загружаем все объекты при инициализации компонента
	React.useEffect(() => {
		loadProperties();
	}, []); // Пустой массив зависимостей - выполняется только при монтировании

	// Render the appropriate step component based on current step
	const renderCurrentStep = () => {
		const stepContent = (() => {
			switch (currentStepIndex) {
				case 0:
					return <IntroStepWrapper />;
				case 1:
					return <PurposeStepWrapper />;
				case 2:
					return <BudgetStepWrapper budgetRanges={dynamicFilters.budgetRanges} />;
				case 3:
					return <PropertyTypeStepWrapper propertyTypes={dynamicFilters.propertyTypes} />;
				case 4:
					return <LocationStepWrapper locations={dynamicFilters.locations} />;
				case 5:
					return <FeaturesStepWrapper features={dynamicFilters.features} />;
				case 6:
					return <ResultsStepWrapper />;
				default:
					return <IntroStepWrapper />;
			}
		})();

		return (
			<div className="w-full">
				{stepContent}
			</div>
		);
	};

	return (
		<div className="h-full bg-background flex flex-col overflow-hidden">
			{/* Header with progress badges - прижат сверху */}
			<div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex-shrink-0">
				<div className="w-full px-4 py-2">
					<div className="flex items-center justify-between mb-2">
						<div className="flex items-center gap-2">
							<Button variant="ghost" size="sm" onClick={() => window.history.back()}>
								<ArrowLeft className="w-4 h-4" />
							</Button>
							<h1 className="text-lg font-bold">{t('quiz.title')}</h1>
						</div>
						<QuizProgressBadges />
					</div>
				</div>
			</div>

			{/* Main content area - без вертикальной прокрутки */}
			<div className="flex-1 flex flex-col overflow-hidden">
				{/* Properties grid - фиксированная высота */}
				<div className="w-full px-6 py-4 h-80 flex-shrink-0">
					<QuizPropertyGrid 
						properties={properties}
						loading={loading}
						currentStep={currentStepIndex}
					/>
				</div>

				{/* Quiz content - занимает оставшееся место без прокрутки */}
				<div className="flex-1 w-full px-4 py-4 overflow-hidden">
					<div className="h-full flex items-end justify-center pb-2">
						{renderCurrentStep()}
					</div>
				</div>
			</div>

			{/* Navigation - прижата к низу страницы */}
			<div className="border-t bg-background/95 backdrop-blur flex-shrink-0">
				<div className="w-full max-w-2xl mx-auto px-4 py-3">
					<div className="flex items-center justify-between">
						<Button
							variant="outline"
							size="sm"
							onClick={prevStep}
							disabled={state.currentStepIndex === 0}
						>
							<ArrowLeft className="w-4 h-4 mr-1" />
							{t('quiz.navigation.prev')}
						</Button>

						<div className="flex items-center gap-3">
							<div className="text-xs text-muted-foreground">
								{state.currentStepIndex + 1}/7
							</div>
							
							{/* Кнопка пропустить - показывается на всех этапах кроме последнего */}
							{state.currentStepIndex < 6 && (
								<Button
									variant="ghost"
									size="sm"
									onClick={nextStep}
									className="text-muted-foreground hover:text-foreground text-xs"
								>
									{t('quiz.navigation.skip')}
								</Button>
							)}
						</div>

						{state.currentStepIndex < 6 ? (
							<Button size="sm" onClick={nextStep}>
								{t('quiz.navigation.next')}
								<ArrowRight className="w-4 h-4 ml-1" />
							</Button>
						) : (
							<div className="w-16" /> // Spacer for alignment
						)}
					</div>
				</div>
			</div>

			{/* Voice chat interface */}
			<div className="fixed bottom-12 right-4 z-50">
				<VoiceChatInterface />
			</div>
		</div>
	);
}

// Main page component with provider
export default function QuizPage() {
	return (
		<QuizUrlProvider>
			<TranslationsProvider>
				<QuizContent />
			</TranslationsProvider>
		</QuizUrlProvider>
	);
}
