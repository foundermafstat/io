"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export interface BroadcastQuestion {
  id: string
  question: string
  timestamp: string
  status: "pending" | "answered" | "expired"
  userResponse?: string
  responseTimestamp?: string
}

interface BroadcastContextType {
  // Состояние вопросов и ответов
  currentQuestion: BroadcastQuestion | null
  pendingQuestions: BroadcastQuestion[]
  hasUserAnswered: boolean
  hasAgentNeededInfo: boolean

  // Методы для управления состоянием
  setCurrentQuestion: (question: BroadcastQuestion | null) => void
  addPendingQuestion: (question: Omit<BroadcastQuestion, "id" | "timestamp" | "status">) => void
  markQuestionAnswered: (questionId: string, userResponse: string) => void
  clearCurrentQuestion: () => void
  resetBroadcastState: () => void

  // Проверка состояния
  isQuestionPending: (questionId: string) => boolean
  getUnansweredQuestions: () => BroadcastQuestion[]
}

const BroadcastContext = createContext<BroadcastContextType | undefined>(undefined)

export function BroadcastProvider({ children }: { children: ReactNode }) {
  const [currentQuestion, setCurrentQuestion] = useState<BroadcastQuestion | null>(null)
  const [pendingQuestions, setPendingQuestions] = useState<BroadcastQuestion[]>([])

  // Вычисляемые состояния
  const hasUserAnswered = pendingQuestions.some(q => q.status === "answered")
  const hasAgentNeededInfo = pendingQuestions.some(q => q.status === "pending")

  const addPendingQuestion = useCallback((questionData: Omit<BroadcastQuestion, "id" | "timestamp" | "status">) => {
    const newQuestion: BroadcastQuestion = {
      ...questionData,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      status: "pending"
    }

    setPendingQuestions(prev => [...prev, newQuestion])

    // Если нет текущего вопроса, устанавливаем этот
    if (!currentQuestion) {
      setCurrentQuestion(newQuestion)
    }
  }, [currentQuestion])

  const markQuestionAnswered = useCallback((questionId: string, userResponse: string) => {
    setPendingQuestions(prev =>
      prev.map(q =>
        q.id === questionId
          ? {
              ...q,
              status: "answered" as const,
              userResponse,
              responseTimestamp: new Date().toISOString()
            }
          : q
      )
    )

    // Если это был текущий вопрос, сбрасываем его
    if (currentQuestion?.id === questionId) {
      setCurrentQuestion(null)
    }
  }, [currentQuestion])

  const clearCurrentQuestion = useCallback(() => {
    setCurrentQuestion(null)
  }, [])

  const resetBroadcastState = useCallback(() => {
    setCurrentQuestion(null)
    setPendingQuestions([])
  }, [])

  const isQuestionPending = useCallback((questionId: string) => {
    return pendingQuestions.some(q => q.id === questionId && q.status === "pending")
  }, [pendingQuestions])

  const getUnansweredQuestions = useCallback(() => {
    return pendingQuestions.filter(q => q.status === "pending")
  }, [pendingQuestions])

  const value: BroadcastContextType = {
    currentQuestion,
    pendingQuestions,
    hasUserAnswered,
    hasAgentNeededInfo,
    setCurrentQuestion,
    addPendingQuestion,
    markQuestionAnswered,
    clearCurrentQuestion,
    resetBroadcastState,
    isQuestionPending,
    getUnansweredQuestions
  }

  return (
    <BroadcastContext.Provider value={value}>
      {children}
    </BroadcastContext.Provider>
  )
}

export function useBroadcast() {
  const context = useContext(BroadcastContext)
  if (context === undefined) {
    throw new Error("useBroadcast must be used within a BroadcastProvider")
  }
  return context
}
