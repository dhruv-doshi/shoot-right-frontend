import { Camera } from 'lucide-react'

interface AuthCardProps {
  title: string
  subtitle?: string
  children: React.ReactNode
}

export default function AuthCard({ title, subtitle, children }: AuthCardProps) {
  return (
    <div className="w-full max-w-md">
      {/* Logo */}
      <div className="mb-8 text-center">
        <div className="mb-4 inline-flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--accent)]">
            <Camera className="h-5 w-5 text-white" />
          </div>
          <span className="font-serif text-xl text-[var(--foreground)]">Shoot Right</span>
        </div>
        <h1 className="font-serif text-3xl text-[var(--foreground)]">{title}</h1>
        {subtitle && (
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">{subtitle}</p>
        )}
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-sm">
        {children}
      </div>
    </div>
  )
}
