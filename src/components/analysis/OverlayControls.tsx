'use client'

import { useOverlay } from '@/hooks/useOverlay'
import type { OverlayType } from '@/types/analysis'
import { cn } from '@/lib/utils'

const OPTIONS: { label: string; value: OverlayType }[] = [
  { label: 'None', value: 'none' },
  { label: 'Rule of Thirds', value: 'rule-of-thirds' },
  { label: 'Golden Ratio', value: 'golden-ratio' },
  { label: 'Spiral', value: 'golden-spiral' },
]

export default function OverlayControls() {
  const { activeOverlay, setOverlay } = useOverlay()

  return (
    <div
      className="inline-flex items-center overflow-hidden rounded-full border border-[var(--border)] bg-[var(--card)] p-0.5 shadow-sm"
      role="group"
      aria-label="Overlay controls"
    >
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          onClick={() => setOverlay(opt.value)}
          className={cn(
            'rounded-full px-4 py-1.5 text-xs font-medium transition-all',
            activeOverlay === opt.value
              ? 'bg-[var(--accent)] text-white shadow-sm'
              : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
          )}
          aria-pressed={activeOverlay === opt.value}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
