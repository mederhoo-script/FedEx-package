export interface LocationData {
  state: string
  city: string
  country: string
  eligible: boolean
  confidence: 'high' | 'medium' | 'low'
}

export async function detectLocationByBrowser(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported'))
      return
    }
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      timeout: 10000,
      maximumAge: 60000,
    })
  })
}

export async function getLocationByIP(): Promise<LocationData> {
  const response = await fetch('/api/location')
  if (!response.ok) {
    throw new Error('Failed to detect location')
  }
  return response.json()
}

export function formatLocation(location: LocationData): string {
  if (location.city && location.state) {
    return `${location.city}, ${location.state}`
  }
  return location.state || location.city || 'Unknown Location'
}
