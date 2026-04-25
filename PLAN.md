# Plan: Expand from WaxingStudios → Multi-Beauty SaaS CRM

## Current State
- Single-tenant Next.js 15 app (WaxingStudios-focused)
- Mock auth + localStorage persistence
- Website builder with 4-tab editor
- Client/gift-card/settings modules
- Stripe Connect (mock) + checkout
- Multi-tenant architecture via subdomain (studio/[domain])

## Goal
Transform into **"GlamourOS"** (placeholder name) — a vertical SaaS CRM for ALL beauty & body service businesses:
- Waxing Studios
- Nail Salons / Nail Bars
- Barber Shops
- Hair Salons
- Massage & Spa Centers
- Skin Care / Facial Clinics
- Brow & Lash Studios
- Tanning Salons
- Tattoo & Piercing Studios
- Wellness Centers

---

## Phase 1: Foundation Rename & Re-brand (1-2 days)

### 1.1 Rename Project
- `README.md` → generic description
- `package.json` name field
- `layout.tsx` metadata.title
- Any hardcoded "WaxingStudios" or "waxing" strings → configurable or removed
- Keep ALL existing functionality intact

### 1.2 Business Type System
Add a `businessType` field to studio/tenant config:
```
BusinessType = {
  id: string;           // "waxing" | "nails" | "barber" | "hair" | "massage" | "spa" | "skincare" | "browlash" | "tanning" | "tattoo" | "wellness"
  name: string;         // "Waxing Studio"
  icon: string;         // Lucide icon name
  defaultServices: Service[];
  defaultTheme: Theme;
  allowedFeatures: Feature[]; // e.g. barbers may want "walk-in queue"
}
```

During onboarding (studio setup), ask:
1. What type of business do you have? (dropdown with icons)
2. Business name
3. Domain

### 1.3 Generic Service Categories
Replace waxing-only service categories with beauty-universal categories:
- **Body**: Waxing, Sugaring, Threading, Body Wraps, Scrubs
- **Nails**: Manicure, Pedicure, Gel, Acrylic, Nail Art, Removal
- **Hair**: Cut, Color, Styling, Treatment, Extensions
- **Face**: Facial, Peel, Microdermabrasion, Lash Extensions, Brows, Makeup
- **Massage**: Swedish, Deep Tissue, Hot Stone, Sports, Aromatherapy
- **Tattoo/Piercing**: Tattoo, Piercing, Touch-up, Consultation
- **Tanning**: Spray Tan, UV Bed, Bronzing
- **Wellness**: Sauna, Steam Room, Hydrotherapy, Float
- **Packages**: Bundles (e.g. "Spa Day")
- **Memberships**: Monthly plans

---

## Phase 2: Website Builder Upgrades (2-3 days)

### 2.1 Section Templates per Business Type
Each business type gets pre-built home-page sections:
- **Nail Bar**: "Our Designs" gallery section, "Nail Art Catalog"
- **Barber Shop**: "The Team" with barber chair photos, "Walk-In Status"
- **Massage**: "Therapies" with duration/pressure levels, "Wellness Packages"
- **Hair Salon**: "Portfolio" before/after gallery, "Color Specialists"

Implementation: Section definitions stored per `businessType` in config. Website builder loads the relevant set.

### 2.2 Theme Presets per Niche
Add 6-8 new theme presets beyond "Rose Gold":
- **Midnight Barber** (dark, matte, masculine)
- **Zen Spa** (sage green, soft neutrals)
- **Nude & Neon** (nail art vibe, Instagram-ready)
- **Golden Hour** (tanning/wellness, warm amber)
- **Minimal Ink** (tattoo, black & white, bold typography)
- **Botanical** (organic skincare, earthy tones)

### 2.3 Section Editor Enhancements
- Drag-and-drop section reordering
- Add/duplicate/delete sections
- Image uploads for galleries/portfolios
- Staff/team member cards (with role: esthetician, barber, nail tech, massage therapist)

---

## Phase 3: Booking & CRM Core (3-4 days)

### 3.1 Universal Booking Flow
- Service selection filtered by category
- Provider (staff) selection with specialty tags
- Duration & pricing per service
- Add-ons (e.g. "extra massage oil", "nail art accent")
- Room/bed/chair allocation (for massage/spa)

### 3.2 Staff/Roles System
```
StaffRole = {
  id: string;
  name: string;         // "Nail Technician", "Barber", "Massage Therapist"
  services: string[];   // which service categories they perform
  color: string;        // calendar color
  commissionRate?: number;
}
```

