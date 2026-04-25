/**
 * Business-Type-Specific Themes — 50 unique themes, 5 per niche
 * Each theme is crafted for its specific beauty business vertical.
 */

export interface NicheTheme {
  id: string;
  name: string;
  description: string;
  previewImage: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textMuted: string;
    border: string;
  };
}

// ============================================
// WAXING STUDIOS (5 themes)
// ============================================
export const WAXING_THEMES: NicheTheme[] = [
  {
    id: 'waxing-rose-gold',
    name: 'Rose Gold Elegance',
    description: 'Dorado rosado, mármol y tipografía serif. Sofisticado y femenino.',
    previewImage: '/themes/rose-gold-preview.jpg',
    colors: {
      primary: '#B76E79',
      secondary: '#E8C4C4',
      accent: '#D4AF37',
      background: '#FDF8F5',
      surface: '#FFFFFF',
      text: '#4A3728',
      textMuted: '#8B7355',
      border: '#E8D5D5',
    },
  },
  {
    id: 'waxing-soft-pink',
    name: 'Soft Pink Glow',
    description: 'Rosas pálidos y blancos cálidos. Dulce, acogedor y delicado.',
    previewImage: '/themes/soft-pink-preview.jpg',
    colors: {
      primary: '#FFB6C1',
      secondary: '#FFC0CB',
      accent: '#FF69B4',
      background: '#FFF5F7',
      surface: '#FFFFFF',
      text: '#5C3A3A',
      textMuted: '#A08080',
      border: '#F0D0D5',
    },
  },
  {
    id: 'waxing-clean-clinic',
    name: 'Clean Clinic',
    description: 'Blanco puro con acentos teal. Profesional, higiénico y médico.',
    previewImage: '/themes/clean-clinic-preview.jpg',
    colors: {
      primary: '#00A896',
      secondary: '#E0F2F1',
      accent: '#00BCD4',
      background: '#FAFAFA',
      surface: '#FFFFFF',
      text: '#263238',
      textMuted: '#78909C',
      border: '#E0E0E0',
    },
  },
  {
    id: 'waxing-lavender-calm',
    name: 'Lavender Calm',
    description: 'Tonos lavanda y violeta suave. Relajante antes del tratamiento.',
    previewImage: '/themes/lavender-calm-preview.jpg',
    colors: {
      primary: '#9370DB',
      secondary: '#E6E6FA',
      accent: '#BA55D3',
      background: '#F8F5FF',
      surface: '#FFFFFF',
      text: '#3D2C5E',
      textMuted: '#8A7BA8',
      border: '#DDD0F0',
    },
  },
  {
    id: 'waxing-coral-fresh',
    name: 'Coral Fresh',
    description: 'Coral vibrante con menta fresca. Energético y juvenil.',
    previewImage: '/themes/coral-fresh-preview.jpg',
    colors: {
      primary: '#FF7F50',
      secondary: '#FFA07A',
      accent: '#20B2AA',
      background: '#FFF8F5',
      surface: '#FFFFFF',
      text: '#4A2C20',
      textMuted: '#A08070',
      border: '#FFD0C0',
    },
  },
];

