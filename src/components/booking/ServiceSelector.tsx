'use client';

import { useState, useEffect } from 'react';
import { useBooking } from '@/hooks/use-booking';
import { Loader2, Trash2, Check, Calendar, Image as ImageIcon, Sparkles, Clock } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  description: string | null;
  price: string;
  duration: number;
  category: { id: string; name: string; slug: string };
  imageUrl: string | null;
}

// Image placeholders by business type and category
const placeholderImages: Record<string, Record<string, string>> = {
  waxing: {
    face: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=300&fit=crop',
    'mid-body': 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=300&fit=crop',
    'lower-body': 'https://images.unsplash.com/photo-1519824145371-2968945900b2?w=400&h=300&fit=crop',
    mens: 'https://images.unsplash.com/photo-1503951914877-452944f0d4a4?w=400&h=300&fit=crop',
  },
  barber: {
    haircuts: 'https://images.unsplash.com/photo-1599351431202-6e0c7c8f4978?w=400&h=300&fit=crop',
    'beard-grooming': 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=300&fit=crop',
    'hot-towel-shaves': 'https://images.unsplash.com/photo-1503951914877-452944f0d4a4?w=400&h=300&fit=crop',
    'hair-color': 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop',
  },
  nails: {
    manicures: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop',
    pedicures: 'https://images.unsplash.com/photo-1519014816548-bf5fe059a970?w=400&h=300&fit=crop',
    'nail-enhancements': 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop',
    'nail-art': 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=400&h=300&fit=crop',
  },
  hair: {
    'womens-cuts': 'https://images.unsplash.com/photo-1560869710-0b753046a0c1?w=400&h=300&fit=crop',
    'color-services': 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop',
    treatments: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4c388?w=400&h=300&fit=crop',
    styling: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=400&h=300&fit=crop',
  },
  massage: {
    'swedish-massage': 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop',
    'deep-tissue': 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=400&h=300&fit=crop',
    'hot-stone': 'https://images.unsplash.com/photo-1519824145371-2968945900b2?w=400&h=300&fit=crop',
    'aromatherapy': 'https://images.unsplash.com/photo-1540555700478-4be7f6a0bb94?w=400&h=300&fit=crop',
  },
  skincare: {
    'facial-treatments': 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=300&fit=crop',
    'chemical-peels': 'https://images.unsplash.com/photo-1616394584738-fc6e012e52ca?w=400&h=300&fit=crop',
    microneedling: 'https://images.unsplash.com/photo-1619451334312-267ac4c838ee?w=400&h=300&fit=crop',
  },
  tattoo: {
    'custom-tattoos': 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=400&h=300&fit=crop',
    'tattoo-consultations': 'https://images.unsplash.com/photo-1475403614135-5f1aa0eb5015?w=400&h=300&fit=crop',
  },
  'brow-lash': {
    'lash-extensions': 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=400&h=300&fit=crop',
    'brow-services': 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=300&fit=crop',
  },
  default: {
    default: 'https://images.unsplash.com/photo-1599351431202-6e0c7c8f4978?w=400&h=300&fit=crop',
  },
};

const businessTypeColors: Record<string, string> = {
  waxing: '#d946ef',
  barber: '#3b82f6',
  nails: '#ec4899',
  hair: '#8b5cf6',
  tattoo: '#1f2937',
  massage: '#059669',
  skincare: '#f59e0b',
  'brow-lash': '#db2777',
  tanning: '#d97706',
  default: '#2563eb',
};

