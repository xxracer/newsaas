import { initializeApp, getApps, getApp } from 'firebase/app';
import { ALL_NICHE_THEMES } from './themes';
import { getFirestore, collection, doc, setDoc, getDoc, getDocs, query, where, Timestamp } from 'firebase/firestore';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';

export {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider
};
export type { User };

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase only if credentials are provided
const isFirebaseConfigured = !!(
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== ''
);

let app: any = null;
let db: any = null;
let auth: any = null;
let googleProvider: any = null;

if (isFirebaseConfigured) {
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();
}

// Initialize services (will be null if not configured)
export { db, auth, googleProvider };

// ============================================
// FIREBASE COLLECTION PATHS
// All data lives under 'waxingsetudios' to share Firebase with other projects
// ============================================

export const COLLECTIONS = {
  STUDIOS: 'waxingsetudios/studios',
  USERS: 'waxingsetudios/users',
  APPOINTMENTS: 'waxingsetudios/appointments',
  SERVICES: 'waxingsetudios/services',
  CATEGORIES: 'waxingsetudios/categories',
  STAFF: 'waxingsetudios/staff',
  PAYMENTS: 'waxingsetudios/payments',
  GIFT_CARDS: 'waxingsetudios/giftcards',
  REVIEWS: 'waxingsetudios/reviews',
  ANALYTICS: 'waxingsetudios/analytics',
} as const;

// ============================================
// STUDIO TYPES
// ============================================

export interface Studio {
  id: string;
  domain: string; // Custom domain (e.g., mibeautybar.com)
  businessName: string;
  tagline?: string;
  logoUrl?: string;
  theme: LuxuryTheme;
  colors: ThemeColors;
  stripeAccountId?: string; // Stripe Connect account
  stripeConnected: boolean;

  // Contact
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  phone?: string;
  email?: string;

  // Social
  instagram?: string;
  facebook?: string;
  tiktok?: string;

  // Settings
  bookingBufferMinutes: number;
  maxAdvanceDays: number;
  timezone: string;
  currency: string;

  // Status
  isActive: boolean;
  isPublished: boolean;

  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// ============================================
// THEMES — imported from themes.ts (50 niche themes)
// ============================================

export type LuxuryThemeId = string;

export interface LuxuryTheme {
  id: LuxuryThemeId;
  name: string;
  description: string;
  previewImage: string;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textMuted: string;
  border: string;
  primaryForeground?: string;
}

export const LUXURY_THEMES: LuxuryTheme[] = ALL_NICHE_THEMES.map((t) => ({
  id: t.id,
  name: t.name,
  description: t.description,
  previewImage: t.previewImage,
}));

export const THEME_COLORS: Record<LuxuryThemeId, ThemeColors> = Object.fromEntries(
  ALL_NICHE_THEMES.map((t) => [t.id, t.colors])
);

// ============================================
// STUDIO CRUD OPERATIONS
// ============================================

/**
 * Create a new studio
 */
export async function createStudio(studioData: Omit<Studio, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  const studioRef = doc(collection(db, COLLECTIONS.STUDIOS));
  const studio: Omit<Studio, 'id'> = {
    ...studioData,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  };

  await setDoc(studioRef, studio);
  return studioRef.id;
}

/**
 * Get studio by domain (custom domain lookup)
 */
export async function getStudioByDomain(domain: string): Promise<Studio | null> {
  const normalizedDomain = domain.toLowerCase().replace('www.', '');
  const q = query(
    collection(db, COLLECTIONS.STUDIOS),
    where('domain', '==', normalizedDomain),
    where('isActive', '==', true),
    where('isPublished', '==', true)
  );

  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;

  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() } as Studio;
}

/**
 * Get studio by ID
 */
export async function getStudioById(id: string): Promise<Studio | null> {
  const docRef = doc(db, COLLECTIONS.STUDIOS, id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return null;
  return { id: docSnap.id, ...docSnap.data() } as Studio;
}

/**
 * Update studio
 */
export async function updateStudio(id: string, data: Partial<Studio>): Promise<void> {
  const docRef = doc(db, COLLECTIONS.STUDIOS, id);
  await setDoc(docRef, { ...data, updatedAt: Timestamp.now() }, { merge: true });
}

// ============================================
// AUTH HELPERS
// ============================================

export async function signInWithGoogle() {
  return signInWithPopup(auth, googleProvider);
}

export async function signInWithEmail(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function signUpWithEmail(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export async function logOut() {
  return signOut(auth);
}

// ============================================
// UTILITY: Get current studio from hostname
// ============================================

export function getStudioDomainFromHost(host: string): string {
  // Remove www. and convert to lowercase
  return host.toLowerCase().replace('www.', '');
}