// ============================================
// NAIL SALONS (5 themes)
// ============================================
export const NAILS_THEMES: NicheTheme[] = [
  {
    id: 'nails-nude-neon',
    name: 'Nude & Neon',
    description: 'Nude minimal con acentos neón fucsia. Perfecto para Instagram.',
    previewImage: '/themes/nude-neon-preview.jpg',
    colors: {
      primary: '#F472B6',
      secondary: '#FBCFE8',
      accent: '#F59E0B',
      background: '#FDF2F8',
      surface: '#FFFFFF',
      text: '#1F2937',
      textMuted: '#6B7280',
      border: '#FCE7F3',
    },
  },
  {
    id: 'nails-pastel-pop',
    name: 'Pastel Pop',
    description: 'Pasteles suaves en rosa, lila y menta. Cute y moderno.',
    previewImage: '/themes/pastel-pop-preview.jpg',
    colors: {
      primary: '#F8BBD0',
      secondary: '#E1BEE7',
      accent: '#B2DFDB',
      background: '#FFF5F8',
      surface: '#FFFFFF',
      text: '#4A3A42',
      textMuted: '#8A7A82',
      border: '#F0D8E0',
    },
  },
  {
    id: 'nails-glamour-chrome',
    name: 'Glamour Chrome',
    description: 'Plata cromada, espejo y magenta. Luxury nail bar vibe.',
    previewImage: '/themes/glamour-chrome-preview.jpg',
    colors: {
      primary: '#C0C0C0',
      secondary: '#E8E8E8',
      accent: '#FF1493',
      background: '#F8F8FA',
      surface: '#FFFFFF',
      text: '#1A1A2E',
      textMuted: '#6B6B80',
      border: '#D0D0E0',
    },
  },
  {
    id: 'nails-marble-luxe',
    name: 'Marble Luxe',
    description: 'Mármol blanco, veines grises y detalles dorados. Alto nivel.',
    previewImage: '/themes/marble-luxe-preview.jpg',
    colors: {
      primary: '#A9A9A9',
      secondary: '#F0F0F0',
      accent: '#D4AF37',
      background: '#FAFAFA',
      surface: '#FFFFFF',
      text: '#2D2D2D',
      textMuted: '#7A7A7A',
      border: '#E0E0E0',
    },
  },
  {
    id: 'nails-bold-bright',
    name: 'Bold & Bright',
    description: 'Magenta eléctrico, cian y amarillo. Para el nail art más atrevido.',
    previewImage: '/themes/bold-bright-preview.jpg',
    colors: {
      primary: '#FF00FF',
      secondary: '#E0FFFF',
      accent: '#00FFFF',
      background: '#FFF8FF',
      surface: '#FFFFFF',
      text: '#1A0033',
      textMuted: '#7A5A99',
      border: '#F0D0FF',
    },
  },
];

// ============================================
// BARBER SHOPS (5 themes)
// ============================================
export const BARBER_THEMES: NicheTheme[] = [
  {
    id: 'barber-midnight',
    name: 'Midnight Barber',
    description: 'Negro mate, gris pizarra y acero. Masculino y urbano.',
    previewImage: '/themes/midnight-barber-preview.jpg',
    colors: {
      primary: '#2D2D2D',
      secondary: '#3A3A3A',
      accent: '#A0A0A0',
      background: '#1A1A1A',
      surface: '#252525',
      text: '#F0F0F0',
      textMuted: '#888888',
      border: '#3A3A3A',
    },
  },
  {
    id: 'barber-vintage-leather',
    name: 'Vintage Leather',
    description: 'Cuero marrón, madera tostada y latón antiguo. Clásico y robusto.',
    previewImage: '/themes/vintage-leather-preview.jpg',
    colors: {
      primary: '#8B4513',
      secondary: '#D2691E',
      accent: '#F5DEB3',
      background: '#2C1E14',
      surface: '#3E2B1A',
      text: '#F5E6D3',
      textMuted: '#B08D6E',
      border: '#5C3A21',
    },
  },
  {
    id: 'barber-industrial-steel',
    name: 'Industrial Steel',
    description: 'Acero, cemento y óxido. Urbano, rudo y moderno.',
    previewImage: '/themes/industrial-steel-preview.jpg',
    colors: {
      primary: '#708090',
      secondary: '#2F4F4F',
      accent: '#B22222',
      background: '#1C2520',
      surface: '#2A3530',
      text: '#E0E0E0',
      textMuted: '#889999',
      border: '#3A4A4A',
    },
  },
  {
    id: 'barber-classic-pole',
    name: 'Classic Barber Pole',
    description: 'Rojo, blanco y azul. El icónico look de barbería tradicional.',
    previewImage: '/themes/classic-pole-preview.jpg',
    colors: {
      primary: '#CC0000',
      secondary: '#0033AA',
      accent: '#FFFFFF',
      background: '#F5F5F5',
      surface: '#FFFFFF',
      text: '#1A1A1A',
      textMuted: '#666666',
      border: '#DDDDDD',
    },
  },
  {
    id: 'barber-matte-olive',
    name: 'Matte Olive',
    description: 'Verde oliva, caqui y arena. Militar, sobrio y elegante.',
    previewImage: '/themes/matte-olive-preview.jpg',
    colors: {
      primary: '#556B2F',
      secondary: '#6B8E23',
      accent: '#F0E68C',
      background: '#1A1F12',
      surface: '#252A18',
      text: '#E8E8D0',
      textMuted: '#889970',
      border: '#3A4528',
    },
  },
];

