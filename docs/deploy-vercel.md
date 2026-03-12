# Vercel Deployment Guide — Shoot Right Frontend

This guide covers deploying **only the Next.js frontend** to Vercel.
The backend (FastAPI + PostgreSQL + Redis + Celery) must be deployed separately and reachable over HTTPS before this frontend goes live.

---

## Prerequisites

Before deploying the frontend, confirm the following are ready:

| Requirement | Why it's needed |
|-------------|-----------------|
| Backend deployed and reachable over HTTPS | `NEXT_PUBLIC_API_BASE_URL` must be a live HTTPS URL — Vercel will reject HTTP origins in production |
| A GitHub/GitLab/Bitbucket repo containing this codebase | Vercel deploys directly from a Git remote |
| A Vercel account | Free tier is sufficient for most use cases |
| `NEXTAUTH_SECRET` (≥ 32 characters) | Required by NextAuth.js to sign JWTs — missing or short secrets cause login to silently fail |

> **Backend note:** You do not need to set up Google OAuth to get the app running. The Credentials provider (email + password) is fully functional on its own. Google OAuth fields can be left blank until that flow is wired up in the UI.

---

## Branch Strategy

| Branch | Vercel Environment | Purpose |
|--------|--------------------|---------|
| `prod` | Production | Live site — only stable releases |
| `main` | Preview | Staging / QA |
| `dev`  | Preview | Active development |

Set `prod` as your **Production Branch** in Vercel project settings (step 5 below). Pushes to `main` and `dev` will create Preview deployments automatically.

---

## Step 1 — Push the repo to GitHub

If you haven't already:

```bash
# From the project root
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

Vercel pulls directly from your Git remote on every push. It does not need local access to your machine.

---

## Step 2 — Import the project on Vercel

1. Go to [vercel.com](https://vercel.com) and log in.
2. Click **Add New → Project**.
3. Under **Import Git Repository**, find and select your repo.
4. Vercel auto-detects Next.js — no framework override needed. The `vercel.json` at the repo root handles any custom build configuration.
5. Do **not** click Deploy yet — configure environment variables first (Step 3).

---

## Step 3 — Set environment variables in Vercel

In the Vercel project → **Settings → Environment Variables**, add each variable below.

For each variable you can select which environments it applies to: **Production**, **Preview**, and **Development**. Use the values that match each environment accordingly.

---

### Required variables

#### `NEXTAUTH_URL`

```
NEXTAUTH_URL=https://your-app.vercel.app
```

- Must be the **exact public URL** of the deployed frontend — no trailing slash.
- For the Production environment, use your production domain (e.g. `https://shoot-right.vercel.app`).
- For Preview environments, Vercel automatically sets `NEXTAUTH_URL_INTERNAL` but you still need to provide `NEXTAUTH_URL` with the preview URL, or use `VERCEL_URL` (see note below).
- **Common mistake:** setting this to `localhost:3000` in production causes NextAuth callbacks to redirect to the wrong origin.

> **Preview deployments tip:** Vercel generates a unique URL per preview build (e.g. `shoot-right-git-main-xyz.vercel.app`). To avoid updating `NEXTAUTH_URL` for every preview, set `NEXTAUTH_URL` to `https://$VERCEL_URL` in the Preview environment — Vercel substitutes `$VERCEL_URL` at build time.

---

#### `NEXTAUTH_SECRET`

```
NEXTAUTH_SECRET=<random string, minimum 32 characters>
```

Generate one locally:

```bash
openssl rand -base64 32
```

- This secret signs and verifies JWTs for all sessions. It is entirely independent of the backend's `SECRET_KEY` — they do not need to match.
- Never commit this to the repo or expose it in client-side code.
- Changing this secret in production invalidates all existing sessions (all users get logged out).

---

#### `NEXT_PUBLIC_API_BASE_URL`

```
NEXT_PUBLIC_API_BASE_URL=https://your-backend-domain.com/api/v1
```

- This is the base URL your browser will use to call the backend API.
- It must be a live, HTTPS URL pointing at the FastAPI backend.
- The `NEXT_PUBLIC_` prefix means this value is embedded in the client-side bundle — do not put secrets here.
- In production, the backend typically sits behind Nginx on port 443, so do **not** include `:8000` in this URL for production.
- For local development, use `http://localhost:8000/api/v1` in `.env.local`.

---

### Optional variables (Google OAuth — leave blank until wired up)

Google OAuth is not currently surfaced in the UI. Add these only when you are ready to enable it:

#### `GOOGLE_CLIENT_ID`

```
GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
```

