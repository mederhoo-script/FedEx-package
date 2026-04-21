'use client'
import { useState, useEffect } from 'react'
import { MapPin, AlertCircle, CheckCircle, Loader2 } from 'lucide-react'

interface LocationData {
  state: string
  city: string
  country: string
  eligible: boolean
}

interface IpWhoIsResponse {
  success: boolean
  region?: string
  city?: string
  country?: string
}

interface LocationDetectorProps {
  onLocationDetected: (location: LocationData) => void
}

async function fetchLocationFromBrowser(): Promise<LocationData> {
  // ipwho.is allows CORS from any browser origin and always sees the real client
  // IP (including active VPN). No API key required, free tier is generous.
  try {
    const res = await fetch('https://ipwho.is/')
    if (res.ok) {
      const data: IpWhoIsResponse = await res.json()
      if (data.success) {
        return {
          state: data.region || 'Unknown',
          city: data.city || 'Unknown',
          country: data.country || 'Unknown',
          eligible: true,
        }
      }
    }
  } catch {
    // fall through to server-side proxy
  }
  // Server-side proxy fallback (also uses ipwho.is)
  const proxyRes = await fetch('/api/location')
  if (!proxyRes.ok) throw new Error('Location detection failed')
  return proxyRes.json()
}

export default function LocationDetector({ onLocationDetected }: LocationDetectorProps) {
  const [status, setStatus] = useState<'idle' | 'detecting' | 'success' | 'error'>('detecting')
  const [location, setLocation] = useState<LocationData | null>(null)
  const [error, setError] = useState<string | null>(null)

  const detectLocation = () => {
    setStatus('detecting')
    setError(null)
    fetchLocationFromBrowser()
      .then((data) => {
        setLocation(data)
        setStatus('success')
        onLocationDetected(data)
      })
      .catch(() => {
        setStatus('error')
        setError('Could not detect location automatically.')
      })
  }

  useEffect(() => {
    fetchLocationFromBrowser()
      .then((data) => {
        setLocation(data)
        setStatus('success')
        onLocationDetected(data)
      })
      .catch(() => {
        setStatus('error')
        setError('Could not detect location automatically.')
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="border-l-4 border-fedex-purple bg-white rounded-xl shadow-card p-5">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          {status === 'detecting' && (
            <Loader2 className="w-5 h-5 text-fedex-purple animate-spin" />
          )}
          {status === 'success' && (
            <CheckCircle className="w-5 h-5 text-fedex-success" />
          )}
          {status === 'error' && (
            <AlertCircle className="w-5 h-5 text-fedex-error" />
          )}
          {status === 'idle' && (
            <MapPin className="w-5 h-5 text-fedex-purple" />
          )}
        </div>
        <div className="flex-1">
          {status === 'detecting' && (
            <p className="font-body text-sm text-gray-600">
              <span className="font-semibold">📍 Detecting your location...</span>
            </p>
          )}
          {status === 'success' && location && (
            <div>
              <p className="font-body text-sm font-semibold text-fedex-dark">
                📍 {location.city}, {location.state}
              </p>
              <p className="font-body text-xs text-fedex-success mt-0.5">✅ Eligible for package distribution</p>
            </div>
          )}
          {status === 'error' && (
            <div>
              <p className="font-body text-sm text-fedex-error">{error}</p>
              <button
                onClick={detectLocation}
                className="text-xs text-fedex-purple underline mt-1 font-body"
              >
                Try again
              </button>
            </div>
          )}
        </div>
        {status === 'success' && (
          <button
            onClick={detectLocation}
            className="text-xs text-fedex-purple underline font-body flex-shrink-0"
          >
            Change
          </button>
        )}
      </div>
    </div>
  )
}

