'use client';

import { useBooking } from '@/hooks/use-booking';
import { useTheme } from '@/components/providers/ThemeProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, User } from 'lucide-react';
import { format } from 'date-fns';

export function ClientInfoForm() {
  const { state, updateClientInfo, setStep, totalPrice, totalDuration } = useBooking();
  const { colors } = useTheme();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateClientInfo({ [name]: value });
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Form */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" style={{ color: colors.primary }} />
              <CardTitle>Contact Information</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={state.clientInfo.firstName}
                    onChange={handleChange}
                    placeholder="Jane"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={state.clientInfo.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={state.clientInfo.email}
                  onChange={handleChange}
                  placeholder="jane@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={state.clientInfo.phone}
                  onChange={handleChange}
                  placeholder="(123) 456-7890"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Special Requests (optional)</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={state.clientInfo.notes}
                  onChange={handleChange}
                  placeholder="Any special requests or information we should know..."
                  rows={3}
                />
              </div>
            </form>

            <div className="flex justify-between mt-6 pt-6 border-t">
              <Button variant="outline" onClick={() => setStep(1)}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Services
              </Button>
              <Button
                onClick={() => setStep(3)}
                disabled={!state.clientInfo.firstName || !state.clientInfo.email || !state.clientInfo.phone}
                className="hover:opacity-90"
                style={{ backgroundColor: colors.primary, color: '#ffffff' }}
              >
                Review Booking
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary */}
      <div className="lg:col-span-1">
        <Card className="sticky top-4">
          <CardHeader>
            <CardTitle className="text-lg">Booking Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">Selected Services</h4>
              {state.selectedServices.map((service) => (
                <div key={service.id} className="flex justify-between text-sm mb-1">
                  <span>{service.name}</span>
                  <span>${service.price}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500">Duration</span>
                <span>{totalDuration} min</span>
              </div>
              {state.selectedDate && (
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Date</span>
                  <span>{format(state.selectedDate, 'MMM d, yyyy')}</span>
                </div>
              )}
              {state.selectedTime && (
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Time</span>
                  <span>{state.selectedTime}</span>
                </div>
              )}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span style={{ color: colors.primary }}>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
