'use client';

import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Settings, 
  Eye, 
  EyeOff, 
  ChevronRight, 
  Plus, 
  Trash2, 
  ExternalLink,
  Smartphone,
  Monitor,
  Palette,
  Calendar,
  Sparkles,
  Star,
  ChevronUp,
  ChevronDown,
  Home,
  LayoutTemplate,
  X,
  Image as ImageIcon
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from '@/components/ui/dialog';
import Link from 'next/link';

interface PageSection {
  id: string;
  name: string;
  enabled: boolean;
  type: string;
}

interface StudioPage {
  id: string;
  name: string;
  slug: string;
  icon: string;
  enabled: boolean;
  sectionCount: number;
  sections: PageSection[];
}

const DEFAULT_PAGES: StudioPage[] = [
  {
    id: 'home',
    name: 'Home Page',
    slug: 'home',
    icon: 'home',
    enabled: true,
    sectionCount: 11,
    sections: [
      { id: 'hero', name: 'Hero', enabled: true, type: 'hero' },
      { id: 'servicesGrid', name: 'ServicesGrid', enabled: true, type: 'grid' },
      { id: 'aboutPreview', name: 'AboutPreview', enabled: true, type: 'text' },
      { id: 'testimonials', name: 'Testimonials', enabled: true, type: 'list' },
      { id: 'teamPreview', name: 'TeamPreview', enabled: true, type: 'list' },
      { id: 'gallery', name: 'Gallery', enabled: true, type: 'media' },
      { id: 'promotions', name: 'Promotions', enabled: true, type: 'banner' },
      { id: 'giftCards', name: 'GiftCards', enabled: true, type: 'card' },
      { id: 'instagramFeed', name: 'InstagramFeed', enabled: true, type: 'social' },
      { id: 'ctaBanner', name: 'CtaBanner', enabled: true, type: 'banner' },
      { id: 'contactInfo', name: 'ContactInfo', enabled: true, type: 'info' },
    ]
  },
  {
    id: 'services',
    name: 'Services',
    slug: 'services',
    icon: 'scissors',
    enabled: true,
    sectionCount: 4,
    sections: [
      { id: 'servicesHero', name: 'Header', enabled: true, type: 'hero' },
      { id: 'servicesList', name: 'Full Services', enabled: true, type: 'list' },
      { id: 'pricing', name: 'Pricing Table', enabled: true, type: 'table' },
      { id: 'bookCta', name: 'Booking CTA', enabled: true, type: 'banner' },
    ]
  },
  {
    id: 'appointments',
    name: 'Appointments',
    slug: 'appointments',
    icon: 'calendar',
    enabled: true,
    sectionCount: 4,
    sections: [
      { id: 'bookingStep1', name: 'Service Selection', enabled: true, type: 'form' },
      { id: 'bookingStep2', name: 'Time Selection', enabled: true, type: 'form' },
      { id: 'bookingStep3', name: 'Contact Details', enabled: true, type: 'form' },
      { id: 'bookingConfirm', name: 'Confirmation', enabled: true, type: 'info' },
    ]
  },
  {
    id: 'about',
    name: 'About Us',
    slug: 'about',
    icon: 'users',
    enabled: true,
    sectionCount: 4,
    sections: [
      { id: 'story', name: 'Our Story', enabled: true, type: 'text' },
      { id: 'mission', name: 'Mission & Vision', enabled: true, type: 'text' },
      { id: 'team', name: 'Meet the Team', enabled: true, type: 'list' },
      { id: 'culture', name: 'Our Culture', enabled: true, type: 'media' },
    ]
  },
  {
    id: 'contact',
    name: 'Contact',
    slug: 'contact',
    icon: 'map-pin',
    enabled: true,
    sectionCount: 4,
    sections: [
      { id: 'contactHero', name: 'Header', enabled: true, type: 'hero' },
      { id: 'contactForm', name: 'Contact Form', enabled: true, type: 'form' },
      { id: 'map', name: 'Location Map', enabled: true, type: 'map' },
      { id: 'faqSmall', name: 'FAQ Summary', enabled: true, type: 'list' },
    ]
  }
];

