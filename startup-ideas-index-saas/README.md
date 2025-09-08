# Startup Ideas Index — Cloud Starter

**What it has now**
- Next.js 14 + TypeScript + Tailwind
- Prisma + Postgres (Neon)
- Clerk auth (Sign in)
- Admin console to add demo ideas
- Server-side PDF endpoint (reliable download)

**Environment variables (Vercel → Settings → Environment Variables)**
- `DATABASE_URL` — Neon connection string  
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` — from Clerk  
- `CLERK_SECRET_KEY` — from Clerk  
- `ADMIN_EMAILS` — your email (CSV if multiple)

**Build Command (in Vercel)**
