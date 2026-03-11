'use client'

import { BarChart2, Layers, Aperture, Palette, Camera, Wand2 } from 'lucide-react'
import AnalysisCard from './AnalysisCard'
import MetadataHistogramCard from './cards/MetadataHistogramCard'
import CompositionCard from './cards/CompositionCard'
import TechnicalCard from './cards/TechnicalCard'
import ColorAestheticCard from './cards/ColorAestheticCard'
import ClickingTipsCard from './cards/ClickingTipsCard'
import EditingTipsCard from './cards/EditingTipsCard'
import type { FullAnalysis } from '@/types/analysis'

interface Props {
  analysis: FullAnalysis
}

export default function AnalysisCardGrid({ analysis }: Props) {
  return (
    <div className="space-y-3">
      <AnalysisCard
        id="metadata"
        title="Metadata & Histogram"
        icon={<BarChart2 className="h-4 w-4" />}
        preview={<span>{analysis.metadata?.make} {analysis.metadata?.model}</span>}
      >
        <MetadataHistogramCard metadata={analysis.metadata} histogram={analysis.histogram} />
      </AnalysisCard>

      <AnalysisCard
        id="composition"
        title="Composition Analysis"
        icon={<Layers className="h-4 w-4" />}
        preview={<span>{analysis.composition?.score}/100</span>}
      >
        <CompositionCard {...analysis.composition} />
      </AnalysisCard>

      <AnalysisCard
        id="technical"
        title="Technical Analysis"
        icon={<Aperture className="h-4 w-4" />}
        preview={<span>{analysis.technical?.score}/100 · {analysis.technical?.sharpness}</span>}
      >
        <TechnicalCard {...analysis.technical} />
      </AnalysisCard>

      <AnalysisCard
        id="color"
        title="Color & Aesthetic Analysis"
        icon={<Palette className="h-4 w-4" />}
        preview={<span>{analysis.colorAesthetic?.mood}</span>}
      >
        <ColorAestheticCard {...analysis.colorAesthetic} />
      </AnalysisCard>

      <AnalysisCard
        id="clicking-tips"
        title="Tips for Shooting"
        icon={<Camera className="h-4 w-4" />}
        preview={<span>{analysis.clickingTips?.length ?? 0} tips</span>}
      >
        <ClickingTipsCard tips={analysis.clickingTips} />
      </AnalysisCard>

      <AnalysisCard
        id="editing-tips"
        title="Tips for Editing"
        icon={<Wand2 className="h-4 w-4" />}
        preview={<span>{analysis.editingTips?.length ?? 0} tips</span>}
      >
        <EditingTipsCard tips={analysis.editingTips} />
      </AnalysisCard>
    </div>
  )
}
