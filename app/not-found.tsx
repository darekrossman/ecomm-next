import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link href="/">
        <a style={{ color: '#0070f3', textDecoration: 'underline' }}>
          Go back to home
        </a>
      </Link>
    </div>
  )
}
