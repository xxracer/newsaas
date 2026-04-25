'use client';

import Link from 'next/link';
import { Scissors, Calendar, CreditCard, Palette, Globe, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LUXURY_THEMES } from '@/lib/firebase-mock';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* ============================================
          HERO SECTION
          ============================================ */}
      <section style={{
        background: 'linear-gradient(135deg, #FDF8F5 0%, #F5E6E6 50%, #E8C4C4 100%)',
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative elements */}
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.3,
        }}>
          <div style={{
            position: 'absolute',
            top: 80,
            left: 40,
            width: 288,
            height: 288,
            backgroundColor: 'rgba(183, 110, 121, 0.1)',
            borderRadius: '50%',
            filter: 'blur(100px)'
          }} />
          <div style={{
            position: 'absolute',
            bottom: 80,
            right: 40,
            width: 384,
            height: 384,
            backgroundColor: 'rgba(212, 175, 55, 0.1)',
            borderRadius: '50%',
            filter: 'blur(100px)'
          }} />
        </div>

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1200px', padding: '24px', textAlign: 'center' }}>
          {/* Logo/Brand */}
          <div style={{ marginBottom: 32 }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 16
            }}>
              <div style={{
                width: 64,
                height: 64,
                borderRadius: '9999px',
                background: 'linear-gradient(135deg, #B76E79, #D4AF37)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)'
              }}>
                <Scissors style={{ width: 32, height: 32, color: 'white' }} />
              </div>
            </div>
            <h1 className="font-heading" style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: 700,
              color: '#1a1a1a',
              marginBottom: 16,
              fontFamily: "'Playfair Display', Georgia, serif"
            }}>
              WaxingSetudios
            </h1>
            <p className="font-heading" style={{
              fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
              color: '#4a4a4a',
              fontStyle: 'italic',
              fontFamily: "'Playfair Display', Georgia, serif"
            }}>
              La plataforma luxury para estudios de waxing exclusivos
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
            <Link href="/auth/signup">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-accent text-white px-8 py-6 text-lg rounded-full shadow-luxury hover:opacity-90 transition-opacity"
              >
                Comenzar Gratis
              </Button>
            </Link>
            <Link href="#demo">
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-6 text-lg rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors"
              >
                Ver Demo
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-gray-600">
            <span className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Sin tarjeta requerida
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              14 días de prueba gratis
            </span>
            <span className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Cancela cuando quieras
            </span>
          </div>
        </div>
      </section>

      {/* ============================================
          FEATURES SECTION
          ============================================ */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-bold text-gray-900 mb-4">
              Todo lo que tu estudio necesita
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Una plataforma completa diseñada específicamente para estudios de waxing de alto nivel
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Palette,
                title: '5 Diseños Luxury',
                description: 'Elige entre 5 plantillas premium diseñadas por expertos en branding de lujo. Rose Gold, Midnight Luxe, Blanc Pur, Velvet Berry y Nude Minimal.',
              },
              {
                icon: Calendar,
                title: 'Sistema de Reservas',
                description: 'Gestión de citas intuitiva con recordatorios automáticos, buffers entre servicios y calendarización inteligente.',
              },
              {
                icon: CreditCard,
                title: 'Pagos con Stripe',
                description: 'Integración completa con Stripe Connect. Recibe pagos directamente en tu cuenta, vende gift cards y maneja depósitos.',
              },
              {
                icon: Globe,
                title: 'Dominio Personalizado',
                description: 'Conecta tu propio dominio (tudominio.com) y haz que tu estudio tenga presencia profesional única.',
              },
              {
                icon: Shield,
                title: 'Seguridad Enterprise',
                description: 'Autenticación con Google, protección de datos y backups automáticos. Tus datos están seguros con Firebase.',
              },
              {
                icon: Scissors,
                title: 'Servicios Ilimitados',
                description: 'Crea todos los servicios que necesites, con categorías, precios y duraciones personalizables.',
              },
            ].map((feature) => (
              <Card key={feature.title} className="border-none shadow-luxury-soft hover:shadow-luxury transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="font-heading text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          THEMES SHOWCASE
          ============================================ */}
      <section className="py-24 gradient-blanc">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-bold text-gray-900 mb-4">
              5 Diseños Exclusivos
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Cada estudio puede elegir el diseño que mejor representa su marca
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {LUXURY_THEMES.map((theme) => (
              <div
                key={theme.id}
                className="group relative overflow-hidden rounded-2xl shadow-luxury-soft hover:shadow-luxury transition-all cursor-pointer"
              >
                {/* Preview placeholder - replace with actual images */}
                <div className={`aspect-[3/4] ${getThemeGradient(theme.id)}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-heading text-white text-lg font-semibold">
                    {theme.name}
                  </h3>
                  <p className="text-white/80 text-sm mt-1">
                    {theme.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          PRICING SECTION
          ============================================ */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-bold text-gray-900 mb-4">
              Planes Simples y Transparentes
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Sin costos ocultos. Elige el plan que mejor se adapte a tu estudio.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter */}
            <Card className="border-2 border-gray-200 shadow-luxury-soft">
              <CardHeader>
                <CardTitle className="font-heading text-2xl">Starter</CardTitle>
                <CardDescription className="text-lg">Para estudios pequeños</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">$29</span>
                  <span className="text-gray-600">/mes</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center gap-2">✓ 1 Diseño disponible</li>
                  <li className="flex items-center gap-2">✓ Hasta 100 citas/mes</li>
                  <li className="flex items-center gap-2">✓ Servicios ilimitados</li>
                  <li className="flex items-center gap-2">✓ Integración Stripe</li>
                  <li className="flex items-center gap-2">✗ Dominio personalizado</li>
                </ul>
                <Button className="w-full mt-6" variant="outline">
                  Comenzar Gratis
                </Button>
              </CardContent>
            </Card>

            {/* Professional */}
            <Card className="border-2 border-primary shadow-luxury relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                Más Popular
              </div>
              <CardHeader>
                <CardTitle className="font-heading text-2xl">Professional</CardTitle>
                <CardDescription className="text-lg">Para estudios en crecimiento</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">$79</span>
                  <span className="text-gray-600">/mes</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center gap-2">✓ 3 Diseños disponibles</li>
                  <li className="flex items-center gap-2">✓ Citas ilimitadas</li>
                  <li className="flex items-center gap-2">✓ Servicios ilimitados</li>
                  <li className="flex items-center gap-2">✓ Stripe + Gift Cards</li>
                  <li className="flex items-center gap-2">✓ Dominio personalizado</li>
                  <li className="flex items-center gap-2">✓ Analytics básico</li>
                </ul>
                <Button className="w-full mt-6 bg-primary hover:opacity-90">
                  Comenzar Gratis
                </Button>
              </CardContent>
            </Card>

            {/* Elite */}
            <Card className="border-2 border-amber-400 shadow-luxury">
              <CardHeader>
                <CardTitle className="font-heading text-2xl flex items-center gap-2">
                  Elite
                  <span className="text-amber-500">◆</span>
                </CardTitle>
                <CardDescription className="text-lg">Para estudios premium</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">$149</span>
                  <span className="text-gray-600">/mes</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center gap-2">✓ 5 Diseños disponibles</li>
                  <li className="flex items-center gap-2">✓ Todo ilimitado</li>
                  <li className="flex items-center gap-2">✓ Prioridad en soporte</li>
                  <li className="flex items-center gap-2">✓ Analytics avanzado</li>
                  <li className="flex items-center gap-2">✓ Marketing automation</li>
                  <li className="flex items-center gap-2">✓ API access</li>
                </ul>
                <Button className="w-full mt-6 bg-gradient-to-r from-primary to-accent hover:opacity-90">
                  Contactar Ventas
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ============================================
          CTA SECTION
          ============================================ */}
      <section className="py-24 gradient-rose-gold">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-heading text-4xl font-bold text-gray-900 mb-4">
            ¿Listo para llevar tu estudio al siguiente nivel?
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
            Únete a WaxingSetudios y transforma la manera en que gestionas tu estudio de waxing.
          </p>
          <Link href="/auth/signup">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-accent text-white px-12 py-6 text-lg rounded-full shadow-luxury hover:opacity-90 transition-opacity"
            >
              Comenzar mi Prueba Gratis
            </Button>
          </Link>
          <p className="mt-4 text-sm text-gray-600">
            14 días de prueba gratis · Sin tarjeta requerida
          </p>
        </div>
      </section>

      {/* ============================================
          FOOTER
          ============================================ */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Scissors className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading text-xl font-bold">WaxingSetudios</span>
            </div>
            <div className="text-sm text-gray-400">
              © 2026 WaxingSetudios. Todos los derechos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function getThemeGradient(themeId: string): string {
  const gradients: Record<string, string> = {
    'waxing-rose-gold': 'bg-gradient-to-br from-[#FDF8F5] via-[#F5E6E6] to-[#E8C4C4]',
    'midnight-luxe': 'bg-gradient-to-br from-[#0D0D0D] via-[#1A1A1A] to-[#2D2D2D]',
    'blanc-pur': 'bg-gradient-to-br from-[#FAF9F7] via-[#F5F0EB] to-[#E8DDD5]',
    'velvet-berry': 'bg-gradient-to-br from-[#1A0A0F] via-[#2D121A] to-[#4A0E1E]',
    'nude-minimal': 'bg-gradient-to-br from-[#F9F7F5] via-[#F0E8E0] to-[#E0D0C0]',
  };
  return gradients[themeId] || gradients['waxing-rose-gold'];
}
