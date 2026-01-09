'use client'

/**
 * CartContent - Client Component
 * 
 * This is a Client Component that renders the cart page content.
 * It needs 'use client' because:
 * 1. useQuery hook from Apollo Client requires client-side features
 * 2. Layout component uses AppHeader and NavDrawer which use React hooks
 * 3. @64labs/ui components use Emotion styling with runtime features
 * 
 * The parent Server Component (app/cart/page.js) exports metadata for SEO.
 * 
 * Migrated from: pages/cart.js
 */

import { gql, useQuery } from '../../lib/gql'
import { Box, Text, Flex } from '@64labs/ui'
import Layout from '../../components/Layout'

const GET_CART_QUERY = gql`
  query GetCart {
    user {
      id
      cart {
        id
        items {
          id
        }
      }
    }
  }
`

export default function CartContent() {
  const { data, error, loading } = useQuery(GET_CART_QUERY)

  if (loading) {
    return (
      <Layout>
        <Box p={4}>
          <Text>Loading...</Text>
        </Box>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <Box p={4}>
          <Text color="error">Error loading cart!</Text>
        </Box>
      </Layout>
    )
  }

  return (
    <Layout>
      <Box p={4}>
        <Text variant="h1" mb={3}>Cart</Text>
        {data?.user?.cart?.items?.length > 0 ? (
          data.user.cart.items.map(item => (
            <Flex key={item.id} py={2} borderBottom="1px solid" borderColor="gray">
              <Text>{item.id}</Text>
            </Flex>
          ))
        ) : (
          <Text>Your cart is empty</Text>
        )}
      </Box>
    </Layout>
  )
}
