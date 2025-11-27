import React from 'react'
import type { Metadata } from 'next'
import { Providers } from '../components/providers'

export const metadata: Metadata = {
  title: 'Ecomm Next',
  description: 'Modern commerce storefront powered by Next.js and Apollo GraphQL.',
  viewport: {
    width: 'device-width',
    initialScale: 1
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
