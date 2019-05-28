import React from 'react'
import Link from 'next/link'
import { Box, Text, Flex, Image, Button } from '@64labs/ui'
import { useProductSelections } from '../lib/hooks/useProductDetail'

const ProductItem = ({ product, start, span, col, onClick, router }) => {
  const [selections, variant] = useProductSelections(product)

  const colorAttrs = (product.variationAttributes && product.variationAttributes.color) || []

  const selectedColorVariant = colorAttrs.find(c => c.id === selections.color.value)

  const images = selectedColorVariant && selectedColorVariant.images

  return (
    <>
      <Link href={`/product?id=${product.id}`} prefetch>
        <Flex
          as="a"
          ess={{
            flexDirection: 'column',
            gridColumn: ['auto', `${start[col]} / span ${span[col]}`]
          }}
          onClick={e => onClick(e, product)}
        >
          <Box>
            <Image src={images && images[0].src} width={1335} height={1780} fluid />
          </Box>

          <Flex ess={{ flexDirection: 'column', pt: 2 }}>
            <Text ess={{ flex: '1 1 0', textTransform: 'capitalize', mb: 1 }}>{product.name}</Text>
            <Text>{product.price}</Text>
          </Flex>
        </Flex>
      </Link>
    </>
  )
}

export default ProductItem
