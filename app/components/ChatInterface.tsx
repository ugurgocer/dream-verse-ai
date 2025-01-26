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
    <div className="min-h-[calc(100vh-73px)] relative overflow-hidden pt-24">
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#2D1B69]/70 via-transparent to-[#1A1037]/90"></div>
        <div className="absolute inset-0 bg-gradient-radial from-[#2D1B69]/70 via-[#1A1037]/80 to-[#1A1037]/90"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-[#FF61DC] rounded-full 
                       blur-[128px] opacity-10 animate-pulse"></div>
        <div className="absolute bottom-1/3 -right-1/4 w-96 h-96 bg-[#00DAF7] rounded-full 
                       blur-[128px] opacity-10 animate-pulse delay-700"></div>
      </div>

      {/* Chat Container */}
      <div className="max-w-3xl mx-auto h-[calc(100vh-6rem)] flex flex-col relative z-20">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-[#FF61DC] to-[#FF61DC]/80 backdrop-blur-sm'
                    : 'bg-white/10 backdrop-blur-sm border border-white/10'
                }`}
              >
                {message.role === 'assistant' ? (
                  <ReactMarkdown
                    className="prose prose-invert prose-sm max-w-none"
                    components={{
                      h1: ({ children }) => (
                        <h1 className="text-2xl font-bold mb-4 text-white/90">{children}</h1>
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
                        <strong className="font-bold text-[#FF61DC]">{children}</strong>
                      ),
                      em: ({ children }) => (
                        <em className="text-[#00DAF7] not-italic font-medium">{children}</em>
                      ),
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                ) : (
                  <p className="text-white/90">{message.content}</p>
                )}
                {message.isStreaming && (
                  <span className="inline-block w-2 h-4 ml-1 bg-[#00DAF7] animate-pulse" />
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="p-4 border-t border-white/10 bg-[#1A1037]/80 backdrop-blur-sm">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={inputPlaceholder}
              className="flex-1 bg-white/10 text-white rounded-lg px-4 py-2 
                       focus:outline-none focus:ring-2 focus:ring-[#FF61DC]/50
                       placeholder-white/50 backdrop-blur-sm"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-[#FF61DC] to-[#00DAF7] px-6 py-2 rounded-lg font-semibold
                       hover:opacity-90 transition-opacity duration-200
                       disabled:opacity-50 backdrop-blur-sm"
            >
              {isLoading ? 'Yanıtlıyor...' : 'Gönder'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 