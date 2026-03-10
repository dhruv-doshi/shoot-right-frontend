import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AnalysisCard from '@/components/analysis/AnalysisCard'

describe('AnalysisCard', () => {
  it('renders title', () => {
    render(
      <AnalysisCard id="test-card" title="Test Card">
        <p>Card content</p>
      </AnalysisCard>
    )
    expect(screen.getByText('Test Card')).toBeInTheDocument()
  })

  it('content is initially hidden', () => {
    render(
      <AnalysisCard id="test-card" title="Test Card">
        <p>Hidden content</p>
      </AnalysisCard>
    )
    // The grid container starts collapsed
    const expandable = document.querySelector('.card-grid-expand')
    expect(expandable).not.toHaveClass('open')
  })

  it('expands when header is clicked', async () => {
    const user = userEvent.setup()
    render(
      <AnalysisCard id="test-card-2" title="Test Card">
        <p>Card content</p>
      </AnalysisCard>
    )
    await user.click(screen.getByRole('button', { name: /test card/i }))
    const expandable = document.querySelector('.card-grid-expand')
    expect(expandable).toHaveClass('open')
  })
})
