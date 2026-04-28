# BeautySaaS

> Multi-tenant booking SaaS for beauty, wellness, and grooming studios

## Overview

BeautySaaS is a complete platform that lets independent studios (waxing, barber, nails, hair, tattoo, massage, skincare, brow & lash, tanning) manage their business, website, and online bookings. Each studio gets its own customizable website with a Wix-style section editor, a multi-step booking flow, and an admin dashboard.

## Features

### For Studio Owners
- **Instant setup** — choose a business type, get pre-loaded demo services and pages
- **Wix-style website editor** — add, reorder, and edit sections per page (hero, services grid, testimonials, team, gallery, gift cards, CTA, contact)
- **Multi-step booking flow** — clients select services, pick a date/time, enter their info, and confirm
- **Service management** — create categories and services with pricing, duration, and images
- **4 booking styles** — Modern Minimal, Classic Dark, Clean White, Luxury Gold
- **Account deletion** — full data removal available in Settings
- **Demo mode** — works without any database or backend services using localStorage

### For Clients
- Browse services by category
- Select multiple services with real-time total
- Pick date and time from an interactive calendar
- Enter contact info and receive instant confirmation
- View a professional, themed studio website

## Supported Business Types

| Type | Demo Services |
|------|--------------|
| Waxing | Body zones, face waxing, packages |
| Barber | Cuts, shaves, beard grooming |
| Nails | Manicure, pedicure, acrylics, art |
| Hair | Cuts, color, styling, treatments |
| Tattoo | Small, medium, large, cover-ups |
| Massage | Swedish, deep tissue, hot stone |
| Skincare | Facials, peels, microneedling |
| Brow & Lash | Microblading, lifts, extensions |
| Tanning | Spray tan, UV beds, packages |

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: Prisma + SQLite (optional — demo mode works without it)
- **Auth**: NextAuth.js (credentials + Google OAuth)
- **UI**: Tailwind CSS + shadcn/ui
- **Icons**: Lucide React
- **Payments**: Stripe (optional)
- **Email**: Resend (optional)
- **SMS**: Twilio (optional)

## Project Structure

```
src/
├── app/
│   ├── admin/               # Admin dashboard
│   │   ├── dashboard/
│   │   ├── services/
│   │   ├── website/           # Wix-style section editor
│   │   └── settings/
│   ├── api/                 # API routes
│   ├── studio/[domain]/[page]/  # Public studio pages
│   ├── book/                # Booking flow
│   └── auth/                # Login / signup
├── components/
│   ├── admin/               # Admin UI components
│   ├── booking/             # Booking flow steps
│   └── ui/                  # shadcn/ui components
├── lib/
│   ├── demo-data.ts         # Demo services & categories for all 9 types
│   └── utils.ts
└── prisma/
    ├── schema.prisma
    └── seed.ts
```

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Run in demo mode (no database needed)

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002)

### Run with database

```bash
# 1. Copy environment file
cp .env.example .env.local

# 2. Edit .env.local and uncomment DATABASE_URL
# DATABASE_URL="file:./dev.db"

# 3. Push schema and seed
npm run db:push
npm run db:seed

# 4. Start dev server
npm run dev
```

## Environment Variables

Copy `.env.example` to `.env.local`. **All variables are optional for demo mode.**

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | No | Prisma database URL (SQLite example included) |
| `NEXTAUTH_SECRET` | No | JWT secret for NextAuth |
| `NEXTAUTH_URL` | No | App URL (default: http://localhost:9002) |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | No | Google OAuth |
| `STRIPE_SECRET_KEY` / `STRIPE_PUBLISHABLE_KEY` | No | Stripe payments |
| `RESEND_API_KEY` | No | Transactional email |
| `TWILIO_ACCOUNT_SID` / `TWILIO_AUTH_TOKEN` / `TWILIO_PHONE_NUMBER` | No | SMS notifications |

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (Turbopack, port 9002) |
| `npm run build` | Production build (runs `prisma generate` first) |
| `npm run start` | Start production server |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript type checking |
| `npm run db:push` | Push Prisma schema to database |
| `npm run db:seed` | Seed database with demo data |
| `npm run db:studio` | Open Prisma Studio |

## Deployment (Vercel)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "ready for vercel deploy"
   git push origin main
   ```

2. **Import on Vercel**
   - Go to [vercel.com](https://vercel.com) → Add New Project
   - Import your GitHub repository

3. **Configure build settings**
   - Framework preset: Next.js
   - Build command: `prisma generate && next build`
   - Output directory: default

4. **Environment variables**
   - For **demo mode**: add none, or just `NEXTAUTH_SECRET` with any random string
   - For **full mode**: copy variables from `.env.example`

5. **Deploy**
   - Click Deploy
   - Your app will be live on `https://your-project.vercel.app`

## License

MIT

---

**BeautySaaS** — Booking and website platform for modern studios.
