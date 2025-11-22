export default function Loading() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <div
        style={{
          display: 'inline-block',
          width: '2rem',
          height: '2rem',
          border: '3px solid #f0f0f0',
          borderTop: '3px solid #111',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite'
        }}
      >
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
      <p style={{ marginTop: '1rem', color: '#666' }}>Loading...</p>
    </div>
  )
}
