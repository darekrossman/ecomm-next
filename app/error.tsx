'use client'

import { useEffect } from 'react'
import { Box, Text, Button } from '@64labs/ui'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <Box
      ess={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: 4,
        textAlign: 'center',
      }}
    >
      <Text variant="h2" mb={3}>
        Something went wrong!
      </Text>
      <Text variant="p" mb={4} color="palette.grey.600">
        An unexpected error occurred. Please try again.
      </Text>
      <Button onClick={() => reset()}>Try again</Button>
    </Box>
  )
}
