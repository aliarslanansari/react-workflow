export const QUERY_KEYS = {
  NODE: {
    ROOT: ['node'] as const,
    BY_TYPE: (type: string) => ['node', type] as const,
  },

  NODE_DETAILS: {
    ROOT: ['nodeDetails'] as const,
    BY_NAME: (name: string) => ['nodeDetails', name] as const,
  },

  WORKFLOW: {
    ROOT: ['workflow'] as const,
    BY_ID: (id: string) => ['workflow', id] as const,
  },
}
