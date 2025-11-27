import React from 'react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh',
        gap: '1rem',
        padding: '2rem',
        textAlign: 'center'
      }}
    >
      <h2>Page not found</h2>
      <p>The page you are looking for could not be located.</p>
      <Link
        href="/"
        style={{
          color: '#0052cc',
          textDecoration: 'underline'
        }}
      >
        Return home
      </Link>
    </div>
  )
}
