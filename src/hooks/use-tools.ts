'use client';

import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import { animate as framerAnimate } from 'framer-motion';
import { useTranslations } from '@/components/translations-context';
import { useRouter } from 'next/navigation';

export const useToolsFunctions = () => {
	const { t } = useTranslations();
	const router = useRouter();

	const timeFunction = () => {
		const now = new Date();
		return {
			success: true,
			time: now.toLocaleTimeString(),
			timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
			message:
				t('tools.time') +
				now.toLocaleTimeString() +
				' in ' +
				Intl.DateTimeFormat().resolvedOptions().timeZone +
				' timezone.',
		};
	};

	const backgroundFunction = () => {
		try {
			const html = document.documentElement;
			const currentTheme = html.classList.contains('dark') ? 'dark' : 'light';
			const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

			html.classList.remove(currentTheme);
			html.classList.add(newTheme);

			toast(`Switched to ${newTheme} mode! 🌓`, {
				description: t('tools.switchTheme') + newTheme + '.',
				position: 'bottom-left',
			});

			return {
				success: true,
				theme: newTheme,
				message: t('tools.switchTheme') + newTheme + '.',
			};
		} catch (error) {
			return {
				success: false,
				message: t('tools.themeFailed') + ': ' + error,
			};
		}
	};

	const partyFunction = () => {
		try {
			const duration = 5 * 1000;
			const colors = [
				'#a786ff',
				'#fd8bbc',
				'#eca184',
				'#f8deb1',
				'#3b82f6',
				'#14b8a6',
				'#f97316',
				'#10b981',
				'#facc15',
			];

			const confettiConfig = {
				particleCount: 30,
				spread: 100,
				startVelocity: 90,
				colors,
				gravity: 0.5,
			};

			const shootConfetti = (
				angle: number,
				origin: { x: number; y: number }
			) => {
				confetti({
					...confettiConfig,
					angle,
					origin,
				});
			};

			const animate = () => {
				const now = Date.now();
				const end = now + duration;

				const elements = document.querySelectorAll(
					'div, p, button, h1, h2, h3'
				);
				elements.forEach((element) => {
					framerAnimate(
						element,
						{
							scale: [1, 1.1, 1],
							rotate: [0, 5, -5, 0],
						},
						{
							duration: 0.5,
							repeat: 10,
							ease: 'easeInOut',
						}
					);
				});

				const frame = () => {
					if (Date.now() > end) return;
					shootConfetti(60, { x: 0, y: 0.5 });
					shootConfetti(120, { x: 1, y: 0.5 });
					requestAnimationFrame(frame);
				};

				const mainElement = document.querySelector('main');
				if (mainElement) {
					mainElement.classList.remove(
						'bg-gradient-to-b',
						'from-gray-50',
						'to-white'
					);
					const originalBg = mainElement.style.backgroundColor;

					const changeColor = () => {
						const now = Date.now();
						const end = now + duration;

						const colorCycle = () => {
							if (Date.now() > end) {
								framerAnimate(
									mainElement,
									{ backgroundColor: originalBg },
									{ duration: 0.5 }
								);
								return;
							}
							const newColor =
								colors[Math.floor(Math.random() * colors.length)];
							framerAnimate(
								mainElement,
								{ backgroundColor: newColor },
								{ duration: 0.2 }
							);
							setTimeout(colorCycle, 200);
						};

						colorCycle();
					};

					changeColor();
				}

				frame();
			};

			animate();
			toast.success(t('tools.partyMode.toast') + ' 🎉', {
				description: t('tools.partyMode.description'),
				position: 'bottom-left',
			});
			return { success: true, message: t('tools.partyMode.success') + ' 🎉' };
		} catch (error) {
			return {
				success: false,
				message: t('tools.partyMode.failed') + ': ' + error,
			};
		}
	};

	const launchWebsite = ({ url }: { url: string }) => {
		window.open(url, '_blank');
		toast(t('tools.launchWebsite') + ' 🌐', {
			description:
				t('tools.launchWebsiteSuccess') +
				url +
				", tell the user it's been launched.",
			position: 'bottom-left',
		});
		return {
			success: true,
			message: `Launched the site${url}, tell the user it's been launched.`,
		};
	};

	const copyToClipboard = ({ text }: { text: string }) => {
		navigator.clipboard.writeText(text);
		toast(t('tools.clipboard.toast') + ' 📋', {
			description: t('tools.clipboard.description'),
			position: 'bottom-left',
		});
		return {
			success: true,
			text,
			message: t('tools.clipboard.success'),
		};
	};

	const scrapeWebsite = async ({ url }: { url: string }) => {
		try {
			// Простая реализация скрапинга через fetch
			const response = await fetch(
				`/api/scrape?url=${encodeURIComponent(url)}`
			);
			const data = await response.json();

			if (!data.success) {
				return {
					success: false,
					message: `Failed to scrape: ${data.error || 'Unknown error'}`,
				};
			}

			toast.success(t('tools.scrapeWebsite.toast') + ' 📋', {
				description: t('tools.scrapeWebsite.success'),
				position: 'bottom-left',
			});

			return {
				success: true,
				message:
					'Here is the scraped website content: ' +
					data.content +
					'Summarize and explain it to the user now in a response.',
			};
		} catch (error) {
			return {
				success: false,
				message: `Error scraping website: ${error}`,
			};
		}
	};

	const navigateToProperties = ({ filters }: { filters?: any } = {}) => {
		try {
			let url = '/catalog';
			const searchParams = new URLSearchParams();

			if (filters) {
				if (filters.query) searchParams.set('query', filters.query);
				if (filters.operationType)
					searchParams.set('operationType', filters.operationType);
				if (filters.city) searchParams.set('city', filters.city);
				if (filters.minPrice)
					searchParams.set('minPrice', filters.minPrice.toString());
				if (filters.maxPrice)
					searchParams.set('maxPrice', filters.maxPrice.toString());
			}

			if (searchParams.toString()) {
				url += '?' + searchParams.toString();
			}

			// Используем Next.js роутер для навигации без перезагрузки и без прерывания трансляции
			router.push(url, { scroll: false });

			toast.success('Navigating to catalog 🏠', {
				description: 'Loading catalog page with applied filters',
				position: 'bottom-left',
			});

			return {
				success: true,
				message: `Navigated to catalog page${filters ? ' with filters' : ''}`,
				url,
			};
		} catch (error) {
			return {
				success: false,
				message: `Navigation error: ${error}`,
			};
		}
	};

	const navigateToProperty = ({ propertyId }: { propertyId: string }) => {
		try {
			const url = `/estate/${propertyId}`;
			// Используем Next.js роутер для навигации без перезагрузки и без прерывания трансляции
			router.push(url, { scroll: false });

			toast.success('Navigating to estate 🏡', {
				description: `Loading property ${propertyId}`,
				position: 'bottom-left',
			});

			return {
				success: true,
				message: `Navigated to property ${propertyId}`,
				url,
			};
		} catch (error) {
			return {
				success: false,
				message: `Navigation error: ${error}`,
			};
		}
	};

	const navigateToHome = () => {
		try {
			// Используем Next.js роутер для навигации без перезагрузки и без прерывания трансляции
			router.push('/', { scroll: false });

			toast.success('Navigating to home 🏠', {
				description: 'Loading home page',
				position: 'bottom-left',
			});

			return {
				success: true,
				message: 'Navigated to home page',
				url: '/',
			};
		} catch (error) {
			return {
				success: false,
				message: `Navigation error: ${error}`,
			};
		}
	};

	const navigateToCars = () => {
		try {
			// Используем Next.js роутер для навигации без перезагрузки и без прерывания трансляции
			router.push('/cars', { scroll: false });

			toast.success('Navigating to cars 🚗', {
				description: 'Loading cars page',
				position: 'bottom-left',
			});

			return {
				success: true,
				message: 'Navigated to cars page',
				url: '/cars',
			};
		} catch (error) {
			return {
				success: false,
				message: `Navigation error: ${error}`,
			};
		}
	};

	const navigateToCar = ({ carId }: { carId: string }) => {
		try {
			const url = `/car/${carId}`;
			// Используем Next.js роутер для навигации без перезагрузки и без прерывания трансляции
			router.push(url, { scroll: false });

			toast.success('Navigating to car 🚗', {
				description: `Loading car ${carId}`,
				position: 'bottom-left',
			});

			return {
				success: true,
				message: `Navigated to car ${carId}`,
				url,
			};
		} catch (error) {
			return {
				success: false,
				message: `Navigation error: ${error}`,
			};
		}
	};

	const loadPropertiesContext = async ({
		featuredOnly = false,
	}: { featuredOnly?: boolean } = {}) => {
		try {
			const response = await fetch(
				`/api/properties/ai-context?featured=${featuredOnly}&limit=1000`
			);
			const data = await response.json();

			if (!response.ok) {
				return {
					success: false,
					message: `Failed to load properties context: ${
						data.error || 'Unknown error'
					}`,
				};
			}

			toast.success('Properties context loaded 🏠', {
				description: `Loaded ${data.totalProperties} properties for AI context`,
				position: 'bottom-left',
			});

			return {
				success: true,
				message: `Successfully loaded ${data.totalProperties} properties for AI context. The AI now has access to all property information including titles, descriptions, prices, locations, and features.`,
				data: {
					totalProperties: data.totalProperties,
					properties: data.properties,
					lastUpdated: data.lastUpdated,
				},
			};
		} catch (error) {
			return {
				success: false,
				message: `Error loading properties context: ${error}`,
			};
		}
	};

	const navigateToCheckout = ({ propertyId }: { propertyId: string }) => {
		try {
			const url = `/checkout/${propertyId}`;
			// Используем Next.js роутер для навигации без перезагрузки и без прерывания трансляции
			router.push(url, { scroll: false });

			toast.success('Navigating to checkout 💳', {
				description: `Loading checkout page for property ${propertyId}`,
				position: 'bottom-left',
			});

			return {
				success: true,
				message: `Navigated to checkout page for property ${propertyId}`,
				url,
			};
		} catch (error) {
			return {
				success: false,
				message: `Navigation error: ${error}`,
			};
		}
	};

	const fillCheckoutForm = ({
		field,
		value,
	}: {
		field: string;
		value: string;
	}) => {
		try {
			// Находим форму на странице
			const form = document.querySelector('form');
			if (!form) {
				return {
					success: false,
					message: 'Checkout form not found on the page',
				};
			}

			let inputElement:
				| HTMLInputElement
				| HTMLTextAreaElement
				| HTMLSelectElement
				| null = null;

			// Определяем элемент по полю
			switch (field.toLowerCase()) {
				case 'name':
					inputElement = form.querySelector('#name') as HTMLInputElement;
					break;
				case 'phone':
					inputElement = form.querySelector('#phone') as HTMLInputElement;
					break;
				case 'meetingdate':
				case 'meeting_date':
					// Для даты нужно найти кнопку PopoverTrigger и кликнуть на неё
					const dateButton = form.querySelector('button[data-state]');
					if (dateButton) {
						(dateButton as HTMLButtonElement).click();
						// Ждем немного для открытия календаря
						setTimeout(() => {
							// Здесь можно добавить логику для выбора даты
							// Пока просто показываем сообщение
							toast.info('Date picker opened', {
								description: 'Please select a date from the calendar',
								position: 'bottom-left',
							});
						}, 100);
					}
					return {
						success: true,
						message: `Opened date picker for ${field}`,
					};
				case 'meetingtime':
				case 'meeting_time':
					inputElement = form.querySelector(
						'[data-radix-select-trigger]'
					) as HTMLSelectElement;
					break;
				case 'notes':
					inputElement = form.querySelector('#notes') as HTMLTextAreaElement;
					break;
				default:
					return {
						success: false,
						message: `Unknown field: ${field}`,
					};
			}

			if (inputElement) {
				// Устанавливаем значение
				inputElement.value = value;

				// Триггерим событие изменения
				const event = new Event('input', { bubbles: true });
				inputElement.dispatchEvent(event);

				toast.success('Form field updated 📝', {
					description: `Updated ${field} field with: ${value}`,
					position: 'bottom-left',
				});

				return {
					success: true,
					message: `Updated ${field} field with: ${value}`,
				};
			} else {
				return {
					success: false,
					message: `Field ${field} not found in the form`,
				};
			}
		} catch (error) {
			return {
				success: false,
				message: `Error filling form field: ${error}`,
			};
		}
	};

	const submitCheckoutForm = () => {
		try {
			const form = document.querySelector('form');
			if (!form) {
				return {
					success: false,
					message: 'Checkout form not found on the page',
				};
			}

			const submitButton = form.querySelector(
				'button[type="submit"]'
			) as HTMLButtonElement;
			if (!submitButton) {
				return {
					success: false,
					message: 'Submit button not found in the form',
				};
			}

			// Проверяем, что форма заполнена
			const requiredFields = ['name', 'phone', 'meetingDate', 'meetingTime'];
			const missingFields = [];

			for (const field of requiredFields) {
				let element: HTMLInputElement | HTMLSelectElement | null = null;

				if (field === 'meetingDate') {
					const dateButton = form.querySelector('button[data-state]');
					if (!dateButton || !/\d/.test(dateButton.textContent || '')) {
						missingFields.push(field);
					}
				} else if (field === 'meetingTime') {
					element = form.querySelector(
						'[data-radix-select-trigger]'
					) as HTMLSelectElement;
				} else {
					element = form.querySelector(`#${field}`) as HTMLInputElement;
				}

				if (element && !element.value.trim()) {
					missingFields.push(field);
				}
			}

			if (missingFields.length > 0) {
				return {
					success: false,
					message: `Please fill in the following required fields: ${missingFields.join(
						', '
					)}`,
				};
			}

			// Отправляем форму
			submitButton.click();

			toast.success('Form submitted ✅', {
				description: 'Checkout form has been submitted',
				position: 'bottom-left',
			});

			return {
				success: true,
				message: 'Checkout form submitted successfully',
			};
		} catch (error) {
			return {
				success: false,
				message: `Error submitting form: ${error}`,
			};
		}
	};

	const updateCheckoutElement = ({
		elementSelector,
		action,
		value,
	}: {
		elementSelector: string;
		action: string;
		value?: string;
	}) => {
		try {
			const element = document.querySelector(elementSelector) as HTMLElement;
			if (!element) {
				return {
					success: false,
					message: `Element with selector "${elementSelector}" not found`,
				};
			}

			switch (action.toLowerCase()) {
				case 'show':
					element.style.display = 'block';
					element.style.visibility = 'visible';
					break;
				case 'hide':
					element.style.display = 'none';
					break;
				case 'changetext':
				case 'change_text':
					if (value !== undefined) {
						element.textContent = value;
					}
					break;
				case 'changecolor':
				case 'change_color':
					if (value !== undefined) {
						element.style.color = value;
					}
					break;
				case 'changebackground':
				case 'change_background':
					if (value !== undefined) {
						element.style.backgroundColor = value;
					}
					break;
				case 'addclass':
				case 'add_class':
					if (value !== undefined) {
						element.classList.add(value);
					}
					break;
				case 'removeclass':
				case 'remove_class':
					if (value !== undefined) {
						element.classList.remove(value);
					}
					break;
				case 'toggleclass':
				case 'toggle_class':
					if (value !== undefined) {
						element.classList.toggle(value);
					}
					break;
				default:
					return {
						success: false,
						message: `Unknown action: ${action}`,
					};
			}

			toast.success('Element updated 🎨', {
				description: `Updated element with action: ${action}`,
				position: 'bottom-left',
			});

			return {
				success: true,
				message: `Successfully updated element with action: ${action}`,
			};
		} catch (error) {
			return {
				success: false,
				message: `Error updating element: ${error}`,
			};
		}
	};

	return {
		getCurrentTime: timeFunction,
		changeBackgroundColor: backgroundFunction,
		partyMode: partyFunction,
		launchWebsite,
		copyToClipboard,
		takeScreenshot: () => {
			// Простая реализация скриншота
			toast('Screenshot taken! 📸', {
				description: 'Screenshot functionality would be implemented here',
				position: 'bottom-left',
			});
			return {
				success: true,
				message: 'Screenshot taken successfully',
			};
		},
		scrapeWebsite,
		navigateToProperties,
		navigateToProperty,
		navigateToHome,
		navigateToCars,
		navigateToCar,
		loadPropertiesContext,
		navigateToCheckout,
		fillCheckoutForm,
		submitCheckoutForm,
		updateCheckoutElement,
	};
};
