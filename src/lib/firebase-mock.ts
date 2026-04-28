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

export const FAQ_DATA: Record<string, { question: string; answer: string }[]> = {
  waxing: [
    { question: 'How long does a Brazilian wax last?', answer: 'Results typically last 3-4 weeks depending on your hair growth cycle.' },
    { question: 'Does waxing hurt?', answer: 'Discomfort is minimal and temporary. Our estheticians are trained to make the experience as comfortable as possible.' },
    { question: 'How do I prepare for a wax?', answer: 'Let hair grow to at least 1/4 inch (rice-grain size). Exfoliate gently 24 hours before.' },
    { question: 'Can I wax during my period?', answer: 'Yes, but you may be more sensitive. Take a pain reliever 30 minutes before and use a tampon or menstrual cup.' },
    { question: 'What is the difference between hot and cold wax?', answer: 'Hot wax is better for sensitive areas like bikini. Cold wax works well on legs and arms.' },
  ],
  barber: [
    { question: 'Do I need an appointment?', answer: 'Walk-ins are welcome, but appointments are recommended for weekends and peak hours.' },
    { question: 'What is a hot towel shave?', answer: 'A traditional straight-razor shave with hot towels to open pores and soften beard hair for the smoothest finish.' },
    { question: 'How often should I get a haircut?', answer: 'For short styles, every 2-3 weeks. For longer styles, every 4-6 weeks is usually sufficient.' },
    { question: 'Do you cut kids hair?', answer: 'Yes! We offer kids cuts for children under 12 in a friendly, patient environment.' },
    { question: 'What is gray blending?', answer: 'A subtle coloring technique that blends away gray naturally without a drastic change.' },
  ],
  nails: [
    { question: 'How long do gel manicures last?', answer: 'Gel manicures typically last 2-3 weeks without chipping or peeling.' },
    { question: 'What is the difference between acrylic and dip powder?', answer: 'Acrylic uses a liquid monomer and powder polymer. Dip powder uses pigmented powder and resin for a lighter, more natural feel.' },
    { question: 'How do I care for my nails after a manicure?', answer: 'Wear gloves when cleaning, moisturize daily, and avoid using nails as tools to prevent lifting.' },
    { question: "Can I get a pedicure if I have athlete's foot?", answer: 'Please wait until the condition is fully treated to protect our staff and other clients.' },
    { question: 'How long does nail art take?', answer: 'Basic designs take 10-15 minutes. Custom hand-painted art can take 30-45 minutes depending on complexity.' },
  ],
  hair: [
    { question: 'How often should I color my hair?', answer: 'Root touch-ups every 4-6 weeks. Full color refresh every 8-12 weeks depending on the technique.' },
    { question: 'What is balayage?', answer: 'A hand-painted highlighting technique that creates a sun-kissed, natural-looking color with softer regrowth lines.' },
    { question: 'Will a keratin treatment straighten my hair?', answer: 'Keratin treatments reduce frizz and improve manageability. They relax curl slightly but do not fully straighten hair.' },
    { question: 'How do I maintain my haircut between visits?', answer: 'Use quality products recommended by your stylist, minimize heat styling, and get bang trims every 2-3 weeks.' },
    { question: 'Can I wash my hair after coloring?', answer: 'Wait at least 48 hours before washing to allow the color to fully set and last longer.' },
  ],
  tattoo: [
    { question: 'Does getting a tattoo hurt?', answer: 'Pain varies by location and personal tolerance. Most describe it as a scratching or stinging sensation.' },
    { question: 'How do I care for a new tattoo?', answer: 'Keep it clean and moisturized. Avoid swimming, sun exposure, and tight clothing for 2-3 weeks.' },
    { question: 'How long does a tattoo take to heal?', answer: 'Surface healing takes 2-3 weeks. Full healing under the skin takes about 3 months.' },
    { question: 'Can you cover up an old tattoo?', answer: 'Yes, we specialize in cover-ups. A consultation is required to assess the existing tattoo and design options.' },
    { question: 'What is the minimum age for a tattoo?', answer: 'You must be 18 or older with valid photo ID. No exceptions.' },
  ],
  massage: [
    { question: 'What should I wear for a massage?', answer: 'Undress to your comfort level. You will be properly draped with a sheet at all times.' },
    { question: 'How often should I get a massage?', answer: 'For general wellness, once a month is ideal. For chronic pain, weekly or bi-weekly may be recommended.' },
    { question: 'Can I get a massage if I am pregnant?', answer: 'Yes, prenatal massage is available after the first trimester. Please inform us when booking.' },
    { question: 'Should I tip my massage therapist?', answer: 'Gratuities are appreciated but not required. 15-20% is standard if you choose to tip.' },
    { question: 'What is the difference between Swedish and deep tissue?', answer: 'Swedish uses lighter pressure for relaxation. Deep tissue targets deeper muscle layers for pain relief.' },
  ],
  skincare: [
    { question: 'How often should I get a facial?', answer: 'Monthly facials are ideal for maintaining healthy skin and addressing concerns consistently.' },
    { question: 'What is microneedling?', answer: 'A treatment using tiny needles to stimulate collagen production, improving texture, scars, and fine lines.' },
    { question: 'Is there downtime after a chemical peel?', answer: 'Light peels have minimal downtime. Medium to deep peels may cause peeling for 3-7 days.' },
    { question: 'Can I wear makeup after a facial?', answer: 'It is best to wait 24 hours to let your skin breathe and absorb the full benefits.' },
    { question: 'What skin type do you treat?', answer: 'We treat all skin types and concerns with customized treatments tailored to your needs.' },
  ],
  'brow-lash': [
    { question: 'How long do lash extensions last?', answer: 'Classic extensions last 2-3 weeks. Volume lashes may last 3-4 weeks with proper care.' },
    { question: 'Can I get my lashes wet?', answer: 'Avoid water and steam for the first 24-48 hours. After that, gentle cleansing is fine.' },
    { question: 'What is brow lamination?', answer: 'A chemical treatment that straightens and sets brow hairs in place, giving a fuller, groomed look.' },
    { question: 'How long does microblading last?', answer: 'Results typically last 1-2 years depending on skin type and aftercare.' },
    { question: 'Will lash extensions damage my natural lashes?', answer: 'When applied correctly by a trained technician, extensions do not damage natural lashes.' },
  ],
  tanning: [
    { question: 'How long does a spray tan last?', answer: 'A spray tan typically lasts 5-7 days with proper care and moisturization.' },
    { question: 'What should I wear during a spray tan?', answer: 'Wear dark, loose clothing. You may wear undergarments or a swimsuit based on your comfort.' },
    { question: 'Can I shower after a spray tan?', answer: 'Wait at least 8 hours before showering for standard tans, 1-3 hours for express formulas.' },
    { question: 'Will a spray tan protect me from the sun?', answer: 'No. Spray tans do not contain SPF. Always wear sunscreen when outdoors.' },
    { question: 'How do I prepare for a spray tan?', answer: 'Exfoliate and shave 24 hours before. Avoid lotions, deodorant, and perfumes on the day of your tan.' },
  ],
};

// Legacy export name for backward compatibility
export const SEO_TIPS = FAQ_DATA;

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
