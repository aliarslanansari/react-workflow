import { Save, Undo, Redo } from 'lucide-react'

interface NavbarProps {
  onSave: () => void
  workflowId?: string
}

export default function Topbar({ onSave, workflowId }: NavbarProps) {
  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <div>
          <div className="text-gray-900">Workflow Editor</div>
          <div className="text-xs text-gray-500">{workflowId}</div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Undo className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Redo className="w-5 h-5 text-gray-600" />
        </button>
        <button
          onClick={onSave}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          Save Workflow
        </button>
      </div>
    </div>
  )
}
