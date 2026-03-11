import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RegisterForm from '@/components/auth/RegisterForm'

vi.mock('@/lib/api-client', () => ({
  default: {
    post: vi.fn(),
  },
}))

const mockPush = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}))

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}))

vi.mock('next-auth/react', () => ({
  signIn: vi.fn(),
}))

describe('RegisterForm', () => {
  beforeEach(() => vi.clearAllMocks())

  it('renders all fields', () => {
    render(<RegisterForm />)
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^password/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument()
  })

  it('validates password match', async () => {
    const user = userEvent.setup()
    render(<RegisterForm />)

    await user.type(screen.getByLabelText(/full name/i), 'Test User')
    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/^password/i), 'Password1')
    await user.type(screen.getByLabelText(/confirm password/i), 'Password2')
    await user.click(screen.getByRole('button', { name: /create account/i }))

    await waitFor(() => {
      expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument()
    })
  })

  it('submits successfully and redirects', async () => {
    const apiClient = await import('@/lib/api-client')
    vi.mocked(apiClient.default.post).mockResolvedValue({ data: { success: true } })

    const user = userEvent.setup()
    render(<RegisterForm />)

    await user.type(screen.getByLabelText(/full name/i), 'Test User')
    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/^password/i), 'Password1')
    await user.type(screen.getByLabelText(/confirm password/i), 'Password1')
    await user.click(screen.getByRole('button', { name: /create account/i }))

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/verify-email')
    })
  })
})
