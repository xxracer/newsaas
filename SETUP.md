# WaxingSetudios - Guía de Configuración

## 🎯 Visión del Proyecto

WaxingSetudios es una plataforma SaaS multi-tenant para estudios de waxing de lujo que permite:

- **5 Diseños Luxury** seleccionables (Rose Gold, Midnight Luxe, Blanc Pur, Velvet Berry, Nude Minimal)
- **Dominios personalizados** para cada estudio
- **Firebase Authentication** tipo Google
- **Stripe Connect** para pagos multi-tenant
- **Gestión completa** de citas, servicios y gift cards

---

## 📋 Paso 1: Configurar Firebase

### 1.1 Crear Proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en "Add Project" o selecciona tu proyecto existente
3. Si es un proyecto nuevo:
   - Nombre: `waxingsetudios` (o el nombre de tu proyecto compartido)
   - Habilita Google Analytics (opcional)
   - Crea el proyecto

### 1.2 Registrar Aplicación Web

1. En Firebase Console, haz clic en el ícono de **Web** (`</>`)
2. Registra tu app con el nombre: `WaxingSetudios Web`
3. Copia las credenciales de Firebase (las necesitarás para el `.env.local`)

### 1.3 Habilitar Firestore Database

1. En el menú lateral, ve a **Build** → **Firestore Database**
2. Haz clic en **Create Database**
3. Selecciona **Start in Test Mode** (luego configurarás las reglas de seguridad)
4. Elige una ubicación (ej: `us-central`)

### 1.4 Habilitar Authentication

1. Ve a **Build** → **Authentication**
2. Haz clic en **Get Started**
3. Habilita los siguientes proveedores:
   - **Email/Password**: Enable
   - **Google**: Enable (necesitarás configurar OAuth)

### 1.5 Configurar Google OAuth (Opcional pero recomendado)

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Selecciona tu proyecto de Firebase
3. Ve a **APIs & Services** → **Credentials**
4. Crea nuevas credenciales → **OAuth 2.0 Client ID**
5. Configura el **Authorized redirect URI**:
   ```
   https://your-firebase-project-id.firebaseapp.com/__/auth/handler
   ```
6. Copia el **Client ID** y **Client Secret**

### 1.6 Obtener Credenciales de Firebase

En Firebase Console → Project Settings → General → Your apps → SDK Setup and Instructions

Copia estos valores:

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu-proyecto-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

---

## 📋 Paso 2: Configurar Variables de Entorno

### 2.1 Crear archivo `.env.local`

Copia el archivo `.env.local.example` a `.env.local`:

```bash
cp .env.local.example .env.local
```

### 2.2 Llenar las variables de Firebase

```env
# FIREBASE
NEXT_PUBLIC_FIREBASE_API_KEY=tu-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123

# STRIPE (para Stripe Connect)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# APP
NEXT_PUBLIC_SITE_URL=http://localhost:9002
```

---

## 📋 Paso 3: Configurar Stripe (Para Pagos)

### 3.1 Crear Cuenta de Stripe

