'use client'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          {/* FedEx Logo using text-based branding */}
          <div className="flex items-center">
            <span className="font-display font-bold text-2xl text-fedex-purple">Fed</span>
            <span className="font-display font-bold text-2xl text-fedex-orange">Ex</span>
          </div>
          <div className="ml-2 h-6 w-px bg-gray-300" />
          <span className="font-body text-sm text-gray-500 ml-2">Package Distribution</span>
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-fedex-success rounded-full animate-pulse" />
          <span className="text-xs font-body text-gray-500 hidden sm:block">DISTRIBUTION LIVE</span>
        </div>
      </div>
    </header>
  )
}
