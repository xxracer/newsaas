'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMockAuth } from '@/components/providers/MockAuthProvider';
import { useTheme } from '@/components/providers/ThemeProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import {
  LayoutDashboard,
  Scissors,
  Calendar,
  Gift,
  ShoppingBag,
  Users,
  MapPin,
  HelpCircle,
  Home,
  Eye,
  EyeOff,
  ChevronUp,
  ChevronDown,
  Sparkles,
  ExternalLink,
  Palette,
  Plus,
  LayoutTemplate,
  ChevronRight,
  Store,
  Clock,
  Phone,
  Instagram,
  Image as ImageIcon,
  Trash2,
  Settings,
} from 'lucide-react';
import Link from 'next/link';
import { getBusinessType } from '@/lib/business-types';

const iconMap: Record<string, any> = {
  LayoutDashboard,
  Scissors,
  Calendar,
  Gift,
  ShoppingBag,
  Users,
  MapPin,
  HelpCircle,
  Home,
  Store,
  Clock,
  Phone,
  Instagram,
  ImageIcon,
};

interface PageSection {
  id: string;
  name: string;
  enabled?: boolean;
}

interface StudioPage {
  id: string;
  name: string;
  slug: string;
  icon: string;
  enabled: boolean;
  order: number;
  sectionCount: number;
  sections: PageSection[];
}

function getDefaultPages(businessTypeId: string = 'waxing'): StudioPage[] {
  const bt = getBusinessType(businessTypeId);
  const btPages = bt?.defaultPages || ['home', 'services', 'appointments', 'about', 'contact'];

  const pageDefs: Record<string, Partial<StudioPage> & { sections: PageSection[] }> = {
    home: {
      id: 'home', name: 'Home Page', slug: 'home', icon: 'Home',
      sectionCount: 11,
      sections: [
        { id: 'hero', name: 'Hero' },
        { id: 'servicesGrid', name: 'ServicesGrid' },
        { id: 'aboutPreview', name: 'AboutPreview' },
        { id: 'testimonials', name: 'Testimonials' },
        { id: 'teamPreview', name: 'TeamPreview' },
        { id: 'gallery', name: 'Gallery' },
        { id: 'promotions', name: 'Promotions' },
        { id: 'giftCards', name: 'GiftCards' },
        { id: 'instagramFeed', name: 'InstagramFeed' },
        { id: 'ctaBanner', name: 'CtaBanner' },
        { id: 'contactInfo', name: 'ContactInfo' },
      ],
    },
    services: {
      id: 'services', name: 'Services', slug: 'services', icon: 'Scissors',
      sectionCount: 4,
      sections: [
        { id: 'header', name: 'Header' },
        { id: 'serviceList', name: 'ServiceList' },
        { id: 'pricing', name: 'Pricing' },
        { id: 'cta', name: 'CTA' },
      ],
    },
    appointments: {
      id: 'appointments', name: 'Appointments', slug: 'appointments', icon: 'Calendar',
      sectionCount: 4,
      sections: [
        { id: 'header', name: 'Header' },
        { id: 'bookingForm', name: 'BookingForm' },
        { id: 'calendar', name: 'Calendar' },
        { id: 'confirmation', name: 'Confirmation' },
      ],
    },
    about: {
      id: 'about', name: 'About Us', slug: 'about', icon: 'Users',
      sectionCount: 4,
      sections: [
        { id: 'header', name: 'Header' },
        { id: 'story', name: 'Story' },
        { id: 'team', name: 'Team' },
        { id: 'values', name: 'Values' },
      ],
    },
    contact: {
      id: 'contact', name: 'Contact', slug: 'contact', icon: 'MapPin',
      sectionCount: 4,
      sections: [
        { id: 'header', name: 'Header' },
        { id: 'form', name: 'Form' },
        { id: 'map', name: 'Map' },
        { id: 'info', name: 'Info' },
      ],
    },
    'gift-cards': {
      id: 'gift-cards', name: 'Gift Cards', slug: 'gift-cards', icon: 'Gift',
      sectionCount: 4,
      sections: [
        { id: 'header', name: 'Header' },
        { id: 'products', name: 'Products' },
        { id: 'benefits', name: 'Benefits' },
        { id: 'cta', name: 'CTA' },
      ],
    },
    products: {
      id: 'products', name: 'Products', slug: 'products', icon: 'ShoppingBag',
      sectionCount: 4,
      sections: [
        { id: 'header', name: 'Header' },
        { id: 'catalog', name: 'Catalog' },
        { id: 'featured', name: 'Featured' },
        { id: 'cta', name: 'CTA' },
      ],
    },
    gallery: {
      id: 'gallery', name: 'Gallery', slug: 'gallery', icon: 'ImageIcon',
      sectionCount: 3,
      sections: [
        { id: 'header', name: 'Header' },
        { id: 'portfolio', name: 'Portfolio' },
        { id: 'cta', name: 'CTA' },
      ],
    },
    portfolio: {
      id: 'portfolio', name: 'Portfolio', slug: 'portfolio', icon: 'ImageIcon',
      sectionCount: 3,
      sections: [
        { id: 'header', name: 'Header' },
        { id: 'works', name: 'Works' },
        { id: 'cta', name: 'CTA' },
      ],
    },
    faq: {
      id: 'faq', name: 'FAQ', slug: 'faq', icon: 'HelpCircle',
      sectionCount: 3,
      sections: [
        { id: 'header', name: 'Header' },
        { id: 'questions', name: 'Questions' },
        { id: 'contact', name: 'Contact' },
      ],
    },
    packages: {
      id: 'packages', name: 'Packages', slug: 'packages', icon: 'Gift',
      sectionCount: 3,
      sections: [
        { id: 'header', name: 'Header' },
        { id: 'plans', name: 'Plans' },
        { id: 'cta', name: 'CTA' },
      ],
    },
  };

  const order = ['home', 'services', 'appointments', 'about', 'contact', 'gallery', 'portfolio', 'packages', 'gift-cards', 'products', 'faq'];

  return btPages
    .map((pid, idx) => {
      const def = pageDefs[pid];
      if (!def) return null;
      return {
        id: def.id!,
        name: def.name!,
        slug: def.slug!,
        icon: def.icon!,
        enabled: idx < 5, // first 5 enabled by default
        order: order.indexOf(pid) + 1,
        sectionCount: def.sections.length,
        sections: def.sections,
      } as StudioPage;
    })
    .filter(Boolean) as StudioPage[];
}

