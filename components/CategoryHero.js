'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Box, Text } from '@64labs/ui'
import { gql, useQuery } from '@/lib/gql'

const categoryProductListQuery = gql`
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

const CategoryHero = () => {
  const searchParams = useSearchParams()
  const cgid = searchParams.get('cgid')

  const { data, loading, error } = useQuery(categoryProductListQuery, {
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

  if (!data?.category || !data?.category?.categories) {
    return null
  }

  const { category } = data
  const { categories } = category

  return (
    <Box p={3} mb={4}>
      {categories.edges.map(({ node }) => (
        <Text as="h3" fontWeight="normal" py={1} key={node.name}>
          <Link href={`/products?cgid=${node.id}`}>
            {node.name}
          </Link>
        </Text>
      ))}
    </Box>
  )
}

export default CategoryHero
