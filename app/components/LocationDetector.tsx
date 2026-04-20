'use client'
import { useState, useEffect } from 'react'
import { MapPin, AlertCircle, CheckCircle, Loader2 } from 'lucide-react'

interface LocationData {
  state: string
  city: string
  country: string
  eligible: boolean
}

interface LocationDetectorProps {
  onLocationDetected: (location: LocationData) => void
}

export default function LocationDetector({ onLocationDetected }: LocationDetectorProps) {
  const [status, setStatus] = useState<'idle' | 'detecting' | 'success' | 'error'>('idle')
  const [location, setLocation] = useState<LocationData | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    detectLocation()
  }, [])

  const detectLocation = async () => {
    setStatus('detecting')
    setError(null)

    try {
      // Try IP-based detection
      const response = await fetch('/api/location')
      if (response.ok) {
        const data = await response.json()
        setLocation(data)
        setStatus('success')
        onLocationDetected(data)
      } else {
        throw new Error('Location detection failed')
      }
    } catch {
      setStatus('error')
      setError('Could not detect location automatically.')
    }
  }

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
