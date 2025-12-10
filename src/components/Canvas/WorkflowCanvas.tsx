import ActivityNode from '@/components/CustomNodes/ActivityNode'
import ControllerNode from '@/components/CustomNodes/ControllerNode'
import TriggerNode from '@/components/CustomNodes/TriggerNode'
import { useUIStore } from '@/stores/uiStore'
import { useWorkflowStore } from '@/stores/workflowStore'
import type { WFEdge, WFNode } from '@/stores/workflowStore'
import { useCallback, useEffect, useRef } from 'react'
import type { Connection, Node, ReactFlowInstance, NodeProps } from 'reactflow'
import ReactFlow, {
  addEdge,
  Background,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from 'reactflow'
import CustomControls from '../CustomControls'

const nodeTypes: Record<string, React.ComponentType<NodeProps>> = {
  trigger: TriggerNode,
  controller: ControllerNode,
  activity: ActivityNode,
}

export default function WorkflowCanvas({
  nodes,
  edges,
}: {
  nodes: WFNode[]
  edges: WFEdge[]
}) {
  const { setNodes, setEdges } = useWorkflowStore()
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

  const onNodeClick = useCallback(
    (_evt: any, node: Node) => {
      setActiveNode(node.id)
      setOpenParamsPanel(true)
    },
    [setActiveNode, setOpenParamsPanel],
  )

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

      console.log({ newNode })

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
        snapToGrid={true}
        defaultEdgeOptions={{
          type: 'smoothstep',
        }}
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
