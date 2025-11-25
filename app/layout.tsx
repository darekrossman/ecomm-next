import type { Metadata } from 'next'
import { Providers } from '../components/providers'

export const metadata: Metadata = {
  title: 'E-Commerce Store',
  description: 'Your e-commerce destination',
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
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
