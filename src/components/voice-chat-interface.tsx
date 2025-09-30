'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useTranslations } from './translations-context';
import { useReplica } from './replica-provider';
import useWebRTCAudioSession from '@/hooks/use-webrtc';
import { VoiceSelector } from './voice-select';
import { BroadcastButton } from './broadcast-button';
import { MessageControls } from './message-controls';
import { TextInput } from './text-input';
import { TokenUsageDisplay } from './token-usage-display';
import { StatusDisplay } from './status-display';
import { ToolsEducation } from './tools-education';
import { useBroadcast } from './broadcast-context';
import { tools } from '@/lib/tools';
import {
	useReplicas,
	useActiveReplicas,
	type SensayReplica,
} from '@/lib/replicas-context';
import { useToolsFunctions } from '@/hooks/use-tools';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useQuiz } from '@/lib/quiz-context';
import { Mic } from 'lucide-react';

export default function VoiceChatInterface() {
	const { t } = useTranslations();
	const { selectedReplicaUuid } = useReplica();
	const { currentQuestion, hasUserAnswered, hasAgentNeededInfo } =
		useBroadcast();
	const { state: quizState } = useQuiz();
	const router = useRouter();
	const [voice, setVoice] = useState('ash');
	const [selectedReplicaForVoice, setSelectedReplicaForVoice] =
		useState<string>('');

	// Используем глобальное состояние реплик
	const { state: replicasState } = useReplicas();
	const availableReplicas = useActiveReplicas();
	const isLoadingReplicas = replicasState.loading;

	// Получаем функции инструментов
	const toolFunctions = useToolsFunctions();

	// Получаем выбранную реплику для голосового чата
	const voiceReplica = availableReplicas.find(
		(r) => r.uuid === selectedReplicaForVoice
	);

	// WebRTC audio session hook - должен быть вызван до useEffect
	const {
		isSessionActive,
		isLoadingContext,
		startSession,
		stopSession,
		sendTextMessage,
		registerFunction,
		msgs: hookMsgs,
		conversation: hookConversation,
		status: hookStatus,
	} = useWebRTCAudioSession(voice, tools);

	// Устанавливаем первую реплику по умолчанию, если она есть
	useEffect(() => {
		if (availableReplicas.length > 0 && !selectedReplicaForVoice) {
			setSelectedReplicaForVoice(availableReplicas[0].uuid);
		}
	}, [availableReplicas, selectedReplicaForVoice]);

	// Проверяем и восстанавливаем состояние сессии при загрузке
	useEffect(() => {
		const sessionState = localStorage.getItem('voice-chat-session-state');
		if (sessionState) {
			try {
				const state = JSON.parse(sessionState);
				const timeDiff = Date.now() - state.timestamp;
				// Восстанавливаем состояние только если прошло менее 30 секунд
				if (timeDiff < 30000 && state.shouldRestore && state.isActive) {
					console.log(t('voiceChat.restoringSession'));
					toast.success(t('voiceChat.sessionRestored'), {
						description: t('voiceChat.sessionRestoredDescription'),
					});
				}
				// Очищаем состояние после обработки
				localStorage.removeItem('voice-chat-session-state');
			} catch (error) {
				console.error(t('voiceChat.sessionRestoreError'), error);
				localStorage.removeItem('voice-chat-session-state');
			}
		}
	}, []);

	// Use data from hook
	const msgs = hookMsgs;
	const conversation = hookConversation;
	const status = hookStatus;

	// Проверяем информацию о продолжении голосового чата с предыдущей страницы
	useEffect(() => {
		const navigationInfo = localStorage.getItem('voice-chat-navigation');
		if (navigationInfo) {
			try {
				const info = JSON.parse(navigationInfo);
				const timeDiff = Date.now() - info.timestamp;
				// Показываем уведомление только если прошло менее 30 секунд
				if (timeDiff < 30000 && info.wasActive) {
					console.log(t('voiceChat.userNavigatedFromVoice'), info.path);
					// Показываем уведомление пользователю
					setTimeout(() => {
						toast.success(t('voiceChat.navigationCompleted'), {
							description: t('voiceChat.navigationCompletedDescription', {
								path: info.path,
							}),
						});
					}, 1000);
				}
				// Очищаем информацию
				localStorage.removeItem('voice-chat-navigation');
			} catch (error) {
				console.error(t('voiceChat.navigationInfoError'), error);
				localStorage.removeItem('voice-chat-navigation');
			}
		}
	}, []);

	// Регистрируем функции инструментов
	useEffect(() => {
		if (registerFunction && toolFunctions) {
			// Регистрируем все функции инструментов
			Object.entries(toolFunctions).forEach(([name, fn]) => {
				if (typeof fn === 'function') {
					registerFunction(name, fn);
				}
			});
		}
	}, [registerFunction, toolFunctions]);

	// Автоматически получаем детали выделенного объекта
	useEffect(() => {
		if (
			quizState.selectedProperty &&
			isSessionActive &&
			toolFunctions.getPropertyDetails
		) {
			// Небольшая задержка для плавности
			const timer = setTimeout(async () => {
				try {
					await toolFunctions.getPropertyDetails({
						propertyId: quizState.selectedProperty!,
					});
				} catch (error) {
					console.error('Error fetching property details:', error);
					toast.error(t('voiceChat.propertyDetailsError'), {
						description: t('voiceChat.propertyDetailsErrorDescription'),
					});
				}
			}, 500);

			return () => clearTimeout(timer);
		}
	}, [
		quizState.selectedProperty,
		isSessionActive,
		toolFunctions.getPropertyDetails,
	]);

	// Handle start/stop session
	const handleStartStopClick = () => {
		if (isSessionActive) {
			stopSession();
		} else {
			startSession();
		}
	};

	// Handle text message submission
	const handleTextSubmit = (text: string) => {
		if (isSessionActive) {
			sendTextMessage(text);
		}
	};

	return (
		<div className="flex flex-col h-full max-w-md mx-auto bg-background">
			<ScrollArea className="flex-1 p-2">
				<div className="flex flex-col items-center justify-center min-h-full">
					<motion.div
						className="w-full bg-card text-card-foreground rounded-xl border shadow-sm p-3 space-y-3"
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.2, duration: 0.4 }}
					>
						<div className="space-y-2">
							<label className="text-sm font-medium text-foreground">
								{t('voiceChat.selectReplica')}
							</label>
							<Select
								value={selectedReplicaForVoice}
								onValueChange={setSelectedReplicaForVoice}
								disabled={isLoadingReplicas}
							>
								<SelectTrigger className="w-full">
									<SelectValue placeholder={t('voiceChat.selectReplica')} />
								</SelectTrigger>
								<SelectContent>
									{availableReplicas.map((replica) => (
										<SelectItem key={replica.uuid} value={replica.uuid}>
											<div className="flex items-center gap-2">
												<div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
													{replica.name.charAt(0)}
												</div>
												<span>{replica.name}</span>
											</div>
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						<VoiceSelector value={voice} onValueChange={setVoice} />

						<div className="flex flex-col items-center gap-3">
							<BroadcastButton
								isSessionActive={isSessionActive}
								onClick={handleStartStopClick}
								disabled={isLoadingContext}
							/>

							{isLoadingContext && (
								<motion.div
									className="w-full bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3"
									initial={{ opacity: 0, height: 0 }}
									animate={{ opacity: 1, height: 'auto' }}
									exit={{ opacity: 0, height: 0 }}
									transition={{ duration: 0.3 }}
								>
									<div className="flex items-center gap-2">
										<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
										<span className="text-sm text-blue-800 dark:text-blue-200">
											{t('voiceChat.loadingDatabase')}
										</span>
									</div>
									<p className="text-xs text-blue-600 dark:text-blue-300 mt-1">
										{t('voiceChat.aiAgentAccess')}
									</p>
								</motion.div>
							)}
						</div>

						{msgs.length > 4 && <TokenUsageDisplay />}

						{status && (
							<motion.div
								className="w-full flex flex-col gap-2"
								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: 'auto' }}
								exit={{ opacity: 0, height: 0 }}
								transition={{ duration: 0.3 }}
							>
								<MessageControls conversation={conversation} msgs={msgs} />
								<TextInput
									onSubmit={handleTextSubmit}
									disabled={!isSessionActive}
								/>
							</motion.div>
						)}
					</motion.div>

					{status && <StatusDisplay status={status} />}

					{/* Индикатор выделенного объекта */}
					{quizState.selectedProperty && (
						<motion.div
							className="w-full bg-card text-card-foreground rounded-lg border shadow-sm p-3"
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: 'auto' }}
							exit={{ opacity: 0, height: 0 }}
							transition={{ duration: 0.3 }}
						>
							<div className="flex items-center justify-between mb-2">
								<h3 className="text-sm font-medium">
									{t('voiceChat.selectedProperty')}
								</h3>
								<span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
									<Mic className="w-3 h-3 mr-1" />
									{t('voiceChat.readyForDiscussion')}
								</span>
							</div>
							<p className="text-sm text-muted-foreground">
								{t('voiceChat.propertySelectedDescription')}
							</p>
						</motion.div>
					)}

					{/* Индикатор состояния трансляции */}
					{isSessionActive && (
						<motion.div
							className="w-full bg-card text-card-foreground rounded-lg border shadow-sm p-3"
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: 'auto' }}
							exit={{ opacity: 0, height: 0 }}
							transition={{ duration: 0.3 }}
						>
							<div className="flex items-center justify-between mb-2">
								<h3 className="text-sm font-medium">
									{t('voiceChat.broadcastStatus')}
								</h3>
								<div className="flex gap-2">
									{hasAgentNeededInfo && (
										<span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
											{t('voiceChat.requiresInfo')}
										</span>
									)}
									{hasUserAnswered && (
										<span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
											{t('voiceChat.userAnswered')}
										</span>
									)}
								</div>
							</div>

							{currentQuestion && (
								<div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-3">
									<p className="text-sm text-blue-800 dark:text-blue-200">
										<strong>{t('voiceChat.currentQuestion')}</strong>{' '}
										{currentQuestion.question}
									</p>
									<p className="text-xs text-blue-600 dark:text-blue-300 mt-1">
										{t('voiceChat.status')}{' '}
										{currentQuestion.status === 'pending'
											? t('voiceChat.pendingAnswer')
											: t('voiceChat.answered')}
									</p>
								</div>
							)}
						</motion.div>
					)}
				</div>
			</ScrollArea>
		</div>
	);
}
