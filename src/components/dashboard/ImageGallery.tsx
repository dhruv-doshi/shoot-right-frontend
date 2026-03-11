'use client'

import { useState } from 'react'
import { Plus, ImageOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ImageCard from './ImageCard'
import DashboardSkeleton from './DashboardSkeleton'
import UploadModal from '@/components/upload/UploadModal'
import { useUserImages } from '@/hooks/useUserImages'

export default function ImageGallery() {
  const { data: rawImages, isLoading } = useUserImages()
  const images = Array.isArray(rawImages) ? rawImages : []
  const [uploadOpen, setUploadOpen] = useState(false)

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl text-[var(--foreground)] sm:text-4xl">My Photos</h1>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            {images.length} image{images.length !== 1 ? 's' : ''} analyzed
          </p>
        </div>
        <Button
          className="bg-[var(--accent)] text-white hover:bg-[var(--accent)]/90"
          onClick={() => setUploadOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Upload New
        </Button>
      </div>

      {isLoading ? (
        <DashboardSkeleton />
      ) : images.length === 0 ? (
        /* Empty state */
        <div className="flex min-h-96 flex-col items-center justify-center rounded-xl border-2 border-dashed border-[var(--border)] text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--secondary)]">
            <ImageOff className="h-7 w-7 text-[var(--muted-foreground)]" />
          </div>
          <h2 className="font-serif text-xl text-[var(--foreground)]">No images yet</h2>
          <p className="mt-2 max-w-xs text-sm text-[var(--muted-foreground)]">
            Upload your first photo to receive a detailed AI analysis of your photography.
          </p>
          <Button
            className="mt-6 bg-[var(--accent)] text-white hover:bg-[var(--accent)]/90"
            onClick={() => setUploadOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Analyze Your First Photo
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image) => (
            <ImageCard key={image.id} image={image} />
          ))}
        </div>
      )}

      <UploadModal open={uploadOpen} onClose={() => setUploadOpen(false)} />
    </>
  )
}
