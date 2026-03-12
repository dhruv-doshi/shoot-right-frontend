# Deployment Guide — Shoot Right (Full Stack)

This guide covers deploying the complete Shoot Right stack: the **Next.js frontend** and the **FastAPI backend** (PostgreSQL + Redis + Celery + Nginx).

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                        Clients                          │
└───────────────────┬─────────────────────────────────────┘
                    │ HTTPS
          ┌─────────▼──────────┐
          │   Next.js Frontend  │  (Vercel / Node / Docker)
          │   port 3000         │
          └─────────┬──────────┘
                    │ HTTPS  NEXT_PUBLIC_API_BASE_URL
          ┌─────────▼──────────┐
          │   Nginx (prod)      │  port 80 / 443
          │   or FastAPI direct │  port 8000 (local/dev)
          └─────────┬──────────┘
                    │
          ┌─────────▼──────────┐
          │   FastAPI API       │  src/main.py
          └──┬──────────┬──────┘
             │          │
   ┌──────────▼──┐  ┌───▼──────────┐
   │ PostgreSQL  │  │    Redis      │
   │ port 5432   │  │  port 6379    │
   └─────────────┘  └───┬──────────┘
                        │
              ┌──────────▼──────────┐
              │  Celery Worker       │
              │  (async tasks)       │
              └─────────────────────┘
                        │
              ┌──────────▼──────────┐
              │  Cloudflare R2       │
              │  (image storage)     │
              └─────────────────────┘
```

**Repos:**
- Frontend: `image-analysis-frontend` (this repo)
- Backend: `unified-backend`

**Branch strategy:**

| Branch | Environment | Use |
|--------|-------------|-----|
| `prod` | Production  | Live site — stable releases only |
| `main` | Preview     | Staging / QA |
| `dev`  | Preview     | Active development |

---

## Prerequisites

| Tool | Version | Notes |
|------|---------|-------|
| Node.js | 20+ | Frontend build |
| Docker + Docker Compose | latest | Backend services |
| Git | any | Clone repos |
| `openssl` | any | Generate secrets |

---

## Backend Environment Variables

Create `unified-backend/.env` from `.env.example`:

```bash
cp .env.example .env
```

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `DATABASE_URL` | Yes | Async PostgreSQL URL (asyncpg driver) | `postgresql+asyncpg://postgres:postgres@localhost:5432/unified_backend` |
| `SYNC_DATABASE_URL` | Yes | Sync PostgreSQL URL (psycopg2, used by Alembic) | `postgresql+psycopg2://postgres:postgres@localhost:5432/unified_backend` |
| `REDIS_URL` | Yes | Redis connection URL | `redis://localhost:6379/0` |
| `SECRET_KEY` | Yes | JWT signing secret — min 32 chars | `openssl rand -hex 32` |
| `ALGORITHM` | Yes | JWT algorithm | `HS256` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Yes | Token lifetime in minutes | `10080` (7 days) |
| `R2_ENDPOINT_URL` | Yes | Cloudflare R2 endpoint | `https://<account-id>.r2.cloudflarestorage.com` |
| `R2_ACCESS_KEY_ID` | Yes | R2 access key | from Cloudflare dashboard |
| `R2_SECRET_ACCESS_KEY` | Yes | R2 secret key | from Cloudflare dashboard |
| `R2_BUCKET_NAME` | Yes | R2 bucket name | `shoot-right-images` |
| `R2_PUBLIC_BASE_URL` | Yes | Public CDN URL for stored images | `https://cdn.example.com` or `https://pub-xxxx.r2.dev` |
| `OPENROUTER_API_KEY` | Yes | OpenRouter API key (AI improvement shots) | `sk-or-...` |
| `OPENROUTER_BASE_URL` | Yes | OpenRouter base URL | `https://openrouter.ai/api/v1` |
| `SMTP_HOST` | Yes | SMTP server host | `smtp.gmail.com` |
| `SMTP_PORT` | Yes | SMTP port | `587` |
| `SMTP_USERNAME` | Yes | SMTP login username / email | `noreply@example.com` |
| `SMTP_PASSWORD` | Yes | SMTP password or app password | Gmail App Password |
| `SMTP_FROM_NAME` | Yes | Display name in sent emails | `Shoot Right` |
| `FRONTEND_URL` | Yes | Frontend origin — used for CORS and email links | `https://shoot-right.vercel.app` |
| `GOOGLE_CLIENT_ID` | For OAuth | Google OAuth client ID | `xxx.apps.googleusercontent.com` |
| `ENVIRONMENT` | No | `development` or `production` | `production` |

