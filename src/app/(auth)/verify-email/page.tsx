'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { CheckCircle, Mail, XCircle, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import AuthCard from '@/components/auth/AuthCard'
import { ROUTES } from '@/constants/routes'
import apiClient from '@/lib/api-client'

type State = 'no-token' | 'verifying' | 'success' | 'error'

function VerifyEmailContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get('token')

  const [state, setState] = useState<State>(token ? 'verifying' : 'no-token')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!token) return

    apiClient
      .post('/auth/verify-email', { token })
      .then(() => {
        setState('success')
        setTimeout(() => router.push(ROUTES.LOGIN), 2000)
      })
      .catch((err: unknown) => {
        const error = err as { response?: { data?: { code?: string } } }
        const code = error?.response?.data?.code
        if (code === 'TOKEN_EXPIRED') {
          setErrorMessage('This verification link has expired. Please register again.')
        } else {
          setErrorMessage('This verification link is invalid.')
        }
        setState('error')
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  return (
    <AuthCard title="Verify your email">
      <div className="flex flex-col items-center gap-5 text-center">
        {state === 'no-token' && (
          <>
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--secondary)]">
              <Mail className="h-8 w-8 text-[var(--accent)]" />
            </div>
            <div>
              <p className="text-sm text-[var(--muted-foreground)]">
                We&apos;ve sent a verification link to your email address. Please check your inbox
                and click the link to activate your account.
              </p>
              <p className="mt-3 text-xs text-[var(--muted-foreground)]">
                Didn&apos;t receive the email? Check your spam folder.
              </p>
            </div>
            <Link href={ROUTES.LOGIN} className="w-full">
              <Button className="w-full" variant="outline">
                Back to Sign In
              </Button>
            </Link>
          </>
        )}

        {state === 'verifying' && (
          <>
            <Loader2 className="h-10 w-10 animate-spin text-[var(--accent)]" />
            <p className="text-sm text-[var(--muted-foreground)]">Verifying your email…</p>
          </>
        )}

        {state === 'success' && (
          <>
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-950">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-sm text-[var(--muted-foreground)]">
              Email verified successfully! Redirecting you to sign in…
            </p>
          </>
        )}

        {state === 'error' && (
          <>
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-950">
              <XCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
            <p className="text-sm text-[var(--muted-foreground)]">{errorMessage}</p>
            <Link href={ROUTES.LOGIN} className="w-full">
              <Button className="w-full" variant="outline">
                Back to Sign In
              </Button>
            </Link>
          </>
        )}
      </div>
    </AuthCard>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense>
      <VerifyEmailContent />
    </Suspense>
  )
}
