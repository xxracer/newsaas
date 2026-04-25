'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export interface SelectedService {
  id: string;
  name: string;
  price: number;
  duration: number;
}

export interface BookingState {
  step: number;
  selectedServices: SelectedService[];
  selectedDate: Date | null;
  selectedTime: string | null;
  clientInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    notes: string;
  };
}

interface BookingContextType {
  state: BookingState;
  setStep: (step: number) => void;
  addService: (service: SelectedService) => void;
  removeService: (serviceId: string) => void;
  clearServices: () => void;
  setSelectedDate: (date: Date | null) => void;
  setSelectedTime: (time: string | null) => void;
  updateClientInfo: (info: Partial<BookingState['clientInfo']>) => void;
  resetBooking: () => void;
  totalPrice: number;
  totalDuration: number;
}

const initialState: BookingState = {
  step: 1,
  selectedServices: [],
  selectedDate: null,
  selectedTime: null,
  clientInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    notes: '',
  },
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<BookingState>(initialState);

  const setStep = (step: number) => {
    setState((prev) => ({ ...prev, step }));
  };

  const addService = (service: SelectedService) => {
    setState((prev) => {
      if (prev.selectedServices.find((s) => s.id === service.id)) {
        return prev;
      }
      return {
        ...prev,
        selectedServices: [...prev.selectedServices, service],
      };
    });
  };

  const removeService = (serviceId: string) => {
    setState((prev) => ({
      ...prev,
      selectedServices: prev.selectedServices.filter((s) => s.id !== serviceId),
    }));
  };

  const clearServices = () => {
    setState((prev) => ({ ...prev, selectedServices: [] }));
  };

  const setSelectedDate = (date: Date | null) => {
    setState((prev) => ({ ...prev, selectedDate: date, selectedTime: null }));
  };

  const setSelectedTime = (time: string | null) => {
    setState((prev) => ({ ...prev, selectedTime: time }));
  };

  const updateClientInfo = (info: Partial<BookingState['clientInfo']>) => {
    setState((prev) => ({
      ...prev,
      clientInfo: { ...prev.clientInfo, ...info },
    }));
  };

  const resetBooking = () => {
    setState(initialState);
  };

  const totalPrice = state.selectedServices.reduce((sum, s) => sum + s.price, 0);
  const totalDuration = state.selectedServices.reduce((sum, s) => sum + s.duration, 0);

  return (
    <BookingContext.Provider
      value={{
        state,
        setStep,
        addService,
        removeService,
        clearServices,
        setSelectedDate,
        setSelectedTime,
        updateClientInfo,
        resetBooking,
        totalPrice,
        totalDuration,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
