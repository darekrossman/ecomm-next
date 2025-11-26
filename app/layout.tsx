import type { Metadata } from 'next'
import { Providers } from '../components/providers'
import apollo from '../graphql/apollo'
import initApollo from '../graphql/util/init-apollo'

export const metadata: Metadata = {
  title: 'E-commerce Store',
  description: 'E-commerce platform built with Next.js',
  viewport: 'initial-scale=1.0, width=device-width'
}

async function RootLayout({ children }: { children: React.ReactNode }) {
  // Initialize Apollo client for SSR
  const apolloClient = initApollo({})

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </head>
      <body>
        <Providers apolloClient={apolloClient}>{children}</Providers>
      </body>
    </html>
  )
}

export default RootLayout
