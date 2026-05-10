# Shoot Right

> AI photography coach. Upload a shot — get instant, visual feedback on composition, lighting, and color.

🌐 **Live**: [shoot-right.vercel.app](https://shoot-right.vercel.app)
📁 **Backend**: [unified-backend](https://github.com/dhruv-doshi/unified-backend)
👤 **Author**: [Dhruv Doshi](https://dhruvdoshi.vercel.app)

---

## What it does

Upload a photo and Shoot Right analyses it across three axes:

- **Composition** — rule of thirds, golden ratio, leading lines, symmetry — drawn directly over your image
- **Lighting** — exposure scoring, histogram analysis, dynamic range hints
- **Color** — palette extraction, white balance check, harmony score

Every score is paired with a **suggested improvement shot** so you know exactly what to do differently next time.

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| UI | Tailwind CSS · shadcn/ui · Radix primitives |
| State / Data | TanStack Query · Axios |
| Auth | NextAuth v5 |
| Forms | React Hook Form + Zod |
| Testing | Vitest + Testing Library |
| Backend | FastAPI + MediaPipe + OpenCV ([unified-backend](https://github.com/dhruv-doshi/unified-backend)) |

## Getting started

```bash
# Install
npm install

# Configure env
cp .env.example .env.local   # fill in API base URL, NextAuth secrets

# Dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Required env vars

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_API_BASE_URL` | URL of the unified-backend FastAPI service |
| `NEXTAUTH_SECRET` | NextAuth session signing |
| `NEXTAUTH_URL` | Public origin |

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm test` | Vitest unit tests |

## Project structure

```
src/
├── app/             # App Router pages and route handlers
├── components/      # UI components (composition overlays, score cards, histogram)
├── lib/             # API client, auth config, utility functions
├── hooks/           # Custom React hooks (useImageAnalysis, etc.)
└── types/           # Shared TypeScript types
```

## Deploy

Deployed on Vercel — connect the GitHub repo and add the env vars above. The `unified-backend` service must be reachable from the Vercel runtime.

## License

MIT — free to use, fork, and learn from.
