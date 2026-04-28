// ============================================
// DEMO DATA — Returns when Prisma DB is unavailable
// Pure localStorage demo mode for Vercel deployment
// ============================================

export interface DemoCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  sortOrder: number;
  gender: string;
  isActive: boolean;
  businessType: string;
  createdAt: string;
  updatedAt: string;
}

export interface DemoService {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  duration: number;
  imageUrl: string | null;
  gender: string;
  bufferBefore: number;
  bufferAfter: number;
  isActive: boolean;
  sortOrder: number;
  categoryId: string;
  category: DemoCategory;
  createdAt: string;
  updatedAt: string;
}

function cat(
  id: string,
  name: string,
  slug: string,
  businessType: string,
  sortOrder: number,
  gender = 'FEMALE'
): DemoCategory {
  return {
    id,
    name,
    slug,
    description: null,
    imageUrl: null,
    sortOrder,
    gender,
    isActive: true,
    businessType,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

function svc(
  id: string,
  name: string,
  slug: string,
  price: number,
  duration: number,
  category: DemoCategory,
  description: string,
  gender = 'FEMALE'
): DemoService {
  return {
    id,
    name,
    slug,
    description,
    price,
    duration,
    imageUrl: null,
    gender,
    bufferBefore: 0,
    bufferAfter: 0,
    isActive: true,
    sortOrder: 0,
    categoryId: category.id,
    category,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

// ============================================================
// WAXING
// ============================================================
const waxCatFace = cat('wc1', 'Face', 'face', 'waxing', 1);
const waxCatMid = cat('wc2', 'Mid Body', 'mid-body', 'waxing', 2);
const waxCatLower = cat('wc3', 'Lower Body', 'lower-body', 'waxing', 3);
const waxCatMens = cat('wc4', "Men's", 'mens', 'waxing', 4, 'MALE');

const waxingServices: DemoService[] = [
  svc('ws1', 'Brow Design', 'brow-design', 25, 20, waxCatFace, 'Professional eyebrow shaping and definition'),
  svc('ws2', 'Upper Lip Wax', 'upper-lip-wax', 15, 15, waxCatFace, 'Smooth upper lip waxing'),
  svc('ws3', 'Chin Wax', 'chin-wax', 15, 15, waxCatFace, 'Chin hair removal'),
  svc('ws4', 'Sideburn Wax', 'sideburn-wax', 20, 15, waxCatFace, 'Sideburn shaping and waxing'),
  svc('ws5', 'Full Face Wax', 'full-face-wax', 55, 45, waxCatFace, 'Complete facial waxing including brow, lip, chin, and cheeks'),
  svc('ws6', 'Underarm Wax', 'underarm-wax', 25, 20, waxCatMid, 'Underarm hair removal'),
  svc('ws7', 'Full Arm Wax', 'full-arm-wax', 55, 45, waxCatMid, 'Complete arm waxing from shoulder to wrist'),
  svc('ws8', 'Half Arm Wax', 'half-arm-wax', 35, 30, waxCatMid, 'Upper or lower arm waxing'),
  svc('ws9', 'Back Wax', 'back-wax', 65, 45, waxCatMid, 'Back hair removal'),
  svc('ws10', 'Bikini Wax', 'bikini-wax', 35, 30, waxCatLower, 'Classic bikini line waxing'),
  svc('ws11', 'Brazilian Wax', 'brazilian-wax', 65, 45, waxCatLower, 'Full Brazilian waxing - all hair removed'),
  svc('ws12', 'Half Leg Wax', 'half-leg-wax', 45, 35, waxCatLower, 'Upper or lower leg waxing'),
  svc('ws13', 'Full Leg Wax', 'full-leg-wax', 75, 60, waxCatLower, 'Complete leg waxing from thigh to ankle'),
  svc('ws14', "Men's Brow Wax", 'mens-brow-wax', 25, 20, waxCatMens, "Men's eyebrow grooming", 'MALE'),
  svc('ws15', "Men's Back Wax", 'mens-back-wax', 85, 45, waxCatMens, "Men's back hair removal", 'MALE'),
  svc('ws16', "Men's Chest Wax", 'mens-chest-wax', 75, 45, waxCatMens, "Men's chest hair removal", 'MALE'),
];

// ============================================================
// BARBER
// ============================================================
const barbCatHaircuts = cat('bc1', 'Haircuts', 'haircuts', 'barber', 1, 'MALE');
const barbCatBeard = cat('bc2', 'Beard Grooming', 'beard-grooming', 'barber', 2, 'MALE');
const barbCatShave = cat('bc3', 'Hot Towel Shaves', 'hot-towel-shaves', 'barber', 3, 'MALE');
const barbCatColor = cat('bc4', 'Hair Color', 'hair-color', 'barber', 4, 'MALE');

const barberServices: DemoService[] = [
  svc('bs1', 'Classic Cut', 'classic-cut', 35, 30, barbCatHaircuts, 'Traditional barber cut with clippers and scissors finish', 'MALE'),
  svc('bs2', 'Fade & Taper', 'fade-taper', 40, 35, barbCatHaircuts, 'Precision fade with seamless taper blend', 'MALE'),
  svc('bs3', 'Buzz Cut', 'buzz-cut', 25, 20, barbCatHaircuts, 'All-over clipper cut with your preferred guard length', 'MALE'),
  svc('bs4', 'Kids Cut (Under 12)', 'kids-cut', 25, 25, barbCatHaircuts, 'Gentle cut designed for young gentlemen', 'MALE'),
  svc('bs5', 'Line Up & Edge', 'line-up-edge', 20, 15, barbCatHaircuts, 'Sharp line-up with razor edge detailing', 'MALE'),
  svc('bs6', 'Beard Trim', 'beard-trim', 20, 20, barbCatBeard, 'Shape and tidy your beard with precision', 'MALE'),
  svc('bs7', 'Beard Sculpt', 'beard-sculpt', 35, 30, barbCatBeard, 'Full beard shaping with hot towel and oils', 'MALE'),
  svc('bs8', 'Mustache Trim', 'mustache-trim', 12, 10, barbCatBeard, 'Precision mustache shaping and styling', 'MALE'),
  svc('bs9', 'Classic Hot Towel Shave', 'classic-hot-shave', 45, 40, barbCatShave, 'Traditional straight razor shave with hot towels', 'MALE'),
  svc('bs10', 'Head Shave', 'head-shave', 40, 35, barbCatShave, 'Smooth head shave with hot towel treatment', 'MALE'),
  svc('bs11', 'Neck Clean-Up', 'neck-cleanup', 15, 10, barbCatShave, 'Clean neck line with straight razor', 'MALE'),
  svc('bs12', 'Gray Blending', 'gray-blending', 35, 30, barbCatColor, 'Subtle color to blend away gray naturally', 'MALE'),
  svc('bs13', 'Full Color', 'full-color', 55, 60, barbCatColor, 'Complete hair color transformation', 'MALE'),
  svc('bs14', 'Highlights', 'highlights', 45, 45, barbCatColor, 'Add dimension with custom highlights', 'MALE'),
];

// ============================================================
// NAILS
// ============================================================
const nailCatManis = cat('nc1', 'Manicures', 'manicures', 'nails', 1);
const nailCatPedis = cat('nc2', 'Pedicures', 'pedicures', 'nails', 2);
const nailCatEnhance = cat('nc3', 'Nail Enhancements', 'nail-enhancements', 'nails', 3);
const nailCatArt = cat('nc4', 'Nail Art', 'nail-art', 'nails', 4);

const nailServices: DemoService[] = [
  svc('ns1', 'Classic Manicure', 'classic-manicure', 25, 30, nailCatManis, 'Nail shaping, cuticle care, hand massage, and polish'),
  svc('ns2', 'Gel Manicure', 'gel-manicure', 40, 45, nailCatManis, 'Long-lasting gel polish with full cuticle care'),
  svc('ns3', 'Spa Manicure', 'spa-manicure', 45, 50, nailCatManis, 'Luxury manicure with exfoliation, mask, and extended massage'),
  svc('ns4', 'Express Manicure', 'express-manicure', 18, 20, nailCatManis, 'Quick shape and polish for busy schedules'),
  svc('ns5', 'Classic Pedicure', 'classic-pedicure', 35, 40, nailCatPedis, 'Foot soak, exfoliation, nail care, and polish'),
  svc('ns6', 'Gel Pedicure', 'gel-pedicure', 50, 50, nailCatPedis, 'Gel polish pedicure with full foot care'),
  svc('ns7', 'Spa Pedicure', 'spa-pedicure', 60, 60, nailCatPedis, 'Luxury pedicure with hot stone massage and paraffin'),
  svc('ns8', 'Deluxe Pedicure', 'deluxe-pedicure', 75, 75, nailCatPedis, 'Ultimate pampering with mask, scrub, and extended massage'),
  svc('ns9', 'Full Acrylic Set', 'full-acrylic', 55, 60, nailCatEnhance, 'Classic acrylic nail extensions with your choice of shape'),
  svc('ns10', 'Acrylic Fill-In', 'acrylic-fill', 35, 45, nailCatEnhance, 'Fill and reshape existing acrylic nails'),
  svc('ns11', 'Dip Powder Set', 'dip-powder', 50, 50, nailCatEnhance, 'Durable dip powder nails in any color'),
  svc('ns12', 'Builder Gel Overlay', 'builder-gel', 45, 50, nailCatEnhance, 'Strong gel overlay for natural nail strengthening'),
  svc('ns13', 'Basic Nail Art', 'basic-nail-art', 10, 15, nailCatArt, 'Simple designs: dots, lines, and accents'),
  svc('ns14', 'Custom Nail Art', 'custom-nail-art', 25, 30, nailCatArt, 'Hand-painted custom designs per nail'),
  svc('ns15', 'Chrome / Mirror Finish', 'chrome-nails', 20, 20, nailCatArt, 'Metallic chrome or mirror powder application'),
  svc('ns16', 'French Tips', 'french-tips', 15, 20, nailCatArt, 'Classic or colored French tip design'),
];

// ============================================================
// HAIR
// ============================================================
const hairCatCuts = cat('hc1', "Women's Cuts", 'womens-cuts', 'hair', 1);
const hairCatColor = cat('hc2', 'Color Services', 'color-services', 'hair', 2);
const hairCatTreat = cat('hc3', 'Treatments', 'treatments', 'hair', 3);
const hairCatStyle = cat('hc4', 'Styling', 'styling', 'hair', 4);

const hairServices: DemoService[] = [
  svc('hs1', "Women's Haircut", 'womens-haircut', 55, 45, hairCatCuts, 'Custom cut tailored to your face shape and style'),
  svc('hs2', 'Trim & Shape', 'trim-shape', 35, 30, hairCatCuts, 'Maintenance trim to keep your style fresh'),
  svc('hs3', 'Layered Cut', 'layered-cut', 65, 50, hairCatCuts, 'Full layered cut for volume and movement'),
  svc('hs4', 'Bang Trim', 'bang-trim', 15, 15, hairCatCuts, 'Quick bang shaping and trimming'),
  svc('hs5', 'Full Color', 'hair-full-color', 85, 90, hairCatColor, 'All-over permanent or demi-permanent color'),
  svc('hs6', 'Root Touch-Up', 'root-touchup', 55, 60, hairCatColor, 'Blend regrowth with seamless color match'),
  svc('hs7', 'Highlights / Lowlights', 'highlights-lowlights', 95, 120, hairCatColor, 'Foil highlights or lowlights for dimension'),
  svc('hs8', 'Balayage', 'balayage', 150, 150, hairCatColor, 'Hand-painted sun-kissed color technique'),
  svc('hs9', 'Deep Conditioning', 'deep-conditioning', 35, 30, hairCatTreat, 'Intensive moisture treatment for dry hair'),
  svc('hs10', 'Keratin Treatment', 'keratin-treatment', 200, 150, hairCatTreat, 'Smoothing keratin treatment for frizz-free hair'),
  svc('hs11', 'Scalp Treatment', 'scalp-treatment', 45, 35, hairCatTreat, 'Revitalizing scalp treatment for healthy growth'),
  svc('hs12', 'Blowout', 'blowout', 45, 45, hairCatStyle, 'Wash and professional blow-dry styling'),
  svc('hs13', 'Updo / Special Event', 'updo-event', 85, 60, hairCatStyle, 'Elegant updo for weddings, proms, and events'),
  svc('hs14', 'Curl / Wave Set', 'curl-wave-set', 55, 50, hairCatStyle, 'Beautiful curls or waves with hot tools'),
];

// ============================================================
// TATTOO
// ============================================================
const tattooCatCustom = cat('tc1', 'Custom Tattoos', 'custom-tattoos', 'tattoo', 1);
const tattooCatCover = cat('tc2', 'Cover-Ups', 'cover-ups', 'tattoo', 2);
const tattooCatPiercing = cat('tc3', 'Piercings', 'piercings', 'tattoo', 3);
const tattooCatRemoval = cat('tc4', 'Tattoo Removal', 'tattoo-removal', 'tattoo', 4);

const tattooServices: DemoService[] = [
  svc('tts1', 'Small Custom Tattoo', 'small-custom-tattoo', 120, 60, tattooCatCustom, 'Personalized small design up to 3x3 inches'),
  svc('tts2', 'Medium Custom Tattoo', 'medium-custom-tattoo', 250, 120, tattooCatCustom, 'Custom design up to 6x6 inches'),
  svc('tts3', 'Large Custom Tattoo', 'large-custom-tattoo', 500, 240, tattooCatCustom, 'Large scale custom piece, priced per session'),
  svc('tts4', 'Portrait Tattoo', 'portrait-tattoo', 400, 180, tattooCatCustom, 'Realistic portrait work by specialist artist'),
  svc('tts5', 'Small Cover-Up', 'small-cover-up', 200, 90, tattooCatCover, 'Cover existing tattoo up to 3x3 inches'),
  svc('tts6', 'Large Cover-Up', 'large-cover-up', 450, 180, tattooCatCover, 'Transform larger existing tattoos with custom design'),
  svc('tts7', 'Ear Piercing', 'ear-piercing', 45, 30, tattooCatPiercing, 'Lobe, helix, tragus, or conch piercing'),
  svc('tts8', 'Nose Piercing', 'nose-piercing', 55, 30, tattooCatPiercing, 'Nostril or septum piercing'),
  svc('tts9', 'Body Piercing', 'body-piercing', 65, 30, tattooCatPiercing, 'Navel, eyebrow, lip, or dermal piercing'),
  svc('tts10', 'Laser Tattoo Removal - Small', 'laser-removal-small', 150, 30, tattooCatRemoval, 'Laser removal session for small tattoos'),
  svc('tts11', 'Laser Tattoo Removal - Medium', 'laser-removal-medium', 250, 45, tattooCatRemoval, 'Laser removal session for medium tattoos'),
  svc('tts12', 'Tattoo Touch-Up', 'tattoo-touch-up', 80, 45, tattooCatCustom, 'Refresh and perfect an existing tattoo'),
];

// ============================================================
// MASSAGE / SPA / WELLNESS
// ============================================================
const massageCatRelax = cat('mc1', 'Relaxation Massage', 'relaxation-massage', 'massage', 1);
const massageCatTherapeutic = cat('mc2', 'Therapeutic Massage', 'therapeutic-massage', 'massage', 2);
const massageCatBody = cat('mc3', 'Body Treatments', 'body-treatments', 'massage', 3);

const massageServices: DemoService[] = [
  svc('ms1', 'Swedish Massage', 'swedish-massage', 85, 60, massageCatRelax, 'Classic full-body massage for relaxation and stress relief'),
  svc('ms2', 'Hot Stone Massage', 'hot-stone-massage', 120, 90, massageCatRelax, 'Heated stones placed on key points for deep relaxation'),
  svc('ms3', 'Aromatherapy Massage', 'aromatherapy-massage', 100, 75, massageCatRelax, 'Essential oils combined with gentle massage techniques'),
  svc('ms4', 'Deep Tissue Massage', 'deep-tissue-massage', 110, 60, massageCatTherapeutic, 'Targets chronic tension and muscle knots'),
  svc('ms5', 'Sports Massage', 'sports-massage', 95, 60, massageCatTherapeutic, 'Designed for athletes to improve performance and recovery'),
  svc('ms6', 'Trigger Point Therapy', 'trigger-point-therapy', 90, 60, massageCatTherapeutic, 'Focused pressure on specific muscle tension points'),
  svc('ms7', 'Body Scrub', 'body-scrub', 75, 45, massageCatBody, 'Exfoliating treatment to remove dead skin cells'),
  svc('ms8', 'Body Wrap', 'body-wrap', 95, 60, massageCatBody, 'Detoxifying wrap with mud, algae, or clay'),
  svc('ms9', 'Couples Massage', 'couples-massage', 180, 60, massageCatRelax, 'Side-by-side massage for two in a private suite'),
];

// ============================================================
// SKINCARE / FACIALS
// ============================================================
const skinCatFacials = cat('sc1', 'Facials', 'facials', 'skincare', 1);
const skinCatPeels = cat('sc2', 'Chemical Peels', 'chemical-peels', 'skincare', 2);
const skinCatAdvanced = cat('sc3', 'Advanced Treatments', 'advanced-treatments', 'skincare', 3);

const skincareServices: DemoService[] = [
  svc('ss1', 'Classic Facial', 'classic-facial', 85, 60, skinCatFacials, 'Deep cleanse, exfoliation, extractions, mask, and moisturizer'),
  svc('ss2', 'Anti-Aging Facial', 'anti-aging-facial', 120, 75, skinCatFacials, 'Targeting fine lines and wrinkles with collagen boosters'),
  svc('ss3', 'Acne Facial', 'acne-facial', 95, 60, skinCatFacials, 'Deep pore cleansing and treatment for acne-prone skin'),
  svc('ss4', 'Hydrating Facial', 'hydrating-facial', 90, 60, skinCatFacials, 'Intense moisture infusion for dry and dehydrated skin'),
  svc('ss5', 'Glycolic Peel', 'glycolic-peel', 110, 45, skinCatPeels, 'Exfoliating peel for brighter, smoother skin texture'),
  svc('ss6', 'Salicylic Peel', 'salicylic-peel', 110, 45, skinCatPeels, 'Deep cleaning peel ideal for oily and acne-prone skin'),
  svc('ss7', 'Microneedling', 'microneedling', 250, 60, skinCatAdvanced, 'Collagen induction therapy for scars and wrinkles'),
  svc('ss8', 'LED Light Therapy', 'led-light-therapy', 75, 30, skinCatAdvanced, 'Non-invasive treatment for acne and anti-aging'),
];

// ============================================================
// BROW & LASH
// ============================================================
const browCatBrow = cat('blc1', 'Brow Services', 'brow-services', 'brow-lash', 1);
const browCatLash = cat('blc2', 'Lash Services', 'lash-services', 'brow-lash', 2);

const browLashServices: DemoService[] = [
  svc('bls1', 'Brow Shaping', 'brow-shaping', 25, 20, browCatBrow, 'Precision brow shaping with wax and tweeze'),
  svc('bls2', 'Brow Tinting', 'brow-tinting', 30, 20, browCatBrow, 'Semi-permanent tint to enhance brow color'),
  svc('bls3', 'Brow Lamination', 'brow-lamination', 75, 45, browCatBrow, 'Straightens and sets brow hairs for a fuller look'),
  svc('bls4', 'Microblading', 'microblading', 350, 120, browCatBrow, 'Semi-permanent eyebrow tattooing for natural brows'),
  svc('bls5', 'Classic Lash Extensions', 'classic-lash-extensions', 150, 90, browCatLash, 'One extension per natural lash for a natural look'),
  svc('bls6', 'Volume Lash Extensions', 'volume-lash-extensions', 200, 120, browCatLash, 'Multiple extensions per lash for a dramatic fluffy look'),
  svc('bls7', 'Lash Lift & Tint', 'lash-lift-tint', 85, 60, browCatLash, 'Curls and darkens natural lashes, no extensions needed'),
  svc('bls8', 'Lash Removal', 'lash-removal', 40, 30, browCatLash, 'Safe removal of existing lash extensions'),
];

// ============================================================
// TANNING
// ============================================================
const tanCatSpray = cat('tnc1', 'Spray Tanning', 'spray-tanning', 'tanning', 1);
const tanCatBed = cat('tnc2', 'Tanning Beds', 'tanning-beds', 'tanning', 2);

const tanningServices: DemoService[] = [
  svc('tns1', 'Express Spray Tan', 'express-spray-tan', 45, 20, tanCatSpray, 'Quick-developing spray tan, shower in 1-3 hours'),
  svc('tns2', 'Custom Airbrush Tan', 'custom-airbrush-tan', 65, 30, tanCatSpray, 'Hand-applied spray tan for even, natural color'),
  svc('tns3', 'Contour Spray Tan', 'contour-spray-tan', 85, 45, tanCatSpray, 'Defined abs, arms, and legs with shading technique'),
  svc('tns4', 'Single Session - Level 1', 'single-session-l1', 15, 15, tanCatBed, 'Entry-level UV bed for base tan development'),
  svc('tns5', 'Single Session - Level 2', 'single-session-l2', 25, 15, tanCatBed, 'Higher intensity bed for faster, darker results'),
  svc('tns6', 'Unlimited Month Pass', 'unlimited-month', 80, 0, tanCatBed, 'Unlimited tanning bed sessions for 30 days'),
];

export const ALL_DEMO_SERVICES: DemoService[] = [
  ...waxingServices,
  ...barberServices,
  ...nailServices,
  ...hairServices,
  ...tattooServices,
  ...massageServices,
  ...skincareServices,
  ...browLashServices,
  ...tanningServices,
];

export function getDemoServices(businessType?: string | null): DemoService[] {
  if (!businessType) return ALL_DEMO_SERVICES;
  return ALL_DEMO_SERVICES.filter((s) => s.category.businessType === businessType);
}

export function getDemoCategories(businessType?: string | null): DemoCategory[] {
  const allCats = [
    waxCatFace, waxCatMid, waxCatLower, waxCatMens,
    barbCatHaircuts, barbCatBeard, barbCatShave, barbCatColor,
    nailCatManis, nailCatPedis, nailCatEnhance, nailCatArt,
    hairCatCuts, hairCatColor, hairCatTreat, hairCatStyle,
    tattooCatCustom, tattooCatCover, tattooCatPiercing, tattooCatRemoval,
    massageCatRelax, massageCatTherapeutic, massageCatBody,
    skinCatFacials, skinCatPeels, skinCatAdvanced,
    browCatBrow, browCatLash,
    tanCatSpray, tanCatBed,
  ];
  if (!businessType) return allCats;
  return allCats.filter((c) => c.businessType === businessType);
}
