import { useWorkflowStore } from '@/stores/workflowStore'

export default function Topbar({
  workflowName,
  onSave,
}: {
  workflowName?: string
  onSave: () => void
}) {
  const { nodes, edges } = useWorkflowStore()

  return (
    <div className="w-full flex items-center justify-between bg-white p-3 border-b">
      <div className="text-lg font-semibold">
        {workflowName ?? 'Workflow editor'}
      </div>

      <div className="flex items-center gap-3">
        <div className="text-sm text-gray-500">
          Nodes: {nodes.length} Edges: {edges.length}
        </div>
        <button
          onClick={onSave}
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          Save
        </button>
      </div>
    </div>
  )
}
