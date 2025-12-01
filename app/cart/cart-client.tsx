'use client'

import { gql, useQuery } from '@/lib/gql'
import { Box, Text, Flex } from '@64labs/ui'
import Layout from '@/components/Layout'

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

export default function CartClient() {
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
          <Text>Error loading cart!</Text>
        </Box>
      </Layout>
    )
  }

  return (
    <Layout>
      <Box p={4}>
        <Text variant="h1" mb={4}>Cart</Text>
        {data?.user?.cart?.items?.map((item: { id: string }) => (
          <Flex key={item.id} mb={2}>
            <Text>{item.id}</Text>
          </Flex>
        ))}
        {(!data?.user?.cart?.items || data.user.cart.items.length === 0) && (
          <Text>Your cart is empty</Text>
        )}
      </Box>
    </Layout>
  )
}
