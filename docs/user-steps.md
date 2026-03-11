# User Action Items — Backend + Config Setup

Follow these steps to get the full stack working end-to-end.

---

## 1. Backend `.env` — Required Variables

Open your backend `.env` file and set the following:

### Google OAuth (must match frontend)
```
GOOGLE_CLIENT_ID=<same value as frontend GOOGLE_CLIENT_ID>
```

### Email (SMTP) — for verification emails and password reset
```
SMTP_HOST=smtp.gmail.com          # or your provider's host
SMTP_PORT=587
SMTP_USER=you@gmail.com
SMTP_PASSWORD=your-app-password   # Gmail: use an App Password, not your account password
SMTP_FROM=Shoot Right <you@gmail.com>
```
> **Gmail tip:** Go to Google Account → Security → 2-Step Verification → App Passwords. Generate one for "Mail".

### Cloudflare R2 — for image storage
```
R2_ENDPOINT_URL=https://<account-id>.r2.cloudflarestorage.com
R2_ACCESS_KEY_ID=<your-r2-access-key>
R2_SECRET_ACCESS_KEY=<your-r2-secret-key>
R2_BUCKET_NAME=shoot-right-images
```
> Get these from Cloudflare Dashboard → R2 → Manage R2 API Tokens.

### OpenRouter — for AI improvement shots
```
OPENROUTER_API_KEY=sk-or-...
```
> Get this from https://openrouter.ai/keys

### Frontend URL (for email links)
```
FRONTEND_URL=http://localhost:3000
```

---

## 2. Frontend `.env.local` — Fix Google Client ID

```
NEXT_PUBLIC_GOOGLE_CLIENT_ID=<same value as GOOGLE_CLIENT_ID above>
```

---

## 3. `next.config.ts` — Add R2 CDN Hostname

Once your R2 bucket has a public URL (e.g., `pub-xxxx.r2.dev` or a custom domain), add it to `next.config.ts`:

```typescript
{
  protocol: 'https',
  hostname: 'pub-xxxx.r2.dev',   // replace with your actual hostname
}
```

There is already a comment placeholder in the file showing exactly where to add this.

---

## 4. Google Cloud Console — Authorized Redirect URIs

Go to [Google Cloud Console](https://console.cloud.google.com/) → APIs & Services → Credentials → your OAuth client.

Add to **Authorized JavaScript origins**:
```
http://localhost:3000
```

Add to **Authorized redirect URIs**:
```
http://localhost:3000/api/auth/callback/google
```

For production, add your production domain too.

---

## 5. Verification Checklist

Run through these after completing steps 1–4:

- [ ] `npm run dev` starts with no 500 errors
- [ ] Register → email arrives → click verify link → redirected to login
- [ ] Login with verified credentials → lands on dashboard
- [ ] Login with **unverified** email → shows "Please verify your email address..." message
- [ ] Google OAuth → lands on dashboard
- [ ] Upload image → progress bar → redirects to `/analysis/:id` → shows "processing" → auto-polls → shows results
- [ ] Improvement Shot button → shows AI-generated improved version
- [ ] Forgot Password → email arrives → reset link works
- [ ] `npm run test` → all tests passing
- [ ] `npm run build` → clean build

---

## What Was Fixed (Frontend Code Changes)

| File | Change |
|------|--------|
| `src/hooks/useAnalysis.ts` | Added `refetchInterval` — polls every 3 s while status is `processing`, stops on `completed`/`failed`. Set `staleTime: 0` so analysis always re-validates on mount. |
| `src/lib/auth.ts` | Now throws `CredentialsSignin` with `code: 'email_not_verified'` instead of silently returning `null` when backend returns `EMAIL_NOT_VERIFIED`. |
| `src/components/auth/LoginForm.tsx` | Shows specific "verify your email" message when `result.code === 'email_not_verified'`. |
| `next.config.ts` | Added comment placeholder for R2 CDN hostname. |
