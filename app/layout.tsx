import type { Metadata } from 'next'
import 'intersection-observer'
import { Providers } from '../components/providers'
import { GlobalStyle } from '../lib/theme'
import { NotificationsContainer } from '../components/NotificationsContainer'

export const metadata: Metadata = {
  title: 'E-Commerce Platform',
  description: 'Premium e-commerce platform',
  viewport: 'initial-scale=1.0, width=device-width',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <GlobalStyle />
        <Providers>
          {children}
          <NotificationsContainer />
        </Providers>
      </body>
    </html>
  )
}
