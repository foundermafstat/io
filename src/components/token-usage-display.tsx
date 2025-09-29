"use client"

import { useTranslations } from "./translations-context"
import { useTokenUsage } from "@/hooks/use-token-usage"

export function TokenUsageDisplay() {
  const { t } = useTranslations()
  const { usage, loading, error } = useTokenUsage()

  if (loading) {
    return (
      <div className="w-full bg-muted/50 rounded-lg p-3 space-y-2">
        <h4 className="text-sm font-medium text-foreground">{t('tokenUsage.usage')}</h4>
        <div className="text-center text-xs text-muted-foreground">
          Загрузка статистики...
        </div>
      </div>
    )
  }

  if (error || !usage) {
    const isApiKeyError = error?.includes("API key not configured")
    return (
      <div className="w-full bg-muted/50 rounded-lg p-3 space-y-2">
        <h4 className="text-sm font-medium text-foreground">{t('tokenUsage.usage')}</h4>
        <div className="text-center text-xs text-muted-foreground">
          {isApiKeyError
            ? "Для отображения статистики токенов добавьте OPENAI_API_KEY в переменные окружения"
            : error || "Нет данных об использовании токенов"
          }
        </div>
      </div>
    )
  }

  return (
    <div className="w-full bg-muted/50 rounded-lg p-3 space-y-2">
      <h4 className="text-sm font-medium text-foreground">{t('tokenUsage.usage')}</h4>
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="text-center">
          <div className="text-muted-foreground">{t('tokenUsage.input')}</div>
          <div className="font-mono">{usage.input_tokens.toLocaleString()}</div>
        </div>
        <div className="text-center">
          <div className="text-muted-foreground">{t('tokenUsage.output')}</div>
          <div className="font-mono">{usage.output_tokens.toLocaleString()}</div>
        </div>
        <div className="text-center">
          <div className="text-muted-foreground">{t('tokenUsage.total')}</div>
          <div className="font-mono font-semibold">{usage.total_tokens.toLocaleString()}</div>
        </div>
      </div>
    </div>
  )
}
