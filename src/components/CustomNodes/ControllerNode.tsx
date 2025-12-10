import { Handle, Position } from 'reactflow'
import type { NodeProps } from 'reactflow'

export default function ControllerNode({ data }: NodeProps) {
  return (
    <div className="p-4 rounded border bg-yellow-50 border-yellow-200 hover:bg-yellow-100 w-64 relative">
      <div className="font-medium mb-2">{data.label}</div>

      <Handle type="target" position={Position.Top} id="in" />

      <Handle
        type="source"
        position={Position.Bottom}
        id="yes"
        style={{ left: '35%' }}
      />

      <Handle
        type="source"
        position={Position.Bottom}
        id="no"
        style={{ left: '65%' }}
      />

      <div className="absolute bottom-1 left-[30%] text-xs text-green-600">
        YES
      </div>
      <div className="absolute bottom-1 left-[60%] text-xs text-red-600">
        NO
      </div>
    </div>
  )
}
