import { useOverlayStore } from '@/store/overlayStore'

export function useOverlay() {
  const { activeOverlay, setOverlay } = useOverlayStore()
  return { activeOverlay, setOverlay }
}
