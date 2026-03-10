import AuthCard from '@/components/auth/AuthCard'
import RegisterForm from '@/components/auth/RegisterForm'

export const metadata = { title: 'Create Account — Shoot Right' }

export default function RegisterPage() {
  return (
    <AuthCard
      title="Create account"
      subtitle="Join Shoot Right and start improving your photography"
    >
      <RegisterForm />
    </AuthCard>
  )
}
