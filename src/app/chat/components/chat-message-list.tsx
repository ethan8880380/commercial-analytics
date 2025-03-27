"use client"

import * as React from "react"
import { ChatMessage } from "./chat-message"

export interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
}

interface ChatMessageListProps {
  messages: Message[]
}

export function ChatMessageList({ messages }: ChatMessageListProps) {
  const messagesEndRef = React.useRef<HTMLDivElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div 
      ref={containerRef}
      className="flex-1 overflow-y-auto h-full px-4 pb-4"
    >
      <div className="max-w-3xl mx-auto space-y-6 pt-6">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            content={message.content}
            isUser={message.isUser}
            timestamp={message.timestamp}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  )
} 