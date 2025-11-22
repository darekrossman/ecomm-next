import Link from 'next/link'

export default function NotFound() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '20px',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, San Francisco, Roboto, Segoe UI, Helvetica Neue, sans-serif',
      }}
    >
      <h1 style={{ fontSize: '48px', marginBottom: '16px', color: '#111' }}>
        404
      </h1>
      <h2 style={{ fontSize: '24px', marginBottom: '24px', color: '#666' }}>
        Page not found
      </h2>
      <p style={{ fontSize: '16px', color: '#999', marginBottom: '32px' }}>
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#111',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px',
        }}
      >
        Go home
      </Link>
    </div>
  )
}
