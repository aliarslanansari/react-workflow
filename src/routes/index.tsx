import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Home</h1>
      <p className="mt-3 text-gray-600">
        Welcome to your TanStack Router + Tailwind project.
      </p>

      <div className="mt-6">
        <Link
          to="/workflow/$workflowId"
          params={{ workflowId: 'example-1' }}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Go to Workflow example
        </Link>
      </div>
    </div>
  )
}
