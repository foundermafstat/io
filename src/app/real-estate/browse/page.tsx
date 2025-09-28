import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
	MapPin, 
	Bed, 
	Bath, 
	Square, 
	Heart,
	Filter,
	Search
} from 'lucide-react';

export default function BrowseProperties() {
	return (
		<div className="container mx-auto px-4 py-8">
			<div className="flex items-center justify-between mb-8">
				<div>
					<h1 className="text-3xl font-bold mb-2">Browse Properties</h1>
					<p className="text-muted-foreground">Find your perfect property with AI assistance</p>
				</div>
				<Button className="flex items-center gap-2">
					<Filter className="w-4 h-4" />
					Filters
				</Button>
			</div>

			{/* Search Bar */}
			<div className="mb-8">
				<div className="relative">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
					<input 
						type="text" 
						placeholder="Search by location, property type, or features..."
						className="w-full pl-10 pr-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
					/>
				</div>
			</div>

			{/* Properties Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{[
					{
						id: 1,
						title: "Modern Apartment in Barcelona",
						location: "Barcelona, Spain",
						price: "€450,000",
						bedrooms: 2,
						bathrooms: 2,
						area: "85 sqm",
						image: "/placeholder.jpg",
						type: "Apartment",
						features: ["Balcony", "Parking", "Elevator"]
					},
					{
						id: 2,
						title: "Luxury Villa in Cancún",
						location: "Cancún, México",
						price: "$850,000",
						bedrooms: 4,
						bathrooms: 3,
						area: "200 sqm",
						image: "/placeholder.jpg",
						type: "Villa",
						features: ["Pool", "Garden", "Beach Access"]
					},
					{
						id: 3,
						title: "Historic Townhouse in Paris",
						location: "Paris, France",
						price: "€1,200,000",
						bedrooms: 3,
						bathrooms: 2,
						area: "120 sqm",
						image: "/placeholder.jpg",
						type: "Townhouse",
						features: ["Historic", "City Center", "Renovated"]
					},
					{
						id: 4,
						title: "Penthouse in NYC",
						location: "New York, USA",
						price: "$2,500,000",
						bedrooms: 3,
						bathrooms: 3,
						area: "180 sqm",
						image: "/placeholder.jpg",
						type: "Penthouse",
						features: ["City View", "Concierge", "Gym"]
					},
					{
						id: 5,
						title: "Beach House in Sydney",
						location: "Sydney, Australia",
						price: "A$1,800,000",
						bedrooms: 4,
						bathrooms: 3,
						area: "220 sqm",
						image: "/placeholder.jpg",
						type: "House",
						features: ["Ocean View", "Beach Access", "Garage"]
					},
					{
						id: 6,
						title: "Traditional House in Rome",
						location: "Rome, Italy",
						price: "€680,000",
						bedrooms: 3,
						bathrooms: 2,
						area: "140 sqm",
						image: "/placeholder.jpg",
						type: "House",
						features: ["Historic", "Garden", "Terrace"]
					}
				].map((property) => (
					<Card key={property.id} className="group hover:shadow-lg transition-shadow cursor-pointer">
						<CardHeader className="p-0">
							<div className="relative">
								<div className="w-full h-48 bg-gray-200 rounded-t-lg"></div>
								<Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
									{property.type}
								</Badge>
								<Button 
									size="icon" 
									variant="ghost" 
									className="absolute top-3 right-3 bg-white/90 hover:bg-white"
								>
									<Heart className="w-4 h-4" />
								</Button>
							</div>
						</CardHeader>
						<CardContent className="p-4">
							<CardTitle className="text-lg mb-2 line-clamp-1">{property.title}</CardTitle>
							<div className="flex items-center gap-1 text-muted-foreground mb-3">
								<MapPin className="w-4 h-4" />
								<span className="text-sm">{property.location}</span>
							</div>
							
							<div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
								<div className="flex items-center gap-1">
									<Bed className="w-4 h-4" />
									<span>{property.bedrooms}</span>
								</div>
								<div className="flex items-center gap-1">
									<Bath className="w-4 h-4" />
									<span>{property.bathrooms}</span>
								</div>
								<div className="flex items-center gap-1">
									<Square className="w-4 h-4" />
									<span>{property.area}</span>
								</div>
							</div>

							<div className="flex flex-wrap gap-1 mb-4">
								{property.features.map((feature, index) => (
									<Badge key={index} variant="outline" className="text-xs">
										{feature}
									</Badge>
								))}
							</div>

							<div className="flex items-center justify-between">
								<span className="text-xl font-bold text-primary">{property.price}</span>
								<Button size="sm" variant="outline">
									View Details
								</Button>
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Load More */}
			<div className="text-center mt-12">
				<Button variant="outline" size="lg">
					Load More Properties
				</Button>
			</div>
		</div>
	);
}
