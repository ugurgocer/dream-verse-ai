import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--color-secondary)] text-white relative overflow-hidden pt-24">
      {/* Hero Image as Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/dream-hero.webp"
          alt="Dream Analysis Illustration"
          fill
          priority
          className="object-cover opacity-95"
          style={{
            objectPosition: '50% 30%'
          }}
        />
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 z-10">
        <div className="absolute inset-0 bg-gradient-overlay"></div>
      </div>

      {/* Floating Elements - Gradient üzerindeki efektler */}
      <div className="absolute inset-0 z-20">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-[#FF61DC] rounded-full 
                       blur-[128px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/3 -right-1/4 w-96 h-96 bg-[#00DAF7] rounded-full 
                       blur-[128px] opacity-20 animate-pulse delay-700"></div>
      </div>

      {/* Content - En üstteki katman */}
      <div className="relative z-30">
        {/* Main Content */}
        <div className="container mx-auto px-4 mt-12 flex flex-col items-center">
          {/* Slogan */}
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-[#FF61DC] to-[#00DAF7] 
                           bg-clip-text text-transparent leading-tight">
              Rüyalarını Anlat,<br />
              Anlamını Keşfet
            </h1>
            <p className="text-xl text-white/90 mb-12 drop-shadow-lg">
              Yapay zeka destekli rüya analizi ile bilinçaltınıza yolculuğa çıkın
            </p>

            {/* CTA Button */}
            <Link 
              href="/dream-chat" 
              className="bg-gradient-to-r from-[#FF61DC] to-[#00DAF7] px-8 py-4 rounded-lg 
                       text-lg font-semibold hover:opacity-90 transition-opacity duration-200 
                       shadow-lg shadow-[#FF61DC]/20 inline-block backdrop-blur-sm"
            >
              Rüyanı Yorumlat
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
