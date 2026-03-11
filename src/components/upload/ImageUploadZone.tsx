'use client'

import { useCallback, useState } from 'react'
import { useDropzone, FileRejection } from 'react-dropzone'
import { Upload, X, Image as ImageIcon, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const ACCEPTED_TYPES = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/webp': ['.webp'],
  'image/heic': ['.heic'],
}
const MAX_SIZE = 20 * 1024 * 1024 // 20 MB

interface ImageUploadZoneProps {
  onFileSelect: (file: File) => void
  disabled?: boolean
}

export default function ImageUploadZone({ onFileSelect, disabled }: ImageUploadZoneProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      setError(null)
      if (rejectedFiles.length > 0) {
        const code = rejectedFiles[0].errors[0]?.code
        if (code === 'file-too-large') setError('File exceeds the 20 MB limit.')
        else if (code === 'file-invalid-type') setError('Only JPG, PNG, WebP and HEIC are supported.')
        else setError('File rejected. Please try again.')
        return
      }
      const file = acceptedFiles[0]
      if (!file) return
      setSelectedFile(file)
      const url = URL.createObjectURL(file)
      setPreview(url)
      onFileSelect(file)
    },
    [onFileSelect]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_TYPES,
    maxSize: MAX_SIZE,
    multiple: false,
    disabled,
  })

  const clearFile = () => {
    if (preview) URL.revokeObjectURL(preview)
    setPreview(null)
    setSelectedFile(null)
    setError(null)
  }

  if (preview && selectedFile) {
    return (
      <div className="space-y-3">
        <div className="relative overflow-hidden rounded-xl border border-[var(--border)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="Preview" className="max-h-72 w-full object-contain bg-[var(--secondary)]" />
          <button
            onClick={clearFile}
            className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
          <ImageIcon className="h-3.5 w-3.5" />
          <span className="truncate">{selectedFile.name}</span>
          <span className="ml-auto flex-shrink-0">
            {(selectedFile.size / 1024 / 1024).toFixed(1)} MB
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div
        {...getRootProps()}
        className={cn(
          'flex min-h-52 cursor-pointer flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed p-8 transition-colors',
          isDragActive
            ? 'border-[var(--accent)] bg-[var(--accent)]/5'
            : 'border-[var(--border)] hover:border-[var(--accent)]/50 hover:bg-[var(--secondary)]',
          disabled && 'cursor-not-allowed opacity-50'
        )}
      >
        <input {...getInputProps()} />
        <div
          className={cn(
            'flex h-14 w-14 items-center justify-center rounded-full transition-colors',
            isDragActive ? 'bg-[var(--accent)]/20' : 'bg-[var(--secondary)]'
          )}
        >
          <Upload
            className={cn(
              'h-6 w-6 transition-colors',
              isDragActive ? 'text-[var(--accent)]' : 'text-[var(--muted-foreground)]'
            )}
          />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-[var(--foreground)]">
            {isDragActive ? 'Drop your photo here' : 'Drag & drop your photo'}
          </p>
          <p className="mt-1 text-xs text-[var(--muted-foreground)]">
            or{' '}
            <span className="text-[var(--accent)] underline underline-offset-2">browse files</span>
          </p>
          <p className="mt-2 text-xs text-[var(--muted-foreground)]">
            JPG · PNG · WebP · HEIC · max 20 MB
          </p>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700 dark:bg-red-950 dark:text-red-400">
          <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
          {error}
        </div>
      )}
    </div>
  )
}
