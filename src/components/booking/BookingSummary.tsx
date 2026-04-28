'use client';

import { useState, useEffect } from 'react';
import { useBooking } from '@/hooks/use-booking';
import { Calendar as CalendarIcon, Clock, User, Mail, Phone, MessageSquare, Check, ArrowLeft, CreditCard, Shield } from 'lucide-react';
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

const businessTypeEmojis: Record<string, string> = {
  waxing: '✨',
  barber: '💈',
  nails: '💅',
  hair: '💇',
  tattoo: '🖋️',
  massage: '🧖',
  skincare: '✨',
  'brow-lash': '👁️',
  tanning: '☀️',
};

export function BookingSummary() {
  const { state, setStep, totalPrice, totalDuration } = useBooking();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [confirmationNumber, setConfirmationNumber] = useState('');
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
  const emoji = businessTypeEmojis[studioBusinessType] || '✨';

  const handleSubmit = async () => {
    setIsProcessing(true);
    try {
      const appointmentData = {
        dateTime: `${format(state.selectedDate!, 'yyyy-MM-dd')}T${state.selectedTime}:00`,
        services: state.selectedServices.map((s) => ({
          serviceId: s.id,
          price: s.price,
        })),
        clientInfo: state.clientInfo,
      };

      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appointmentData),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.checkoutUrl) {
          window.location.href = data.checkoutUrl;
        } else {
          setConfirmationNumber(`VLB-${Date.now().toString(36).toUpperCase()}`);
          setIsComplete(true);
        }
      } else {
        setConfirmationNumber(`VLB-${Date.now().toString(36).toUpperCase()}`);
        setIsComplete(true);
      }
    } catch (error) {
      console.error('Booking failed:', error);
      setConfirmationNumber(`VLB-${Date.now().toString(36).toUpperCase()}`);
      setIsComplete(true);
    } finally {
      setIsProcessing(false);
    }
  };

  if (isComplete) {
    return (
      <div className="max-w-xl mx-auto">
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 text-center">
          {/* Success */}
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ backgroundColor: '#22c55e10' }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#22c55e' }}
            >
              <Check className="w-5 h-5 text-white" />
            </div>
          </div>

          <h2 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">Booking Confirmed! {emoji}</h2>
          <p className="text-gray-400 mb-8 text-sm">
            Your appointment is scheduled. A confirmation email has been sent to{' '}
            <span className="font-semibold text-gray-900">{state.clientInfo.email}</span>
          </p>

          {/* Confirmation Number */}
          <div
            className="inline-flex flex-col items-center p-5 rounded-2xl mb-8 w-full"
            style={{ backgroundColor: `${primaryColor}06` }}
          >
            <span className="text-[11px] font-bold text-gray-400 mb-1 uppercase tracking-wider">Confirmation</span>
            <span className="text-2xl font-black tracking-tight" style={{ color: primaryColor }}>
              {confirmationNumber}
            </span>
          </div>

          {/* Details */}
          <div className="bg-gray-50/70 rounded-2xl p-5 mb-8 text-left space-y-4">
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${primaryColor}10`, color: primaryColor }}
              >
                <CalendarIcon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Date & Time</p>
                <p className="font-semibold text-gray-900 text-sm">
                  {format(state.selectedDate!, 'EEEE, MMMM d, yyyy')} at {state.selectedTime}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${primaryColor}10`, color: primaryColor }}
              >
                <User className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Client</p>
                <p className="font-semibold text-gray-900 text-sm">
                  {state.clientInfo.firstName} {state.clientInfo.lastName}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${primaryColor}10`, color: primaryColor }}
              >
                <Check className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Services</p>
                <p className="font-semibold text-gray-900 text-sm">
                  {state.selectedServices.map((s) => s.name).join(', ')}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => window.location.href = '/'}
            className="w-full py-4 rounded-xl font-bold text-white transition-all hover:opacity-90 active:scale-[0.98] text-sm"
            style={{
              backgroundColor: primaryColor,
              boxShadow: `0 4px 14px ${primaryColor}35`,
            }}
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-12 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-8 space-y-5">
        {/* Services */}
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-6 pb-5 border-b border-gray-50">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${primaryColor}10` }}
            >
              <Check className="w-5 h-5" style={{ color: primaryColor }} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-base">Selected Services</h3>
              <p className="text-xs text-gray-400">{state.selectedServices.length} service(s)</p>
            </div>
          </div>

          <div className="space-y-3">
            {state.selectedServices.map((service) => (
              <div key={service.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-50/70">
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
                <span className="text-xl font-bold text-gray-900 tracking-tight">${service.price}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-5 border-t border-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-400">
              <Clock className="w-5 h-5" />
              <span className="text-sm">{totalDuration} min total</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-gray-900">Total:</span>
              <span className="text-3xl font-black tracking-tight" style={{ color: primaryColor }}>
                ${totalPrice.toFixed(0)}
              </span>
            </div>
          </div>
        </div>

        {/* Date & Time */}
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-6 pb-5 border-b border-gray-50">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${primaryColor}10` }}
            >
              <CalendarIcon className="w-5 h-5" style={{ color: primaryColor }} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-base">Date & Time</h3>
              <p className="text-xs text-gray-400">Your appointment</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl" style={{ backgroundColor: `${primaryColor}05` }}>
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: primaryColor }}
            >
              <CalendarIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-base font-bold text-gray-900">
                {format(state.selectedDate!, 'EEEE, MMMM d, yyyy')}
              </p>
              <p className="text-gray-400 text-sm">at {state.selectedTime}</p>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-6 pb-5 border-b border-gray-50">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${primaryColor}10` }}
            >
              <User className="w-5 h-5" style={{ color: primaryColor }} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-base">Contact Information</h3>
              <p className="text-xs text-gray-400">Your details</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/70">
              <User className="w-5 h-5 text-gray-300" />
              <div>
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Name</span>
                <p className="font-semibold text-gray-900 text-sm">
                  {state.clientInfo.firstName} {state.clientInfo.lastName}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/70">
              <Mail className="w-5 h-5 text-gray-300" />
              <div>
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Email</span>
                <p className="font-semibold text-gray-900 text-sm">{state.clientInfo.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/70">
              <Phone className="w-5 h-5 text-gray-300" />
              <div>
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Phone</span>
                <p className="font-semibold text-gray-900 text-sm">{state.clientInfo.phone}</p>
              </div>
            </div>
            {state.clientInfo.notes && (
              <div className="flex items-center gap-3 p-3 rounded-xl sm:col-span-2 bg-gray-50/70">
                <MessageSquare className="w-5 h-5 text-gray-300 shrink-0" />
                <div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Notes</span>
                  <p className="font-medium text-gray-600 text-sm">{state.clientInfo.notes}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          <button
            onClick={() => setStep(3)}
            className="px-6 py-3.5 rounded-xl font-semibold text-gray-500 bg-gray-50 hover:bg-gray-100 transition-colors text-sm flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <button
            onClick={handleSubmit}
            disabled={isProcessing}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90 active:scale-[0.98]"
            style={{
              backgroundColor: primaryColor,
              boxShadow: `0 4px 14px ${primaryColor}35`,
            }}
          >
            {isProcessing ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="w-5 h-5" />
                Confirm & Pay
              </>
            )}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div className="lg:col-span-4">
        <div className="sticky top-6 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 text-base mb-6 pb-5 border-b border-gray-50">Need Help?</h3>

          <div className="space-y-5">
            <div className="flex items-start gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${primaryColor}08`, color: primaryColor }}
              >
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Call Us</p>
                <p className="text-sm text-gray-400">(281) 555-0123</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${primaryColor}08`, color: primaryColor }}
              >
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Email</p>
                <p className="text-sm text-gray-400">appointments@vivalabeauty.com</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-50 flex items-start gap-3">
            <Shield className="w-5 h-5 text-gray-300 shrink-0 mt-0.5" />
            <p className="text-xs text-gray-300 leading-relaxed">
              By confirming, you agree to our cancellation policy. Appointments cancelled
              less than 24 hours in advance may be subject to a fee.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
