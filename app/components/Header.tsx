import Link from 'next/link'
import { gradientClasses } from '@/app/constants/theme'

export default function Header() {
  return (
    <header className="w-full fixed top-0 z-50 bg-transparent backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <nav className="py-6 flex justify-between items-center">
          <Link 
            href="/" 
            className={`text-2xl font-bold ${gradientClasses.primary} bg-clip-text text-transparent`}
          >
            DreamVerseAI
          </Link>
        </nav>
      </div>
    </header>
  )
} 