### 3.3 Client Management Upgrades
- **Service History**: Track past services, allergies, preferences
- **Photo Logs**: Before/after gallery per client (consent checkbox)
- **Notes**: Client-specific notes (e.g. "prefers hard wax", "gluten allergy")
- **SMS/Email Templates**: Generic beauty templates, not waxing-specific
- **Birthday Automation**: Automated birthday discounts
- **Loyalty Points**: "Book 5 facials, get 1 free"

### 3.4 Inventory (for product-selling businesses)
- Nail polish, hair products, massage oils, skincare
- Low-stock alerts
- Supplier/vendor tracking

---

## Phase 4: Marketing & Growth (2-3 days)

### 4.1 SMS/Email Campaigns
- Campaign builder with templates per business type
- Segments: "Clients who haven't booked in 30 days", "VIP members"
- Automated flows: Welcome, rebooking reminder, review request

### 4.2 Reviews & Reputation
- Post-appointment review request via SMS
- Google Review link generator
- Display testimonials on website

### 4.3 Referral Program
- "Give $20, Get $20" referral codes
- Trackable referral links

---

## Phase 5: Admin & Dashboard (2 days)

### 5.1 Super Admin Panel
- All tenants overview
- Business type analytics (which niches are growing)
- Feature flags per plan (Free, Growth, Pro)
- Custom domain management

### 5.2 Analytics per Studio
- Revenue by service category
- Staff utilization rates
- Peak booking hours
- New vs. returning client ratio
- Cancellation/no-show rates

---

## Phase 6: Future Extensibility (Post-MVP)

| Feature | Value |
|---------|-------|
| Shopify-style POS for walk-ins | Barber shops need walk-in tracking |
| Class scheduling | Yoga/fitness hybrid studios |
| Waitlist management | High-demand nail techs |
| Multi-location support | Salon chains |
| Supplier marketplace | Sell professional products to studios |
| AI booking assistant | WhatsApp/SMS bot for appointments |
| Employee payroll | Commission + hourly tracking |

---

## Data Migration Plan

Current localStorage keys:
- `mock_studio_${studioId}` → Add `businessType` field, keep all other data
- No breaking changes needed — just additive fields

---

## Recommended Order of Implementation

1. **Phase 1.1 + 1.2** — Rename + Business Type selector (most visible)
2. **Phase 2.1 + 2.2** — Theme presets + section templates per type (biggest wow factor)
3. **Phase 3.2** — Staff roles (enables booking for all niches)
4. **Phase 3.1 + 3.3** — Universal booking + client notes
5. **Phase 2.3** — Website builder enhancements
6. **Phase 4 + 5** — Marketing + Admin
7. **Phase 6** — Future roadmap

---

## What Stays Exactly the Same

- Mock auth + Firebase-ready architecture
- Stripe Connect integration pattern
- localStorage persistence pattern
- Multi-tenant subdomain routing (`studio/[domain]`)
- Gift cards module (universal)
- Settings page structure
- shadcn/ui components
- ThemeProvider CSS variable system
- All existing API routes (just adding more mock data)

---

## New Files to Create

| File | Purpose |
|------|---------|
| `src/lib/business-types.ts` | Business type definitions, default configs |
| `src/lib/service-categories.ts` | Universal service category tree |
| `src/lib/themes/presets.ts` | New theme presets per niche |
| `src/lib/section-templates.ts` | Pre-built section configs per business type |
| `src/app/admin/staff/page.tsx` | Staff management with roles |
| `src/app/admin/inventory/page.tsx` | Product inventory (Phase 3.4) |

---

## Estimated Timeline

- **Phase 1**: 1-2 days
- **Phase 2**: 2-3 days
- **Phase 3**: 3-4 days
- **Phase 4-5**: 3-4 days
- **Total MVP**: ~10-13 days of focused work

---

## Questions for You

1. **Brand name**: ¿Te gusta "GlamourOS" o prefieres otro? (e.g., "BeautySuite", "SalonOS", "GlamCRM")
2. **Business types**: ¿Algún tipo de negocio de belleza que falte en la lista?
3. **Onboarding**: ¿Quieres que el tipo de negocio se elija durante el signup o se pueda cambiar después?
4. **Staff**: ¿Necesitamos que cada staff tenga su propio "mini-sitio" o perfil público? (e.g. "Reserva con María — Nail Artist")
5. **POS**: ¿Quieres incluir walk-in/point-of-sale desde ahora o eso es para después?

---

## Approval Needed

¿Aprobas este plan? ¿Empezamos con la Phase 1 (rename + business types)? ¿O querés ajustar algo primero?
