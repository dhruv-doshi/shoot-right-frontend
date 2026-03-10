'use client'

import Image from 'next/image'
import { useOverlay } from '@/hooks/useOverlay'
import RuleOfThirdsOverlay from './RuleOfThirdsOverlay'
import GoldenRatioOverlay from './GoldenRatioOverlay'
import GoldenSpiralOverlay from './GoldenSpiralOverlay'
import OverlayControls from './OverlayControls'

interface AnalysisHeroProps {
  imageUrl: string
  filename: string
}

export default function AnalysisHero({ imageUrl, filename }: AnalysisHeroProps) {
  const { activeOverlay } = useOverlay()

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
          />
          {/* Overlays */}
          {activeOverlay === 'rule-of-thirds' && <RuleOfThirdsOverlay />}
          {activeOverlay === 'golden-ratio' && <GoldenRatioOverlay />}
          {activeOverlay === 'golden-spiral' && <GoldenSpiralOverlay />}
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
