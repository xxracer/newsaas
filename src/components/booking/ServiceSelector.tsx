'use client';

import { useState, useEffect } from 'react';
import { useBooking } from '@/hooks/use-booking';
import { useTheme } from '@/components/providers/ThemeProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Loader2, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  description: string | null;
  price: string;
  duration: number;
  category: { id: string; name: string };
  imageUrl: string | null;
}

export function ServiceSelector() {
  const { state, addService, removeService, setStep, totalPrice, totalDuration } = useBooking();
  const { colors } = useTheme();
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/services');
      if (res.ok) {
        const data = await res.json();
        setServices(data);
        // Set first category as default
        if (data.length > 0) {
          setSelectedCategory(data[0].category.id);
        }
      }
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const categories = Array.from(new Set(services.map((s) => s.category.id))).map((id) => {
    const cat = services.find((s) => s.category.id === id)?.category;
    return cat!;
  });

  const filteredServices = selectedCategory
    ? services.filter((s) => s.category.id === selectedCategory)
    : services;

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

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" style={{ color: colors.primary }} />
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Services List */}
      <div className="lg:col-span-2 space-y-6">
        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(cat.id)}
              style={selectedCategory === cat.id ? { backgroundColor: colors.primary, color: '#ffffff' } : {}}
            >
              {cat.name}
            </Button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {filteredServices.map((service) => (
            <Card
              key={service.id}
              className={`cursor-pointer transition-all ${
                isSelected(service.id)
                  ? 'ring-2'
                  : 'hover:shadow-md'
              }`}
              style={isSelected(service.id)
                ? { borderColor: colors.primary, backgroundColor: colors.background }
                : {}}
              onClick={() => handleToggle(service)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={isSelected(service.id)}
                    className="mt-1"
                    onCheckedChange={() => handleToggle(service)}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-medium text-gray-900">{service.name}</h4>
                      <span className="font-bold" style={{ color: colors.primary }}>
                        ${parseFloat(service.price).toFixed(2)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {service.description || `${service.duration} minutes`}
                    </p>
                    <Badge variant="secondary" className="mt-2 text-xs">
                      {service.duration} min
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Booking Summary Sidebar */}
      <div className="lg:col-span-1">
        <Card className="sticky top-4">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <ShoppingBag className="h-5 w-5" style={{ color: colors.primary }} />
              <h3 className="font-semibold text-gray-900">Your Selection</h3>
            </div>

            {state.selectedServices.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-8">
                Select services to start your booking
              </p>
            ) : (
              <>
                <div className="space-y-3 mb-4">
                  {state.selectedServices.map((service) => (
                    <div
                      key={service.id}
                      className="flex items-center justify-between gap-2 text-sm"
                    >
                      <span className="text-gray-700">{service.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">${service.price}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-gray-400 hover:text-red-500"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeService(service.id);
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Total Duration</span>
                    <span className="font-medium">{totalDuration} minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-900">Total</span>
                    <span className="font-bold text-lg" style={{ color: colors.primary }}>
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
                <Button
                  onClick={() => setStep(2)}
                  className="w-full mt-4 gap-2"
                  style={{ backgroundColor: colors.primary, color: '#ffffff' }}
                >
                  Continue to Date & Time
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
