import { CheckCircle, Mail } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import AuthCard from '@/components/auth/AuthCard'
import { ROUTES } from '@/constants/routes'

export const metadata = { title: 'Verify Email — Shoot Right' }

export default function VerifyEmailPage() {
  return (
    <AuthCard title="Verify your email">
      <div className="flex flex-col items-center gap-5 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--secondary)]">
          <Mail className="h-8 w-8 text-[var(--accent)]" />
        </div>
        <div>
          <p className="text-sm text-[var(--muted-foreground)]">
            We&apos;ve sent a verification link to your email address. Please check your inbox and
            click the link to activate your account.
          </p>
          <p className="mt-3 text-xs text-[var(--muted-foreground)]">
            Didn&apos;t receive the email? Check your spam folder.
          </p>
        </div>
        <div className="flex w-full flex-col gap-2">
          <Link href={ROUTES.LOGIN} className="w-full">
            <Button className="w-full" variant="outline">
              Back to Sign In
            </Button>
          </Link>
        </div>
        <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400">
          <CheckCircle className="h-3.5 w-3.5" />
          <span>Email sent successfully</span>
        </div>
      </div>
    </AuthCard>
  )
}
