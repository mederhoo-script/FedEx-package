'use client'

interface StepIndicatorProps {
  currentStep: 1 | 2 | 3
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  const steps = [
    { num: 1, label: 'Location' },
    { num: 2, label: 'Details' },
    { num: 3, label: 'Confirmation' },
  ]

  return (
    <div className="flex items-center justify-center py-6">
      {steps.map((step, index) => (
        <div key={step.num} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm transition-all duration-300 ${
                step.num < currentStep
                  ? 'bg-fedex-success text-white'
                  : step.num === currentStep
                  ? 'bg-fedex-purple text-white shadow-lg ring-4 ring-fedex-purple/20'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              {step.num < currentStep ? '✓' : step.num}
            </div>
            <span
              className={`mt-1 text-xs font-body ${
                step.num === currentStep ? 'text-fedex-purple font-semibold' : 'text-gray-400'
              }`}
            >
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`h-0.5 w-16 sm:w-24 mx-2 mb-4 transition-all duration-300 ${
                step.num < currentStep ? 'bg-fedex-success' : 'bg-gray-200'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )
}
