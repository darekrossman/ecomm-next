import type { Metadata } from 'next'
import 'intersection-observer'
import { Providers } from '../components/providers'
import initApollo from '../graphql/util/init-apollo'
import apolloConfig from '../graphql/apollo-config'

export const metadata: Metadata = {
  title: 'E-Commerce App',
  description: 'Modern e-commerce platform',
  viewport: 'initial-scale=1.0, width=device-width',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Initialize Apollo client for SSR
  const apolloClient = initApollo(apolloConfig)

  return (
    <html lang="en">
      <body>
        <Providers apolloClient={apolloClient}>{children}</Providers>
      </body>
    </html>
  )
}
