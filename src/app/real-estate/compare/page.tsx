import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
	MapPin, 
	Bed, 
	Bath, 
	Square, 
	Heart,
	Plus,
	Trash2,
	BarChart3,
	Star,
	CheckCircle
} from 'lucide-react';

export default function CompareProperties() {
	const properties = [
		{
			id: 1,
			title: "Modern Apartment in Barcelona",
			location: "Barcelona, Spain",
			price: "€450,000",
			bedrooms: 2,
			bathrooms: 2,
			area: "85 sqm",
			pricePerSqm: "€5,294",
			yearBuilt: 2020,
			features: ["Balcony", "Parking", "Elevator", "Gym"],
			rating: 4.5,
			pros: ["Modern design", "Great location", "Good transport links"],
			cons: ["Small balcony", "No parking included"],
			aiScore: 8.5
		},
		{
			id: 2,
			title: "Luxury Villa in Cancún",
			location: "Cancún, México",
			price: "$850,000",
			bedrooms: 4,
			bathrooms: 3,
			area: "200 sqm",
			pricePerSqm: "$4,250",
			yearBuilt: 2018,
			features: ["Pool", "Garden", "Beach Access", "Garage"],
			rating: 4.8,
			pros: ["Private pool", "Beach access", "Large space"],
			cons: ["High maintenance", "Tourist area"],
			aiScore: 9.2
		},
		{
			id: 3,
			title: "Historic Townhouse in Paris",
			location: "Paris, France",
			price: "€1,200,000",
			bedrooms: 3,
			bathrooms: 2,
			area: "120 sqm",
			pricePerSqm: "€10,000",
			yearBuilt: 1850,
			features: ["Historic", "City Center", "Renovated", "Terrace"],
			rating: 4.3,
			pros: ["Historic charm", "City center", "Recently renovated"],
			cons: ["High price per sqm", "Limited parking"],
			aiScore: 7.8
		}
	];

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="flex items-center justify-between mb-8">
				<div>
					<h1 className="text-3xl font-bold mb-2">Compare Properties</h1>
					<p className="text-muted-foreground">Compare up to 3 properties side by side</p>
				</div>
				<Button variant="outline" className="flex items-center gap-2">
					<Plus className="w-4 h-4" />
					Add Property
				</Button>
			</div>

			{/* AI Recommendation */}
			<Card className="mb-8 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<BarChart3 className="w-5 h-5 text-primary" />
						AI Recommendation
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						{properties.map((property) => (
							<div key={property.id} className="text-center">
								<div className="text-2xl font-bold text-primary mb-1">
									{property.aiScore}/10
								</div>
								<div className="text-sm text-muted-foreground">
									AI Score for {property.title}
								</div>
							</div>
						))}
					</div>
					<div className="mt-4 p-4 bg-background rounded-lg">
						<p className="text-sm">
							<strong>AI Analysis:</strong> Based on your preferences and market data, the Luxury Villa in Cancún 
							offers the best value with the highest AI score of 9.2. It provides excellent amenities, 
							location benefits, and strong investment potential.
						</p>
					</div>
				</CardContent>
			</Card>

			{/* Properties Comparison Table */}
			<Card className="mb-8">
				<CardHeader>
					<CardTitle>Property Comparison</CardTitle>
				</CardHeader>
				<CardContent className="p-0">
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead>
								<tr className="border-b">
									<th className="text-left p-4 font-semibold">Features</th>
									{properties.map((property) => (
										<th key={property.id} className="text-center p-4 font-semibold min-w-[300px]">
											<div className="flex items-center justify-between mb-2">
												<h3 className="font-semibold text-sm">{property.title}</h3>
												<Button size="sm" variant="ghost">
													<Trash2 className="w-4 h-4" />
												</Button>
											</div>
											<div className="w-full h-32 bg-gray-200 rounded mb-2"></div>
											<div className="flex items-center justify-between">
												<span className="text-lg font-bold text-primary">{property.price}</span>
												<div className="flex items-center gap-1">
													<Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
													<span className="text-sm">{property.rating}</span>
												</div>
											</div>
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								<tr className="border-b">
									<td className="p-4 font-medium">Location</td>
									{properties.map((property) => (
										<td key={property.id} className="p-4 text-center">
											<div className="flex items-center justify-center gap-1">
												<MapPin className="w-4 h-4 text-muted-foreground" />
												<span className="text-sm">{property.location}</span>
											</div>
										</td>
									))}
								</tr>
								<tr className="border-b">
									<td className="p-4 font-medium">Bedrooms</td>
									{properties.map((property) => (
										<td key={property.id} className="p-4 text-center">
											<div className="flex items-center justify-center gap-1">
												<Bed className="w-4 h-4 text-muted-foreground" />
												<span>{property.bedrooms}</span>
											</div>
										</td>
									))}
								</tr>
								<tr className="border-b">
									<td className="p-4 font-medium">Bathrooms</td>
									{properties.map((property) => (
										<td key={property.id} className="p-4 text-center">
											<div className="flex items-center justify-center gap-1">
												<Bath className="w-4 h-4 text-muted-foreground" />
												<span>{property.bathrooms}</span>
											</div>
										</td>
									))}
								</tr>
								<tr className="border-b">
									<td className="p-4 font-medium">Area</td>
									{properties.map((property) => (
										<td key={property.id} className="p-4 text-center">
											<div className="flex items-center justify-center gap-1">
												<Square className="w-4 h-4 text-muted-foreground" />
												<span>{property.area}</span>
											</div>
										</td>
									))}
								</tr>
								<tr className="border-b">
									<td className="p-4 font-medium">Price per sqm</td>
									{properties.map((property) => (
										<td key={property.id} className="p-4 text-center">
											<span className="font-medium">{property.pricePerSqm}</span>
										</td>
									))}
								</tr>
								<tr className="border-b">
									<td className="p-4 font-medium">Year Built</td>
									{properties.map((property) => (
										<td key={property.id} className="p-4 text-center">
											<span>{property.yearBuilt}</span>
										</td>
									))}
								</tr>
								<tr className="border-b">
									<td className="p-4 font-medium">Features</td>
									{properties.map((property) => (
										<td key={property.id} className="p-4">
											<div className="flex flex-wrap gap-1 justify-center">
												{property.features.map((feature, index) => (
													<Badge key={index} variant="outline" className="text-xs">
														{feature}
													</Badge>
												))}
											</div>
										</td>
									))}
								</tr>
								<tr className="border-b">
									<td className="p-4 font-medium">Pros</td>
									{properties.map((property) => (
										<td key={property.id} className="p-4">
											<ul className="space-y-1">
												{property.pros.map((pro, index) => (
													<li key={index} className="flex items-center gap-2 text-sm text-green-600">
														<CheckCircle className="w-3 h-3" />
														{pro}
													</li>
												))}
											</ul>
										</td>
									))}
								</tr>
								<tr>
									<td className="p-4 font-medium">Cons</td>
									{properties.map((property) => (
										<td key={property.id} className="p-4">
											<ul className="space-y-1">
												{property.cons.map((con, index) => (
													<li key={index} className="flex items-center gap-2 text-sm text-red-600">
														<div className="w-3 h-3 rounded-full bg-red-600"></div>
														{con}
													</li>
												))}
											</ul>
										</td>
									))}
								</tr>
							</tbody>
						</table>
					</div>
				</CardContent>
			</Card>

			{/* Action Buttons */}
			<div className="flex justify-center gap-4">
				<Button variant="outline" size="lg">
					Save Comparison
				</Button>
				<Button size="lg" className="px-8">
					Contact Agent
				</Button>
			</div>
		</div>
	);
}
