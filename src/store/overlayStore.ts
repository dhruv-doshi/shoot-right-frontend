import { create } from 'zustand'
import type { OverlayType } from '@/types/analysis'

interface OverlayStore {
  activeOverlay: OverlayType
  setOverlay: (overlay: OverlayType) => void
}

export const useOverlayStore = create<OverlayStore>((set) => ({
  activeOverlay: 'none',
  setOverlay: (overlay) => set({ activeOverlay: overlay }),
}))
