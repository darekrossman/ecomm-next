'use client'

import React, { useEffect } from 'react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Error caught by error boundary:', error)
  }, [error])

  return (
    <div style={{ textAlign: 'center', padding: '50px 20px' }}>
      <h1>Something went wrong</h1>
      <p>{error.message || 'An unexpected error occurred.'}</p>
      <button
        onClick={() => reset()}
        style={{
          padding: '10px 20px',
          marginTop: '20px',
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
