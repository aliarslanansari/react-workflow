import dagre from '@dagrejs/dagre'
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

function transformNodes(
  apiNodes: Record<string, WorkflowNode>,
  edges: WorkflowEdgeResponse[],
) {
  const nodeArray = Object.values(apiNodes)

  const dagreGraph = new dagre.graphlib.Graph()
  dagreGraph.setGraph({ rankdir: 'TB' })
  dagreGraph.setDefaultEdgeLabel(() => ({}))

  nodeArray.forEach((n) => {
    dagreGraph.setNode(n.nodeId, { width: 150, height: 100 })
  })

  const nodeIds = new Set(nodeArray.map((n) => n.nodeId))

  edges.forEach((e) => {
    if (nodeIds.has(e.fromNodeId) && nodeIds.has(e.toNodeId)) {
      dagreGraph.setEdge(e.fromNodeId, e.toNodeId)
    } else {
      console.warn(
        'Skipping edge with missing node:',
        e.fromNodeId,
        '→',
        e.toNodeId,
      )
    }
  })

  console.log({ dagreGraph })

  dagre.layout(dagreGraph)

  return nodeArray.map((n) => {
    const dagreNode = dagreGraph.node(n.nodeId)
    return {
      id: n.nodeId,
      type: n.nodeType.toLowerCase(),
      position: {
        x: dagreNode.x - 75, // Center: width/2 = 150/2
        y: dagreNode.y - 25, // Center: height/2 = 50/2
      },
      data: {
        label: n.nodeName,
        nodeName: n.activityName,
        params: n.nodeParams?.params ?? {},
        inputs: n.nodeInputs ?? {},
        timeout: n.startToCloseTimeoutInMinutes,
        raw: n,
      },
    }
  })
}

function transformEdges(apiEdges: WorkflowEdgeResponse[]) {
  return apiEdges.map((e) => ({
    id: e.edgeName,
    source: e.fromNodeId,
    target: e.toNodeId,
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
    const flowEdges = transformEdges(api.definition.edges)

    return {
      workflowName: api.workflowId,
      raw: api,
      flowNodes: transformNodes(api.definition.nodes, api.definition.edges),
      flowEdges,
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
