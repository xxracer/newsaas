'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { StudioMetaTags } from '@/components/seo';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  Star,
  Clock,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Scissors,
  Gift,
  ShoppingBag,
  Users,
  HelpCircle,
  CheckCircle,
  ArrowRight,
  Menu,
  X
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PAGE_TEMPLATES, SEO_TIPS, DEFAULT_PAGES, LuxuryThemeId, THEME_COLORS } from '@/lib/firebase-mock';

interface StudioData {
  businessName: string;
  tagline?: string;
  theme?: { id: string; name: string };
  colors?: Record<string, string>;
  address?: string;
  city?: string;
  phone?: string;
  instagram?: string;
  facebook?: string;
  pages?: any[];
  website?: {
    pages: any[];
  };
}

interface PageParams {
  domain: string;
  page: string;
}

// Icon mapping
const iconMap: Record<string, any> = {
  Scissors,
  Calendar,
  Gift,
  ShoppingBag,
  Users,
  MapPin,
  HelpCircle,
};

export default function StudioPublicPage({ params }: { params: Promise<PageParams> }) {
  const paramValues = React.use(params);
  const { setTheme, colors } = useTheme();
  const [studio, setStudio] = useState<StudioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<string>('home');
  const pathname = usePathname();

  const getPath = (pageId: string) => {
    if (!pathname) return `/${pageId}`;
    const parts = pathname.split('/');
    if (parts.length > 0) {
      parts[parts.length - 1] = pageId;
      return parts.join('/');
    }
    return `/${pageId}`;
  };

  useEffect(() => {
    // Get studio from localStorage (demo) or URL params
    const storedStudios = Object.keys(localStorage)
      .filter(key => key.startsWith('mock_studio_'))
      .map(key => JSON.parse(localStorage.getItem(key) || '{}'));

    if (storedStudios.length > 0) {
      const studioData = storedStudios[0];
      setStudio(studioData);

      // Apply studio theme
      if (studioData.theme?.id) {
        setTheme(studioData.theme.id as LuxuryThemeId);
      }

      // Set current page from URL
      const pageFromUrl = paramValues.page || 'home';
      setCurrentPage(pageFromUrl);
    } else {
      // Demo studio data
      const demoStudio: StudioData = {
        businessName: 'Rose Waxing Studio',
        tagline: 'Expertos en cuidado de la piel',
        theme: { id: 'waxing-rose-gold', name: 'Rose Gold Elegance' },
        colors: THEME_COLORS['waxing-rose-gold'],
        address: '123 Main Street',
        city: 'Miami, FL 33101',
        phone: '(305) 555-0123',
        instagram: '@rosewaxing',
        pages: DEFAULT_PAGES,
      };
      setStudio(demoStudio);
      setTheme('waxing-rose-gold');
      setCurrentPage(paramValues.page || 'home');
    }
    setLoading(false);
  }, [paramValues.domain, paramValues.page, setTheme]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: colors?.background }}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  const services = [
    { name: 'Brazilian Wax', price: '$50', duration: '30 min', description: 'Cera completa estilo brasileño' },
    { name: 'Brow Design', price: '$25', duration: '15 min', description: 'Diseño y perfilado de cejas' },
    { name: 'Full Leg Wax', price: '$80', duration: '45 min', description: 'Cera completa de piernas' },
    { name: 'Underarm Wax', price: '$30', duration: '20 min', description: 'Cera de axilas' },
    { name: 'Full Body', price: '$200', duration: '120 min', description: 'Cera de cuerpo completo' },
    { name: 'Lip/Chin Wax', price: '$15', duration: '10 min', description: 'Cera de labio o mentón' },
  ];

  const testimonials = [
    { name: 'María G.', text: 'El mejor lugar para waxing! Profesionales y súper higiénico.', rating: 5 },
    { name: 'Carolina R.', text: 'Mi piel queda perfecta y sin irritación. 100% recomendado.', rating: 5 },
    { name: 'Andrea M.', text: 'La atención es increíble y el lugar es hermoso.', rating: 5 },
  ];

  const giftCardPackages = [
    { name: 'Relax Experience', price: '$75', services: ['Brazilian Wax', 'Brow Design'], popular: false },
    { name: 'Full Body Luxury', price: '$200', services: ['Full Body Wax', 'Brow Design', 'Aftercare Kit'], popular: true },
    { name: 'Bridal Package', price: '$350', services: ['Full Body', 'Bridal Brows', 'VIP Treatment'], popular: false },
  ];

  const products = [
    { name: 'Aftercare Oil', price: '$25', category: 'Cuidado', image: '🧴' },
    { name: 'Exfoliating Scrub', price: '$30', category: 'Exfoliante', image: '🌿' },
    { name: 'Soothing Gel', price: '$20', category: 'Calmante', image: '💧' },
    { name: 'Ingrown Hair Serum', price: '$35', category: 'Tratamiento', image: '✨' },
  ];

  const faqs = [
    ...SEO_TIPS.waxing,
    ...SEO_TIPS.aftercare,
  ];

  // Get enabled pages for navigation
  const enabledPages = studio?.pages?.filter(p => p.enabled) || DEFAULT_PAGES.filter(p => p.enabled);
  const fullPages = studio?.website?.pages || [];
  const currentPageData = fullPages.find((p: any) => p.id === currentPage);

  const isSectionEnabled = (sectionId: string) => {
    if (!currentPageData || !currentPageData.sections) return true;
    const section = currentPageData.sections.find((s: any) => s.id === sectionId);
    return section ? section.enabled !== false : true;
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            {/* Hero Section */}
            {isSectionEnabled('hero') && (
              <section
                className="relative py-20 md:py-32 overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${colors?.background} 0%, ${colors?.secondary} 100%)`
              }}
            >
              <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center">
                  <h2
                    className="font-heading text-4xl md:text-6xl font-bold mb-6"
                    style={{ color: colors?.text }}
                  >
                    Tu piel merece lo mejor
                  </h2>
                  <p
                    className="text-lg md:text-xl mb-8"
                    style={{ color: colors?.textMuted }}
                  >
                    Expertos en waxing y cuidado de la piel. Resultados suaves y duraderos en un ambiente luxury.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href={getPath('appointments')}>
                      <Button
                        size="lg"
                        className="rounded-full px-8 py-6 text-lg"
                        style={{ backgroundColor: colors?.primary, color: colors?.primaryForeground }}
                      >
                        <Calendar className="w-5 h-5 mr-2" />
                        Agendar Cita
                      </Button>
                    </Link>
                    <Link href={getPath('services')}>
                      <Button
                        size="lg"
                        variant="outline"
                        className="rounded-full px-8 py-6 text-lg border-2"
                        style={{ borderColor: colors?.primary, color: colors?.primary }}
                      >
                        Ver Servicios
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </section>
            )}

            {/* Services Preview */}
            {isSectionEnabled('servicesGrid') && (
              <section id="services" className="py-20" style={{ backgroundColor: colors?.surface }}>
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4" style={{ color: colors?.text }}>
                    Nuestros Servicios
                  </h2>
                  <p style={{ color: colors?.textMuted }}>
                    Tratamientos personalizados para cada tipo de piel
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services.map((service) => (
                    <Card
                      key={service.name}
                      className="border shadow-sm hover:shadow-md transition-shadow"
                      style={{
                        borderColor: colors?.border,
                        backgroundColor: colors?.background
                      }}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-heading text-lg font-semibold" style={{ color: colors?.text }}>
                            {service.name}
                          </h3>
                          <span className="text-xl font-bold" style={{ color: colors?.primary }}>
                            {service.price}
                          </span>
                        </div>
                        <p className="text-sm mb-3" style={{ color: colors?.textMuted }}>
                          {service.description}
                        </p>
                        <div className="flex items-center gap-2 text-sm" style={{ color: colors?.textMuted }}>
                          <Clock className="w-4 h-4" />
                          {service.duration}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  </div>
                </div>
              </section>
            )}

            {/* Testimonials Section */}
            {isSectionEnabled('testimonials') && (
              <section id="testimonials" className="py-20" style={{ backgroundColor: colors?.background }}>
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4" style={{ color: colors?.text }}>
                    Lo Que Dicen Nuestras Clientas
                  </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                  {testimonials.map((testimonial, idx) => (
                    <Card
                      key={idx}
                      className="border shadow-sm"
                      style={{ borderColor: colors?.border, backgroundColor: colors?.surface }}
                    >
                      <CardContent className="p-6">
                        <div className="flex gap-1 mb-3">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-current" style={{ color: colors?.accent }} />
                          ))}
                        </div>
                        <p className="mb-4 italic" style={{ color: colors?.text }}>
                          "{testimonial.text}"
                        </p>
                        <p className="font-semibold" style={{ color: colors?.primary }}>
                          {testimonial.name}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
            )}
          </>
        );

      case 'services':
        return (
          <>
            <section className="py-16" style={{ backgroundColor: colors?.background }}>
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4" style={{ color: colors?.text }}>
                    Servicios de Waxing
                  </h1>
                  <p className="text-lg" style={{ color: colors?.textMuted }}>
                    Elige el tratamiento perfecto para ti
                  </p>
                </div>

                {/* Service Categories */}
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
                  {services.map((service, idx) => (
                    <Card
                      key={idx}
                      className="border-2 hover:border-primary transition-colors"
                      style={{ borderColor: colors?.border, backgroundColor: colors?.surface }}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-heading text-xl font-semibold mb-1" style={{ color: colors?.text }}>
                              {service.name}
                            </h3>
                            <p className="text-sm" style={{ color: colors?.textMuted }}>
                              {service.description}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="text-2xl font-bold block" style={{ color: colors?.primary }}>
                              {service.price}
                            </span>
                            <span className="text-xs" style={{ color: colors?.textMuted }}>
                              {service.duration}
                            </span>
                          </div>
                        </div>
                        <Link href={getPath('appointments')}>
                          <Button
                            size="sm"
                            className="w-full mt-4"
                            style={{ backgroundColor: colors?.primary, color: colors?.primaryForeground }}
                          >
                            Reservar
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* FAQ Section */}
                <div className="max-w-3xl mx-auto mt-16">
                  <h2 className="font-heading text-2xl font-bold mb-6 text-center" style={{ color: colors?.text }}>
                    Preguntas Frecuentes
                  </h2>
                  <div className="space-y-4">
                    {SEO_TIPS.waxing.map((faq, idx) => (
                      <Card key={idx} style={{ borderColor: colors?.border, backgroundColor: colors?.surface }}>
                        <CardContent className="p-4">
                          <h3 className="font-semibold mb-2 flex items-center gap-2" style={{ color: colors?.text }}>
                            <HelpCircle className="w-4 h-4" style={{ color: colors?.accent }} />
                            {faq.question}
                          </h3>
                          <p className="text-sm" style={{ color: colors?.textMuted }}>
                            {faq.answer}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </>
        );

      case 'gift-cards':
        return (
          <>
            <section className="py-16" style={{ backgroundColor: colors?.background }}>
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4" style={{ color: colors?.text }}>
                    Gift Cards
                  </h1>
                  <p className="text-lg" style={{ color: colors?.textMuted }}>
                    El regalo perfecto para alguien especial
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                  {giftCardPackages.map((pkg, idx) => (
                    <Card
                      key={idx}
                      className={`border-2 relative ${pkg.popular ? 'border-accent scale-105' : ''}`}
                      style={{ borderColor: pkg.popular ? colors?.accent : colors?.border, backgroundColor: colors?.surface }}
                    >
                      {pkg.popular && (
                        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2" style={{ backgroundColor: colors?.accent, color: 'white' }}>
                          Más Popular
                        </Badge>
                      )}
                      <CardContent className="p-6 pt-8">
                        <div className="text-center mb-4">
                          <Gift className="w-12 h-12 mx-auto mb-3" style={{ color: colors?.accent }} />
                          <h3 className="font-heading text-xl font-semibold mb-2" style={{ color: colors?.text }}>
                            {pkg.name}
                          </h3>
                          <span className="text-3xl font-bold" style={{ color: colors?.primary }}>
                            {pkg.price}
                          </span>
                        </div>
                        <ul className="space-y-2 mb-6">
                          {pkg.services.map((service, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm" style={{ color: colors?.text }}>
                              <CheckCircle className="w-4 h-4" style={{ color: colors?.primary }} />
                              {service}
                            </li>
                          ))}
                        </ul>
                        <Button className="w-full" style={{ backgroundColor: colors?.primary, color: colors?.primaryForeground }}>
                          Comprar Gift Card
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* How it works */}
                <div className="max-w-3xl mx-auto mt-16">
                  <h2 className="font-heading text-2xl font-bold mb-6 text-center" style={{ color: colors?.text }}>
                    Cómo Funciona
                  </h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      { step: '1', title: 'Elige el Package', desc: 'Selecciona el gift card perfecto' },
                      { step: '2', title: 'Personaliza', desc: 'Agrega un mensaje personalizado' },
                      { step: '3', title: 'Envía', desc: 'Recibe por email o imprime' },
                    ].map((item) => (
                      <div key={item.step} className="text-center p-6">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold"
                          style={{ backgroundColor: colors?.primary, color: 'white' }}
                        >
                          {item.step}
                        </div>
                        <h3 className="font-semibold mb-2" style={{ color: colors?.text }}>{item.title}</h3>
                        <p className="text-sm" style={{ color: colors?.textMuted }}>{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </>
        );

      case 'products':
        return (
          <>
            <section className="py-16" style={{ backgroundColor: colors?.background }}>
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4" style={{ color: colors?.text }}>
                    Productos de Cuidado
                  </h1>
                  <p className="text-lg" style={{ color: colors?.textMuted }}>
                    Extiende tu experiencia de spa en casa
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                  {products.map((product, idx) => (
                    <Card
                      key={idx}
                      className="border hover:shadow-lg transition-shadow"
                      style={{ borderColor: colors?.border, backgroundColor: colors?.surface }}
                    >
                      <CardContent className="p-6">
                        <div className="text-6xl text-center mb-4">{product.image}</div>
                        <Badge variant="secondary" className="mb-2" style={{ backgroundColor: colors?.secondary, color: colors?.text }}>
                          {product.category}
                        </Badge>
                        <h3 className="font-heading text-lg font-semibold mb-2" style={{ color: colors?.text }}>
                          {product.name}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold" style={{ color: colors?.primary }}>
                            ${product.price}
                          </span>
                          <Button size="sm" style={{ backgroundColor: colors?.primary, color: colors?.primaryForeground }}>
                            Agregar
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Bestsellers */}
                <div className="max-w-4xl mx-auto mt-16">
                  <h2 className="font-heading text-2xl font-bold mb-6 text-center" style={{ color: colors?.text }}>
                    Los Más Vendidos
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {products.slice(0, 2).map((product, idx) => (
                      <Card key={idx} className="border-2" style={{ borderColor: colors?.accent, backgroundColor: colors?.surface }}>
                        <CardContent className="p-6 flex items-center gap-4">
                          <div className="text-4xl">{product.image}</div>
                          <div className="flex-1">
                            <h3 className="font-semibold" style={{ color: colors?.text }}>{product.name}</h3>
                            <p className="text-sm" style={{ color: colors?.textMuted }}>{product.category}</p>
                            <span className="font-bold" style={{ color: colors?.primary }}>${product.price}</span>
                          </div>
                          <Button style={{ backgroundColor: colors?.primary, color: colors?.primaryForeground }}>
                            Comprar
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </>
        );

      case 'about':
        return (
          <>
            <section className="py-16" style={{ backgroundColor: colors?.background }}>
              <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                  <div className="text-center mb-12">
                    <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4" style={{ color: colors?.text }}>
                      Sobre Nosotros
                    </h1>
                    <p className="text-lg" style={{ color: colors?.textMuted }}>
                      Tu destino de confianza para waxing profesional
                    </p>
                  </div>

                  {/* Story */}
                  <Card className="mb-8" style={{ borderColor: colors?.border, backgroundColor: colors?.surface }}>
                    <CardContent className="p-8">
                      <h2 className="font-heading text-2xl font-bold mb-4" style={{ color: colors?.text }}>
                        Nuestra Historia
                      </h2>
                      <p className="mb-4" style={{ color: colors?.textMuted }}>
                        Fundado en 2020, nuestro estudio nació de la pasión por proporcionar experiencias de waxing
                        excepcionales en un ambiente luxury y relajante.
                      </p>
                      <p style={{ color: colors?.textMuted }}>
                        Cada miembro de nuestro equipo está certificado y en constante capacitación para ofrecerte
                        el mejor servicio posible.
                      </p>
                    </CardContent>
                  </Card>

                  {/* Values */}
                  <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {[
                      { icon: '✨', title: 'Calidad Premium', desc: 'Solo usamos productos de la más alta calidad' },
                      { icon: '🛡️', title: 'Higiene Total', desc: 'Protocolos estrictos de sanitización' },
                      { icon: '💝', title: 'Atención Personal', desc: 'Cada clienta es única para nosotros' },
                    ].map((value, idx) => (
                      <Card key={idx} style={{ borderColor: colors?.border, backgroundColor: colors?.surface }}>
                        <CardContent className="p-6 text-center">
                          <div className="text-4xl mb-3">{value.icon}</div>
                          <h3 className="font-semibold mb-2" style={{ color: colors?.text }}>{value.title}</h3>
                          <p className="text-sm" style={{ color: colors?.textMuted }}>{value.desc}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Team */}
                  <div className="text-center">
                    <h2 className="font-heading text-2xl font-bold mb-6" style={{ color: colors?.text }}>
                      Nuestro Equipo
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                      {[
                        { name: 'Sofía', role: 'Esteticista Principal', exp: '8 años' },
                        { name: 'Valentina', role: 'Especialista en Brazilian', exp: '5 años' },
                        { name: 'Camila', role: 'Expert en Brows', exp: '6 años' },
                      ].map((member, idx) => (
                        <Card key={idx} style={{ borderColor: colors?.border, backgroundColor: colors?.surface }}>
                          <CardContent className="p-6 text-center">
                            <div
                              className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold"
                              style={{ backgroundColor: colors?.secondary, color: colors?.text }}
                            >
                              {member.name[0]}
                            </div>
                            <h3 className="font-semibold" style={{ color: colors?.text }}>{member.name}</h3>
                            <p className="text-sm" style={{ color: colors?.textMuted }}>{member.role}</p>
                            <p className="text-xs mt-1" style={{ color: colors?.textMuted }}>{member.exp} de experiencia</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        );

      case 'contact':
        return (
          <>
            <section className="py-16" style={{ backgroundColor: colors?.background }}>
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-12">
                    <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4" style={{ color: colors?.text }}>
                      Contáctanos
                    </h1>
                    <p className="text-lg" style={{ color: colors?.textMuted }}>
                      Estamos aquí para ayudarte
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Info */}
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-6 h-6 mt-1" style={{ color: colors?.primary }} />
                        <div>
                          <p className="font-semibold" style={{ color: colors?.text }}>Dirección</p>
                          <p style={{ color: colors?.textMuted }}>
                            {studio?.address || '123 Main Street'}<br />
                            {studio?.city || 'Miami, FL 33101'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Phone className="w-6 h-6 mt-1" style={{ color: colors?.primary }} />
                        <div>
                          <p className="font-semibold" style={{ color: colors?.text }}>Teléfono</p>
                          <p style={{ color: colors?.textMuted }}>{studio?.phone || '(305) 555-0123'}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Clock className="w-6 h-6 mt-1" style={{ color: colors?.primary }} />
                        <div>
                          <p className="font-semibold" style={{ color: colors?.text }}>Horarios</p>
                          <p style={{ color: colors?.textMuted }}>
                            Lun - Vie: 9am - 7pm<br />
                            Sáb: 10am - 5pm<br />
                            Dom: Cerrado
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 mt-6">
                        {studio?.instagram && (
                          <a
                            href={studio.instagram}
                            className="p-3 rounded-full transition-colors"
                            style={{ backgroundColor: colors?.primary, color: 'white' }}
                          >
                            <Instagram className="w-5 h-5" />
                          </a>
                        )}
                        {studio?.facebook && (
                          <a
                            href={studio.facebook}
                            className="p-3 rounded-full transition-colors"
                            style={{ backgroundColor: colors?.primary, color: 'white' }}
                          >
                            <Facebook className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Contact Form */}
                    <Card style={{ borderColor: colors?.border, backgroundColor: colors?.surface }}>
                      <CardContent className="p-6">
                        <h3 className="font-heading text-xl font-semibold mb-4" style={{ color: colors?.text }}>
                          Envíanos un Mensaje
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-1" style={{ color: colors?.text }}>Nombre</label>
                            <input
                              type="text"
                              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                              style={{ borderColor: colors?.border, backgroundColor: colors?.background }}
                              placeholder="Tu nombre"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1" style={{ color: colors?.text }}>Email</label>
                            <input
                              type="email"
                              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                              style={{ borderColor: colors?.border, backgroundColor: colors?.background }}
                              placeholder="tu@email.com"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1" style={{ color: colors?.text }}>Mensaje</label>
                            <textarea
                              rows={4}
                              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                              style={{ borderColor: colors?.border, backgroundColor: colors?.background }}
                              placeholder="¿En qué podemos ayudarte?"
                            />
                          </div>
                          <Button className="w-full" style={{ backgroundColor: colors?.primary, color: colors?.primaryForeground }}>
                            Enviar Mensaje
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </section>
          </>
        );

      case 'faq':
        return (
          <>
            <section className="py-16" style={{ backgroundColor: colors?.background }}>
              <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                  <div className="text-center mb-12">
                    <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4" style={{ color: colors?.text }}>
                      Preguntas Frecuentes
                    </h1>
                    <p className="text-lg" style={{ color: colors?.textMuted }}>
                      Todo lo que necesitas saber sobre nuestros servicios
                    </p>
                  </div>

                  {/* Waxing FAQs */}
                  <div className="mb-12">
                    <h2 className="font-heading text-2xl font-bold mb-6" style={{ color: colors?.text }}>
                      Sobre Waxing
                    </h2>
                    <div className="space-y-4">
                      {SEO_TIPS.waxing.map((faq, idx) => (
                        <Card key={idx} style={{ borderColor: colors?.border, backgroundColor: colors?.surface }}>
                          <CardContent className="p-6">
                            <h3 className="font-semibold mb-2 flex items-center gap-2" style={{ color: colors?.text }}>
                              <HelpCircle className="w-5 h-5" style={{ color: colors?.accent }} />
                              {faq.question}
                            </h3>
                            <p style={{ color: colors?.textMuted }}>{faq.answer}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Aftercare FAQs */}
                  <div className="mb-12">
                    <h2 className="font-heading text-2xl font-bold mb-6" style={{ color: colors?.text }}>
                      Cuidados Después del Waxing
                    </h2>
                    <div className="space-y-4">
                      {SEO_TIPS.aftercare.map((faq, idx) => (
                        <Card key={idx} style={{ borderColor: colors?.border, backgroundColor: colors?.surface }}>
                          <CardContent className="p-6">
                            <h3 className="font-semibold mb-2 flex items-center gap-2" style={{ color: colors?.text }}>
                              <HelpCircle className="w-5 h-5" style={{ color: colors?.accent }} />
                              {faq.question}
                            </h3>
                            <p style={{ color: colors?.textMuted }}>{faq.answer}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Local FAQs */}
                  <div>
                    <h2 className="font-heading text-2xl font-bold mb-6" style={{ color: colors?.text }}>
                      Información del Estudio
                    </h2>
                    <div className="space-y-4">
                      {SEO_TIPS.local.map((faq, idx) => (
                        <Card key={idx} style={{ borderColor: colors?.border, backgroundColor: colors?.surface }}>
                          <CardContent className="p-6">
                            <h3 className="font-semibold mb-2 flex items-center gap-2" style={{ color: colors?.text }}>
                              <HelpCircle className="w-5 h-5" style={{ color: colors?.accent }} />
                              {faq.question}
                            </h3>
                            <p style={{ color: colors?.textMuted }}>{faq.answer}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        );

      case 'appointments':
        return (
          <>
            <section className="py-16" style={{ backgroundColor: colors?.background }}>
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-12">
                    <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4" style={{ color: colors?.text }}>
                      Reserva tu Cita
                    </h1>
                    <p className="text-lg" style={{ color: colors?.textMuted }}>
                      Elige el servicio y horario que mejor te convenga
                    </p>
                  </div>

                  {/* Booking CTA */}
                  <Card className="mb-12" style={{ borderColor: colors?.border, backgroundColor: colors?.surface }}>
                    <CardContent className="p-8 text-center">
                      <Calendar className="w-16 h-16 mx-auto mb-4" style={{ color: colors?.primary }} />
                      <h2 className="font-heading text-2xl font-bold mb-4" style={{ color: colors?.text }}>
                        Sistema de Reservas Online
                      </h2>
                      <p className="mb-6" style={{ color: colors?.textMuted }}>
                        Reserva tu cita en segundos. Sin llamadas, sin esperas.
                      </p>
                      <Link href={getPath('appointments')}>
                        <Button
                          size="lg"
                          className="rounded-full px-8 py-6 text-lg"
                          style={{ backgroundColor: colors?.primary, color: colors?.primaryForeground }}
                        >
                          Agendar Ahora
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>

                  {/* Policies */}
                  <div className="grid md:grid-cols-2 gap-6 mb-12">
                    <Card style={{ borderColor: colors?.border, backgroundColor: colors?.surface }}>
                      <CardContent className="p-6">
                        <h3 className="font-heading text-lg font-semibold mb-4" style={{ color: colors?.text }}>
                          Políticas de Cancelación
                        </h3>
                        <ul className="space-y-2 text-sm" style={{ color: colors?.textMuted }}>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 mt-0.5" style={{ color: colors?.primary }} />
                            Cancela gratis hasta 24 horas antes
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 mt-0.5" style={{ color: colors?.primary }} />
                            50% de cargo por cancelaciones tardías
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 mt-0.5" style={{ color: colors?.primary }} />
                            No-show: cargo completo del servicio
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card style={{ borderColor: colors?.border, backgroundColor: colors?.surface }}>
                      <CardContent className="p-6">
                        <h3 className="font-heading text-lg font-semibold mb-4" style={{ color: colors?.text }}>
                          Tips de Preparación
                        </h3>
                        <ul className="space-y-2 text-sm" style={{ color: colors?.textMuted }}>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 mt-0.5" style={{ color: colors?.primary }} />
                            Vello de al menos 1/4 de pulgada
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 mt-0.5" style={{ color: colors?.primary }} />
                            Exfolia 24 horas antes
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 mt-0.5" style={{ color: colors?.primary }} />
                            Evita el sol antes del servicio
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Availability Info */}
                  <Card style={{ borderColor: colors?.border, backgroundColor: colors?.surface }}>
                    <CardContent className="p-6">
                      <h3 className="font-heading text-lg font-semibold mb-4" style={{ color: colors?.text }}>
                        Horarios Disponibles
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                          { day: 'Lunes', hours: '9am - 7pm' },
                          { day: 'Martes', hours: '9am - 7pm' },
                          { day: 'Miércoles', hours: '9am - 7pm' },
                          { day: 'Jueves', hours: '9am - 8pm' },
                          { day: 'Viernes', hours: '9am - 7pm' },
                          { day: 'Sábado', hours: '10am - 5pm' },
                          { day: 'Domingo', hours: 'Cerrado' },
                        ].map((schedule, idx) => (
                          <div key={idx} className="text-center p-3 rounded-lg" style={{ backgroundColor: colors?.background }}>
                            <p className="font-semibold" style={{ color: colors?.text }}>{schedule.day}</p>
                            <p className="text-sm" style={{ color: colors?.textMuted }}>{schedule.hours}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>
          </>
        );

      default:
        return (
          <section className="py-16" style={{ backgroundColor: colors?.background }}>
            <div className="container mx-auto px-4 text-center">
              <h1 className="font-heading text-4xl font-bold mb-4" style={{ color: colors?.text }}>
                Página no encontrada
              </h1>
              <Link href={getPath('home')}>
                <Button style={{ backgroundColor: colors?.primary, color: colors?.primaryForeground }}>
                  Volver al Inicio
                </Button>
              </Link>
            </div>
          </section>
        );
    }
  };

  const pageConfig = enabledPages.find(p => p.id === currentPage);
  const template = pageConfig ? PAGE_TEMPLATES[pageConfig.id as keyof typeof PAGE_TEMPLATES] : null;
  const Icon = template ? iconMap[template.icon] : null;

  const studioSEOData = {
    businessName: studio?.businessName || 'Mi Estudio',
    tagline: studio?.tagline,
    city: studio?.city,
    address: studio?.address,
    phone: studio?.phone,
    instagram: studio?.instagram,
    facebook: studio?.facebook,
  };

  return (
    <>
      <StudioMetaTags page={currentPage} studioData={studioSEOData} />
      <div className="min-h-screen" style={{ backgroundColor: colors?.background }}>
      {/* Navigation */}
      <nav
        className="sticky top-0 z-50 backdrop-blur-md border-b"
        style={{
          backgroundColor: `${colors?.surface}EE`,
          borderColor: colors?.border
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: colors?.primary }}
              >
                <Scissors className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-heading text-xl font-bold" style={{ color: colors?.text }}>
                  {studio?.businessName || 'Mi Estudio'}
                </h1>
                {studio?.tagline && (
                  <p className="text-xs hidden sm:block" style={{ color: colors?.textMuted }}>{studio.tagline}</p>
                )}
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              {enabledPages.map((page) => {
                const pg = PAGE_TEMPLATES[page.id as keyof typeof PAGE_TEMPLATES];
                return (
                  <Link
                    key={page.id}
                    href={getPath(page.id)}
                    className={`text-sm font-medium transition-colors ${
                      currentPage === page.id
                        ? 'underline underline-offset-4'
                        : 'hover:opacity-70'
                    }`}
                    style={{
                      color: currentPage === page.id ? colors?.primary : colors?.text
                    }}
                  >
                    {pg?.name}
                  </Link>
                );
              })}
              <Link href={getPath('appointments')}>
                <Button
                  className="rounded-full px-6"
                  style={{ backgroundColor: colors?.primary, color: colors?.primaryForeground }}
                >
                  Reservar
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ color: colors?.text }}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div
            className="md:hidden border-t p-4 space-y-3"
            style={{ backgroundColor: colors?.surface, borderColor: colors?.border }}
          >
            {enabledPages.map((page) => {
              const pg = PAGE_TEMPLATES[page.id as keyof typeof PAGE_TEMPLATES];
              return (
                <Link
                  key={page.id}
                  href={getPath(page.id)}
                  className="block py-2 text-sm font-medium"
                  style={{ color: colors?.text }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {pg?.name}
                </Link>
              );
            })}
            <Link href={getPath('appointments')} onClick={() => setMobileMenuOpen(false)}>
              <Button
                className="w-full rounded-full"
                style={{ backgroundColor: colors?.primary, color: colors?.primaryForeground }}
              >
                Reservar Ahora
              </Button>
            </Link>
          </div>
        )}
      </nav>

      {/* Page Content */}
      {renderPageContent()}

      {/* Footer */}
      <footer
        className="py-8 border-t"
        style={{ backgroundColor: colors?.surface, borderColor: colors?.border }}
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-heading font-semibold mb-4" style={{ color: colors?.text }}>
                {studio?.businessName || 'Mi Estudio'}
              </h3>
              <p className="text-sm" style={{ color: colors?.textMuted }}>
                {studio?.tagline || 'Expertos en cuidado de la piel'}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4" style={{ color: colors?.text }}>Enlaces</h4>
              <div className="space-y-2">
                {enabledPages.slice(0, 4).map((page) => {
                  const pg = PAGE_TEMPLATES[page.id as keyof typeof PAGE_TEMPLATES];
                  return (
                    <Link
                      key={page.id}
                      href={getPath(page.id)}
                      className="block text-sm"
                      style={{ color: colors?.textMuted }}
                    >
                      {pg?.name}
                    </Link>
                  );
                })}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4" style={{ color: colors?.text }}>Contacto</h4>
              <p className="text-sm" style={{ color: colors?.textMuted }}>
                {studio?.address || '123 Main Street'}<br />
                {studio?.city || 'Miami, FL 33101'}<br />
                {studio?.phone || '(305) 555-0123'}
              </p>
            </div>
          </div>
          <div className="border-t pt-8 text-center" style={{ borderColor: colors?.border }}>
            <p className="text-sm" style={{ color: colors?.textMuted }}>
              © 2026 {studio?.businessName || 'Mi Estudio'}. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
}
