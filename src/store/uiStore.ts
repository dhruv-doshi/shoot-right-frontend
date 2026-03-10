import { create } from 'zustand'

interface UIStore {
  openCards: Set<string>
  toggleCard: (id: string) => void
  closeCard: (id: string) => void
}

export const useUIStore = create<UIStore>((set) => ({
  openCards: new Set(),
  toggleCard: (id) =>
    set((state) => {
      const next = new Set(state.openCards)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return { openCards: next }
    }),
  closeCard: (id) =>
    set((state) => {
      const next = new Set(state.openCards)
      next.delete(id)
      return { openCards: next }
    }),
}))
