'use client';

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import ChatTabs from './chat-tabs';
import { useChatVisibility } from './chat-context';
import { useChatTab } from './chat-tab-context';

interface ResizablePanelProps {
	children: React.ReactNode;
	className?: string;
	defaultWidth?: number;
	minWidth?: number;
	maxWidth?: number;
}

export default function ResizablePanel({
	children,
	className,
	defaultWidth = 300,
	minWidth = 250,
	maxWidth = 600,
}: ResizablePanelProps) {
	const [width, setWidth] = useState(defaultWidth);

	// Загружаем сохраненную ширину после монтирования на клиенте
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const savedWidth = localStorage.getItem('chat-panel-width');
			if (savedWidth) {
				const parsedWidth = parseInt(savedWidth, 10);
				if (parsedWidth >= minWidth && parsedWidth <= maxWidth) {
					setWidth(parsedWidth);
				}
			}
		}
	}, []);
	const [isResizing, setIsResizing] = useState(false);
	const { activeTab, isHydrated } = useChatTab();
	const resizableRef = useRef<HTMLDivElement>(null);
	const { isChatVisible } = useChatVisibility();

	// Сохраняем ширину панели в localStorage при изменении
	useEffect(() => {
		if (typeof window !== 'undefined') {
			localStorage.setItem('chat-panel-width', width.toString());
		}
	}, [width]);

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (!isResizing || activeTab === 'voice') return;

			// Calculate new width based on mouse position from the right side
			const newWidth = window.innerWidth - e.clientX;

			// Apply constraints
			if (newWidth >= minWidth && newWidth <= maxWidth) {
				setWidth(newWidth);
			}
		};

		const handleMouseUp = () => {
			setIsResizing(false);
			document.body.style.cursor = 'default';
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseup', handleMouseUp);
		};

		if (isResizing) {
			window.addEventListener('mousemove', handleMouseMove);
			window.addEventListener('mouseup', handleMouseUp);
			document.body.style.cursor = 'ew-resize';
		}

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseup', handleMouseUp);
		};
	}, [isResizing, activeTab, minWidth, maxWidth]);

	// Start resizing when the handle is clicked
	const startResizing = () => {
		// Блокируем ресайз при активном voice-табе
		if (activeTab === 'voice') {
			return;
		}
		setIsResizing(true);
	};

	if (!isChatVisible) {
		return <div className="w-full h-full overflow-auto">{children}</div>;
	}

	return (
		<div className="flex h-full w-full">
			{/* Main content */}
			<div className="flex-1 h-full overflow-auto">{children}</div>

			{/* Resizable chat panel on the right */}
			<div
				ref={resizableRef}
				className={cn('h-full relative border-l border-border', className)}
				style={{
					width: `${width}px`,
					minWidth: `${minWidth}px`,
					maxWidth: `${maxWidth}px`,
				}}
			>
				{/* Resize handle */}
				<div
					className={cn(
						"absolute top-0 left-0 w-1 h-full bg-border hover:bg-accent",
						(!isHydrated || activeTab === 'voice') ? "cursor-not-allowed" : "cursor-ew-resize"
					)}
					onMouseDown={startResizing}
				/>
				<ChatTabs />
			</div>
		</div>
	);
}
