'use client'

import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Box, Text, Flex, Grid, Button, Image } from '@64labs/ui'

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

export default CategoryHeader
