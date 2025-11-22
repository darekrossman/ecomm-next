import React from 'react'

export default function NotFound() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <a
        href="/"
        style={{
          display: 'inline-block',
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#111',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px',
        }}
      >
        Go Home
      </a>
    </div>
  )
}
