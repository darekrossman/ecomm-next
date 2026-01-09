'use client'

/**
 * ProductDetailContent - Client Component
 * 
 * This is a Client Component that renders the product detail page content.
 * It needs 'use client' because:
 * 1. useSearchParams hook from next/navigation requires client-side features
 * 2. useProductDetail hook uses Apollo Client's useQuery hook
 * 3. Layout component uses AppHeader and NavDrawer which use React hooks
 * 4. @64labs/ui components use Emotion styling with runtime features
 * 
 * The parent Server Component (app/product/page.js) exports metadata for SEO.
 * 
 * Migrated from: pages/product.js
 * Changes:
 * - withRouter HOC removed
 * - router.query.id -> useSearchParams().get('id')
 */

import { useSearchParams } from 'next/navigation'
import { Grid, Box, Text, Image } from '@64labs/ui'
import Layout from '../../components/Layout'
import ProductBuyModule from '../../components/ProductBuyModule'
import useProductDetail from '../../lib/hooks/useProductDetail'

export default function ProductDetailContent() {
  const searchParams = useSearchParams()
  const productId = searchParams.get('id')
  
  const [queryResponse, selections, variant] = useProductDetail(productId)

  const { data, loading, error } = queryResponse

  if (loading) {
    return (
      <Layout>
        <Box p={4}>
          <Text>Loading</Text>
        </Box>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <Box p={4}>
          <Text>Error :(</Text>
        </Box>
      </Layout>
    )
  }

  if (!data || !data.product) {
    return (
      <Layout>
        <Box p={4}>
          <Text>Product not found</Text>
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
          {selections.color.images.map(img => (
            <Image key={img.src} src={img.src} alt={img.alt} width={3} height={4} fluid mb={3} />
          ))}
        </Box>
      </Grid>
    </Layout>
  )
}
