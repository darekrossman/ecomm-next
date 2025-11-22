'use client'

import React from 'react'
import { Box, Text, Button } from '@64labs/ui'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  React.useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <Box
      as="main"
      ess={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <Text as="h1" variant="h1" mb={3}>
        Something went wrong
      </Text>
      <Text as="p" variant="p" mb={4} color="#666">
        An unexpected error occurred. Please try again.
      </Text>
      <Button onClick={() => reset()}>
        Try again
      </Button>
    </Box>
  )
}
