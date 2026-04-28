'use client';

import { useState, useEffect } from 'react';
import { useBooking } from '@/hooks/use-booking';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, Check, ArrowRight } from 'lucide-react';
import { format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, isBefore, startOfDay } from 'date-fns';

interface TimeSlot {
  time: string;
  available: boolean;
}

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

export function TimeSlotPicker() {
  const { state, setSelectedDate, setSelectedTime, setStep, totalDuration } = useBooking();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
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
        generateFallbackSlots();
      }
    } catch (error) {
      generateFallbackSlots();
    } finally {
      setIsLoading(false);
    }
  };

  const generateFallbackSlots = () => {
    const slots: TimeSlot[] = [];
    for (let hour = 9; hour < 18; hour++) {
      for (let min = 0; min < 60; min += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
        slots.push({ time, available: Math.random() > 0.3 });
      }
    }
    setTimeSlots(slots);
  };

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const previousMonth = () => setCurrentMonth(addMonths(currentMonth, -1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const isDateDisabled = (date: Date) => isBefore(date, today);

  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div className="grid lg:grid-cols-12 gap-8">
      {/* Calendar */}
      <div className="lg:col-span-7 bg-white rounded-2xl p-6 md:p-8 border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={previousMonth}
            disabled={isSameMonth(currentMonth, new Date())}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
              isSameMonth(currentMonth, new Date())
                ? 'text-gray-200 cursor-not-allowed'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h3 className="text-base font-bold text-gray-900 tracking-tight">
            {format(currentMonth, 'MMMM yyyy')}
          </h3>
          <button
            onClick={nextMonth}
            className="w-10 h-10 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 flex items-center justify-center transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 mb-3">
          {weekDays.map((day) => (
            <div key={day} className="text-center text-[11px] font-bold text-gray-300 uppercase tracking-wider py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1.5">
          {Array.from({ length: startOfMonth(currentMonth).getDay() }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}

          {days.map((day) => {
            const disabled = isDateDisabled(day);
            const selected = state.selectedDate && isSameDay(day, state.selectedDate);
            const isTodayDate = isToday(day);

            return (
              <button
                key={day.toISOString()}
                disabled={disabled}
                onClick={() => setSelectedDate(day)}
                className={`
                  aspect-square w-full rounded-xl font-semibold text-sm transition-all duration-200
                  ${disabled ? 'text-gray-200 cursor-not-allowed' : 'hover:bg-gray-50'}
                  ${selected ? 'text-white shadow-md scale-105' : ''}
                  ${isTodayDate && !selected ? 'ring-1' : ''}
                `}
                style={
                  selected
                    ? { backgroundColor: primaryColor, boxShadow: `0 4px 14px ${primaryColor}35` }
                    : isTodayDate
                    ? { boxShadow: `inset 0 0 0 2px ${primaryColor}`, color: primaryColor }
                    : { color: '#374151' }
                }
              >
                {format(day, 'd')}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Slots */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${primaryColor}10` }}
            >
              <CalendarIcon className="w-5 h-5" style={{ color: primaryColor }} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-base">
                {state.selectedDate
                  ? format(state.selectedDate, 'EEEE, MMMM d')
                  : 'Select a Date'}
              </h3>
              <p className="text-sm text-gray-400">Choose your preferred time</p>
            </div>
          </div>

          {/* Time Slots Grid */}
          {!state.selectedDate ? (
            <div className="text-center py-14">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 bg-gray-50"
              >
                <Clock className="w-7 h-7 text-gray-300" />
              </div>
              <p className="text-gray-400 font-medium text-sm">Select a date to see available times</p>
            </div>
          ) : isLoading ? (
            <div className="flex flex-col items-center justify-center py-14 gap-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center animate-pulse"
                style={{ backgroundColor: `${primaryColor}12` }}
              >
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: primaryColor, opacity: 0.3 }} />
              </div>
              <p className="text-gray-400 text-sm">Checking availability...</p>
            </div>
          ) : timeSlots.length === 0 ? (
            <div className="text-center py-14">
              <p className="text-gray-400 text-sm">No available times for this date</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((slot) => {
                const isSelected = state.selectedTime === slot.time;
                return (
                  <button
                    key={slot.time}
                    disabled={!slot.available}
                    onClick={() => setSelectedTime(slot.time)}
                    className={`
                      py-2.5 px-1 rounded-xl font-semibold text-sm transition-all duration-200 border
                      ${!slot.available ? 'bg-gray-50 text-gray-300 cursor-not-allowed border-transparent' : 'border-gray-100'}
                      ${isSelected ? 'text-white shadow-lg scale-105 border-transparent' : 'bg-white text-gray-700 hover:border-gray-200 hover:shadow-sm'}
                    `}
                    style={isSelected ? { backgroundColor: primaryColor, boxShadow: `0 4px 14px ${primaryColor}35` } : {}}
                  >
                    {slot.time}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Selected summary + Continue */}
        {state.selectedTime && (
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <div
              className="flex items-center justify-between p-3 rounded-xl mb-5"
              style={{ backgroundColor: `${primaryColor}06` }}
            >
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5" style={{ color: primaryColor }} />
                <span className="font-medium text-gray-900 text-sm">
                  {state.selectedDate ? format(state.selectedDate, 'MMM d, yyyy') : ''} at {state.selectedTime}
                </span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-400">
                <Clock className="w-3.5 h-3.5" />
                {totalDuration} min
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3 rounded-xl font-semibold text-gray-500 bg-gray-50 hover:bg-gray-100 transition-colors text-sm"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 py-3 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.98]"
                style={{
                  backgroundColor: primaryColor,
                  boxShadow: `0 4px 14px ${primaryColor}35`,
                }}
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
