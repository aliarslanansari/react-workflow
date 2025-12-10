// src/components/NodeSidebar.tsx
import { useNodes } from '@/hooks/useNodes'
import type { WFNodeType } from '@/hooks/useNodes'
import { ChevronDown, ChevronRight, Search } from 'lucide-react'
import React, { useState } from 'react'
import NodeListItem from './NodeListItem'

export default function NodeSidebar() {
  const { data: nodeGroups } = useNodes()
  const [searchQuery, setSearchQuery] = useState('')

  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({
    triggers: true,
    controllers: true,
    activities: true,
  })

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }

  const filterNodes = (nodes: Array<{ type: string; name: string }>) => {
    if (!searchQuery && !Array.isArray(nodes)) return nodes
    return nodes.filter((node) =>
      node.name.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  const onDragStart = (e: React.DragEvent, type: string, nodeName?: string) => {
    e.dataTransfer.setData('node/type', type)
    if (nodeName) e.dataTransfer.setData('node/name', nodeName)
  }

  return (
    <aside className="w-64 bg-white border-r border-gray-200">
      <div className="mb-4 px-4 pt-4">
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

      <div className="mb-4 overflow-y-auto overflow-x-hidden h-[calc(100vh-150px)] px-4">
        {Object.entries(nodeGroups || {}).map(([nodeType, category], index) => {
          const filteredNodes = filterNodes(category.items || [])
          if (filteredNodes.length === 0) return null
          return (
            <div key={nodeType} className="mb-4">
              <button
                onClick={() => toggleCategory(nodeType)}
                className="w-full flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors mb-2"
              >
                <span className="text-gray-700 capitalize">{nodeType}</span>
                {expandedCategories[nodeType] ? (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                )}
              </button>

              {expandedCategories[nodeType] && (
                <div className="space-y-1 ml-2">
                  {!!filteredNodes?.length &&
                    filteredNodes.map(({ name, type }) => (
                      <NodeListItem
                        key={type + name}
                        name={name}
                        type={type as WFNodeType}
                        onDragStart={(e) => onDragStart(e, type, name)}
                      />
                    ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </aside>
  )
}
