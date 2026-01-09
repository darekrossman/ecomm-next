/**
 * Home Page - App Router
 * 
 * This file migrates pages/index.js to the App Router.
 * It uses a Server Component pattern with a Client Component child
 * to support both metadata exports and the Layout component (which
 * uses React hooks via AppHeader and NavDrawer).
 * 
 * The page remains a Server Component to export metadata for SEO.
 * The actual content is rendered via a Client Component that wraps
 * the Layout with @64labs/ui components.
 */

import HomeContent from './home-content'

/**
 * Static metadata for the home page.
 * Replaces next/head usage from the Pages Router.
 * 
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata
 */
export const metadata = {
  title: 'Home - ecomm-next',
  description: 'Welcome to ecomm-next - Next.js E-commerce Application',
}

/**
 * Home page component (Server Component)
 * 
 * This is a Server Component that renders the HomeContent Client Component.
 * The separation allows us to export metadata while using client-side
 * features in the Layout component.
 */
export default function HomePage() {
  return <HomeContent />
}
