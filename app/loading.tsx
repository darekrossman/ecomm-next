import React from 'react'
import { Box, Text } from '@64labs/ui'

export default function Loading() {
  return (
    <Box
      ess={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Text as="p" variant="p">
        Loading...
      </Text>
    </Box>
  )
}
