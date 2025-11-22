import Link from 'next/link'

export const metadata = {
  title: 'Page Not Found'
}

export default function NotFound() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>404</h1>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Page Not Found</h2>
      <p style={{ marginBottom: '2rem', color: '#666' }}>
        Sorry, we couldn't find the page you're looking for.
      </p>
      <Link
        href="/"
        style={{
          display: 'inline-block',
          padding: '0.75rem 1.5rem',
          backgroundColor: '#111',
          color: 'white',
          borderRadius: '4px',
          textDecoration: 'none'
        }}
      >
        Go back home
      </Link>
    </div>
  )
}
