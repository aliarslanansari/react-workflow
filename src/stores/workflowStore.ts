import { create } from 'zustand'
import type { Node, Edge } from 'reactflow'

export type WFNode = Node
export type WFEdge = Edge

type WorkflowState = {
  nodes: WFNode[]
  edges: WFEdge[]
  setNodes: (nodes: WFNode[]) => void
  setEdges: (edges: WFEdge[]) => void
  addNode: (n: WFNode) => void
  addEdge: (e: WFEdge) => void
  updateNodeData: (id: string, data: any) => void
  reset: () => void
}

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  nodes: [],
  edges: [],
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  addNode: (n) => set({ nodes: [...get().nodes, n] }),
  addEdge: (e) => set({ edges: [...get().edges, e] }),
  updateNodeData: (id, data) =>
    set({
      nodes: get().nodes.map((nd) =>
        nd.id === id ? { ...nd, data: { ...nd.data, ...data } } : nd,
      ),
    }),
  reset: () => set({ nodes: [], edges: [] }),
}))
