'use client'

import { useState } from 'react'
import ChatInterface from '../components/ChatInterface'

interface Message {
  role: 'user' | 'assistant'
  content: string
  isStreaming?: boolean
}

export default function DreamChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Merhaba! Lütfen analiz etmemi istediğiniz rüyanızı detaylı bir şekilde anlatır mısınız?'
    }
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [isDreamAnalyzed, setIsDreamAnalyzed] = useState(false)

  const handleSendMessage = async (message: string) => {
    setMessages(prev => [...prev, { role: 'user', content: message }])
    setIsLoading(true)

    try {
      setMessages(prev => [...prev, { role: 'assistant', content: '', isStreaming: true }])

      const response = await fetch('/api/dream-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message, 
          messages,
          isDreamAnalyzed
        })
      })

      if (!response.ok) throw new Error('API yanıt hatası')

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (!reader) throw new Error('Stream okunamadı')

      let accumulatedMessage = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        accumulatedMessage += chunk

        setMessages(prev => {
          const newMessages = [...prev]
          const lastMessage = newMessages[newMessages.length - 1]
          if (lastMessage.role === 'assistant') {
            lastMessage.content = accumulatedMessage
          }
          return newMessages
        })
      }

      if (!isDreamAnalyzed) {
        setIsDreamAnalyzed(true)
      }

      setMessages(prev => {
        const newMessages = [...prev]
        const lastMessage = newMessages[newMessages.length - 1]
        if (lastMessage.role === 'assistant') {
          lastMessage.isStreaming = false
        }
        return newMessages
      })

    } catch (error) {
      console.error('Chat hatası:', error)
      setMessages(prev => prev.slice(0, -1))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ChatInterface 
      messages={messages}
      onSendMessage={handleSendMessage}
      inputPlaceholder={
        isDreamAnalyzed 
          ? "Rüyanızla ilgili sormak istediğiniz soruları yazabilirsiniz..." 
          : "Rüyanızı detaylı bir şekilde anlatın..."
      }
      isLoading={isLoading}
    />
  )
} 