import { Providers } from './providers'

/**
 * Root Layout for the App Router
 * 
 * This layout replaces pages/_app.js and pages/_document.js functionality.
 * It must include html and body tags as required by Next.js App Router.
 * 
 * The Providers component is a Client Component that wraps children with:
 * - ApolloProvider (GraphQL client)
 * - ThemeProvider (Emotion theming)
 * - NotificationsProvider (Toast notifications)
 * - GlobalStyle (Global CSS reset)
 */

/**
 * Static metadata for the application.
 * Replaces next/head usage from the Pages Router.
 * 
 * Note: viewport is now configured separately via the viewport export
 * as of Next.js 14 (viewport in metadata is deprecated).
 */
export const metadata = {
  title: 'ecomm-next',
  description: 'Next.js E-commerce Application',
}

/**
 * Viewport configuration (separated from metadata in Next.js 14+)
 * Replaces: <meta name="viewport" content="initial-scale=1.0, width=device-width" />
 */
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
