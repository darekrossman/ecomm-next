'use client'

import React from 'react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  React.useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Something went wrong</h1>
      <p>{error.message}</p>
      <button
        onClick={() => reset()}
        style={{
          padding: '0.5rem 1rem',
          marginTop: '1rem',
          backgroundColor: '#111',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          fontSize: '1rem',
        }}
      >
        Try again
      </button>
    </div>
  )
}
