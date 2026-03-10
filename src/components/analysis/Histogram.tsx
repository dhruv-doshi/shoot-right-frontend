'use client'

import { useEffect, useRef, useState } from 'react'
import type { HistogramData } from '@/types/analysis'
import { cn } from '@/lib/utils'

interface HistogramProps {
  data: HistogramData
}

type Channel = 'all' | 'red' | 'green' | 'blue' | 'luminance'

const CHANNEL_CONFIG = {
  red: { color: 'rgba(239,68,68,0.7)', label: 'R' },
  green: { color: 'rgba(34,197,94,0.7)', label: 'G' },
  blue: { color: 'rgba(59,130,246,0.7)', label: 'B' },
  luminance: { color: 'rgba(200,200,200,0.55)', label: 'L' },
}

export default function Histogram({ data }: HistogramProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [channel, setChannel] = useState<Channel>('all')

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const W = canvas.width
    const H = canvas.height
    ctx.clearRect(0, 0, W, H)

    const channels: (keyof typeof CHANNEL_CONFIG)[] =
      channel === 'all' ? ['luminance', 'blue', 'green', 'red'] : [channel as keyof typeof CHANNEL_CONFIG]

    const allValues = channels.flatMap((ch) => data[ch])
    const maxVal = Math.max(...allValues, 1)

    ctx.globalCompositeOperation = 'screen'

    channels.forEach((ch) => {
      const values = data[ch]
      const { color } = CHANNEL_CONFIG[ch]
      ctx.beginPath()
      ctx.fillStyle = color
      for (let i = 0; i < 256; i++) {
        const x = (i / 255) * W
        const barH = (values[i] / maxVal) * H
        ctx.fillRect(x, H - barH, W / 256 + 0.5, barH)
      }
    })

    ctx.globalCompositeOperation = 'source-over'
  }, [data, channel])

  return (
    <div className="space-y-3">
      {/* Channel toggles */}
      <div className="flex flex-wrap gap-1.5">
        {(['all', 'red', 'green', 'blue', 'luminance'] as Channel[]).map((ch) => (
          <button
            key={ch}
            onClick={() => setChannel(ch)}
            className={cn(
              'rounded-md px-2.5 py-1 text-xs font-mono font-medium transition-colors',
              channel === ch
                ? 'bg-[var(--accent)] text-white'
                : 'bg-[var(--secondary)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
            )}
          >
            {ch === 'all' ? 'ALL' : ch.charAt(0).toUpperCase() + ch.slice(1)}
          </button>
        ))}
      </div>
      <div className="overflow-hidden rounded-lg bg-black">
        <canvas
          ref={canvasRef}
          width={512}
          height={160}
          className="w-full"
        />
      </div>
    </div>
  )
}
