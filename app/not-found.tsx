import Link from 'next/link'
import { Box, Text, Button } from '@64labs/ui'

export default function NotFound() {
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
      <Text variant="h1" mb={3}>
        404
      </Text>
      <Text variant="h3" mb={3}>
        Page Not Found
      </Text>
      <Text variant="p" mb={4} color="palette.grey.600">
        The page you are looking for does not exist.
      </Text>
      <Link href="/">
        <Button>Return Home</Button>
      </Link>
    </Box>
  )
}
