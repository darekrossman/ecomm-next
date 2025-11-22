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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px' }}>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button
        onClick={() => reset()}
        style={{
          padding: '10px 20px',
          marginTop: '20px',
          backgroundColor: '#111',
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
