import { Handle, Position } from 'reactflow'

export default function TriggerNode({ data }: any) {
  return (
    <div className="p-2 rounded border-2 bg-blue-50 border-blue-200 hover:bg-blue-100 min-w-40 truncate">
      <div className="font-semibold">🔔 {data.label}</div>
      <div className="text-xs text-gray-600 mt-1">
        {data.params?.description}
      </div>
      <Handle type="source" position={Position.Bottom} id="out" />
    </div>
  )
}
