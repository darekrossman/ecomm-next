'use client'

import React from 'react'

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  React.useEffect(() => {
    console.error(error)
  }, [error])

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
      <h2>Something went wrong</h2>
      <p>We were unable to load this page.</p>
      <button
        type="button"
        onClick={() => reset()}
        style={{
          padding: '0.75rem 1.5rem',
          border: 'none',
          borderRadius: '4px',
          backgroundColor: '#111',
          color: '#fff',
          cursor: 'pointer'
        }}
      >
        Try again
      </button>
    </div>
  )
}
