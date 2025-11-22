import React from 'react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Page Not Found</h1>
      <p>The page you are looking for could not be found.</p>
      <Link
        href="/"
        style={{
          display: 'inline-block',
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#111',
          color: 'white',
          textDecoration: 'none',
          fontSize: '1rem',
        }}
      >
        Go to Home
      </Link>
    </div>
  )
}
