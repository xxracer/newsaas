'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMockAuth } from '@/components/providers/MockAuthProvider';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
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
  Pencil,
  Image as ImageIcon,
  Type,
  AlignLeft,
  MousePointerClick,
  Phone,
  Mail,
  MapPinned,
  Instagram,
  Save,
  GripVertical,
  Trash2,
  Check,
  Clock,
  User,
  CreditCard,
  ArrowRight,
  Monitor,
  Smartphone,
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
  Phone,
  Instagram,
  ImageIcon,
};

// ============================================
// SECTION EDITOR SCHEMA
// ============================================

type FieldType = 'text' | 'textarea' | 'image' | 'url';

interface SectionField {
  key: string;
  label: string;
  type: FieldType;
  placeholder?: string;
}

interface SectionSchema {
  name: string;
  icon: string;
  description: string;
  fields: SectionField[];
}

const SECTION_SCHEMA: Record<string, SectionSchema> = {
  hero: {
    name: 'Hero Banner',
    icon: 'LayoutTemplate',
    description: 'Large top banner with headline, subtitle, and call-to-action.',
    fields: [
      { key: 'title', label: 'Headline', type: 'text', placeholder: 'Welcome to our studio' },
      { key: 'subtitle', label: 'Subheadline', type: 'textarea', placeholder: 'Experience the best beauty services in town.' },
      { key: 'backgroundImage', label: 'Background Image URL', type: 'image', placeholder: 'https://images.unsplash.com/...' },
      { key: 'ctaText', label: 'Button Text', type: 'text', placeholder: 'Book Appointment' },
      { key: 'ctaLink', label: 'Button Link', type: 'url', placeholder: '/book' },
    ],
  },
  servicesGrid: {
    name: 'Services Grid',
    icon: 'Scissors',
    description: 'Display your services in a responsive card grid.',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text', placeholder: 'Our Services' },
      { key: 'subtitle', label: 'Section Subtitle', type: 'text', placeholder: 'Choose from our curated menu' },
    ],
  },
  aboutPreview: {
    name: 'About Preview',
    icon: 'Users',
    description: 'Short story about your studio with an image.',
    fields: [
      { key: 'title', label: 'Title', type: 'text', placeholder: 'About Us' },
      { key: 'description', label: 'Description', type: 'textarea', placeholder: 'We have been serving our community since 2020...' },
      { key: 'image', label: 'Image URL', type: 'image', placeholder: 'https://images.unsplash.com/...' },
    ],
  },
  testimonials: {
    name: 'Testimonials',
    icon: 'Sparkles',
    description: 'Client reviews and star ratings.',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text', placeholder: 'What Our Clients Say' },
    ],
  },
  teamPreview: {
    name: 'Team Preview',
    icon: 'Users',
    description: 'Showcase your staff members.',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text', placeholder: 'Meet the Team' },
    ],
  },
  gallery: {
    name: 'Gallery',
    icon: 'ImageIcon',
    description: 'Photo gallery of your work or studio.',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text', placeholder: 'Our Work' },
    ],
  },
  promotions: {
    name: 'Promotions',
    icon: 'Gift',
    description: 'Highlight special offers and discounts.',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text', placeholder: 'Special Offers' },
    ],
  },
  giftCards: {
    name: 'Gift Cards',
    icon: 'Gift',
    description: 'Promote your gift card options.',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text', placeholder: 'Gift Cards' },
    ],
  },
  instagramFeed: {
    name: 'Instagram Feed',
    icon: 'Instagram',
    description: 'Embed your Instagram handle or feed preview.',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text', placeholder: 'Follow Us on Instagram' },
      { key: 'handle', label: 'Instagram Handle', type: 'text', placeholder: '@yourstudio' },
    ],
  },
  ctaBanner: {
    name: 'CTA Banner',
    icon: 'MousePointerClick',
    description: 'Bottom banner with a strong call-to-action.',
    fields: [
      { key: 'title', label: 'Headline', type: 'text', placeholder: 'Ready to look your best?' },
      { key: 'subtitle', label: 'Subtitle', type: 'textarea', placeholder: 'Book your appointment today and enjoy 10% off your first visit.' },
      { key: 'ctaText', label: 'Button Text', type: 'text', placeholder: 'Book Now' },
      { key: 'ctaLink', label: 'Button Link', type: 'url', placeholder: '/book' },
    ],
  },
  contactInfo: {
    name: 'Contact Info',
    icon: 'MapPinned',
    description: 'Address, phone, email, and business hours.',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text', placeholder: 'Visit Us' },
      { key: 'phone', label: 'Phone', type: 'text', placeholder: '(555) 123-4567' },
      { key: 'email', label: 'Email', type: 'text', placeholder: 'hello@studio.com' },
      { key: 'address', label: 'Address', type: 'text', placeholder: '123 Main Street, City, ST 12345' },
    ],
  },
};

