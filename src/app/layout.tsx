import type { Metadata } from 'next'
import './globals.css'
import AuthProvider from '@/providers/AuthProvider'
import QueryProvider from '@/providers/QueryProvider'
import { ThemeProvider } from '@/providers/ThemeProvider'

export const metadata: Metadata = {
  title: 'Shoot Right — AI Photography Analysis',
  description:
    'Elevate your photography with AI-powered composition, technical, and aesthetic analysis.',
  keywords: ['photography', 'AI analysis', 'composition', 'photo feedback'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <AuthProvider>
            <QueryProvider>{children}</QueryProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
