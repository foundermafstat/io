import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { 
	Calendar as CalendarIcon, 
	Clock, 
	User, 
	MapPin,
	Home,
	CreditCard,
	CheckCircle,
	ArrowRight,
	Bot,
	MessageSquare
} from 'lucide-react';

export default function BookViewing() {
	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-4xl mx-auto">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold mb-2">Book Property Viewing</h1>
					<p className="text-muted-foreground">
						Schedule a viewing for your selected properties with our AI-powered booking system
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Property Selection */}
					<div className="lg:col-span-2 space-y-6">
						{/* Selected Properties */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Home className="w-5 h-5" />
									Selected Properties
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{[
										{
											id: 1,
											title: "Modern Apartment in Barcelona",
											location: "Barcelona, Spain",
											price: "€450,000",
											bedrooms: 2,
											bathrooms: 2,
											area: "85 sqm"
										},
										{
											id: 2,
											title: "Luxury Villa in Cancún",
											location: "Cancún, México", 
											price: "$850,000",
											bedrooms: 4,
											bathrooms: 3,
											area: "200 sqm"
										}
									].map((property) => (
										<div key={property.id} className="flex items-center gap-4 p-4 border rounded-lg">
											<div className="w-16 h-16 bg-gray-200 rounded"></div>
											<div className="flex-1">
												<h3 className="font-semibold">{property.title}</h3>
												<div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
													<MapPin className="w-3 h-3" />
													{property.location}
												</div>
												<div className="flex items-center gap-4 text-xs text-muted-foreground">
													<span>{property.bedrooms} bed</span>
													<span>{property.bathrooms} bath</span>
													<span>{property.area}</span>
												</div>
											</div>
											<div className="text-right">
												<p className="font-bold text-primary">{property.price}</p>
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>

						{/* Viewing Details Form */}
						<Card>
							<CardHeader>
								<CardTitle>Viewing Details</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label htmlFor="firstName">First Name</Label>
										<Input id="firstName" placeholder="John" />
									</div>
									<div className="space-y-2">
										<Label htmlFor="lastName">Last Name</Label>
										<Input id="lastName" placeholder="Doe" />
									</div>
								</div>

								<div className="space-y-2">
									<Label htmlFor="email">Email</Label>
									<Input id="email" type="email" placeholder="john@example.com" />
								</div>

								<div className="space-y-2">
									<Label htmlFor="phone">Phone Number</Label>
									<Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
								</div>

								<div className="space-y-2">
									<Label htmlFor="viewingType">Viewing Type</Label>
									<Select>
										<SelectTrigger>
											<SelectValue placeholder="Select viewing type" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="in-person">In-Person Viewing</SelectItem>
											<SelectItem value="virtual">Virtual Tour</SelectItem>
											<SelectItem value="both">Both Options</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div className="space-y-2">
									<Label htmlFor="preferredDate">Preferred Date</Label>
									<Input id="preferredDate" type="date" />
								</div>

								<div className="space-y-2">
									<Label htmlFor="preferredTime">Preferred Time</Label>
									<Select>
										<SelectTrigger>
											<SelectValue placeholder="Select time slot" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="morning">Morning (9:00 AM - 12:00 PM)</SelectItem>
											<SelectItem value="afternoon">Afternoon (12:00 PM - 5:00 PM)</SelectItem>
											<SelectItem value="evening">Evening (5:00 PM - 8:00 PM)</SelectItem>
											<SelectItem value="flexible">Flexible</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div className="space-y-2">
									<Label htmlFor="notes">Additional Notes</Label>
									<Input id="notes" placeholder="Any special requirements or questions..." />
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Sidebar */}
					<div className="space-y-6">
						{/* AI Assistant */}
						<Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Bot className="w-5 h-5 text-primary" />
									AI Assistant
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-muted-foreground mb-4">
									Need help choosing the best viewing time? Ask our AI assistant!
								</p>
								<Button variant="outline" className="w-full">
									<MessageSquare className="w-4 h-4 mr-2" />
									Chat with AI
								</Button>
							</CardContent>
						</Card>

						{/* Booking Summary */}
						<Card>
							<CardHeader>
								<CardTitle>Booking Summary</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-3">
									<div className="flex justify-between text-sm">
										<span>Properties Selected</span>
										<span>2</span>
									</div>
									<div className="flex justify-between text-sm">
										<span>Viewing Type</span>
										<span>In-Person</span>
									</div>
									<div className="flex justify-between text-sm">
										<span>Estimated Duration</span>
										<span>2-3 hours</span>
									</div>
									<div className="flex justify-between text-sm">
										<span>Agent Assignment</span>
										<span>AI + Human</span>
									</div>
								</div>

								<div className="border-t pt-4">
									<div className="flex justify-between font-semibold">
										<span>Total Cost</span>
										<span className="text-green-600">Free</span>
									</div>
									<p className="text-xs text-muted-foreground mt-1">
										Property viewings are complimentary
									</p>
								</div>
							</CardContent>
						</Card>

						{/* Available Time Slots */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<CalendarIcon className="w-5 h-5" />
									Available Slots
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-3">
									<div className="text-sm font-medium">Today</div>
									<div className="grid grid-cols-2 gap-2">
										<Button variant="outline" size="sm" className="text-xs">
											<Clock className="w-3 h-3 mr-1" />
											10:00 AM
										</Button>
										<Button variant="outline" size="sm" className="text-xs">
											<Clock className="w-3 h-3 mr-1" />
											2:00 PM
										</Button>
									</div>

									<div className="text-sm font-medium mt-4">Tomorrow</div>
									<div className="grid grid-cols-2 gap-2">
										<Button variant="outline" size="sm" className="text-xs">
											<Clock className="w-3 h-3 mr-1" />
											9:00 AM
										</Button>
										<Button variant="outline" size="sm" className="text-xs">
											<Clock className="w-3 h-3 mr-1" />
											3:00 PM
										</Button>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Book Now Button */}
						<Button size="lg" className="w-full">
							<CheckCircle className="w-4 h-4 mr-2" />
							Book Viewing
						</Button>
					</div>
				</div>

				{/* Next Steps */}
				<Card className="mt-8">
					<CardHeader>
						<CardTitle>What Happens Next?</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<div className="text-center">
								<div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
									<CheckCircle className="w-6 h-6 text-primary-foreground" />
								</div>
								<h3 className="font-semibold mb-2">1. Confirmation</h3>
								<p className="text-sm text-muted-foreground">
									You'll receive a confirmation email with viewing details and agent contact information.
								</p>
							</div>
							<div className="text-center">
								<div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
									<User className="w-6 h-6 text-primary-foreground" />
								</div>
								<h3 className="font-semibold mb-2">2. Agent Contact</h3>
								<p className="text-sm text-muted-foreground">
									Our AI-powered agent will contact you to confirm details and answer any questions.
								</p>
							</div>
							<div className="text-center">
								<div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
									<Home className="w-6 h-6 text-primary-foreground" />
								</div>
								<h3 className="font-semibold mb-2">3. Viewing</h3>
								<p className="text-sm text-muted-foreground">
									Enjoy your personalized property viewing with AI insights and expert guidance.
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
