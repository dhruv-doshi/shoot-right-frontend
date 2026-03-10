import { useMutation, useQueryClient } from '@tanstack/react-query'
import apiClient from '@/lib/api-client'
import type { ApiResponse } from '@/types/api'

interface ImprovementShotResult {
  url: string
  explanation: string
  generatedAt: string
}

export function useImprovementShot(analysisId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      const response = await apiClient.post<ApiResponse<ImprovementShotResult>>(
        `/analysis/${analysisId}/improvement-shot`
      )
      return response.data.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analysis', analysisId] })
    },
  })
}
