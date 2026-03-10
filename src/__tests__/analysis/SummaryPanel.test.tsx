import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import SummaryPanel from '@/components/analysis/SummaryPanel'

describe('SummaryPanel', () => {
  const props = {
    score: 78,
    headline: 'Strong Composition',
    summary: 'This is a test summary.',
  }

  it('renders score', () => {
    render(<SummaryPanel {...props} />)
    expect(screen.getByText('78')).toBeInTheDocument()
  })

  it('renders headline', () => {
    render(<SummaryPanel {...props} />)
    expect(screen.getByText('Strong Composition')).toBeInTheDocument()
  })

  it('renders summary text', () => {
    render(<SummaryPanel {...props} />)
    expect(screen.getByText('This is a test summary.')).toBeInTheDocument()
  })
})
