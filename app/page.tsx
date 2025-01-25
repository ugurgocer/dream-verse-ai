import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-900 to-indigo-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-8">Rüya Yorumlama Asistanı</h1>
        <Link 
          href="/dream-chat" 
          className="bg-white text-purple-900 px-8 py-4 rounded-full font-semibold 
                   hover:bg-purple-100 transition-colors duration-200 shadow-lg"
        >
          Rüyanı Yorumlat
        </Link>
      </div>
    </main>
  )
}
