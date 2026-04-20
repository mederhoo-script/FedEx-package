'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle, AlertCircle, Loader2, ChevronDown } from 'lucide-react'
import Header from '../components/Header'
import StepIndicator from '../components/StepIndicator'
import { eligibilityFormSchema, type EligibilityFormData } from '../utils/validation'

const STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT - Abuja',
  'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi',
  'Kwara', 'Lagos', 'Nassarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo',
  'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara',
  // International states/regions
  'California', 'New York', 'Texas', 'Florida', 'Illinois',
  'London', 'Manchester', 'Birmingham',
  'Other'
]

export default function EligibilityPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const [detectedState, setDetectedState] = useState<string>('')

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EligibilityFormData>({
    resolver: zodResolver(eligibilityFormSchema),
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('detectedLocation')
      if (stored) {
        const loc = JSON.parse(stored)
        setDetectedState(loc.state || '')
        // Try to match state in list
        const matchedState = STATES.find(s => 
          s.toLowerCase().includes((loc.state || '').toLowerCase()) ||
          (loc.state || '').toLowerCase().includes(s.toLowerCase())
        )
        if (matchedState) {
          setValue('state', matchedState)
        }
      }
    }
  }, [setValue])

  const onSubmit = async (data: EligibilityFormData) => {
    setIsSubmitting(true)
    setApiError(null)

    try {
      const response = await fetch('/api/validate-eligibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok && result.eligible) {
        sessionStorage.setItem('eligibilityData', JSON.stringify({
          ...data,
          userId: result.userId,
          message: result.message,
        }))
        router.push('/confirmation')
      } else {
        setApiError(result.message || 'Eligibility check failed. Please try again.')
      }
    } catch (err) {
      console.error('Eligibility validation error:', err)
      setApiError('Server error. Please try again in 30 seconds.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const watchState = watch('state')

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-fedex-light">
      <Header />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <StepIndicator currentStep={2} />

        <div className="card">
          <div className="mb-6">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-fedex-dark mb-2">
              Complete Your Details
            </h2>
            {detectedState && (
              <p className="font-body text-sm text-fedex-success">
                📍 {detectedState} • <span className="text-fedex-success font-semibold">Eligible</span>
              </p>
            )}
          </div>

          {/* API Error Banner */}
          {apiError && (
            <div className="mb-6 bg-fedex-orange/10 border border-fedex-orange/30 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-fedex-orange flex-shrink-0 mt-0.5" />
              <p className="font-body text-sm text-fedex-dark">{apiError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block font-display font-bold text-sm text-fedex-dark mb-1.5">
                Full Name <span className="text-fedex-error">*</span>
              </label>
              <input
                {...register('fullName')}
                type="text"
                placeholder="John Doe"
                disabled={isSubmitting}
                className={`input-field ${errors.fullName ? 'border-fedex-error focus:border-fedex-error' : ''}`}
              />
              {errors.fullName && (
                <p className="mt-1 text-xs text-fedex-error font-body italic">{errors.fullName.message}</p>
              )}
              {!errors.fullName && watch('fullName')?.length >= 2 && (
                <div className="mt-1 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-fedex-success animate-checkmark" />
                  <span className="text-xs text-fedex-success font-body">Looks good</span>
                </div>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block font-display font-bold text-sm text-fedex-dark mb-1.5">
                Email Address <span className="text-fedex-error">*</span>
              </label>
              <input
                {...register('email')}
                type="email"
                placeholder="john@example.com"
                disabled={isSubmitting}
                className={`input-field ${errors.email ? 'border-fedex-error focus:border-fedex-error' : ''}`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-fedex-error font-body italic">{errors.email.message}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block font-display font-bold text-sm text-fedex-dark mb-1.5">
                Phone Number <span className="text-fedex-error">*</span>
              </label>
              <input
                {...register('phone')}
                type="tel"
                placeholder="+2348012345678 or 08012345678"
                disabled={isSubmitting}
                className={`input-field ${errors.phone ? 'border-fedex-error focus:border-fedex-error' : ''}`}
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-fedex-error font-body italic">{errors.phone.message}</p>
              )}
              <p className="mt-1 text-xs text-gray-400 font-body italic">Format: +234XXXXXXXXXX or 0XXXXXXXXXX</p>
            </div>

            {/* Address */}
            <div>
              <label className="block font-display font-bold text-sm text-fedex-dark mb-1.5">
                Full Address <span className="text-fedex-error">*</span>
              </label>
              <textarea
                {...register('address')}
                rows={3}
                placeholder="123 Main Street, City, State"
                disabled={isSubmitting}
                className={`input-field resize-none ${errors.address ? 'border-fedex-error focus:border-fedex-error' : ''}`}
              />
              {errors.address && (
                <p className="mt-1 text-xs text-fedex-error font-body italic">{errors.address.message}</p>
              )}
              <p className="mt-1 text-xs text-gray-400 font-body italic">
                {watch('address')?.length || 0}/200 characters
              </p>
            </div>

            {/* State */}
            <div>
              <label className="block font-display font-bold text-sm text-fedex-dark mb-1.5">
                State / Region <span className="text-fedex-error">*</span>
              </label>
              <div className="relative">
                <select
                  {...register('state')}
                  disabled={isSubmitting}
                  className={`input-field appearance-none pr-10 ${errors.state ? 'border-fedex-error' : ''} ${watchState ? 'text-fedex-dark' : 'text-gray-400'}`}
                >
                  <option value="">Select your state</option>
                  {STATES.map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
              {errors.state && (
                <p className="mt-1 text-xs text-fedex-error font-body italic">{errors.state.message}</p>
              )}
            </div>

            {/* Terms Checkbox */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  {...register('agreeToTerms')}
                  type="checkbox"
                  disabled={isSubmitting}
                  className="mt-0.5 w-4 h-4 rounded border-gray-300 text-fedex-purple focus:ring-fedex-purple cursor-pointer"
                />
                <span className="font-body text-sm text-gray-600">
                  I agree to the{' '}
                  <span className="text-fedex-purple underline cursor-pointer">Terms of Service</span>
                  {' '}and{' '}
                  <span className="text-fedex-purple underline cursor-pointer">Privacy Policy</span>
                  . I understand my data will be used solely for package distribution.
                </span>
              </label>
              {errors.agreeToTerms && (
                <p className="mt-1 text-xs text-fedex-error font-body italic">{errors.agreeToTerms.message}</p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary flex items-center justify-center gap-2 flex-1 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  'Continue →'
                )}
              </button>
              <button
                type="button"
                onClick={() => router.push('/')}
                disabled={isSubmitting}
                className="btn-secondary flex items-center justify-center flex-1 disabled:opacity-70"
              >
                ← Back
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
