import React from 'react'
import Link from 'next/link'
import { Box, Text, Button } from '@64labs/ui'

export default function NotFound() {
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
      <Text as="h1" variant="h1" mb={2}>
        404
      </Text>
      <Text as="h2" variant="h2" mb={4} color="#666">
        Page not found
      </Text>
      <Link href="/">
        <Button>
          Go back home
        </Button>
      </Link>
    </Box>
  )
}
