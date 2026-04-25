/**
 * Universal Service Categories — Works for ALL beauty/body service businesses
 * Replaces waxing-specific categories with a configurable tree per business type.
 */

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  icon: string; // lucide icon name
  durationRange: { min: number; max: number; default: number }; // minutes
  priceRange: { min: number; max: number; default: number };
  addOns?: ServiceAddOn[];
  applicableBusinessTypes: string[]; // which business types show this category
}

export interface ServiceAddOn {
  id: string;
  name: string;
  price: number;
  duration: number; // extra minutes
}

// Body hair removal
export const BODY_WAXING: ServiceCategory = {
  id: 'body-waxing',
  name: 'Body Waxing',
  description: 'Full body hair removal with professional techniques',
  icon: 'Scissors',
  durationRange: { min: 15, max: 90, default: 30 },
  priceRange: { min: 15, max: 150, default: 45 },
  addOns: [
    { id: 'hard-wax', name: 'Hard Wax Upgrade', price: 10, duration: 0 },
    { id: 'soothing-mask', name: 'Soothing Mask', price: 15, duration: 10 },
  ],
  applicableBusinessTypes: ['waxing', 'spa', 'wellness'],
};

export const FACIAL_WAXING: ServiceCategory = {
  id: 'facial-waxing',
  name: 'Facial Waxing',
  description: 'Eyebrow, lip, chin and full face hair removal',
  icon: 'Eye',
  durationRange: { min: 10, max: 30, default: 15 },
  priceRange: { min: 8, max: 45, default: 20 },
  applicableBusinessTypes: ['waxing', 'skincare', 'brow-lash'],
};

export const SUGARING: ServiceCategory = {
  id: 'sugaring',
  name: 'Sugaring',
  description: 'Natural hair removal with organic sugar paste',
  icon: 'Sparkles',
  durationRange: { min: 15, max: 60, default: 30 },
  priceRange: { min: 20, max: 120, default: 50 },
  applicableBusinessTypes: ['waxing', 'skincare'],
};

export const THREADING: ServiceCategory = {
  id: 'threading',
  name: 'Threading',
  description: 'Precision hair removal using thread technique',
  icon: 'PenTool',
  durationRange: { min: 10, max: 30, default: 15 },
  priceRange: { min: 8, max: 35, default: 18 },
  applicableBusinessTypes: ['waxing', 'brow-lash', 'skincare'],
};

// Nails
export const MANICURE: ServiceCategory = {
  id: 'manicure',
  name: 'Manicure',
  description: 'Classic, gel, and spa manicures',
  icon: 'Hand',
  durationRange: { min: 20, max: 60, default: 30 },
  priceRange: { min: 15, max: 60, default: 25 },
  addOns: [
    { id: 'nail-art', name: 'Nail Art (per nail)', price: 3, duration: 5 },
    { id: 'paraffin', name: 'Paraffin Treatment', price: 10, duration: 10 },
    { id: 'gel-polish', name: 'Gel Polish Upgrade', price: 15, duration: 5 },
  ],
  applicableBusinessTypes: ['nails', 'spa', 'wellness'],
};

export const PEDICURE: ServiceCategory = {
  id: 'pedicure',
  name: 'Pedicure',
  description: 'Classic, gel, and spa pedicures',
  icon: 'Footprints',
  durationRange: { min: 30, max: 75, default: 45 },
  priceRange: { min: 25, max: 80, default: 40 },
  addOns: [
    { id: 'gel-polish-pedi', name: 'Gel Polish Upgrade', price: 15, duration: 5 },
    { id: 'callus-removal', name: 'Extra Callus Removal', price: 12, duration: 10 },
  ],
  applicableBusinessTypes: ['nails', 'spa', 'wellness'],
};

export const GEL_NAILS: ServiceCategory = {
  id: 'gel-nails',
  name: 'Gel Nails',
  description: 'Gel polish, builder gel, and BIAB',
  icon: 'Sparkles',
  durationRange: { min: 30, max: 90, default: 45 },
  priceRange: { min: 30, max: 80, default: 45 },
  applicableBusinessTypes: ['nails'],
};

export const ACRYLIC_NAILS: ServiceCategory = {
  id: 'acrylic-nails',
  name: 'Acrylic & Extensions',
  description: 'Full sets, fills, shape changes, and designs',
  icon: 'Gem',
  durationRange: { min: 45, max: 120, default: 60 },
  priceRange: { min: 35, max: 120, default: 55 },
  addOns: [
    { id: 'ombre', name: 'Ombre/Design', price: 15, duration: 15 },
    { id: 'length', name: 'Extra Length', price: 10, duration: 0 },
  ],
  applicableBusinessTypes: ['nails'],
};

