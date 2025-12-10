import { QUERY_KEYS } from '@/config/queryKeys'
import type { NodeListResponse } from '@/types/api'
import { useQuery } from '@tanstack/react-query'
import { ENDPOINTS } from '../config/api'
import { apiClient } from '../lib/apiClient'

export enum WFNodeType {
  ACTIVITY = 'activity',
  CONTROLLER = 'controller',
  TRIGGER = 'trigger',
}

export function useNodes(nodeType?: WFNodeType) {
  return useQuery({
    queryKey: nodeType
      ? QUERY_KEYS.NODE.BY_TYPE(nodeType)
      : QUERY_KEYS.NODE.ROOT,
    queryFn: async () => {
      const res = await apiClient.get<NodeListResponse>(ENDPOINTS.NODE.LIST, {
        params: {
          ...(nodeType ? { nodeType } : {}),
        },
      })
      const result = {
        activities: {
          items: (res?.data?.activities?.items || []).map((item) => ({
            name: item,
            type: WFNodeType.ACTIVITY,
          })),
        },
        controllers: {
          items: (res?.data?.controllers?.items || []).map((item) => ({
            name: item,
            type: WFNodeType.CONTROLLER,
          })),
        },
        triggers: {
          items: (res?.data?.triggers?.items || []).map((item) => ({
            name: item,
            type: WFNodeType.TRIGGER,
          })),
        },
      }
      return result
    },
    staleTime: 1000 * 60 * 3,
  })
}
