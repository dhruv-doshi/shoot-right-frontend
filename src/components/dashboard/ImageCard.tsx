'use client'

import Image from 'next/image'
import { useState } from 'react'
import { format } from 'date-fns'
import { Loader2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import ImageDetailModal from './ImageDetailModal'
import type { UserImage } from '@/types/analysis'
import { cn } from '@/lib/utils'

interface Props {
  image: UserImage
}

function ScoreBadge({ score, status }: { score: number; status: UserImage['status'] }) {
  if (status === 'processing') {
    return (
      <Badge variant="secondary" className="gap-1">
        <Loader2 className="h-3 w-3 animate-spin" />
        Processing
      </Badge>
    )
  }
  if (status === 'failed') return <Badge variant="destructive">Failed</Badge>

  const textColor = score >= 80 ? 'text-green-600 dark:text-green-400' : score >= 60 ? 'text-amber-600' : 'text-red-500'
  return (
    <span className={cn('font-mono text-sm font-semibold', textColor)}>{score}</span>
  )
}

export default function ImageCard({ image }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)] text-left transition-shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-[var(--secondary)]">
          <Image
            src={image.thumbnailUrl}
            alt={image.filename}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {image.status === 'processing' && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <Loader2 className="h-8 w-8 animate-spin text-white" />
            </div>
          )}
        </div>
        <div className="flex items-start justify-between p-4">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-[var(--foreground)]">{image.filename}</p>
            <p className="mt-0.5 text-xs text-[var(--muted-foreground)]">
              {format(new Date(image.uploadedAt), 'MMM d, yyyy')}
            </p>
          </div>
          <div className="ml-3 flex-shrink-0">
            <ScoreBadge score={image.overallScore} status={image.status} />
          </div>
        </div>
      </button>

      <ImageDetailModal image={image} open={open} onClose={() => setOpen(false)} />
    </>
  )
}
