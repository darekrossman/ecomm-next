'use client'

/**
 * HomeContent - Client Component
 * 
 * This is a Client Component that renders the home page content.
 * It needs 'use client' because:
 * 1. Layout component uses AppHeader and NavDrawer which use React hooks
 *    (useQuery, useSpring, useState, useReducer)
 * 2. @64labs/ui components use Emotion styling with runtime features
 * 
 * The parent Server Component (app/page.js) exports metadata for SEO.
 */

import { Text } from '@64labs/ui'
import Layout from '../components/Layout'

export default function HomeContent() {
  return (
    <Layout>
      <Text p={4} variant="h1">
        Home
      </Text>
    </Layout>
  )
}
