import type React from 'react';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/header';
import ChatProvider from '@/components/chat-provider';
import { ChatProvider as ChatVisibilityProvider } from '@/components/chat-context';
import { ChatTabProvider } from '@/components/chat-tab-context';
import { BroadcastProvider } from '@/components/broadcast-context';
import ReplicaProvider from '@/components/replica-provider';
import ResizablePanel from '@/components/resizable-panel';
import { TranslationsProvider } from '@/components/translations-context';
import { Toaster } from '@/components/ui/sonner';

const montserrat = Montserrat({
	subsets: ['latin', 'cyrillic'],
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	variable: '--font-montserrat',
});

export const metadata: Metadata = {
	title: 'IO - AI-powered estate platform',
	description: 'AI-powered estate platform',
	icons: {
		icon: '/io-logo.png', // или путь к .png/.svg, если используешь другой формат
	},
};

import { HeaderProvider } from '@/components/header-context';
import { QuizProvider } from '@/lib/quiz-context';
import { ReplicasProvider } from '@/lib/replicas-context';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="h-full">
			<body
				className={`${montserrat.className} h-full`}
				suppressHydrationWarning={true}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem={true}
					disableTransitionOnChange
				>
					<TranslationsProvider>
						<ReplicasProvider>
							<HeaderProvider>
								<QuizProvider>
									<BroadcastProvider>
										<ChatVisibilityProvider>
											<ReplicaProvider>
												<ChatProvider>
													<ChatTabProvider>
														<div className="flex flex-col h-full">
															<Header />
															<main className="flex-1 flex overflow-hidden">
																<ResizablePanel>{children}</ResizablePanel>
															</main>
														</div>

														<Toaster />
													</ChatTabProvider>
												</ChatProvider>
											</ReplicaProvider>
										</ChatVisibilityProvider>
									</BroadcastProvider>
								</QuizProvider>
							</HeaderProvider>
						</ReplicasProvider>
					</TranslationsProvider>
				</ThemeProvider>
				{/* <Script 
					src="https://chat-widget.sensay.io/b4d138ab-41ad-4830-b193-166db4d5b124/embed-script.js" 
					strategy="afterInteractive"
				/> */}
			</body>
		</html>
	);
}
