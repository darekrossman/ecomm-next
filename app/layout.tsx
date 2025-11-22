import type { Metadata } from 'next'
import React from 'react'
import { Providers } from '@/components/Providers'
import apollo from '@/graphql/apollo'
import 'intersection-observer'

export const metadata: Metadata = {
  title: 'E-Commerce',
  description: 'E-Commerce Platform',
  viewport: 'initial-scale=1.0, width=device-width',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Note: Apollo client setup needs to be adapted for App Router
  // This is a placeholder - actual implementation depends on your Apollo setup
  const apolloClient = null

  return (
    <html lang="en">
      <body>
        {apolloClient ? (
          <Providers apolloClient={apolloClient}>{children}</Providers>
        ) : (
          children
        )}
      </body>
    </html>
  )
}