// ============================================
// HAIR SALONS (5 themes)
// ============================================
export const HAIR_THEMES: NicheTheme[] = [
  {
    id: 'hair-blanc-pur',
    name: 'Blanc Pur',
    description: 'Blanco hueso, champagne y dorado suave. Elegancia parisina.',
    previewImage: '/themes/blanc-pur-preview.jpg',
    colors: {
      primary: '#F5F0EB',
      secondary: '#E8DDD5',
      accent: '#C9B037',
      background: '#FAF9F7',
      surface: '#FFFFFF',
      text: '#3D3D3D',
      textMuted: '#888888',
      border: '#E5E0D8',
    },
  },
  {
    id: 'hair-chic-noir',
    name: 'Chic Noir',
    description: 'Negro absoluto con toques fucsia. Editorial y fashion.',
    previewImage: '/themes/chic-noir-preview.jpg',
    colors: {
      primary: '#111111',
      secondary: '#333333',
      accent: '#FF69B4',
      background: '#0A0A0A',
      surface: '#1A1A1A',
      text: '#FFFFFF',
      textMuted: '#AAAAAA',
      border: '#2A2A2A',
    },
  },
  {
    id: 'hair-blonde-ambition',
    name: 'Blonde Ambition',
    description: 'Rubio dorado, miel y caramelo. Cálido y luminoso.',
    previewImage: '/themes/blonde-ambition-preview.jpg',
    colors: {
      primary: '#DAA520',
      secondary: '#F0E68C',
      accent: '#B8860B',
      background: '#FFFBF0',
      surface: '#FFFFFF',
      text: '#4A3A1A',
      textMuted: '#A08050',
      border: '#F0E0C0',
    },
  },
  {
    id: 'hair-balayage-bronze',
    name: 'Balayage Bronze',
    description: 'Bronce, cobre y chocolate. Tonos tierra ricos y sofisticados.',
    previewImage: '/themes/balayage-bronze-preview.jpg',
    colors: {
      primary: '#CD853F',
      secondary: '#D2691E',
      accent: '#8B4513',
      background: '#FFF8F0',
      surface: '#FFFFFF',
      text: '#3D2A18',
      textMuted: '#8A6A4A',
      border: '#E8D0B0',
    },
  },
  {
    id: 'hair-editorial-grey',
    name: 'Editorial Grey',
    description: 'Grises fríos, plata y negro. Minimalista y de pasarela.',
    previewImage: '/themes/editorial-grey-preview.jpg',
    colors: {
      primary: '#808080',
      secondary: '#A9A9A9',
      accent: '#000000',
      background: '#F5F5F5',
      surface: '#FFFFFF',
      text: '#2D2D2D',
      textMuted: '#777777',
      border: '#D0D0D0',
    },
  },
];

// ============================================
// MASSAGE & SPA (5 themes)
// ============================================
export const MASSAGE_THEMES: NicheTheme[] = [
  {
    id: 'massage-zen-spa',
    name: 'Zen Spa',
    description: 'Verde salvia, arenas suaves y blanco roto. Relajante y armonioso.',
    previewImage: '/themes/zen-spa-preview.jpg',
    colors: {
      primary: '#7B9E87',
      secondary: '#A8C4B0',
      accent: '#D4AF7A',
      background: '#F7F5F0',
      surface: '#FFFFFF',
      text: '#3D3D3D',
      textMuted: '#7A7A7A',
      border: '#E0DDD5',
    },
  },
  {
    id: 'massage-ocean-blue',
    name: 'Ocean Blue',
    description: 'Azules profundos, aguamarina y blanco espuma. Sereno como el mar.',
    previewImage: '/themes/ocean-blue-preview.jpg',
    colors: {
      primary: '#4682B4',
      secondary: '#87CEEB',
      accent: '#20B2AA',
      background: '#F0F8FF',
      surface: '#FFFFFF',
      text: '#1A3A5C',
      textMuted: '#5A7A9A',
      border: '#C0D8E8',
    },
  },
  {
    id: 'massage-sand-stone',
    name: 'Sand & Stone',
    description: 'Arena cálida, piedra gris y madera natural. Terrenal y grounding.',
    previewImage: '/themes/sand-stone-preview.jpg',
    colors: {
      primary: '#D2B48C',
      secondary: '#F4A460',
      accent: '#8B4513',
      background: '#FAF5EF',
      surface: '#FFFFFF',
      text: '#3D2E1A',
      textMuted: '#8A7A60',
      border: '#E0D0B8',
    },
  },
  {
    id: 'massage-bamboo-forest',
    name: 'Bamboo Forest',
    description: 'Verde bambú, musgo y crema. Naturaleza pura y renovación.',
    previewImage: '/themes/bamboo-forest-preview.jpg',
    colors: {
      primary: '#228B22',
      secondary: '#32CD32',
      accent: '#F5F5DC',
      background: '#F0F5E8',
      surface: '#FFFFFF',
      text: '#1A3A1A',
      textMuted: '#5A7A5A',
      border: '#C8D8B8',
    },
  },
  {
    id: 'massage-warm-amber',
    name: 'Warm Amber',
    description: 'Ámbar, miel y canela. Cálido, acogedor y terapéutico.',
    previewImage: '/themes/warm-amber-preview.jpg',
    colors: {
      primary: '#FFBF00',
      secondary: '#FFD700',
      accent: '#8B4513',
      background: '#FFFBF0',
      surface: '#FFFFFF',
      text: '#4A2E0A',
      textMuted: '#8A6A2A',
      border: '#F0D8A0',
    },
  },
];

