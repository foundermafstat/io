"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface ChatTabContextType {
  activeTab: string
  setActiveTab: (tab: string) => void
  isHydrated: boolean
}

const ChatTabContext = createContext<ChatTabContextType | undefined>(undefined)

export function ChatTabProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState("text")
  const [isHydrated, setIsHydrated] = useState(false)

  // Загружаем сохраненную активную вкладку после монтирования на клиенте
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTab = localStorage.getItem('chat-active-tab') || "text"
      setActiveTab(savedTab)
    }
    setIsHydrated(true)
  }, [])

  // Сохраняем активную вкладку в localStorage при изменении
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('chat-active-tab', activeTab)
    }
  }, [activeTab])

  return (
    <ChatTabContext.Provider value={{ activeTab, setActiveTab, isHydrated }}>
      {children}
    </ChatTabContext.Provider>
  )
}

export function useChatTab() {
  const ctx = useContext(ChatTabContext)
  if (!ctx) throw new Error("useChatTab must be used within ChatTabProvider")
  return ctx
}

