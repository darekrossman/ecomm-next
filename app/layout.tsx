import React from 'react'
import { Metadata } from 'next'
import Head from 'next/head'
import 'intersection-observer'
import { GlobalStyle } from '../lib/theme'
import { Providers } from './providers'
import { NotificationsContainer } from './notifications-container'

export const metadata: Metadata = {
  title: 'Next.js App',
  description: 'Migrated to Next.js 16 App Router',
  viewport: 'initial-scale=1.0, width=device-width'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
        />
      </head>
      <body>
        <Providers>
          <GlobalStyle />
          {children}
          <NotificationsContainer />
        </Providers>
      </body>
    </html>
  )
}
