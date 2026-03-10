import { create } from 'zustand'

interface UploadStore {
  progress: number
  setProgress: (progress: number) => void
  reset: () => void
}

export const useUploadStore = create<UploadStore>((set) => ({
  progress: 0,
  setProgress: (progress) => set({ progress }),
  reset: () => set({ progress: 0 }),
}))
