/**
 * MOCK Firebase utilities for demo purposes
 * Use this instead of firebase.ts when testing without Firebase configured
 */

import { ALL_NICHE_THEMES } from './themes';

export const LUXURY_THEMES = ALL_NICHE_THEMES.map((t) => ({
  id: t.id as typeof t.id,
  name: t.name,
  description: t.description,
  previewImage: t.previewImage,
}));

export const THEME_COLORS = Object.fromEntries(
  ALL_NICHE_THEMES.map((t) => [t.id, t.colors])
);

// Appointment/Booking styles
export const APPOINTMENT_STYLES = {
  modern: {
    id: 'modern',
    name: 'Moderno Minimalista',
    description: 'Diseño limpio con calendario prominente y pasos claros',
    preview: 'minimal-calendar',
  },
  luxury: {
    id: 'luxury',
    name: 'Lujo Elegante',
    description: 'Diseño premium con gradientes y elementos dorados',
    preview: 'gold-gradient',
  },
  playful: {
    id: 'playful',
    name: 'Juvenil y Divertido',
    description: 'Colores vibrantes y elementos ilustrados',
    preview: 'colorful-illustration',
  },
  professional: {
    id: 'professional',
    name: 'Profesional Corporativo',
    description: 'Diseño serio con estructura clara y formal',
    preview: 'corporate-clean',
  },
};

// Home Page sections that can be toggled
export const HOME_PAGE_SECTIONS = {
  hero: {
    id: 'hero',
    name: 'Hero Banner',
    description: 'Imagen principal con título y botones de acción',
    defaultEnabled: true,
  },
  servicesGrid: {
    id: 'servicesGrid',
    name: 'Grid de Servicios',
    description: 'Muestra tus servicios en formato de tarjetas',
    defaultEnabled: true,
  },
  aboutPreview: {
    id: 'aboutPreview',
    name: 'Vista Previa Sobre Nosotros',
    description: 'Breve descripción de tu estudio',
    defaultEnabled: true,
  },
  testimonials: {
    id: 'testimonials',
    name: 'Testimonios',
    description: 'Reseñas de clientas satisfechas',
    defaultEnabled: true,
  },
  teamPreview: {
    id: 'teamPreview',
    name: 'Vista Previa del Equipo',
    description: 'Muestra a tus esteticistas',
    defaultEnabled: false,
  },
  gallery: {
    id: 'gallery',
    name: 'Galería de Fotos',
    description: 'Muestra fotos de tu estudio y trabajos',
    defaultEnabled: false,
  },
  promotions: {
    id: 'promotions',
    name: 'Promociones',
    description: 'Destaca ofertas y descuentos especiales',
    defaultEnabled: false,
  },
  giftCards: {
    id: 'giftCards',
    name: 'Gift Cards',
    description: 'Sección promocional de tarjetas de regalo',
    defaultEnabled: false,
  },
  instagramFeed: {
    id: 'instagramFeed',
    name: 'Feed de Instagram',
    description: 'Muestra tus últimas publicaciones de Instagram',
    defaultEnabled: false,
  },
  ctaBanner: {
    id: 'ctaBanner',
    name: 'Banner de Llamada a la Acción',
    description: 'Banner final con botón de reserva',
    defaultEnabled: true,
  },
  contactInfo: {
    id: 'contactInfo',
    name: 'Información de Contacto',
    description: 'Dirección, teléfono y horarios',
    defaultEnabled: true,
  },
};

