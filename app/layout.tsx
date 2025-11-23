import type { Metadata } from 'next'
import 'intersection-observer'
import { Providers } from '@/components/providers'
import { GlobalStyle } from '@/lib/theme'

export const metadata: Metadata = {
  title: 'Application',
  description: 'Next.js App Router Application',
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
        <Providers>
          <GlobalStyle />
          {children}
        </Providers>
      </body>
    </html>
  )
}
