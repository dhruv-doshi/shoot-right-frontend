import { useQuery } from '@tanstack/react-query'
import apiClient from '@/lib/api-client'
import type { UserImage } from '@/types/analysis'
import type { PaginatedResponse } from '@/types/api'

export function useUserImages() {
  return useQuery<UserImage[]>({
    queryKey: ['user-images'],
    queryFn: async () => {
      const response = await apiClient.get<PaginatedResponse<UserImage>>('/user/images')
      const payload = response.data
      // Standard envelope: { success, data: [...], total, page, limit, hasNext }
      if (Array.isArray(payload?.data)) return payload.data
      // Double-nested envelope: { success, data: { success, data: [...], ... } }
      if (payload?.data && Array.isArray((payload.data as Record<string, unknown>).data)) {
        return (payload.data as { data: UserImage[] }).data
      }
      // Bare array
      if (Array.isArray(payload)) return payload as unknown as UserImage[]
      return []
    },
    staleTime: 0,
  })
}