export const NAIL_ART: ServiceCategory = {
  id: 'nail-art',
  name: 'Nail Art',
  description: 'Hand-painted designs, chrome, 3D, and crystals',
  icon: 'Brush',
  durationRange: { min: 15, max: 90, default: 30 },
  priceRange: { min: 10, max: 80, default: 25 },
  applicableBusinessTypes: ['nails'],
};

export const NAIL_REMOVAL: ServiceCategory = {
  id: 'nail-removal',
  name: 'Soak-Off & Removal',
  description: 'Safe removal of gel, acrylic, and extensions',
  icon: 'Trash2',
  durationRange: { min: 15, max: 45, default: 20 },
  priceRange: { min: 10, max: 30, default: 15 },
  applicableBusinessTypes: ['nails'],
};

// Hair
export const HAIRCUTS: ServiceCategory = {
  id: 'haircuts',
  name: 'Haircuts',
  description: 'Cuts for women, men, and children',
  icon: 'Scissors',
  durationRange: { min: 30, max: 60, default: 45 },
  priceRange: { min: 25, max: 100, default: 45 },
  applicableBusinessTypes: ['hair-salon', 'barber'],
};

export const HAIR_COLOR: ServiceCategory = {
  id: 'hair-color',
  name: 'Hair Color',
  description: 'Full color, highlights, balayage, and gloss',
  icon: 'Palette',
  durationRange: { min: 60, max: 180, default: 90 },
  priceRange: { min: 60, max: 300, default: 120 },
  addOns: [
    { id: 'toner', name: 'Toner/Gloss', price: 25, duration: 15 },
    { id: 'olaplex', name: 'Olaplex Treatment', price: 35, duration: 15 },
  ],
  applicableBusinessTypes: ['hair-salon'],
};

export const HAIR_STYLING: ServiceCategory = {
  id: 'hair-styling',
  name: 'Styling',
  description: 'Blowouts, updos, braids, and special event styling',
  icon: 'Wind',
  durationRange: { min: 30, max: 90, default: 45 },
  priceRange: { min: 30, max: 150, default: 55 },
  applicableBusinessTypes: ['hair-salon', 'barber'],
};

export const HAIR_TREATMENTS: ServiceCategory = {
  id: 'hair-treatments',
  name: 'Hair Treatments',
  description: 'Keratin, deep conditioning, scalp treatments',
  icon: 'HeartPulse',
  durationRange: { min: 30, max: 120, default: 60 },
  priceRange: { min: 40, max: 200, default: 80 },
  applicableBusinessTypes: ['hair-salon'],
};

export const HAIR_EXTENSIONS: ServiceCategory = {
  id: 'hair-extensions',
  name: 'Extensions',
  description: 'Tape-in, sew-in, micro-link, and clip-in extensions',
  icon: 'Layers',
  durationRange: { min: 60, max: 240, default: 120 },
  priceRange: { min: 200, max: 800, default: 350 },
  applicableBusinessTypes: ['hair-salon'],
};

// Barber specific
export const SHAVES: ServiceCategory = {
  id: 'shaves',
  name: 'Shaves',
  description: 'Hot towel, straight razor, and beard shaves',
  icon: 'Flame',
  durationRange: { min: 20, max: 45, default: 30 },
  priceRange: { min: 20, max: 60, default: 35 },
  applicableBusinessTypes: ['barber'],
};

export const BEARD: ServiceCategory = {
  id: 'beard',
  name: 'Beard Grooming',
  description: 'Trim, shape, conditioning, and color',
  icon: 'User',
  durationRange: { min: 15, max: 45, default: 20 },
  priceRange: { min: 15, max: 40, default: 25 },
  applicableBusinessTypes: ['barber'],
};

// Massage
export const SWEDISH_MASSAGE: ServiceCategory = {
  id: 'swedish',
  name: 'Swedish Massage',
  description: 'Relaxing full-body massage with light to medium pressure',
  icon: 'HeartPulse',
  durationRange: { min: 30, max: 120, default: 60 },
  priceRange: { min: 50, max: 180, default: 90 },
  applicableBusinessTypes: ['massage', 'spa', 'wellness'],
};

