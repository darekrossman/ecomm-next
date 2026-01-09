'use client'

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
          <Text>Error loading cart</Text>
        </Box>
      </Layout>
    )
  }

  const cart = data?.user?.cart

  return (
    <Layout>
      <Box p={4}>
        <Text variant="h1" mb={3}>Cart</Text>
        {cart?.items?.length > 0 ? (
          cart.items.map(item => (
            <Flex key={item.id} py={2}>
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
