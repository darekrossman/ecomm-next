import { Suspense } from 'react'
import ProductDetailContent from './product-detail-content'

export const metadata = {
  title: 'Product - ecomm-next',
}

function ProductFallback() {
  return <div>Loading product...</div>
}

export default function ProductPage() {
  return (
    <Suspense fallback={<ProductFallback />}>
      <ProductDetailContent />
    </Suspense>
  )
}
