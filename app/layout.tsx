import 'intersection-observer'
import type { Metadata, Viewport } from 'next'
import { Providers } from '../components/providers'
import { GlobalStyle } from '../lib/theme'

export const metadata: Metadata = {
  title: 'App',
  description: 'Next.js Application',
}

export const viewport: Viewport = {
  initialScale: 1.0,
  width: 'device-width',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <GlobalStyle />
          {children}
        </Providers>
      </body>
    </html>
  )
}
