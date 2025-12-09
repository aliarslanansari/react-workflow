import { Link } from '@tanstack/react-router'

const NotFoundComponent = ({ title }: { title?: string }) => (
  <div className="space-y-4 flex flex-col items-center justify-center h-screen">
    <h1 className="text-center text-2xl">{title || 'Page not found'}</h1>
    <Link
      to="/"
      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
    >
      Go to homepage
    </Link>
  </div>
)

export default NotFoundComponent
