'use client';

import { useBooking, BookingProvider } from '@/hooks/use-booking';
import { useTheme } from '@/components/providers/ThemeProvider';
import { ServiceSelector } from '@/components/booking/ServiceSelector';
import { TimeSlotPicker } from '@/components/booking/TimeSlotPicker';
import { ClientInfoForm } from '@/components/booking/ClientInfoForm';
import { BookingSummary } from '@/components/booking/BookingSummary';
import { Check, Calendar, Clock, User, CreditCard } from 'lucide-react';
import { useState, useEffect } from 'react';

const steps = [
  { number: 1, label: 'Services', icon: Calendar },
  { number: 2, label: 'Date & Time', icon: Clock },
  { number: 3, label: 'Your Info', icon: User },
  { number: 4, label: 'Confirm', icon: CreditCard },
];

function BookingStepper() {
  const { state } = useBooking();
  const { colors } = useTheme();
  const [studioBusinessType, setStudioBusinessType] = useState('waxing');

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

  const primaryColor = businessTypeColors[studioBusinessType] || businessTypeColors.default;

  return (
    <div className="mb-10">
      <div className="flex items-center justify-center">
        <div className="flex items-center w-full max-w-xl">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isCompleted = state.step > s.number;
            const isCurrent = state.step === s.number;
            const isUpcoming = state.step < s.number;

            return (
              <div key={s.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  {/* Step circle */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
                      isCompleted
                        ? 'border-transparent text-white'
                        : isCurrent
                        ? 'bg-white text-gray-900'
                        : 'bg-white text-gray-300 border-gray-200'
                    }`}
                    style={{
                      backgroundColor: isCompleted ? primaryColor : isCurrent ? '#fff' : '#fff',
                      borderColor: isCompleted ? primaryColor : isCurrent ? primaryColor : '#e5e7eb',
                      boxShadow: isCurrent ? `0 0 0 4px ${primaryColor}15` : 'none',
                    }}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <Icon className="w-4 h-4" />
                    )}
                  </div>
                  {/* Label */}
                  <span
                    className={`text-[11px] font-semibold mt-2 uppercase tracking-wide transition-colors ${
                      isCurrent ? 'text-gray-900' : isCompleted ? 'text-gray-500' : 'text-gray-300'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>

                {/* Connector line */}
                {idx < steps.length - 1 && (
                  <div className="flex-1 h-[2px] mx-3 mb-5 rounded-full transition-colors duration-500"
                    style={{
                      backgroundColor: isCompleted ? primaryColor : '#f3f4f6',
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function BookingWizard() {
  const { state } = useBooking();

  const renderStep = () => {
    switch (state.step) {
      case 1:
        return <ServiceSelector />;
      case 2:
        return <TimeSlotPicker />;
      case 3:
        return <ClientInfoForm />;
      case 4:
        return <BookingSummary />;
      default:
        return <ServiceSelector />;
    }
  };

  return (
    <div>
      <BookingStepper />
      {renderStep()}
    </div>
  );
}

export default function BookPage() {
  return (
    <BookingProvider>
      <BookPageContent />
    </BookingProvider>
  );
}

function BookPageContent() {
  const { colors } = useTheme();
  const [studioBusinessType, setStudioBusinessType] = useState('waxing');
  const [studioName, setStudioName] = useState('Viva La Beauty');

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
            if (studio.businessName) {
              setStudioName(studio.businessName);
            }
          }
        }
      } catch (e) {
        console.error('Error reading studio data:', e);
      }
    }
  }, []);

  const businessTypeLabels: Record<string, string> = {
    waxing: 'Waxing Studio',
    barber: 'Barber Shop',
    nails: 'Nail Salon',
    hair: 'Hair Salon',
    tattoo: 'Tattoo Studio',
    massage: 'Massage Spa',
    skincare: 'Skin Care Studio',
    'brow-lash': 'Brow & Lash Bar',
    tanning: 'Tanning Salon',
  };

  const businessTypeEmojis: Record<string, string> = {
    waxing: 'Waxing',
    barber: 'Barber Shop',
    nails: 'Nail Salon',
    hair: 'Hair Salon',
    tattoo: 'Tattoo Studio',
    massage: 'Massage Spa',
    skincare: 'Skin Care Studio',
    'brow-lash': 'Brow & Lash',
    tanning: 'Tanning Salon',
  };

  return (
    <div
      className="min-h-screen py-8 md:py-14 px-4"
      style={{ backgroundColor: '#f8fafc' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200 text-sm font-medium text-gray-500 mb-4 shadow-sm">
            <span>{businessTypeEmojis[studioBusinessType] || 'Beauty Studio'}</span>
            <span className="text-gray-300">|</span>
            <span>{studioName}</span>
          </div>
          <h1 className="text-3xl md:text-[2.5rem] font-black text-gray-900 mb-3 tracking-tight">
            Book Your Appointment
          </h1>
          <p className="text-gray-400 text-base max-w-lg mx-auto leading-relaxed">
            Select your services and schedule your visit in just a few steps
          </p>
        </div>

        {/* Wizard Container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-5 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/80">
          <BookingWizard />
        </div>

        {/* Footer trust indicators */}
        <div className="flex flex-wrap justify-center gap-8 mt-10 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            Instant Confirmation
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            Free Cancellation
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            Secure Booking
          </div>
        </div>
      </div>
    </div>
  );
}
