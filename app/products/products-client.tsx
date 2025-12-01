'use client'

import React, { useState } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Box } from '@64labs/ui'
import Layout from '@/components/Layout'
import CategoryHeader from '@/components/CategoryHeader'
import CategoryHero from '@/components/CategoryHero'
import CategoryProductList from '@/components/CategoryProductList'
import ProductDetailModal from '@/components/ProductDetailModal'

// Custom hook for product route modal - replaces withRouter pattern
function useProductRouteModal() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [isModalOpen, setModalState] = useState(false)
  const [prevPathname, setPrevPathname] = useState(pathname + (searchParams.toString() ? `?${searchParams.toString()}` : ''))

  const closeModal = () => {
    setModalState(false)
    router.replace(prevPathname)
  }

  const openModal = (e: React.MouseEvent, product: { id: string }) => {
    e.preventDefault()
    const currentPath = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '')
    setPrevPathname(currentPath)
    setModalState(true)

    // Update URL to show product
    const newParams = new URLSearchParams(searchParams.toString())
    newParams.set('pid', product.id)
    router.push(`${pathname}?${newParams.toString()}`, { scroll: false })
  }

  // Get current product ID from search params
  const selectedProductId = searchParams.get('pid')

  return { isModalOpen, openModal, closeModal, selectedProductId }
}

export default function ProductsClient() {
  const { isModalOpen, openModal, closeModal, selectedProductId } = useProductRouteModal()

  return (
    <Layout>
      <Box px={[0, 3]}>
        <CategoryHeader />
        <CategoryHero />
        <CategoryProductList onProductClick={openModal} />
      </Box>

      <ProductDetailModal
        selectedProductId={selectedProductId}
        isOpen={isModalOpen}
        close={closeModal}
      />
    </Layout>
  )
}
