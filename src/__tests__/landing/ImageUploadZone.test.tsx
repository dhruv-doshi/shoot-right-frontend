import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import ImageUploadZone from '@/components/upload/ImageUploadZone'

describe('ImageUploadZone', () => {
  it('renders drag-drop area', () => {
    render(<ImageUploadZone onFileSelect={vi.fn()} />)
    expect(screen.getByText(/drag & drop your photo/i)).toBeInTheDocument()
  })

  it('shows accepted file types', () => {
    render(<ImageUploadZone onFileSelect={vi.fn()} />)
    expect(screen.getByText(/jpg/i)).toBeInTheDocument()
    expect(screen.getByText(/png/i)).toBeInTheDocument()
  })

  it('disables when disabled prop is true', () => {
    render(<ImageUploadZone onFileSelect={vi.fn()} disabled={true} />)
    const dropzone = screen.getByText(/drag & drop your photo/i).closest('div')
    expect(dropzone?.closest('[class*="opacity"]')).toBeTruthy()
  })
})
