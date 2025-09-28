"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface ChatContextType {
  isChatVisible: boolean
  toggleChat: () => void
  setChatVisible: (visible: boolean) => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isChatVisible, setIsChatVisible] = useState(true)

  const toggleChat = () => {
    setIsChatVisible(prev => !prev)
  }

  const setChatVisible = (visible: boolean) => {
    setIsChatVisible(visible)
  }

  return (
    <ChatContext.Provider value={{ isChatVisible, toggleChat, setChatVisible }}>
      {children}
    </ChatContext.Provider>
  )
}

export function useChatVisibility() {
  const ctx = useContext(ChatContext)
  if (!ctx) throw new Error("useChatVisibility must be used within ChatProvider")
  return ctx
}
