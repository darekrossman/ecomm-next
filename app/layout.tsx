import type { Metadata } from 'next'
import 'intersection-observer'
import { RootProviders } from './providers'
import apollo from '../graphql/apollo'

export const metadata: Metadata = {
  title: 'E-commerce',
  description: 'Next.js E-commerce Application',
  viewport: 'width=device-width, initial-scale=1.0',
}

// Apollo client setup - wrapped for use in client component
const getApolloClient = () => {
  // This will be passed to RootProviders
  return require('../graphql/apollo').default
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Note: Apollo client needs to be initialized - see migration notes
  // For now, this structure maintains the provider tree from _app.js
  const ApolloWrapper = apollo

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
      </head>
      <body>
        {/* Temporary: Apollo client injection needs refactoring */}
        {/* See graphql/apollo.js for withApolloClient HOC migration */}
        <RootProviders apolloClient={null}>
          {children}
        </RootProviders>
      </body>
    </html>
  )
}
