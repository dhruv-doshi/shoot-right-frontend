'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'

interface HeroSectionProps {
  onUploadClick?: () => void
}

export default function HeroSection({ onUploadClick }: HeroSectionProps) {
  const { data: session } = useSession()

  return (
    <section className="relative overflow-hidden pb-20 pt-24 sm:pb-32 sm:pt-36">
      {/* Background texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--foreground) 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Accent orb */}
      <div className="pointer-events-none absolute right-1/4 top-20 h-80 w-80 rounded-full bg-[var(--accent)] opacity-10 blur-[120px]" />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-4 py-1.5 text-xs font-medium text-[var(--accent)]">
          <Sparkles className="h-3.5 w-3.5" />
          AI-Powered Photography Analysis
        </div>

        {/* Headline */}
        <h1 className="font-serif text-5xl leading-tight tracking-tight text-[var(--foreground)] sm:text-6xl lg:text-7xl">
          See your photos
          <br />
          <span className="italic text-[var(--accent)]">like a pro</span>
        </h1>

        <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-[var(--muted-foreground)]">
          Upload any photograph and receive instant AI analysis of composition, technical quality,
          and color aesthetics — plus actionable tips to help you shoot and edit better.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {session ? (
            <>
              <Button
                size="lg"
                className="bg-[var(--accent)] px-8 text-white hover:bg-[var(--accent)]/90"
                onClick={onUploadClick}
              >
                Analyze a Photo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Link href={ROUTES.DASHBOARD}>
                <Button size="lg" variant="outline" className="px-8">
                  My Dashboard
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href={`${ROUTES.LOGIN}?callbackUrl=${ROUTES.DASHBOARD}`}>
                <Button
                  size="lg"
                  className="bg-[var(--accent)] px-8 text-white hover:bg-[var(--accent)]/90"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="px-8"
                onClick={onUploadClick}
              >
                Try Without Account
              </Button>
            </>
          )}
        </div>

        {/* Social proof */}
        <p className="mt-8 text-xs text-[var(--muted-foreground)]">
          Composition · Technical · Color · EXIF · Improvement Suggestions
        </p>
      </div>
    </section>
  )
}
