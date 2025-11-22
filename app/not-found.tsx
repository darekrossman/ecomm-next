import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px' }}>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link
        href="/"
        style={{
          padding: '10px 20px',
          marginTop: '20px',
          backgroundColor: '#111',
          color: '#fff',
          textDecoration: 'none',
          borderRadius: '4px'
        }}
      >
        Go Home
      </Link>
    </div>
  )
}
