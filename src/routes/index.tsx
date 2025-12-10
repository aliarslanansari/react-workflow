import { TextInput } from '@/components/ui/TextInput'
import { Link, createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { WorkflowIcon } from 'lucide-react'
import { VITE_DEFAULT_WORKFLOW_ID } from '@/config/env'

export const Route = createFileRoute('/')({
  component: HomePage,
  head: () => ({
    meta: [{ title: 'Workflow Builder' }],
  }),
})

function HomePage() {
  const [workflowId, setWorkflowId] = useState('')
  const onWorkflowIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWorkflowId(e.target.value)
  }

  return (
    <div className="p-10 max-w-[500px] mx-auto">
      <h1 className="text-3xl font-bold">Home</h1>
      <p className="mt-3 text-gray-600">Welcome to Workflow Builder.</p>
      <TextInput
        className="mt-4"
        placeholder="Enter Workflow ID"
        value={workflowId}
        onChange={onWorkflowIdChange}
      />
      <div className="mt-6">
        <Link
          disabled={!workflowId}
          to="/workflow/$workflowId"
          params={{ workflowId: workflowId }}
          preload={false}
          className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-700 flex items-center gap-2 justify-center"
        >
          <WorkflowIcon size={16} />
          Go to workflow
        </Link>
      </div>
      <div className="border-b mt-10 border-gray-300" />
      {VITE_DEFAULT_WORKFLOW_ID && (
        <div className="mt-10">
          <Link
            to="/workflow/$workflowId"
            params={{ workflowId: VITE_DEFAULT_WORKFLOW_ID }}
            className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-700 flex items-center gap-2 justify-center"
          >
            Go to {VITE_DEFAULT_WORKFLOW_ID} Workflow
            <WorkflowIcon size={16} />
          </Link>
        </div>
      )}
    </div>
  )
}
