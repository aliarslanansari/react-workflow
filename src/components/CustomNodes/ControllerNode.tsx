export default function ControllerNode({ data }: any) {
  return (
    <div className="p-2 rounded border-2 border-yellow-400 bg-yellow-50 min-w-40">
      <div className="font-semibold">⚖️ {data.label}</div>
    </div>
  )
}
