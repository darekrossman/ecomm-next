import type { Metadata } from 'next'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'E-commerce Store',
  description: 'A modern e-commerce platform built with Next.js',
  viewport: {
    width: 'device-width',
    initialScale: 1
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
