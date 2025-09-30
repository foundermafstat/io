import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
	Upload, 
	Brain, 
	FileText, 
	Clock,
	CheckCircle,
	AlertCircle,
	Play,
	Pause,
	Trash2,
	Download,
	Eye,
	BarChart3
} from 'lucide-react';

export default function TrainingManagement() {
	const trainingData = [
		{
			id: 1,
			name: "Property Knowledge Base v2.1",
			type: "Real Estate Data",
			status: "Completed",
			progress: 100,
			uploadedAt: "2024-01-15",
			size: "2.3 GB",
			records: 125000,
			accuracy: 96.8
		},
		{
			id: 2,
			name: "Market Analysis Dataset",
			type: "Market Data",
			status: "Training",
			progress: 67,
			uploadedAt: "2024-01-20",
			size: "1.8 GB",
			records: 89000,
			accuracy: 92.3
		},
		{
			id: 3,
			name: "Legal Documents Corpus",
			type: "Legal Documents",
			status: "Pending",
			progress: 0,
			uploadedAt: "2024-01-22",
			size: "850 MB",
			records: 45000,
			accuracy: 0
		},
		{
			id: 4,
			name: "Customer Interactions Log",
			type: "Conversation Data",
			status: "Failed",
			progress: 23,
			uploadedAt: "2024-01-18",
			size: "1.2 GB",
			records: 67000,
			accuracy: 78.5
		}
	];

	const getStatusIcon = (status: string) => {
		switch (status) {
			case 'Completed':
				return <CheckCircle className="w-4 h-4 text-green-500" />;
			case 'Training':
				return <Brain className="w-4 h-4 text-blue-500 animate-pulse" />;
			case 'Pending':
				return <Clock className="w-4 h-4 text-yellow-500" />;
			case 'Failed':
				return <AlertCircle className="w-4 h-4 text-red-500" />;
			default:
				return <Clock className="w-4 h-4 text-gray-500" />;
		}
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'Completed':
				return 'bg-green-500';
			case 'Training':
				return 'bg-blue-500';
			case 'Pending':
				return 'bg-yellow-500';
			case 'Failed':
				return 'bg-red-500';
			default:
				return 'bg-gray-500';
		}
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="flex items-center justify-between mb-8">
				<div>
					<h1 className="text-3xl font-bold mb-2">AI Training Management</h1>
					<p className="text-muted-foreground">Manage training data and model training processes</p>
				</div>
				<Button>
					<Upload className="w-4 h-4 mr-2" />
					Upload Training Data
				</Button>
			</div>

			{/* Stats Overview */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
				<Card>
					<CardContent className="p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-muted-foreground">Total Datasets</p>
								<p className="text-2xl font-bold">{trainingData.length}</p>
							</div>
							<FileText className="w-8 h-8 text-primary" />
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-muted-foreground">Completed</p>
								<p className="text-2xl font-bold">{trainingData.filter(d => d.status === 'Completed').length}</p>
							</div>
							<CheckCircle className="w-8 h-8 text-green-500" />
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-muted-foreground">In Training</p>
								<p className="text-2xl font-bold">{trainingData.filter(d => d.status === 'Training').length}</p>
							</div>
							<Brain className="w-8 h-8 text-blue-500" />
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-muted-foreground">Total Records</p>
								<p className="text-2xl font-bold">{trainingData.reduce((sum, d) => sum + d.records, 0).toLocaleString()}</p>
							</div>
							<BarChart3 className="w-8 h-8 text-purple-500" />
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Training Data List */}
			<Card>
				<CardHeader>
					<CardTitle>Training Datasets</CardTitle>
				</CardHeader>
				<CardContent className="p-0">
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead>
								<tr className="border-b">
									<th className="text-left p-4 font-semibold">Dataset</th>
									<th className="text-left p-4 font-semibold">Type</th>
									<th className="text-left p-4 font-semibold">Status</th>
									<th className="text-left p-4 font-semibold">Progress</th>
									<th className="text-left p-4 font-semibold">Records</th>
									<th className="text-left p-4 font-semibold">Accuracy</th>
									<th className="text-left p-4 font-semibold">Size</th>
									<th className="text-left p-4 font-semibold">Actions</th>
								</tr>
							</thead>
							<tbody>
								{trainingData.map((dataset) => (
									<tr key={dataset.id} className="border-b hover:bg-muted/50">
										<td className="p-4">
											<div className="flex items-center gap-3">
												<div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
													<FileText className="w-5 h-5 text-primary-foreground" />
												</div>
												<div>
													<p className="font-semibold">{dataset.name}</p>
													<p className="text-sm text-muted-foreground">
														Uploaded: {dataset.uploadedAt}
													</p>
												</div>
											</div>
										</td>
										<td className="p-4">
											<Badge variant="outline">{dataset.type}</Badge>
										</td>
										<td className="p-4">
											<div className="flex items-center gap-2">
												{getStatusIcon(dataset.status)}
												<span className="text-sm font-medium">{dataset.status}</span>
											</div>
										</td>
										<td className="p-4">
											<div className="flex items-center gap-2">
												<Progress 
													value={dataset.progress} 
													className="w-20 h-2"
												/>
												<span className="text-sm font-medium">{dataset.progress}%</span>
											</div>
										</td>
										<td className="p-4">
											<span className="font-medium">{dataset.records.toLocaleString()}</span>
										</td>
										<td className="p-4">
											<span className="font-medium">{dataset.accuracy}%</span>
										</td>
										<td className="p-4">
											<span className="text-sm text-muted-foreground">{dataset.size}</span>
										</td>
										<td className="p-4">
											<div className="flex items-center gap-2">
												{dataset.status === 'Training' ? (
													<Button size="sm" variant="ghost">
														<Pause className="w-4 h-4" />
													</Button>
												) : dataset.status === 'Pending' ? (
													<Button size="sm" variant="ghost">
														<Play className="w-4 h-4" />
													</Button>
												) : (
													<Button size="sm" variant="ghost">
														<Play className="w-4 h-4" />
													</Button>
												)}
												<Button size="sm" variant="ghost">
													<Eye className="w-4 h-4" />
												</Button>
												<Button size="sm" variant="ghost">
													<Download className="w-4 h-4" />
												</Button>
												<Button size="sm" variant="ghost">
													<Trash2 className="w-4 h-4" />
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

			{/* Training Actions */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
				<Card className="cursor-pointer hover:shadow-lg transition-shadow">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Upload className="w-5 h-5 text-primary" />
							Upload New Dataset
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-sm text-muted-foreground mb-4">
							Upload new training data to improve AI model performance.
						</p>
						<Button className="w-full">
							Upload Files
						</Button>
					</CardContent>
				</Card>

				<Card className="cursor-pointer hover:shadow-lg transition-shadow">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Brain className="w-5 h-5 text-primary" />
							Start Training
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-sm text-muted-foreground mb-4">
							Start training process for pending datasets.
						</p>
						<Button variant="outline" className="w-full">
							Begin Training
						</Button>
					</CardContent>
				</Card>

				<Card className="cursor-pointer hover:shadow-lg transition-shadow">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<BarChart3 className="w-5 h-5 text-primary" />
							Training Analytics
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-sm text-muted-foreground mb-4">
							View detailed training metrics and performance analytics.
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