1. Ve a [Stripe Dashboard](https://dashboard.stripe.com/)
2. Crea una cuenta (modo test para desarrollo)

### 3.2 Obtener Keys de Stripe

En Stripe Dashboard → Developers → API Keys:

```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### 3.3 Configurar Webhook

1. Ve a **Developers** → **Webhooks** → **Add Endpoint**
2. URL: `https://yourdomain.com/api/stripe/webhook`
3. Eventos a escuchar:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `charge.succeeded`
   - `account.updated`
4. Copia el **Signing Secret** (`whsec_...`)

---

## 📋 Paso 4: Instalar Dependencias

```bash
npm install
```

---

## 📋 Paso 5: Ejecutar en Desarrollo

```bash
npm run dev
```

La app estará disponible en `http://localhost:9002`

---

## 📋 Paso 6: Reglas de Seguridad de Firestore

En Firebase Console → Firestore Database → Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // waxingsetudios collection
    match /waxingsetudios/{document=**} {
      // Allow authenticated users to read/write their own studio data
      allow read, write: if request.auth != null;
      
      // Studio-specific rules
      match /studios/{studioId} {
        allow read: if true; // Public read for studio lookup
        allow write: if request.auth != null && 
                      get(/databases/$(database)/documents/waxingsetudios/users/$(request.auth.uid)).data.studioId == studioId;
      }
      
      // User-specific rules
      match /users/{userId} {
        allow read: if request.auth != null && request.auth.uid == userId;
        allow write: if request.auth != null && request.auth.uid == userId;
      }
      
      // Appointments - only studio admins can read/write
      match /appointments/{appointmentId} {
        allow read, write: if request.auth != null;
      }
      
      // Services - public read, admin write
      match /services/{serviceId} {
        allow read: if true;
        allow write: if request.auth != null;
      }
    }
  }
}
```

---

## 🏗️ Estructura de la Base de Datos

```
waxingsetudios/
├── studios/
│   └── {studioId}/
│       ├── businessName: string
│       ├── domain: string (ej: "mistudio.com")
│       ├── theme: { id, name, description }
│       ├── colors: { primary, secondary, accent, ... }
│       ├── stripeAccountId: string
│       ├── stripeConnected: boolean
│       ├── email, phone, address, city, state, zip, country
│       ├── instagram, facebook, tiktok
│       ├── bookingBufferMinutes: number
│       ├── maxAdvanceDays: number
│       ├── timezone: string
│       ├── currency: string
│       ├── isActive: boolean
│       ├── isPublished: boolean
│       ├── createdAt: Timestamp
│       └── updatedAt: Timestamp
│
├── users/
│   └── {userId}/
│       ├── email: string
│       ├── displayName: string
│       ├── firstName: string
│       ├── lastName: string
│       ├── phone: string
│       ├── role: "CLIENT" | "STAFF" | "ADMIN" | "SUPER_ADMIN"
│       ├── studioId: string (referencia al studio del usuario)
│       ├── photoURL: string
│       └── createdAt: string
│
├── appointments/
│   └── {appointmentId}/
│       ├── studioId: string
│       ├── clientId: string
│       ├── clientName: string
│       ├── clientEmail: string
│       ├── clientPhone: string
│       ├── dateTime: Timestamp
│       ├── endDateTime: Timestamp
│       ├── services: Array<{ id, name, price, duration }>
│       ├── total: number
│       ├── status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED"
│       ├── paymentStatus: "UNPAID" | "PAID" | "REFUNDED"
│       ├── stripePaymentId: string
│       ├── notes: string
│       └── createdAt: Timestamp
│
├── services/
│   └── {serviceId}/
│       ├── studioId: string
│       ├── categoryId: string
│       ├── name: string
│       ├── description: string
│       ├── price: number
│       ├── duration: number (minutos)
│       ├── imageUrl: string
│       ├── isActive: boolean
│       └── sortOrder: number
│
├── categories/
│   └── {categoryId}/
│       ├── studioId: string
│       ├── name: string
│       ├── description: string
│       ├── imageUrl: string
│       └── sortOrder: number
│
├── payments/
│   └── {paymentId}/
│       ├── studioId: string
│       ├── appointmentId: string (opcional)
│       ├── amount: number
│       ├── currency: string
│       ├── stripePaymentId: string
│       ├── status: "SUCCEEDED" | "FAILED" | "REFUNDED"
│       └── createdAt: Timestamp
│
└── giftcards/
    └── {giftCardId}/
        ├── studioId: string
        ├── code: string
        ├── amount: number
        ├── balance: number
        ├── purchaserName: string
        ├── purchaserEmail: string
        ├── recipientName: string
        ├── recipientEmail: string
        ├── message: string
        ├── isActive: boolean
        └── createdAt: Timestamp
```

---

## 🎨 Los 5 Diseños Luxury

### 1. Rose Gold Elegance
- **Colores**: Dorado rosado, rosa suave, acentos dorados
- **Vibe**: Femenino, elegante, sofisticado

### 2. Midnight Luxe
- **Colores**: Negro mate, gris carbón, oro
- **Vibe**: Ultra-lujoso, minimalista, moderno

### 3. Blanc Pur
- **Colores**: Blanco hueso, champagne, dorado muted
- **Vibe**: Spa-like, relajante, puro

### 4. Velvet Berry
- **Colores**: Borgoña profundo, cobre, rosa oscuro
- **Vibe**: Sensual, elegante, cálido

### 5. Nude Minimalist
- **Colores**: Tonos nude, taupe, blanco suave
- **Vibe**: Limpio, moderno, minimalista

---

## 🚀 Próximos Pasos

1. **Configurar Firebase** siguiendo los pasos anteriores
2. **Llenar el `.env.local`** con tus credenciales
3. **Ejecutar `npm install`** y `npm run dev`
4. **Crear tu primer estudio** yendo a `/auth/signup`
5. **Conectar Stripe** en el dashboard de administración

---

## 🔧 Comandos Útiles

```bash
# Desarrollo
npm run dev

# Build de producción
npm run build

# Iniciar en producción
npm start

# Verificar tipos
npm run typecheck

# Generar Prisma (si usas Prisma legacy)
npm run db:generate
```

---

## 📞 Soporte

Para dudas o problemas:
- Revisa la consola del navegador para errores
- Verifica que Firebase esté correctamente configurado
- Asegúrate de que las variables de entorno estén correctas
