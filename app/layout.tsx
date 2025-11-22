import type { Metadata } from 'next'
import 'intersection-observer'
import { GlobalStyle } from '../lib/theme'
import { Providers } from '../components/providers'
import apollo from '../graphql/apollo'

export const metadata: Metadata = {
  title: 'E-Commerce App',
  description: 'E-Commerce Application',
  viewport: 'width=device-width, initial-scale=1.0',
}

interface RootLayoutProps {
  children: React.ReactNode
}

function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <GlobalStyle />
        {/* Note: apolloClient needs to be initialized as Server Component */}
        {/* Temporary workaround - apolloClient should be passed from server context */}
        {children}
      </body>
    </html>
  )
}

export default RootLayout
