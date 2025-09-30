import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
	Phone, 
	Mail, 
	MessageSquare, 
	Calendar,
	Clock,
	User,
	Building,
	MapPin,
	Bot
} from 'lucide-react';

export default function ContactAgent() {
	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-4xl mx-auto">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold mb-2">Contact Our AI Property Agents</h1>
					<p className="text-muted-foreground">
						Get personalized assistance from our AI-powered property experts
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{/* Contact Form */}
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<MessageSquare className="w-5 h-5" />
								Send a Message
							</CardTitle>
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
								<Label htmlFor="interest">Property Interest</Label>
								<Select>
									<SelectTrigger>
										<SelectValue placeholder="Select your interest" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="buy">Buying a Property</SelectItem>
										<SelectItem value="rent">Renting a Property</SelectItem>
										<SelectItem value="sell">Selling a Property</SelectItem>
										<SelectItem value="invest">Investment Property</SelectItem>
										<SelectItem value="consultation">General Consultation</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="space-y-2">
								<Label htmlFor="budget">Budget Range</Label>
								<Select>
									<SelectTrigger>
										<SelectValue placeholder="Select budget range" />
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
								<Label htmlFor="location">Preferred Location</Label>
								<Input id="location" placeholder="Barcelona, Spain" />
							</div>

							<div className="space-y-2">
								<Label htmlFor="message">Message</Label>
								<Textarea 
									id="message" 
									placeholder="Tell us about your property needs, preferences, and any specific requirements..."
									className="min-h-[120px]"
								/>
							</div>

							<Button className="w-full" size="lg">
								Send Message
							</Button>
						</CardContent>
					</Card>

					{/* Contact Options */}
					<div className="space-y-6">
						{/* AI Assistant Chat */}
						<Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Bot className="w-5 h-5 text-primary" />
									AI Assistant Chat
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-muted-foreground mb-4">
									Chat with our AI assistant for instant answers to your property questions.
								</p>
								<Button className="w-full">
									Start AI Chat
								</Button>
							</CardContent>
						</Card>

						{/* Direct Contact */}
						<Card>
							<CardHeader>
								<CardTitle>Direct Contact</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-center gap-3">
									<div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
										<Phone className="w-5 h-5 text-primary-foreground" />
									</div>
									<div>
										<p className="font-medium">Call Us</p>
										<p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
									</div>
								</div>

								<div className="flex items-center gap-3">
									<div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
										<Mail className="w-5 h-5 text-primary-foreground" />
									</div>
									<div>
										<p className="font-medium">Email Us</p>
										<p className="text-sm text-muted-foreground">hello@sensay.io</p>
									</div>
								</div>

								<div className="flex items-center gap-3">
									<div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
										<MessageSquare className="w-5 h-5 text-primary-foreground" />
									</div>
									<div>
										<p className="font-medium">Live Chat</p>
										<p className="text-sm text-muted-foreground">Available 24/7</p>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Schedule Meeting */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Calendar className="w-5 h-5" />
									Schedule a Meeting
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-muted-foreground mb-4">
									Book a personalized consultation with our property experts.
								</p>
								<div className="space-y-3">
									<Button variant="outline" className="w-full justify-start">
										<Calendar className="w-4 h-4 mr-2" />
										Video Call (30 min)
									</Button>
									<Button variant="outline" className="w-full justify-start">
										<MapPin className="w-4 h-4 mr-2" />
										In-Person Meeting
									</Button>
									<Button variant="outline" className="w-full justify-start">
										<Phone className="w-4 h-4 mr-2" />
										Phone Consultation
									</Button>
								</div>
							</CardContent>
						</Card>

						{/* Business Hours */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Clock className="w-5 h-5" />
									Business Hours
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-2 text-sm">
									<div className="flex justify-between">
										<span>Monday - Friday</span>
										<span>9:00 AM - 6:00 PM</span>
									</div>
									<div className="flex justify-between">
										<span>Saturday</span>
										<span>10:00 AM - 4:00 PM</span>
									</div>
									<div className="flex justify-between">
										<span>Sunday</span>
										<span>Closed</span>
									</div>
								</div>
								<div className="mt-4 p-3 bg-muted/50 rounded-lg">
									<p className="text-xs text-muted-foreground">
										<strong>Note:</strong> AI Assistant is available 24/7 for instant responses to your queries.
									</p>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
