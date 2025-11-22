import React from 'react'
import { Metadata } from 'next'
import { GlobalStyle } from '../lib/theme'
import { Providers } from './providers'
import { RootProvider } from '../components/RootProvider'
import 'intersection-observer'

export const metadata: Metadata = {
  title: 'E-Commerce Store',
  description: 'E-Commerce application built with Next.js and Apollo Client',
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
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
        />
      </head>
      <body>
        <GlobalStyle />
        <Providers>
          <RootProvider>
            {children}
          </RootProvider>
        </Providers>
      </body>
    </html>
  )
}
