export interface NodeListResponse {
  activities: { items: string[] }
  controllers: { items: string[] }
  triggers: { items: string[] }
}

export interface NodeDetailsResponse {
  nodeName: string
  summary?: string
  params: Record<string, ParamSchema>
}

export interface ParamSchema {
  type: string
  hint?: string
  required?: boolean
  allowedValues?: string[] // dropdown
  childParams?: Record<string, ParamSchema> // nested
}

export interface WorkflowNodeMap {
  [key: string]: WorkflowNode
}

export interface WorkflowEdgeResponse {
  fromNodeId: string
  toNodeId: string
  edgeName: string
}

export interface WorkflowResponse {
  workflowId: string
  definition: {
    nodes: WorkflowNodeMap
    edges: WorkflowEdgeResponse[]
  }
}

export interface WorkflowNode {
  nodeId: string
  nodeName: string
  nodeType: 'Trigger' | 'Activity' | 'Controller'
  nodeParams: { params: Record<string, any> }
  nodeInputs: Record<string, any>
  activityName: string
  startToCloseTimeoutInMinutes: number
}
