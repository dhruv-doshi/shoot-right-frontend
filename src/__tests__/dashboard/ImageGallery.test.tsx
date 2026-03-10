import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PLACEHOLDER_USER_IMAGES } from '@/constants/placeholders'

vi.mock('@/hooks/useUserImages', () => ({
  useUserImages: () => ({ data: PLACEHOLDER_USER_IMAGES, isLoading: false }),
}))

vi.mock('@/hooks/useUploadImage', () => ({
  useUploadImage: () => ({ mutate: vi.fn(), isPending: false, progress: 0 }),
}))

vi.mock('next-auth/react', () => ({
  useSession: () => ({ data: { user: { name: 'Test', email: 'test@example.com' } }, status: 'authenticated' }),
  signOut: vi.fn(),
}))

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}))

vi.mock('next/image', () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}))

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}))

vi.mock('@/providers/ThemeProvider', () => ({
  useTheme: () => ({ theme: 'light', toggleTheme: vi.fn() }),
}))

describe('ImageGallery', () => {
  it('renders images from placeholder data', async () => {
    const { default: ImageGallery } = await import('@/components/dashboard/ImageGallery')
    render(<ImageGallery />)
    expect(screen.getByText('mountain_landscape.jpg')).toBeInTheDocument()
  })

  it('shows upload button', async () => {
    const { default: ImageGallery } = await import('@/components/dashboard/ImageGallery')
    render(<ImageGallery />)
    expect(screen.getByRole('button', { name: /upload new/i })).toBeInTheDocument()
  })

  it('shows correct image count', async () => {
    const { default: ImageGallery } = await import('@/components/dashboard/ImageGallery')
    render(<ImageGallery />)
    expect(screen.getByText(`${PLACEHOLDER_USER_IMAGES.length} images analyzed`)).toBeInTheDocument()
  })
})
