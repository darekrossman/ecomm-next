'use client'

import React from 'react'
import gql from 'graphql-tag'
import { useSearchParams } from 'next/navigation'
import { useQuery } from '../lib/gql'
import { ProductDetailFragment } from '../lib/fragments'
import { Grid } from '@64labs/ui'
import ProductItem from './ProductItem'

const productsQuery = gql`
  query products($categoryId: String!) {
    productList: getCategoryProductList(categoryId: $categoryId) {
      products {
        edges {
          node {
            ...ProductDetailFragment
          }
        }
      }
    }
  }
  ${ProductDetailFragment}
`

export default function CategoryProductList({ onProductClick }) {
  const searchParams = useSearchParams()
  const cgid = searchParams.get('cgid')

  const { data, loading, error } = useQuery(productsQuery, {
    variables: {
      categoryId: cgid
    },
    errorPolicy: 'all'
  })

  if (loading) {
    return <div>Loading.......</div>
  }

  if (error && !data) {
    return <div>Error :(</div>
  }

  if (!data || !data.productList || !data.productList.products) {
    return <div>No products here</div>
  }

  return (
    <Grid
      ess={{
        gridTemplateColumns: ['repeat(2, 1fr)', 'repeat(21, 1fr)'],
        gridColumnGap: ['15px', '15px'],
        gridRowGap: ['45px', '100px'],
        p: 3
      }}
    >
      {data.productList.products.edges.map(({ node: product }, i) => {
        const col = i % 10
        const start = [2, 9, 16, 2, 16, 2, 9, 16, 9, 16]
        const span = [5, 5, 5, 10, 5, 5, 5, 5, 5, 5]

        return (
          <ProductItem
            key={`${product.id}-${i}`}
            product={product}
            start={start}
            span={span}
            col={col}
            onClick={onProductClick}
          />
        )
      })}
    </Grid>
  )
}
