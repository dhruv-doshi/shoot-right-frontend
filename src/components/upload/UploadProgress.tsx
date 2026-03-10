'use client'

import { Loader2 } from 'lucide-react'

interface UploadProgressProps {
  progress: number
  filename?: string
}

export default function UploadProgress({ progress, filename }: UploadProgressProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm text-[var(--foreground)]">
        <Loader2 className="h-4 w-4 animate-spin text-[var(--accent)]" />
        <span>
          {progress < 100 ? 'Uploading…' : 'Analyzing your photo…'}
        </span>
      </div>
      {filename && (
        <p className="truncate text-xs text-[var(--muted-foreground)]">{filename}</p>
      )}
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--secondary)]">
        <div
          className="h-full rounded-full bg-[var(--accent)] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-right text-xs text-[var(--muted-foreground)]">{progress}%</p>
    </div>
  )
}
