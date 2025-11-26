import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link href="/" style={{ color: '#111', textDecoration: 'underline' }}>
        Return to home
      </Link>
    </div>
  )
}
