import type { Metadata } from 'next'
import 'intersection-observer'
import { Providers } from '@/components/providers'
import { GlobalStyle } from '@/lib/theme'

export const metadata: Metadata = {
  title: 'E-Commerce Store',
  description: 'Welcome to our e-commerce store',
  viewport: 'initial-scale=1.0, width=device-width',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </head>
      <body>
        <Providers>
          <GlobalStyle />
          {children}
        </Providers>
      </body>
    </html>
  )
}
