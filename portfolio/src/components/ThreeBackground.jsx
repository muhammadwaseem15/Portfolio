import { useRef, useEffect, Suspense } from 'react'

function ThreeBackgroundCanvas({ fallback }) {
  const [error, setError] = useState(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div style={{ width: '100%', height: '100%' }}>{fallback}</div>
  }

  if (error) {
    console.warn('Three.js error, showing fallback:', error)
    return <div style={{ width: '100%', height: '100%' }}>{fallback}</div>
  }

  // Just render the fallback - no Canvas, no Three.js
  return <div style={{ width: '100%', height: '100%' }}>{fallback}</div>
}

import { useState } from 'react'

export default function ThreeBackground() {
  const fallback = (
    <div className="absolute inset-0" style={{ 
      background: 'radial-gradient(ellipse at center, rgba(0,212,170,0.1) 0%, transparent 70%)' 
    }} />
  )

  return (
    <Suspense fallback={fallback}>
      <ThreeBackgroundCanvas fallback={fallback} />
    </Suspense>
  )
}