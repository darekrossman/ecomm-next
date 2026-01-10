'use client'

import { useState, useCallback } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { Box } from '@64labs/ui'
import Layout from '../../components/Layout'
import CategoryHeader from '../../components/CategoryHeader'
import CategoryHero from '../../components/CategoryHero'
import CategoryProductList from '../../components/CategoryProductList'
import ProductDetailModal from '../../components/ProductDetailModal'

function useProductRouteModal() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [isModalOpen, setModalState] = useState(false)
  const [prevPath, setPrevPath] = useState('')

  const closeModal = useCallback(() => {
    setModalState(false)
    router.replace(prevPath || pathname)
  }, [router, prevPath, pathname])

  const openModal = useCallback(
    (e, product) => {
      e.preventDefault()
      // Store current path with search params
      const currentParams = searchParams.toString()
      setPrevPath(currentParams ? `${pathname}?${currentParams}` : pathname)
      setModalState(true)

      // Create new search params preserving existing ones
      const newParams = new URLSearchParams(searchParams)
      newParams.set('pid', product.id)
      router.push(`${pathname}?${newParams.toString()}`, { scroll: false })
    },
    [router, pathname, searchParams]
  )

  return [isModalOpen, openModal, closeModal]
}

export default function ProductsContent() {
  const [isModalOpen, openModal, closeModal] = useProductRouteModal()
  const searchParams = useSearchParams()
  const pid = searchParams.get('pid')

  return (
    <Layout>
      <Box px={[0, 3]}>
        <CategoryHeader />
        <CategoryHero />
        <CategoryProductList onProductClick={openModal} />
      </Box>

      <ProductDetailModal
        selectedProductId={pid}
        isOpen={isModalOpen}
        close={closeModal}
      />
    </Layout>
  )
}