const iconMap: Record<string, any> = {
  home: Home,
  scissors: LayoutDashboard,
  calendar: Calendar,
  users: LayoutDashboard,
  'map-pin': LayoutDashboard,
};

export default function WebsitePagesPage() {
  const [pages, setPages] = useState<StudioPage[]>(DEFAULT_PAGES);
  const [selectedPageId, setSelectedPageId] = useState<string>('home');
  const [activeTab, setActiveTab] = useState('pages');
  const [isInitialLoadDone, setIsInitialLoadDone] = useState(false);
  const [showAddPageDialog, setShowAddPageDialog] = useState(false);
  const [newPageName, setNewPageName] = useState('');
  const [newPageSlug, setNewPageSlug] = useState('');
  const [editingSection, setEditingSection] = useState<{ pageId: string, section: PageSection } | null>(null);
  const [colors, setColors] = useState({
    primary: '#f43f5e',
    background: '#ffffff',
    text: '#111827'
  });

  // Load from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('mock_studio_pages');
    const savedColors = localStorage.getItem('mock_studio_colors');
    if (savedData) {
      try {
        setPages(JSON.parse(savedData));
      } catch (e) {
        console.error('Error loading pages', e);
      }
    }
    if (savedColors) {
      try {
        setColors(JSON.parse(savedColors));
      } catch (e) {
        console.error('Error loading colors', e);
      }
    }
    setIsInitialLoadDone(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isInitialLoadDone) {
      localStorage.setItem('mock_studio_pages', JSON.stringify(pages));
      localStorage.setItem('mock_studio_colors', JSON.stringify(colors));
      
      // Update the mock studio object too
      const studio = JSON.parse(localStorage.getItem('mock_studio_demo') || '{}');
      studio.website = { pages, colors };
      localStorage.setItem('mock_studio_demo', JSON.stringify(studio));
    }
  }, [pages, colors, isInitialLoadDone]);

  const selectedPage = pages.find(p => p.id === selectedPageId) || pages[0];

  const handleTogglePage = (pageId: string) => {
    setPages(pages.map(p => p.id === pageId ? { ...p, enabled: !p.enabled } : p));
  };

  const handleToggleSection = (pageId: string, sectionId: string) => {
    setPages(pages.map(p => {
      if (p.id !== pageId) return p;
      return {
        ...p,
        sections: p.sections.map(s => s.id === sectionId ? { ...s, enabled: !s.enabled } : s)
      };
    }));
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newPages = [...pages];
    [newPages[index - 1], newPages[index]] = [newPages[index], newPages[index - 1]];
    setPages(newPages);
  };

  const handleMoveDown = (index: number) => {
    if (index === pages.length - 1) return;
    const newPages = [...pages];
    [newPages[index], newPages[index + 1]] = [newPages[index + 1], newPages[index]];
    setPages(newPages);
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

  const handleAddPage = () => {
    if (!newPageName) return;
    const newPageId = newPageSlug || newPageName.toLowerCase().replace(/\s+/g, '-');
    const newPage: StudioPage = {
      id: newPageId,
      name: newPageName,
      slug: newPageId,
      icon: 'scissors',
      enabled: true,
      sectionCount: 0,
      sections: []
    };
    setPages([...pages, newPage]);
    setShowAddPageDialog(false);
    setNewPageName('');
    setNewPageSlug('');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
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
          <TabsTrigger value="pages" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm gap-2">
            <LayoutDashboard className="w-4 h-4" />
            Páginas
          </TabsTrigger>
          <TabsTrigger value="home" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm gap-2">
            <Home className="w-4 h-4" />
            Home Page
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

        {/* Pages Tab (Image 1/2) */}
        <TabsContent value="pages" className="mt-6">
          <div className="grid lg:grid-cols-12 gap-6">
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
                              <p className="text-sm text-gray-500">{page.sections.length} secciones</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col -space-y-1">
                              <button onClick={(e) => { e.stopPropagation(); handleMoveUp(index); }} className="p-0.5 text-gray-400 hover:text-gray-600"><ChevronUp className="w-4 h-4" /></button>
                              <button onClick={(e) => { e.stopPropagation(); handleMoveDown(index); }} className="p-0.5 text-gray-400 hover:text-gray-600"><ChevronDown className="w-4 h-4" /></button>
                            </div>
                            {page.enabled ? (
                              <Badge variant="secondary" className="bg-emerald-100 text-emerald-600 border-0 font-medium">Visible</Badge>
                            ) : (
                              <Badge variant="secondary" className="bg-gray-100 text-gray-500 border-0 font-medium">Oculta</Badge>
                            )}
                            <div onClick={(e) => e.stopPropagation()}>
                              <Switch checked={page.enabled} onCheckedChange={() => handleTogglePage(page.id)} className="data-[state=checked]:bg-rose-500" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
            <div className="lg:col-span-5">
              <Card className="border border-gray-200 shadow-sm sticky top-6">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">Secciones de {selectedPage.name}</CardTitle>
                  <CardDescription>Activa o desactiva las secciones de esta página.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {selectedPage.sections.map((section) => (
                      <div key={section.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                        <div className="flex items-center gap-3">
                          <Eye className="w-4 h-4 text-rose-300" />
                          <span className="text-sm font-medium">{section.name}</span>
                        </div>
                        <Switch 
                          checked={section.enabled !== false} 
                          onCheckedChange={() => handleToggleSection(selectedPage.id, section.id)} 
                          className="data-[state=checked]:bg-rose-500"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Home Page Tab (Wix-Style Live Editor) */}
        <TabsContent value="home" className="mt-6">
          <div className="bg-white rounded-[48px] shadow-2xl border border-gray-100 overflow-hidden min-h-[800px] relative">
            {/* Top Toolbar */}
            <div className="bg-gray-50/80 backdrop-blur-md border-b border-gray-100 p-4 flex items-center justify-between sticky top-0 z-50">
               <div className="flex items-center gap-4">
                  <Badge className="bg-rose-500 text-white border-0">Modo Constructor Vivo</Badge>
                  <p className="text-xs text-gray-400">Haz clic en cualquier texto para editarlo directamente</p>
               </div>
               <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="rounded-full gap-2">
                    <Monitor className="w-4 h-4" />
                    Vista Previa
                  </Button>
                  <Button className="bg-rose-500 hover:bg-rose-600 rounded-full px-6">Publicar</Button>
               </div>
            </div>

            {/* The Live Canvas */}
            <div className="p-0 space-y-0">
              {(pages.find(p => p.id === 'home')?.sections || []).map((section, idx) => {
                const isEnabled = section.enabled !== false;
                if (!isEnabled) return null;

                return (
                  <div key={section.id} className="relative group border-b border-transparent hover:border-rose-300 transition-colors">
                    {/* Inline Action Bar */}
                    <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all z-40 bg-white/90 backdrop-blur-sm p-2 rounded-2xl shadow-xl border border-rose-100">
                       <div className="flex flex-col -space-y-1 mr-2">
                          <button onClick={() => handleMoveSectionUp('home', idx)} className="p-1 hover:bg-rose-50 rounded-lg text-gray-400 hover:text-rose-500"><ChevronUp className="w-4 h-4" /></button>
                          <button onClick={() => handleMoveSectionDown('home', idx)} className="p-1 hover:bg-rose-50 rounded-lg text-gray-400 hover:text-rose-500"><ChevronDown className="w-4 h-4" /></button>
                       </div>
                       <Button variant="ghost" size="sm" className="h-8 text-xs font-bold text-gray-500 hover:text-rose-500">
                         <Settings className="w-3 h-3 mr-2" />
                         Ajustes
                       </Button>
                       <Button variant="ghost" size="sm" className="h-8 text-xs font-bold text-rose-500 hover:bg-rose-50">
                         <Trash2 className="w-3 h-3" />
                       </Button>
                    </div>

                    {/* Wix-Style Renderers */}
                    {section.type === 'hero' && (
                      <section 
                        className="py-32 px-8 text-center relative overflow-hidden"
                        style={{ backgroundColor: colors.background }}
                      >
                        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
                          <input 
                            className="bg-transparent border-none text-center text-5xl md:text-7xl font-bold w-full focus:outline-none focus:ring-2 focus:ring-rose-200 rounded-xl transition-all p-2"
                            defaultValue="Tu piel merece lo mejor"
                            style={{ color: colors.text }}
                          />
                          <textarea 
                            className="bg-transparent border-none text-center text-xl text-gray-500 w-full focus:outline-none focus:ring-2 focus:ring-rose-200 rounded-xl transition-all p-2 resize-none h-24"
                            defaultValue="Expertos en waxing y cuidado de la piel. Resultados suaves y duraderos en un ambiente luxury."
                          />
                          <div className="flex justify-center gap-4">
                             <div className="group relative">
                                <Button size="lg" className="rounded-full px-12 py-8 text-xl shadow-2xl hover:scale-105 transition-transform" style={{ backgroundColor: colors.primary, color: colors.primaryForeground }}>
                                  Agendar Cita
                                </Button>
                                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-black text-white text-[10px] px-2 py-1 rounded">Cambiar Texto</div>
                             </div>
                             <Button size="lg" variant="outline" className="rounded-full px-12 py-8 text-xl border-2" style={{ borderColor: colors.primary, color: colors.primary }}>
                               Ver Servicios
                             </Button>
                          </div>
                        </div>
                        {/* Abstract Background Element */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-rose-50/50 rounded-full blur-[120px] -z-0" />
                      </section>
                    )}

                    {section.type === 'grid' && (
                      <section className="py-24 px-8 bg-white">
                        <div className="max-w-7xl mx-auto">
                          <div className="text-center mb-16 space-y-4">
                             <input 
                               className="bg-transparent border-none text-center text-4xl font-bold w-full focus:outline-none focus:ring-2 focus:ring-rose-200 rounded-xl p-2"
                               defaultValue="Nuestros Servicios"
                             />
                             <p className="text-gray-400">Tratamientos personalizados para cada tipo de piel</p>
                          </div>
                          <div className="grid md:grid-cols-3 gap-8">
                             {[1, 2, 3].map(i => (
                               <div key={i} className="group/card relative bg-gray-50/50 rounded-[32px] p-8 border border-gray-100 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer">
                                  <div className="w-16 h-16 rounded-2xl bg-rose-100 flex items-center justify-center mb-6">
                                     <Sparkles className="w-8 h-8 text-rose-500" />
                                  </div>
                                  <h4 className="text-xl font-bold mb-3">Servicio {i}</h4>
                                  <p className="text-sm text-gray-500 mb-6">Descripción del servicio profesional de alta calidad...</p>
                                  <div className="flex items-center justify-between">
                                     <span className="font-bold text-rose-500">$45.00</span>
                                     <Button variant="ghost" size="sm" className="rounded-full text-xs">Editar</Button>
                                  </div>
                               </div>
                             ))}
                             <div className="border-2 border-dashed border-gray-200 rounded-[32px] flex flex-col items-center justify-center p-8 hover:bg-rose-50 transition-colors group cursor-pointer">
                                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                   <Plus className="w-6 h-6 text-rose-300" />
                                </div>
                                <span className="text-sm font-bold text-gray-400">Añadir Servicio</span>
                             </div>
                          </div>
                        </div>
                      </section>
                    )}

                    {section.type === 'list' && (
                       <section className="py-24 px-8" style={{ backgroundColor: colors.surface }}>
                          <div className="max-w-4xl mx-auto text-center">
                             <h3 className="text-3xl font-bold mb-12">Lo que dicen nuestras clientas</h3>
                             <div className="bg-white p-12 rounded-[40px] shadow-xl border border-gray-100">
                                <div className="flex justify-center gap-1 mb-6">
                                   {[1,2,3,4,5].map(s => <Star key={s} className="w-6 h-6 fill-rose-400 text-rose-400" />)}
                                </div>
                                <p className="text-xl italic text-gray-600 mb-8 leading-relaxed">
                                  "La mejor experiencia de depilación que he tenido. El lugar es hermoso y el personal es increíblemente profesional."
                                </p>
                                <div className="flex items-center justify-center gap-4">
                                   <div className="w-12 h-12 rounded-full bg-rose-200" />
                                   <div className="text-left">
                                      <p className="font-bold">María García</p>
                                      <p className="text-xs text-gray-400">Clienta Frecuente</p>
                                   </div>
                                </div>
                             </div>
                          </div>
                       </section>
                    )}
                  </div>
                );
              })}

              {/* Add Section Button */}
              <div className="py-12 flex justify-center bg-gray-50/50 border-t border-dashed border-gray-200">
                 <Button className="bg-white hover:bg-rose-50 text-rose-500 border-2 border-rose-100 shadow-xl rounded-full px-8 py-6 h-auto font-bold gap-3 group">
                    <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center group-hover:rotate-90 transition-transform">
                       <Plus className="w-5 h-5" />
                    </div>
                    Añadir Nueva Sección
                 </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="appointments" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Citas</CardTitle>
              <CardDescription>Configura los horarios y servicios disponibles para agendar.</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center border-2 border-dashed rounded-xl m-6">
              <div className="text-center">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Módulo de citas en desarrollo</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="mt-6">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Palette className="w-5 h-5 text-rose-500" />
                  Colores de Marca
                </CardTitle>
                <CardDescription>Define los colores principales de tu sitio web</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Color Primario</Label>
                      <p className="text-xs text-gray-500">Botones y elementos destacados</p>
                    </div>
                    <div className="flex gap-2">
                      <div className="relative">
                        <Input 
                          type="color" 
                          value={colors.primary} 
                          onChange={(e) => setColors({ ...colors, primary: e.target.value })}
                          className="w-12 h-12 p-1 rounded-lg cursor-pointer bg-white"
                        />
                      </div>
                      <Input 
                        type="text" 
                        value={colors.primary} 
                        onChange={(e) => setColors({ ...colors, primary: e.target.value })}
                        className="w-24 font-mono text-xs uppercase"
                        maxLength={7}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Fondo de Página</Label>
                      <p className="text-xs text-gray-500">Color base del sitio</p>
                    </div>
                    <div className="flex gap-2">
                      <div className="relative">
                        <Input 
                          type="color" 
                          value={colors.background} 
                          onChange={(e) => setColors({ ...colors, background: e.target.value })}
                          className="w-12 h-12 p-1 rounded-lg cursor-pointer bg-white"
                        />
                      </div>
                      <Input 
                        type="text" 
                        value={colors.background} 
                        onChange={(e) => setColors({ ...colors, background: e.target.value })}
                        className="w-24 font-mono text-xs uppercase"
                        maxLength={7}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100">
                  <h4 className="text-sm font-medium mb-4">Paletas Sugeridas</h4>
                  <div className="flex gap-3">
                    {[
                      { p: '#f43f5e', b: '#ffffff' },
                      { p: '#8b5cf6', b: '#f5f3ff' },
                      { p: '#10b981', b: '#f0fdf4' },
                      { p: '#f59e0b', b: '#fffbeb' },
                    ].map((palette, i) => (
                      <button 
                        key={i}
                        className="w-8 h-8 rounded-full border border-gray-200 p-0.5"
                        onClick={() => setColors({ ...colors, primary: palette.p, background: palette.b })}
                      >
                        <div className="w-full h-full rounded-full flex overflow-hidden">
                          <div className="w-1/2 h-full" style={{ backgroundColor: palette.p }} />
                          <div className="w-1/2 h-full" style={{ backgroundColor: palette.b }} />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-sm bg-gray-50/50">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Previsualización</CardTitle>
                <CardDescription>Prueba cómo se ven tus colores</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-12 space-y-8">
                <div 
                  className="w-full max-w-[280px] p-8 rounded-3xl shadow-xl space-y-4"
                  style={{ backgroundColor: colors.background }}
                >
                  <div className="w-12 h-12 rounded-2xl" style={{ backgroundColor: colors.primary }} />
                  <div className="space-y-2">
                    <div className="h-4 w-3/4 rounded bg-gray-200" />
                    <div className="h-4 w-1/2 rounded bg-gray-100" />
                  </div>
                  <Button className="w-full rounded-full" style={{ backgroundColor: colors.primary }}>
                    Botón de Ejemplo
                  </Button>
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

    </div>
  );
}
