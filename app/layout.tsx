import React from 'react'
import Providers from './providers'

export const metadata = {
  viewport: 'initial-scale=1.0, width=device-width',
  title: 'Next.js App'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