// ============================================
// SKIN CARE / FACIAL CLINICS (5 themes)
// ============================================
export const SKINCARE_THEMES: NicheTheme[] = [
  {
    id: 'skincare-botanical',
    name: 'Botanical',
    description: 'Verde musgo, tonos tierra y crema. Orgánico y natural.',
    previewImage: '/themes/botanical-preview.jpg',
    colors: {
      primary: '#5D7A5E',
      secondary: '#8FAE8F',
      accent: '#C4A77D',
      background: '#F6F4EE',
      surface: '#FFFFFF',
      text: '#2F3E2F',
      textMuted: '#6B7E6B',
      border: '#D8D4C8',
    },
  },
  {
    id: 'skincare-clinical-white',
    name: 'Clinical White',
    description: 'Blanco estéril, azul hielo y gris plata. Profesional y médico.',
    previewImage: '/themes/clinical-white-preview.jpg',
    colors: {
      primary: '#4169E1',
      secondary: '#E8F0FE',
      accent: '#00BCD4',
      background: '#FAFBFC',
      surface: '#FFFFFF',
      text: '#1A2A3A',
      textMuted: '#6B7B8B',
      border: '#E0E4E8',
    },
  },
  {
    id: 'skincare-rose-water',
    name: 'Rose Water',
    description: 'Rosa pétalo, agua de rosas y perla. Delicado e hidratante.',
    previewImage: '/themes/rose-water-preview.jpg',
    colors: {
      primary: '#FF69B4',
      secondary: '#FFC0CB',
      accent: '#FFB6C1',
      background: '#FFF5F8',
      surface: '#FFFFFF',
      text: '#5C2A3A',
      textMuted: '#A07080',
      border: '#F0D0DC',
    },
  },
  {
    id: 'skincare-citrus-fresh',
    name: 'Citrus Fresh',
    description: 'Naranja, limón y verde lima. Vitaminado y energizante.',
    previewImage: '/themes/citrus-fresh-preview.jpg',
    colors: {
      primary: '#FFA500',
      secondary: '#FFD700',
      accent: '#32CD32',
      background: '#FFFCF5',
      surface: '#FFFFFF',
      text: '#4A3A0A',
      textMuted: '#8A7A30',
      border: '#F0E0A0',
    },
  },
  {
    id: 'skincare-pearl-radiance',
    name: 'Pearl Radiance',
    description: 'Perla iridiscente, lavanda suave y blanco nácar. Luminoso.',
    previewImage: '/themes/pearl-radiance-preview.jpg',
    colors: {
      primary: '#E6E6FA',
      secondary: '#F0E8FF',
      accent: '#DDA0DD',
      background: '#FAFAFF',
      surface: '#FFFFFF',
      text: '#2A2A40',
      textMuted: '#6B6B8A',
      border: '#E0E0F0',
    },
  },
];

