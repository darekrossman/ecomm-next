'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'
import { Grid, Box, Text, Image } from '@64labs/ui'
import Layout from '@/components/Layout'
import ProductBuyModule from '@/components/ProductBuyModule'
import useProductDetail from '@/lib/hooks/useProductDetail'

export default function ProductClient() {
  const searchParams = useSearchParams()
  const productId = searchParams.get('id')

  // If no product ID, show error
  if (!productId) {
    return (
      <Layout>
        <Box p={4}>
          <Text variant="h2">Product not found</Text>
          <Text>Please provide a product ID in the URL.</Text>
        </Box>
      </Layout>
    )
  }

  return <ProductDetailContent productId={productId} />
}

function ProductDetailContent({ productId }: { productId: string }) {
  const [queryResponse, selections, variant] = useProductDetail(productId)
  const { data, loading, error } = queryResponse

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
          <Text>Error loading product</Text>
        </Box>
      </Layout>
    )
  }

  const { product } = data

  return (
    <Layout>
      <Grid
        ess={{
          gridTemplateColumns: ['1fr', 'repeat(21, 1fr)'],
          gridColumnGap: 15,
          pt: 5,
          px: [3, 0]
        }}
      >
        <Box ess={{ gridColumn: ['auto', '15 / 20'] }}>
          <Box pt={[0, 5]} ess={{ position: 'sticky', top: 0 }}>
            <ProductBuyModule product={product} selections={selections} variant={variant} />
          </Box>
        </Box>

        <Box ess={{ gridColumn: ['auto', '2 / 13'], gridRow: [2, 1] }}>
          {selections?.color?.images?.map((img: { src: string; alt: string }) => (
            <Image key={img.src} src={img.src} alt={img.alt} width={3} height={4} fluid mb={3} />
          ))}
        </Box>
      </Grid>
    </Layout>
  )
}
