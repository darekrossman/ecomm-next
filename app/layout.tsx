import type { Metadata } from 'next'
import { Providers } from '@/components/providers'
import 'intersection-observer'

export const metadata: Metadata = {
  title: 'App',
  description: 'Next.js App Router',
  viewport: 'width=device-width, initial-scale=1.0',
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
