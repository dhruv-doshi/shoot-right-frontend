# Deployment Guide — Shoot Right Frontend

## Prerequisites

All environment variables must be set before deploying.

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXTAUTH_URL` | Yes | Full URL of the frontend (e.g. `https://shoot-right.vercel.app`) |
| `NEXTAUTH_SECRET` | Yes | Random string ≥ 32 chars — generate with `openssl rand -base64 32` |
| `GOOGLE_CLIENT_ID` | For OAuth | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | For OAuth | Google OAuth client secret |
| `NEXT_PUBLIC_API_BASE_URL` | Yes | Backend API base URL (e.g. `https://api.shoot-right.com/api/v1`) |

> Google OAuth is not wired up yet — `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` can be left blank until it's enabled.

---

## Vercel (Recommended)

1. Push the repo to GitHub.
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import the repo.
3. Vercel auto-detects Next.js. The `vercel.json` at the root configures the build.
4. Under **Environment Variables**, add all variables from the table above.
5. Click **Deploy**.

### Branch Strategy

| Branch | Vercel Environment | Use |
|--------|--------------------|-----|
| `prod` | Production | Live site — stable releases only |
| `main` | Preview | Staging / QA |
| `dev`  | Preview | Active development |

Set `prod` as the **Production Branch** in Vercel project settings.

### Post-deploy
- Visit `<your-url>/` — landing page loads
- Visit `<your-url>/login` — login form shows (no Google button until OAuth is enabled)
- Verify `NEXTAUTH_URL` matches the Vercel deployment URL exactly

---

## Self-Hosted (Node)

```bash
npm install
npm run build
npm run start        # runs on port 3000
```

Set environment variables in `.env.production.local` or export them in the shell before running `npm run start`.

---

## Self-Hosted (Docker)

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

Build and run:
```bash
docker build -t shoot-right-frontend .
docker run -p 3000:3000 \
  -e NEXTAUTH_URL=https://your-domain.com \
  -e NEXTAUTH_SECRET=<secret> \
  -e NEXT_PUBLIC_API_BASE_URL=https://api.your-domain.com/api/v1 \
  shoot-right-frontend
```

> Enable `output: 'standalone'` in `next.config.ts` for the Docker approach.

---

## Pre-deploy Verification

Run these locally before pushing to `prod`:

```bash
npm run check        # typecheck + lint + tests
npm run build        # must complete with no errors
```

Checklist:
- [ ] All env vars set in Vercel dashboard
- [ ] `NEXTAUTH_URL` matches deployment URL
- [ ] Backend is reachable at `NEXT_PUBLIC_API_BASE_URL`
- [ ] `npm run build` exits 0
- [ ] `npm run test` — all tests pass
- [ ] Login page loads with email/password form
- [ ] Upload → analysis → improvement shot flow works end-to-end
