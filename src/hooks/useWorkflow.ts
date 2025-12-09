import { ENDPOINTS } from '@/config/api'
import { QUERY_KEYS } from '@/config/queryKeys'
import { apiClient } from '@/lib/apiClient'
import { queryClient } from '@/lib/queryClient'
import type {
  WorkflowResponse,
  WorkflowNode,
  WorkflowEdgeResponse,
} from '@/types/api'
import { useQuery, useMutation } from '@tanstack/react-query'

function transformNodes(apiNodes: Record<string, WorkflowNode>) {
  const nodeArray = Object.values(apiNodes)

  return nodeArray.map((n, index) => ({
    id: n.nodeId,
    type: n.nodeType.toLowerCase(),
    position: {
      x: 250 * index,
      y: 150,
    },
    data: {
      label: n.nodeName,
      nodeName: n.activityName,
      params: n.nodeParams?.params ?? {},
      inputs: n.nodeInputs ?? {},
      timeout: n.startToCloseTimeoutInMinutes,
      raw: n,
    },
  }))
}

function transformEdges(apiEdges: WorkflowEdgeResponse[]) {
  return apiEdges.map((e) => ({
    id: e.edgeName,
    source: e.fromNodeId,
    target: e.toNodeId,
    label: e.edgeName,
  }))
}

function transformForSave(
  flowNodes: any[],
  flowEdges: any[],
  workflowName: string,
) {
  const nodesPayload: Record<string, any> = {}

  flowNodes.forEach((n) => {
    nodesPayload[n.id] = {
      nodeName: n.data.label,
      nodeId: n.id,
      nodeParams: { params: n.data.params ?? {} },
      nodeInputs: n.data.inputs ?? {},
      nodeType: n.type.charAt(0).toUpperCase() + n.type.slice(1), // activity → Activity
      activityName: n.data.nodeName,
      startToCloseTimeoutInMinutes: n.data.timeout ?? 1,
    }
  })

  const edgesPayload = flowEdges.map((e) => ({
    fromNodeId: e.source,
    toNodeId: e.target,
    edgeName: e.id,
  }))

  return {
    workflowName,
    nodes: nodesPayload,
    edges: edgesPayload,
  }
}

export const workflowQuery = (workflowId: string) => ({
  queryKey: QUERY_KEYS.WORKFLOW.BY_ID(workflowId),

  queryFn: async () => {
    const res = await apiClient.get<WorkflowResponse>(
      ENDPOINTS.WORKFLOW.GET(workflowId),
    )

    const api = res.data

    return {
      workflowName: api.workflowId,
      raw: api,
      flowNodes: transformNodes(api.definition.nodes),
      flowEdges: transformEdges(api.definition.edges),
    }
  },
})

export function useWorkflow(workflowId: string) {
  const get = useQuery(workflowQuery(workflowId))

  const save = useMutation({
    mutationFn: async (payload: {
      flowNodes: any[]
      flowEdges: any[]
      workflowName: string
    }) => {
      const apiPayload = transformForSave(
        payload.flowNodes,
        payload.flowEdges,
        payload.workflowName,
      )

      const res = await apiClient.put<WorkflowResponse>(
        ENDPOINTS.WORKFLOW.UPDATE(workflowId),
        apiPayload,
      )

      return res.data
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.WORKFLOW.BY_ID(workflowId),
      })
    },
  })

  return { get, save }
}
