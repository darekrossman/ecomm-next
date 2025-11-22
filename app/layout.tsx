import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { Providers } from '../components/providers'
import apollo from '../graphql/apollo'
import { GlobalStyle } from '../lib/theme'

export const metadata: Metadata = {
  title: 'Ecomm Next',
  description: 'E-commerce application built with Next.js',
  viewport: 'initial-scale=1.0, width=device-width',
}

interface RootLayoutProps {
  children: ReactNode
}

// Note: Apollo client initialization requires dynamic setup
// This is a placeholder - integrate your apollo client initialization here
async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <GlobalStyle />
        {/* 
          TODO: Integrate Apollo client provider
          The _app.js wraps components with apollo(AppWrapper) which initializes the client.
          In App Router, you'll need to:
          1. Create an apollo client instance (use initializeApollo pattern for SSR)
          2. Pass it to the Providers component
          3. Wrap children with Providers
        */}
        {children}
      </body>
    </html>
  )
}

export default RootLayout
