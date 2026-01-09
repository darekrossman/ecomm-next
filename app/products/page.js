import { Suspense } from 'react'
import ProductsContent from './products-content'

/**
 * Products List Page - Server Component
 * 
 * This is the App Router products page at /products?cgid=xxx.
 * It's a Server Component that exports metadata and wraps the ProductsContent
 * Client Component in a Suspense boundary.
 * 
 * Why this pattern?
 * - metadata export is only supported in Server Components
 * - useSearchParams/useRouter/usePathname hooks require a Client Component
 * - Modal routing logic (useProductRouteModal) requires client-side state
 * - Suspense boundary required for useSearchParams during static rendering
 * 
 * Modal Routing:
 * This page implements modal routing where clicking a product opens a modal
 * while updating the URL with the pid parameter. The modal routing logic is
 * handled in the products-content.js Client Component using:
 * - useRouter for navigation (push/replace)
 * - usePathname for current path
 * - useSearchParams for query parameters (cgid, pid)
 * 
 * Migrated from: pages/products.js
 * Changes:
 * - Removed withRouter HOC -> hooks in Client Component
 * - Router.push/replace -> router.push/replace from useRouter
 * - router.asPath -> usePathname() + useSearchParams()
 * - router.query -> useSearchParams().get()
 * - shallow: true option removed (App Router handles this differently)
 */

export const metadata = {
  title: 'Products - ecomm-next',
  description: 'Browse our product catalog',
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
