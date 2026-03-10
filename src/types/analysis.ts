export type OverlayType = 'none' | 'rule-of-thirds' | 'golden-ratio' | 'golden-spiral'

export interface ImageMetadata {
  make?: string
  model?: string
  lens?: string
  focalLength?: number
  aperture?: number
  shutterSpeed?: string
  iso?: number
  exposureMode?: string
  whiteBalance?: string
  flash?: string
  dateTaken?: string
  width?: number
  height?: number
  fileSize?: number
  format?: string
  gps?: { lat: number; lng: number }
}

export interface HistogramData {
  red: number[]
  green: number[]
  blue: number[]
  luminance: number[]
}

export interface ScoreBreakdown {
  score: number // 0-100
  strengths: string[]
  weaknesses: string[]
  details: string
}

export interface TechnicalAnalysis extends ScoreBreakdown {
  sharpness: 'poor' | 'fair' | 'good' | 'excellent'
  exposure: 'underexposed' | 'slightly-under' | 'balanced' | 'slightly-over' | 'overexposed'
  noise: 'high' | 'moderate' | 'low' | 'minimal'
}

export interface ColorSwatch {
  hex: string
  name: string
  percentage: number
}

export interface ColorAestheticAnalysis extends ScoreBreakdown {
  dominantColors: ColorSwatch[]
  colorHarmony: string
  mood: string
}

export interface UserImage {
  id: string
  url: string
  thumbnailUrl: string
  uploadedAt: string
  filename: string
  overallScore: number
  summaryHeadline: string
  status: 'processing' | 'completed' | 'failed'
}

export interface FullAnalysis {
  id: string
  imageUrl: string
  thumbnailUrl: string
  filename: string
  uploadedAt: string
  status: 'processing' | 'completed' | 'failed'
  overallScore: number
  summaryHeadline: string
  summaryText: string
  metadata: ImageMetadata
  histogram: HistogramData
  composition: ScoreBreakdown
  technical: TechnicalAnalysis
  colorAesthetic: ColorAestheticAnalysis
  clickingTips: string[]
  editingTips: string[]
  improvementShot?: {
    url: string
    explanation: string
    generatedAt: string
  }
}
