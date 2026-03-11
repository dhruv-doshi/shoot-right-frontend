import { useQuery } from '@tanstack/react-query'
import apiClient from '@/lib/api-client'
import { PLACEHOLDER_USER_IMAGES } from '@/constants/placeholders'
import type { UserImage } from '@/types/analysis'
import type { PaginatedResponse } from '@/types/api'

export function useUserImages() {
  return useQuery<UserImage[]>({
    queryKey: ['user-images'],
    queryFn: async () => {
      const response = await apiClient.get<PaginatedResponse<UserImage>>('/user/images')
      const payload = response.data
      // Backend returns { success, data: [...], total, page, limit, hasNext }
      // Defensively handle both the standard paginated envelope and a bare array
      if (Array.isArray(payload?.data)) return payload.data
      if (Array.isArray(payload)) return payload as unknown as UserImage[]
      return []
    },
    placeholderData: PLACEHOLDER_USER_IMAGES,
    staleTime: 2 * 60 * 1000,
  })
}
