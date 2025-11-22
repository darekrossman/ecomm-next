import type { Metadata } from 'next'
import { Providers } from '../components/providers'
import { GlobalStyle } from '../lib/theme'

export const metadata: Metadata = {
  title: 'EComm Next',
  description: 'E-commerce application',
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
        <GlobalStyle />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
