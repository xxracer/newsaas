'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { THEME_COLORS, LuxuryThemeId, DEFAULT_PAGES } from '@/lib/firebase-mock';
import { BUSINESS_TYPES, getBusinessType } from '@/lib/business-types';
import { getThemesForBusinessType, getDefaultThemeIdForBusinessType, getThemeById, NicheTheme } from '@/lib/themes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Check, Palette } from 'lucide-react';

type SetupStep = 'business' | 'business-type' | 'theme' | 'domain' | 'complete';

export default function StudioSetupPage() {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState<SetupStep>('business-type');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [studioId, setStudioId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    businessName: '',
    businessType: 'waxing' as string,
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'USA',
    theme: getDefaultThemeIdForBusinessType('waxing') as LuxuryThemeId,
    domain: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBusinessSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const mockStudioId = 'studio-' + Date.now();
      const studioData = {
        id: mockStudioId,
        businessName: formData.businessName,
        businessType: formData.businessType,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        country: formData.country,
        theme: {
          id: formData.theme,
          name: getThemeById(formData.theme)?.name || formData.theme,
          description: getThemeById(formData.theme)?.description || '',
        },
        colors: THEME_COLORS[formData.theme],
        domain: '',
        stripeAccountId: null,
        stripeConnected: false,
        bookingBufferMinutes: 15,
        maxAdvanceDays: 60,
        timezone: 'America/New_York',
        currency: 'USD',
        isActive: true,
        isPublished: false,
        pages: DEFAULT_PAGES,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      localStorage.setItem('mock_studio_' + mockStudioId, JSON.stringify(studioData));
      localStorage.setItem('mock_user_studio_id', mockStudioId);
      localStorage.setItem('waxing-studio-theme', formData.theme);

      setStudioId(mockStudioId);
      setCurrentStep('theme');
    } catch (err: any) {
      setError(err.message || 'Failed to create studio');
    } finally {
      setIsLoading(false);
    }
  };

  const handleThemeSubmit = async () => {
    const bt = getBusinessType(formData.businessType);
    const effectiveTheme = formData.theme || bt?.defaultThemeId || 'waxing-rose-gold';

    if (studioId) {
      const studioData = JSON.parse(localStorage.getItem('mock_studio_' + studioId) || '{}');
      studioData.theme = {
        id: effectiveTheme,
        name: getThemeById(effectiveTheme)?.name || effectiveTheme,
        description: getThemeById(effectiveTheme)?.description || '',
      };
      studioData.colors = THEME_COLORS[effectiveTheme];
      localStorage.setItem('mock_studio_' + studioId, JSON.stringify(studioData));
      localStorage.setItem('waxing-studio-theme', effectiveTheme);
    }
    setCurrentStep('domain');
  };

  const handleDomainSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (!studioId) throw new Error('No studio ID found');

      const studioData = JSON.parse(localStorage.getItem('mock_studio_' + studioId) || '{}');
      studioData.domain = formData.domain.toLowerCase().replace('www.', '');
      studioData.isPublished = true;
      studioData.updatedAt = new Date().toISOString();
      localStorage.setItem('mock_studio_' + studioId, JSON.stringify(studioData));

      setCurrentStep('complete');
    } catch (err: any) {
      setError(err.message || 'Failed to setup domain');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'business-type':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="font-heading text-xl font-semibold mb-2">¿Qué tipo de negocio tienes?</h3>
              <p className="text-sm text-gray-500">Selecciona la categoría que mejor describe tu negocio</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {BUSINESS_TYPES.map((bt) => (
                <Card
                  key={bt.id}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    formData.businessType === bt.id
                      ? 'ring-2 ring-primary border-primary'
                      : 'border-gray-200'
                  }`}
                  onClick={() => setFormData((prev) => ({
                    ...prev,
                    businessType: bt.id,
                    theme: getDefaultThemeIdForBusinessType(bt.id) as LuxuryThemeId,
                  }))}
                >
                  <CardContent className="p-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                      <span className="text-lg font-bold text-primary">{bt.shortName[0]}</span>
                    </div>
                    <h4 className="font-heading font-semibold">{bt.name}</h4>
                    <p className="text-xs text-gray-500 mt-1">{bt.description}</p>
                    {formData.businessType === bt.id && (
                      <div className="mt-2 flex items-center text-primary text-sm font-medium">
                        <Check className="w-4 h-4 mr-1" />
                        Seleccionado
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button
              onClick={() => setCurrentStep('business')}
              className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
            >
              Continuar
            </Button>
          </div>
        );

      case 'business':
        return (
          <form onSubmit={handleBusinessSubmit} className="space-y-6">
            <div>
              <h3 className="font-heading text-xl font-semibold mb-2">Información de tu Estudio</h3>
              <p className="text-sm text-gray-500">Cuéntanos sobre tu negocio</p>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="businessName">Nombre del Estudio *</Label>
                <Input
                  id="businessName"
                  name="businessName"
                  placeholder="Ej: Rose Waxing Studio"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email de Contacto *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="contacto@mistudio.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="(123) 456-7890"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Dirección</Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="123 Main St"
                  value={formData.address}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">Ciudad</Label>
                  <Input
                    id="city"
                    name="city"
                    placeholder="Miami"
                    value={formData.city}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">Estado</Label>
                  <Input
                    id="state"
                    name="state"
                    placeholder="FL"
                    value={formData.state}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP</Label>
                  <Input
                    id="zip"
                    name="zip"
                    placeholder="33101"
                    value={formData.zip}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                'Continuar'
              )}
            </Button>
          </form>
        );

      case 'theme':
        const availableThemes = getThemesForBusinessType(formData.businessType);
        return (
          <div className="space-y-6">
            <div>
              <h3 className="font-heading text-xl font-semibold mb-2">Elige tu Diseño</h3>
              <p className="text-sm text-gray-500">
                Selecciona el tema que mejor representa tu marca
                {formData.businessType && (
                  <span className="block mt-1 text-xs text-gray-400">
                    Mostrando {availableThemes.length} diseños para {getBusinessType(formData.businessType)?.name}
                  </span>
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {availableThemes.map((theme: NicheTheme) => (
                <Card
                  key={theme.id}
                  className={`cursor-pointer transition-all hover:shadow-lg overflow-hidden ${
                    formData.theme === theme.id
                      ? 'ring-2 ring-primary border-primary'
                      : 'border-gray-200'
                  }`}
                  onClick={() => setFormData((prev) => ({ ...prev, theme: theme.id as LuxuryThemeId }))}
                >
                  <CardContent className="p-0">
                    <div
                      className="relative p-4 pb-3"
                      style={{
                        background: theme.colors.background,
                        borderBottom: `1px solid ${theme.colors.border}`,
                      }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div
                          className="font-heading font-bold text-sm"
                          style={{ color: theme.colors.text }}
                        >
                          {theme.name}
                        </div>
                        <div
                          className="w-6 h-6 rounded-full"
                          style={{ background: theme.colors.primary }}
                        />
                      </div>

                      <div
                        className="rounded-md p-3 mb-2"
                        style={{ background: theme.colors.surface }}
                      >
                        <div
                          className="font-heading font-semibold text-xs mb-1"
                          style={{ color: theme.colors.text }}
                        >
                          Bienvenida
                        </div>
                        <div
                          className="text-[10px] mb-2 leading-relaxed"
                          style={{ color: theme.colors.textMuted }}
                        >
                          Experimenta nuestros tratamientos de lujo.
                        </div>
                        <div className="flex gap-2">
                          <span
                            className="text-[10px] px-2 py-1 rounded-full font-medium"
                            style={{
                              background: theme.colors.primary,
                              color: theme.colors.surface,
                            }}
                          >
                            Reservar
                          </span>
                          <span
                            className="text-[10px] px-2 py-1 rounded-full font-medium"
                            style={{
                              background: theme.colors.secondary,
                              color: theme.colors.text,
                            }}
                          >
                            Servicios
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <div
                          className="flex-1 rounded-md p-2"
                          style={{ background: theme.colors.surface }}
                        >
                          <div
                            className="w-full h-8 rounded mb-1"
                            style={{ background: theme.colors.secondary }}
                          />
                          <div
                            className="text-[9px] font-medium"
                            style={{ color: theme.colors.text }}
                          >
                            Brazos
                          </div>
                          <div
                            className="text-[9px]"
                            style={{ color: theme.colors.primary }}
                          >
                            $35
                          </div>
                        </div>
                        <div
                          className="flex-1 rounded-md p-2"
                          style={{ background: theme.colors.surface }}
                        >
                          <div
                            className="w-full h-8 rounded mb-1"
                            style={{ background: theme.colors.secondary }}
                          />
                          <div
                            className="text-[9px] font-medium"
                            style={{ color: theme.colors.text }}
                          >
                            Piernas
                          </div>
                          <div
                            className="text-[9px]"
                            style={{ color: theme.colors.primary }}
                          >
                            $55
                          </div>
                        </div>
                      </div>

                      {formData.theme === theme.id && (
                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-md">
                          <Check className="w-4 h-4 text-green-600" />
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <h4 className="font-heading font-semibold">{theme.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">{theme.description}</p>
                      <div className="flex gap-1.5 mt-3">
                        {Object.entries(theme.colors).slice(0, 5).map(([key, color]) => (
                          <div
                            key={key}
                            className="w-6 h-6 rounded-full border border-gray-200"
                            style={{ backgroundColor: color }}
                            title={`${key}: ${color}`}
                          />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => setCurrentStep('business')}
                className="flex-1"
              >
                Atrás
              </Button>
              <Button
                onClick={handleThemeSubmit}
                className="flex-1 bg-gradient-to-r from-primary to-accent"
              >
                Continuar
              </Button>
            </div>
          </div>
        );

      case 'domain':
        return (
          <form onSubmit={handleDomainSubmit} className="space-y-6">
            <div>
              <h3 className="font-heading text-xl font-semibold mb-2">Tu Dominio</h3>
              <p className="text-sm text-gray-500">
                Elige el dominio donde tus clientes te encontrarán
              </p>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="domain">Dominio Personalizado</Label>
              <Input
                id="domain"
                name="domain"
                placeholder="mistudio.com"
                value={formData.domain}
                onChange={handleInputChange}
                required
                disabled={isLoading}
              />
              <p className="text-xs text-gray-500">
                Puedes configurar esto más tarde en la configuración de tu estudio
              </p>
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentStep('theme')}
                className="flex-1"
              >
                Atrás
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-primary to-accent"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Configurando...
                  </>
                ) : (
                  'Completar Setup'
                )}
              </Button>
            </div>
          </form>
        );

      case 'complete':
        return (
          <div className="text-center py-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mx-auto mb-6 shadow-luxury">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h3 className="font-heading text-2xl font-bold mb-2">¡Estudio Creado!</h3>
            <p className="text-gray-600 mb-8">
              Tu estudio está listo. Ahora puedes comenzar a configurar tus servicios y citas.
            </p>
            <Button
              onClick={() => router.push('/admin/dashboard')}
              className="bg-gradient-to-r from-primary to-accent"
            >
              Ir al Dashboard
            </Button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen gradient-blanc flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-2xl shadow-luxury">
        <CardHeader className="text-center border-b">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4">
            <Palette className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="font-heading text-2xl">Configura tu Estudio</CardTitle>
          <CardDescription>
            Paso {currentStep === 'business-type' ? '1' : currentStep === 'business' ? '2' : currentStep === 'theme' ? '3' : '4'} de 4
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">{renderStep()}</CardContent>
      </Card>
    </div>
  );
}
