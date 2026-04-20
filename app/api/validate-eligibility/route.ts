import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const requestSchema = z.object({
  fullName: z.string().min(2).max(50),
  email: z.string().email(),
  phone: z.string().min(10).max(15),
  address: z.string().min(10).max(200),
  state: z.string().min(1),
})

function generateUserId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const timestamp = Date.now().toString(36).toUpperCase()
  let random = ''
  for (let i = 0; i < 6; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return `${random}${timestamp}`.slice(0, 12)
}

// Simple in-memory rate limiter (resets on cold start)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const limit = rateLimitMap.get(ip)
  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 })
    return true
  }
  if (limit.count >= 5) return false
  limit.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown'
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait before trying again.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const parsed = requestSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { eligible: false, message: 'Invalid form data submitted.' },
        { status: 400 }
      )
    }

    const { state } = parsed.data

    // All users are eligible
    const userId = generateUserId()

    return NextResponse.json({
      eligible: true,
      state,
      userId,
      message: 'You qualify for the FedEx package distribution.',
    })
  } catch {
    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    )
  }
}
