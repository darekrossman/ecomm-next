'use client'

/**
 * ProductsContent - Client Component
 * 
 * This is a Client Component that renders the products list page with modal routing.
 * It needs 'use client' because:
 * 1. useSearchParams, useRouter, usePathname from next/navigation require client-side
 * 2. Modal state management uses useState
 * 3. CategoryHeader, CategoryHero, CategoryProductList may use hooks
 * 4. Layout component uses React hooks
 * 5. @64labs/ui components use Emotion styling with runtime features
 * 
 * Modal Routing Pattern:
 * The useProductRouteModal hook manages opening/closing a product detail modal
 * while keeping the URL in sync. This is a common pattern for e-commerce sites
 * where you want users to preview products without leaving the list page.
 * 
 * App Router Migration:
 * - withRouter HOC -> useRouter, usePathname, useSearchParams from 'next/navigation'
 * - Router.push(url, as, options) -> router.push(url) (no 'as' parameter in App Router)
 * - Router.replace(url) -> router.replace(url)
 * - router.asPath -> pathname + '?' + searchParams.toString()
 * - router.query.xxx -> searchParams.get('xxx')
 * - shallow: true option is removed (App Router navigation is shallow by default
 *   for same-route navigations that only change search params)
 * 
 * Note: The original code used URL masking (as parameter) to show /product?id=xxx
 * in the URL bar while the actual route was /products?cgid=xxx&pid=xxx. This
 * URL masking is not directly supported in App Router. Instead, we update the
 * search params on the current route, which provides similar UX.
 * 
 * Migrated from: pages/products.js
 */

import { useState, useCallback } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { Box } from '@64labs/ui'
import Layout from '../../components/Layout'
import CategoryHeader from '../../components/CategoryHeader'
import CategoryHero from '../../components/CategoryHero'
import CategoryProductList from '../../components/CategoryProductList'
import ProductDetailModal from '../../components/ProductDetailModal'

/**
 * Hook for managing product modal with URL synchronization
 * 
 * This replaces the original useProductRouteModal that took a router parameter.
 * Now uses hooks from next/navigation directly.
 * 
 * @returns {[boolean, Function, Function]} - [isModalOpen, openModal, closeModal]
 */
function useProductRouteModal() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  const [isModalOpen, setModalState] = useState(false)
  const [prevPath, setPrevPath] = useState('')
  
  const closeModal = useCallback(() => {
    setModalState(false)
    // Navigate back to the previous path (without pid)
    if (prevPath) {
      router.replace(prevPath, { scroll: false })
    } else {
      // Fallback: remove pid from current URL
      const newParams = new URLSearchParams(searchParams.toString())
      newParams.delete('pid')
      const newUrl = newParams.toString() ? `${pathname}?${newParams.toString()}` : pathname
      router.replace(newUrl, { scroll: false })
    }
  }, [router, prevPath, pathname, searchParams])
  
  const openModal = useCallback((e, product) => {
    e.preventDefault()
    
    // Store current path for returning after modal close
    const currentPath = searchParams.toString() 
      ? `${pathname}?${searchParams.toString()}`
      : pathname
    setPrevPath(currentPath)
    
    setModalState(true)
    
    // Create new search params with pid added
    const newParams = new URLSearchParams(searchParams.toString())
    newParams.set('pid', product.id)
    
    // Push to update URL with pid parameter
    // Using scroll: false to prevent scrolling to top
    router.push(`${pathname}?${newParams.toString()}`, { scroll: false })
  }, [router, pathname, searchParams])
  
  return [isModalOpen, openModal, closeModal]
}

export default function ProductsContent() {
  const [isProductModalOpen, openProductModal, closeProductModal] = useProductRouteModal()
  const searchParams = useSearchParams()
  
  // Get the product ID from search params for the modal
  const pid = searchParams.get('pid')
  
  return (
    <Layout>
      <Box px={[0, 3]}>
        <CategoryHeader />
        <CategoryHero />
        <CategoryProductList onProductClick={openProductModal} />
      </Box>

      <ProductDetailModal
        selectedProductId={pid}
        isOpen={isProductModalOpen}
        close={closeProductModal}
      />
    </Layout>
  )
}
