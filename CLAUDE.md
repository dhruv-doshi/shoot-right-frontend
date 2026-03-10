# CLAUDE.md — Shoot Right Frontend

AI-powered photography analysis frontend. Next.js 14 App Router + TypeScript + Tailwind CSS + Shadcn/UI.

## Commands

```bash
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint
npm run test         # Vitest (single run)
npm run test:watch   # Vitest watch mode
npm run test:coverage # Coverage report
npm run format       # Prettier
```

## Architecture

### Routing (App Router)
- `(public)/` — Landing page (no auth required)
- `(auth)/login|register|forgot-password|verify-email` — Auth pages
- `(protected)/dashboard` — User image gallery (auth required)
- `(protected)/analysis/[analysisId]` — Full analysis view (auth required)

### Key Files
| File | Purpose |
|------|---------|
| `src/lib/auth.ts` | NextAuth v5 config (Google + Credentials) |
| `src/lib/api-client.ts` | Axios instance with Bearer token interceptor |
| `src/lib/image-processing.ts` | Client-side EXIF extraction + histogram generation |
| `src/types/analysis.ts` | All TypeScript interfaces (FullAnalysis, etc.) |
| `src/constants/placeholders.ts` | PLACEHOLDER_ANALYSIS + PLACEHOLDER_USER_IMAGES |
| `src/store/overlayStore.ts` | Zustand: active composition overlay |
| `src/store/uiStore.ts` | Zustand: open/closed analysis cards |
| `src/store/uploadStore.ts` | Zustand: upload progress % |

### State Management
- **Server state**: TanStack Query v5 (`useAnalysis`, `useUserImages`, `useUploadImage`, `useImprovementShot`)
- **Client UI state**: Zustand (`overlayStore`, `uiStore`, `uploadStore`)
- **Forms**: React Hook Form + Zod

### Auth
NextAuth.js v5 with:
- Google OAuth provider
- Credentials provider (delegates to `POST /api/v1/auth/login`)
- JWT session strategy
- `accessToken` attached to session via JWT callback

### API
All calls through `src/lib/api-client.ts` (Axios, auto-injects Bearer token).
Placeholder data shown when backend unavailable — no real API calls needed for dev.

### Design System
- **Fonts**: DM Serif Display (headings) + DM Sans (body) + DM Mono (code/numbers)
- **Colors**: Warm ivory background (#F8F5F0), charcoal text, amber accent (#D4822A)
- **Theme**: Light/dark toggle via ThemeProvider + CSS variables
- **Components**: Shadcn/UI (Radix-based)

### Analysis Dashboard Features
- Composition overlay toggle (Rule of Thirds, Golden Ratio, Golden Spiral) — SVG over image
- Score gauge (SVG arc, animated)
- 6 expandable cards (grid-template-rows animation)
- Histogram canvas renderer (R/G/B/Luminance)
- Improvement Shot panel (AI-generated improved version)

## Environment Variables

```bash
# .env.local
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-min-32-chars
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1
```

## Testing

Vitest + React Testing Library. Tests in `src/__tests__/`:
- `auth/` — LoginForm, RegisterForm
- `landing/` — HeroSection, ImageUploadZone
- `analysis/` — OverlayControls, AnalysisCard, SummaryPanel
- `dashboard/` — ImageGallery
