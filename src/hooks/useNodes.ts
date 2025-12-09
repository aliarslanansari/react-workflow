import { useQuery } from '@tanstack/react-query'
import { apiClient } from '../lib/apiClient'
import { ENDPOINTS } from '../config/api'
import { QUERY_KEYS } from '@/config/queryKeys'
import type { NodeListResponse } from '@/types/api'

export function useNodes(nodeType?: 'activities' | 'controllers' | 'triggers') {
  return useQuery({
    queryKey: nodeType
      ? QUERY_KEYS.NODE.BY_TYPE(nodeType)
      : QUERY_KEYS.NODE.ROOT,
    queryFn: async () => {
      return await apiClient.get<NodeListResponse>(ENDPOINTS.NODE.LIST, {
        params: {
          ...(nodeType ? { nodeType } : {}),
        },
      })
    },
    staleTime: 1000 * 60 * 3, // 3 minutes
  })
}