export const PAGE_TEMPLATES = {
  home: {
    id: 'home',
    name: 'Home Page',
    icon: 'Home',
    sections: Object.values(HOME_PAGE_SECTIONS).map(s => s.id),
  },
  services: {
    id: 'services',
    name: 'Services',
    icon: 'Scissors',
    sections: ['services-list', 'pricing', 'duration-info', 'faq'],
  },
  appointments: {
    id: 'appointments',
    name: 'Appointments',
    icon: 'Calendar',
    sections: ['booking-widget', 'availability', 'policies', 'prep-tips'],
    styles: APPOINTMENT_STYLES,
  },
  'gift-cards': {
    id: 'gift-cards',
    name: 'Gift Cards',
    icon: 'Gift',
    sections: ['gift-card-hero', 'packages', 'how-it-works', 'faq'],
  },
  products: {
    id: 'products',
    name: 'Products',
    icon: 'ShoppingBag',
    sections: ['products-grid', 'categories', 'bestsellers', 'reviews'],
  },
  about: {
    id: 'about',
    name: 'About Us',
    icon: 'Users',
    sections: ['story', 'team', 'values', 'gallery'],
  },
  contact: {
    id: 'contact',
    name: 'Contact',
    icon: 'MapPin',
    sections: ['contact-form', 'location', 'hours', 'social-links'],
  },
  faq: {
    id: 'faq',
    name: 'FAQ',
    icon: 'HelpCircle',
    sections: ['common-questions', 'prep-guides', 'aftercare', 'policies'],
  },
};

export const SEO_TIPS = {
  waxing: [
    { question: '¿Cuánto dura la cera brasileña?', answer: 'Los resultados de la cera brasileña suelen durar entre 3 y 4 semanas, dependiendo de tu ciclo de crecimiento del vello.' },
    { question: '¿Duele la cera brasileña?', answer: 'La molestia es mínima y temporal. Nuestras esteticistas están entrenadas para hacer la experiencia lo más cómoda posible.' },
    { question: '¿Cómo prepararse para una cera brasileña?', answer: 'Deja crecer el vello al menos 1/4 de pulgada (como un grano de arroz). Exfolia suavemente 24 horas antes.' },
    { question: '¿Puedo waxearme durante mi período?', answer: 'Sí, pero puede ser más sensible. Toma un analgésico 30 minutos antes y usa un tampón o copa menstrual.' },
    { question: '¿Qué es mejor, cera caliente o fría?', answer: 'La cera caliente es mejor para áreas sensibles como el bikini. La cera fría funciona bien en piernas y brazos.' },
  ],
  aftercare: [
    { question: '¿Cómo cuidar mi piel después de la cera?', answer: 'Evita el sol, saunas y ejercicio intenso por 24 horas. Usa ropa holgada y aplica aloe vera.' },
    { question: '¿Cuándo debo exfoliar después de la cera?', answer: 'Espera 48 horas antes de exfoliar. Luego exfolia 2-3 veces por semana para prevenir vellos encarnados.' },
    { question: '¿Por qué salen granitos después de la cera?', answer: 'Es una reacción temporal de los folículos. Usa productos calmantes como aloe vera o aceite de árbol de té diluido.' },
  ],
  local: [
    { question: '¿Necesito cita previa?', answer: 'Recomendamos reservar con anticipación, especialmente fines de semana. Aceptamos walk-ins según disponibilidad.' },
    { question: '¿Qué métodos de pago aceptan?', answer: 'Aceptamos efectivo, tarjetas de crédito/débito, y gift cards. También procesamos pagos sin contacto.' },
    { question: '¿Hay estacionamento?', answer: 'Sí, contamos con estacionamento gratuito para clientas en el frente del local.' },
  ],
};

export const DEFAULT_PAGES = [
  { id: 'home', enabled: true, order: 1 },
  { id: 'services', enabled: true, order: 2 },
  { id: 'appointments', enabled: true, order: 3 },
  { id: 'about', enabled: true, order: 4 },
  { id: 'contact', enabled: true, order: 5 },
  { id: 'gift-cards', enabled: false, order: 6 },
  { id: 'products', enabled: false, order: 7 },
  { id: 'faq', enabled: false, order: 8 },
];

export const LOCAL_SEO_KEYWORDS = [
  'waxing near me',
  'brazilian wax near me',
  'best waxing salon',
  'waxing studio',
  'eyebrow waxing',
  'full body wax',
  'bikini wax',
  'leg wax',
  'underarm wax',
  'men\'s waxing',
  'sugaring',
  'hard wax',
  'soft wax',
  'pain-free waxing',
  'luxury waxing',
];

export type LuxuryThemeId = typeof LUXURY_THEMES[number]['id'];

// Mock collections - not used in demo but kept for type compatibility
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
};

// Mock db object
export const db = null as any;
