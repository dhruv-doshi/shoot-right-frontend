import AuthCard from '@/components/auth/AuthCard'
import LoginForm from '@/components/auth/LoginForm'
import { Suspense } from 'react'

export const metadata = { title: 'Sign In — Shoot Right' }

export default function LoginPage() {
  return (
    <AuthCard title="Welcome back" subtitle="Sign in to your account to continue">
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </AuthCard>
  )
}
