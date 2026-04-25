/**
 * Business Type System — Universal definitions for all beauty/body service businesses
 * This replaces waxing-specific hardcoding with configurable per-business-type defaults.
 */

import {
  Scissors,
  Sparkles,
  UserCircle,
  Flower2,
  Hand,
  Footprints,
  Bath,
  Flame,
  Gem,
  HeartPulse,
  Brush,
  Eye,
  Sun,
  PenTool,
  Type,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface BusinessType {
  id: string;
  name: string;
  shortName: string;
  description: string;
  icon: string; // lucide icon name
  defaultServiceCategories: string[];
  defaultThemeId: string;
  suggestedFeatures: string[];
  terminology: {
    professional: string; // e.g. "Esthetician", "Barber", "Nail Tech"
    service: string;      // e.g. "Treatment", "Service", "Session"
    booking: string;      // e.g. "Appointment", "Reservation", "Walk-in"
    client: string;       // e.g. "Client", "Guest", "Customer"
    room: string;         // e.g. "Room", "Chair", "Bed", "Station"
  };
  defaultPages: string[];
  homeSectionTypes: string[];
}

export const BUSINESS_TYPES: BusinessType[] = [
  {
    id: 'waxing',
    name: 'Waxing Studio',
    shortName: 'Waxing',
    description: 'Depilación con cera, sugaring y threading',
    icon: 'Scissors',
    defaultServiceCategories: ['body-waxing', 'facial-waxing', 'sugaring', 'threading', 'packages'],
    defaultThemeId: 'waxing-rose-gold',
    suggestedFeatures: ['online-booking', 'packages', 'loyalty', 'aftercare-guides'],
    terminology: {
      professional: 'Esthetician',
      service: 'Treatment',
      booking: 'Appointment',
      client: 'Client',
      room: 'Room',
    },
    defaultPages: ['home', 'services', 'appointments', 'about', 'contact', 'faq'],
    homeSectionTypes: ['hero', 'services-grid', 'about-preview', 'testimonials', 'gallery', 'promotions', 'contact-info'],
  },
  {
    id: 'nails',
    name: 'Nail Salon / Nail Bar',
    shortName: 'Nails',
    description: 'Manicuras, pedicuras, uñas acrílicas, nail art',
    icon: 'Sparkles',
    defaultServiceCategories: ['manicure', 'pedicure', 'gel-nails', 'acrylic-nails', 'nail-art', 'removal', 'add-ons'],
    defaultThemeId: 'nails-nude-neon',
    suggestedFeatures: ['online-booking', 'walk-in-board', 'loyalty', 'design-gallery', 'gift-cards'],
    terminology: {
      professional: 'Nail Technician',
      service: 'Service',
      booking: 'Appointment',
      client: 'Client',
      room: 'Station',
    },
    defaultPages: ['home', 'services', 'appointments', 'gallery', 'about', 'contact'],
    homeSectionTypes: ['hero', 'design-gallery', 'services-grid', 'team-preview', 'testimonials', 'promotions', 'contact-info'],
  },
  {
    id: 'barber',
    name: 'Barber Shop',
    shortName: 'Barber',
    description: 'Cortes, afeitados, grooming y cuidado masculino',
    icon: 'UserCircle',
    defaultServiceCategories: ['haircuts', 'shaves', 'beard', 'grooming', 'color', 'facials'],
    defaultThemeId: 'midnight-barber',
    suggestedFeatures: ['online-booking', 'walk-in-board', 'loyalty', 'waitlist', 'pos'],
    terminology: {
      professional: 'Barber',
      service: 'Service',
      booking: 'Appointment',
      client: 'Client',
      room: 'Chair',
    },
    defaultPages: ['home', 'services', 'appointments', 'about', 'contact', 'gallery'],
    homeSectionTypes: ['hero', 'services-grid', 'team-preview', 'gallery', 'testimonials', 'cta-banner', 'contact-info'],
  },
  {
    id: 'hair-salon',
    name: 'Hair Salon',
    shortName: 'Hair',
    description: 'Cortes, color, peinados, tratamientos capilares',
    icon: 'Brush',
    defaultServiceCategories: ['haircuts', 'color', 'styling', 'treatments', 'extensions', 'weddings'],
    defaultThemeId: 'hair-blanc-pur',
    suggestedFeatures: ['online-booking', 'consultation', 'loyalty', 'portfolio', 'gift-cards'],
    terminology: {
      professional: 'Stylist',
      service: 'Service',
      booking: 'Appointment',
      client: 'Client',
      room: 'Station',
    },
    defaultPages: ['home', 'services', 'appointments', 'portfolio', 'about', 'contact'],
    homeSectionTypes: ['hero', 'portfolio', 'services-grid', 'team-preview', 'testimonials', 'promotions', 'contact-info'],
  },
  {
    id: 'massage',
    name: 'Massage & Spa',
    shortName: 'Massage',
    description: 'Masajes terapéuticos, spa y bienestar',
    icon: 'HeartPulse',
    defaultServiceCategories: ['swedish', 'deep-tissue', 'hot-stone', 'sports', 'aromatherapy', 'facials', 'body-wraps'],
    defaultThemeId: 'massage-zen-spa',
    suggestedFeatures: ['online-booking', 'packages', 'loyalty', 'gift-cards', 'wellness-plans'],
    terminology: {
      professional: 'Therapist',
      service: 'Session',
      booking: 'Appointment',
      client: 'Guest',
      room: 'Room',
    },
    defaultPages: ['home', 'services', 'appointments', 'packages', 'about', 'contact'],
    homeSectionTypes: ['hero', 'services-grid', 'wellness-packages', 'team-preview', 'testimonials', 'gallery', 'contact-info'],
  },
  {
    id: 'skincare',
    name: 'Skin Care / Facial Clinic',
    shortName: 'Skincare',
    description: 'Faciales, tratamientos de piel, dermatología estética',
    icon: 'Flower2',
    defaultServiceCategories: ['facials', 'peels', 'microdermabrasion', 'anti-aging', 'acne', 'body-treatments'],
    defaultThemeId: 'skincare-botanical',
    suggestedFeatures: ['online-booking', 'consultation', 'loyalty', 'skin-analysis', 'product-shop'],
    terminology: {
      professional: 'Esthetician',
      service: 'Treatment',
      booking: 'Appointment',
      client: 'Client',
      room: 'Room',
    },
    defaultPages: ['home', 'services', 'appointments', 'about', 'contact', 'skin-guide'],
    homeSectionTypes: ['hero', 'services-grid', 'before-after', 'team-preview', 'testimonials', 'promotions', 'contact-info'],
  },
  {
    id: 'brow-lash',
    name: 'Brow & Lash Studio',
    shortName: 'Brows & Lashes',
    description: 'Extensiones de pestañas, laminado, microblading, henna',
    icon: 'Eye',
    defaultServiceCategories: ['lash-extensions', 'lash-lift', 'brow-lamination', 'microblading', 'henna', 'tinting'],
    defaultThemeId: 'browlash-flutter-pink',
    suggestedFeatures: ['online-booking', 'loyalty', 'gallery', 'aftercare-guides', 'gift-cards'],
    terminology: {
      professional: 'Artist',
      service: 'Treatment',
      booking: 'Appointment',
      client: 'Client',
      room: 'Bed',
    },
    defaultPages: ['home', 'services', 'appointments', 'gallery', 'about', 'contact'],
    homeSectionTypes: ['hero', 'gallery', 'services-grid', 'team-preview', 'testimonials', 'promotions', 'contact-info'],
  },
  {
    id: 'tanning',
    name: 'Tanning Salon',
    shortName: 'Tanning',
    description: 'Bronceado en cabina, spray tan, bronceado orgánico',
    icon: 'Sun',
    defaultServiceCategories: ['uv-beds', 'spray-tan', 'organic-tan', 'packages', 'memberships'],
    defaultThemeId: 'tanning-golden-hour',
    suggestedFeatures: ['online-booking', 'memberships', 'loyalty', 'packages'],
    terminology: {
      professional: 'Technician',
      service: 'Session',
      booking: 'Appointment',
      client: 'Client',
      room: 'Room',
    },
    defaultPages: ['home', 'services', 'appointments', 'packages', 'about', 'contact'],
    homeSectionTypes: ['hero', 'services-grid', 'before-after', 'testimonials', 'promotions', 'contact-info'],
  },
  {
    id: 'tattoo',
    name: 'Tattoo & Piercing Studio',
    shortName: 'Tattoo',
    description: 'Tatuajes, piercings, touch-ups y consultas',
    icon: 'PenTool',
    defaultServiceCategories: ['tattoos', 'piercings', 'touch-ups', 'consultations', 'removal'],
    defaultThemeId: 'tattoo-minimal-ink',
    suggestedFeatures: ['online-booking', 'consultation', 'portfolio', 'deposit-payments', 'aftercare-guides'],
    terminology: {
      professional: 'Artist',
      service: 'Session',
      booking: 'Appointment',
      client: 'Client',
      room: 'Booth',
    },
    defaultPages: ['home', 'services', 'appointments', 'portfolio', 'about', 'contact'],
    homeSectionTypes: ['hero', 'portfolio', 'services-grid', 'team-preview', 'testimonials', 'cta-banner', 'contact-info'],
  },
  {
    id: 'wellness',
    name: 'Wellness Center',
    shortName: 'Wellness',
    description: 'Sauna, baños de vapor, hidroterapia, flotación',
    icon: 'Bath',
    defaultServiceCategories: ['sauna', 'steam-room', 'hydrotherapy', 'float', 'mud-therapy', 'packages'],
    defaultThemeId: 'wellness-zen-spa',
    suggestedFeatures: ['online-booking', 'memberships', 'packages', 'loyalty', 'gift-cards'],
    terminology: {
      professional: 'Therapist',
      service: 'Session',
      booking: 'Reservation',
      client: 'Guest',
      room: 'Room',
    },
    defaultPages: ['home', 'services', 'appointments', 'packages', 'about', 'contact'],
    homeSectionTypes: ['hero', 'services-grid', 'wellness-packages', 'gallery', 'testimonials', 'contact-info'],
  },
];

export function getBusinessType(id: string | null | undefined): BusinessType | undefined {
  if (!id) return undefined;
  return BUSINESS_TYPES.find((bt) => bt.id === id);
}

export function getDefaultBusinessType(): BusinessType {
  return BUSINESS_TYPES[0]; // waxing as default
}

export const ICON_MAP: Record<string, LucideIcon> = {
  Scissors,
  Sparkles,
  UserCircle,
  Flower2,
  Hand,
  Footprints,
  Bath,
  Flame,
  Gem,
  HeartPulse,
  Brush,
  Eye,
  Sun,
  PenTool,
  Type,
};
