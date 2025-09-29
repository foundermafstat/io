"use client"

import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Mic } from "lucide-react"
import ChatInterface from "./chat-interface"
import VoiceChatInterface from "./voice-chat-interface"
import { useTranslations } from "./translations-context"
import { useChatTab } from "./chat-tab-context"

export default function ChatTabs() {
  const { activeTab, setActiveTab, isHydrated } = useChatTab()
  const { t } = useTranslations()

  // Не рендерим Tabs до гидратации, чтобы избежать mismatch
  if (!isHydrated) {
    return (
      <div className="flex flex-col h-full bg-background">
        <div className="h-10 border-b flex">
          <div className="flex-1 flex items-center justify-center px-3 py-1.5 text-sm">
            <MessageSquare className="h-4 w-4 mr-2" />
            {t('chatTabs.textChat')}
          </div>
          <div className="flex-1 flex items-center justify-center px-3 py-1.5 text-sm text-muted-foreground">
            <Mic className="h-4 w-4 mr-2" />
            {t('chatTabs.voiceChat')}
          </div>
        </div>
        <div className="flex-1">
          <ChatInterface />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-background">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full">
        <TabsList className="grid w-full grid-cols-2 rounded-none border-b">
          <TabsTrigger 
            value="text" 
            className="flex items-center gap-2 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
          >
            <MessageSquare className="h-4 w-4" />
            {t('chatTabs.textChat')}
          </TabsTrigger>
          <TabsTrigger 
            value="voice" 
            className="flex items-center gap-2 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
          >
            <Mic className="h-4 w-4" />
            {t('chatTabs.voiceChat')}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="text" className="flex-1 m-0 h-full">
          <ChatInterface />
        </TabsContent>
        
        <TabsContent value="voice" className="flex-1 m-0 h-full">
          <VoiceChatInterface />
        </TabsContent>
      </Tabs>
    </div>
  )
}
