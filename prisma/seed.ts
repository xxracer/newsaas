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

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'face' },
      update: {},
      create: { name: 'Face', slug: 'face', gender: 'FEMALE', sortOrder: 1 },
    }),
    prisma.category.upsert({
      where: { slug: 'mid-body' },
      update: {},
      create: { name: 'Mid Body', slug: 'mid-body', gender: 'FEMALE', sortOrder: 2 },
    }),
    prisma.category.upsert({
      where: { slug: 'lower-body' },
      update: {},
      create: { name: 'Lower Body', slug: 'lower-body', gender: 'FEMALE', sortOrder: 3 },
    }),
    prisma.category.upsert({
      where: { slug: 'mens' },
      update: {},
      create: { name: "Men's", slug: 'mens', gender: 'MALE', sortOrder: 4 },
    }),
  ]);
  console.log('Created categories');

  // Create services
  const services = [
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

  for (const svc of services) {
    const cat = categories.find(c => c.slug === svc.categorySlug)!;
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
  console.log('Created services');

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