// ============================================
// BROW & LASH STUDIOS (5 themes)
// ============================================
export const BROWLASH_THEMES: NicheTheme[] = [
  {
    id: 'browlash-flutter-pink',
    name: 'Flutter Pink',
    description: 'Rosa pestaña, chicle y blanco. Cute, femenino y trendy.',
    previewImage: '/themes/flutter-pink-preview.jpg',
    colors: {
      primary: '#FF69B4',
      secondary: '#FFC0CB',
      accent: '#FFFFFF',
      background: '#FFF5F8',
      surface: '#FFFFFF',
      text: '#4A1A30',
      textMuted: '#8A5A70',
      border: '#F0D0E0',
    },
  },
  {
    id: 'browlash-midnight-glam',
    name: 'Midnight Glam',
    description: 'Negro, púrpura profundo y dorado. Lash extension luxury.',
    previewImage: '/themes/midnight-glam-preview.jpg',
    colors: {
      primary: '#4B0082',
      secondary: '#1A1A1A',
      accent: '#D4AF37',
      background: '#0D0D1A',
      surface: '#1A1A2E',
      text: '#F0E8FF',
      textMuted: '#8A7AB0',
      border: '#2A2A4A',
    },
  },
  {
    id: 'browlash-soft-mink',
    name: 'Soft Mink',
    description: 'Marrón visón, toffe y crema. Natural, fluffy y elegante.',
    previewImage: '/themes/soft-mink-preview.jpg',
    colors: {
      primary: '#8B7355',
      secondary: '#A0522D',
      accent: '#F5F5DC',
      background: '#F8F5EF',
      surface: '#FFFFFF',
      text: '#3D2E18',
      textMuted: '#7A6A50',
      border: '#E0D0B8',
    },
  },
  {
    id: 'browlash-crystal-clear',
    name: 'Crystal Clear',
    description: 'Turquesa claro, hielo y blanco puro. Fresh y clean.',
    previewImage: '/themes/crystal-clear-preview.jpg',
    colors: {
      primary: '#00CED1',
      secondary: '#E0FFFF',
      accent: '#F0FFFF',
      background: '#F0FCFF',
      surface: '#FFFFFF',
      text: '#0A3A3A',
      textMuted: '#5A8A8A',
      border: '#C0E8E8',
    },
  },
  {
    id: 'browlash-chocolate-glow',
    name: 'Chocolate Glow',
    description: 'Chocolate caliente, caramelo y vainilla. Warm y inviting.',
    previewImage: '/themes/chocolate-glow-preview.jpg',
    colors: {
      primary: '#D2691E',
      secondary: '#8B4513',
      accent: '#FFDAB9',
      background: '#FFF5E8',
      surface: '#FFFFFF',
      text: '#3D1A08',
      textMuted: '#8A5A38',
      border: '#E8D0B0',
    },
  },
];

// ============================================
// TANNING SALONS (5 themes)
// ============================================
export const TANNING_THEMES: NicheTheme[] = [
  {
    id: 'tanning-golden-hour',
    name: 'Golden Hour',
    description: 'Ámbar cálido, terracota y dorado. Sol y bronceado.',
    previewImage: '/themes/golden-hour-preview.jpg',
    colors: {
      primary: '#D97706',
      secondary: '#F59E0B',
      accent: '#92400E',
      background: '#FFFBEB',
      surface: '#FFFFFF',
      text: '#451A03',
      textMuted: '#92400E',
      border: '#FDE68A',
    },
  },
  {
    id: 'tanning-tropical-sunset',
    name: 'Tropical Sunset',
    description: 'Naranja tomate, rojo coral y amarillo dorado. Playa tropical.',
    previewImage: '/themes/tropical-sunset-preview.jpg',
    colors: {
      primary: '#FF6347',
      secondary: '#FFD700',
      accent: '#FF4500',
      background: '#FFF8F0',
      surface: '#FFFFFF',
      text: '#4A1A0A',
      textMuted: '#8A4A2A',
      border: '#F0C8A0',
    },
  },
  {
    id: 'tanning-bronze-goddess',
    name: 'Bronze Goddess',
    description: 'Bronce profundo, cobrizo y chocolate. Piel radiante.',
    previewImage: '/themes/bronze-goddess-preview.jpg',
    colors: {
      primary: '#CD853F',
      secondary: '#D2691E',
      accent: '#8B4513',
      background: '#FFF5E8',
      surface: '#FFFFFF',
      text: '#3D1A08',
      textMuted: '#8A5A30',
      border: '#E0C0A0',
    },
  },
  {
    id: 'tanning-coconut-white',
    name: 'Coconut White',
    description: 'Blanco coco, arena y turquesa. Tropical y fresco.',
    previewImage: '/themes/coconut-white-preview.jpg',
    colors: {
      primary: '#FFFFF0',
      secondary: '#FAEBD7',
      accent: '#00CED1',
      background: '#FFFCF8',
      surface: '#FFFFFF',
      text: '#2A2A20',
      textMuted: '#6A6A5A',
      border: '#E8E0D0',
    },
  },
  {
    id: 'tanning-beach-sand',
    name: 'Beach Sand',
    description: 'Arena, agua cristalina y cielo azul. Día de playa.',
    previewImage: '/themes/beach-sand-preview.jpg',
    colors: {
      primary: '#F4A460',
      secondary: '#D2B48C',
      accent: '#87CEEB',
      background: '#FFFBF5',
      surface: '#FFFFFF',
      text: '#3D2A18',
      textMuted: '#7A6A50',
      border: '#E8D8C0',
    },
  },
];

