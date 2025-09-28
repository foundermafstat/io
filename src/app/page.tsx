import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
	MapPin, 
	Phone, 
	Shield, 
	Navigation, 
	Sparkles,
	Star,
	Building,
	Home,
	Villa,
	Store,
	Warehouse,
	TreePine
} from 'lucide-react';

export default function Home() {
	return (
		<div className="min-h-screen bg-background">
			{/* Header */}
			<header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
				<div className="container mx-auto px-4 py-4 flex items-center justify-between">
					<div className="flex items-center space-x-2">
						<div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
							<Building className="w-5 h-5 text-primary-foreground" />
						</div>
						<span className="text-xl font-bold text-foreground">Sensay.io</span>
					</div>
					<div className="flex items-center space-x-4">
						<Button variant="ghost" size="sm">Menu</Button>
						<div className="w-8 h-8 bg-gray-200 rounded-full"></div>
					</div>
				</div>
			</header>

			{/* Hero Section */}
			<section className="py-20 px-4 text-center">
				<div className="container mx-auto max-w-4xl">
					<h1 className="text-5xl md:text-6xl font-bold text-foreground mb-8">
						Find Your Dream Property with AI
					</h1>
					
					{/* Location badges */}
					<div className="flex flex-wrap justify-center gap-4 mb-12">
						{[
							{ city: "Barcelona, Spain", available: true },
							{ city: "Cancún, México", available: true },
							{ city: "Paris, France", available: true },
							{ city: "NYC, USA", available: true },
							{ city: "Rome, Italy", available: true },
							{ city: "Sydney, Australia", available: true },
							{ city: "Tokyo, Japan", available: true }
						].map((location, index) => (
							<Badge key={index} variant="outline" className="flex items-center gap-2 px-4 py-2">
								<div className="w-2 h-2 bg-green-500 rounded-full"></div>
								{location.city}
							</Badge>
						))}
					</div>

					{/* Call to action */}
					<div className="flex flex-col items-center space-y-4">
						<Button size="lg" className="w-16 h-16 rounded-full bg-primary hover:bg-primary/90">
							<Phone className="w-6 h-6" />
						</Button>
						<Button variant="outline" size="lg" className="px-8">
							Call to Reserve your Property
						</Button>
					</div>

					{/* Property logos */}
					<div className="mt-16 grid grid-cols-8 gap-8 items-center opacity-60">
						{['Luxury', 'Modern', 'Classic', 'Villa', 'Penthouse', 'Townhouse', 'Mansion', 'Estate'].map((type, index) => (
							<div key={index} className="text-center">
								<div className="w-12 h-12 bg-gray-300 rounded mx-auto mb-2"></div>
								<span className="text-xs text-muted-foreground">{type}</span>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Popular Property Types */}
			<section className="py-20 px-4 bg-muted/30">
				<div className="container mx-auto max-w-6xl">
					<h2 className="text-3xl font-bold text-center mb-12">Popular Property Types</h2>
					<div className="grid grid-cols-2 md:grid-cols-3 gap-6">
						{[
							{ type: "Apartment", icon: Building },
							{ type: "House", icon: Home },
							{ type: "Villa", icon: Villa },
							{ type: "Commercial", icon: Store },
							{ type: "Industrial", icon: Warehouse },
							{ type: "Land", icon: TreePine }
						].map((property, index) => (
							<Card key={index} className="group hover:shadow-lg transition-shadow">
								<CardContent className="p-6">
									<div className="w-full h-48 bg-gray-200 rounded-lg mb-4 relative overflow-hidden">
										<div className="absolute top-2 left-2 bg-white/90 px-2 py-1 rounded text-xs font-medium">
											{property.type}
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Trending Locations */}
			<section className="py-20 px-4">
				<div className="container mx-auto max-w-6xl">
					<h2 className="text-3xl font-bold text-center mb-12">Trending Destinations: Prime Locations</h2>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
						{[
							{ city: "Cancún, México", price: "Properties from $700+" },
							{ city: "Dubai, UAE", price: "Properties from $1,200+" },
							{ city: "Paris, France", price: "Properties from $900+" },
							{ city: "Rome, Italy", price: "Properties from $800+" }
						].map((location, index) => (
							<Card key={index} className="group hover:shadow-lg transition-shadow">
								<CardContent className="p-0">
									<div className="w-full h-48 bg-gray-200 rounded-t-lg"></div>
									<div className="p-4">
										<h3 className="font-semibold mb-1">{location.city}</h3>
										<p className="text-sm text-muted-foreground">{location.price}</p>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Why Choose Us */}
			<section className="py-20 px-4 bg-muted/30">
				<div className="container mx-auto max-w-6xl">
					<h2 className="text-3xl font-bold text-center mb-12">Discover Why We Stand Out</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div className="text-center">
							<div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
								<Sparkles className="w-8 h-8 text-primary-foreground" />
							</div>
							<h3 className="text-xl font-semibold mb-4">Hassle-Free Search</h3>
							<p className="text-muted-foreground">
								Effortless property search process powered by AI. Get seamless recommendations and unlock great deals instantly.
							</p>
						</div>
						<div className="text-center">
							<div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
								<Shield className="w-8 h-8 text-primary-foreground" />
							</div>
							<h3 className="text-xl font-semibold mb-4">Secure Transactions</h3>
							<p className="text-muted-foreground">
								Rigorous checks, transparent policies, and comprehensive documentation. Well-verified properties and reliable, secure services.
							</p>
						</div>
						<div className="text-center">
							<div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
								<Navigation className="w-8 h-8 text-primary-foreground" />
							</div>
							<h3 className="text-xl font-semibold mb-4">Smart Navigation</h3>
							<p className="text-muted-foreground">
								AI-powered location insights and neighborhood analysis to find your perfect property, making your search smooth and enjoyable.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Testimonials */}
			<section className="py-20 px-4">
				<div className="container mx-auto max-w-6xl">
					<h2 className="text-3xl font-bold text-center mb-12">Driven by Feedback</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{[
							{
								name: "Olivia Parker",
								handle: "@oliviaparker",
								text: "Best Property Search Experience! The AI interface is intuitive, making it easy to find the ideal property... Highly recommended!"
							},
							{
								name: "Emma Thompson",
								handle: "@emmathompson",
								text: "A Seamless Experience! This platform made finding property hassle-free... 5-star service all the way!"
							},
							{
								name: "Sophia Rodriguez",
								handle: "@sophiarodriguez",
								text: "Reliable and Affordable! I've used several property platforms before, but this one stands out... I'll be coming back for all my future searches."
							},
							{
								name: "Daniel Johnson",
								handle: "@danieljohnson",
								text: "Exceptional Service! From search to closing, everything was smooth and easy... Will definitely recommend to friends!"
							}
						].map((testimonial, index) => (
							<Card key={index} className="p-6">
								<p className="text-sm mb-4 italic">"{testimonial.text}"</p>
								<div className="flex items-center space-x-3">
									<div className="w-10 h-10 bg-gray-300 rounded-full"></div>
									<div>
										<p className="font-semibold text-sm">{testimonial.name}</p>
										<p className="text-xs text-muted-foreground">{testimonial.handle}</p>
									</div>
								</div>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Final CTA */}
			<section className="py-20 px-4 text-center bg-primary text-primary-foreground">
				<div className="container mx-auto max-w-4xl">
					<h2 className="text-4xl font-bold mb-8">Your Property Journey Begins Here. Dive into Endless Possibilities!</h2>
					<Button size="lg" variant="secondary" className="px-8">
						Explore Properties >
					</Button>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-muted/50 py-16 px-4">
				<div className="container mx-auto max-w-6xl">
					<div className="grid grid-cols-1 md:grid-cols-5 gap-8">
						<div className="col-span-1">
							<div className="flex items-center space-x-2 mb-4">
								<div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
									<Building className="w-5 h-5 text-primary-foreground" />
								</div>
								<span className="text-xl font-bold">Sensay.io</span>
							</div>
						</div>
						
						<div>
							<h4 className="font-semibold mb-4">Destinations</h4>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li>Beach Properties</li>
								<li>Historic Districts</li>
								<li>Urban Living</li>
								<li>Mountain Retreats</li>
								<li>Luxury Villas</li>
								<li>Investment Properties</li>
							</ul>
						</div>
						
						<div>
							<h4 className="font-semibold mb-4">Resources</h4>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li>Blog</li>
								<li>Property Guide</li>
								<li>Market Insights</li>
								<li>Investment Tips</li>
								<li>Property Types</li>
							</ul>
						</div>
						
						<div>
							<h4 className="font-semibold mb-4">Policies</h4>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li>Privacy</li>
								<li>Terms of Use</li>
								<li>Cookie Preferences</li>
							</ul>
						</div>
						
						<div>
							<h4 className="font-semibold mb-4">Newsletter</h4>
							<p className="text-sm text-muted-foreground mb-4">
								Join Our Community! Get exclusive property offers and market insights.
							</p>
							<div className="flex space-x-2">
								<input 
									type="email" 
									placeholder="you@domain.com" 
									className="flex-1 px-3 py-2 border border-input rounded-md text-sm"
								/>
								<Button size="sm">Subscribe</Button>
							</div>
						</div>
					</div>
					
					<div className="border-t mt-8 pt-8 flex justify-between items-center text-sm text-muted-foreground">
						<p>The source code is available on GitHub.</p>
						<Button size="icon" variant="outline" className="rounded-full">
							<Phone className="w-4 h-4" />
						</Button>
					</div>
				</div>
			</footer>
		</div>
	);
}
