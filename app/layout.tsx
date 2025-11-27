import type { Metadata, Viewport } from 'next'
import 'intersection-observer'
import { Providers } from '../components/providers'

export const metadata: Metadata = {
  title: 'E-Commerce Store',
  description: 'Next.js E-Commerce Application',
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
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