// ============================================
// TATTOO & PIERCING STUDIOS (5 themes)
// ============================================
export const TATTOO_THEMES: NicheTheme[] = [
  {
    id: 'tattoo-minimal-ink',
    name: 'Minimal Ink',
    description: 'Blanco puro, negro intenso y tipografía bold. Estética tattoo.',
    previewImage: '/themes/minimal-ink-preview.jpg',
    colors: {
      primary: '#000000',
      secondary: '#1F1F1F',
      accent: '#E5E5E5',
      background: '#FFFFFF',
      surface: '#FFFFFF',
      text: '#000000',
      textMuted: '#6B7280',
      border: '#E5E5E5',
    },
  },
  {
    id: 'tattoo-dark-gothic',
    name: 'Dark Gothic',
    description: 'Negro, púrpura oscuro y carmesí. Misterioso e intenso.',
    previewImage: '/themes/dark-gothic-preview.jpg',
    colors: {
      primary: '#4B0082',
      secondary: '#1A0A1A',
      accent: '#DC143C',
      background: '#0A0A0A',
      surface: '#1A1A1A',
      text: '#E0E0E0',
      textMuted: '#7A5A7A',
      border: '#2A1A2A',
    },
  },
  {
    id: 'tattoo-neo-traditional',
    name: 'Neo Traditional',
    description: 'Rojo anaranjado, azul eléctrico y amarillo. Clásico tattoo americano.',
    previewImage: '/themes/neo-traditional-preview.jpg',
    colors: {
      primary: '#FF4500',
      secondary: '#1E90FF',
      accent: '#FFD700',
      background: '#FFF8F0',
      surface: '#FFFFFF',
      text: '#1A0A0A',
      textMuted: '#6A4A2A',
      border: '#F0D8C0',
    },
  },
  {
    id: 'tattoo-street-art',
    name: 'Street Art',
    description: 'Magenta, verde neón y negro. Graffiti y urban art.',
    previewImage: '/themes/street-art-preview.jpg',
    colors: {
      primary: '#FF00FF',
      secondary: '#1A1A1A',
      accent: '#00FF00',
      background: '#0A0A0A',
      surface: '#1A1A1A',
      text: '#F0F0F0',
      textMuted: '#7A7A7A',
      border: '#2A2A2A',
    },
  },
  {
    id: 'tattoo-japanese-irezumi',
    name: 'Japanese Irezumi',
    description: 'Rojo japonés, negro sumi-e y dorado. Arte tradicional japonés.',
    previewImage: '/themes/japanese-irezumi-preview.jpg',
    colors: {
      primary: '#DC143C',
      secondary: '#000000',
      accent: '#FFD700',
      background: '#0A0A0A',
      surface: '#1A1A1A',
      text: '#F5E8E8',
      textMuted: '#8A6060',
      border: '#2A1A1A',
    },
  },
];

