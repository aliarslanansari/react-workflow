// src/components/NodeSidebar.tsx
import { useNodes } from '@/hooks/useNodes'
import { Search } from 'lucide-react'
import React, { useState } from 'react'

export default function NodeSidebar() {
  const { data } = useNodes()
  const [searchQuery, setSearchQuery] = useState('')

  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({
    triggers: true,
    controllers: true,
    activities: true,
  })

  const nodeGroups = data?.data ?? {
    activities: { items: [] },
    controllers: { items: [] },
    triggers: { items: [] },
  }

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }

  const filterNodes = (nodes: any[]) => {
    if (!searchQuery) return nodes
    return nodes.filter((node) =>
      node.name.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  const onDragStart = (e: React.DragEvent, type: string, nodeName?: string) => {
    e.dataTransfer.setData('node/type', type)
    if (nodeName) e.dataTransfer.setData('node/name', nodeName)
  }

  return (
    <aside className="w-64 p-4 bg-white border-r border-gray-200">
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search nodes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="mb-4">
        <div className="text-xs text-gray-500 mb-2">Controllers</div>
        {Object.entries(nodeGroups).map((key: string, category) => {
          const filteredNodes = filterNodes(category.nodes)
          if (searchQuery && filteredNodes.length === 0) return null

          return (
            <div
              key={key}
              draggable
              onDragStart={(e) => onDragStart(e, key, name)}
              className="p-2 mb-2 bg-white border rounded cursor-grab"
            >
              {name}
            </div>
          )
        })}
      </div>
    </aside>
  )
}
