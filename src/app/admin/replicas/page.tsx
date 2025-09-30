import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
	Plus, 
	Edit, 
	Trash2, 
	Bot, 
	Settings,
	Activity,
	Users,
	MessageSquare,
	RefreshCw,
	Play,
	Pause,
	MoreVertical
} from 'lucide-react';

export default function ReplicasManagement() {
	const replicas = [
		{
			id: 1,
			name: "Property Assistant Pro",
			type: "Real Estate Agent",
			status: "Active",
			conversations: 1247,
			lastActive: "2 hours ago",
			accuracy: 94.5,
			description: "Specialized AI assistant for property search and recommendations"
		},
		{
			id: 2,
			name: "Investment Advisor",
			type: "Financial Advisor",
			status: "Active",
			conversations: 892,
			lastActive: "1 hour ago",
			accuracy: 91.2,
			description: "AI assistant for property investment analysis and market insights"
		},
		{
			id: 3,
			name: "Legal Consultant",
			type: "Legal Assistant",
			status: "Inactive",
			conversations: 456,
			lastActive: "3 days ago",
			accuracy: 88.7,
			description: "Legal guidance for property transactions and contracts"
		},
		{
			id: 4,
			name: "Customer Support",
			type: "Support Agent",
			status: "Active",
			conversations: 2134,
			lastActive: "30 minutes ago",
			accuracy: 96.1,
			description: "General customer support and platform assistance"
		}
	];

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="flex items-center justify-between mb-8">
				<div>
					<h1 className="text-3xl font-bold mb-2">Replicas Management</h1>
					<p className="text-muted-foreground">Manage your AI replicas and their configurations</p>
				</div>
				<div className="flex gap-2">
					<Button variant="outline">
						<RefreshCw className="w-4 h-4 mr-2" />
						Refresh
					</Button>
					<Button>
						<Plus className="w-4 h-4 mr-2" />
						Create Replica
					</Button>
				</div>
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
				<Card>
					<CardContent className="p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-muted-foreground">Total Replicas</p>
								<p className="text-2xl font-bold">{replicas.length}</p>
							</div>
							<Bot className="w-8 h-8 text-primary" />
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-muted-foreground">Active Replicas</p>
								<p className="text-2xl font-bold">{replicas.filter(r => r.status === 'Active').length}</p>
							</div>
							<Activity className="w-8 h-8 text-green-500" />
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-muted-foreground">Total Conversations</p>
								<p className="text-2xl font-bold">{replicas.reduce((sum, r) => sum + r.conversations, 0).toLocaleString()}</p>
							</div>
							<MessageSquare className="w-8 h-8 text-blue-500" />
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-muted-foreground">Avg. Accuracy</p>
								<p className="text-2xl font-bold">
									{(replicas.reduce((sum, r) => sum + r.accuracy, 0) / replicas.length).toFixed(1)}%
								</p>
							</div>
							<Users className="w-8 h-8 text-purple-500" />
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Replicas List */}
			<Card>
				<CardHeader>
					<CardTitle>AI Replicas</CardTitle>
				</CardHeader>
				<CardContent className="p-0">
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead>
								<tr className="border-b">
									<th className="text-left p-4 font-semibold">Replica</th>
									<th className="text-left p-4 font-semibold">Type</th>
									<th className="text-left p-4 font-semibold">Status</th>
									<th className="text-left p-4 font-semibold">Conversations</th>
									<th className="text-left p-4 font-semibold">Accuracy</th>
									<th className="text-left p-4 font-semibold">Last Active</th>
									<th className="text-left p-4 font-semibold">Actions</th>
								</tr>
							</thead>
							<tbody>
								{replicas.map((replica) => (
									<tr key={replica.id} className="border-b hover:bg-muted/50">
										<td className="p-4">
											<div className="flex items-center gap-3">
												<div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
													<Bot className="w-5 h-5 text-primary-foreground" />
												</div>
												<div>
													<p className="font-semibold">{replica.name}</p>
													<p className="text-sm text-muted-foreground">{replica.description}</p>
												</div>
											</div>
										</td>
										<td className="p-4">
											<Badge variant="outline">{replica.type}</Badge>
										</td>
										<td className="p-4">
											<Badge 
												variant={replica.status === 'Active' ? 'default' : 'secondary'}
												className={replica.status === 'Active' ? 'bg-green-500' : ''}
											>
												{replica.status}
											</Badge>
										</td>
										<td className="p-4">
											<span className="font-medium">{replica.conversations.toLocaleString()}</span>
										</td>
										<td className="p-4">
											<div className="flex items-center gap-2">
												<div className="w-16 bg-gray-200 rounded-full h-2">
													<div 
														className="bg-primary h-2 rounded-full" 
														style={{ width: `${replica.accuracy}%` }}
													></div>
												</div>
												<span className="text-sm font-medium">{replica.accuracy}%</span>
											</div>
										</td>
										<td className="p-4">
											<span className="text-sm text-muted-foreground">{replica.lastActive}</span>
										</td>
										<td className="p-4">
											<div className="flex items-center gap-2">
												<Button size="sm" variant="ghost">
													<Edit className="w-4 h-4" />
												</Button>
												<Button size="sm" variant="ghost">
													<Settings className="w-4 h-4" />
												</Button>
												<Button size="sm" variant="ghost">
													{replica.status === 'Active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
												</Button>
												<Button size="sm" variant="ghost">
													<MoreVertical className="w-4 h-4" />
												</Button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</CardContent>
			</Card>

			{/* Quick Actions */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
				<Card className="cursor-pointer hover:shadow-lg transition-shadow">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Plus className="w-5 h-5 text-primary" />
							Create New Replica
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-sm text-muted-foreground mb-4">
							Create a new AI replica with custom personality and knowledge base.
						</p>
						<Button className="w-full">
							Get Started
						</Button>
					</CardContent>
				</Card>

				<Card className="cursor-pointer hover:shadow-lg transition-shadow">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Settings className="w-5 h-5 text-primary" />
							Bulk Configuration
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-sm text-muted-foreground mb-4">
							Configure multiple replicas at once with batch settings.
						</p>
						<Button variant="outline" className="w-full">
							Configure
						</Button>
					</CardContent>
				</Card>

				<Card className="cursor-pointer hover:shadow-lg transition-shadow">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Activity className="w-5 h-5 text-primary" />
							Analytics Dashboard
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-sm text-muted-foreground mb-4">
							View detailed analytics and performance metrics for all replicas.
						</p>
						<Button variant="outline" className="w-full">
							View Analytics
						</Button>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
