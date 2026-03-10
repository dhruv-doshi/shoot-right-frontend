'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import ImageUploadZone from './ImageUploadZone'
import UploadProgress from './UploadProgress'
import { useUploadImage } from '@/hooks/useUploadImage'
import { ROUTES } from '@/constants/routes'

interface UploadModalProps {
  open: boolean
  onClose: () => void
}

export default function UploadModal({ open, onClose }: UploadModalProps) {
  const router = useRouter()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const { mutate: uploadImage, isPending, progress } = useUploadImage()

  const handleSubmit = () => {
    if (!selectedFile) return
    uploadImage(selectedFile, {
      onSuccess: (analysisId) => {
        onClose()
        router.push(ROUTES.ANALYSIS(analysisId))
      },
    })
  }

  const handleClose = () => {
    if (!isPending) {
      setSelectedFile(null)
      onClose()
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">Analyze a photo</DialogTitle>
          <DialogDescription>
            Upload a photo to get AI-powered composition, technical, and color analysis.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2">
          {isPending ? (
            <UploadProgress progress={progress} filename={selectedFile?.name} />
          ) : (
            <ImageUploadZone onFileSelect={setSelectedFile} disabled={isPending} />
          )}
        </div>

        {!isPending && (
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              className="bg-[var(--accent)] text-white hover:bg-[var(--accent)]/90"
              onClick={handleSubmit}
              disabled={!selectedFile}
            >
              Analyze Photo
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
