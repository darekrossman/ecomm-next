'use client'

import React, { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '20px',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, San Francisco, Roboto, Segoe UI, Helvetica Neue, sans-serif',
      }}
    >
      <h1 style={{ fontSize: '32px', marginBottom: '16px', color: '#111' }}>
        Something went wrong
      </h1>
      <p style={{ fontSize: '16px', color: '#666', marginBottom: '24px' }}>
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={() => reset()}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#111',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Try again
      </button>
    </div>
  )
}
