'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Building, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from '@/components/translations-context';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function SiteHeader() {
	const { t } = useTranslations();
	const [isDevelopmentOpen, setIsDevelopmentOpen] = useState(false);

	return (
		<header className="flex items-center justify-between py-4">
			<div className="flex items-center space-x-2">
				<div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
					<Building className="w-5 h-5 text-primary-foreground" />
				</div>
				<span className="text-xl font-bold text-foreground">Sensay.io</span>
			</div>
			<nav className="hidden md:flex items-center space-x-6">
				<Link href="/" className="text-sm font-medium hover:text-primary">
					{t('header.home')}
				</Link>
				<Link
					href="http://localhost:3000/catalog"
					className="text-sm font-medium hover:text-primary"
				>
					{t('header.catalog')}
				</Link>
				<DropdownMenu
					open={isDevelopmentOpen}
					onOpenChange={setIsDevelopmentOpen}
				>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="flex items-center space-x-1">
							<span>{t('header.development')}</span>
							<ChevronDown className="w-4 h-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="w-56">
						<DropdownMenuItem asChild>
							<Link href="/replicas" className="w-full">
								{t('header.replicasManagement')}
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<Link href="/training" className="w-full">
								{t('header.aiTraining')}
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<Link href="/admin/database" className="w-full">
								{t('header.databaseManagement')}
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<Link href="/admin/settings" className="w-full">
								{t('header.settings')}
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<Link href="/api-keys" className="w-full">
								{t('header.apiKeys')}
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<Link href="/chat-history" className="w-full">
								{t('header.chatHistory')}
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<Link href="/experimental" className="w-full">
								{t('header.experimentalApi')}
							</Link>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
				<Button variant="ghost" size="sm">
					Sign In
				</Button>
			</nav>
		</header>
	);
}
