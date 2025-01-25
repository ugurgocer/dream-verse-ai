import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function POST(request: Request) {
  try {
    const { message, messages, isDreamAnalyzed } = await request.json()
    
    // Gemini modeli başlat
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    // Chat geçmişini Gemini formatına dönüştür
    const chatHistory = messages.slice(0, -1).map((msg: { role: string; content: string }) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }))

    // Chat başlat
    const chat = model.startChat({
      history: chatHistory,
    })

    let prompt
    if (!isDreamAnalyzed) {
      prompt = `Sen profesyonel bir rüya analisti ve terapistsin. Kullanıcının rüyasını analiz et.

# Rüya Analizi

## Genel Bakış
[Rüyanın genel değerlendirmesi]

## Semboller ve Anlamları
[Önemli sembollerin listesi]

## Psikolojik Yorum
[Psikolojik analiz]

## Öneriler
[Öneriler ve içgörüler]

Rüya: ${message}`
    } else {
      prompt = message
    }

    // Stream yanıtı başlat
    const result = await chat.sendMessageStream(prompt)
    
    // Stream'i encode et ve gönder
    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of result.stream) {
          const text = chunk.text()
          controller.enqueue(new TextEncoder().encode(text))
        }
        controller.close()
      }
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked'
      }
    })

  } catch (error) {
    console.error('API hatası:', error)
    return NextResponse.json({ error: 'Bir hata oluştu', details: error }, { status: 500 })
  }
} 