export const DEEP_TISSUE: ServiceCategory = {
  id: 'deep-tissue',
  name: 'Deep Tissue',
  description: 'Intense pressure targeting chronic muscle tension',
  icon: 'Dumbbell',
  durationRange: { min: 30, max: 90, default: 60 },
  priceRange: { min: 60, max: 200, default: 100 },
  applicableBusinessTypes: ['massage', 'spa', 'wellness'],
};

export const HOT_STONE: ServiceCategory = {
  id: 'hot-stone',
  name: 'Hot Stone',
  description: 'Heated basalt stones for deep relaxation',
  icon: 'Flame',
  durationRange: { min: 60, max: 90, default: 75 },
  priceRange: { min: 80, max: 160, default: 110 },
  applicableBusinessTypes: ['massage', 'spa', 'wellness'],
};

export const SPORTS_MASSAGE: ServiceCategory = {
  id: 'sports',
  name: 'Sports Massage',
  description: 'Targeted therapy for athletes and active clients',
  icon: 'Activity',
  durationRange: { min: 30, max: 90, default: 60 },
  priceRange: { min: 60, max: 180, default: 95 },
  applicableBusinessTypes: ['massage', 'wellness'],
};

export const AROMATHERAPY: ServiceCategory = {
  id: 'aromatherapy',
  name: 'Aromatherapy',
  description: 'Essential oil massage for relaxation and healing',
  icon: 'Flower2',
  durationRange: { min: 60, max: 90, default: 60 },
  priceRange: { min: 70, max: 160, default: 95 },
  applicableBusinessTypes: ['massage', 'spa', 'wellness'],
};

// Facials & Skin
export const FACIALS: ServiceCategory = {
  id: 'facials',
  name: 'Facials',
  description: 'Classic, hydrating, anti-aging, and acne facials',
  icon: 'Smile',
  durationRange: { min: 30, max: 90, default: 60 },
  priceRange: { min: 50, max: 200, default: 85 },
  addOns: [
    { id: 'led', name: 'LED Therapy', price: 25, duration: 15 },
    { id: 'extractions', name: 'Extra Extractions', price: 20, duration: 15 },
  ],
  applicableBusinessTypes: ['skincare', 'spa', 'wellness'],
};

export const CHEMICAL_PEELS: ServiceCategory = {
  id: 'chemical-peels',
  name: 'Chemical Peels',
  description: 'Glycolic, salicylic, TCA, and enzyme peels',
  icon: 'FlaskConical',
  durationRange: { min: 30, max: 60, default: 45 },
  priceRange: { min: 60, max: 250, default: 100 },
  applicableBusinessTypes: ['skincare', 'spa'],
};

export const MICRODERMABRASION: ServiceCategory = {
  id: 'microdermabrasion',
  name: 'Microdermabrasion',
  description: 'Exfoliation treatment for smoother skin',
  icon: 'Sparkles',
  durationRange: { min: 30, max: 60, default: 45 },
  priceRange: { min: 75, max: 200, default: 110 },
  applicableBusinessTypes: ['skincare', 'spa'],
};

// Lash & Brow
export const LASH_EXTENSIONS: ServiceCategory = {
  id: 'lash-extensions',
  name: 'Lash Extensions',
  description: 'Classic, hybrid, volume, and mega volume',
  icon: 'Eye',
  durationRange: { min: 60, max: 150, default: 90 },
  priceRange: { min: 80, max: 250, default: 120 },
  addOns: [
    { id: 'lash-bath', name: 'Lash Bath', price: 10, duration: 10 },
  ],
  applicableBusinessTypes: ['brow-lash', 'spa'],
};

export const LASH_LIFT: ServiceCategory = {
  id: 'lash-lift',
  name: 'Lash Lift & Tint',
  description: 'Perm for lashes with optional tint',
  icon: 'Sun',
  durationRange: { min: 45, max: 75, default: 60 },
  priceRange: { min: 50, max: 100, default: 65 },
  applicableBusinessTypes: ['brow-lash'],
};

export const BROW_LAMINATION: ServiceCategory = {
  id: 'brow-lamination',
  name: 'Brow Lamination',
  description: 'Fluffy brow treatment with optional tint',
  icon: 'PenTool',
  durationRange: { min: 30, max: 60, default: 45 },
  priceRange: { min: 40, max: 90, default: 55 },
  applicableBusinessTypes: ['brow-lash'],
};

