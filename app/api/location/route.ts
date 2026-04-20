import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    // Get IP from request headers
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0].trim() : '0.0.0.0'

    // Use ip-api.com for free geolocation (no key required for basic use)
    const geoResponse = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,regionName,city`, {
      next: { revalidate: 300 }, // Cache 5 minutes
    })

    if (geoResponse.ok) {
      const geoData = await geoResponse.json()
      if (geoData.status === 'success') {
        return NextResponse.json({
          state: geoData.regionName || 'Unknown',
          city: geoData.city || 'Unknown',
          country: geoData.country || 'Unknown',
          eligible: true,
          confidence: 'high',
        })
      }
    }

    // Fallback response
    return NextResponse.json({
      state: 'Lagos',
      city: 'Lagos',
      country: 'Nigeria',
      eligible: true,
      confidence: 'low',
    })
  } catch {
    return NextResponse.json({
      state: 'Lagos',
      city: 'Lagos',
      country: 'Nigeria',
      eligible: true,
      confidence: 'low',
    })
  }
}
