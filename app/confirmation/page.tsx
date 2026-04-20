'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { CheckCircle, Download, Home, MessageCircle, AlertCircle, Loader2 } from 'lucide-react'
import Header from '../components/Header'
import StepIndicator from '../components/StepIndicator'
import { generateWhatsAppMessage, getWhatsAppUrl } from '../utils/whatsapp'

const QRCode = dynamic(() => import('react-qr-code'), { ssr: false })

interface EligibilityData {
  fullName: string
  email: string
  phone: string
  address: string
  state: string
  userId: string
}

export default function ConfirmationPage() {
  const router = useRouter()
  const qrRef = useRef<HTMLDivElement>(null)
  const [data] = useState<EligibilityData | null>(() => {
    if (typeof window === 'undefined') return null
    const stored = sessionStorage.getItem('eligibilityData')
    return stored ? (JSON.parse(stored) as EligibilityData) : null
  })
  const [barcodeData, setBarcodeData] = useState<Record<string, unknown> | null>(null)
  const [qrValue, setQrValue] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const generateBarcode = async (userData: EligibilityData) => {
    try {
      const response = await fetch('/api/generate-barcode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userData.userId,
          fullName: userData.fullName,
          address: userData.address,
          state: userData.state,
        }),
      })

      const result = await response.json()
      if (response.ok) {
        setBarcodeData(result.barcodeData)
        setQrValue(result.base64QR)
      } else {
        throw new Error(result.error)
      }
    } catch (err) {
      console.error('Barcode generation error:', err)
      setError('Failed to generate QR code. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!data) {
      router.push('/')
      return
    }
    const body = JSON.stringify({
      userId: data.userId,
      fullName: data.fullName,
      address: data.address,
      state: data.state,
    })
    fetch('/api/generate-barcode', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    })
      .then((response) => {
        return response.json().then((result: { barcodeData: Record<string, unknown>; base64QR: string; error?: string }) => {
          if (!response.ok) throw new Error(result.error ?? 'Unknown error')
          setBarcodeData(result.barcodeData)
          setQrValue(result.base64QR)
        })
      })
      .catch((err: unknown) => {
        console.error('Barcode generation error:', err)
        setError('Failed to generate QR code. Please try again.')
      })
      .finally(() => setIsLoading(false))
  // `data` is from a lazy state initializer and is never reassigned,
  // so it is intentionally excluded from the dependency array.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  const handleWhatsApp = () => {
    if (!data) return
    const message = generateWhatsAppMessage(data.fullName, data.address, data.userId)
    const url = getWhatsAppUrl(message)
    window.open(url, '_blank')
  }

  const handleDownload = () => {
    if (!qrRef.current || !data) return
    const svg = qrRef.current.querySelector('svg')
    if (!svg) return

    const canvas = document.createElement('canvas')
    const size = 280
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, size, size)

    const svgData = new XMLSerializer().serializeToString(svg)
    const img = new Image()
    img.onload = () => {
      ctx.drawImage(img, 20, 20, size - 40, size - 40)
      const link = document.createElement('a')
      link.download = `FedEx_Package_${data.userId}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    }
    img.src = 'data:image/svg+xml;base64,' + Buffer.from(svgData).toString('base64')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-fedex-light">
        <Header />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Loader2 className="w-10 h-10 text-fedex-purple animate-spin mx-auto mb-4" />
            <p className="font-body text-gray-500">Generating your package code...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-fedex-light">
        <Header />
        <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
          <StepIndicator currentStep={3} />
          <div className="card text-center">
            <AlertCircle className="w-12 h-12 text-fedex-error mx-auto mb-4" />
            <h3 className="font-display font-bold text-xl text-fedex-dark mb-2">Generation Failed</h3>
            <p className="font-body text-gray-500 mb-6">{error}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={() => data && generateBarcode(data)} className="btn-primary">
                Retry
              </button>
              <button onClick={() => router.push('/')} className="btn-secondary">
                Back Home
              </button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  const timestamp = barcodeData?.timestamp as string | undefined

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-fedex-light">
      <Header />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <StepIndicator currentStep={3} />

        {/* Success Banner */}
        <div className="bg-fedex-success rounded-2xl p-5 mb-6 flex items-start gap-3 animate-fade-in">
          <CheckCircle className="w-6 h-6 text-white flex-shrink-0 mt-0.5 animate-checkmark" />
          <div>
            <h3 className="font-display font-bold text-white text-lg">
              You Qualify for Package Distribution! 🎉
            </h3>
            {data && (
              <p className="font-mono text-white/80 text-sm mt-1">
                Claim reference: <span className="font-bold">{data.userId}</span>
              </p>
            )}
          </div>
        </div>

        {/* QR Code Card */}
        <div className="card mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <h3 className="font-display font-bold text-xl text-fedex-dark mb-1 text-center">
            Your Collection Code
          </h3>
          <p className="font-body text-sm text-gray-500 text-center mb-5">
            Scan at FedEx pickup point to claim your package
          </p>
          <div ref={qrRef} className="flex justify-center">
            <div className="bg-white p-4 rounded-xl shadow-card animate-pulse-soft border border-gray-100">
              {qrValue && (
                <QRCode
                  value={qrValue}
                  size={200}
                  bgColor="#FFFFFF"
                  fgColor="#1A1A1A"
                />
              )}
            </div>
          </div>
          <p className="font-mono text-center text-xs text-gray-400 mt-4">
            {data?.userId}
          </p>
        </div>

        {/* Summary Card */}
        <div className="card mb-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <h3 className="font-display font-bold text-lg text-fedex-dark mb-4">
            Distribution Summary
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: 'Name', value: data?.fullName },
              { label: 'State', value: data?.state },
              { label: 'Eligible', value: '✅ Yes' },
              { label: 'Generated', value: timestamp ? new Date(timestamp).toLocaleString() : 'Now' },
            ].map(({ label, value }) => (
              <div key={label} className="bg-fedex-light rounded-xl p-3">
                <p className="font-body text-xs text-gray-400 mb-0.5">{label}</p>
                <p className="font-body text-sm font-semibold text-fedex-dark">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 bg-fedex-light rounded-xl p-3">
            <p className="font-body text-xs text-gray-400 mb-0.5">Address</p>
            <p className="font-body text-sm font-semibold text-fedex-dark">{data?.address}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <button
            onClick={handleWhatsApp}
            className="btn-whatsapp w-full flex items-center justify-center gap-2 py-4 text-base"
          >
            <MessageCircle className="w-5 h-5" />
            Send via WhatsApp
          </button>
          <button
            onClick={handleDownload}
            className="btn-secondary w-full flex items-center justify-center gap-2 py-4 text-base"
          >
            <Download className="w-5 h-5" />
            Download QR Code
          </button>
          <button
            onClick={() => router.push('/')}
            className="w-full text-gray-400 font-body text-sm py-3 hover:text-fedex-dark transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Back Home
          </button>
        </div>
      </main>
    </div>
  )
}
