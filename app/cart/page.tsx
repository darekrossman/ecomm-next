'use client'

import { gql, useQuery } from '../../lib/gql'
import { Box, Text, Flex, Image } from '@64labs/ui'

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

export default function CartPage() {
  const { data, error, loading } = useQuery(GET_CART_QUERY)

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error!</div>
  }

  return (
    <Box>
      <Text>Cart</Text>
      {data.user.cart.items.map((item: any) => (
        <Flex key={item}>
          <Text>{item.id}</Text>
        </Flex>
      ))}
    </Box>
  )
}
