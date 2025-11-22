import type { Metadata } from 'next'
import 'intersection-observer'
import { Providers } from '@/components/providers'
import apollo from '@/graphql/apollo'

export const metadata: Metadata = {
  title: 'E-Commerce Store',
  description: 'Next.js 16 E-Commerce Application',
  viewport: 'initial-scale=1.0, width=device-width'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  // Note: Apollo client initialization needs to be adapted for App Router
  // For now, passing a placeholder that will be configured in a separate setup
  const apolloClient = (global as any).apolloClient

  return (
    <html lang="en">
      <body>
        <Providers apolloClient={apolloClient}>
          {children}
        </Providers>
      </body>
    </html>
  )
}
