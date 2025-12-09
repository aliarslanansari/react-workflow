export default function ActivityNode({ data }: any) {
  return (
    <div className="p-2 rounded border-2 border-blue-400 bg-blue-50 min-w-40">
      <div className="font-semibold">⚙️ {data.label}</div>
      <div className="text-xs text-gray-600 mt-1">{data.params?.summary}</div>
    </div>
  )
}
