import React from 'react'

export default function Loading() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '30vh',
        width: '100%'
      }}
    >
      <span>Loading...</span>
    </div>
  )
}
