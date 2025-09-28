'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
	Search, 
	MapPin, 
	Home, 
	Building, 
	Castle,
	Filter,
	Bot,
	MessageSquare
} from 'lucide-react';

export default function SmartSearch() {
	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-4xl mx-auto">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold mb-2">AI-Powered Property Search</h1>
					<p className="text-muted-foreground">
						Tell our AI assistant what you're looking for and get personalized recommendations
					</p>
				</div>

				{/* AI Chat Interface */}
				<Card className="mb-8">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Bot className="w-5 h-5 text-primary" />
							AI Property Assistant
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="bg-muted/50 rounded-lg p-4 mb-4">
							<div className="flex items-start gap-3">
								<div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
									<Bot className="w-4 h-4 text-primary-foreground" />
								</div>
								<div className="flex-1">
									<p className="text-sm">
										Hi! I'm your AI property assistant. I can help you find the perfect property based on your needs, budget, and preferences. 
										What are you looking for? You can describe your ideal home, location preferences, or specific requirements.
									</p>
								</div>
							</div>
						</div>
						
						<div className="space-y-4">
							<div className="flex items-start gap-3">
								<div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
									<MessageSquare className="w-4 h-4 text-gray-600" />
								</div>
								<div className="flex-1">
									<p className="text-sm">I'm looking for a modern apartment in Barcelona with 2 bedrooms and a balcony.</p>
								</div>
							</div>

							<div className="flex items-start gap-3">
								<div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
									<Bot className="w-4 h-4 text-primary-foreground" />
								</div>
								<div className="flex-1">
									<p className="text-sm">
										Great! I found several modern apartments in Barcelona that match your criteria. 
										Based on your preferences, I recommend the Eixample district which has excellent transport links and modern buildings. 
										Would you like me to show you properties in that area?
									</p>
								</div>
							</div>
						</div>

						<div className="mt-4 flex gap-2">
							<Input 
								placeholder="Describe your ideal property..." 
								className="flex-1"
							/>
							<Button>
								<Search className="w-4 h-4" />
							</Button>
						</div>
					</CardContent>
				</Card>

				{/* Quick Search Filters */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Filter className="w-5 h-5" />
							Quick Search Filters
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
							<div className="space-y-2">
								<Label htmlFor="location">Location</Label>
								<Select>
									<SelectTrigger>
										<SelectValue placeholder="Select location" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="barcelona">Barcelona, Spain</SelectItem>
										<SelectItem value="cancun">Cancún, México</SelectItem>
										<SelectItem value="paris">Paris, France</SelectItem>
										<SelectItem value="nyc">New York, USA</SelectItem>
										<SelectItem value="rome">Rome, Italy</SelectItem>
										<SelectItem value="sydney">Sydney, Australia</SelectItem>
										<SelectItem value="tokyo">Tokyo, Japan</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="space-y-2">
								<Label htmlFor="property-type">Property Type</Label>
								<Select>
									<SelectTrigger>
										<SelectValue placeholder="Select type" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="apartment">
											<div className="flex items-center gap-2">
												<Building className="w-4 h-4" />
												Apartment
											</div>
										</SelectItem>
										<SelectItem value="house">
											<div className="flex items-center gap-2">
												<Home className="w-4 h-4" />
												House
											</div>
										</SelectItem>
										<SelectItem value="villa">
											<div className="flex items-center gap-2">
												<Castle className="w-4 h-4" />
												Villa
											</div>
										</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="space-y-2">
								<Label htmlFor="budget">Budget Range</Label>
								<Select>
									<SelectTrigger>
										<SelectValue placeholder="Select budget" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="under-500k">Under $500,000</SelectItem>
										<SelectItem value="500k-1m">$500,000 - $1,000,000</SelectItem>
										<SelectItem value="1m-2m">$1,000,000 - $2,000,000</SelectItem>
										<SelectItem value="over-2m">Over $2,000,000</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="space-y-2">
								<Label htmlFor="bedrooms">Bedrooms</Label>
								<Select>
									<SelectTrigger>
										<SelectValue placeholder="Any" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="1">1+</SelectItem>
										<SelectItem value="2">2+</SelectItem>
										<SelectItem value="3">3+</SelectItem>
										<SelectItem value="4">4+</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>

						<div className="mt-6 flex justify-center">
							<Button size="lg" className="px-8">
								<Search className="w-4 h-4 mr-2" />
								Search Properties
							</Button>
						</div>
					</CardContent>
				</Card>

				{/* Suggested Searches */}
				<div className="mt-8">
					<h3 className="text-lg font-semibold mb-4">Suggested Searches</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{[
							"Modern apartments in Barcelona under €500k",
							"Luxury villas with pool in Cancún",
							"Historic properties in Rome city center",
							"Beachfront properties in Sydney",
							"Investment properties in NYC",
							"Family houses with garden in Paris"
						].map((suggestion, index) => (
							<Button 
								key={index} 
								variant="outline" 
								className="h-auto p-4 text-left justify-start"
							>
								<MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
								<span className="text-sm">{suggestion}</span>
							</Button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
