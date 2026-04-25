'use client';

import { useBooking, BookingProvider } from '@/hooks/use-booking';
import { useTheme } from '@/components/providers/ThemeProvider';
import { Card, CardContent } from '@/components/ui/card';
import { ServiceSelector } from '@/components/booking/ServiceSelector';
import { TimeSlotPicker } from '@/components/booking/TimeSlotPicker';
import { ClientInfoForm } from '@/components/booking/ClientInfoForm';
import { BookingSummary } from '@/components/booking/BookingSummary';
import { Check } from 'lucide-react';

const steps = [
  { number: 1, title: 'Select Services', description: 'Choose your waxing services' },
  { number: 2, title: 'Pick Date & Time', description: 'Schedule your appointment' },
  { number: 3, title: 'Your Information', description: 'Contact details' },
  { number: 4, title: 'Confirm', description: 'Review and pay' },
];

function BookingWizard() {
  const { state } = useBooking();
  const { colors } = useTheme();

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
    <div className="space-y-8">
      {/* Progress Steps */}
      <div className="flex justify-center">
        <div className="flex items-center gap-2 md:gap-4">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                    state.step > step.number
                      ? 'text-white'
                      : state.step === step.number
                      ? 'border-2'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                  style={
                    state.step > step.number
                      ? { backgroundColor: colors.primary }
                      : state.step === step.number
                      ? { backgroundColor: colors.background, color: colors.primary, borderColor: colors.primary }
                      : {}
                  }
                >
                  {state.step > step.number ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    step.number
                  )}
                </div>
                <span
                  className={`text-xs mt-2 hidden md:block ${
                    state.step >= step.number ? 'text-gray-900' : 'text-gray-400'
                  }`}
                >
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-8 md:w-16 h-0.5 mx-2 ${
                    state.step > step.number ? '' : 'bg-gray-200'
                  }`}
                  style={state.step > step.number ? { backgroundColor: colors.primary } : {}}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <Card>
        <CardContent className="p-6 md:p-8">
          {renderStep()}
        </CardContent>
      </Card>
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
  return (
    <div className="min-h-screen py-12" style={{ background: `linear-gradient(to bottom, ${colors.background}, ${colors.surface})` }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Book Your Appointment
          </h1>
          <p className="text-gray-500">
            Schedule your waxing service in just a few steps
          </p>
        </div>

        <BookingWizard />
      </div>
    </div>
  );
}
