import { useMutation, useQueryClient } from '@tanstack/react-query'
import apiClient from '@/lib/api-client'
import { useUploadStore } from '@/store/uploadStore'
import type { UploadImageResponse } from '@/types/api'
import { generateHistogramData } from '@/lib/image-processing'

export function useUploadImage() {
  const queryClient = useQueryClient()
  const { setProgress, reset } = useUploadStore()
  const progress = useUploadStore((s) => s.progress)

  const mutation = useMutation({
    mutationFn: async (file: File) => {
      reset()

      // Generate histogram client-side before upload
      let histogram = null
      try {
        const img = new Image()
        const url = URL.createObjectURL(file)
        await new Promise<void>((resolve) => {
          img.onload = () => resolve()
          img.src = url
        })
        histogram = generateHistogramData(img)
        URL.revokeObjectURL(url)
      } catch {
        // histogram extraction is best-effort
      }

      const formData = new FormData()
      formData.append('image', file)
      if (histogram) {
        formData.append('histogram', JSON.stringify(histogram))
      }

      const response = await apiClient.post<{ data: UploadImageResponse }>('/analysis/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (e) => {
          const pct = Math.round((e.loaded * 100) / (e.total || 1))
          setProgress(pct)
        },
      })

      return response.data.data.analysisId
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-images'] })
      reset()
    },
    onError: () => {
      reset()
    },
  })

  return { ...mutation, progress }
}
