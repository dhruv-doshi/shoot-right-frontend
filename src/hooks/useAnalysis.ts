import { useQuery } from '@tanstack/react-query'
import apiClient from '@/lib/api-client'
import type { FullAnalysis } from '@/types/analysis'
import type { ApiResponse } from '@/types/api'

export function useAnalysis(analysisId: string) {
  return useQuery<FullAnalysis>({
    queryKey: ['analysis', analysisId],
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<FullAnalysis>>(`/analysis/${analysisId}`)
      const payload = response.data
      // Standard envelope: { success, data: { id, status, ... } }
      if (payload?.data && typeof payload.data === 'object' && !Array.isArray(payload.data)) {
        return payload.data as FullAnalysis
      }
      return payload as unknown as FullAnalysis
    },
    staleTime: 0,
    // Backend takes 15–44s. Poll every 3s while processing (no max — stops when completed/failed).
    refetchInterval: (query) =>
      query.state.data?.status === 'processing' ? 3000 : false,
    enabled: !!analysisId,
  })
}
