'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ModeToggle } from './mode-toggle';
import { Button } from '@/components/ui/button';
import {
	MessageSquare,
	User,
	ChevronDown,
	Award,
	LogOut,
	Settings,
	Database,
	History,
	LayoutGrid,
	RefreshCcw,
	Bot,
} from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useHeader } from '@/components/header-context';
import { useReplica } from './replica-context';
import { useChatVisibility } from './chat-context';
import { Skeleton } from '@/components/ui/skeleton';

function HeaderInner() {
	const pathname = usePathname();
	const [playerName] = useState('User');
	const { isChatVisible, toggleChat } = useChatVisibility();

	// Navigation items divided by categories

	// Real Estate Application Menu
	const realEstateItems = [
		{ name: 'Browse Properties', path: '/real-estate/browse' },
		{ name: 'Smart Search', path: '/real-estate/search' },
		{ name: 'Compare Properties', path: '/real-estate/compare' },
		{ name: 'Contact Agent', path: '/real-estate/contact' },
		{ name: 'Book Viewing', path: '/real-estate/booking' },
	];

	// Admin Panel Menu
	const adminItems = [
		{ name: 'Replicas Management', path: '/admin/replicas' },
		{ name: 'AI Training', path: '/admin/training' },
		{ name: 'Database Management', path: '/admin/database' },
		{ name: 'Settings', path: '/admin/settings' },
	];

	// Legacy items (keeping for backward compatibility)
	const legacyItems = [
		{ name: 'API Keys', path: '/api-keys' },
		{ name: 'Chat History', path: '/chat-history' },
		{ name: 'Experimental API', path: '/experimental' },
	];

	const { headerState } = useHeader();
	return (
		<header className="border-b bg-background text-foreground">
			<div className="px-4 py-3 flex items-center justify-between">
				<div className="flex items-center gap-4">
					<h1 className="text-xl font-bold">IO</h1>

					<nav className="hidden md:flex items-center gap-6">
						<Link
							href="/"
							className={`text-sm font-medium transition-colors hover:text-primary ${
								pathname === '/' ? 'text-primary' : 'text-foreground'
							}`}
						>
							Home
						</Link>

						{/* Dropdown menu for Real Estate Application */}
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									className="flex items-center gap-1 text-foreground hover:bg-accent hover:text-accent-foreground px-2 py-1 h-auto"
								>
									<span className="text-sm font-medium">Real Estate</span>
									<ChevronDown size={14} />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuLabel>Property Search & Purchase</DropdownMenuLabel>
								<DropdownMenuSeparator />
								{realEstateItems.map((item) => (
									<DropdownMenuItem key={item.path} asChild>
										<Link
											href={item.path}
											className={
												pathname === item.path
													? 'bg-accent'
													: ''
											}
										>
											{item.name}
										</Link>
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>

						{/* Dropdown menu for Admin Panel */}
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									className="flex items-center gap-1 text-foreground hover:bg-accent hover:text-accent-foreground px-2 py-1 h-auto"
								>
									<span className="text-sm font-medium">Admin Panel</span>
									<ChevronDown size={14} />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuLabel>System Management</DropdownMenuLabel>
								<DropdownMenuSeparator />
								{adminItems.map((item) => (
									<DropdownMenuItem key={item.path} asChild>
										<Link
											href={item.path}
											className={
												pathname === item.path
													? 'bg-accent'
													: ''
											}
										>
											{item.name}
										</Link>
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>

						{/* Dropdown menu for Legacy/Development Tools */}
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									className="flex items-center gap-1 text-foreground hover:bg-accent hover:text-accent-foreground px-2 py-1 h-auto"
								>
									<span className="text-sm font-medium">Development</span>
									<ChevronDown size={14} />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuLabel>Development Tools</DropdownMenuLabel>
								<DropdownMenuSeparator />
								{legacyItems.map((item) => (
									<DropdownMenuItem key={item.path} asChild>
										<Link
											href={item.path}
											className={
												pathname === item.path
													? 'bg-accent'
													: ''
											}
										>
											{item.name}
										</Link>
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
					</nav>
				</div>

				<div className="flex items-center gap-3">
					<Button
						variant="ghost"
						size="icon"
						onClick={toggleChat}
						className="text-foreground hover:bg-accent hover:text-accent-foreground"
						title={isChatVisible ? 'Hide AI Assistant' : 'Show AI Assistant'}
					>
						<MessageSquare
							className={isChatVisible ? 'text-primary' : 'text-white'}
						/>
					</Button>

					<ModeToggle />

					{/* Replica Selection Dropdown */}
					<ReplicaDropdown />

					{/* <DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="ghost"
								className="flex items-center gap-2 text-foreground hover:bg-accent hover:text-accent-foreground"
							>
								<div className="flex items-center gap-2">
									<div className="bg-muted rounded-full p-1">
										<User size={16} />
									</div>
									<span className="hidden sm:inline">{playerName}</span>
									<div className="flex items-center gap-1 bg-muted rounded-full px-2 py-0.5 text-xs">
										<Award size={12} className="text-yellow-400" />
										<span>{playerLevel.level}</span>
									</div>
								</div>
								<ChevronDown size={16} />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-64">
							<DropdownMenuLabel>
								<div className="flex flex-col gap-1">
									<span>{playerName}</span>
									<div className="flex items-center gap-2 text-sm text-muted-foreground">
										<Award size={14} className="text-yellow-500" />
										<span>Level {playerLevel.level}</span>
									</div>
									<div className="mt-2 space-y-1">
										<div className="flex justify-between text-xs">
											<span>Experience</span>
											<span>
												{playerLevel.currentXP}/{playerLevel.requiredXP} XP
											</span>
										</div>
										<Progress
											value={progressPercentage}
											className="h-2 bg-muted"
											indicatorClassName="bg-primary"
										/>
									</div>
								</div>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<User className="mr-2 h-4 w-4" />
								<span>Profile</span>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Award className="mr-2 h-4 w-4" />
								<span>Achievements</span>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Settings className="mr-2 h-4 w-4" />
								<span>Settings</span>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<LogOut className="mr-2 h-4 w-4" />
								<span>Sign out</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu> */}
				</div>
			</div>
		</header>
	);
}

// Replica dropdown component for header
function ReplicaDropdown() {
	const {
		replicas,
		selectedReplicaUuid,
		setSelectedReplicaUuid,
		loading,
		refreshReplicas,
		selectedReplica,
	} = useReplica();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="flex items-center gap-1 text-foreground hover:bg-accent hover:text-accent-foreground px-2 py-1 h-auto"
				>
					<Bot size={14} className="mr-1" />
					<span className="text-sm font-medium">
						{loading
							? 'Loading replicas...'
							: selectedReplica
							? selectedReplica.name
							: 'Select Replica'}
					</span>
					<ChevronDown size={14} />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>Active Replica</DropdownMenuLabel>
				<DropdownMenuSeparator />

				{loading ? (
					<div className="px-2 py-1">
						<Skeleton className="h-5 w-full" />
						<Skeleton className="h-5 w-full mt-1" />
						<Skeleton className="h-5 w-full mt-1" />
					</div>
				) : replicas.length > 0 ? (
					replicas.map((replica) => (
						<DropdownMenuItem
							key={replica.uuid}
							onClick={() => setSelectedReplicaUuid(replica.uuid)}
							className={
								selectedReplicaUuid === replica.uuid
									? 'bg-accent'
									: ''
							}
						>
							{replica.name}
							<span className="ml-2 text-xs opacity-70">({replica.type})</span>
						</DropdownMenuItem>
					))
				) : (
					<DropdownMenuItem disabled>No replicas available</DropdownMenuItem>
				)}

				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={refreshReplicas}>
					<RefreshCcw className="h-4 w-4 mr-2" />
					Refresh Replicas
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default HeaderInner;
