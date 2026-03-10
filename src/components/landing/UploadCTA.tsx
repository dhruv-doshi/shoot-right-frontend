'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Camera, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'

interface UploadCTAProps {
  onUploadClick?: () => void
}

export default function UploadCTA({ onUploadClick }: UploadCTAProps) {
  const { data: session } = useSession()
  const router = useRouter()

  const handleClick = () => {
    if (session) {
      onUploadClick?.()
    } else {
      router.push(`${ROUTES.LOGIN}?callbackUrl=${ROUTES.DASHBOARD}`)
    }
  }

  return (
    <section className="border-t border-[var(--border)] py-20 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--accent)]/10">
          <Camera className="h-8 w-8 text-[var(--accent)]" />
        </div>
        <h2 className="font-serif text-4xl text-[var(--foreground)] sm:text-5xl">
          Ready to level up?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[var(--muted-foreground)]">
          Upload your first photo and see exactly what makes a great shot — and how yours can get
          there.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            size="lg"
            className="bg-[var(--accent)] px-10 text-white hover:bg-[var(--accent)]/90"
            onClick={handleClick}
          >
            {session ? 'Analyze a Photo' : 'Get Started — It\'s Free'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        {!session && (
          <p className="mt-4 text-xs text-[var(--muted-foreground)]">
            Free account · No credit card required
          </p>
        )}
      </div>
    </section>
  )
}
