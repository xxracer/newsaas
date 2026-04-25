'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMockAuth } from '@/components/providers/MockAuthProvider';
import { useTheme } from '@/components/providers/ThemeProvider';
import { LUXURY_THEMES, THEME_COLORS, LuxuryThemeId } from '@/lib/firebase-mock';
import { getThemesForBusinessType } from '@/lib/themes';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Check, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ThemeSettingsPage() {
  const router = useRouter();
  const { user } = useMockAuth();
  const { theme, setTheme } = useTheme();
  const [businessType, setBusinessType] = useState<string>('waxing');
  const [selectedTheme, setSelectedTheme] = useState<LuxuryThemeId>(theme as LuxuryThemeId || 'waxing-rose-gold');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (user?.studioId) {
      const stored = localStorage.getItem('mock_studio_' + user.studioId);
      if (stored) {
        const data = JSON.parse(stored);
        if (data.businessType) {
          setBusinessType(data.businessType);
        }
        if (data.theme?.id) {
          setSelectedTheme(data.theme.id as LuxuryThemeId);
        }
      }
    }
  }, [user?.studioId]);

  const availableThemes = getThemesForBusinessType(businessType);

  const handleSave = async () => {
    setIsSaving(true);

    // Save to localStorage
    if (user?.studioId) {
      const studioData = JSON.parse(localStorage.getItem('mock_studio_' + user.studioId) || '{}');
      const themeOption = availableThemes.find(t => t.id === selectedTheme);
      studioData.theme = {
        id: selectedTheme,
        name: themeOption?.name,
        description: themeOption?.description,
      };
      studioData.colors = THEME_COLORS[selectedTheme];
      localStorage.setItem('mock_studio_' + user.studioId, JSON.stringify(studioData));
    }

    // Apply theme
    setTheme(selectedTheme);

    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 500);
  };

  return (
    <div className="p-6 lg:p-8 max-w-6xl">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/admin/settings">
          <Button variant="outline" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="font-heading text-2xl font-bold mb-2">Cambiar Diseño</h1>
          <p className="text-gray-500">Selecciona el tema que mejor representa tu marca</p>
        </div>
      </div>

      {showSuccess && (
        <Alert className="mb-6 border-green-200 bg-green-50">
          <AlertDescription className="text-green-800">
            ✓ Diseño guardado exitosamente
          </AlertDescription>
        </Alert>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableThemes.map((themeOption) => (
          <Card
            key={themeOption.id}
            className={`cursor-pointer transition-all hover:shadow-xl ${
              selectedTheme === themeOption.id
                ? 'ring-2 ring-primary border-primary shadow-lg'
                : 'border-gray-200'
            }`}
            onClick={() => setSelectedTheme(themeOption.id as LuxuryThemeId)}
          >
            <CardContent className="p-0">
              {/* Preview */}
              <div
                className="aspect-[4/3] rounded-t-lg relative overflow-hidden"
                style={{
                  background: getThemeGradient(themeOption.id)
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-4">
                    <div
                      className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center shadow-lg"
                      style={{
                        background: THEME_COLORS[themeOption.id as LuxuryThemeId].primary,
                      }}
                    >
                      <ScissorsIcon className="w-8 h-8" style={{ color: THEME_COLORS[themeOption.id as LuxuryThemeId].surface }} />
                    </div>
                    <p
                      className="font-heading font-semibold text-sm"
                      style={{ color: THEME_COLORS[themeOption.id as LuxuryThemeId].text }}
                    >
                      Vista Previa
                    </p>
                  </div>
                </div>

                {selectedTheme === themeOption.id && (
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-heading font-semibold text-lg mb-1">
                  {themeOption.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {themeOption.description}
                </p>

                {/* Color palette */}
                <div className="flex gap-2 mt-4">
                  {Object.values(THEME_COLORS[themeOption.id as LuxuryThemeId]).slice(0, 5).map((color, idx) => (
                    <div
                      key={idx}
                      className="w-8 h-8 rounded-full border border-gray-200"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Save button */}
      <div className="mt-8 flex justify-end gap-4">
        <Link href="/admin/settings">
          <Button variant="outline">Cancelar</Button>
        </Link>
        <Button
          onClick={handleSave}
          disabled={isSaving || selectedTheme === theme}
          className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
        >
          {isSaving ? 'Guardando...' : 'Guardar Diseño'}
        </Button>
      </div>
    </div>
  );
}

function ScissorsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <line x1="20" x2="8.12" y1="4" y2="15.88" />
      <line x1="14.47" x2="20" y1="14.48" y2="20" />
      <line x1="8.12" x2="12" y1="8.12" y2="12" />
    </svg>
  );
}

function getThemeGradient(themeId: string): string {
  const colors = THEME_COLORS[themeId as LuxuryThemeId];
  if (!colors) return 'linear-gradient(135deg, #FDF8F5 0%, #F5E6E6 50%, #E8C4C4 100%)';
  return `linear-gradient(135deg, ${colors.background} 0%, ${colors.secondary} 50%, ${colors.primary} 100%)`;
}
