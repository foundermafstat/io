'use client';

import React from 'react';
import { useQuiz, QuizStep } from '@/lib/quiz-context';
import { Check, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuizProgressBadgesProps {
	className?: string;
}

export function QuizProgressBadges({ className }: QuizProgressBadgesProps) {
	const { state } = useQuiz();

	return (
		<div className={cn("flex items-center gap-1 p-4 bg-background rounded-lg border", className)}>
			{state.steps.map((step: QuizStep, index: number) => (
				<React.Fragment key={step.id}>
					<div
						className={cn(
							"flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-200 relative",
							step.completed
								? "bg-primary border-primary text-primary-foreground"
								: step.current
								? "border-primary text-primary bg-background"
								: "border-muted-foreground/30 text-muted-foreground bg-background"
						)}
					>
						{step.completed ? (
							<Check className="w-4 h-4" />
						) : (
							<Circle className="w-3 h-3 fill-current" />
						)}

						{/* Tooltip with step description */}
						<div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
							{step.title}: {step.description}
							<div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-popover"></div>
						</div>
					</div>

					{/* Connecting line between badges (except for last one) */}
					{index < state.steps.length - 1 && (
						<div
							className={cn(
								"h-0.5 w-8 transition-colors duration-200",
								step.completed
									? "bg-primary"
									: "bg-muted-foreground/30"
							)}
						/>
					)}
				</React.Fragment>
			))}
		</div>
	);
}

// Alternative compact version for mobile
export function QuizProgressBadgesCompact({ className }: QuizProgressBadgesProps) {
	const { state } = useQuiz();

	return (
		<div className={cn("flex items-center justify-center gap-1 p-2 bg-background rounded-md border", className)}>
			{state.steps.map((step: QuizStep, index: number) => (
				<div
					key={step.id}
					className={cn(
						"flex items-center justify-center w-6 h-6 rounded-full border transition-all duration-200",
						step.completed
							? "bg-primary border-primary"
							: step.current
							? "border-primary bg-primary/10"
							: "border-muted-foreground/30 bg-background"
					)}
				>
					{step.completed ? (
						<Check className="w-3 h-3 text-primary-foreground" />
					) : (
						<span className="text-xs font-medium">
							{index + 1}
						</span>
					)}
				</div>
			))}
		</div>
	);
}
