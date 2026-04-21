export interface BarcodeData {
  userId: string
  name: string
  address: string
  state: string
  timestamp: string
  eligible: boolean
  version: string
}

export function generateUserId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const timestamp = Date.now().toString(36).toUpperCase()
  let random = ''
  for (let i = 0; i < 6; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return `${random}${timestamp}`.slice(0, 12)
}

export function createBarcodeData(
  userId: string,
  name: string,
  address: string,
  state: string
): BarcodeData {
  return {
    userId,
    name,
    address,
    state,
    timestamp: new Date().toISOString(),
    eligible: true,
    version: '1.0',
  }
}

export function encodeBarcodeData(data: BarcodeData): string {
  const json = JSON.stringify(data)
  return Buffer.from(json).toString('base64')
}

export function decodeBarcodeData(encoded: string): BarcodeData {
  const json = Buffer.from(encoded, 'base64').toString('utf-8')
  return JSON.parse(json)
}
