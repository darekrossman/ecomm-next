import 'intersection-observer'
import type { Metadata, Viewport } from 'next'
import { Providers } from '../components/providers'
import { GlobalStyle } from '../lib/theme'

export const metadata: Metadata = {
  title: 'App',
  description: 'Next.js App',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
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
