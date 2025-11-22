'use client'

import React, { useEffect } from 'react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Something went wrong</h1>
      <p>{error?.message}</p>
      <button
        onClick={reset}
        style={{
          padding: '10px 20px',
          marginTop: '10px',
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