export const MICROBLADING: ServiceCategory = {
  id: 'microblading',
  name: 'Microblading',
  description: 'Semi-permanent eyebrow tattoo technique',
  icon: 'Pen',
  durationRange: { min: 120, max: 180, default: 150 },
  priceRange: { min: 300, max: 600, default: 400 },
  applicableBusinessTypes: ['brow-lash', 'tattoo'],
};

export const HENNA_BROWS: ServiceCategory = {
  id: 'henna-brows',
  name: 'Henna Brows',
  description: 'Natural plant-based brow tint lasting up to 6 weeks',
  icon: 'Flower2',
  durationRange: { min: 20, max: 45, default: 30 },
  priceRange: { min: 30, max: 60, default: 40 },
  applicableBusinessTypes: ['brow-lash'],
};

// Tanning
export const UV_BEDS: ServiceCategory = {
  id: 'uv-beds',
  name: 'UV Tanning Beds',
  description: 'Stand-up and lay-down tanning sessions',
  icon: 'Sun',
  durationRange: { min: 10, max: 30, default: 15 },
  priceRange: { min: 8, max: 35, default: 15 },
  applicableBusinessTypes: ['tanning'],
};

export const SPRAY_TAN: ServiceCategory = {
  id: 'spray-tan',
  name: 'Spray Tan',
  description: 'Custom airbrush or booth spray tan',
  icon: 'SprayCan',
  durationRange: { min: 15, max: 30, default: 20 },
  priceRange: { min: 30, max: 80, default: 45 },
  applicableBusinessTypes: ['tanning', 'skincare'],
};

export const ORGANIC_TAN: ServiceCategory = {
  id: 'organic-tan',
  name: 'Organic Tan',
  description: 'Natural and vegan tanning solutions',
  icon: 'Leaf',
  durationRange: { min: 20, max: 45, default: 30 },
  priceRange: { min: 40, max: 90, default: 55 },
  applicableBusinessTypes: ['tanning'],
};

// Tattoo & Piercing
export const TATTOOS: ServiceCategory = {
  id: 'tattoos',
  name: 'Tattoos',
  description: 'Custom designs, flash, and cover-ups',
  icon: 'PenTool',
  durationRange: { min: 60, max: 300, default: 120 },
  priceRange: { min: 100, max: 1000, default: 200 },
  applicableBusinessTypes: ['tattoo'],
};

export const PIERCINGS: ServiceCategory = {
  id: 'piercings',
  name: 'Piercings',
  description: 'Ear, facial, and body piercings',
  icon: 'Gem',
  durationRange: { min: 15, max: 45, default: 20 },
  priceRange: { min: 30, max: 100, default: 50 },
  applicableBusinessTypes: ['tattoo'],
};

export const TATTOO_TOUCHUPS: ServiceCategory = {
  id: 'tattoo-touchups',
  name: 'Touch-ups',
  description: 'Refresh and restore existing tattoos',
  icon: 'RefreshCw',
  durationRange: { min: 30, max: 120, default: 60 },
  priceRange: { min: 50, max: 200, default: 80 },
  applicableBusinessTypes: ['tattoo'],
};

// Wellness / Spa
export const SAUNA: ServiceCategory = {
  id: 'sauna',
  name: 'Sauna',
  description: 'Traditional, infrared, and steam sauna sessions',
  icon: 'Flame',
  durationRange: { min: 20, max: 60, default: 30 },
  priceRange: { min: 20, max: 60, default: 35 },
  applicableBusinessTypes: ['wellness', 'spa'],
};

export const STEAM_ROOM: ServiceCategory = {
  id: 'steam-room',
  name: 'Steam Room',
  description: 'Therapeutic steam sessions',
  icon: 'CloudFog',
  durationRange: { min: 20, max: 45, default: 30 },
  priceRange: { min: 20, max: 50, default: 30 },
  applicableBusinessTypes: ['wellness', 'spa'],
};

export const HYDROTHERAPY: ServiceCategory = {
  id: 'hydrotherapy',
  name: 'Hydrotherapy',
  description: 'Water-based treatments including jacuzzi and vichy shower',
  icon: 'Droplets',
  durationRange: { min: 30, max: 60, default: 45 },
  priceRange: { min: 40, max: 100, default: 60 },
  applicableBusinessTypes: ['wellness', 'spa'],
};