// ============================================
// WELLNESS CENTERS (5 themes)
// ============================================
export const WELLNESS_THEMES: NicheTheme[] = [
  {
    id: 'wellness-himalayan-salt',
    name: 'Himalayan Salt',
    description: 'Rosa sal, blanco cristal y tonos cálidos. Detox y purificación.',
    previewImage: '/themes/himalayan-salt-preview.jpg',
    colors: {
      primary: '#FFB6C1',
      secondary: '#FFC0CB',
      accent: '#FFFFFF',
      background: '#FFF8F8',
      surface: '#FFFFFF',
      text: '#4A2A30',
      textMuted: '#8A5A60',
      border: '#F0D0D5',
    },
  },
  {
    id: 'wellness-forest-bathing',
    name: 'Forest Bathing',
    description: 'Verde bosque, musgo y marrón tierra. Shinrin-yoku inspired.',
    previewImage: '/themes/forest-bathing-preview.jpg',
    colors: {
      primary: '#228B22',
      secondary: '#006400',
      accent: '#F5F5DC',
      background: '#F0F5E8',
      surface: '#FFFFFF',
      text: '#1A2E1A',
      textMuted: '#5A7A5A',
      border: '#C8D8B8',
    },
  },
  {
    id: 'wellness-ayurveda',
    name: 'Ayurveda',
    description: 'Azafrán, oro antiguo y púrpura real. Medicina ancestral.',
    previewImage: '/themes/ayurveda-preview.jpg',
    colors: {
      primary: '#FF8C00',
      secondary: '#FFD700',
      accent: '#800080',
      background: '#FFFBF0',
      surface: '#FFFFFF',
      text: '#3D1A08',
      textMuted: '#8A6A20',
      border: '#F0D8A0',
    },
  },
  {
    id: 'wellness-thermal-springs',
    name: 'Thermal Springs',
    description: 'Azul geotérmico, vapor blanco y gris piedra. Aguas termales.',
    previewImage: '/themes/thermal-springs-preview.jpg',
    colors: {
      primary: '#4682B4',
      secondary: '#B0C4DE',
      accent: '#F0E68C',
      background: '#F0F8FF',
      surface: '#FFFFFF',
      text: '#1A3A5C',
      textMuted: '#5A7A9A',
      border: '#C0D8E8',
    },
  },
  {
    id: 'wellness-zen-spa',
    name: 'Zen Spa',
    description: 'Verde salvia, arenas suaves y blanco roto. Relajante y armonioso.',
    previewImage: '/themes/zen-spa-preview.jpg',
    colors: {
      primary: '#7B9E87',
      secondary: '#A8C4B0',
      accent: '#D4AF7A',
      background: '#F7F5F0',
      surface: '#FFFFFF',
      text: '#3D3D3D',
      textMuted: '#7A7A7A',
      border: '#E0DDD5',
    },
  },
];

// ============================================
// ALL THEMES COMBINED
// ============================================
export const ALL_NICHE_THEMES: NicheTheme[] = [
  ...WAXING_THEMES,
  ...NAILS_THEMES,
  ...BARBER_THEMES,
  ...HAIR_THEMES,
  ...MASSAGE_THEMES,
  ...SKINCARE_THEMES,
  ...BROWLASH_THEMES,
  ...TANNING_THEMES,
  ...TATTOO_THEMES,
  ...WELLNESS_THEMES,
];

// ============================================
// HELPERS
// ============================================

const THEME_MAP: Record<string, NicheTheme> = Object.fromEntries(
  ALL_NICHE_THEMES.map((t) => [t.id, t])
);

export function getThemeById(id: string): NicheTheme | undefined {
  return THEME_MAP[id];
}

export function getThemesForBusinessType(businessTypeId: string): NicheTheme[] {
  switch (businessTypeId) {
    case 'waxing': return WAXING_THEMES;
    case 'nails': return NAILS_THEMES;
    case 'barber': return BARBER_THEMES;
    case 'hair-salon': return HAIR_THEMES;
    case 'massage': return MASSAGE_THEMES;
    case 'skincare': return SKINCARE_THEMES;
    case 'brow-lash': return BROWLASH_THEMES;
    case 'tanning': return TANNING_THEMES;
    case 'tattoo': return TATTOO_THEMES;
    case 'wellness': return WELLNESS_THEMES;
    default: return WAXING_THEMES;
  }
}

export function getDefaultThemeIdForBusinessType(businessTypeId: string): string {
  const themes = getThemesForBusinessType(businessTypeId);
  return themes[0]?.id || 'waxing-rose-gold';
}

export function getThemeColors(themeId: string) {
  const theme = getThemeById(themeId);
  if (!theme) return WAXING_THEMES[0].colors;
  return theme.colors;
}
