import React from 'react'
import type { Metadata } from 'next'
import { Providers } from '@/components/providers'
import { GlobalStyle } from '@/lib/theme'
import 'intersection-observer'

export const metadata: Metadata = {
  title: 'E-Commerce',
  description: 'E-Commerce Application',
  viewport: 'initial-scale=1.0, width=device-width',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <GlobalStyle />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