export const FLOAT: ServiceCategory = {
  id: 'float',
  name: 'Float Therapy',
  description: 'Sensory deprivation tank sessions',
  icon: 'Waves',
  durationRange: { min: 60, max: 90, default: 60 },
  priceRange: { min: 60, max: 120, default: 75 },
  applicableBusinessTypes: ['wellness', 'spa'],
};

export const BODY_WRAPS: ServiceCategory = {
  id: 'body-wraps',
  name: 'Body Wraps',
  description: 'Detox, slimming, and hydrating body treatments',
  icon: 'Package',
  durationRange: { min: 45, max: 90, default: 60 },
  priceRange: { min: 60, max: 150, default: 85 },
  applicableBusinessTypes: ['wellness', 'spa', 'skincare'],
};

export const MUD_THERAPY: ServiceCategory = {
  id: 'mud-therapy',
  name: 'Mud Therapy',
  description: 'Mineral-rich mud treatments',
  icon: 'Mountain',
  durationRange: { min: 30, max: 60, default: 45 },
  priceRange: { min: 50, max: 100, default: 65 },
  applicableBusinessTypes: ['wellness', 'spa'],
};

// Universal categories
export const PACKAGES: ServiceCategory = {
  id: 'packages',
  name: 'Packages',
  description: 'Bundled services at a discounted rate',
  icon: 'Package',
  durationRange: { min: 60, max: 300, default: 120 },
  priceRange: { min: 80, max: 500, default: 150 },
  applicableBusinessTypes: ['waxing', 'nails', 'massage', 'skincare', 'brow-lash', 'tanning', 'wellness', 'spa'],
};

export const MEMBERSHIPS: ServiceCategory = {
  id: 'memberships',
  name: 'Memberships',
  description: 'Monthly subscription plans',
  icon: 'CreditCard',
  durationRange: { min: 0, max: 0, default: 0 },
  priceRange: { min: 50, max: 300, default: 99 },
  applicableBusinessTypes: ['nails', 'massage', 'tanning', 'wellness', 'spa'],
};

export const CONSULTATIONS: ServiceCategory = {
  id: 'consultations',
  name: 'Consultations',
  description: 'Free or paid initial consultations',
  icon: 'MessageCircle',
  durationRange: { min: 15, max: 45, default: 20 },
  priceRange: { min: 0, max: 50, default: 0 },
  applicableBusinessTypes: ['skincare', 'hair-salon', 'tattoo', 'brow-lash'],
};

// Export all categories
export const ALL_SERVICE_CATEGORIES: ServiceCategory[] = [
  BODY_WAXING,
  FACIAL_WAXING,
  SUGARING,
  THREADING,
  MANICURE,
  PEDICURE,
  GEL_NAILS,
  ACRYLIC_NAILS,
  NAIL_ART,
  NAIL_REMOVAL,
  HAIRCUTS,
  HAIR_COLOR,
  HAIR_STYLING,
  HAIR_TREATMENTS,
  HAIR_EXTENSIONS,
  SHAVES,
  BEARD,
  SWEDISH_MASSAGE,
  DEEP_TISSUE,
  HOT_STONE,
  SPORTS_MASSAGE,
  AROMATHERAPY,
  FACIALS,
  CHEMICAL_PEELS,
  MICRODERMABRASION,
  LASH_EXTENSIONS,
  LASH_LIFT,
  BROW_LAMINATION,
  MICROBLADING,
  HENNA_BROWS,
  UV_BEDS,
  SPRAY_TAN,
  ORGANIC_TAN,
  TATTOOS,
  PIERCINGS,
  TATTOO_TOUCHUPS,
  SAUNA,
  STEAM_ROOM,
  HYDROTHERAPY,
  FLOAT,
  BODY_WRAPS,
  MUD_THERAPY,
  PACKAGES,
  MEMBERSHIPS,
  CONSULTATIONS,
];

/**
 * Get categories applicable for a given business type
 */
export function getCategoriesForBusinessType(businessTypeId: string | null | undefined): ServiceCategory[] {
  if (!businessTypeId) return ALL_SERVICE_CATEGORIES.filter((c) => c.applicableBusinessTypes.includes('waxing'));
  return ALL_SERVICE_CATEGORIES.filter((c) => c.applicableBusinessTypes.includes(businessTypeId));
}

/**
 * Get category by ID
 */
export function getCategoryById(id: string): ServiceCategory | undefined {
  return ALL_SERVICE_CATEGORIES.find((c) => c.id === id);
}
