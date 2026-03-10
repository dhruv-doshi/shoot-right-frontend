import Link from 'next/link'
import { Camera, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-[var(--background)] px-4 text-center">
      <div className="relative">
        <span className="font-serif text-[12rem] font-medium leading-none text-[var(--secondary)] select-none">
          404
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--accent)]">
            <Camera className="h-8 w-8 text-white" />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h1 className="font-serif text-3xl text-[var(--foreground)]">Out of frame</h1>
        <p className="text-base text-[var(--muted-foreground)]">
          This page doesn&apos;t exist — let&apos;s get you back in focus.
        </p>
      </div>

      <div className="flex gap-3">
        <Link href={ROUTES.HOME}>
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Home
          </Button>
        </Link>
        <Link href={ROUTES.DASHBOARD}>
          <Button className="bg-[var(--accent)] text-white hover:bg-[var(--accent)]/90">
            Dashboard
          </Button>
        </Link>
      </div>
    </div>
  )
}
