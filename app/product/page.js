import { Suspense } from 'react'
import ProductDetailContent from './product-detail-content'

/**
 * Product Detail Page - Server Component
 * 
 * This is the App Router product page at /product?id=xxx.
 * It's a Server Component that exports metadata and wraps the ProductDetailContent
 * Client Component in a Suspense boundary.
 * 
 * Why this pattern?
 * - metadata export is only supported in Server Components
 * - useSearchParams hook requires a Client Component
 * - useProductDetail hook (Apollo) requires a Client Component
 * - Separating them allows SEO metadata with client-side data fetching
 * - Suspense boundary required for useSearchParams during static rendering
 * 
 * Migrated from: pages/product.js
 * Changes:
 * - Removed withRouter HOC -> useSearchParams in Client Component
 * - query.id -> searchParams.get('id') in Client Component
 */

export const metadata = {
  title: 'Product - ecomm-next',
  description: 'Product details',
}

function ProductDetailFallback() {
  return <div>Loading...</div>
}

export default function ProductPage() {
  return (
    <Suspense fallback={<ProductDetailFallback />}>
      <ProductDetailContent />
    </Suspense>
  )
}