Obtained from [Google Cloud Console](https://console.cloud.google.com/) → APIs & Services → Credentials.

#### `GOOGLE_CLIENT_SECRET`

```
GOOGLE_CLIENT_SECRET=GOCSPX-...
```

Also from Google Cloud Console. Keep this in the **Production** and **Preview** environments only — never in client-side code.

When enabling Google OAuth, add the following Authorized Redirect URI in Google Cloud Console:

```
https://your-app.vercel.app/api/auth/callback/google
```

---

## Step 4 — Wire frontend ↔ backend (CORS)

The backend must know the frontend's origin to allow API calls from the browser. After your Vercel deployment URL is known, set the following variable **in the backend's `.env`**:

```
FRONTEND_URL=https://your-app.vercel.app
```

- The backend uses this value to configure CORS. If it doesn't match the exact origin (scheme + host, no trailing slash), the browser will block API responses with a CORS error.
- In development, `http://localhost:3000` is automatically allowed by the backend — no change needed locally.
- If you have multiple Vercel URLs (e.g. preview + production), the backend must allowlist each one, or use a wildcard pattern if supported.

**Both of these must point at each other:**

| Side | Variable | Value |
|------|----------|-------|
| Backend `.env` | `FRONTEND_URL` | `https://your-app.vercel.app` |
| Frontend Vercel env | `NEXT_PUBLIC_API_BASE_URL` | `https://your-backend-domain.com/api/v1` |

---

## Step 5 — Configure the production branch

In your Vercel project → **Settings → Git**:

- Set **Production Branch** to `prod`.
- This ensures only pushes to `prod` trigger a production deployment. Pushes to `main` and `dev` create Preview deployments.

---

## Step 6 — Deploy

Click **Deploy** on the project page (or push a commit to trigger an automatic deployment).

Vercel will:
1. Clone the repo.
2. Run `npm install`.
3. Run `npm run build` (Next.js production build).
4. Serve the output from its global edge network.

Build logs are visible in real time in the Vercel dashboard. A successful build exits with code `0`.

---

## Step 7 — Post-deploy verification

Run through this checklist after each production deployment:

### Automated check

```bash
# Confirm the build passed locally before pushing
npm run build

# Run all 26 tests
npm run test
```

### Manual checks

- [ ] `https://your-app.vercel.app/` — landing page loads, no console errors
- [ ] `https://your-app.vercel.app/login` — login form appears
- [ ] `https://your-app.vercel.app/register` — register form appears
- [ ] Register a new account → confirmation email arrives → click verify link → redirected to login
- [ ] Log in with verified credentials → lands on `/dashboard`
- [ ] Upload an image → progress bar shows → redirected to `/analysis/:id` → analysis results render
- [ ] Improvement Shot button generates an AI-enhanced image
- [ ] Theme toggle (light/dark) works without a flash on page load
- [ ] `NEXTAUTH_URL` in Vercel env matches the deployed URL exactly

---

## Troubleshooting

| Symptom | Likely cause | Fix |
|---------|-------------|-----|
| API calls return CORS errors in the browser | `FRONTEND_URL` in backend `.env` doesn't match the Vercel origin | Set `FRONTEND_URL` to the exact deployed URL — no trailing slash, correct scheme |
| Login fails silently or redirects to wrong URL | `NEXTAUTH_URL` mismatch or secret too short | Confirm `NEXTAUTH_URL` matches deployment URL and `NEXTAUTH_SECRET` is ≥ 32 chars |
| Images don't load (broken image icons) | R2 image hostname not in `next.config.ts` | Add your `R2_PUBLIC_BASE_URL` hostname to the `images.remotePatterns` array in `next.config.ts` |
| Build fails on Vercel but passes locally | Environment variable missing in Vercel dashboard | Cross-check all required variables are set for the Production environment in Vercel settings |
| Preview deployment NextAuth callback loop | `NEXTAUTH_URL` set to production URL in Preview env | Set `NEXTAUTH_URL` to `https://$VERCEL_URL` for the Preview environment |
| "Email not verified" error after login | Expected — registration requires email verification | Click the verification link sent to the registered email before logging in |
| `500` errors on protected routes | Backend unreachable or `NEXT_PUBLIC_API_BASE_URL` wrong | Verify the backend is live and the URL is correct — test with `curl https://your-backend/health` |

---

## Backend minimum requirements (for frontend to be fully functional)

The frontend renders placeholder data when the backend is unreachable (useful for local dev), but the following backend services must be running for full production functionality:

| Backend service | Frontend feature that needs it |
|-----------------|-------------------------------|
| FastAPI API (`/api/v1`) | Login, register, upload, analysis, improvement shot |
| PostgreSQL | User accounts, analysis records |
| Redis + Celery worker | Async image analysis processing |
| Cloudflare R2 | Storing and serving uploaded images |
| SMTP (email) | Registration verification emails, password reset emails |

The backend exposes a health endpoint — use it to confirm it is live before troubleshooting frontend issues:

```bash
curl https://your-backend-domain.com/health
# Expected: 200 OK
```
