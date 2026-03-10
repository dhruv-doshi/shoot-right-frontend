'use client'

import { use } from 'react'
import { ArrowLeft } from 'lucide-react'
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
            <SummaryPanel
              score={analysis.overallScore}
              headline={analysis.summaryHeadline}
              summary={analysis.summaryText}
            />
            <AnalysisCardGrid analysis={analysis} />
            <ImprovementShotPanel analysis={analysis} />
          </div>
        ) : null}
      </main>
    </div>
  )
}
