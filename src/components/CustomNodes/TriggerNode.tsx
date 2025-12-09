export default function TriggerNode({ data }: any) {
  return (
    <div className="p-2 rounded border-2 border-red-400 bg-red-50 min-w-40">
      <div className="font-semibold">🔔 {data.label}</div>
      <div className="text-xs text-gray-600 mt-1">
        {data.params?.description}
      </div>
    </div>
  )
}
