'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SEO_TIPS, LOCAL_SEO_KEYWORDS } from '@/lib/firebase-mock';
import {
  TrendingUp,
  Search,
  MapPin,
  Calendar,
  Sparkles,
  Check,
  Copy,
  Lightbulb,
  Target,
  Eye,
} from 'lucide-react';

interface SEOTipsPanelProps {
  studioData?: {
    city?: string;
    businessName?: string;
  };
}

export function SEOTipsPanel({ studioData }: SEOTipsPanelProps) {
  const [activeTab, setActiveTab] = useState<'faq' | 'keywords' | 'content'>('faq');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const getLocalizedKeywords = () => {
    const city = studioData?.city || 'tu ciudad';
    return LOCAL_SEO_KEYWORDS.map(k => ({
      keyword: k,
      localized: k.includes('near me') || k.includes('salon') || k.includes('studio')
        ? k.replace('near me', `en ${city}`).replace('salon', `en ${city}`).replace('studio', `en ${city}`)
        : `${k} ${city}`,
      volume: Math.floor(Math.random() * 1000) + 100,
    }));
  };

  const keywordSuggestions = getLocalizedKeywords();

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-2 border-b">
        <Button
          variant="ghost"
          className={`rounded-none border-b-2 ${activeTab === 'faq' ? 'border-primary bg-primary/10' : 'border-transparent'}`}
          onClick={() => setActiveTab('faq')}
        >
          <Lightbulb className="w-4 h-4 mr-2" />
          FAQs para SEO
        </Button>
        <Button
          variant="ghost"
          className={`rounded-none border-b-2 ${activeTab === 'keywords' ? 'border-primary bg-primary/10' : 'border-transparent'}`}
          onClick={() => setActiveTab('keywords')}
        >
          <Target className="w-4 h-4 mr-2" />
          Keywords Local
        </Button>
        <Button
          variant="ghost"
          className={`rounded-none border-b-2 ${activeTab === 'content' ? 'border-primary bg-primary/10' : 'border-transparent'}`}
          onClick={() => setActiveTab('content')}
        >
          <Calendar className="w-4 h-4 mr-2" />
          Contenido Estacional
        </Button>
      </div>

      {/* FAQ Tab */}
      {activeTab === 'faq' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-heading text-lg font-semibold">Preguntas Frecuentes para SEO</h3>
              <p className="text-sm text-gray-500">
                Agrega estas FAQs a tu sitio para aparecer en búsquedas de Google
              </p>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              <TrendingUp className="w-3 h-3 mr-1" />
              Alto Impacto
            </Badge>
          </div>

          {Object.entries(SEO_TIPS).map(([category, tips]) => (
            <Card key={category}>
              <CardHeader className="pb-3">
                <CardTitle className="text-base capitalize flex items-center gap-2">
                  <Search className="w-4 h-4 text-primary" />
                  {category === 'waxing' ? 'Sobre Waxing' : category === 'aftercare' ? 'Cuidados Después' : 'Información Local'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tips.map((tip, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-primary transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <p className="font-semibold text-sm mb-1">{tip.question}</p>
                          <p className="text-xs text-gray-600">{tip.answer}</p>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 shrink-0"
                          onClick={() => handleCopy(`${tip.question} ${tip.answer}`, idx)}
                        >
                          {copiedIndex === idx ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-semibold text-sm text-blue-900">¿Por qué las FAQs mejoran el SEO?</p>
                <p className="text-xs text-blue-700 mt-1">
                  Las preguntas frecuentes ayudan a tu sitio a aparecer en búsquedas por voz y fragmentos destacados de Google (featured snippets).
                  Cada FAQ es una oportunidad para rankear en búsquedas específicas.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Keywords Tab */}
      {activeTab === 'keywords' && (
        <div className="space-y-4">
          <div className="mb-4">
            <h3 className="font-heading text-lg font-semibold">Keywords para {studioData?.city || 'tu Ciudad'}</h3>
            <p className="text-sm text-gray-500">
              Palabras clave localizadas para atraer clientas de tu área
            </p>
          </div>

          <div className="grid gap-3">
            {keywordSuggestions.slice(0, 12).map((suggestion, idx) => (
              <Card key={idx} className="hover:border-primary transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-primary" />
                      <div>
                        <p className="font-semibold text-sm">{suggestion.localized}</p>
                        <p className="text-xs text-gray-500">Búsquedas/mes: ~{suggestion.volume}</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleCopy(suggestion.localized, idx)}
                    >
                      {copiedIndex === idx ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-900">
              <strong>Tip:</strong> Usa estas keywords en tus títulos, descripciones, y contenido de cada página.
              No las forces naturalmente en el texto.
            </p>
          </div>
        </div>
      )}

      {/* Content Tab */}
      {activeTab === 'content' && (
        <div className="space-y-4">
          <div className="mb-4">
            <h3 className="font-heading text-lg font-semibold">Contenido Estacional</h3>
            <p className="text-sm text-gray-500">
              Ideas de contenido y promociones basadas en la temporada
            </p>
          </div>

          {[
            {
              season: 'Primavera',
              title: 'Renueva tu Look',
              description: 'Después del invierno, tu piel necesita un refresh. Promo en Full Body Wax.',
              hashtags: ['#SpringReady', '#WaxingSeason', '#SmoothSkin'],
            },
            {
              season: 'Verano',
              title: 'Lista para la Playa',
              description: 'Brazilian + Leg Wax por $120. Incluye aftercare kit gratis.',
              hashtags: ['#SummerReady', '#BeachBody', '#BrazilianWax'],
            },
            {
              season: 'Otoño',
              title: 'Mantenimiento de Otoño',
              description: 'Sigue suave con nuestras promos de mantenimiento. 3ra cita con 20% off.',
              hashtags: ['#SelfCare', '#WaxingRoutine', '#FallVibes'],
            },
            {
              season: 'Invierno',
              title: 'Winter Glow',
              description: 'El mejor momento para empezar. Paquetes de 4 sesiones con descuento.',
              hashtags: ['#WinterGlow', '#NewYearNewYou', '#WaxingJourney'],
            },
          ].map((content, idx) => (
            <Card key={idx} className="hover:border-primary transition-colors">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        {content.season}
                      </Badge>
                    </div>
                    <p className="font-semibold text-sm mb-1">{content.title}</p>
                    <p className="text-xs text-gray-600 mb-2">{content.description}</p>
                    <div className="flex gap-1 flex-wrap">
                      {content.hashtags.map((tag, i) => (
                        <span key={i} className="text-xs text-primary">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleCopy(`${content.title} - ${content.description}`, idx)}
                  >
                    {copiedIndex === idx ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
