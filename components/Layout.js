'use client'

import React from 'react'
import { Box, Flex, Text } from '@64labs/ui'
import AppHeader from './AppHeader'
import NavDrawer from './NavDrawer'

const Layout = ({ children }) => {
  return (
    <Flex>
      <Box
        ess={{
          mx: 'auto',
          width: '100%',
          maxWidth: 1280
        }}
      >
        <AppHeader />
        <NavDrawer />
        {children}
      </Box>
    </Flex>
  )
}

export default Layout
