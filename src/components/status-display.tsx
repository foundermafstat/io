"use client"

import { useTranslations } from "./translations-context"

interface StatusDisplayProps {
  status: string
}

export function StatusDisplay({ status }: StatusDisplayProps) {
  const { t } = useTranslations()
  
  return (
    <div className="w-full max-w-md bg-card text-card-foreground rounded-xl border shadow-sm p-4">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-sm font-medium">{status}</span>
      </div>
    </div>
  )
}
