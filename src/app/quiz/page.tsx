'use client';

import React from 'react';
import { QuizProvider, useQuiz } from '@/lib/quiz-context';
import { QuizProgressBadges } from '@/components/quiz-progress-badges';
import { QuizPropertyGrid } from '@/components/quiz-property-grid';
import VoiceChatInterface from '@/components/voice-chat-interface';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, Home, RotateCcw } from 'lucide-react';
import { Property } from '@/types/property';

// Step content components (defined outside QuizContent for proper exports)
function IntroStep() {
	return (
		<div className="w-full max-w-3xl mx-auto">
			<Card className="w-full">
				<CardHeader className="text-center pb-4">
					<CardTitle className="text-xl">🏠 Welcome to IO Property Quiz</CardTitle>
					<CardDescription>
						Let's find your perfect property together! I'll guide you through a few questions to understand your needs.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
						<Card className="p-3 border-2 border-dashed">
							<h3 className="font-semibold mb-2 text-sm">🎯 What we'll discover:</h3>
							<ul className="text-xs space-y-1">
								<li>• Rent or Buy preference</li>
								<li>• Budget range</li>
								<li>• Property type preferences</li>
								<li>• Ideal location</li>
								<li>• Must-have features</li>
							</ul>
						</Card>
						<Card className="p-3 border-2 border-dashed">
							<h3 className="font-semibold mb-2 text-sm">🤖 AI-Powered Guidance:</h3>
							<ul className="text-xs space-y-1">
								<li>• Voice or text chat</li>
								<li>• Personalized recommendations</li>
								<li>• Real-time property matching</li>
								<li>• Expert insights</li>
							</ul>
						</Card>
					</div>
					<div className="text-center">
						<p className="text-muted-foreground text-sm">
							Ready to find your dream property? Let's start the journey!
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

function PurposeStep({ onChoice }: { onChoice: (purpose: 'rent' | 'buy') => void }) {
	return (
		<div className="w-full max-w-2xl mx-auto">
			<Card className="w-full">
				<CardHeader className="text-center pb-4">
					<CardTitle className="text-xl">🏡 Rent or Buy?</CardTitle>
					<CardDescription>
						Are you looking to rent a property or buy one? This will help me tailor the recommendations.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
						<Card
							className="p-4 cursor-pointer hover:border-primary transition-colors"
							onClick={() => onChoice('rent')}
						>
							<div className="text-center space-y-2">
								<div className="text-3xl">🏠</div>
								<h3 className="text-lg font-semibold">Rent</h3>
								<p className="text-xs text-muted-foreground">
									Flexible living, lower upfront costs, try before you buy
								</p>
							</div>
						</Card>
						<Card
							className="p-4 cursor-pointer hover:border-primary transition-colors"
							onClick={() => onChoice('buy')}
						>
							<div className="text-center space-y-2">
								<div className="text-3xl">🏘️</div>
								<h3 className="text-lg font-semibold">Buy</h3>
								<p className="text-xs text-muted-foreground">
									Long-term investment, build equity, create your forever home
								</p>
							</div>
						</Card>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

function BudgetStep({ onBudgetSelect }: { onBudgetSelect: (min: number, max: number) => void }) {
	return (
		<div className="w-full max-w-3xl mx-auto">
			<Card className="w-full">
				<CardHeader className="text-center pb-4">
					<CardTitle className="text-xl">💰 Budget Range</CardTitle>
					<CardDescription>
						What's your monthly budget for rent/mortgage?
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-2 md:grid-cols-3 gap-2">
						{[
							{ label: '€500-€1,000', min: 500, max: 1000 },
							{ label: '€1,000-€2,000', min: 1000, max: 2000 },
							{ label: '€2,000-€3,500', min: 2000, max: 3500 },
							{ label: '€3,500-€5,000', min: 3500, max: 5000 },
							{ label: '€5,000+', min: 5000, max: 100000 },
							{ label: 'Custom', min: 0, max: 0 },
						].map((budget) => (
							<Button
								key={budget.label}
								variant="outline"
								size="sm"
								className="p-3 h-auto flex-col"
								onClick={() => onBudgetSelect(budget.min, budget.max)}
							>
								<span className="font-semibold text-xs">{budget.label}</span>
							</Button>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

function PropertyTypeStep({ onTypeSelect, selectedTypes }: {
	onTypeSelect: (typeId: string) => void;
	selectedTypes: string[];
}) {
	const propertyTypes = [
		{ id: 'apartment', label: 'Apartment', icon: '🏢' },
		{ id: 'house', label: 'House', icon: '🏠' },
		{ id: 'studio', label: 'Studio', icon: '🏠' },
		{ id: 'loft', label: 'Loft', icon: '🏭' },
		{ id: 'townhouse', label: 'Townhouse', icon: '🏘️' },
		{ id: 'condo', label: 'Condo', icon: '🏙️' },
	];

	return (
		<Card className="w-full">
			<CardHeader className="text-center">
				<CardTitle className="text-2xl">🏗️ Property Type</CardTitle>
				<CardDescription>
					What type of property are you interested in? Select all that apply.
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
							</Button>
						);
					})}
				</div>
				{selectedTypes.length > 0 && (
					<div className="mt-4 text-center">
						<p className="text-sm text-muted-foreground">
							Selected: {selectedTypes.join(', ')}
						</p>
					</div>
				)}
			</CardContent>
		</Card>
	);
}

function LocationStep({ onLocationSelect }: { onLocationSelect: (location: string) => void }) {
	const locations = [
		'City Center', 'Suburbs', 'Beach Area', 'Mountains',
		'University Area', 'Business District', 'Historic Center', 'Green Areas'
	];

	return (
		<div className="w-full max-w-3xl mx-auto">
			<Card className="w-full">
				<CardHeader className="text-center pb-4">
					<CardTitle className="text-xl">📍 Location</CardTitle>
					<CardDescription>
						Where would you like to live? Choose your preferred area type.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-2">
						{locations.map((location) => (
							<Button
								key={location}
								variant="outline"
								size="sm"
								className="p-2 h-auto text-xs"
								onClick={() => onLocationSelect(location)}
							>
								{location}
							</Button>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

function FeaturesStep({ onFeatureSelect, selectedFeatures }: {
	onFeatureSelect: (featureId: string) => void;
	selectedFeatures: string[];
}) {
	const features = [
		{ id: 'balcony', label: 'Balcony', icon: '🌅' },
		{ id: 'parking', label: 'Parking', icon: '🅿️' },
		{ id: 'garden', label: 'Garden', icon: '🌳' },
		{ id: 'gym', label: 'Gym', icon: '💪' },
		{ id: 'pool', label: 'Swimming Pool', icon: '🏊' },
		{ id: 'security', label: '24/7 Security', icon: '🔒' },
		{ id: 'pet_friendly', label: 'Pet Friendly', icon: '🐕' },
		{ id: 'elevator', label: 'Elevator', icon: '⚡' },
	];

	return (
		<div className="w-full max-w-3xl mx-auto">
			<Card className="w-full">
				<CardHeader className="text-center pb-4">
					<CardTitle className="text-xl">✨ Must-Have Features</CardTitle>
					<CardDescription>
						Select features that are important to you. You can choose multiple options.
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
	return (
		<div className="w-full max-w-3xl mx-auto">
			<Card className="w-full">
				<CardHeader className="text-center pb-4">
					<CardTitle className="text-xl">🎉 Perfect! Here's Your Profile</CardTitle>
					<CardDescription>
						Based on your preferences, here's what you're looking for:
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
						<div className="space-y-1">
							<h3 className="font-semibold text-sm">Purpose</h3>
							<Badge variant="outline" className="text-sm p-1">
								{purpose === 'renting' ? '🏠' : '🏘️'} {purpose.charAt(0).toUpperCase() + purpose.slice(1)}
							</Badge>
						</div>
						<div className="space-y-1">
							<h3 className="font-semibold text-sm">Budget</h3>
							<Badge variant="outline" className="text-sm p-1">
								💰 {preferences.budget ? `€${preferences.budget.min}-€${preferences.budget.max}` : 'Not specified'}
							</Badge>
						</div>
						<div className="space-y-1">
							<h3 className="font-semibold text-sm">Property Types</h3>
							<div className="flex flex-wrap gap-1">
								{preferences.propertyType?.map((type: string) => (
									<Badge key={type} variant="secondary" className="text-xs">
										{type}
									</Badge>
								)) || <Badge variant="outline" className="text-xs">Not specified</Badge>}
							</div>
						</div>
						<div className="space-y-1">
							<h3 className="font-semibold text-sm">Location</h3>
							<Badge variant="outline" className="text-sm p-1">
								📍 {preferences.location || 'Not specified'}
							</Badge>
						</div>
					</div>

					<div className="space-y-1">
						<h3 className="font-semibold text-sm">Must-Have Features</h3>
						<div className="flex flex-wrap gap-1">
							{preferences.features?.map((feature: string) => (
								<Badge key={feature} variant="secondary" className="text-xs">
									{feature.replace('_', ' ')}
								</Badge>
							)) || <Badge variant="outline" className="text-xs">No features selected</Badge>}
						</div>
					</div>

					<div className="bg-muted p-3 rounded-lg">
						<p className="text-center text-muted-foreground text-sm">
							🤖 Now let me search for properties that match your criteria...
						</p>
					</div>

					<div className="flex gap-2 justify-center">
						<Button onClick={onReset} variant="outline" size="sm">
							<RotateCcw className="w-4 h-4 mr-1" />
							Start Over
						</Button>
						<Button size="sm">
							🔍 Search Properties
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
	const { updatePreferences, nextStep } = useQuiz();

	const handleChoice = (purpose: 'rent' | 'buy') => {
		updatePreferences({ purpose });
		nextStep();
	};

	return <PurposeStep onChoice={handleChoice} />;
}

function BudgetStepWrapper() {
	const { updatePreferences, nextStep } = useQuiz();

	const handleBudgetSelect = (min: number, max: number) => {
		updatePreferences({ budget: { min, max } });
		nextStep();
	};

	return <BudgetStep onBudgetSelect={handleBudgetSelect} />;
}

function PropertyTypeStepWrapper() {
	const { state, updatePreferences, nextStep } = useQuiz();

	const handleTypeSelect = (typeId: string) => {
		const currentTypes = state.userPreferences.propertyType || [];
		const newTypes = currentTypes.includes(typeId)
			? currentTypes.filter(t => t !== typeId)
			: [...currentTypes, typeId];

		updatePreferences({ propertyType: newTypes });

		if (newTypes.length > 0) {
			setTimeout(() => nextStep(), 300);
		}
	};

	const selectedTypes = state.userPreferences.propertyType || [];

	return <PropertyTypeStep onTypeSelect={handleTypeSelect} selectedTypes={selectedTypes} />;
}

function LocationStepWrapper() {
	const { updatePreferences, nextStep } = useQuiz();

	const handleLocationSelect = (location: string) => {
		updatePreferences({ location });
		nextStep();
	};

	return <LocationStep onLocationSelect={handleLocationSelect} />;
}

function FeaturesStepWrapper() {
	const { state, updatePreferences } = useQuiz();

	const handleFeatureSelect = (featureId: string) => {
		const currentFeatures = state.userPreferences.features || [];
		const newFeatures = currentFeatures.includes(featureId)
			? currentFeatures.filter(f => f !== featureId)
			: [...currentFeatures, featureId];

		updatePreferences({ features: newFeatures });
	};

	const selectedFeatures = state.userPreferences.features || [];

	return <FeaturesStep onFeatureSelect={handleFeatureSelect} selectedFeatures={selectedFeatures} />;
}

function ResultsStepWrapper() {
	const { state, resetQuiz } = useQuiz();

	const preferences = state.userPreferences;
	const purpose = preferences.purpose === 'rent' ? 'renting' : 'buying';

	return <ResultsStep preferences={preferences} purpose={purpose} onReset={resetQuiz} />;
}

// Main quiz content component
function QuizContent() {
	const { state, nextStep, prevStep } = useQuiz();
	const [properties, setProperties] = React.useState<Property[]>([]);
	const [loading, setLoading] = React.useState(false);

	const currentStepIndex = state.currentStepIndex;

	// Функция для загрузки недвижимости на основе текущих предпочтений
	const loadProperties = React.useCallback(async () => {
		setLoading(true);
		try {
			const response = await fetch('/api/properties/quiz-search', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					preferences: state.userPreferences,
					currentStep: currentStepIndex,
				}),
			});

			const data = await response.json();
			
			if (data.success) {
				setProperties(data.data.properties || []);
			} else {
				console.error('Failed to load properties:', data.error);
				setProperties([]);
			}
		} catch (error) {
			console.error('Error loading properties:', error);
			setProperties([]);
		} finally {
			setLoading(false);
		}
	}, [state.userPreferences, currentStepIndex]);

	// Загружаем недвижимость при изменении предпочтений или этапа
	React.useEffect(() => {
		// Загружаем только если есть хотя бы одно предпочтение
		const hasPreferences = Object.values(state.userPreferences).some(value => 
			value !== null && value !== undefined && 
			(Array.isArray(value) ? value.length > 0 : true)
		);

		if (hasPreferences) {
			loadProperties();
		} else {
			setProperties([]);
		}
	}, [loadProperties, state.userPreferences, currentStepIndex]);

	// Render the appropriate step component based on current step
	const renderCurrentStep = () => {
		switch (currentStepIndex) {
			case 0:
				return <IntroStepWrapper />;
			case 1:
				return <PurposeStepWrapper />;
			case 2:
				return <BudgetStepWrapper />;
			case 3:
				return <PropertyTypeStepWrapper />;
			case 4:
				return <LocationStepWrapper />;
			case 5:
				return <FeaturesStepWrapper />;
			case 6:
				return <ResultsStepWrapper />;
			default:
				return <IntroStepWrapper />;
		}
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
							<h1 className="text-lg font-bold">Property Quiz</h1>
						</div>
						<Button variant="ghost" size="sm" onClick={() => window.location.href = '/'}>
							<Home className="w-4 h-4" />
						</Button>
					</div>
					<QuizProgressBadges />
				</div>
			</div>

			{/* Main content area - без вертикальной прокрутки */}
			<div className="flex-1 flex flex-col overflow-hidden">
				{/* Properties grid - фиксированная высота */}
				<div className="w-full px-4 py-4 h-80 flex-shrink-0">
					<QuizPropertyGrid 
						properties={properties}
						loading={loading}
						currentStep={currentStepIndex}
					/>
				</div>

				{/* Quiz content - занимает оставшееся место без прокрутки */}
				<div className="flex-1 w-full px-4 py-4 overflow-hidden">
					<div className="h-full flex items-center justify-center">
						{renderCurrentStep()}
					</div>
				</div>
			</div>

			{/* Navigation - прижата к низу страницы */}
			<div className="border-t bg-background/95 backdrop-blur flex-shrink-0">
				<div className="w-full px-4 py-3">
					<div className="flex items-center justify-between">
						<Button
							variant="outline"
							size="sm"
							onClick={prevStep}
							disabled={state.currentStepIndex === 0}
						>
							<ArrowLeft className="w-4 h-4 mr-1" />
							Prev
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
									Skip
								</Button>
							)}
						</div>

						{state.currentStepIndex < 6 ? (
							<Button size="sm" onClick={nextStep}>
								Next
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
		<QuizProvider>
			<QuizContent />
		</QuizProvider>
	);
}
