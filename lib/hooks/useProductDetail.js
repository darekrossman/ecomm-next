'use client'

import { useState, useEffect } from 'react'
import { gql, useQuery } from '@/lib/gql'
import { ProductDetailFragment } from '@/lib/fragments'

export const useProductSelections = product => {
  const [selectedColor, setColor] = useState(null)
  const [selectedSize, setSize] = useState(null)
  const [variant, setVariant] = useState(null)

  useEffect(() => {
    if (product && !selectedColor && Array.isArray(product.variationAttributes?.color)) {
      setColor(product.variationAttributes.color[0].id)
    }
    if (!product && selectedColor) {
      setColor(null)
    }
    if (!product && selectedSize) {
      setSize(null)
    }
  }, [product, selectedColor, selectedSize])

  useEffect(() => {
    if (selectedColor && selectedSize && product?.variants) {
      const _variant = product.variants.find(
        v => v.color === selectedColor && v.size === selectedSize
      )
      if (_variant && !_variant.orderable) {
        setSize(null)
        setVariant(null)
      } else if (_variant) {
        setVariant(_variant)
      }
    }
  }, [selectedColor, selectedSize, product])

  const images =
    (selectedColor &&
      product &&
      product.variationAttributes?.color?.find(c => c.id === selectedColor)?.images) ||
    []

  const selections = {
    color: { value: selectedColor, images, setColor },
    size: { value: selectedSize, setSize }
  }

  return [selections, variant]
}

const productQuery = gql`
  query productDetail($id: String!) {
    product: getProduct(id: $id) {
      ...ProductDetailFragment
      category {
        id
        name
        parentCategory {
          id
          name
        }
      }
    }
  }
  ${ProductDetailFragment}
`

const useProductDetail = (productId, options = {}) => {
  const query = useQuery(productQuery, {
    variables: { id: productId },
    ...options,
    skip: options.skip || !productId
  })

  const [selections, variant] = useProductSelections(query.data?.product)

  return [query, selections, variant]
}

export default useProductDetail
