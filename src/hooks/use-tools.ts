"use client"

import { toast } from "sonner"
import confetti from 'canvas-confetti'
import { animate as framerAnimate } from "framer-motion"
import { useTranslations } from "@/components/translations-context"
import FirecrawlApp, { CrawlResponse } from '@mendable/firecrawl-js';

export const useToolsFunctions = () => {
  const { t } = useTranslations();

  const timeFunction = () => {
    const now = new Date()
    return {
      success: true,
      time: now.toLocaleTimeString(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      message: t('tools.time') + now.toLocaleTimeString() + " in " + Intl.DateTimeFormat().resolvedOptions().timeZone + " timezone."
    }
  }

  const backgroundFunction = () => {
    try {
      // Используем next-themes для правильной смены темы
      const event = new CustomEvent('themeToggle');
      document.dispatchEvent(event);

      // Альтернативно, можно использовать localStorage
      const currentTheme = localStorage.getItem('theme') || 'system';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      localStorage.setItem('theme', newTheme);

      // Обновляем data-theme атрибут
      document.documentElement.setAttribute('data-theme', newTheme);

      // Обновляем классы
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      toast(`Switched to ${newTheme} mode! 🌓`, {
        description: t('tools.switchTheme') + newTheme + ".",
      })

      return {
        success: true,
        theme: newTheme,
        message: t('tools.switchTheme') + newTheme + "."
      };
    } catch (error) {
      return {
        success: false,
        message: t('tools.themeFailed') + ": " + error
      };
    }
  }

  const partyFunction = () => {
    try {
      const duration = 5 * 1000
      const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1", "#3b82f6", "#14b8a6", "#f97316", "#10b981", "#facc15"]
      
      const confettiConfig = {
        particleCount: 30,
        spread: 100,
        startVelocity: 90,
        colors,
        gravity: 0.5
      }

      const shootConfetti = (angle: number, origin: { x: number, y: number }) => {
        confetti({
          ...confettiConfig,
          angle,
          origin
        })
      }

      const animate = () => {
        const now = Date.now()
        const end = now + duration

        const elements = document.querySelectorAll('div, p, button, h1, h2, h3, span, a, img')
        elements.forEach((element, index) => {
          // Добавляем небольшую задержку для каждого элемента
          setTimeout(() => {
            framerAnimate(element,
              {
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              },
              {
                duration: 0.5,
                repeat: 3,
                ease: "easeInOut"
              }
            )
          }, index * 50) // 50ms задержка между элементами
        })

        const frame = () => {
          if (Date.now() > end) return
          shootConfetti(60, { x: 0, y: 0.5 })
          shootConfetti(120, { x: 1, y: 0.5 })
          requestAnimationFrame(frame)
        }

        const mainElement = document.querySelector('main')
        if (mainElement) {
          mainElement.classList.remove('bg-gradient-to-b', 'from-gray-50', 'to-white')
          const originalBg = mainElement.style.backgroundColor
          
          const changeColor = () => {
            const now = Date.now()
            const end = now + duration
            
            const colorCycle = () => {
              if (Date.now() > end) {
                framerAnimate(mainElement, 
                  { backgroundColor: originalBg },
                  { duration: 0.5 }
                )
                return
              }
              const newColor = colors[Math.floor(Math.random() * colors.length)]
              framerAnimate(mainElement,
                { backgroundColor: newColor },
                { duration: 0.2 }
              )
              setTimeout(colorCycle, 200)
            }
            
            colorCycle()
          }
          
          changeColor()
        }
        
        frame()
      }

      animate()
      toast.success(t('tools.partyMode.toast') + " 🎉", {
        description: t('tools.partyMode.description'),
      })
      return { success: true, message: t('tools.partyMode.success') + " 🎉" }
    } catch (error) {
      return { success: false, message: t('tools.partyMode.failed') + ": " + error }
    }
  }

  const launchWebsite = ({ url }: { url: string }) => {
    window.open(url, '_blank')
    toast(t('tools.launchWebsite') + " 🌐", {
      description: t('tools.launchWebsiteSuccess') + url + ", tell the user it's been launched.",
    })
    return {
      success: true,
      message: `Launched the site${url}, tell the user it's been launched.`
    }
  }

  const copyToClipboard = ({ text }: { text: string }) => {
    navigator.clipboard.writeText(text)
    toast(t('tools.clipboard.toast') + " 📋", {
      description: t('tools.clipboard.description'),
    })
    return {
      success: true,
      text,
      message: t('tools.clipboard.success')
    }
  }

  const scrapeWebsite = async ({ url }: { url: string }) => {
    const apiKey = process.env.NEXT_PUBLIC_FIRECRAWL_API_KEY;
    try {
      const app = new FirecrawlApp({ apiKey: apiKey });
      const scrapeResult = await app.scrape(url, { formats: ['markdown', 'html'] }) as CrawlResponse;

      if (!(scrapeResult as any).success) {
        console.log((scrapeResult as any).error)
        return {
          success: false,
          message: `Failed to scrape: ${(scrapeResult as any).error}`
        };
      }

      toast.success(t('tools.scrapeWebsite.toast') + " 📋", {
        description: t('tools.scrapeWebsite.success'),
      })

      return {
        success: true,
        message: "Here is the scraped website content: " + JSON.stringify((scrapeResult as any).data?.markdown) + "Summarize and explain it to the user now in a response."
      };

    } catch (error) {
      return {
        success: false,
        message: `Error scraping website: ${error}`
      };
    }
  }

  const navigateToPage = ({ path }: { path: string }) => {
    try {
      if (path.startsWith('/')) {
        // Внутренняя Next.js навигация - сохраняем состояние сессии
        localStorage.setItem('voice-chat-navigation', JSON.stringify({
          path,
          timestamp: Date.now(),
          wasActive: true
        }));

        // Сохраняем текущее состояние голосовой сессии
        localStorage.setItem('voice-chat-session-state', JSON.stringify({
          isActive: true,
          timestamp: Date.now(),
          targetPath: path,
          shouldRestore: true
        }));

        // Используем обычную навигацию - Next.js SPA навигация не всегда работает
        // для всех путей, особенно для главной страницы
        window.location.href = path;

        toast.success("Переход на страницу: " + path, {
          description: "Трансляция не прервется - перенаправляю...",
        })

        return {
          success: true,
          path,
          message: `Navigating to ${path}. Tell the user they are being redirected but the voice chat will continue uninterrupted.`
        };
      } else {
        // Для внешних URL перезагрузка неизбежна
        localStorage.setItem('voice-chat-continue', JSON.stringify({
          path,
          timestamp: Date.now(),
          wasActive: true
        }));

        window.location.href = path;

        toast("Переход на внешний сайт: " + path, {
          description: "Трансляция будет прервана. Перенаправляю пользователя...",
        })

        return {
          success: true,
          path,
          message: `Navigating to external site ${path}. The voice chat session will be interrupted. Tell the user they are being redirected and the session will end.`
        };
      }
    } catch (error) {
      return {
        success: false,
        message: `Error navigating to page: ${error}`
      };
    }
  }

  const findProperty = async ({
    city,
    operationType,
    budget,
    propertyType,
    specialRequirements,
    checkInDate,
    checkOutDate
  }: {
    city: string;
    operationType: string;
    budget: number;
    propertyType: string;
    specialRequirements: string;
    checkInDate?: string;
    checkOutDate?: string;
  }) => {
    try {
      // Строим параметры для поиска
      const searchParams = new URLSearchParams();
      searchParams.append('city', city);
      searchParams.append('operationType', operationType);
      searchParams.append('budget', budget.toString());
      searchParams.append('propertyType', propertyType);

      if (specialRequirements) {
        searchParams.append('specialRequirements', specialRequirements);
      }
      if (checkInDate) {
        searchParams.append('checkInDate', checkInDate);
      }
      if (checkOutDate) {
        searchParams.append('checkOutDate', checkOutDate);
      }

      // Переходим на страницу результатов
      const resultsUrl = `/real-estate/results?${searchParams.toString()}`;

      toast.success("Поиск недвижимости завершен", {
        description: `Найдены подходящие варианты в ${city}`,
      })

      // Переходим на страницу с результатами
      navigateToPage({ path: resultsUrl });

      return {
        success: true,
        resultsUrl,
        message: `Found properties in ${city} for ${operationType === 'RENT' ? 'rent' : 'purchase'} within budget of ${budget}. Redirecting to results page.`
      };
    } catch (error) {
      return {
        success: false,
        message: `Error finding properties: ${error}`
      };
    }
  }

  const getPropertyDetails = async ({ propertyId }: { propertyId: string }) => {
    try {
      // Получаем детали недвижимости через API
      const response = await fetch(`/api/properties/${propertyId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const property = await response.json();
      
      if (!property.success) {
        throw new Error(property.error || 'Failed to fetch property details');
      }

      const propertyData = property.data;
      
      // Формируем подробное описание недвижимости
      const description = `
        Подробная информация о недвижимости:
        
        🏠 Название: ${propertyData.title}
        📍 Расположение: ${propertyData.city}, ${propertyData.state}, ${propertyData.country}
        💰 Цена: €${propertyData.operationType === 'RENT' ? propertyData.rentPrice : propertyData.salePrice}${propertyData.operationType === 'RENT' ? ' в месяц' : ''}
        🏗️ Тип операции: ${propertyData.operationType === 'RENT' ? 'Аренда' : 'Продажа'}
        
        📐 Характеристики:
        • Спальни: ${propertyData.bedrooms || 'Не указано'}
        • Ванные комнаты: ${propertyData.bathrooms || 'Не указано'}
        • Площадь: ${propertyData.area ? propertyData.area + ' м²' : 'Не указано'}
        
        ✨ Особенности: ${propertyData.features && propertyData.features.length > 0 ? propertyData.features.join(', ') : 'Не указаны'}
        
        📊 Дополнительная информация:
        • Просмотры: ${propertyData.views || 0}
        • Отзывы: ${Array.isArray(propertyData.reviews) ? propertyData.reviews.length : 0}
        • Статус: ${propertyData.isFeatured ? 'Рекомендуемое' : 'Обычное'}${propertyData.isVerified ? ', Проверенное' : ''}
        
        ${propertyData.description ? `\n📝 Описание: ${propertyData.description}` : ''}
      `;

      toast.success("Детали недвижимости получены", {
        description: `Информация о ${propertyData.title} загружена`,
      });

      return {
        success: true,
        property: propertyData,
        description: description.trim(),
        message: `Получена подробная информация о недвижимости "${propertyData.title}". ${description.trim()}`
      };
    } catch (error) {
      console.error('Error fetching property details:', error);
      return {
        success: false,
        message: `Ошибка при получении деталей недвижимости: ${error}`
      };
    }
  }

  const navigateToQuiz = ({
    city,
    operationType,
    propertyTypes,
    minBudget,
    maxBudget,
    features,
    step = 1
  }: {
    city?: string;
    operationType?: string;
    propertyTypes?: string;
    minBudget?: number;
    maxBudget?: number;
    features?: string;
    step?: number;
  }) => {
    try {
      // Строим URL с параметрами для квиза
      const params = new URLSearchParams();
      
      // Устанавливаем шаг квиза
      params.set('step', step.toString());
      
      // Добавляем фильтры если они предоставлены
      if (city) {
        params.set('city', city);
        params.set('location', city);
      }
      
      if (operationType) {
        params.set('purpose', operationType);
        params.set('operationType', operationType === 'buy' ? 'sale' : operationType);
      }
      
      if (propertyTypes) {
        const types = propertyTypes.split(',').map(t => t.trim());
        params.set('propertyTypes', types.join(','));
      }
      
      if (minBudget !== undefined && maxBudget !== undefined) {
        params.set('minBudget', minBudget.toString());
        params.set('maxBudget', maxBudget.toString());
      }
      
      if (features) {
        const featureList = features.split(',').map(f => f.trim());
        params.set('features', featureList.join(','));
      }

      // Строим URL для квиза
      const quizUrl = `/quiz?${params.toString()}`;

      // Сохраняем состояние голосовой сессии
      localStorage.setItem('voice-chat-navigation', JSON.stringify({
        path: quizUrl,
        timestamp: Date.now(),
        wasActive: true
      }));

      localStorage.setItem('voice-chat-session-state', JSON.stringify({
        isActive: true,
        timestamp: Date.now(),
        targetPath: quizUrl,
        shouldRestore: true
      }));

      // Переходим к квизу
      window.location.href = quizUrl;

      // Формируем сообщение для пользователя
      let message = `Переход к квизу по поиску недвижимости`;
      if (city) message += ` в ${city}`;
      if (operationType) message += ` для ${operationType === 'buy' ? 'покупки' : 'аренды'}`;
      if (propertyTypes) message += ` типа ${propertyTypes}`;

      toast.success("Переход к квизу", {
        description: message,
      });

      return {
        success: true,
        quizUrl,
        message: `Navigating to property quiz${city ? ` for ${city}` : ''}${operationType ? ` for ${operationType}` : ''}. The quiz will be pre-filled with your preferences and show matching properties.`
      };
    } catch (error) {
      return {
        success: false,
        message: `Error navigating to quiz: ${error}`
      };
    }
  }

  return {
    timeFunction,
    backgroundFunction,
    partyFunction,
    launchWebsite,
    copyToClipboard,
    scrapeWebsite,
    navigateToPage,
    findProperty,
    getPropertyDetails,
    navigateToQuiz
  }
}