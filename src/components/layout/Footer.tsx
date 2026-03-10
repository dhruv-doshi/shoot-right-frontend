import { Camera } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--background)]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[var(--accent)]">
              <Camera className="h-4 w-4 text-white" />
            </div>
            <span className="font-serif text-base text-[var(--foreground)]">Shoot Right</span>
          </div>
          <p className="text-center text-xs text-[var(--muted-foreground)]">
            AI-powered photography analysis to help you shoot better.
          </p>
          <div className="flex items-center gap-4 text-xs text-[var(--muted-foreground)]">
            <Link href="/login" className="hover:text-[var(--foreground)] transition-colors">
              Sign In
            </Link>
            <Link href="/register" className="hover:text-[var(--foreground)] transition-colors">
              Register
            </Link>
          </div>
        </div>
        <div className="mt-6 text-center text-xs text-[var(--muted-foreground)]">
          © {new Date().getFullYear()} Shoot Right. Built for photographers.
        </div>
      </div>
    </footer>
  )
}
