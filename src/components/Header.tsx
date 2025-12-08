import { Link } from '@tanstack/react-router'

export default function Navbar() {
  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-5xl mx-auto p-4 flex gap-6 items-center">
        <Link
          to="/"
          className="font-semibold text-gray-800 hover:text-blue-600"
        >
          Home
        </Link>

        <Link
          to="/workflow/$workflowId"
          params={{ workflowId: 'xyz' }}
          className="text-gray-600 hover:text-blue-600"
        >
          Example Workflow
        </Link>
      </div>
    </nav>
  )
}
