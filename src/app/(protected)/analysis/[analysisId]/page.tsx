'use client'

import { use } from 'react'
import { ArrowLeft, Loader2, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { useAnalysis } from '@/hooks/useAnalysis'
import AnalysisHero from '@/components/analysis/AnalysisHero'
import SummaryPanel from '@/components/analysis/SummaryPanel'
import AnalysisCardGrid from '@/components/analysis/AnalysisCardGrid'
import ImprovementShotPanel from '@/components/analysis/ImprovementShotPanel'
import AnalysisSkeleton from '@/components/analysis/AnalysisSkeleton'
import Navbar from '@/components/layout/Navbar'
import { ROUTES } from '@/constants/routes'

interface Props {
  params: Promise<{ analysisId: string }>
}

export default function AnalysisPage({ params }: Props) {
  const { analysisId } = use(params)
  const { data: analysis, isLoading } = useAnalysis(analysisId)

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href={ROUTES.DASHBOARD}
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        {isLoading && !analysis ? (
          <AnalysisSkeleton />
        ) : analysis ? (
          <div className="space-y-6">
            <AnalysisHero imageUrl={analysis.imageUrl} filename={analysis.filename} />

            {analysis.status === 'processing' && (
              <div className="flex flex-col items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--card)] py-16 text-center">
                <Loader2 className="h-8 w-8 animate-spin text-[var(--accent)]" />
                <p className="font-medium text-[var(--foreground)]">Analysing your photo…</p>
                <p className="text-sm text-[var(--muted-foreground)]">This usually takes 15–30 seconds. This page will update automatically.</p>
              </div>
            )}

            {analysis.status === 'failed' && (
              <div className="flex flex-col items-center gap-3 rounded-xl border border-red-200 bg-red-50 py-16 text-center dark:border-red-800 dark:bg-red-950">
                <AlertCircle className="h-8 w-8 text-red-500" />
                <p className="font-medium text-red-700 dark:text-red-400">Analysis failed</p>
                <p className="text-sm text-red-600 dark:text-red-500">Something went wrong while processing this image. Please try uploading again.</p>
              </div>
            )}

            {analysis.status === 'completed' && (
              <>
                <SummaryPanel
                  score={analysis.overallScore}
                  headline={analysis.summaryHeadline}
                  summary={analysis.summaryText}
                />
                <AnalysisCardGrid analysis={analysis} />
                <ImprovementShotPanel analysis={analysis} />
              </>
            )}
          </div>
        ) : null}
      </main>
    </div>
  )
}
