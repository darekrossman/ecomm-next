'use client'

import React from 'react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  React.useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Something went wrong</h1>
      <p>An error occurred while rendering this page.</p>
      <button
        onClick={() => reset()}
        style={{
          padding: '10px 20px',
          backgroundColor: '#000',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          borderRadius: '4px'
        }}
      >
        Try again
      </button>
    </div>
  )
}
