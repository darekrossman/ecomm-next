import type { Metadata, Viewport } from 'next'
import { Providers } from '../components/providers'
import { ApolloWrapper } from '../components/apollo-provider'

export const metadata: Metadata = {
  title: 'E-Commerce App',
  description: 'E-Commerce application built with Next.js',
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
        <ApolloWrapper>
          <Providers>
            {children}
          </Providers>
        </ApolloWrapper>
      </body>
    </html>
  )
}
