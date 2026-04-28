'use client';

import { useState, useEffect } from 'react';
import { useBooking } from '@/hooks/use-booking';
import { User, Mail, Phone, MessageSquare, ArrowRight, ArrowLeft, Check, Clock, Shield } from 'lucide-react';
import { format } from 'date-fns';

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

export function ClientInfoForm() {
  const { state, updateClientInfo, setStep, totalPrice, totalDuration } = useBooking();
  const [errors, setErrors] = useState<Record<string, string>>({});
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

  const primaryColor = businessTypeColors[studioBusinessType] || businessTypeColors.default;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!state.clientInfo.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!state.clientInfo.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!state.clientInfo.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.clientInfo.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!state.clientInfo.phone.trim()) newErrors.phone = 'Phone is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validate()) {
      setStep(4);
    }
  };

  const inputClass = (field: string) =>
    `w-full pl-12 pr-4 py-3.5 rounded-xl border-2 text-gray-900 placeholder-gray-300 transition-all focus:outline-none text-sm font-medium ${
      errors[field]
        ? 'border-red-200 bg-red-50/30 focus:border-red-300'
        : 'border-gray-100 bg-gray-50/50 focus:bg-white focus:border-gray-200'
    }`;

  return (
    <div className="grid lg:grid-cols-12 gap-8">
      {/* Form */}
      <div className="lg:col-span-8">
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100">
          <h2 className="text-xl font-black text-gray-900 mb-1 tracking-tight">Your Details</h2>
          <p className="text-gray-400 text-sm mb-8">We need a few details to confirm your appointment</p>

          <div className="space-y-5">
            {/* Name row */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                  <input
                    type="text"
                    value={state.clientInfo.firstName}
                    onChange={(e) => updateClientInfo({ firstName: e.target.value })}
                    placeholder="John"
                    className={inputClass('firstName')}
                  />
                </div>
                {errors.firstName && <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.firstName}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                  <input
                    type="text"
                    value={state.clientInfo.lastName}
                    onChange={(e) => updateClientInfo({ lastName: e.target.value })}
                    placeholder="Doe"
                    className={inputClass('lastName')}
                  />
                </div>
                {errors.lastName && <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.lastName}</p>}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                <input
                  type="email"
                  value={state.clientInfo.email}
                  onChange={(e) => updateClientInfo({ email: e.target.value })}
                  placeholder="john@example.com"
                  className={inputClass('email')}
                />
              </div>
              {errors.email && <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                <input
                  type="tel"
                  value={state.clientInfo.phone}
                  onChange={(e) => updateClientInfo({ phone: e.target.value })}
                  placeholder="(555) 123-4567"
                  className={inputClass('phone')}
                />
              </div>
              {errors.phone && <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.phone}</p>}
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Special Requests <span className="text-gray-300 font-normal">(optional)</span>
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-300" />
                <textarea
                  value={state.clientInfo.notes}
                  onChange={(e) => updateClientInfo({ notes: e.target.value })}
                  placeholder="Any allergies, preferences, or requests..."
                  rows={3}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-100 bg-gray-50/50 text-gray-900 placeholder-gray-300 transition-all focus:outline-none focus:bg-white focus:border-gray-200 text-sm font-medium resize-none"
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-8 pt-6 border-t border-gray-50">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-3.5 rounded-xl font-semibold text-gray-500 bg-gray-50 hover:bg-gray-100 transition-colors text-sm flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <button
              onClick={handleContinue}
              className="flex-1 py-3.5 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.98]"
              style={{
                backgroundColor: primaryColor,
                boxShadow: `0 4px 14px ${primaryColor}35`,
              }}
            >
              Review Booking
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Summary sidebar */}
      <div className="lg:col-span-4">
        <div className="sticky top-6 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 text-base mb-6 pb-5 border-b border-gray-50">Booking Summary</h3>

          {/* Services */}
          <div className="space-y-3 mb-6">
            {state.selectedServices.map((service) => (
              <div key={service.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50/80">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${primaryColor}10`, color: primaryColor }}
                  >
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{service.name}</p>
                    <p className="text-xs text-gray-400">{service.duration} min</p>
                  </div>
                </div>
                <span className="font-bold text-gray-900 text-sm">${service.price}</span>
              </div>
            ))}
          </div>

          {/* Date & Time */}
          {state.selectedDate && state.selectedTime && (
            <div className="p-4 rounded-xl mb-6" style={{ backgroundColor: `${primaryColor}05` }}>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Date & Time</p>
              <p className="font-bold text-gray-900 text-sm">
                {format(state.selectedDate, 'EEEE, MMM d')} at {state.selectedTime}
              </p>
            </div>
          )}

          {/* Totals */}
          <div className="pt-6 border-t border-gray-50 space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Duration
              </span>
              <span className="font-semibold text-gray-700">{totalDuration} min</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-900 text-base">Total</span>
              <span className="text-2xl font-black tracking-tight" style={{ color: primaryColor }}>
                ${totalPrice.toFixed(0)}
              </span>
            </div>
          </div>

          {/* Trust */}
          <div className="mt-6 pt-6 border-t border-gray-50 flex items-start gap-2">
            <Shield className="w-4 h-4 text-gray-300 shrink-0 mt-0.5" />
            <p className="text-xs text-gray-300 leading-relaxed">
              Your information is secure. We never share your data with third parties.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
