'use client'

import { useState } from 'react'
import HeroSection from '@/components/landing/HeroSection'
import FeatureHighlights from '@/components/landing/FeatureHighlights'
import HowItWorks from '@/components/landing/HowItWorks'
import UploadCTA from '@/components/landing/UploadCTA'
import UploadModal from '@/components/upload/UploadModal'

export default function HomePage() {
  const [uploadOpen, setUploadOpen] = useState(false)

  return (
    <>
      <HeroSection onUploadClick={() => setUploadOpen(true)} />
      <FeatureHighlights />
      <HowItWorks />
      <UploadCTA onUploadClick={() => setUploadOpen(true)} />
      <UploadModal open={uploadOpen} onClose={() => setUploadOpen(false)} />
    </>
  )
}
