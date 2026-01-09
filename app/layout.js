import { Providers } from './providers'

export const metadata = {
  title: 'ecomm-next',
  description: 'E-commerce Next.js application',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
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
