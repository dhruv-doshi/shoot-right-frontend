import { CheckCircle, AlertTriangle } from 'lucide-react'
import type { ScoreBreakdown } from '@/types/analysis'

export default function CompositionCard({ score, strengths, weaknesses, details }: ScoreBreakdown) {
  const color = score >= 80 ? 'text-green-500' : score >= 60 ? 'text-amber-500' : 'text-red-500'

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className={`font-serif text-4xl font-medium ${color}`}>{score}</span>
        <span className="text-sm text-[var(--muted-foreground)]">/ 100</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <h4 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-green-600 dark:text-green-400">
            <CheckCircle className="h-3.5 w-3.5" />
            Strengths
          </h4>
          <ul className="space-y-1.5">
            {(strengths ?? []).map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[var(--foreground)]">
                <CheckCircle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-green-500" />
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-400">
            <AlertTriangle className="h-3.5 w-3.5" />
            Areas to Improve
          </h4>
          <ul className="space-y-1.5">
            {(weaknesses ?? []).map((w, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[var(--foreground)]">
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-amber-500" />
                {w}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-lg bg-[var(--secondary)] p-4 text-sm leading-relaxed text-[var(--muted-foreground)]">
        {details}
      </div>
    </div>
  )
}
