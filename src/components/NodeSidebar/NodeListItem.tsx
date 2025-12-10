import { WFNodeType } from '@/hooks/useNodes'
import { snakeToTitle } from '@/utils/common'
import { cx } from 'class-variance-authority'
import React from 'react'

interface NodeListItemProps {
  onDragStart: React.DragEventHandler<HTMLDivElement>
  name: string
  type: WFNodeType
}

export const colorClasses = {
  [WFNodeType.TRIGGER]: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
  [WFNodeType.CONTROLLER]: 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100',
  [WFNodeType.ACTIVITY]: 'bg-green-50 border-green-200 hover:bg-green-100',
}

const NodeListItem = ({ onDragStart, name, type }: NodeListItemProps) => {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      title={snakeToTitle(name)}
      aria-label={snakeToTitle(name)}
      className={cx(
        'p-3 border rounded-lg cursor-grab text-base active:cursor-grabbing transition-colors',
        colorClasses[type],
      )}
    >
      {snakeToTitle(name)}
    </div>
  )
}

export default NodeListItem
