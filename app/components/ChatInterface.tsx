'use client'

import { useState, useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

interface Message {
  role: 'user' | 'assistant'
  content: string
  isStreaming?: boolean
}

interface ChatInterfaceProps {
  messages: Message[]
  onSendMessage: (message: string) => Promise<void>
  inputPlaceholder: string
  isLoading: boolean
}

export default function ChatInterface({ 
  messages,
  onSendMessage,
  inputPlaceholder,
  isLoading
}: ChatInterfaceProps) {
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const message = input.trim()
    setInput('')
    await onSendMessage(message)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-indigo-900 p-4">
      <div className="max-w-3xl mx-auto bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 h-[80vh] flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.role === 'user'
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/20 text-white'
                }`}
              >
                {message.role === 'assistant' ? (
                  <ReactMarkdown
                    className="prose prose-invert prose-sm max-w-none"
                    components={{
                      h1: ({ children }) => (
                        <h1 className="text-2xl font-bold mb-4 text-white">{children}</h1>
                      ),
                      h2: ({ children }) => (
                        <h2 className="text-xl font-semibold mb-3 text-white/90">{children}</h2>
                      ),
                      p: ({ children }) => (
                        <p className="mb-2 last:mb-0 text-white/80 leading-relaxed">{children}</p>
                      ),
                      ul: ({ children }) => (
                        <ul className="mb-4 space-y-2 list-none">{children}</ul>
                      ),
                      li: ({ children }) => (
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>{children}</span>
                        </li>
                      ),
                      strong: ({ children }) => (
                        <strong className="font-bold text-white">{children}</strong>
                      ),
                      em: ({ children }) => (
                        <em className="text-purple-200 not-italic font-medium">{children}</em>
                      ),
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                ) : (
                  <p className="text-white/90">{message.content}</p>
                )}
                {message.isStreaming && (
                  <span className="inline-block w-2 h-4 ml-1 bg-white/50 animate-pulse" />
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="p-4 border-t border-white/20">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={inputPlaceholder}
              className="flex-1 bg-white/10 text-white rounded-lg px-4 py-2 
                       focus:outline-none focus:ring-2 focus:ring-purple-400
                       placeholder-white/50"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-white text-purple-900 px-6 py-2 rounded-lg font-semibold
                       hover:bg-purple-100 transition-colors duration-200
                       disabled:opacity-50"
            >
              {isLoading ? 'Yanıtlıyor...' : 'Gönder'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 