// Default content for each section when first added
const DEFAULT_SECTION_CONTENT: Record<string, Record<string, string>> = {
  hero: {
    title: 'Welcome to Our Studio',
    subtitle: 'Experience luxury beauty services tailored just for you.',
    backgroundImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1600&h=900&fit=crop',
    ctaText: 'Book Now',
    ctaLink: '/book',
  },
  servicesGrid: {
    title: 'Our Services',
    subtitle: 'Choose from our curated menu of premium treatments.',
  },
  aboutPreview: {
    title: 'About Us',
    description: 'Founded with a passion for beauty and client care, our studio offers a welcoming space where you can relax and transform.',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=600&fit=crop',
  },
  testimonials: {
    title: 'What Our Clients Say',
  },
  teamPreview: {
    title: 'Meet the Team',
  },
  gallery: {
    title: 'Our Work',
  },
  promotions: {
    title: 'Special Offers',
  },
  giftCards: {
    title: 'Gift Cards',
  },
  instagramFeed: {
    title: 'Follow Us on Instagram',
    handle: '@ourstudio',
  },
  ctaBanner: {
    title: 'Ready to look your best?',
    subtitle: 'Book your appointment today and enjoy 10% off your first visit.',
    ctaText: 'Book Now',
    ctaLink: '/book',
  },
  contactInfo: {
    title: 'Visit Us',
    phone: '(555) 123-4567',
    email: 'hello@studio.com',
    address: '123 Main Street, City, ST 12345',
  },
};

// ============================================
// TYPES
// ============================================

interface PageSection {
  id: string;
  name: string;
  enabled: boolean;
  content?: Record<string, string>;
}

interface StudioPage {
  id: string;
  name: string;
  slug: string;
  icon: string;
  enabled: boolean;
  order: number;
  sections: PageSection[];
}

