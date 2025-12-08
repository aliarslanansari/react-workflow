import { Outlet, createRootRoute } from '@tanstack/react-router'
import Navbar from '../components/Header'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />

      <main className="max-w-5xl mx-auto p-6">
        <Outlet />
      </main>
    </div>
  )
}
