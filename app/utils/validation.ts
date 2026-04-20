import { z } from 'zod'

export const eligibilityFormSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name must contain only letters and spaces'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .transform((val) => val.toLowerCase()),
  phone: z
    .string()
    .regex(/^(\+?234|0)[0-9]{9,10}$/, 'Please enter a valid phone number (e.g. +2348012345678 or 08012345678)'),
  address: z
    .string()
    .min(10, 'Address must be at least 10 characters')
    .max(200, 'Address must be at most 200 characters'),
  state: z.string().min(1, 'Please select your state'),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms to continue',
  }),
})

export type EligibilityFormData = z.infer<typeof eligibilityFormSchema>