export default function WebsitePagesPage() {
  const router = useRouter();
  const { user } = useMockAuth();
  const { theme } = useTheme();
  const [businessType, setBusinessType] = useState<string>('waxing');
  const [pages, setPages] = useState<StudioPage[]>(() => getDefaultPages('waxing'));
  const [selectedPageId, setSelectedPageId] = useState('home');
  const [editingSection, setEditingSection] = useState<{pageId: string, section: PageSection} | null>(null);
  const [showAddPageDialog, setShowAddPageDialog] = useState(false);
  const [newPageName, setNewPageName] = useState('');
  const [newPageSlug, setNewPageSlug] = useState('');

  const [studioColors, setStudioColors] = useState({
    primary: '#f43f5e',
    background: '#ffffff',
    text: '#111827'
  });
  const [activeTab, setActiveTab] = useState('home');
  const [isInitialLoadDone, setIsInitialLoadDone] = useState(false);

  useEffect(() => {
    if (user?.studioId) {
      const stored = localStorage.getItem('mock_studio_' + user.studioId);
      if (stored) {
        const data = JSON.parse(stored);
        const bt = data.businessType || 'waxing';
        setBusinessType(bt);
        if (data.website?.pages) {
          setPages(data.website.pages);
        } else {
          setPages(getDefaultPages(bt));
        }
        if (data.colors) {
          setStudioColors(data.colors);
        }
      }
      setIsInitialLoadDone(true);
    }
  }, [user?.studioId]);

  useEffect(() => {
    if (user?.studioId && isInitialLoadDone) {
      const stored = localStorage.getItem('mock_studio_' + user.studioId);
      const data = stored ? JSON.parse(stored) : {};
      data.website = { pages };
      data.colors = studioColors;
      localStorage.setItem('mock_studio_' + user.studioId, JSON.stringify(data));
    }
  }, [pages, studioColors, user?.studioId, isInitialLoadDone]);

  const handleTogglePage = (pageId: string) => {
    setPages(pages.map(p =>
      p.id === pageId ? { ...p, enabled: !p.enabled } : p
    ));
  };

  const handleToggleSection = (pageId: string, sectionId: string) => {
    setPages(pages.map(p => {
      if (p.id !== pageId) return p;
      return {
        ...p,
        sections: p.sections.map(s => 
          s.id === sectionId ? { ...s, enabled: s.enabled === false ? true : false } : s
        )
      };
    }));
  };

  const handleUpdateSection = (pageId: string, sectionId: string, updates: Partial<PageSection>) => {
    setPages(pages.map(p => {
      if (p.id !== pageId) return p;
      return {
        ...p,
        sections: p.sections.map(s => s.id === sectionId ? { ...s, ...updates } : s)
      };
    }));
    setEditingSection(null);
  };

  const handleMoveSectionUp = (pageId: string, index: number) => {
    if (index === 0) return;
    setPages(pages.map(p => {
      if (p.id !== pageId) return p;
      const updatedSections = [...p.sections];
      [updatedSections[index - 1], updatedSections[index]] = [updatedSections[index], updatedSections[index - 1]];
      return { ...p, sections: updatedSections };
    }));
  };

  const handleMoveSectionDown = (pageId: string, index: number) => {
    setPages(pages.map(p => {
      if (p.id !== pageId) return p;
      if (index === p.sections.length - 1) return p;
      const updatedSections = [...p.sections];
      [updatedSections[index], updatedSections[index + 1]] = [updatedSections[index + 1], updatedSections[index]];
      return { ...p, sections: updatedSections };
    }));
  };

  const handleAddPage = () => {
    if (!newPageName || !newPageSlug) return;

    const newPage: StudioPage = {
      id: `page-${Date.now()}`,
      name: newPageName,
      slug: newPageSlug.toLowerCase().replace(/\s+/g, '-'),
      icon: 'LayoutDashboard',
      enabled: true,
      order: pages.length + 1,
      sectionCount: 4,
      sections: [
        { id: 'header', name: 'Header' },
        { id: 'content', name: 'Content' },
        { id: 'cta', name: 'CTA' },
        { id: 'footer', name: 'Footer' },
      ],
    };

    setPages([...pages, newPage]);
    setNewPageName('');
    setNewPageSlug('');
    setShowAddPageDialog(false);
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const updated = [...pages];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    updated.forEach((p, i) => p.order = i + 1);
    setPages(updated);
  };

  const handleMoveDown = (index: number) => {
    if (index === pages.length - 1) return;
    const updated = [...pages];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    updated.forEach((p, i) => p.order = i + 1);
    setPages(updated);
  };

  const selectedPage = pages.find(p => p.id === selectedPageId) || pages[0];

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold mb-1">Diseño del Sitio Web</h1>
          <p className="text-gray-500 text-sm">Personaliza las páginas, secciones y estilos de tu sitio</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="ghost" 
            className="text-gray-400 hover:text-rose-500"
            onClick={() => {
              if (confirm('¿Estás seguro de que quieres restablecer todo? Se borrarán todos los cambios locales.')) {
                localStorage.clear();
                window.location.reload();
              }
            }}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Restablecer
          </Button>
          <Link href={`/studio/demo/home`} target="_blank">
            <Button className="gap-2 rounded-full bg-rose-500 hover:bg-rose-600">
              <ExternalLink className="w-4 h-4" />
              Ver Sitio Público
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="w-full bg-gray-100 p-1 rounded-lg grid grid-cols-4">
          <TabsTrigger value="home" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm gap-2">
            <Home className="w-4 h-4" />
            Página de Inicio
          </TabsTrigger>
          <TabsTrigger value="pages" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm gap-2">
            <LayoutDashboard className="w-4 h-4" />
            Otras Páginas
          </TabsTrigger>
          <TabsTrigger value="appointments" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm gap-2">
            <Calendar className="w-4 h-4" />
            Citas
          </TabsTrigger>
          <TabsTrigger value="appearance" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm gap-2">
            <Palette className="w-4 h-4" />
            Apariencia
          </TabsTrigger>
        </TabsList>

        {/* Home Tab */}
        <TabsContent value="home" className="mt-6">
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="pb-4 border-b border-gray-100 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  <Home className="w-5 h-5 text-rose-500" />
                  Secciones de Página de Inicio
                </CardTitle>
                <CardDescription>
                  Organiza y edita el contenido de tu pantalla principal
                </CardDescription>
              </div>
              <Link href={`/studio/demo/home`} target="_blank">
                <Button variant="outline" size="sm" className="gap-2 rounded-full border-rose-200 text-rose-600">
                  <ExternalLink className="w-4 h-4" />
                  Ver Home
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-1">
                  {(pages.find(p => p.id === 'home')?.sections || []).map((section, idx) => {
                    const isEnabled = section.enabled !== false;
                    return (
                      <div 
                        key={section.id} 
                        className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-all border border-gray-100 cursor-pointer group"
                        onClick={() => setEditingSection({ pageId: 'home', section })}
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex flex-col -space-y-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={(e) => { e.stopPropagation(); handleMoveSectionUp('home', idx); }} className="p-0.5 text-gray-400 hover:text-gray-600"><ChevronUp className="w-4 h-4" /></button>
                            <button onClick={(e) => { e.stopPropagation(); handleMoveSectionDown('home', idx); }} className="p-0.5 text-gray-400 hover:text-gray-600"><ChevronDown className="w-4 h-4" /></button>
                          </div>
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isEnabled ? 'bg-rose-100 text-rose-600 shadow-sm' : 'bg-gray-100 text-gray-400'}`}>
                            {isEnabled ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                          </div>
                          <div>
                            <span className={`block font-medium ${isEnabled ? 'text-gray-900' : 'text-gray-500'}`}>{section.name}</span>
                            <span className="text-xs text-gray-400">Clic para editar contenido</span>
                          </div>
                        </div>
                        <Switch
                          checked={isEnabled}
                          onCheckedChange={() => handleToggleSection('home', section.id)}
                          onClick={(e) => e.stopPropagation()}
                          className="data-[state=checked]:bg-rose-500"
                        />
                      </div>
                    );
                  })}
                </div>
                
                <div className="bg-gray-50 rounded-2xl p-8 border border-dashed border-gray-200 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-4">
                    <Sparkles className="w-8 h-8 text-rose-300" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Editor Visual Próximamente</h4>
                  <p className="text-sm text-gray-500 max-w-[240px]">
                    Estamos trabajando en un editor "drag & drop" para que puedas mover los elementos directamente.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pages" className="mt-6">
          <div className="grid lg:grid-cols-12 gap-6">
            {/* Left Column - Pages List */}
            <div className="lg:col-span-7">
              <h2 className="font-heading text-lg font-semibold mb-4">Páginas del Sitio</h2>
              <div className="space-y-3">
                {pages.map((page, index) => {
                  const Icon = iconMap[page.icon] || LayoutDashboard;
                  const isSelected = selectedPageId === page.id;

                  return (
                    <Card
                      key={page.id}
                      className={`cursor-pointer transition-all border group ${
                        isSelected ? 'border-rose-300 ring-1 ring-rose-300' : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedPageId(page.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-rose-50 flex items-center justify-center">
                              <Icon className="w-5 h-5 text-rose-400" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{page.name}</h3>
                              <p className="text-sm text-gray-500">{page.sectionCount} secciones</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            {/* Arrows */}
                            <div className="flex flex-col -space-y-1">
                              <button
                                onClick={(e) => { e.stopPropagation(); handleMoveUp(index); }}
                                className="p-0.5 text-gray-400 hover:text-gray-600"
                              >
                                <ChevronUp className="w-4 h-4" />
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); handleMoveDown(index); }}
                                className="p-0.5 text-gray-400 hover:text-gray-600"
                              >
                                <ChevronDown className="w-4 h-4" />
                              </button>
                            </div>

                            {/* Page Actions */}
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button variant="ghost" size="icon" className="w-8 h-8">
                                <Settings className="w-4 h-4 text-gray-400" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="w-8 h-8 text-rose-300 hover:text-rose-500 hover:bg-rose-50"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setPages(pages.filter(p => p.id !== page.id));
                                }}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>

                            {/* Status Badge */}
                            {page.enabled ? (
                              <Badge variant="secondary" className="bg-emerald-100 text-emerald-600 border-0 font-medium">
                                <Eye className="w-3 h-3 mr-1" />
                                Visible
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="bg-gray-100 text-gray-500 border-0 font-medium">
                                <EyeOff className="w-3 h-3 mr-1" />
                                Oculta
                              </Badge>
                            )}

                            {/* Toggle Switch */}
                            <div onClick={(e) => e.stopPropagation()}>
                              <Switch
                                checked={page.enabled}
                                onCheckedChange={() => handleTogglePage(page.id)}
                                className="data-[state=checked]:bg-rose-500"
                              />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Right Column - Selected Page Sections */}
            <div className="lg:col-span-5">
              <Card className="border border-gray-200 shadow-sm sticky top-6">
                <CardHeader className="pb-4 border-b border-gray-100">
                  <CardTitle className="text-xl font-semibold flex items-center gap-2">
                    <LayoutTemplate className="w-5 h-5 text-rose-500" />
                    Secciones de {selectedPage.name}
                  </CardTitle>
                  <CardDescription className="text-gray-500">
                    Activa o desactiva las secciones que quieres mostrar en esta página.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-1">
                    {selectedPage.sections.map((section, idx) => {
                      const isEnabled = section.enabled !== false;
                      return (
                        <div 
                          key={section.id} 
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 cursor-pointer group"
                          onClick={() => setEditingSection({ pageId: selectedPage.id, section })}
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col -space-y-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button 
                                onClick={(e) => { e.stopPropagation(); handleMoveSectionUp(selectedPage.id, idx); }}
                                className="p-0.5 text-gray-400 hover:text-gray-600"
                              >
                                <ChevronUp className="w-3 h-3" />
                              </button>
                              <button 
                                onClick={(e) => { e.stopPropagation(); handleMoveSectionDown(selectedPage.id, idx); }}
                                className="p-0.5 text-gray-400 hover:text-gray-600"
                              >
                                <ChevronDown className="w-3 h-3" />
                              </button>
                            </div>
                            <div className={`w-8 h-8 rounded-md flex items-center justify-center ${isEnabled ? 'bg-rose-100 text-rose-600' : 'bg-gray-100 text-gray-400'}`}>
                              {isEnabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                            </div>
                            <div>
                              <span className={`block text-sm font-medium ${isEnabled ? 'text-gray-900' : 'text-gray-500'}`}>
                                {section.name}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Settings className="w-4 h-4 text-gray-400" />
                            </Button>
                            <Switch
                              checked={isEnabled}
                              onCheckedChange={(checked) => {
                                handleToggleSection(selectedPage.id, section.id);
                              }}
                              onClick={(e) => e.stopPropagation()}
                              className="data-[state=checked]:bg-rose-500"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <Link href={`/studio/demo/${selectedPage.id === 'home' ? '' : selectedPage.id}`} target="_blank">
                      <Button variant="outline" className="w-full gap-2 rounded-full border-rose-200 text-rose-600 hover:bg-rose-50">
                        <ExternalLink className="w-4 h-4" />
                        Vista Previa de {selectedPage.name}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Appointments Tab */}
        <TabsContent value="appointments" className="mt-6">
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle>Estilo de Citas</CardTitle>
              <CardDescription>Personaliza la apariencia del formulario de reservas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {['Moderno', 'Clásico', 'Minimalista', 'Lujo'].map((style) => (
                  <div
                    key={style}
                    className="p-4 border border-gray-200 rounded-lg hover:border-rose-300 cursor-pointer transition-all hover:shadow-sm"
                  >
                    <div className="aspect-video bg-gray-50 rounded mb-3 flex items-center justify-center">
                      <Calendar className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="font-medium">{style}</h3>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance" className="mt-6">
          <div className="max-w-2xl">
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Tema Actual
                </CardTitle>
                <CardDescription>
                  El diseño seleccionado se aplica a todas las páginas de tu sitio web.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-lg border border-rose-100 mb-6">
                    <div>
                      <p className="font-semibold text-gray-900">Rose Gold Elegance</p>
                      <p className="text-sm text-gray-500">Dorado rosado, mármol y tipografía serif</p>
                    </div>
                    <Link href="/admin/settings/theme">
                      <Button variant="outline" className="gap-2 rounded-full bg-white">
                        <Palette className="w-4 h-4" />
                        Cambiar Tema
                      </Button>
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label>Color Principal</Label>
                      <div className="flex gap-2">
                        <Input 
                          type="color" 
                          value={studioColors.primary} 
                          onChange={(e) => setStudioColors({ ...studioColors, primary: e.target.value })}
                          className="w-12 h-10 p-1 rounded-md"
                        />
                        <Input 
                          value={studioColors.primary} 
                          onChange={(e) => setStudioColors({ ...studioColors, primary: e.target.value })}
                          className="flex-1"
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label>Color de Fondo</Label>
                      <div className="flex gap-2">
                        <Input 
                          type="color" 
                          value={studioColors.background} 
                          onChange={(e) => setStudioColors({ ...studioColors, background: e.target.value })}
                          className="w-12 h-10 p-1 rounded-md"
                        />
                        <Input 
                          value={studioColors.background} 
                          onChange={(e) => setStudioColors({ ...studioColors, background: e.target.value })}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button 
                      className="w-full bg-rose-500 hover:bg-rose-600 rounded-full"
                      onClick={() => {
                        setIsInitialLoadDone(true); // Force sync
                        alert('Apariencia guardada correctamente');
                      }}
                    >
                      Guardar Cambios de Apariencia
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Page Dialog */}
      <Dialog open={showAddPageDialog} onOpenChange={setShowAddPageDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar Nueva Página</DialogTitle>
            <DialogDescription>
              Crea una nueva página para tu sitio web
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label>Nombre de la Página</Label>
              <Input
                value={newPageName}
                onChange={(e) => {
                  setNewPageName(e.target.value);
                  if (!newPageSlug) {
                    setNewPageSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'));
                  }
                }}
                placeholder="Ej: Blog"
              />
            </div>
            <div>
              <Label>URL Slug</Label>
              <Input
                value={newPageSlug}
                onChange={(e) => setNewPageSlug(e.target.value)}
                placeholder="ej: blog"
              />
              <p className="text-xs text-gray-500 mt-1">Esta será la URL: /{newPageSlug}</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddPageDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddPage} className="bg-rose-500 hover:bg-rose-600">
              Crear Página
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Section Dialog */}
      <Dialog open={!!editingSection} onOpenChange={(open) => !open && setEditingSection(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Sección: {editingSection?.section.name}</DialogTitle>
            <DialogDescription>
              Personaliza el contenido y comportamiento de esta sección.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Título de la Sección</Label>
              <Input 
                value={editingSection?.section.name} 
                onChange={(e) => setEditingSection({
                  ...editingSection!,
                  section: { ...editingSection!.section, name: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label>Texto Principal / Hero Text</Label>
              <Input 
                placeholder="Ej: Luce radiante con nuestro waxing de lujo" 
                onChange={(e) => {
                  // This is a mockup for real content editing
                }}
              />
            </div>
            <div className="space-y-2">
              <Label>Etiqueta del Botón</Label>
              <Input placeholder="Ej: Reservar Ahora" />
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="space-y-0.5">
                <Label>Visibilidad en Móvil</Label>
                <p className="text-xs text-gray-500">Mostrar esta sección en dispositivos móviles</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingSection(null)}>
              Cancelar
            </Button>
            <Button 
              onClick={() => {
                if (editingSection) {
                  handleUpdateSection(editingSection.pageId, editingSection.section.id, editingSection.section);
                }
              }} 
              className="bg-rose-500 hover:bg-rose-600"
            >
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