function getDefaultPages(businessTypeId: string = 'waxing'): StudioPage[] {
  const bt = getBusinessType(businessTypeId);
  const btPages = bt?.defaultPages || ['home', 'services', 'appointments', 'about', 'contact'];

  const pageDefs: Record<string, { name: string; slug: string; icon: string; sections: string[] }> = {
    home: {
      name: 'Home Page', slug: 'home', icon: 'Home',
      sections: ['hero', 'servicesGrid', 'aboutPreview', 'testimonials', 'teamPreview', 'gallery', 'promotions', 'giftCards', 'instagramFeed', 'ctaBanner', 'contactInfo'],
    },
    services: {
      name: 'Services', slug: 'services', icon: 'Scissors',
      sections: ['servicesGrid', 'ctaBanner'],
    },
    appointments: {
      name: 'Appointments', slug: 'appointments', icon: 'Calendar',
      sections: ['ctaBanner'],
    },
    about: {
      name: 'About Us', slug: 'about', icon: 'Users',
      sections: ['aboutPreview', 'teamPreview', 'ctaBanner'],
    },
    contact: {
      name: 'Contact', slug: 'contact', icon: 'MapPin',
      sections: ['contactInfo', 'ctaBanner'],
    },
    'gift-cards': {
      name: 'Gift Cards', slug: 'gift-cards', icon: 'Gift',
      sections: ['promotions', 'ctaBanner'],
    },
    products: {
      name: 'Products', slug: 'products', icon: 'ShoppingBag',
      sections: ['ctaBanner'],
    },
    gallery: {
      name: 'Gallery', slug: 'gallery', icon: 'ImageIcon',
      sections: ['gallery', 'ctaBanner'],
    },
    portfolio: {
      name: 'Portfolio', slug: 'portfolio', icon: 'ImageIcon',
      sections: ['gallery', 'ctaBanner'],
    },
    faq: {
      name: 'FAQ', slug: 'faq', icon: 'HelpCircle',
      sections: ['ctaBanner'],
    },
    packages: {
      name: 'Packages', slug: 'packages', icon: 'Gift',
      sections: ['promotions', 'ctaBanner'],
    },
  };

  const order = ['home', 'services', 'appointments', 'about', 'contact', 'gallery', 'portfolio', 'packages', 'gift-cards', 'products', 'faq'];

  return btPages
    .map((pid, idx) => {
      const def = pageDefs[pid];
      if (!def) return null;
      const sections: PageSection[] = def.sections.map((sid) => {
        const schema = SECTION_SCHEMA[sid];
        return {
          id: sid,
          name: schema?.name || sid,
          enabled: true,
          content: DEFAULT_SECTION_CONTENT[sid] ? { ...DEFAULT_SECTION_CONTENT[sid] } : {},
        };
      });
      return {
        id: def.slug,
        name: def.name,
        slug: def.slug,
        icon: def.icon,
        enabled: idx < 5,
        order: order.indexOf(pid) + 1,
        sections,
      };
    })
    .filter(Boolean) as StudioPage[];
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function WebsitePagesPage() {
  const router = useRouter();
  const { user } = useMockAuth();
  const [businessType, setBusinessType] = useState<string>('waxing');
  const [pages, setPages] = useState<StudioPage[]>(() => getDefaultPages('waxing'));
  const [selectedPageId, setSelectedPageId] = useState<string>('home');
  const [activeTab, setActiveTab] = useState('pages');

  // Section editor state
  const [editingSection, setEditingSection] = useState<PageSection | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editDraft, setEditDraft] = useState<Record<string, string>>({});

  // Add page dialog
  const [showAddPageDialog, setShowAddPageDialog] = useState(false);
  const [newPageName, setNewPageName] = useState('');
  const [newPageSlug, setNewPageSlug] = useState('');

  // Booking style
  const [selectedBookingStyle, setSelectedBookingStyle] = useState('modern');

  // Load from localStorage
  useEffect(() => {
    if (user?.studioId) {
      const stored = localStorage.getItem('mock_studio_' + user.studioId);
      if (stored) {
        try {
          const data = JSON.parse(stored);
          const bt = data.businessType || 'waxing';
          setBusinessType(bt);
          if (data.website?.pages) {
            setPages(data.website.pages);
          } else {
            setPages(getDefaultPages(bt));
          }
          if (data.website?.bookingStyle) {
            setSelectedBookingStyle(data.website.bookingStyle);
          }
        } catch { /* ignore */ }
      }
    }
  }, [user?.studioId]);

  // Save to localStorage
  useEffect(() => {
    if (user?.studioId) {
      const stored = localStorage.getItem('mock_studio_' + user.studioId);
      const data = stored ? JSON.parse(stored) : {};
      data.website = { ...(data.website || {}), pages, bookingStyle: selectedBookingStyle };
      localStorage.setItem('mock_studio_' + user.studioId, JSON.stringify(data));
    }
  }, [pages, selectedBookingStyle, user?.studioId]);

  const selectedPage = pages.find((p) => p.id === selectedPageId) || pages[0];

  const handleTogglePage = (pageId: string) => {
    setPages((prev) => prev.map((p) => (p.id === pageId ? { ...p, enabled: !p.enabled } : p)));
  };

  const handleToggleSection = (pageId: string, sectionId: string) => {
    setPages((prev) =>
      prev.map((p) => {
        if (p.id !== pageId) return p;
        return {
          ...p,
          sections: p.sections.map((s) =>
            s.id === sectionId ? { ...s, enabled: !s.enabled } : s
          ),
        };
      })
    );
  };

  const handleMoveSectionUp = (pageId: string, sectionIndex: number) => {
    if (sectionIndex === 0) return;
    setPages((prev) =>
      prev.map((p) => {
        if (p.id !== pageId) return p;
        const secs = [...p.sections];
        [secs[sectionIndex - 1], secs[sectionIndex]] = [secs[sectionIndex], secs[sectionIndex - 1]];
        return { ...p, sections: secs };
      })
    );
  };

  const handleMoveSectionDown = (pageId: string, sectionIndex: number) => {
    setPages((prev) =>
      prev.map((p) => {
        if (p.id !== pageId) return p;
        if (sectionIndex >= p.sections.length - 1) return p;
        const secs = [...p.sections];
        [secs[sectionIndex], secs[sectionIndex + 1]] = [secs[sectionIndex + 1], secs[sectionIndex]];
        return { ...p, sections: secs };
      })
    );
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
      sections: [
        { id: 'hero', name: 'Hero Banner', enabled: true, content: { ...DEFAULT_SECTION_CONTENT.hero } },
        { id: 'ctaBanner', name: 'CTA Banner', enabled: true, content: { ...DEFAULT_SECTION_CONTENT.ctaBanner } },
      ],
    };
    setPages((prev) => [...prev, newPage]);
    setNewPageName('');
    setNewPageSlug('');
    setShowAddPageDialog(false);
  };

  const handleMovePageUp = (index: number) => {
    if (index === 0) return;
    setPages((prev) => {
      const updated = [...prev];
      [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
      updated.forEach((p, i) => (p.order = i + 1));
      return updated;
    });
  };

  const handleMovePageDown = (index: number) => {
    setPages((prev) => {
      if (index >= prev.length - 1) return prev;
      const updated = [...prev];
      [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
      updated.forEach((p, i) => (p.order = i + 1));
      return updated;
    });
  };

  // Section editor handlers
  const openSectionEditor = (section: PageSection) => {
    setEditingSection(section);
    setEditDraft({ ...(section.content || {}) });
    setEditorOpen(true);
  };

  const saveSectionContent = () => {
    if (!editingSection || !selectedPage) return;
    setPages((prev) =>
      prev.map((p) => {
        if (p.id !== selectedPage.id) return p;
        return {
          ...p,
          sections: p.sections.map((s) =>
            s.id === editingSection.id ? { ...s, content: { ...editDraft } } : s
          ),
        };
      })
    );
    setEditorOpen(false);
    setEditingSection(null);
  };

  const handleImageUpload = (fieldKey: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditDraft((prev) => ({ ...prev, [fieldKey]: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const getFieldIcon = (type: FieldType) => {
    switch (type) {
      case 'text': return <Type className="w-4 h-4" />;
      case 'textarea': return <AlignLeft className="w-4 h-4" />;
      case 'image': return <ImageIcon className="w-4 h-4" />;
      case 'url': return <ExternalLink className="w-4 h-4" />;
    }
  };

  // Mini preview component for each section type
  const SectionMiniPreview = ({ section }: { section: PageSection }) => {
    const schema = SECTION_SCHEMA[section.id];
    const content = section.content || {};

    switch (section.id) {
      case 'hero':
        return (
          <div className="relative h-28 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center border border-gray-100">
            {content.backgroundImage ? (
              <img src={content.backgroundImage} alt="" className="absolute inset-0 w-full h-full object-cover opacity-60" />
            ) : null}
            <div className="relative z-10 text-center px-4">
              <p className="text-sm font-bold text-gray-900">{content.title || 'Hero Title'}</p>
              {content.subtitle && <p className="text-[11px] text-gray-600 mt-0.5 max-w-[200px] mx-auto truncate">{content.subtitle}</p>}
            </div>
          </div>
        );
      case 'servicesGrid':
        return (
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-14 rounded-lg bg-white border border-gray-100 flex items-center justify-center">
                <Scissors className="w-4 h-4 text-gray-300" />
              </div>
            ))}
          </div>
        );
      case 'aboutPreview':
        return (
          <div className="flex gap-3 items-center">
            <div className="w-14 h-14 rounded-lg bg-gray-100 shrink-0 overflow-hidden border border-gray-100">
              {content.image ? <img src={content.image} alt="" className="w-full h-full object-cover" /> : null}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{content.title || 'About Us'}</p>
              <p className="text-[11px] text-gray-500 truncate">{content.description || ''}</p>
            </div>
          </div>
        );
      case 'ctaBanner':
        return (
          <div className="h-16 rounded-lg bg-gray-900 flex flex-col items-center justify-center text-white">
            <p className="text-xs font-bold">{content.title || 'CTA Banner'}</p>
            <span className="text-[9px] bg-white text-gray-900 px-2 py-0.5 rounded mt-0.5">{content.ctaText || 'Book Now'}</span>
          </div>
        );
      case 'contactInfo':
        return (
          <div className="flex gap-4 text-[11px] text-gray-600">
            {content.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{content.phone}</span>}
            {content.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{content.email}</span>}
          </div>
        );
      case 'testimonials':
        return (
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-1 h-14 rounded-lg bg-white border border-gray-100 p-2">
                <div className="flex gap-0.5 mb-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Sparkles key={s} className="w-2 h-2 text-amber-400" />
                  ))}
                </div>
                <div className="h-1.5 bg-gray-100 rounded w-full" />
                <div className="h-1.5 bg-gray-100 rounded w-2/3 mt-1" />
              </div>
            ))}
          </div>
        );
      case 'teamPreview':
        return (
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-100" />
                <div className="h-1.5 bg-gray-100 rounded w-8 mt-1.5" />
              </div>
            ))}
          </div>
        );
      case 'gallery':
        return (
          <div className="grid grid-cols-4 gap-1.5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square rounded-lg bg-gray-100 border border-gray-100" />
            ))}
          </div>
        );
      case 'promotions':
        return (
          <div className="flex gap-2">
            {[1, 2].map((i) => (
              <div key={i} className="flex-1 h-16 rounded-lg bg-white border border-gray-100 p-2">
                <div className="h-2 bg-gray-100 rounded w-1/2 mb-1" />
                <div className="h-1.5 bg-gray-100 rounded w-full" />
                <div className="h-1.5 bg-gray-100 rounded w-3/4 mt-0.5" />
              </div>
            ))}
          </div>
        );
      case 'giftCards':
        return (
          <div className="flex items-center justify-center gap-2">
            <div className="w-20 h-12 rounded-lg bg-gray-900 border border-gray-800" />
            <div className="w-20 h-12 rounded-lg bg-white border border-gray-200" />
          </div>
        );
      case 'instagramFeed':
        return (
          <div className="flex items-center justify-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-10 h-10 rounded bg-gray-100 border border-gray-100" />
            ))}
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-2 text-[11px] text-gray-400">
            <LayoutTemplate className="w-4 h-4 text-gray-300" />
            {schema?.name || 'Section'} preview
          </div>
        );
    }
  };

  // Booking style options
  const bookingStyles = [
    {
      id: 'modern',
      name: 'Modern Minimal',
      description: 'Clean white cards with subtle shadows',
      preview: (
        <div className="w-full h-full bg-[#f8fafc] p-2 flex flex-col gap-1.5">
          <div className="flex gap-1 justify-center">
            {['Services', 'Date', 'Info', 'Confirm'].map((s, i) => (
              <div key={s} className={`text-[6px] px-1.5 py-0.5 rounded-full ${i === 0 ? 'bg-blue-600 text-white' : 'bg-white text-gray-400 border border-gray-100'}`}>{s}</div>
            ))}
          </div>
          <div className="bg-white rounded-lg p-2 shadow-sm">
            <div className="h-1.5 bg-gray-100 rounded w-1/2 mb-1" />
            <div className="grid grid-cols-2 gap-1">
              <div className="h-8 rounded bg-gray-50 border border-gray-100" />
              <div className="h-8 rounded bg-gray-50 border border-gray-100" />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'classic',
      name: 'Classic Dark',
      description: 'Elegant dark header with white content',
      preview: (
        <div className="w-full h-full bg-gray-900 p-2 flex flex-col gap-1.5">
          <div className="text-center">
            <div className="h-1.5 bg-white/20 rounded w-1/2 mx-auto mb-0.5" />
          </div>
          <div className="bg-white rounded-lg p-2">
            <div className="h-1.5 bg-gray-100 rounded w-1/2 mb-1" />
            <div className="grid grid-cols-2 gap-1">
              <div className="h-8 rounded bg-gray-50 border border-gray-100" />
              <div className="h-8 rounded bg-gray-50 border border-gray-100" />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'clean',
      name: 'Clean White',
      description: 'Pure white with light blue accents',
      preview: (
        <div className="w-full h-full bg-white p-2 flex flex-col gap-1.5">
          <div className="flex gap-1 justify-center">
            {['Services', 'Date', 'Info', 'Confirm'].map((s, i) => (
              <div key={s} className={`text-[6px] px-1.5 py-0.5 rounded-full ${i === 0 ? 'bg-sky-100 text-sky-700' : 'text-gray-300'}`}>{s}</div>
            ))}
          </div>
          <div className="bg-white rounded-lg p-2 border border-gray-100">
            <div className="h-1.5 bg-gray-100 rounded w-1/2 mb-1" />
            <div className="grid grid-cols-2 gap-1">
              <div className="h-8 rounded bg-gray-50" />
              <div className="h-8 rounded bg-gray-50" />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'luxury',
      name: 'Luxury Gold',
      description: 'Warm cream with gold accents',
      preview: (
        <div className="w-full h-full bg-[#faf9f6] p-2 flex flex-col gap-1.5">
          <div className="text-center">
            <div className="h-1.5 bg-amber-200/50 rounded w-1/2 mx-auto mb-0.5" />
          </div>
          <div className="bg-white rounded-lg p-2 shadow-sm border border-amber-50">
            <div className="h-1.5 bg-amber-100 rounded w-1/2 mb-1" />
            <div className="grid grid-cols-2 gap-1">
              <div className="h-8 rounded bg-gray-50" />
              <div className="h-8 rounded bg-gray-50" />
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-100 bg-white sticky top-0 z-10">
        <div className="px-6 lg:px-8 py-5 max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Website Builder</h1>
            <p className="text-gray-400 text-sm mt-0.5">Design your pages, booking flow, and appearance.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2 rounded-lg border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 text-sm h-9">
              <Sparkles className="w-4 h-4" />
              SEO Tips
            </Button>
            <Link href={`/studio/demo/home`} target="_blank">
              <Button className="gap-2 rounded-lg bg-gray-900 hover:bg-black text-white text-sm h-9">
                <ExternalLink className="w-4 h-4" />
                Preview Site
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Tabs */}
      <div className="px-6 lg:px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-1 p-1 bg-gray-50 rounded-xl w-fit mb-6 border border-gray-100">
          {[
            { id: 'pages', label: 'Pages', icon: LayoutDashboard },
            { id: 'appointments', label: 'Booking Style', icon: Calendar },
            { id: 'appearance', label: 'Appearance', icon: Palette },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* PAGES TAB */}
        {activeTab === 'pages' && (
          <div className="grid lg:grid-cols-12 gap-6">
            {/* Left Column - Pages List */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Pages</h2>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 gap-1 rounded-lg border-gray-200 text-gray-600 hover:bg-gray-50 text-xs"
                  onClick={() => setShowAddPageDialog(true)}
                >
                  <Plus className="w-3 h-3" />
                  Add
                </Button>
              </div>
              <div className="space-y-1">
                {pages.map((page, index) => {
                  const Icon = iconMap[page.icon] || LayoutDashboard;
                  const isSelected = selectedPageId === page.id;
                  return (
                    <button
                      key={page.id}
                      onClick={() => setSelectedPageId(page.id)}
                      className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all text-sm ${
                        isSelected
                          ? 'bg-gray-900 text-white border-gray-900 shadow-sm'
                          : 'bg-white text-gray-700 border-gray-100 hover:border-gray-200 hover:bg-gray-50/50'
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-white' : 'text-gray-400'}`} />
                      <span className="font-medium truncate flex-1">{page.name}</span>
                      {page.enabled ? (
                        <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-blue-400' : 'bg-emerald-400'}`} />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Center - Sections Canvas */}
            <div className="lg:col-span-9">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-bold text-gray-900">{selectedPage.name}</h2>
                  <p className="text-sm text-gray-400">
                    {selectedPage.sections.filter((s) => s.enabled).length} of {selectedPage.sections.length} sections visible
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link href={`/studio/demo/${selectedPage.id === 'home' ? '' : selectedPage.id}`} target="_blank">
                    <Button variant="outline" className="gap-2 rounded-lg border-gray-200 text-gray-600 hover:bg-gray-50 text-sm h-8">
                      <Eye className="w-4 h-4" />
                      Preview
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Sections as Wix-like blocks */}
              <div className="space-y-2.5">
                {selectedPage.sections.map((section, idx) => {
                  const schema = SECTION_SCHEMA[section.id];
                  const isEnabled = section.enabled !== false;
                  return (
                    <div
                      key={section.id}
                      className={`group bg-white border rounded-xl overflow-hidden transition-all ${
                        isEnabled ? 'border-gray-200' : 'border-gray-100 opacity-50'
                      }`}
                    >
                      {/* Section Bar */}
                      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-50">
                        <div className="text-gray-300 cursor-grab">
                          <GripVertical className="w-4 h-4" />
                        </div>
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isEnabled ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-400'}`}>
                          {(() => {
                            const IconComp = schema ? iconMap[schema.icon] || LayoutTemplate : LayoutTemplate;
                            return <IconComp className="w-3.5 h-3.5" />;
                          })()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900">{schema?.name || section.name}</p>
                          <p className="text-[11px] text-gray-400 truncate">{schema?.description || ''}</p>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleMoveSectionUp(selectedPage.id, idx)}
                            disabled={idx === 0}
                            className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-50 disabled:opacity-20"
                          >
                            <ChevronUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleMoveSectionDown(selectedPage.id, idx)}
                            disabled={idx === selectedPage.sections.length - 1}
                            className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-50 disabled:opacity-20"
                          >
                            <ChevronDown className="w-3.5 h-3.5" />
                          </button>
                          <div className="w-px h-4 bg-gray-100 mx-1" />
                          <Switch
                            checked={isEnabled}
                            onCheckedChange={() => handleToggleSection(selectedPage.id, section.id)}
                            className="data-[state=checked]:bg-gray-900 scale-90"
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 gap-1.5 rounded-lg border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 text-xs"
                            onClick={() => openSectionEditor(section)}
                          >
                            <Pencil className="w-3 h-3" />
                            Edit
                          </Button>
                        </div>
                      </div>

                      {/* Mini Preview */}
                      <div className="px-4 py-3 bg-gray-50/40">
                        <SectionMiniPreview section={section} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* APPOINTMENTS / BOOKING STYLE TAB */}
        {activeTab === 'appointments' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-gray-900">Booking Form Style</h2>
                <p className="text-sm text-gray-400">Choose the look and feel of your appointment booking flow.</p>
              </div>
              <Link href="/book" target="_blank">
                <Button variant="outline" className="gap-2 rounded-lg border-gray-200 text-gray-600 hover:bg-gray-50 text-sm h-8">
                  <Eye className="w-4 h-4" />
                  Live Preview
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {bookingStyles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setSelectedBookingStyle(style.id)}
                  className={`text-left p-4 border rounded-xl transition-all ${
                    selectedBookingStyle === style.id
                      ? 'border-gray-900 ring-1 ring-gray-900 shadow-sm'
                      : 'border-gray-200 hover:border-gray-300'
                  } bg-white`}
                >
                  <div className="aspect-video rounded-lg overflow-hidden border border-gray-100 mb-3 bg-white">
                    {style.preview}
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900 text-sm">{style.name}</h3>
                    {selectedBookingStyle === style.id && (
                      <Check className="w-4 h-4 text-gray-900" />
                    )}
                  </div>
                  <p className="text-xs text-gray-400">{style.description}</p>
                </button>
              ))}
            </div>

            {/* Live preview iframe */}
            <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900 text-sm">Live Preview</h3>
                <div className="flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-gray-400" />
                  <span className="text-xs text-gray-400">Desktop</span>
                </div>
              </div>
              <div className="p-4 bg-gray-50">
                <iframe
                  src="/book"
                  className="w-full h-[500px] rounded-lg border border-gray-200 bg-white"
                  title="Booking Preview"
                />
              </div>
            </div>
          </div>
        )}

        {/* APPEARANCE TAB */}
        {activeTab === 'appearance' && (
          <div className="max-w-2xl">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="flex items-center gap-2 text-base font-bold text-gray-900 mb-1">
                <Palette className="w-5 h-5" />
                Current Theme
              </h3>
              <p className="text-sm text-gray-400 mb-6">
                The selected theme applies to all public pages of your site.
              </p>
              <div className="flex items-center justify-between p-5 bg-gray-50 rounded-xl border border-gray-100">
                <div>
                  <p className="font-semibold text-gray-900">Professional Blue</p>
                  <p className="text-sm text-gray-400">Clean, modern, and elegant</p>
                </div>
                <Link href="/admin/settings/theme">
                  <Button variant="outline" className="gap-2 rounded-lg border-gray-200 hover:bg-white text-sm">
                    <Palette className="w-4 h-4" />
                    Change Theme
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SECTION EDITOR SHEET (Wix-style) */}
      <Sheet open={editorOpen} onOpenChange={setEditorOpen}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto bg-white border-l border-gray-200 p-0">
          {editingSection && SECTION_SCHEMA[editingSection.id] && (
            <>
              <SheetHeader className="px-6 py-5 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-900 text-white flex items-center justify-center">
                    {(() => {
                      const IconComp = iconMap[SECTION_SCHEMA[editingSection.id].icon] || LayoutTemplate;
                      return <IconComp className="w-4 h-4" />;
                    })()}
                  </div>
                  <div>
                    <SheetTitle className="text-gray-900 text-base">Edit {SECTION_SCHEMA[editingSection.id].name}</SheetTitle>
                    <SheetDescription className="text-gray-400 text-xs">
                      {SECTION_SCHEMA[editingSection.id].description}
                    </SheetDescription>
                  </div>
                </div>
              </SheetHeader>

              <div className="px-6 py-6 space-y-5">
                {SECTION_SCHEMA[editingSection.id].fields.map((field) => (
                  <div key={field.key} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-2.5">
                      <div className="text-gray-400">{getFieldIcon(field.type)}</div>
                      <Label className="text-sm font-semibold text-gray-900">{field.label}</Label>
                    </div>

                    {field.type === 'textarea' && (
                      <Textarea
                        value={editDraft[field.key] || ''}
                        onChange={(e) => setEditDraft((prev) => ({ ...prev, [field.key]: e.target.value }))}
                        placeholder={field.placeholder}
                        rows={3}
                        className="bg-white border-gray-200 focus:border-gray-400 focus:ring-0 rounded-lg text-sm resize-none"
                      />
                    )}

                    {(field.type === 'text' || field.type === 'url') && (
                      <Input
                        value={editDraft[field.key] || ''}
                        onChange={(e) => setEditDraft((prev) => ({ ...prev, [field.key]: e.target.value }))}
                        placeholder={field.placeholder}
                        className="bg-white border-gray-200 focus:border-gray-400 focus:ring-0 rounded-lg text-sm"
                      />
                    )}

                    {field.type === 'image' && (
                      <div className="space-y-3">
                        <Input
                          value={editDraft[field.key] || ''}
                          onChange={(e) => setEditDraft((prev) => ({ ...prev, [field.key]: e.target.value }))}
                          placeholder={field.placeholder}
                          className="bg-white border-gray-200 focus:border-gray-400 focus:ring-0 rounded-lg text-sm"
                        />
                        {editDraft[field.key] && (
                          <div className="relative h-32 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                            <img src={editDraft[field.key]} alt="Preview" className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div>
                          <Label className="text-xs text-gray-400 mb-1.5 block">Or upload an image</Label>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(field.key, e)}
                            className="bg-white border-gray-200 rounded-lg text-sm file:text-gray-600 file:font-medium"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <SheetFooter className="px-6 py-5 border-t border-gray-100 flex-row gap-3">
                <SheetClose asChild>
                  <Button variant="outline" className="flex-1 rounded-lg border-gray-200 text-gray-600 hover:bg-gray-50">
                    Cancel
                  </Button>
                </SheetClose>
                <Button
                  onClick={saveSectionContent}
                  className="flex-1 gap-2 rounded-lg bg-gray-900 hover:bg-black text-white"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </Button>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* ADD PAGE DIALOG */}
      <Dialog open={showAddPageDialog} onOpenChange={setShowAddPageDialog}>
        <DialogContent className="bg-white border border-gray-200 rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-gray-900">Add New Page</DialogTitle>
            <DialogDescription className="text-gray-400">Create a new page for your website.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label className="text-sm font-medium text-gray-900">Page Name</Label>
              <Input
                value={newPageName}
                onChange={(e) => {
                  setNewPageName(e.target.value);
                  if (!newPageSlug) {
                    setNewPageSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'));
                  }
                }}
                placeholder="e.g. Blog"
                className="mt-1.5 bg-white border-gray-200 focus:border-gray-400 rounded-lg"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-900">URL Slug</Label>
              <Input
                value={newPageSlug}
                onChange={(e) => setNewPageSlug(e.target.value)}
                placeholder="e.g. blog"
                className="mt-1.5 bg-white border-gray-200 focus:border-gray-400 rounded-lg"
              />
              <p className="text-xs text-gray-400 mt-1.5">This will be the URL: /{newPageSlug}</p>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowAddPageDialog(false)} className="rounded-lg border-gray-200">
              Cancel
            </Button>
            <Button onClick={handleAddPage} className="rounded-lg bg-gray-900 hover:bg-black text-white">
              Create Page
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
