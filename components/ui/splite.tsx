'use client'

import { Suspense, lazy } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
          <span className="loader" />
          <p className="text-sm text-white/40 tracking-widest uppercase animate-pulse animate-fade-in">
            Loading scene…
          </p>
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className}
      />
    </Suspense>
  )
}
