import React from 'react'
import { withRouter } from 'next/router'
import { Box, Text, Flex } from '@64labs/ui'
import { useQuery, gql } from '../lib/gql'

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

const CategoryHeader = ({ router: { query } }) => {
  const { data, loading, error } = useQuery(categoryHeaderQuery, {
    variables: {
      id: query.cgid
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

export default withRouter(CategoryHeader)
