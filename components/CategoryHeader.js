'use client'

import React from 'react'
import gql from 'graphql-tag'
import { useSearchParams } from 'next/navigation'
import { Box, Text, Flex } from '@64labs/ui'
import { useQuery } from '../lib/gql'

const categoryHeaderQuery = gql`
  query category($id: String!) {
    category: getCategory(id: $id) {
      id
      name
      categories {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  }
`

export default function CategoryHeader() {
  const searchParams = useSearchParams()
  const cgid = searchParams.get('cgid')

  const { data, loading, error } = useQuery(categoryHeaderQuery, {
    variables: {
      id: cgid
    }
  })

  if (loading) {
    return <div>Loading.......</div>
  }

  if (error) {
    return <div>Error :(</div>
  }

  const { category } = data

  return (
    <Box px={3} py={4}>
      <Flex ess={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Text variant="h2">{category.name}</Text>
        </Box>
      </Flex>
    </Box>
  )
}
