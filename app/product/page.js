import { Suspense } from 'react'
import ProductDetailContent from './product-detail-content'

export const metadata = {
  title: 'Product - ecomm-next',
  description: 'View product details',
}

export default function ProductPage() {
  return (
    <Suspense fallback={<div style={{ padding: 16 }}>Loading product...</div>}>
      <ProductDetailContent />
    </Suspense>
  )
}
