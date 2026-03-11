'use client'

import { Suspense, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, Loader2, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import AuthCard from '@/components/auth/AuthCard'
import { ROUTES } from '@/constants/routes'
import apiClient from '@/lib/api-client'

const schema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

type FormValues = z.infer<typeof schema>

function ResetPasswordContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get('token')

  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  if (!token) {
    return (
      <AuthCard title="Reset password">
        <div className="flex flex-col items-center gap-4 text-center">
          <XCircle className="h-10 w-10 text-red-500" />
          <p className="text-sm text-[var(--muted-foreground)]">
            Invalid or missing reset link. Please request a new one.
          </p>
          <Link href={ROUTES.FORGOT_PASSWORD} className="w-full">
            <Button className="w-full" variant="outline">
              Request New Link
            </Button>
          </Link>
        </div>
      </AuthCard>
    )
  }

  const onSubmit = async (data: FormValues) => {
    setServerError(null)
    try {
      await apiClient.post('/auth/reset-password', { token, password: data.password })
      router.push(ROUTES.LOGIN)
    } catch (err: unknown) {
      const error = err as { response?: { data?: { code?: string; message?: string } } }
      const code = error?.response?.data?.code
      if (code === 'TOKEN_EXPIRED') {
        setServerError('This reset link has expired. Please request a new one.')
      } else if (code === 'TOKEN_INVALID') {
        setServerError('This reset link is invalid. Please request a new one.')
      } else {
        setServerError(error?.response?.data?.message || 'Something went wrong. Please try again.')
      }
    }
  }

  return (
    <AuthCard title="Reset password" subtitle="Enter your new password below">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {serverError && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">
            {serverError}
          </div>
        )}

        <div className="space-y-1.5">
          <Label htmlFor="password">New Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              {...register('password')}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              onClick={() => setShowPassword((p) => !p)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-[var(--destructive)]">{errors.password.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <p className="text-xs text-[var(--destructive)]">{errors.confirmPassword.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Resetting…
            </>
          ) : (
            'Reset Password'
          )}
        </Button>

        <p className="text-center text-sm text-[var(--muted-foreground)]">
          <Link href={ROUTES.LOGIN} className="text-[var(--accent)] hover:underline">
            Back to Sign In
          </Link>
        </p>
      </form>
    </AuthCard>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordContent />
    </Suspense>
  )
}
