import { Handle, Position } from 'reactflow'

export default function ActivityNode({ data }: any) {
  return (
    <div className="p-2 rounded border-2 bg-green-50 border-green-200 hover:bg-green-100 min-w-40 truncate">
      <div className="font-semibold">⚙️ {data.label}</div>
      <div className="text-xs text-gray-600 mt-1">{data.params?.summary}</div>
      <Handle type="target" position={Position.Top} id="in" />
      <Handle type="source" position={Position.Bottom} id="out" />
    </div>
  )
}
