import { TextInput } from '@/components/ui/TextInput'
import { Link, createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

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
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Go to workflow
        </Link>
      </div>
      <div className="border-b mt-10 border-gray-300" />
      <div className="mt-10">
        <Link
          to="/workflow/$workflowId"
          params={{ workflowId: 'twflow_5046391f58_ali' }}
          className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-700"
        >
          Go to twflow_5046391f58_ali Workflow
        </Link>
      </div>
    </div>
  )
}
