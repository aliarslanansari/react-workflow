import { create } from 'zustand'

type UIState = {
  activeNodeId: string | null
  openParamsPanel: boolean
  setActiveNode: (id: string | null) => void
  setOpenParamsPanel: (v: boolean) => void
}

export const useUIStore = create<UIState>((set) => ({
  activeNodeId: null,
  openParamsPanel: false,
  setActiveNode: (id) => set({ activeNodeId: id }),
  setOpenParamsPanel: (v) => set({ openParamsPanel: v }),
}))