> **Gmail SMTP:** Go to Google Account → Security → 2-Step Verification → App Passwords. Generate one for "Mail" and use it as `SMTP_PASSWORD`.

> **Secrets:** `SECRET_KEY` is independent of the frontend's `NEXTAUTH_SECRET` — they do not need to match.

---

## Frontend Environment Variables

Create `image-analysis-frontend/.env.local`:

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `NEXTAUTH_URL` | Yes | Full URL of the deployed frontend | `https://shoot-right.vercel.app` |
| `NEXTAUTH_SECRET` | Yes | Random string ≥ 32 chars | `openssl rand -base64 32` |
| `NEXT_PUBLIC_API_BASE_URL` | Yes | Backend API base URL | `https://api.shoot-right.com/api/v1` |
| `GOOGLE_CLIENT_ID` | For OAuth | Google OAuth client ID | `xxx.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | For OAuth | Google OAuth client secret | from Google Cloud Console |

> Google OAuth is not yet wired up in the UI — `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` can be left blank until it's enabled.

---

## Local Development Setup

### 1. Start the backend

```bash
cd unified-backend
cp .env.example .env        # fill in your values
./run_local.sh              # starts API + PostgreSQL + Redis + Celery
```

The API is now available at `http://localhost:8000`. Swagger docs: `http://localhost:8000/docs`.

### 2. Run database migrations

```bash
cd unified-backend
alembic upgrade head
```

### 3. (Optional) Seed test accounts

```bash
cd unified-backend
python scripts/seed_accounts.py
```

Creates:
- `admin@shootright.dev` / `Admin1234!`
- `test@shootright.dev` / `Test1234!`

### 4. Start the frontend

```bash
cd image-analysis-frontend
cp .env.example .env.local  # fill in your values
npm install
npm run dev                 # http://localhost:3000
```

Make sure `NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1` in `.env.local`.

---

## Production Deployment — Backend

### Docker Compose (recommended)

```bash
cd unified-backend
cp .env.example .env        # fill in production values
docker-compose -f docker-compose.prod.yml up --build -d
```

This starts:
- `api` — FastAPI on port 8000
- `db` — PostgreSQL
- `redis` — Redis
- `worker` — Celery worker
- `nginx` — Nginx reverse proxy on ports 80 and 443

### Run migrations (first deploy and after schema changes)

```bash
docker-compose -f docker-compose.prod.yml exec api alembic upgrade head
```

### Seed test accounts (optional)

```bash
docker-compose -f docker-compose.prod.yml exec api python scripts/seed_accounts.py
```

### Health check

```
GET /health
```

Returns `200 OK` with no authentication required. Use this for uptime monitoring.

### Swagger docs

`GET /docs` — disabled in production by default (`ENVIRONMENT=production` turns it off).

---

## Production Deployment — Frontend

### Vercel (recommended)

1. Push this repo to GitHub.
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import the repo.
3. Vercel auto-detects Next.js. The `vercel.json` at the root configures the build.
4. Under **Environment Variables**, add all frontend variables from the table above.
5. In Vercel project settings, set `prod` as the **Production Branch**.
6. Click **Deploy**.

### Self-hosted (Node)

