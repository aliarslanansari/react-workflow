import { Maximize2, ZoomIn, ZoomOut } from 'lucide-react'

const CustomControls = ({
  zoomIn,
  zoomOut,
  fitView,
}: {
  zoomIn: () => void | undefined
  zoomOut: () => void | undefined
  fitView: () => boolean | undefined
}) => {
  return (
    <div className="absolute bottom-6 right-6 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
      <button
        onClick={zoomIn}
        className="p-3 hover:bg-gray-50 transition-colors border-b border-gray-200"
      >
        <ZoomIn className="w-5 h-5 text-gray-600" />
      </button>
      <button
        onClick={zoomOut}
        className="p-3 hover:bg-gray-50 transition-colors border-b border-gray-200"
      >
        <ZoomOut className="w-5 h-5 text-gray-600" />
      </button>
      <button
        onClick={fitView}
        className="p-3 hover:bg-gray-50 transition-colors"
      >
        <Maximize2 className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  )
}

export default CustomControls
