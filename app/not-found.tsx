import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '10px' }}>Page not found</h1>
      <p style={{ fontSize: '1rem', color: '#666', marginBottom: '20px' }}>
        Sorry, the page you're looking for doesn't exist.
      </p>
      <Link
        href="/"
        style={{
          padding: '10px 20px',
          fontSize: '1rem',
          backgroundColor: '#0070f3',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px'
        }}
      >
        Back to Home
      </Link>
    </div>
  )
}
