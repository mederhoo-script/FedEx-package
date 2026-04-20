import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const requestSchema = z.object({
  userId: z.string().min(1),
  fullName: z.string().min(1),
  address: z.string().min(1),
  state: z.string().min(1),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = requestSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request data.' },
        { status: 400 }
      )
    }

    const { userId, fullName, address, state } = parsed.data

    const barcodeData = {
      userId,
      name: fullName,
      address,
      state,
      timestamp: new Date().toISOString(),
      eligible: true,
      version: '1.0',
    }

    const base64Data = Buffer.from(JSON.stringify(barcodeData)).toString('base64')

    return NextResponse.json({
      barcodeData,
      base64QR: base64Data,
      qrValue: base64Data,
    })
  } catch {
    return NextResponse.json(
      { error: 'Failed to generate barcode. Please try again.' },
      { status: 500 }
    )
  }
}
