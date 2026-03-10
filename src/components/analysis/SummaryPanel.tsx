'use client'

interface SummaryPanelProps {
  score: number
  headline: string
  summary: string
}

export default function SummaryPanel({ score, headline, summary }: SummaryPanelProps) {
  const radius = 42
  const circ = 2 * Math.PI * radius
  const strokeDash = (score / 100) * circ
  const color = score >= 80 ? '#22c55e' : score >= 60 ? '#f59e0b' : '#ef4444'

  return (
    <div className="flex flex-col gap-6 rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 sm:flex-row sm:items-center">
      {/* Score gauge */}
      <div className="flex flex-shrink-0 justify-center">
        <div className="relative h-28 w-28">
          <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
            {/* Track */}
            <circle
              cx="50" cy="50" r={radius}
              fill="none"
              stroke="var(--secondary)"
              strokeWidth="10"
            />
            {/* Fill */}
            <circle
              cx="50" cy="50" r={radius}
              fill="none"
              stroke={color}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={`${strokeDash} ${circ}`}
              style={{ transition: 'stroke-dasharray 1s ease' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-serif text-3xl font-medium leading-none" style={{ color }}>
              {score}
            </span>
            <span className="mt-0.5 text-xs text-[var(--muted-foreground)]">/ 100</span>
          </div>
        </div>
      </div>

      {/* Text */}
      <div className="flex-1">
        <h2 className="font-serif text-2xl text-[var(--foreground)] sm:text-3xl">{headline}</h2>
        <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)]">{summary}</p>
      </div>
    </div>
  )
}
