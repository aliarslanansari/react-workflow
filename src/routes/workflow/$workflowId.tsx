import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/workflow/$workflowId')({
  component: WorkflowPage,
})

function WorkflowPage() {
  const { workflowId } = Route.useParams()

  return (
    <div>
      <h1 className="text-2xl font-bold">Workflow Details</h1>

      <p className="mt-3 text-gray-700">
        Workflow ID:
        <span className="font-mono ml-2 px-2 py-1 bg-gray-200 rounded">
          {workflowId}
        </span>
      </p>

      <p className="mt-4 text-gray-600">
        You can now fetch workflow data using this ID or build UI for workflow
        steps.
      </p>
    </div>
  )
}
