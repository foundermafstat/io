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
import { LanguageSwitcher } from './language-switcher';
import { useTranslations } from './translations-context';

function HeaderInner() {
	const pathname = usePathname();
	const [playerName] = useState('User');
	const { isChatVisible, toggleChat } = useChatVisibility();
	const { t } = useTranslations();

	// Navigation items divided by categories

	// Real Estate Application Menu
	const realEstateItems = [
		{ name: t('header.browseProperties'), path: '/real-estate/browse' },
		{ name: t('header.smartSearch'), path: '/real-estate/search' },
		{ name: t('header.compareProperties'), path: '/real-estate/compare' },
		{ name: t('header.contactAgent'), path: '/real-estate/contact' },
		{ name: t('header.bookViewing'), path: '/real-estate/booking' },
	];

	// Admin Panel Menu
	const adminItems = [
		{ name: t('header.replicasManagement'), path: '/admin/replicas' },
		{ name: t('header.aiTraining'), path: '/admin/training' },
		{ name: t('header.databaseManagement'), path: '/admin/database' },
		{ name: t('header.settings'), path: '/admin/settings' },
	];

	// Development items (replica management and tools)
	const developmentItems = [
		{ name: t('header.replicasManagement'), path: '/replicas' },
		{ name: t('header.aiTraining'), path: '/training' },
		{ name: t('header.databaseManagement'), path: '/admin/database' },
		{ name: t('header.settings'), path: '/admin/settings' },
		{ name: t('header.apiKeys'), path: '/api-keys' },
		{ name: t('header.chatHistory'), path: '/chat-history' },
		{ name: t('header.experimentalApi'), path: '/experimental' },
	];

	const { headerState } = useHeader();
	return (
		<header className="border-b bg-background text-foreground">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-4">
					<div className="w-20 h-20 bg-white flex items-center justify-center">
						<img src="/io-logo.png" alt="IO Logo" className="w-12 h-12" />
					</div>

					<nav className="hidden md:flex items-center gap-6">
						<Link
							href="/"
							className={`text-sm font-medium transition-colors hover:text-primary ${
								pathname === '/' ? 'text-primary' : 'text-foreground'
							}`}
						>
							{t('header.home')}
						</Link>
						<Link
							href="http://localhost:3000/catalog"
							className={`text-sm font-medium transition-colors hover:text-primary ${
								pathname === '/catalog' ? 'text-primary' : 'text-foreground'
							}`}
						>
							{t('header.catalog')}
						</Link>

						{/* Dropdown menu for Real Estate Application */}
						{/* <DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									className="flex items-center gap-1 text-foreground hover:bg-accent hover:text-accent-foreground px-2 py-1 h-auto"
								>
									<span className="text-sm font-medium">
										{t('header.realEstate')}
									</span>
									<ChevronDown size={14} />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuLabel>
									{t('header.propertySearch')}
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								{realEstateItems.map((item) => (
									<DropdownMenuItem key={item.path} asChild>
										<Link
											href={item.path}
											className={pathname === item.path ? 'bg-accent' : ''}
										>
											{item.name}
										</Link>
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu> */}

						{/* Dropdown menu for Admin Panel */}
						{/* <DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									className="flex items-center gap-1 text-foreground hover:bg-accent hover:text-accent-foreground px-2 py-1 h-auto"
								>
									<span className="text-sm font-medium">
										{t('header.adminPanel')}
									</span>
									<ChevronDown size={14} />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuLabel>
									{t('header.systemManagement')}
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								{adminItems.map((item) => (
									<DropdownMenuItem key={item.path} asChild>
										<Link
											href={item.path}
											className={pathname === item.path ? 'bg-accent' : ''}
										>
											{item.name}
										</Link>
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu> */}

						{/* Dropdown menu for Development Tools */}
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									className="flex items-center gap-1 text-foreground hover:bg-accent hover:text-accent-foreground px-2 py-1 h-auto"
								>
									<span className="text-sm font-medium">
										{t('header.development')}
									</span>
									<ChevronDown size={14} />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuLabel>
									{t('header.developmentTools')}
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								{developmentItems.map((item) => (
									<DropdownMenuItem key={item.path} asChild>
										<Link
											href={item.path}
											className={pathname === item.path ? 'bg-accent' : ''}
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
						title={
							isChatVisible
								? t('header.hideAiAssistant')
								: t('header.showAiAssistant')
						}
					>
						<MessageSquare
							className={isChatVisible ? 'text-primary' : 'text-white'}
						/>
					</Button>

					<ModeToggle />

					<LanguageSwitcher />

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
	const { t } = useTranslations();

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
							? t('header.loadingReplicas')
							: selectedReplica
							? selectedReplica.name
							: t('header.selectReplica')}
					</span>
					<ChevronDown size={14} />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>{t('header.activeReplica')}</DropdownMenuLabel>
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
								selectedReplicaUuid === replica.uuid ? 'bg-accent' : ''
							}
						>
							{replica.name}
							<span className="ml-2 text-xs opacity-70">({replica.type})</span>
						</DropdownMenuItem>
					))
				) : (
					<DropdownMenuItem disabled>
						{t('header.noReplicasAvailable')}
					</DropdownMenuItem>
				)}

				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={refreshReplicas}>
					<RefreshCcw className="h-4 w-4 mr-2" />
					{t('header.refreshReplicas')}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default HeaderInner;
