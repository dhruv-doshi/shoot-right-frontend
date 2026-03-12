import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import HeroSection from '@/components/landing/HeroSection'

vi.mock('next-auth/react', () => ({
  useSession: () => ({ data: null }),
}))

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}))

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}))

describe('HeroSection', () => {
  it('renders headline text', () => {
    render(<HeroSection />)
    expect(screen.getByText(/see your photos/i)).toBeInTheDocument()
  })

  it('shows Get Started when not authenticated', () => {
    render(<HeroSection />)
    expect(screen.getByText(/get started free/i)).toBeInTheDocument()
  })
})
