import type { Metadata } from 'next'
import 'intersection-observer'
import { Providers } from '../components/providers'
import apollo from '../graphql/apollo'

export const metadata: Metadata = {
  title: 'Next.js App',
  description: 'App Router Migration'
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  // Initialize Apollo client
  const apolloClient = apollo()

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </head>
      <body>
        <Providers apolloClient={apolloClient}>
          {children}
        </Providers>
      </body>
    </html>
  )
}
