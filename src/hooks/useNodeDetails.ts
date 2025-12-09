import { useQuery } from '@tanstack/react-query'
import { apiClient } from '../lib/apiClient'
import { ENDPOINTS } from '../config/api'
import { QUERY_KEYS } from '../config/queryKeys'
import type { NodeDetailsResponse } from '@/types/api'

export function useNodeDetails(nodeName: string) {
  return useQuery({
    queryKey: nodeName
      ? QUERY_KEYS.NODE_DETAILS.BY_NAME(nodeName)
      : QUERY_KEYS.NODE_DETAILS.ROOT,
    queryFn: async () => {
      const res = await apiClient.get<NodeDetailsResponse>(
        ENDPOINTS.NODE.DETAILS(nodeName),
      )
      return res.data
    },
    enabled: !!nodeName,
  })
}
