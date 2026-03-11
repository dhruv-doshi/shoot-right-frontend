'use client'

import Image from 'next/image'
import { Sparkles, Loader2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useImprovementShot } from '@/hooks/useImprovementShot'
import type { FullAnalysis } from '@/types/analysis'

interface Props {
  analysis: FullAnalysis
}

export default function ImprovementShotPanel({ analysis }: Props) {
  const { mutate, isPending, error } = useImprovementShot(analysis.id)
  const shot = analysis.improvementShot

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
      <div className="mb-4 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-[var(--accent)]" />
        <h3 className="font-serif text-xl text-[var(--foreground)]">Improvement Shot</h3>
      </div>

      {shot ? (
        <div className="space-y-4">
          {shot.url && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">
                  Original
                </p>
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-black">
                  <Image
                    src={analysis.imageUrl}
                    alt="Original"
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
                  Improved
                </p>
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-black">
                  <Image
                    src={shot.url}
                    alt="Improved version"
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          )}
          <div className="rounded-lg bg-[var(--secondary)] p-4 text-sm leading-relaxed text-[var(--muted-foreground)]">
            {shot.explanation}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-[var(--muted-foreground)]">
            Generate an AI-improved version of your photo based on the analysis suggestions.
            The AI will apply compositional adjustments, tone corrections, and color improvements.
          </p>

          {error && (
            <div className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700 dark:bg-red-950 dark:text-red-400">
              <AlertCircle className="h-3.5 w-3.5" />
              Failed to generate. Please try again.
            </div>
          )}

          <Button
            onClick={() => mutate()}
            disabled={isPending}
            className="bg-[var(--accent)] text-white hover:bg-[var(--accent)]/90"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating improvement…
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Improvement Shot
              </>
            )}
          </Button>

          <p className="text-xs text-[var(--muted-foreground)]">
            Limit: 3 improvement shots per day. Results are cached — regenerating returns the same image.
          </p>
        </div>
      )}
    </div>
  )
}
