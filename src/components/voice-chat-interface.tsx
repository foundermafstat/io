"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useTranslations } from "./translations-context"
import { useReplica } from "./replica-provider"
import useWebRTCAudioSession from "@/hooks/use-webrtc"
import { VoiceSelector } from "./voice-select"
import { BroadcastButton } from "./broadcast-button"
import { MessageControls } from "./message-controls"
import { TextInput } from "./text-input"
import { TokenUsageDisplay } from "./token-usage-display"
import { StatusDisplay } from "./status-display"
import { ToolsEducation } from "./tools-education"
import { tools } from "@/lib/tools"

export default function VoiceChatInterface() {
  const { t } = useTranslations()
  const { selectedReplicaUuid } = useReplica()
  const [voice, setVoice] = useState("ash")

  // Tools are imported from lib/tools

  // WebRTC audio session hook
  const {
    isSessionActive,
    startSession,
    stopSession,
    sendTextMessage,
    msgs: hookMsgs,
    conversation: hookConversation,
    status: hookStatus,
  } = useWebRTCAudioSession(voice, tools)

  // Handle start/stop session
  const handleStartStopClick = () => {
    if (isSessionActive) {
      stopSession()
    } else {
      startSession()
    }
  }

  // Handle text message submission
  const handleTextSubmit = (text: string) => {
    if (isSessionActive) {
      sendTextMessage(text)
    }
  }

  // Use data from hook
  const msgs = hookMsgs
  const conversation = hookConversation
  const status = hookStatus

  return (
    <div className="flex flex-col h-full bg-background">
      <ScrollArea className="flex-1 p-4">
        <div className="flex flex-col items-center justify-center min-h-full">
          <motion.div 
            className="w-full max-w-md bg-card text-card-foreground rounded-xl border shadow-sm p-6 space-y-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <VoiceSelector value={voice} onValueChange={setVoice} />
            
            <div className="flex flex-col items-center gap-4">
              <BroadcastButton 
                isSessionActive={isSessionActive} 
                onClick={handleStartStopClick}
              />
            </div>
            
            {msgs.length > 4 && <TokenUsageDisplay messages={msgs} />}
            
            {status && (
              <motion.div 
                className="w-full flex flex-col gap-2"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <MessageControls conversation={conversation} msgs={msgs} />
                <TextInput 
                  onSubmit={handleTextSubmit}
                  disabled={!isSessionActive}
                />
              </motion.div>
            )}
          </motion.div>
          
          {status && <StatusDisplay status={status} />}
          
          <div className="w-full flex flex-col items-center gap-4">
            <ToolsEducation />
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
