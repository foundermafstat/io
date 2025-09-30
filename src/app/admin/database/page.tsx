import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
	Database, 
	Server, 
	Users, 
	MessageSquare,
	Settings,
	RefreshCw,
	Play,
	Pause,
	AlertTriangle,
	CheckCircle,
	Clock,
	Download,
	Upload,
	Trash2,
	Eye,
	Edit
} from 'lucide-react';

export default function DatabaseManagement() {
	const databaseStats = {
		totalTables: 12,
		totalRecords: 1250000,
		databaseSize: "2.3 GB",
		lastBackup: "2 hours ago",
		activeConnections: 45,
		avgResponseTime: "12ms"
	};

	const tables = [
		{
			name: "properties",
			records: 45000,
			size: "850 MB",
			lastUpdated: "1 hour ago",
			status: "Active"
		},
		{
			name: "users",
			records: 12500,
			size: "120 MB",
			lastUpdated: "30 minutes ago",
			status: "Active"
		},
		{
			name: "conversations",
			records: 89000,
			size: "1.2 GB",
			lastUpdated: "15 minutes ago",
			status: "Active"
		},
		{
			name: "replicas",
			records: 1250,
			size: "45 MB",
			lastUpdated: "2 hours ago",
			status: "Active"
		},
		{
			name: "training_data",
			records: 67000,
			size: "950 MB",
			lastUpdated: "3 hours ago",
			status: "Maintenance"
		},
		{
			name: "analytics",
			records: 234000,
			size: "180 MB",
			lastUpdated: "1 hour ago",
			status: "Active"
		}
	];

	const getStatusIcon = (status: string) => {
		switch (status) {
			case 'Active':
				return <CheckCircle className="w-4 h-4 text-green-500" />;
			case 'Maintenance':
				return <Clock className="w-4 h-4 text-yellow-500" />;
			case 'Error':
				return <AlertTriangle className="w-4 h-4 text-red-500" />;
			default:
				return <Clock className="w-4 h-4 text-gray-500" />;
		}
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="flex items-center justify-between mb-8">
				<div>
					<h1 className="text-3xl font-bold mb-2">Database Management</h1>
					<p className="text-muted-foreground">Monitor and manage your database infrastructure</p>
				</div>
				<div className="flex gap-2">
					<Button variant="outline">
						<RefreshCw className="w-4 h-4 mr-2" />
						Refresh
					</Button>
					<Button>
						<Database className="w-4 h-4 mr-2" />
						Backup Now
					</Button>
				</div>
			</div>

			{/* Database Overview Stats */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
				<Card>
					<CardContent className="p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-muted-foreground">Tables</p>
								<p className="text-2xl font-bold">{databaseStats.totalTables}</p>
							</div>
							<Database className="w-8 h-8 text-primary" />
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-muted-foreground">Total Records</p>
								<p className="text-2xl font-bold">{(databaseStats.totalRecords / 1000000).toFixed(1)}M</p>
							</div>
							<Users className="w-8 h-8 text-blue-500" />
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-muted-foreground">Database Size</p>
								<p className="text-2xl font-bold">{databaseStats.databaseSize}</p>
							</div>
							<Server className="w-8 h-8 text-green-500" />
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-muted-foreground">Last Backup</p>
								<p className="text-2xl font-bold">{databaseStats.lastBackup}</p>
							</div>
							<Download className="w-8 h-8 text-purple-500" />
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-muted-foreground">Connections</p>
								<p className="text-2xl font-bold">{databaseStats.activeConnections}</p>
							</div>
							<MessageSquare className="w-8 h-8 text-orange-500" />
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-muted-foreground">Response Time</p>
								<p className="text-2xl font-bold">{databaseStats.avgResponseTime}</p>
							</div>
							<Settings className="w-8 h-8 text-red-500" />
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Database Tables */}
			<Card className="mb-8">
				<CardHeader>
					<CardTitle>Database Tables</CardTitle>
				</CardHeader>
				<CardContent className="p-0">
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead>
								<tr className="border-b">
									<th className="text-left p-4 font-semibold">Table Name</th>
									<th className="text-left p-4 font-semibold">Records</th>
									<th className="text-left p-4 font-semibold">Size</th>
									<th className="text-left p-4 font-semibold">Status</th>
									<th className="text-left p-4 font-semibold">Last Updated</th>
									<th className="text-left p-4 font-semibold">Actions</th>
								</tr>
							</thead>
							<tbody>
								{tables.map((table) => (
									<tr key={table.name} className="border-b hover:bg-muted/50">
										<td className="p-4">
											<div className="flex items-center gap-3">
												<div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
													<Database className="w-4 h-4 text-primary-foreground" />
												</div>
												<span className="font-mono font-medium">{table.name}</span>
											</div>
										</td>
										<td className="p-4">
											<span className="font-medium">{table.records.toLocaleString()}</span>
										</td>
										<td className="p-4">
											<span className="text-sm text-muted-foreground">{table.size}</span>
										</td>
										<td className="p-4">
											<div className="flex items-center gap-2">
												{getStatusIcon(table.status)}
												<span className="text-sm font-medium">{table.status}</span>
											</div>
										</td>
										<td className="p-4">
											<span className="text-sm text-muted-foreground">{table.lastUpdated}</span>
										</td>
										<td className="p-4">
											<div className="flex items-center gap-2">
												<Button size="sm" variant="ghost">
													<Eye className="w-4 h-4" />
												</Button>
												<Button size="sm" variant="ghost">
													<Edit className="w-4 h-4" />
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

			{/* Database Operations */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Database className="w-5 h-5 text-primary" />
							Database Backup
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<p className="text-sm text-muted-foreground">
							Create a full backup of your database for safety and recovery purposes.
						</p>
						<div className="space-y-2">
							<Label htmlFor="backup-name">Backup Name</Label>
							<Input id="backup-name" placeholder="backup_2024_01_22" />
						</div>
						<div className="space-y-2">
							<Label htmlFor="backup-description">Description</Label>
							<Textarea 
								id="backup-description" 
								placeholder="Optional description..."
								className="min-h-[80px]"
							/>
						</div>
						<Button className="w-full">
							<Download className="w-4 h-4 mr-2" />
							Create Backup
						</Button>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Upload className="w-5 h-5 text-primary" />
							Database Restore
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<p className="text-sm text-muted-foreground">
							Restore your database from a previous backup file.
						</p>
						<div className="space-y-2">
							<Label htmlFor="backup-file">Select Backup File</Label>
							<Input id="backup-file" type="file" accept=".sql,.backup" />
						</div>
						<div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
							<div className="flex items-center gap-2">
								<AlertTriangle className="w-4 h-4 text-yellow-600" />
								<p className="text-sm text-yellow-800">
									Warning: This will overwrite current data
								</p>
							</div>
						</div>
						<Button variant="outline" className="w-full">
							<Upload className="w-4 h-4 mr-2" />
							Restore Database
						</Button>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Settings className="w-5 h-5 text-primary" />
							Database Optimization
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<p className="text-sm text-muted-foreground">
							Optimize database performance and clean up unused data.
						</p>
						<div className="space-y-3">
							<Button variant="outline" className="w-full justify-start">
								<RefreshCw className="w-4 h-4 mr-2" />
								Optimize Tables
							</Button>
							<Button variant="outline" className="w-full justify-start">
								<Trash2 className="w-4 h-4 mr-2" />
								Clean Old Data
							</Button>
							<Button variant="outline" className="w-full justify-start">
								<Settings className="w-4 h-4 mr-2" />
								Rebuild Indexes
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
