import { NextRequest, NextResponse } from 'next/server'

interface IpWhoIsResponse {
  success: boolean
  region?: string
  city?: string
  country?: string
}

export async function GET(request: NextRequest) {
  try {
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0].trim() : ''

    // Use ipwho.is — it accepts server-side requests and returns accurate geo data.
    // Pass the real client IP when available; without it ipwho.is uses the caller's IP.
    const url = ip && ip !== '127.0.0.1' && ip !== '::1'
      ? `https://ipwho.is/${ip}`
      : 'https://ipwho.is/'

    const geoResponse = await fetch(url)
    if (geoResponse.ok) {
      const geoData: IpWhoIsResponse = await geoResponse.json()
      if (geoData.success) {
        return NextResponse.json({
          state: geoData.region || 'Unknown',
          city: geoData.city || 'Unknown',
          country: geoData.country || 'Unknown',
          eligible: true,
          confidence: 'high',
        })
      }
    }

    return NextResponse.json({
      state: 'Unknown',
      city: 'Unknown',
      country: 'Unknown',
      eligible: true,
      confidence: 'low',
    })
  } catch {
    return NextResponse.json({
      state: 'Unknown',
      city: 'Unknown',
      country: 'Unknown',
      eligible: true,
      confidence: 'low',
    })
  }
}
