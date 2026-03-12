'use client'

import Image from 'next/image'
import { useState, useMemo } from 'react'
import { useOverlay } from '@/hooks/useOverlay'
import RuleOfThirdsOverlay from './RuleOfThirdsOverlay'
import GoldenRatioOverlay from './GoldenRatioOverlay'
import GoldenSpiralOverlay from './GoldenSpiralOverlay'
import OverlayControls from './OverlayControls'

interface AnalysisHeroProps {
  imageUrl: string
  filename: string
}

const CONTAINER_ASPECT = 4 / 3

export default function AnalysisHero({ imageUrl, filename }: AnalysisHeroProps) {
  const { activeOverlay } = useOverlay()
  const [imgSize, setImgSize] = useState<{ w: number; h: number } | null>(null)

  const overlayWrapperStyle = useMemo((): React.CSSProperties => {
    if (!imgSize) return { position: 'absolute', inset: 0 }
    const imgAspect = imgSize.w / imgSize.h
    if (imgAspect > CONTAINER_ASPECT) {
      // Wider than 4:3 — black bars top/bottom
      const imageHeightPct = (CONTAINER_ASPECT / imgAspect) * 100
      const vInset = (100 - imageHeightPct) / 2
      return { position: 'absolute', top: `${vInset}%`, bottom: `${vInset}%`, left: 0, right: 0 }
    } else {
      // Narrower than 4:3 — black bars left/right
      const imageWidthPct = (imgAspect / CONTAINER_ASPECT) * 100
      const hInset = (100 - imageWidthPct) / 2
      return { position: 'absolute', top: 0, bottom: 0, left: `${hInset}%`, right: `${hInset}%` }
    }
  }, [imgSize])

  return (
    <div className="space-y-4">
      {/* Image container */}
      <div className="relative overflow-hidden rounded-xl bg-black">
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={imageUrl}
            alt={filename}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            priority
            unoptimized
            onLoad={(e) =>
              setImgSize({ w: e.currentTarget.naturalWidth, h: e.currentTarget.naturalHeight })
            }
          />
          {/* Overlays — scoped to the actual image bounds */}
          {activeOverlay && (
            <div style={overlayWrapperStyle} className="overflow-hidden">
              {activeOverlay === 'rule-of-thirds' && <RuleOfThirdsOverlay />}
              {activeOverlay === 'golden-ratio' && <GoldenRatioOverlay />}
              {activeOverlay === 'golden-spiral' && <GoldenSpiralOverlay />}
            </div>
          )}
        </div>
      </div>

      {/* Overlay controls */}
      <div className="flex items-center justify-between">
        <p className="truncate text-sm text-[var(--muted-foreground)]">{filename}</p>
        <OverlayControls />
      </div>
    </div>
  )
}