```bash
npm install
npm run build
npm run start               # port 3000
```

Set environment variables in `.env.production.local` or export them before running `npm run start`.

### Self-hosted (Docker)

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

```bash
docker build -t shoot-right-frontend .
docker run -p 3000:3000 \
  -e NEXTAUTH_URL=https://your-domain.com \
  -e NEXTAUTH_SECRET=<secret> \
  -e NEXT_PUBLIC_API_BASE_URL=https://your-backend-domain.com/api/v1 \
  shoot-right-frontend
```

> Requires `output: 'standalone'` in `next.config.ts`.

---

## CORS & Service Wiring

These two variables must point at each other:

| Service | Variable | Value |
|---------|----------|-------|
| Backend `.env` | `FRONTEND_URL` | `https://your-frontend.vercel.app` |
| Frontend `.env.local` | `NEXT_PUBLIC_API_BASE_URL` | `https://your-backend-domain.com/api/v1` |

The backend automatically adds `http://localhost:3000` to the CORS allowlist in development. In production, only `FRONTEND_URL` is allowed — set it to the exact frontend origin (no trailing slash).

The production Nginx proxy means the API reaches clients on port 443 (HTTPS) without `:8000`. Set `NEXT_PUBLIC_API_BASE_URL` accordingly — do not include `:8000` in production.

---

## Database Migrations

Run Alembic any time the schema changes:

```bash
# Local
alembic upgrade head

# Production (Docker)
docker-compose -f docker-compose.prod.yml exec api alembic upgrade head
```

To create a new migration after changing models:

```bash
alembic revision --autogenerate -m "describe the change"
alembic upgrade head
```

---

## Post-deploy Verification

### Backend

```bash
curl https://your-backend-domain.com/health
# → 200 OK
```

### Frontend

- `https://your-frontend.vercel.app/` — landing page loads
- `https://your-frontend.vercel.app/login` — login form shows
- Register → email arrives → click verify link → redirected to login
- Login with verified credentials → lands on dashboard
- Upload image → progress bar → `/analysis/:id` → processing → results
- Improvement Shot button → AI-generated version appears

### Full checklist

- [ ] `GET /health` returns 200
- [ ] Frontend loads without console errors
- [ ] `NEXTAUTH_URL` matches the deployment URL exactly
- [ ] `NEXT_PUBLIC_API_BASE_URL` is reachable from the browser
- [ ] `FRONTEND_URL` in backend `.env` matches the frontend origin
- [ ] Migrations ran: `alembic upgrade head`
- [ ] Register → verify email → login flow works
- [ ] Upload → analysis → improvement shot flow works end-to-end
- [ ] `npm run test` — all 26 tests pass
- [ ] `npm run build` — exits 0

---

## Troubleshooting

| Symptom | Likely cause | Fix |
|---------|-------------|-----|
| API calls return CORS errors | `FRONTEND_URL` mismatch | Set `FRONTEND_URL` in backend `.env` to the exact frontend origin |
| `NEXTAUTH_SECRET` error on login | Secret not set or too short | Must be ≥ 32 chars — regenerate with `openssl rand -base64 32` |
| Emails not sending | Wrong SMTP variable names | Use `SMTP_USERNAME` and `SMTP_FROM_NAME` (not `SMTP_USER` / `SMTP_FROM`) |
| Images not loading | R2 hostname not in `next.config.ts` | Add your `R2_PUBLIC_BASE_URL` hostname to the `images.remotePatterns` array |
| 500 on first boot | Migrations not run | Run `alembic upgrade head` inside the `api` container |
| Celery tasks not processing | Redis not reachable | Check `REDIS_URL` and that Redis container/service is running |
| `/docs` not accessible | Production mode | Set `ENVIRONMENT=development` temporarily, or access Swagger locally |
| Login returns "email not verified" | Expected behavior | Register flow requires clicking the verification link in the email |
