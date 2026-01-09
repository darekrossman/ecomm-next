import { Suspense } from 'react'
import ProductsContent from './products-content'

export const metadata = {
  title: 'Products - ecomm-next',
  description: 'Browse our product catalog',
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div style={{ padding: 16 }}>Loading products...</div>}>
      <ProductsContent />
    </Suspense>
  )
}
