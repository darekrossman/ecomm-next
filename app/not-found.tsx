import { Box } from '@64labs/ui'

export default function NotFound() {
  return (
    <Box
      ess={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      <h1 style={{ fontSize: '48px', marginBottom: '16px', fontWeight: 'bold' }}>404</h1>
      <p style={{ fontSize: '24px', marginBottom: '24px', color: '#666' }}>
        Page not found
      </p>
      <p style={{ marginBottom: '24px', color: '#999', textAlign: 'center' }}>
        The page you are looking for does not exist or has been moved.
      </p>
      <a
        href="/"
        style={{
          padding: '10px 20px',
          backgroundColor: '#111',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          textDecoration: 'none',
          display: 'inline-block',
        }}
      >
        Go back home
      </a>
    </Box>
  )
}
