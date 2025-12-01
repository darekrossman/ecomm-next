import { Box, Text } from '@64labs/ui'

export default function Loading() {
  return (
    <Box
      ess={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Text variant="h4">Loading...</Text>
    </Box>
  )
}
