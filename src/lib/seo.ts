/**
 * SEO Utilities for Waxing Studio Websites
 * Generates optimized meta tags, structured data, and content suggestions
 */

export interface StudioSEOData {
  businessName: string;
  tagline?: string;
  address?: string;
  city?: string;
  state?: string;
  phone?: string;
  instagram?: string;
  facebook?: string;
  theme?: { id: string; name: string };
}

export interface PageSEOData {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
}

export const PAGE_SEO: Record<string, PageSEOData> = {
  home: {
    title: 'Inicio | {studio} - Waxing Studio Profesional',
    description: 'Expertos en waxing y cuidado de la piel en {city}. Resultados suaves y duraderos en un ambiente luxury. Reserva tu cita hoy.',
    keywords: ['waxing', 'cera', 'depilación', 'brazilian wax', 'cuidado de la piel', 'spa', 'belleza', '{city}'],
  },
  services: {
    title: 'Servicios de Waxing | {studio}',
    description: 'Brazilian Wax, Full Body, Brow Design y más. Precios desde $15. Profesionales certificados en {city}.',
    keywords: ['brazilian wax', 'full body wax', 'brow design', 'underarm wax', 'leg wax', 'servicios de waxing', '{city}'],
  },
  appointments: {
    title: 'Reservar Cita | {studio} - Booking Online',
    description: 'Reserva tu cita de waxing online en segundos. Horarios flexibles, recordatorios automáticos. Sin llamadas necesarias.',
    keywords: ['reservar cita', 'booking', 'agenda', 'cita waxing', 'appointment', '{city}'],
  },
  'gift-cards': {
    title: 'Gift Cards | {studio} - El Regalo Perfecto',
    description: 'Gift cards para experiencias de waxing. Desde $50. El regalo ideal para bodas, cumpleaños o auto-cuidado.',
    keywords: ['gift card', 'regalo', 'tarjeta de regalo', 'experiencia spa', 'waxing gift'],
  },
  products: {
    title: 'Productos de Cuidado | {studio}',
    description: 'Aftercare oil, exfoliantes, serums anti-ingrown. Productos profesionales para extender tu experiencia de spa.',
    keywords: ['aftercare', 'productos waxing', 'aceite post-depilación', 'exfoliante', 'cuidado de la piel'],
  },
  about: {
    title: 'Sobre Nosotros | {studio} - Nuestra Historia',
    description: 'Expertos certificados en waxing con años de experiencia. Conoce nuestro equipo y por qué somos los mejores en {city}.',
    keywords: ['sobre nosotros', 'nuestro equipo', 'esteticistas', 'waxing professionals', '{city}'],
  },
  contact: {
    title: 'Contacto | {studio} - Visítanos',
    description: 'Encuéntranos en {address}, {city}. Tel: {phone}. Horarios: Lun-Vie 9am-7pm, Sáb 10am-5pm.',
    keywords: ['contacto', 'ubicación', 'dirección', 'teléfono', 'horarios', '{city}'],
  },
  faq: {
    title: 'Preguntas Frecuentes | {studio}',
    description: '¿Cuánto dura la cera? ¿Duele el brazilian wax? Resolvemos todas tus dudas sobre waxing y cuidados.',
    keywords: ['faq', 'preguntas frecuentes', 'waxing tips', 'cuidados después del waxing', 'brazilian wax dolor'],
  },
};

export function generatePageTitle(page: string, studio: StudioSEOData): string {
  const seoData = PAGE_SEO[page] || PAGE_SEO.home;
  return seoData.title
    .replace('{studio}', studio.businessName)
    .replace('{city}', studio.city || 'tu ciudad');
}

export function generatePageDescription(page: string, studio: StudioSEOData): string {
  const seoData = PAGE_SEO[page] || PAGE_SEO.home;
  return seoData.description
    .replace('{studio}', studio.businessName)
    .replace('{city}', studio.city || 'tu ciudad')
    .replace('{address}', studio.address || '')
    .replace('{phone}', studio.phone || '');
}

export function generateKeywords(page: string, studio: StudioSEOData): string[] {
  const seoData = PAGE_SEO[page] || PAGE_SEO.home;
  const baseKeywords = seoData.keywords.map(k =>
    k.replace('{city}', studio.city || 'tu ciudad')
  );

  // Add brand keywords
  if (studio.businessName) {
    baseKeywords.push(studio.businessName.toLowerCase());
  }

  // Add location keywords
  if (studio.city) {
    baseKeywords.push(`waxing en ${studio.city}`);
    baseKeywords.push(`mejor waxing ${studio.city}`);
    baseKeywords.push(`salón de belleza ${studio.city}`);
  }

  return [...new Set(baseKeywords)]; // Remove duplicates
}

export function generateStructuredData(studio: StudioSEOData): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'HealthAndBeautyBusiness',
    name: studio.businessName,
    description: studio.tagline || 'Waxing Studio Profesional',
    address: {
      '@type': 'PostalAddress',
      streetAddress: studio.address,
      addressLocality: studio.city?.split(',')[0],
      addressRegion: studio.state,
    },
    telephone: studio.phone,
    image: '/og-image.jpg',
    priceRange: '$$',
    openingHours: 'Mo-Fr 09:00-19:00, Sa 10:00-17:00',
    sameAs: [studio.instagram, studio.facebook].filter(Boolean),
  };
}

export const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Cuánto dura la cera brasileña?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Los resultados de la cera brasileña suelen durar entre 3 y 4 semanas, dependiendo de tu ciclo de crecimiento del vello.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Duele la cera brasileña?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La molestia es mínima y temporal. Nuestras esteticistas están entrenadas para hacer la experiencia lo más cómoda posible.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo prepararse para una cera brasileña?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Deja crecer el vello al menos 1/4 de pulgada (como un grano de arroz). Exfolia suavemente 24 horas antes.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué es el cuidado después del waxing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Evita el sol, saunas y ejercicio intenso por 24 horas. Usa ropa holgada y aplica aloe vera o productos calmantes.',
      },
    },
  ],
};

// Local SEO keywords for waxing studios
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

// Content suggestions based on season/trends
export const SEASONAL_CONTENT = {
  spring: {
    title: 'Prepárate para la Primavera',
    description: 'Renueva tu look con nuestros servicios de waxing. Ofertas especiales en Full Body.',
    cta: 'Reserva tu Cita de Primavera',
  },
  summer: {
    title: 'Lista para el Verano',
    description: 'Piel suave y perfecta para la temporada de playa. Brazilian Wax + Aftercare por $60.',
    cta: 'Ver Ofertas de Verano',
  },
  fall: {
    title: 'Cuidado de Otoño',
    description: 'Mantén tu piel hidratada y suave. Nuestros tratamientos de exfoliación son perfectos para la temporada.',
    cta: 'Agendar Tratamiento',
  },
  winter: {
    title: 'Invierno Relax',
    description: 'El invierno es el momento perfecto para comenzar tu journey de waxing. Precios especiales.',
    cta: 'Ver Promociones',
  },
  holidays: {
    title: 'Gift Cards de Navidad',
    description: 'El regalo perfecto para alguien especial. Gift cards desde $25.',
    cta: 'Comprar Gift Card',
  },
};
