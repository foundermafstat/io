"use client"

import { Message } from "@/types"
import { useTranslations } from "./translations-context"

interface TokenUsageDisplayProps {
  messages: Message[]
}

export function TokenUsageDisplay({ messages }: TokenUsageDisplayProps) {
  const { t } = useTranslations()
  
  // Calculate token usage from messages
  const totalInputTokens = messages.reduce((sum, msg) => {
    return sum + (msg.usage?.prompt_tokens || 0)
  }, 0)
  
  const totalOutputTokens = messages.reduce((sum, msg) => {
    return sum + (msg.usage?.completion_tokens || 0)
  }, 0)
  
  const totalTokens = totalInputTokens + totalOutputTokens

  return (
    <div className="w-full bg-muted/50 rounded-lg p-3 space-y-2">
      <h4 className="text-sm font-medium text-foreground">{t('tokenUsage.usage')}</h4>
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="text-center">
          <div className="text-muted-foreground">{t('tokenUsage.input')}</div>
          <div className="font-mono">{totalInputTokens.toLocaleString()}</div>
        </div>
        <div className="text-center">
          <div className="text-muted-foreground">{t('tokenUsage.output')}</div>
          <div className="font-mono">{totalOutputTokens.toLocaleString()}</div>
        </div>
        <div className="text-center">
          <div className="text-muted-foreground">{t('tokenUsage.total')}</div>
          <div className="font-mono font-semibold">{totalTokens.toLocaleString()}</div>
        </div>
      </div>
    </div>
  )
}
