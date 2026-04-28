import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@vivalabeauty.com' },
    update: {},
    create: {
      email: 'admin@vivalabeauty.com',
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
      passwordHash: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewKyNiiGTMwFYjG', // "admin123"
    },
  });
  console.log('Created admin user:', admin.email);

  // ============================================================
  // WAXING CATEGORIES & SERVICES
  // ============================================================
  const waxingCategories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'face' },
      update: { businessType: 'waxing' },
      create: { name: 'Face', slug: 'face', gender: 'FEMALE', sortOrder: 1, businessType: 'waxing' },
    }),
    prisma.category.upsert({
      where: { slug: 'mid-body' },
      update: { businessType: 'waxing' },
      create: { name: 'Mid Body', slug: 'mid-body', gender: 'FEMALE', sortOrder: 2, businessType: 'waxing' },
    }),
    prisma.category.upsert({
      where: { slug: 'lower-body' },
      update: { businessType: 'waxing' },
      create: { name: 'Lower Body', slug: 'lower-body', gender: 'FEMALE', sortOrder: 3, businessType: 'waxing' },
    }),
    prisma.category.upsert({
      where: { slug: 'mens' },
      update: { businessType: 'waxing' },
      create: { name: "Men's", slug: 'mens', gender: 'MALE', sortOrder: 4, businessType: 'waxing' },
    }),
  ]);
  console.log('Created waxing categories');

  const waxingServices = [
    // Face
    { name: 'Brow Design', slug: 'brow-design', price: 25, duration: 20, categorySlug: 'face', description: 'Professional eyebrow shaping and definition' },
    { name: 'Upper Lip Wax', slug: 'upper-lip-wax', price: 15, duration: 15, categorySlug: 'face', description: 'Smooth upper lip waxing' },
    { name: 'Chin Wax', slug: 'chin-wax', price: 15, duration: 15, categorySlug: 'face', description: 'Chin hair removal' },
    { name: 'Sideburn Wax', slug: 'sideburn-wax', price: 20, duration: 15, categorySlug: 'face', description: 'Sideburn shaping and waxing' },
    { name: 'Full Face Wax', slug: 'full-face-wax', price: 55, duration: 45, categorySlug: 'face', description: 'Complete facial waxing including brow, lip, chin, and cheeks' },
    // Mid Body
    { name: 'Underarm Wax', slug: 'underarm-wax', price: 25, duration: 20, categorySlug: 'mid-body', description: 'Underarm hair removal' },
    { name: 'Full Arm Wax', slug: 'full-arm-wax', price: 55, duration: 45, categorySlug: 'mid-body', description: 'Complete arm waxing from shoulder to wrist' },
    { name: 'Half Arm Wax', slug: 'half-arm-wax', price: 35, duration: 30, categorySlug: 'mid-body', description: 'Upper or lower arm waxing' },
    { name: 'Back Wax', slug: 'back-wax', price: 65, duration: 45, categorySlug: 'mid-body', description: 'Back hair removal' },
    // Lower Body
    { name: 'Bikini Wax', slug: 'bikini-wax', price: 35, duration: 30, categorySlug: 'lower-body', description: 'Classic bikini line waxing' },
    { name: 'Brazilian Wax', slug: 'brazilian-wax', price: 65, duration: 45, categorySlug: 'lower-body', description: 'Full Brazilian waxing - all hair removed' },
    { name: 'Half Leg Wax', slug: 'half-leg-wax', price: 45, duration: 35, categorySlug: 'lower-body', description: 'Upper or lower leg waxing' },
    { name: 'Full Leg Wax', slug: 'full-leg-wax', price: 75, duration: 60, categorySlug: 'lower-body', description: 'Complete leg waxing from thigh to ankle' },
    // Men's
    { name: "Men's Brow Wax", slug: 'mens-brow-wax', price: 25, duration: 20, categorySlug: 'mens', description: "Men's eyebrow grooming" },
    { name: "Men's Back Wax", slug: 'mens-back-wax', price: 85, duration: 45, categorySlug: 'mens', description: "Men's back hair removal" },
    { name: "Men's Chest Wax", slug: 'mens-chest-wax', price: 75, duration: 45, categorySlug: 'mens', description: "Men's chest hair removal" },
  ];

  for (const svc of waxingServices) {
    const cat = waxingCategories.find(c => c.slug === svc.categorySlug)!;
    await prisma.service.upsert({
      where: { slug: svc.slug },
      update: {},
      create: {
        name: svc.name,
        slug: svc.slug,
        price: svc.price,
        duration: svc.duration,
        categoryId: cat.id,
        description: svc.description,
        gender: cat.gender === 'MALE' ? 'MALE' : 'FEMALE',
        isActive: true,
      },
    });
  }
  console.log('Created waxing services');

  // ============================================================
  // BARBER CATEGORIES & SERVICES
  // ============================================================
  const barberCategories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'haircuts' },
      update: { businessType: 'barber' },
      create: { name: 'Haircuts', slug: 'haircuts', gender: 'MALE', sortOrder: 1, businessType: 'barber' },
    }),
    prisma.category.upsert({
      where: { slug: 'beard-grooming' },
      update: { businessType: 'barber' },
      create: { name: 'Beard Grooming', slug: 'beard-grooming', gender: 'MALE', sortOrder: 2, businessType: 'barber' },
    }),
    prisma.category.upsert({
      where: { slug: 'hot-towel-shaves' },
      update: { businessType: 'barber' },
      create: { name: 'Hot Towel Shaves', slug: 'hot-towel-shaves', gender: 'MALE', sortOrder: 3, businessType: 'barber' },
    }),
    prisma.category.upsert({
      where: { slug: 'hair-color' },
      update: { businessType: 'barber' },
      create: { name: 'Hair Color', slug: 'hair-color', gender: 'MALE', sortOrder: 4, businessType: 'barber' },
    }),
  ]);
  console.log('Created barber categories');

  const barberServices = [
    // Haircuts
    { name: 'Classic Cut', slug: 'classic-cut', price: 35, duration: 30, categorySlug: 'haircuts', description: 'Traditional barber cut with clippers and scissors finish' },
    { name: 'Fade & Taper', slug: 'fade-taper', price: 40, duration: 35, categorySlug: 'haircuts', description: 'Precision fade with seamless taper blend' },
    { name: 'Buzz Cut', slug: 'buzz-cut', price: 25, duration: 20, categorySlug: 'haircuts', description: 'All-over clipper cut with your preferred guard length' },
    { name: 'Kids Cut (Under 12)', slug: 'kids-cut', price: 25, duration: 25, categorySlug: 'haircuts', description: 'Gentle cut designed for young gentlemen' },
    { name: 'Line Up & Edge', slug: 'line-up-edge', price: 20, duration: 15, categorySlug: 'haircuts', description: 'Sharp line-up with razor edge detailing' },
    // Beard Grooming
    { name: 'Beard Trim', slug: 'beard-trim', price: 20, duration: 20, categorySlug: 'beard-grooming', description: 'Shape and tidy your beard with precision' },
    { name: 'Beard Sculpt', slug: 'beard-sculpt', price: 35, duration: 30, categorySlug: 'beard-grooming', description: 'Full beard shaping with hot towel and oils' },
    { name: 'Mustache Trim', slug: 'mustache-trim', price: 12, duration: 10, categorySlug: 'beard-grooming', description: 'Precision mustache shaping and styling' },
    // Hot Towel Shaves
    { name: 'Classic Hot Towel Shave', slug: 'classic-hot-shave', price: 45, duration: 40, categorySlug: 'hot-towel-shaves', description: 'Traditional straight razor shave with hot towels' },
    { name: 'Head Shave', slug: 'head-shave', price: 40, duration: 35, categorySlug: 'hot-towel-shaves', description: 'Smooth head shave with hot towel treatment' },
    { name: 'Neck Clean-Up', slug: 'neck-cleanup', price: 15, duration: 10, categorySlug: 'hot-towel-shaves', description: 'Clean neck line with straight razor' },
    // Hair Color
    { name: 'Gray Blending', slug: 'gray-blending', price: 35, duration: 30, categorySlug: 'hair-color', description: 'Subtle color to blend away gray naturally' },
    { name: 'Full Color', slug: 'full-color', price: 55, duration: 60, categorySlug: 'hair-color', description: 'Complete hair color transformation' },
    { name: 'Highlights', slug: 'highlights', price: 45, duration: 45, categorySlug: 'hair-color', description: 'Add dimension with custom highlights' },
  ];

  for (const svc of barberServices) {
    const cat = barberCategories.find(c => c.slug === svc.categorySlug)!;
    await prisma.service.upsert({
      where: { slug: svc.slug },
      update: {},
      create: {
        name: svc.name,
        slug: svc.slug,
        price: svc.price,
        duration: svc.duration,
        categoryId: cat.id,
        description: svc.description,
        gender: 'MALE',
        isActive: true,
      },
    });
  }
  console.log('Created barber services');

  // ============================================================
  // NAIL SALON CATEGORIES & SERVICES
  // ============================================================
  const nailCategories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'manicures' },
      update: { businessType: 'nails' },
      create: { name: 'Manicures', slug: 'manicures', gender: 'FEMALE', sortOrder: 1, businessType: 'nails' },
    }),
    prisma.category.upsert({
      where: { slug: 'pedicures' },
      update: { businessType: 'nails' },
      create: { name: 'Pedicures', slug: 'pedicures', gender: 'FEMALE', sortOrder: 2, businessType: 'nails' },
    }),
    prisma.category.upsert({
      where: { slug: 'nail-enhancements' },
      update: { businessType: 'nails' },
      create: { name: 'Nail Enhancements', slug: 'nail-enhancements', gender: 'FEMALE', sortOrder: 3, businessType: 'nails' },
    }),
    prisma.category.upsert({
      where: { slug: 'nail-art' },
      update: { businessType: 'nails' },
      create: { name: 'Nail Art', slug: 'nail-art', gender: 'FEMALE', sortOrder: 4, businessType: 'nails' },
    }),
  ]);
  console.log('Created nail categories');

  const nailServices = [
    // Manicures
    { name: 'Classic Manicure', slug: 'classic-manicure', price: 25, duration: 30, categorySlug: 'manicures', description: 'Nail shaping, cuticle care, hand massage, and polish' },
    { name: 'Gel Manicure', slug: 'gel-manicure', price: 40, duration: 45, categorySlug: 'manicures', description: 'Long-lasting gel polish with full cuticle care' },
    { name: 'Spa Manicure', slug: 'spa-manicure', price: 45, duration: 50, categorySlug: 'manicures', description: 'Luxury manicure with exfoliation, mask, and extended massage' },
    { name: 'Express Manicure', slug: 'express-manicure', price: 18, duration: 20, categorySlug: 'manicures', description: 'Quick shape and polish for busy schedules' },
    // Pedicures
    { name: 'Classic Pedicure', slug: 'classic-pedicure', price: 35, duration: 40, categorySlug: 'pedicures', description: 'Foot soak, exfoliation, nail care, and polish' },
    { name: 'Gel Pedicure', slug: 'gel-pedicure', price: 50, duration: 50, categorySlug: 'pedicures', description: 'Gel polish pedicure with full foot care' },
    { name: 'Spa Pedicure', slug: 'spa-pedicure', price: 60, duration: 60, categorySlug: 'pedicures', description: 'Luxury pedicure with hot stone massage and paraffin' },
    { name: 'Deluxe Pedicure', slug: 'deluxe-pedicure', price: 75, duration: 75, categorySlug: 'pedicures', description: 'Ultimate pampering with mask, scrub, and extended massage' },
    // Nail Enhancements
    { name: 'Full Acrylic Set', slug: 'full-acrylic', price: 55, duration: 60, categorySlug: 'nail-enhancements', description: 'Classic acrylic nail extensions with your choice of shape' },
    { name: 'Acrylic Fill-In', slug: 'acrylic-fill', price: 35, duration: 45, categorySlug: 'nail-enhancements', description: 'Fill and reshape existing acrylic nails' },
    { name: 'Dip Powder Set', slug: 'dip-powder', price: 50, duration: 50, categorySlug: 'nail-enhancements', description: 'Durable dip powder nails in any color' },
    { name: 'Builder Gel Overlay', slug: 'builder-gel', price: 45, duration: 50, categorySlug: 'nail-enhancements', description: 'Strong gel overlay for natural nail strengthening' },
    // Nail Art
    { name: 'Basic Nail Art', slug: 'basic-nail-art', price: 10, duration: 15, categorySlug: 'nail-art', description: 'Simple designs: dots, lines, and accents' },
    { name: 'Custom Nail Art', slug: 'custom-nail-art', price: 25, duration: 30, categorySlug: 'nail-art', description: 'Hand-painted custom designs per nail' },
    { name: 'Chrome / Mirror Finish', slug: 'chrome-nails', price: 20, duration: 20, categorySlug: 'nail-art', description: 'Metallic chrome or mirror powder application' },
    { name: 'French Tips', slug: 'french-tips', price: 15, duration: 20, categorySlug: 'nail-art', description: 'Classic or colored French tip design' },
  ];

  for (const svc of nailServices) {
    const cat = nailCategories.find(c => c.slug === svc.categorySlug)!;
    await prisma.service.upsert({
      where: { slug: svc.slug },
      update: {},
      create: {
        name: svc.name,
        slug: svc.slug,
        price: svc.price,
        duration: svc.duration,
        categoryId: cat.id,
        description: svc.description,
        gender: 'FEMALE',
        isActive: true,
      },
    });
  }
  console.log('Created nail services');

  // ============================================================
  // HAIR SALON CATEGORIES & SERVICES
  // ============================================================
  const hairCategories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'womens-cuts' },
      update: { businessType: 'hair' },
      create: { name: "Women's Cuts", slug: 'womens-cuts', gender: 'FEMALE', sortOrder: 1, businessType: 'hair' },
    }),
    prisma.category.upsert({
      where: { slug: 'color-services' },
      update: { businessType: 'hair' },
      create: { name: 'Color Services', slug: 'color-services', gender: 'FEMALE', sortOrder: 2, businessType: 'hair' },
    }),
    prisma.category.upsert({
      where: { slug: 'treatments' },
      update: { businessType: 'hair' },
      create: { name: 'Treatments', slug: 'treatments', gender: 'FEMALE', sortOrder: 3, businessType: 'hair' },
    }),
    prisma.category.upsert({
      where: { slug: 'styling' },
      update: { businessType: 'hair' },
      create: { name: 'Styling', slug: 'styling', gender: 'FEMALE', sortOrder: 4, businessType: 'hair' },
    }),
  ]);
  console.log('Created hair categories');

  const hairServices = [
    // Women's Cuts
    { name: 'Women\'s Haircut', slug: 'womens-haircut', price: 55, duration: 45, categorySlug: 'womens-cuts', description: 'Custom cut tailored to your face shape and style' },
    { name: 'Trim & Shape', slug: 'trim-shape', price: 35, duration: 30, categorySlug: 'womens-cuts', description: 'Maintenance trim to keep your style fresh' },
    { name: 'Layered Cut', slug: 'layered-cut', price: 65, duration: 50, categorySlug: 'womens-cuts', description: 'Full layered cut for volume and movement' },
    { name: 'Bang Trim', slug: 'bang-trim', price: 15, duration: 15, categorySlug: 'womens-cuts', description: 'Quick bang shaping and trimming' },
    // Color Services
    { name: 'Full Color', slug: 'hair-full-color', price: 85, duration: 90, categorySlug: 'color-services', description: 'All-over permanent or demi-permanent color' },
    { name: 'Root Touch-Up', slug: 'root-touchup', price: 55, duration: 60, categorySlug: 'color-services', description: 'Blend regrowth with seamless color match' },
    { name: 'Highlights / Lowlights', slug: 'highlights-lowlights', price: 95, duration: 120, categorySlug: 'color-services', description: 'Foil highlights or lowlights for dimension' },
    { name: 'Balayage', slug: 'balayage', price: 150, duration: 150, categorySlug: 'color-services', description: 'Hand-painted sun-kissed color technique' },
    // Treatments
    { name: 'Deep Conditioning', slug: 'deep-conditioning', price: 35, duration: 30, categorySlug: 'treatments', description: 'Intensive moisture treatment for dry hair' },
    { name: 'Keratin Treatment', slug: 'keratin-treatment', price: 200, duration: 150, categorySlug: 'treatments', description: 'Smoothing keratin treatment for frizz-free hair' },
    { name: 'Scalp Treatment', slug: 'scalp-treatment', price: 45, duration: 35, categorySlug: 'treatments', description: 'Revitalizing scalp treatment for healthy growth' },
    // Styling
    { name: 'Blowout', slug: 'blowout', price: 45, duration: 45, categorySlug: 'styling', description: 'Wash and professional blow-dry styling' },
    { name: 'Updo / Special Event', slug: 'updo-event', price: 85, duration: 60, categorySlug: 'styling', description: 'Elegant updo for weddings, proms, and events' },
    { name: 'Curl / Wave Set', slug: 'curl-wave-set', price: 55, duration: 50, categorySlug: 'styling', description: 'Beautiful curls or waves with hot tools' },
  ];

  for (const svc of hairServices) {
    const cat = hairCategories.find(c => c.slug === svc.categorySlug)!;
    await prisma.service.upsert({
      where: { slug: svc.slug },
      update: {},
      create: {
        name: svc.name,
        slug: svc.slug,
        price: svc.price,
        duration: svc.duration,
        categoryId: cat.id,
        description: svc.description,
        gender: 'FEMALE',
        isActive: true,
      },
    });
  }
  console.log('Created hair services');

  // Create testimonials
  const testimonials = [
    { quote: 'Best waxing experience I have ever had! The staff is so professional and the results are amazing.', author: 'Maria G.', location: 'Sugar Land, TX', rating: 5 },
    { quote: 'Finally found a place that does Brazilian waxing right. Zero pain, perfect results!', author: 'Jennifer L.', location: 'Houston, TX', rating: 5 },
    { quote: 'I have been coming here for 2 years now. Consistent quality every single time.', author: 'Sarah M.', location: 'Sugar Land, TX', rating: 5 },
  ];

  for (const t of testimonials) {
    await prisma.testimonial.upsert({
      where: { id: t.author },
      update: {},
      create: t,
    });
  }
  console.log('Created testimonials');

  // Create specials
  const specials = [
    { title: 'First Time Client Discount', slug: 'first-time-discount', description: 'Get 20% off your first waxing service. Mention this special when booking!', ctaText: 'Book Now', ctaLink: '/book' },
    { title: 'Brazilian Wax Special', slug: 'brazilian-special', description: 'Book a Brazilian wax and receive 15% off any additional service same day.', ctaText: 'Book Appointment', ctaLink: '/book' },
    { title: 'Refer a Friend', slug: 'refer-friend', description: 'Refer a friend and both of you get 10% off your next appointment!', ctaText: 'Start Referring', ctaLink: '/book' },
  ];

  for (const s of specials) {
    await prisma.special.upsert({
      where: { slug: s.slug },
      update: {},
      create: { ...s, isActive: true },
    });
  }
  console.log('Created specials');

  // Create business settings
  await prisma.businessSettings.upsert({
    where: { userId: admin.id },
    update: {},
    create: {
      userId: admin.id,
      domain: 'vivalabeauty.com',
      businessName: 'Viva La Beauty',
      tagline: 'Expert Waxing & Beauty Services',
      address: '123 Beauty Lane',
      city: 'Sugar Land',
      state: 'TX',
      zip: '77478',
      phone: '(281) 555-0123',
      email: 'info@vivalabeauty.com',
      hours: JSON.stringify({
        monday: { open: '09:00', close: '18:00' },
        tuesday: { open: '09:00', close: '18:00' },
        wednesday: { open: '09:00', close: '18:00' },
        thursday: { open: '09:00', close: '20:00' },
        friday: { open: '09:00', close: '18:00' },
        saturday: { open: '10:00', close: '16:00' },
        sunday: null,
      }),
      primaryColor: '#D8006E',
      secondaryColor: '#7400D8',
    },
  });
  console.log('Created business settings');

  // Create a second business for multi-tenant demo
  const admin2 = await prisma.user.upsert({
    where: { email: 'admin@glowspa.com' },
    update: {},
    create: {
      email: 'admin@glowspa.com',
      firstName: 'Glow',
      lastName: 'Admin',
      role: 'ADMIN',
      passwordHash: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewKyNiiGTMwFYjG', // "admin123"
    },
  });

  await prisma.businessSettings.upsert({
    where: { userId: admin2.id },
    update: {},
    create: {
      userId: admin2.id,
      domain: 'glowspa.com',
      businessName: 'Glow Spa & Wellness',
      tagline: 'Your Path to Radiance',
      address: '456 Wellness Blvd',
      city: 'Austin',
      state: 'TX',
      zip: '78701',
      phone: '(512) 555-0456',
      email: 'hello@glowspa.com',
      hours: JSON.stringify({
        monday: { open: '10:00', close: '19:00' },
        tuesday: { open: '10:00', close: '19:00' },
        wednesday: { open: '10:00', close: '19:00' },
        thursday: { open: '10:00', close: '19:00' },
        friday: { open: '10:00', close: '19:00' },
        saturday: { open: '09:00', close: '17:00' },
        sunday: null,
      }),
      primaryColor: '#00A86B',
      secondaryColor: '#00796B',
    },
  });

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
