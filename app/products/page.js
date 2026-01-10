import { Suspense } from 'react'
import ProductsContent from './products-content'

export const metadata = {
  title: 'Products - ecomm-next',
}

function ProductsFallback() {
  return <div>Loading products...</div>
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsFallback />}>
      <ProductsContent />
    </Suspense>
  )
}
