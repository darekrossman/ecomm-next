'use client'

import React from 'react'
import Link from 'next/link'
import { useSpring, animated } from 'react-spring'
import { Box, Text } from '@64labs/ui'
import { gql, useQuery } from '@/lib/gql'
import { RootCategoryFragment } from '@/lib/fragments'

const categoriesQuery = gql`
  query category($id: String!) {
    root: getCategory(id: $id) {
      ...RootCategoryFragment
    }
  }
  ${RootCategoryFragment}
`

const navReducer = (state, { type, payload }) => {
  if (type === 'next') {
    return {
      ...state,
      level: state.level + 1,
      selectedItem: payload.item,
      itemBounds: payload.bounds
    }
  }

  return state
}

const Item = ({ item, y }) => {
  const springProps = useSpring({
    from: { transform: `translateY(${y}px)`, fontSize: 12, padding: '8px 0px' },
    to: { transform: `translateY(0px)`, fontSize: 18, padding: '0px 0px' },
    config: { tension: 400, friction: 36 },
    delay: 200
  })

  const itemsSpring = useSpring({
    from: { opacity: 0.01, transform: `translateX(${20}px)` },
    to: { opacity: 0.99, transform: `translateX(0px)` },
    config: { mass: 6, tension: 2000, friction: 260 },
    delay: 500
  })

  return (
    <Box css={{ position: 'relative' }}>
      <animated.div style={springProps}>
        <Text fontSize="inherit">{item.name}</Text>
      </animated.div>

      <Box css={{ position: 'absolute', top: 32 }}>
        {item.categories?.edges?.map(({ node }) => (
          <animated.div style={itemsSpring} key={node.id}>
            <Box py={2}>
              <Text>{node.name}</Text>
            </Box>
          </animated.div>
        ))}
      </Box>
    </Box>
  )
}

const NavDrawer = () => {
  const { data, loading } = useQuery(categoriesQuery, { variables: { id: 'root' } })

  const [refMap] = React.useState(() => new WeakMap())
  const [state, dispatch] = React.useReducer(navReducer, {
    open: true,
    level: 1,
    selectedItem: null,
    itemBounds: null
  })

  const level1Props = useSpring({ opacity: state.level === 1 ? 1 : 0 })

  const y = state.itemBounds ? state.itemBounds.y : 0

  const onSelect = item => {
    const ref = refMap.get(item)
    if (ref) {
      const bounds = { y: ref.offsetTop - 32 }
      dispatch({
        type: 'next',
        payload: { item, bounds }
      })
    }
  }

  if (loading || !data?.root) {
    return null
  }

  return (
    <Box
      bg="white"
      width={200}
      height="100vh"
      css={{ position: 'fixed', top: 0, left: 0, zIndex: 100, display: 'none' }}
    >
      <Box
        p={4}
        css={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'auto' }}
      >
        <animated.div style={level1Props}>
          {data.root.categories?.edges?.map(({ node: item }) => (
            <Box
              key={item.id}
              ref={ref => ref && refMap.set(item, ref)}
              py={2}
              onClick={() => onSelect(item)}
            >
              <Text>{item.name}</Text>
            </Box>
          ))}
        </animated.div>
      </Box>

      {state.selectedItem && (
        <Box
          p={4}
          css={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'auto' }}
        >
          <Item item={state.selectedItem} y={y} />
        </Box>
      )}
    </Box>
  )
}

export default NavDrawer
