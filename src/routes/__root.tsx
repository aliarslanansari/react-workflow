// src/routes/__root.tsx
import { createRootRoute, HeadContent, Outlet } from '@tanstack/react-router'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/queryClient'
import { ReactFlowProvider } from 'reactflow'

export const Route = createRootRoute({
  component: RootLayout,
  head: () => ({
    meta: [{ title: 'Workflow Builder' }],
  }),
})

function RootLayout() {
  return (
    <>
      <HeadContent />
      <ReactFlowProvider>
        <QueryClientProvider client={queryClient}>
          <div className="min-h-screen bg-white">
            <Outlet />
          </div>
        </QueryClientProvider>
      </ReactFlowProvider>
    </>
  )
}
