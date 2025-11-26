import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link href="/">
        <a style={{ color: '#111', textDecoration: 'underline' }}>Go back home</a>
      </Link>
    </div>
  )
}
