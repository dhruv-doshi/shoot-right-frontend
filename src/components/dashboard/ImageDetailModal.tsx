'use client'

import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'
import { ArrowRight, Loader2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'
import type { UserImage } from '@/types/analysis'

interface Props {
  image: UserImage
  open: boolean
  onClose: () => void
}

export default function ImageDetailModal({ image, open, onClose }: Props) {
  const scoreColor =
    image.overallScore >= 80
      ? 'text-green-500'
      : image.overallScore >= 60
        ? 'text-amber-500'
        : 'text-red-500'

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">{image.filename}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Thumbnail */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[var(--secondary)]">
            <Image
              src={image.thumbnailUrl}
              alt={image.filename}
              fill
              className="object-contain"
              sizes="(max-width: 640px) 100vw, 500px"
            />
            {image.status === 'processing' && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <Loader2 className="h-8 w-8 animate-spin text-white" />
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--muted-foreground)]">Overall Score</span>
              {image.status === 'processing' ? (
                <span className="flex items-center gap-1.5 text-sm text-[var(--muted-foreground)]">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Analyzing…
                </span>
              ) : (
                <span className={`font-serif text-2xl font-medium ${scoreColor}`}>
                  {image.overallScore}
                  <span className="text-sm text-[var(--muted-foreground)]">/100</span>
                </span>
              )}
            </div>

            {image.summaryHeadline && image.status === 'completed' && (
              <p className="text-sm text-[var(--foreground)]">{image.summaryHeadline}</p>
            )}

            <p className="text-xs text-[var(--muted-foreground)]">
              Uploaded {format(new Date(image.uploadedAt), 'MMMM d, yyyy \'at\' h:mm a')}
            </p>
          </div>

          {/* CTA */}
          {image.status === 'completed' && (
            <Link href={ROUTES.ANALYSIS(image.id)} className="block">
              <Button
                className="w-full bg-[var(--accent)] text-white hover:bg-[var(--accent)]/90"
                onClick={onClose}
              >
                View Full Analysis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
