'use client'

import { Inter } from 'next/font/google'
import Providers from '../components/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Default Title',
  description: 'Default description',
  viewport: 'initial-scale=1.0, width=device-width',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers Component={({ children, ...props }) => <>{children}</>} pageProps={{}}>
          {children}
        </Providers>
      </body>
    </html>
  )
}