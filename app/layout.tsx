import 'intersection-observer'
import type { Metadata, Viewport } from 'next'
import { Providers } from '../components/providers'

export const metadata: Metadata = {
  title: 'Ecommerce Store',
  description: 'Next.js ecommerce application',
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
          {children}
        </Providers>
      </body>
    </html>
  )
}
