'use client'
import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center bg-fedex-light">
          <div className="card max-w-md w-full mx-4 text-center">
            <div className="text-fedex-error text-5xl mb-4">⚠️</div>
            <h2 className="font-display font-bold text-xl text-fedex-dark mb-2">Something went wrong</h2>
            <p className="font-body text-gray-500 mb-6">Please refresh the page and try again.</p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Refresh Page
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
