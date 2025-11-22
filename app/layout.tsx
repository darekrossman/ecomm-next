import type { Metadata } from 'next'
import { Providers } from './providers'
import apollo from '../graphql/apollo'

export const metadata: Metadata = {
  title: 'E-Commerce',
  description: 'E-Commerce Platform',
  viewport: 'width=device-width, initial-scale=1.0',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const apolloClient = apollo({})

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
