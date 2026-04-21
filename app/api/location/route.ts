import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    // Get IP from request headers (set by reverse proxies such as Vercel)
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0].trim() : ''

    // Only attempt lookup when we have a routable IP
    if (ip && ip !== '127.0.0.1' && ip !== '::1') {
      const geoResponse = await fetch(`https://ip-api.com/json/${ip}?fields=status,country,regionName,city`)
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
