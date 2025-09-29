'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

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
	selectedProperty: string | null; // ID выделенного объекта недвижимости
}

type QuizAction =
	| { type: 'NEXT_STEP' }
	| { type: 'PREV_STEP' }
	| { type: 'SET_STEP'; payload: number }
	| { type: 'COMPLETE_STEP'; payload: number }
	| { type: 'UPDATE_PREFERENCES'; payload: Partial<QuizState['userPreferences']> }
	| { type: 'SELECT_PROPERTY'; payload: string | null }
	| { type: 'RESET_QUIZ' };

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

const initialState: QuizState = {
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
};

function quizReducer(state: QuizState, action: QuizAction): QuizState {
	switch (action.type) {
		case 'NEXT_STEP':
			const nextIndex = Math.min(state.currentStepIndex + 1, state.steps.length - 1);
			return {
				...state,
				currentStepIndex: nextIndex,
				steps: state.steps.map((step, index) => ({
					...step,
					current: index === nextIndex,
					completed: index < nextIndex ? true : step.completed,
				})),
			};

		case 'PREV_STEP':
			const prevIndex = Math.max(state.currentStepIndex - 1, 0);
			return {
				...state,
				currentStepIndex: prevIndex,
				steps: state.steps.map((step, index) => ({
					...step,
					current: index === prevIndex,
				})),
			};

		case 'SET_STEP':
			return {
				...state,
				currentStepIndex: action.payload,
				steps: state.steps.map((step, index) => ({
					...step,
					current: index === action.payload,
					completed: index <= action.payload ? true : step.completed,
				})),
			};

		case 'COMPLETE_STEP':
			return {
				...state,
				steps: state.steps.map((step, index) =>
					index === action.payload ? { ...step, completed: true } : step
				),
			};

		case 'UPDATE_PREFERENCES':
			return {
				...state,
				userPreferences: { ...state.userPreferences, ...action.payload },
			};

		case 'SELECT_PROPERTY':
			return {
				...state,
				selectedProperty: action.payload,
			};

		case 'RESET_QUIZ':
			return initialState;

		default:
			return state;
	}
}

interface QuizContextType {
	state: QuizState;
	dispatch: React.Dispatch<QuizAction>;
	nextStep: () => void;
	prevStep: () => void;
	setStep: (index: number) => void;
	completeStep: (index: number) => void;
	updatePreferences: (preferences: Partial<QuizState['userPreferences']>) => void;
	selectProperty: (propertyId: string | null) => void;
	resetQuiz: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: ReactNode }) {
	const [state, dispatch] = useReducer(quizReducer, initialState);

	const nextStep = () => dispatch({ type: 'NEXT_STEP' });
	const prevStep = () => dispatch({ type: 'PREV_STEP' });
	const setStep = (index: number) => dispatch({ type: 'SET_STEP', payload: index });
	const completeStep = (index: number) => dispatch({ type: 'COMPLETE_STEP', payload: index });
	const updatePreferences = (preferences: Partial<QuizState['userPreferences']>) =>
		dispatch({ type: 'UPDATE_PREFERENCES', payload: preferences });
	const selectProperty = (propertyId: string | null) => 
		dispatch({ type: 'SELECT_PROPERTY', payload: propertyId });
	const resetQuiz = () => dispatch({ type: 'RESET_QUIZ' });

	return (
		<QuizContext.Provider
			value={{
				state,
				dispatch,
				nextStep,
				prevStep,
				setStep,
				completeStep,
				updatePreferences,
				selectProperty,
				resetQuiz,
			}}
		>
			{children}
		</QuizContext.Provider>
	);
}

export function useQuiz() {
	const context = useContext(QuizContext);
	if (context === undefined) {
		throw new Error('useQuiz must be used within a QuizProvider');
	}
	return context;
}
