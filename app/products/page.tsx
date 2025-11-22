'use client'

import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import gql from 'graphql-tag'
import { useQuery } from '../../lib/gql'
import { Box } from '@64labs/ui'
import Layout from '../../components/Layout'
import CategoryHeader from '../../components/CategoryHeader'
import CategoryHero from '../../components/CategoryHero'
import CategoryProductList from '../../components/CategoryProductList'
import ProductDetailModal from '../../components/ProductDetailModal'

const useProductRouteModal = (router: ReturnType<typeof useRouter>) => {
  const [isModalOpen, setModalState] = useState(false)
  const [prevPathname, setPrevPathname] = useState('')

  const closeModal = () => {
    setModalState(false)
    router.push(prevPathname)
  }

  const openModal = (e: React.MouseEvent, product: any) => {
    e.preventDefault()
    setPrevPathname(window.location.pathname)
    setModalState(true)
    router.push(`?pid=${product.id}`, { scroll: false })
  }

  return [isModalOpen, openModal, closeModal] as const
}

export default function ProductListPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isProductModalOpen, openProductModal, closeProductModal] = useProductRouteModal(router)
  
  const selectedProductId = searchParams.get('pid')

  return (
    <Layout>
      <Box px={[0, 3]}>
        <CategoryHeader />
        <CategoryHero />
        <CategoryProductList onProductClick={openProductModal} />
      </Box>

      <ProductDetailModal
        selectedProductId={selectedProductId}
        isOpen={isProductModalOpen}
        close={closeProductModal}
      />
    </Layout>
  )
}
