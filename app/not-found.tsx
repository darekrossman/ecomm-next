import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Page Not Found</h2>
      <p>Could not find the requested resource.</p>
      <Link href="/" style={{ color: '#111', textDecoration: 'underline' }}>
        Return Home
      </Link>
    </div>
  )
}
