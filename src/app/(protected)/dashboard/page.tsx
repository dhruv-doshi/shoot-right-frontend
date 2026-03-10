import Navbar from '@/components/layout/Navbar'
import ImageGallery from '@/components/dashboard/ImageGallery'

export const metadata = { title: 'Dashboard — Shoot Right' }

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <ImageGallery />
      </main>
    </div>
  )
}
