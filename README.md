# WaxingSetudios 🌸

> Plataforma SaaS multi-tenant para estudios de waxing de lujo

## 🎯 Visión

WaxingSetudios es una plataforma completa que permite a estudios de waxing gestionar su negocio con una estética luxury única. Cada estudio puede elegir entre **5 diseños premium** y conectar su **propio dominio**, **Stripe para pagos**, y gestionar **citas y servicios**.

## ✨ Características Principales

### Para Dueños de Estudios
- 🔐 **Login tipo Google** con Firebase Authentication
- 🎨 **5 Diseños Luxury** seleccionables:
  - **Rose Gold Elegance** - Dorado rosado, mármol, tipografía serif
  - **Midnight Luxe** - Negro mate + oro, minimalista
  - **Blanc Pur** - Blanco hueso + champagne, spa-like
  - **Velvet Berry** - Borgoña profundo + cobre
  - **Nude Minimalist** - Tonos nude, líneas limpias
- 🌐 **Dominio personalizado** (tudominio.com)
- 💳 **Stripe Connect** integrado para recibir pagos
- 📅 Gestión de citas y calendario
- 💝 Gift cards digitales
- 📊 Dashboard con métricas clave

### Para Clientes Finales
- Booking online 24/7
- Recordatorios automáticos
- Compra de gift cards
- Historial de citas

## 🏗️ Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                    WaxingSetudios Platform                   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Studio A    │  │  Studio B    │  │  Studio C    │      │
│  │  rose-gold   │  │  midnight    │  │  nude        │      │
│  │  studioA.com │  │  studioB.com │  │  studioC.com │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Firebase (waxingsetudios)                │   │
│  │  ├── studios/                                         │   │
│  │  ├── users/                                           │   │
│  │  ├── appointments/                                    │   │
│  │  ├── services/                                        │   │
│  │  └── payments/                                        │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Stripe Connect                           │   │
│  │  Studio A → stripe_acct_A                             │   │
│  │  Studio B → stripe_acct_B                             │   │
│  │  Studio C → stripe_acct_C                             │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js 18+
- Firebase account
- Stripe account (para pagos)

### Instalación

1. **Clonar el repositorio**
```bash
git clone <repo-url>
cd waxingsetudios
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**

Copia `.env.local.example` a `.env.local`:
```bash
cp .env.local.example .env.local
```

Llena con tus credenciales de Firebase (ver `SETUP.md` para detalles):
```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# App
NEXT_PUBLIC_SITE_URL=http://localhost:9002
```

4. **Ejecutar en desarrollo**
```bash
npm run dev
```

Visita `http://localhost:9002`

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── (main)/              # Páginas públicas del estudio
│   ├── admin/               # Dashboard de administración
│   ├── api/                 # API routes
│   │   ├── auth/            # Autenticación
│   │   ├── studio/          # Lookup de estudios
│   │   ├── studios/         # CRUD de estudios
│   │   └── stripe/          # Stripe Connect & pagos
│   ├── auth/                # Login/Signup
│   ├── studio/              # Setup del estudio
│   └── book/                # Booking flow
├── components/
│   ├── admin/               # Componentes del dashboard
│   ├── booking/             # Componentes de booking
│   ├── layout/              # Layout components
│   ├── providers/           # Firebase Auth, Theme
│   └── ui/                  # Shadcn UI components
├── lib/
│   ├── firebase.ts          # Firebase config & helpers
│   └── utils.ts             # Utility functions
└── types/
    └── index.ts             # TypeScript types
```

## 🎨 Los 5 Temas Luxury

| Tema | Colores | Vibe |
|------|---------|------|
| **Rose Gold** | `#B76E79`, `#E8C4C4`, `#D4AF37` | Femenino, elegante |
| **Midnight Luxe** | `#1A1A1A`, `#2D2D2D`, `#D4AF37` | Ultra-lujoso, minimalista |
| **Blanc Pur** | `#F5F0EB`, `#E8DDD5`, `#C9B037` | Spa-like, relajante |
| **Velvet Berry** | `#4A0E1E`, `#7B1E3A`, `#B87333` | Sensual, elegante |
| **Nude Minimal** | `#D4B5A0`, `#E8D5C4`, `#A68B7C` | Limpio, moderno |

## 💳 Stripe Connect Flow

1. Dueño de estudio se registra
2. Va a Settings → Billing
3. Click en "Conectar Stripe"
4. Completa onboarding en Stripe
5. Puede recibir pagos inmediatamente

Los pagos van directamente a la cuenta del estudio, menos una comisión de plataforma (configurable).

## 🔥 Firebase Structure

Todos los datos viven bajo `waxingsetudios/` para compartir Firebase con otros proyectos:

```
waxingsetudios/
├── studios/{studioId}
│   ├── businessName
│   ├── domain (custom domain)
│   ├── theme (selected luxury theme)
│   ├── colors (theme colors)
│   ├── stripeAccountId
│   └── ...
├── users/{userId}
│   ├── email
│   ├── studioId (reference)
│   ├── role (CLIENT | ADMIN | SUPER_ADMIN)
│   └── ...
├── appointments/{appointmentId}
│   ├── studioId
│   ├── clientId
│   ├── dateTime
│   ├── services
│   └── status
└── ...
```

## 📋 Comandos Disponibles

```bash
npm run dev         # Desarrollo (http://localhost:9002)
npm run build       # Build de producción
npm start           # Start production server
npm run typecheck   # TypeScript type checking
npm run lint        # ESLint
```

## 📖 Documentación Adicional

- [`SETUP.md`](./SETUP.md) - Guía completa de configuración de Firebase y Stripe
- [Firebase Console](https://console.firebase.google.com/)
- [Stripe Dashboard](https://dashboard.stripe.com/)

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Lenguaje**: TypeScript
- **Auth/DB**: Firebase (Auth + Firestore)
- **Pagos**: Stripe Connect
- **UI**: Shadcn/ui + Tailwind CSS
- **Iconos**: Lucide React

## 📄 License

MIT

---

**WaxingSetudios** - La plataforma premium para estudios de waxing exclusivos 🌸
