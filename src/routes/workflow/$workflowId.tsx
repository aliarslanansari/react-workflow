import WorkflowCanvas from '@/components/Canvas/WorkflowCanvas'
import NodeSidebar from '@/components/NodeSidebar'
import NotFoundComponent from '@/components/NotFoundComponent'
import NodeParamsPanel from '@/components/ParamPanel/NodeParamsPanel'
import Topbar from '@/components/Topbar'
import { useWorkflow, workflowQuery } from '@/hooks/useWorkflow'
import { queryClient } from '@/lib/queryClient'
import { useWorkflowStore } from '@/stores/workflowStore'
import { createFileRoute, notFound } from '@tanstack/react-router'
import axios from 'axios'
import React from 'react'

export const Route = createFileRoute('/workflow/$workflowId')({
  loader: async ({ params }) => {
    try {
      const workflow = await queryClient.ensureQueryData(
        workflowQuery(params.workflowId),
      )

      return { workflow }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 404) {
        throw notFound()
      }

      throw err
    }
  },
  component: WorkflowRoute,
  head: ({ params }) => ({
    meta: [{ title: `Workflow - ${params.workflowId}` }],
  }),
  notFoundComponent: () => <NotFoundComponent title="Workflow not found" />,
})

function WorkflowRoute() {
  const { get, save } = useWorkflow(Route.useParams().workflowId)
  const wfData = get.data

  console.log('WorkflowRoute', { wfData })
  const { setNodes, setEdges } = useWorkflowStore()

  console.log('WorkflowRoute:wfData', { wfData })

  React.useEffect(() => {
    if (!wfData) return
    setNodes(wfData.flowNodes)
    setEdges(wfData.flowEdges)
  }, [wfData])

  const onSave = async () => {
    const nodes = store.nodes.map((n) => ({
      nodeId: n.id,
      nodeType: n.type,
      nodeName: n.data.nodeName ?? n.data.label,
      params: n.data.params ?? {},
      x: Math.round((n.position as any).x ?? 0),
      y: Math.round((n.position as any).y ?? 0),
    }))
    const edges = store.edges.map((e) => ({
      edgeId: e.id,
      sourceNodeId: e.source,
      targetNodeId: e.target,
    }))

    const payload = {
      workflowName:
        wfData?.workflowName ?? `workflow_${Route.useParams().workflowId}`,
      nodes,
      edges,
    }

    try {
      await save.mutateAsync(payload)
      alert('Saved successfully ✅')
    } catch (err: any) {
      alert('Save failed: ' + err.message)
    }
  }

  return (
    <div className="h-screen flex flex-col">
      <Topbar workflowId={wfData?.workflowName} onSave={onSave} />
      <div className="flex flex-1 overflow-hidden">
        <NodeSidebar />
        <WorkflowCanvas
          nodes={wfData?.flowNodes || []}
          edges={wfData?.flowEdges || []}
        />
        <NodeParamsPanel />
      </div>
    </div>
  )
}
