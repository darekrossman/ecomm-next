'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Something went wrong!</h2>
      <p style={{ color: '#666', margin: '1rem 0' }}>
        {error.message || 'An unexpected error occurred'}
      </p>
      <button
        onClick={() => reset()}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#111',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Try again
      </button>
    </div>
  )
}
