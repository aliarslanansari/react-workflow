import { useCallback, useEffect, useMemo, useRef } from 'react'
import type { Node, Connection, ReactFlowInstance } from 'reactflow'
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from 'reactflow'
import TriggerNode from '@/components/CustomNodes/TriggerNode'
import ControllerNode from '@/components/CustomNodes/ControllerNode'
import ActivityNode from '@/components/CustomNodes/ActivityNode'
import { useWorkflowStore } from '@/stores/workflowStore'
import { useUIStore } from '@/stores/uiStore'
import CustomControls from '../CustomControls'
import { ZoomIn } from 'lucide-react'

const nodeTypes = {
  trigger: TriggerNode,
  controller: ControllerNode,
  activity: ActivityNode,
}

export default function WorkflowCanvas() {
  const {
    nodes,
    edges,
    setNodes,
    setEdges,
    addNode,
    addEdge: storeAddEdge,
  } = useWorkflowStore()
  const { setActiveNode, setOpenParamsPanel } = useUIStore()
  const { screenToFlowPosition } = useReactFlow()
  // keep local reactflow controlled arrays in sync with store
  const [rNodes, setRNodes, onNodesChange] = useNodesState(nodes)
  const [rEdges, setREdges, onEdgesChange] = useEdgesState(edges)
  const reactFlowInstance = useRef<ReactFlowInstance<any, any>>(null)

  console.log('WorkflowCanvas', { rNodes, rEdges })

  // sync to store when local changes happen
  useEffect(() => setNodes(rNodes), [rNodes])
  useEffect(() => setEdges(rEdges), [rEdges])

  const onConnect = useCallback(
    (connection: Connection) => {
      const targetNode = rNodes.find((n) => n.id === connection.target)
      if (targetNode?.type === 'trigger') {
        alert('Trigger nodes cannot have incoming edges.')
        return
      }
      const newEdge = addEdge(connection, rEdges)
      setREdges(newEdge)
    },
    [rEdges, rNodes, setREdges],
  )

  const onNodeClick = useCallback((evt: any, node) => {
    setActiveNode(node.id)
    setOpenParamsPanel(true)
  }, [])

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault()

      const type = event.dataTransfer.getData('node/type')
      const name = event.dataTransfer.getData('node/name')

      if (!type) return

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      })

      const id = Date.now().toString()

      const newNode: Node = {
        id,
        type,
        position,
        data: {
          label: name || `${type} node`,
          nodeName: name,
          params: {},
        },
      }

      setRNodes((nds) => nds.concat(newNode))
    },
    [screenToFlowPosition],
  )

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }, [])

  return (
    <div
      className="flex-1 h-[calc(100vh-55px)] bg-gray-50 relative"
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <ReactFlow
        nodes={rNodes}
        edges={rEdges}
        onInit={(instance) => (reactFlowInstance.current = instance)}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        onNodeClick={onNodeClick}
        proOptions={{ hideAttribution: true }}
      >
        <Background />
      </ReactFlow>
      <CustomControls
        zoomIn={() => reactFlowInstance.current?.zoomIn()}
        zoomOut={() => reactFlowInstance.current?.zoomOut()}
        fitView={() => reactFlowInstance.current?.fitView()}
      />
    </div>
  )
}
