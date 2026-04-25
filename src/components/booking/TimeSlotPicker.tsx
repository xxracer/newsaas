'use client';

import { useState, useEffect } from 'react';
import { useBooking } from '@/hooks/use-booking';
import { useTheme } from '@/components/providers/ThemeProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, isBefore, startOfDay } from 'date-fns';

interface TimeSlot {
  time: string;
  available: boolean;
}

export function TimeSlotPicker() {
  const { state, setSelectedDate, setSelectedTime, setStep, totalDuration } = useBooking();
  const { colors } = useTheme();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const today = startOfDay(new Date());

  useEffect(() => {
    if (state.selectedDate) {
      fetchAvailability();
    }
  }, [state.selectedDate]);

  const fetchAvailability = async () => {
    if (!state.selectedDate) return;

    setIsLoading(true);
    try {
      const dateStr = format(state.selectedDate, 'yyyy-MM-dd');
      const res = await fetch(`/api/appointments/availability?date=${dateStr}&duration=${totalDuration}`);

      if (res.ok) {
        const data = await res.json();
        setTimeSlots(data.slots || []);
      } else {
        // Generate mock slots for development
        const slots: TimeSlot[] = [];
        for (let hour = 9; hour < 18; hour++) {
          for (let min = 0; min < 60; min += 30) {
            const time = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
            slots.push({
              time,
              available: Math.random() > 0.3, // Mock availability
            });
          }
        }
        setTimeSlots(slots);
      }
    } catch (error) {
      console.error('Failed to fetch availability:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const previousMonth = () => {
    setCurrentMonth(addMonths(currentMonth, -1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const isDateDisabled = (date: Date) => {
    return isBefore(date, today);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Calendar */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={previousMonth}
              disabled={isSameMonth(currentMonth, new Date())}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <CardTitle className="text-lg">
              {format(currentMonth, 'MMMM yyyy')}
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Empty cells for days before the start of month */}
            {Array.from({ length: startOfMonth(currentMonth).getDay() }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {days.map((day) => {
              const disabled = isDateDisabled(day);
              const selected = state.selectedDate && isSameDay(day, state.selectedDate);

              return (
                <Button
                  key={day.toISOString()}
                  variant="ghost"
                  size="sm"
                  disabled={disabled}
                  onClick={() => setSelectedDate(day)}
                  className={`h-10 w-10 p-0 font-normal ${
                    selected
                      ? 'text-white hover:opacity-90'
                      : isToday(day)
                      ? 'border'
                      : ''
                  }`}
                  style={selected
                    ? { backgroundColor: colors.primary }
                    : isToday(day)
                    ? { borderColor: colors.primary, color: colors.primary }
                    : {}}
                >
                  {format(day, 'd')}
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Time Slots */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" style={{ color: colors.primary }} />
            <CardTitle className="text-lg">
              {state.selectedDate
                ? format(state.selectedDate, 'EEEE, MMMM d')
                : 'Select a date'}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {!state.selectedDate ? (
            <p className="text-sm text-gray-500 text-center py-8">
              Please select a date to see available times
            </p>
          ) : isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin" style={{ color: colors.primary }} />
            </div>
          ) : timeSlots.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-8">
              No available times for this date
            </p>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((slot) => (
                <Button
                  key={slot.time}
                  variant={state.selectedTime === slot.time ? 'default' : 'outline'}
                  disabled={!slot.available}
                  onClick={() => setSelectedTime(slot.time)}
                  style={state.selectedTime === slot.time ? { backgroundColor: colors.primary, color: '#ffffff' } : {}}
                >
                  {slot.time}
                </Button>
              ))}
            </div>
          )}

          {state.selectedTime && (
            <div className="mt-6 pt-6 border-t">
              <p className="text-sm text-gray-600 mb-4">
                Selected: <span className="font-medium">{state.selectedTime}</span>
              </p>
              <Button
                onClick={() => setStep(3)}
                className="w-full hover:opacity-90"
                style={{ backgroundColor: colors.primary, color: '#ffffff' }}
              >
                Continue to Contact Info
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
