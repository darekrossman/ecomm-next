'use client'

import React from 'react'
import gql from 'graphql-tag'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Box, Text, Flex, Grid, Button, Image } from '@64labs/ui'
import { useQuery } from '../lib/gql'

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

  if (loading) {
    return <div>Loading.......</div>
  }

  if (error) {
    return <div>Error :(</div>
  }

  if (!data.category || !data.category.categories) {
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
