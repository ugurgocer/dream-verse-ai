import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

interface Message {
  role: 'user' | 'assistant'
  content: string
  isStreaming?: boolean
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function POST(request: Request) {
  try {
    const { message, messages, isDreamAnalyzed } = await request.json() as {
      message: string
      messages: Message[]
      isDreamAnalyzed: boolean
    }
    
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    // İlk mesajı atlayıp, diğer mesajları Gemini formatına dönüştür
    const chatHistory = messages.slice(1).map((msg: Message) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }))

    // Rüya içeriğini bul (ilk kullanıcı mesajı)
    const dreamContent = messages.find((msg: Message) => msg.role === 'user')?.content || ''

    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
        maxOutputTokens: 1000,
      },
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
      prompt = `Sen bir rüya analisti olarak görev yapıyorsun. Kullanıcının anlattığı şu rüya hakkında konuşuyoruz:

"${dreamContent}"

Kullanıcı şu soruyu sordu: "${message}"

Lütfen sadece bu rüya bağlamında ve önceki analizler ışığında yanıt ver. 
Rüya dışındaki konulara girmekten kaçın. 
Eğer soru rüya ile ilgili değilse, kullanıcıyı nazikçe rüya bağlamına yönlendir.

Yanıtını markdown formatında ver.`
    }

    const result = await chat.sendMessageStream(prompt)
    
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
    return NextResponse.json({ error: 'Bir hata oluştu' }, { status: 500 })
  }
} 