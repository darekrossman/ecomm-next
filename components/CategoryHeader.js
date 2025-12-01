'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Box, Text, Flex } from '@64labs/ui'
import { gql, useQuery } from '@/lib/gql'

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

const CategoryHeader = () => {
  const searchParams = useSearchParams()
  const cgid = searchParams.get('cgid')

  const { data, loading, error } = useQuery(categoryHeaderQuery, {
    variables: {
      id: cgid
    },
    skip: !cgid
  })

  if (!cgid) {
    return null
  }

  if (loading) {
    return <div>Loading.......</div>
  }

  if (error) {
    return <div>Error :(</div>
  }

  const { category } = data || {}

  if (!category) {
    return null
  }

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

export default CategoryHeader
