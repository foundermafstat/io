"use client"

import { useState, useEffect } from "react"

export interface TokenUsage {
  total_tokens: number
  input_tokens: number
  output_tokens: number
}

export interface OpenAIUsageData {
  object: string
  data: Array<{
    aggregation_timestamp: number
    n_requests: number
    operation: string
    snapshot_id: string
    n_generated_tokens_prompt: number
    n_generated_tokens_completion: number
    n_tokens_completion: number
    n_tokens_prompt: number
  }>
}

export function useTokenUsage() {
  const [usage, setUsage] = useState<TokenUsage | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchUsage = async (date?: string) => {
    try {
      setLoading(true)
      setError(null)

      const params = date ? `?date=${date}` : ''
      const response = await fetch(`/api/openai/usage${params}`)

      if (!response.ok) {
        throw new Error(`Failed to fetch usage: ${response.statusText}`)
      }

      const data = await response.json()

      // Проверяем, есть ли ошибка конфигурации
      if (data.error && data.error.includes("API key not configured")) {
        setUsage({
          total_tokens: 0,
          input_tokens: 0,
          output_tokens: 0
        })
        setError("OpenAI API key not configured. Please add OPENAI_API_KEY to your environment variables.")
        return
      }

      if (data.usage?.data?.length > 0) {
        const usageData = data.usage.data[0]
        setUsage({
          total_tokens: usageData.n_tokens_prompt + usageData.n_tokens_completion,
          input_tokens: usageData.n_tokens_prompt,
          output_tokens: usageData.n_tokens_completion
        })
      } else {
        // Если нет данных за указанную дату, устанавливаем нулевые значения
        setUsage({
          total_tokens: 0,
          input_tokens: 0,
          output_tokens: 0
        })
      }
    } catch (err) {
      console.error("Error fetching token usage:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch usage")
      setUsage(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsage()
  }, [])

  return {
    usage,
    loading,
    error,
    refetch: fetchUsage
  }
}