// Body area visualization for waxing
function BodyAreaSelector({
  selectedCategory,
  onSelectCategory,
  categories,
  primaryColor,
}: {
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
  categories: { id: string; name: string; slug: string }[];
  primaryColor: string;
}) {
  const bodyAreas = [
    { id: 'face', label: 'Face', y: 15, icon: '👁️' },
    { id: 'mid-body', label: 'Mid Body', y: 45, icon: '💪' },
    { id: 'lower-body', label: 'Lower Body', y: 75, icon: '🦵' },
  ];

  const catMap = new Map(categories.map((c) => [c.slug, c]));

  return (
    <div className="flex flex-col lg:flex-row gap-6 mb-8">
      {/* Body Silhouette */}
      <div className="relative w-full max-w-[200px] mx-auto lg:mx-0">
        <svg viewBox="0 0 100 180" className="w-full h-auto">
          <circle cx="50" cy="20" r="12" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="1" />
          <rect x="44" y="32" width="12" height="8" fill="#f3f4f6" />
          <path d="M30 40 Q50 35 70 40 L75 70 Q50 65 25 70 Z" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="1" />
          <path d="M25 45 L15 80" stroke="#d1d5db" strokeWidth="8" strokeLinecap="round" fill="none" />
          <path d="M75 45 L85 80" stroke="#d1d5db" strokeWidth="8" strokeLinecap="round" fill="none" />
          <path d="M28 70 Q50 68 72 70 L68 105 Q50 110 32 105 Z" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="1" />
          <path d="M32 105 L30 160 L45 160 L48 115 L52 115 L55 160 L70 160 L68 105" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="1" />
        </svg>
        {/* Zone buttons */}
        {bodyAreas.map((area) => {
          const cat = catMap.get(area.id);
          if (!cat) return null;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={area.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`absolute left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[11px] font-bold transition-all shadow-sm ${
                isActive ? 'text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
              }`}
              style={{
                top: `${area.y}%`,
                backgroundColor: isActive ? primaryColor : undefined,
              }}
            >
              {area.icon} {area.label}
            </button>
          );
        })}
      </div>

      {/* Category pills fallback */}
      <div className="flex-1 flex flex-wrap content-start gap-2">
        <button
          onClick={() => onSelectCategory('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
            selectedCategory === 'all'
              ? 'text-white border-transparent'
              : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
          }`}
          style={selectedCategory === 'all' ? { backgroundColor: primaryColor } : {}}
        >
          All Areas
        </button>
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                isActive
                  ? 'text-white border-transparent'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
              }`}
              style={isActive ? { backgroundColor: primaryColor } : {}}
            >
              {cat.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function ServiceSelector() {
  const { state, addService, removeService, setStep, totalPrice, totalDuration } = useBooking();
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [studioBusinessType, setStudioBusinessType] = useState<string>('waxing');

  useEffect(() => {
    const storedUser = localStorage.getItem('mock_user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user?.studioId) {
          const studioData = localStorage.getItem('mock_studio_' + user.studioId);
          if (studioData) {
            const studio = JSON.parse(studioData);
            if (studio.businessType) {
              setStudioBusinessType(studio.businessType);
            }
          }
        }
      } catch (e) {
        console.error('Error reading studio data:', e);
      }
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [studioBusinessType]);

  const fetchServices = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/services?businessType=${encodeURIComponent(studioBusinessType)}`);
      if (res.ok) {
        const data = await res.json();
        setServices(data);
      }
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const primaryColor = businessTypeColors[studioBusinessType] || businessTypeColors.default;
  const isWaxing = studioBusinessType === 'waxing';

  const categoriesMap = new Map<string, { id: string; name: string; slug: string }>();
  services.forEach((s) => {
    if (!categoriesMap.has(s.category.id)) {
      categoriesMap.set(s.category.id, { id: s.category.id, name: s.category.name, slug: s.category.slug });
    }
  });
  const categories = Array.from(categoriesMap.values());

  const filteredServices = selectedCategory === 'all'
    ? services
    : services.filter((s) => s.category.id === selectedCategory);

  const isSelected = (serviceId: string) =>
    state.selectedServices.some((s) => s.id === serviceId);

  const handleToggle = (service: Service) => {
    if (isSelected(service.id)) {
      removeService(service.id);
    } else {
      addService({
        id: service.id,
        name: service.name,
        price: parseFloat(service.price),
        duration: service.duration,
      });
    }
  };

  const getServiceImage = (service: Service) => {
    if (service.imageUrl) return service.imageUrl;
    const bt = placeholderImages[studioBusinessType] || placeholderImages.default;
    return bt[service.category.slug] || bt.default || placeholderImages.default.default;
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <Loader2 className="w-8 h-8 animate-spin" style={{ color: primaryColor }} />
        <p className="text-gray-400 text-sm font-medium">Loading services...</p>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-12 gap-8">
      {/* Left: Services */}
      <div className="lg:col-span-8">
        {/* Waxing Body Visualization or Category Pills */}
        {isWaxing ? (
          <BodyAreaSelector
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            categories={categories}
            primaryColor={primaryColor}
          />
        ) : (
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                selectedCategory === 'all'
                  ? 'text-white border-transparent'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
              }`}
              style={selectedCategory === 'all' ? { backgroundColor: primaryColor } : {}}
            >
              All
            </button>
            {categories.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                    active
                      ? 'text-white border-transparent'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                  }`}
                  style={active ? { backgroundColor: primaryColor } : {}}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        )}

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {filteredServices.map((service) => {
            const selected = isSelected(service.id);
            const imgUrl = getServiceImage(service);
            return (
              <div
                key={service.id}
                onClick={() => handleToggle(service)}
                className={`group relative cursor-pointer rounded-2xl overflow-hidden border transition-all duration-300 ${
                  selected
                    ? 'ring-2 shadow-lg'
                    : 'border-gray-100 hover:border-gray-200 hover:shadow-md'
                }`}
                style={selected ? { boxShadow: `0 0 0 2px ${primaryColor}`, borderColor: 'transparent' } : {}}
              >
                {/* Image */}
                <div className="relative h-32 w-full overflow-hidden bg-gray-100">
                  <img
                    src={imgUrl}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  {/* Selection overlay */}
                  {selected && (
                    <div
                      className="absolute inset-0 flex items-center justify-center transition-opacity"
                      style={{ backgroundColor: `${primaryColor}40` }}
                    >
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center shadow-lg"
                        style={{ backgroundColor: primaryColor }}
                      >
                        <Check className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h4 className="font-bold text-gray-900 text-[15px] leading-snug tracking-tight">
                      {service.name}
                    </h4>
                    <span
                      className="font-bold text-[15px] shrink-0 tracking-tight"
                      style={{ color: primaryColor }}
                    >
                      ${parseFloat(service.price).toFixed(2)}
                    </span>
                  </div>

                  <p className="text-sm text-gray-400 leading-relaxed line-clamp-2 mb-3">
                    {service.description || `${service.duration} min service`}
                  </p>

                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-gray-50 text-gray-500">
                      <Clock className="w-3 h-3" />
                      {service.duration} min
                    </span>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-gray-900 text-white">
                      {service.category.name}
                    </span>
                  </div>
                </div>

                {/* Radio indicator */}
                <div className="absolute top-3 right-3">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                      selected ? 'border-transparent' : 'border-white/80 bg-white/90 backdrop-blur-sm'
                    }`}
                    style={selected ? { backgroundColor: primaryColor } : {}}
                  >
                    {selected && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-16 border border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
            <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-400 font-medium">No services available in this category.</p>
          </div>
        )}
      </div>

      {/* Right: Sidebar */}
      <div className="lg:col-span-4">
        <div className="sticky top-6 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6 pb-5 border-b border-gray-50">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${primaryColor}10` }}
            >
              <Sparkles className="w-5 h-5" style={{ color: primaryColor }} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-base">Your Selection</h3>
              <p className="text-xs text-gray-400">{state.selectedServices.length} service(s)</p>
            </div>
          </div>

          {/* Selected Services */}
          {state.selectedServices.length === 0 ? (
            <div className="border-2 border-dashed border-gray-100 rounded-xl p-8 text-center mb-5">
              <Calendar className="w-6 h-6 text-gray-200 mx-auto mb-2" />
              <p className="text-sm text-gray-300">No services selected yet</p>
            </div>
          ) : (
            <div className="space-y-3 mb-5">
              {state.selectedServices.map((service) => (
                <div
                  key={service.id}
                  className="flex items-center justify-between gap-3 p-3 rounded-xl bg-gray-50/80"
                >
                  <span className="text-sm text-gray-700 font-medium">{service.name}</span>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-sm font-semibold text-gray-900">
                      ${parseFloat(service.price.toString()).toFixed(2)}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeService(service.id);
                      }}
                      className="text-gray-300 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Totals */}
          <div className="pt-5 border-t border-gray-50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Duration</span>
              <span className="text-sm font-semibold text-gray-700">{totalDuration} min</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-900 text-base">Total</span>
              <span className="text-2xl font-black tracking-tight" style={{ color: primaryColor }}>
                ${totalPrice.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Continue Button */}
          {state.selectedServices.length > 0 && (
            <button
              onClick={() => setStep(2)}
              className="w-full mt-6 py-3 rounded-xl text-white font-bold text-sm transition-all hover:opacity-90 active:scale-[0.98]"
              style={{ backgroundColor: primaryColor }}
            >
              Continue
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

