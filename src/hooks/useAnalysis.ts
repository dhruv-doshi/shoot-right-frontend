import { useQuery } from '@tanstack/react-query'
import apiClient from '@/lib/api-client'
import { PLACEHOLDER_ANALYSIS } from '@/constants/placeholders'
import type { FullAnalysis } from '@/types/analysis'
import type { ApiResponse } from '@/types/api'

export function useAnalysis(analysisId: string) {
  return useQuery<FullAnalysis>({
    queryKey: ['analysis', analysisId],
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<FullAnalysis>>(`/analysis/${analysisId}`)
      return response.data.data
    },
    placeholderData: PLACEHOLDER_ANALYSIS,
    staleTime: 0,
    refetchInterval: (query) =>
      query.state.data?.status === 'processing' ? 3000 : false,
    enabled: !!analysisId,
  })
}
