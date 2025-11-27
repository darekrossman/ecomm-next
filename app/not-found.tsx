import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Page Not Found</h2>
      <p style={{ margin: '1rem 0', color: '#666' }}>
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        style={{
          display: 'inline-block',
          padding: '0.5rem 1rem',
          backgroundColor: '#111',
          color: '#fff',
          textDecoration: 'none',
        }}
      >
        Return Home
      </Link>
    </div>
  )
}
