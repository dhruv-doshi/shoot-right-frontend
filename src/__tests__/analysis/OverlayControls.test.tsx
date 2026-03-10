import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import OverlayControls from '@/components/analysis/OverlayControls'

describe('OverlayControls', () => {
  it('renders all overlay options', () => {
    render(<OverlayControls />)
    expect(screen.getByText('None')).toBeInTheDocument()
    expect(screen.getByText('Rule of Thirds')).toBeInTheDocument()
    expect(screen.getByText('Golden Ratio')).toBeInTheDocument()
    expect(screen.getByText('Spiral')).toBeInTheDocument()
  })

  it('None is selected by default', () => {
    render(<OverlayControls />)
    expect(screen.getByText('None')).toHaveAttribute('aria-pressed', 'true')
  })

  it('changes selection on click', async () => {
    const user = userEvent.setup()
    render(<OverlayControls />)

    await user.click(screen.getByText('Rule of Thirds'))
    expect(screen.getByText('Rule of Thirds')).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText('None')).toHaveAttribute('aria-pressed', 'false')
  })
})
