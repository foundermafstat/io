'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToolsFunctions } from '@/hooks/use-tools';
import { useRouter } from 'next/navigation';

export default function NavigationTest() {
	const router = useRouter();
	const {
		navigateToProperties,
		navigateToProperty,
		navigateToHome,
		navigateToCars,
		navigateToCar,
		loadPropertiesContext,
	} = useToolsFunctions();

	const handleNavigateToProperties = () => {
		navigateToProperties({
			filters: {
				query: 'apartment',
				operationType: 'RENT',
				city: 'New York',
				minPrice: 1000,
				maxPrice: 3000,
			},
		});
	};

	const handleNavigateToProperty = () => {
		// Используем пример ID - в реальном приложении это будет динамический ID
		navigateToProperty({ propertyId: 'example-property-id' });
	};

	const handleNavigateToCars = () => {
		navigateToCars();
	};

	const handleNavigateToCar = () => {
		// Используем пример ID - в реальном приложении это будет динамический ID
		navigateToCar({ carId: 'example-car-id' });
	};

	const handleLoadPropertiesContext = async () => {
		const result = await loadPropertiesContext({ featuredOnly: false });
		console.log('Properties context loaded:', result);
	};

	return (
		<div className="p-6 max-w-4xl mx-auto">
			<Card>
				<CardHeader>
					<CardTitle>Navigation Tools Test</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<Button onClick={handleNavigateToProperties} className="w-full">
							Navigate to Properties (with filters)
						</Button>

						<Button onClick={handleNavigateToProperty} className="w-full">
							Navigate to Property (example ID)
						</Button>

						<Button onClick={navigateToHome} className="w-full">
							Navigate to Home
						</Button>

						<Button onClick={handleNavigateToCars} className="w-full">
							Navigate to Cars
						</Button>

						<Button onClick={handleNavigateToCar} className="w-full">
							Navigate to Car (example ID)
						</Button>

						<Button onClick={handleLoadPropertiesContext} className="w-full">
							Load Properties Context
						</Button>
					</div>

					<div className="mt-6 p-4 bg-gray-100 rounded-lg">
						<h3 className="font-semibold mb-2">Instructions:</h3>
						<ul className="text-sm space-y-1">
							<li>
								• Click any navigation button to test the navigation functions
							</li>
							<li>
								• The "Load Properties Context" button will load all properties
								data for AI context
							</li>
							<li>
								• Navigation functions use Next.js router - no page reload!
							</li>
							<li>• Voice chat session will continue during navigation</li>
							<li>
								• These functions are also available as voice commands in the AI
								chat
							</li>
						</ul>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
