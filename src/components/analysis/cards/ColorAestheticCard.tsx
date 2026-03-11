import { CheckCircle, AlertTriangle } from 'lucide-react'
import type { ColorAestheticAnalysis } from '@/types/analysis'

export default function ColorAestheticCard({
  score, dominantColors, colorHarmony, mood, strengths, weaknesses, details,
}: ColorAestheticAnalysis) {
  const color = score >= 80 ? 'text-green-500' : score >= 60 ? 'text-amber-500' : 'text-red-500'

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className={`font-serif text-4xl font-medium ${color}`}>{score}</span>
        <span className="text-sm text-[var(--muted-foreground)]">/ 100</span>
      </div>

      {/* Color palette */}
      <div>
        <h4 className="mb-2 text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">
          Dominant Colors
        </h4>
        <div className="flex flex-wrap gap-2">
          {(dominantColors ?? []).map((swatch) => (
            <div key={swatch.hex} className="flex items-center gap-2">
              <div
                className="h-8 w-8 rounded-md border border-[var(--border)] shadow-sm"
                style={{ backgroundColor: swatch.hex }}
                title={swatch.hex}
              />
              <div>
                <p className="text-xs font-medium text-[var(--foreground)]">{swatch.name}</p>
                <p className="font-mono text-[10px] text-[var(--muted-foreground)]">
                  {swatch.hex} · {swatch.percentage}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Visual palette bar */}
      <div className="flex h-4 overflow-hidden rounded-full">
        {(dominantColors ?? []).map((swatch) => (
          <div
            key={swatch.hex}
            style={{ backgroundColor: swatch.hex, width: `${swatch.percentage}%` }}
            title={`${swatch.name} ${swatch.percentage}%`}
          />
        ))}
      </div>

      <div className="flex flex-wrap gap-4 text-sm">
        <div>
          <span className="text-[var(--muted-foreground)]">Harmony: </span>
          <span className="text-[var(--foreground)]">{colorHarmony}</span>
        </div>
        <div>
          <span className="text-[var(--muted-foreground)]">Mood: </span>
          <span className="text-[var(--foreground)]">{mood}</span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <h4 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-green-600 dark:text-green-400">
            <CheckCircle className="h-3.5 w-3.5" />
            Strengths
          </h4>
          <ul className="space-y-1.5">
            {(strengths ?? []).map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <CheckCircle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-green-500" />
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-400">
            <AlertTriangle className="h-3.5 w-3.5" />
            Suggestions
          </h4>
          <ul className="space-y-1.5">
            {(weaknesses ?? []).map((w, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
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
