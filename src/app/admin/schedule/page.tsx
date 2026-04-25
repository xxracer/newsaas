'use client';

import { useState, useEffect, useMemo } from 'react';
import { useMockAuth } from '@/components/providers/MockAuthProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight, Plus, Clock, User, Scissors, X } from 'lucide-react';

interface Appointment {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  service: string;
  date: string; // ISO date string YYYY-MM-DD
  time: string; // HH:MM 24h
  duration: number; // minutes
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED' | 'NO_SHOW';
  notes?: string;
  staffMember?: string;
  price: number;
  color?: string;
}

interface StaffMember {
  id: string;
  name: string;
  role: string;
  color: string;
}

const DEFAULT_STAFF: StaffMember[] = [
  { id: '1', name: 'Sofía', role: 'Esthetician', color: '#EC4899' },
  { id: '2', name: 'Valentina', role: 'Esthetician', color: '#8B5CF6' },
  { id: '3', name: 'Camila', role: 'Esthetician', color: '#10B981' },
  { id: '4', name: 'Mariana', role: 'Nail Tech', color: '#F59E0B' },
];

const DEFAULT_SERVICES = [
  { id: 'brazilian', name: 'Brazilian Wax', duration: 30, price: 50 },
  { id: 'brow', name: 'Brow Design', duration: 15, price: 25 },
  { id: 'full-leg', name: 'Full Leg Wax', duration: 45, price: 80 },
  { id: 'underarm', name: 'Underarm Wax', duration: 20, price: 30 },
  { id: 'full-body', name: 'Full Body', duration: 120, price: 200 },
  { id: 'lip-chin', name: 'Lip/Chin Wax', duration: 10, price: 15 },
  { id: 'manicure', name: 'Manicure', duration: 45, price: 35 },
  { id: 'pedicure', name: 'Pedicure', duration: 60, price: 45 },
  { id: 'facial', name: 'Facial', duration: 60, price: 90 },
  { id: 'massage', name: 'Massage', duration: 60, price: 85 },
];

const HOURS = Array.from({ length: 13 }, (_, i) => i + 8); // 8am to 8pm

const DAY_LABELS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const DAY_LABELS_FULL = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

function formatDateKey(d: Date): string {
  return d.toISOString().split('T')[0];
}

function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day;
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

export default function SchedulePage() {
  const { user } = useMockAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [staff, setStaff] = useState<StaffMember[]>(DEFAULT_STAFF);
  const [services, setServices] = useState(DEFAULT_SERVICES);
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(() => getWeekStart(new Date()));
  const [selectedStaffFilter, setSelectedStaffFilter] = useState<string>('all');
  const [selectedDayFilter, setSelectedDayFilter] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<{ date: string; time: string } | null>(null);

  const [formData, setFormData] = useState<Partial<Appointment>>({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    service: '',
    date: formatDateKey(new Date()),
    time: '09:00',
    status: 'PENDING',
    staffMember: '',
    notes: '',
    price: 0,
    duration: 30,
  });

  // Load data
  useEffect(() => {
    if (user?.studioId) {
      const storedApts = localStorage.getItem(`mock_appointments_${user.studioId}`);
      if (storedApts) {
        const parsed = JSON.parse(storedApts);
        setAppointments(parsed.map((a: any) => ({ ...a, date: a.date })));
      }

      const storedStaff = localStorage.getItem(`mock_staff_${user.studioId}`);
      if (storedStaff) {
        setStaff(JSON.parse(storedStaff));
      }

      const storedServices = localStorage.getItem(`mock_services_${user.studioId}`);
      if (storedServices) {
        setServices(JSON.parse(storedServices));
      }
    }
  }, [user?.studioId]);

  const saveAppointments = (updated: Appointment[]) => {
    setAppointments(updated);
    if (user?.studioId) {
      localStorage.setItem(`mock_appointments_${user.studioId}`, JSON.stringify(updated));
    }
  };

  // Week days
  const weekDays = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = addDays(currentWeekStart, i);
      return {
        date: d,
        dateKey: formatDateKey(d),
        dayName: DAY_LABELS[d.getDay()],
        dayFull: DAY_LABELS_FULL[d.getDay()],
        dayNumber: d.getDate(),
        isToday: formatDateKey(d) === formatDateKey(new Date()),
      };
    });
  }, [currentWeekStart]);

  // Filtered appointments for current week
  const weekAppointments = useMemo(() => {
    const weekKeys = weekDays.map((d) => d.dateKey);
    return appointments.filter((apt) => {
      if (!weekKeys.includes(apt.date)) return false;
      if (selectedStaffFilter !== 'all' && apt.staffMember !== selectedStaffFilter) return false;
      if (selectedDayFilter !== null) {
        const aptDay = new Date(apt.date + 'T00:00:00').getDay();
        if (aptDay !== selectedDayFilter) return false;
      }
      return true;
    });
  }, [appointments, weekDays, selectedStaffFilter, selectedDayFilter]);

  const handlePrevWeek = () => setCurrentWeekStart((d) => addDays(d, -7));
  const handleNextWeek = () => setCurrentWeekStart((d) => addDays(d, 7));
  const handleToday = () => setCurrentWeekStart(getWeekStart(new Date()));

  const handleSlotClick = (dateKey: string, hour: number) => {
    setEditingAppointment(null);
    setSelectedSlot({ date: dateKey, time: `${hour.toString().padStart(2, '0')}:00` });
    setFormData({
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      service: '',
      date: dateKey,
      time: `${hour.toString().padStart(2, '0')}:00`,
      status: 'PENDING',
      staffMember: selectedStaffFilter !== 'all' ? selectedStaffFilter : '',
      notes: '',
      price: 0,
      duration: 30,
    });
    setIsDialogOpen(true);
  };

  const handleAppointmentClick = (apt: Appointment) => {
    setEditingAppointment(apt);
    setSelectedSlot(null);
    setFormData({ ...apt });
    setIsDialogOpen(true);
  };

  const handleSaveAppointment = () => {
    const serviceData = services.find((s) => s.name === formData.service);
    const price = serviceData?.price || formData.price || 0;
    const duration = serviceData?.duration || formData.duration || 30;

    if (editingAppointment) {
      const updated = appointments.map((a) =>
        a.id === editingAppointment.id
          ? ({ ...a, ...formData, price, duration } as Appointment)
          : a
      );
      saveAppointments(updated);
    } else {
      const staffColor = staff.find((s) => s.name === formData.staffMember)?.color;
      const newAppointment: Appointment = {
        id: Date.now().toString(),
        clientName: formData.clientName || '',
        clientEmail: formData.clientEmail || '',
        clientPhone: formData.clientPhone || '',
        service: formData.service || '',
        date: formData.date || formatDateKey(new Date()),
        time: formData.time || '09:00',
        duration,
        status: (formData.status as Appointment['status']) || 'PENDING',
        staffMember: formData.staffMember,
        notes: formData.notes,
        price,
        color: staffColor,
      };
      saveAppointments([...appointments, newAppointment]);
    }
    setIsDialogOpen(false);
  };

  const handleDelete = () => {
    if (editingAppointment) {
      saveAppointments(appointments.filter((a) => a.id !== editingAppointment.id));
      setIsDialogOpen(false);
    }
  };

  const getStatusStyle = (status: Appointment['status']) => {
    switch (status) {
      case 'CONFIRMED': return 'bg-green-100 text-green-700 border-green-200';
      case 'PENDING': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'COMPLETED': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'CANCELLED': return 'bg-red-100 text-red-700 border-red-200';
      case 'NO_SHOW': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: Appointment['status']) => {
    const labels: Record<string, string> = {
      PENDING: 'Pendiente',
      CONFIRMED: 'Confirmada',
      COMPLETED: 'Completada',
      CANCELLED: 'Cancelada',
      NO_SHOW: 'No Show',
    };
    return labels[status] || status;
  };

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold">Schedule</h1>
          <p className="text-gray-500">Vista semanal del calendario de citas</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={handleToday}>Hoy</Button>
          <div className="flex items-center border rounded-lg overflow-hidden">
            <Button variant="ghost" size="icon" onClick={handlePrevWeek}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="px-4 text-sm font-medium min-w-[180px] text-center">
              {weekDays[0].dayFull} {weekDays[0].dayNumber} -
              {' '}{weekDays[6].dayFull} {weekDays[6].dayNumber}
            </span>
            <Button variant="ghost" size="icon" onClick={handleNextWeek}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          <Button
            onClick={() => {
              setEditingAppointment(null);
              setSelectedSlot(null);
              setFormData({
                clientName: '',
                clientEmail: '',
                clientPhone: '',
                service: '',
                date: formatDateKey(new Date()),
                time: '09:00',
                status: 'PENDING',
                staffMember: '',
                notes: '',
                price: 0,
                duration: 30,
              });
              setIsDialogOpen(true);
            }}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Nueva Cita
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <Select value={selectedStaffFilter} onValueChange={setSelectedStaffFilter}>
          <SelectTrigger className="w-48">
            <User className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filtrar por staff" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los staff</SelectItem>
            {staff.map((s) => (
              <SelectItem key={s.id} value={s.name}>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
                  {s.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedDayFilter?.toString() ?? 'all'} onValueChange={(v) => setSelectedDayFilter(v === 'all' ? null : parseInt(v))}>
          <SelectTrigger className="w-48">
            <Clock className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filtrar por día" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los días</SelectItem>
            {weekDays.map((d) => (
              <SelectItem key={d.dateKey} value={new Date(d.date + 'T00:00:00').getDay().toString()}>
                {d.dayFull}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Weekly Calendar Grid */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <div className="min-w-[1000px]">
              {/* Header row with days */}
              <div className="grid grid-cols-[80px_repeat(7,1fr)] border-b bg-gray-50">
                <div className="p-3 border-r text-xs font-medium text-gray-500 flex items-end justify-center pb-2">
                  Hora
                </div>
                {weekDays.map((day) => (
                  <div
                    key={day.dateKey}
                    className={`p-3 text-center border-r last:border-r-0 ${
                      day.isToday ? 'bg-blue-50' : ''
                    }`}
                  >
                    <p className="text-xs font-medium text-gray-500 uppercase">{day.dayName}</p>
                    <p className={`text-xl font-bold mt-1 ${day.isToday ? 'text-blue-600' : 'text-gray-900'}`}>
                      {day.dayNumber}
                    </p>
                  </div>
                ))}
              </div>

              {/* Time grid */}
              <div className="relative grid grid-cols-[80px_repeat(7,1fr)]">
                {/* Hour labels */}
                <div className="border-r bg-gray-50">
                  {HOURS.map((hour) => (
                    <div
                      key={hour}
                      className="h-16 border-b last:border-b-0 flex items-start justify-center pt-1"
                    >
                      <span className="text-xs text-gray-500">
                        {hour}:00
                      </span>
                    </div>
                  ))}
                </div>

                {/* Day columns */}
                {weekDays.map((day) => (
                  <div key={day.dateKey} className="relative border-r last:border-r-0">
                    {/* Hour grid lines */}
                    {HOURS.map((hour) => (
                      <div
                        key={hour}
                        className={`h-16 border-b last:border-b-0 relative cursor-pointer hover:bg-gray-50 transition-colors ${
                          day.isToday ? 'bg-blue-50/30' : ''
                        }`}
                        onClick={() => handleSlotClick(day.dateKey, hour)}
                      >
                        {/* Half-hour line */}
                        <div className="absolute top-1/2 left-0 right-0 border-t border-dashed border-gray-100" />
                      </div>
                    ))}

                    {/* Appointment blocks */}
                    {weekAppointments
                      .filter((apt) => apt.date === day.dateKey)
                      .map((apt) => {
                        const startMinutes = timeToMinutes(apt.time);
                        const dayStart = 8 * 60; // 8am
                        const dayEnd = 20 * 60; // 8pm
                        if (startMinutes < dayStart || startMinutes >= dayEnd) return null;

                        const topOffset = ((startMinutes - dayStart) / 60) * 64; // 64px per hour
                        const height = (apt.duration / 60) * 64;
                        const staffColor = apt.color || staff.find((s) => s.name === apt.staffMember)?.color || '#EC4899';

                        return (
                          <div
                            key={apt.id}
                            className="absolute left-1 right-1 rounded-md border shadow-sm cursor-pointer overflow-hidden transition-all hover:shadow-md hover:z-10"
                            style={{
                              top: `${topOffset}px`,
                              height: `${Math.max(height - 2, 24)}px`,
                              backgroundColor: staffColor + '20',
                              borderColor: staffColor + '40',
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAppointmentClick(apt);
                            }}
                          >
                            <div className="px-2 py-1 text-xs truncate font-medium" style={{ color: staffColor }}>
                              {apt.time} — {apt.clientName}
                            </div>
                            <div className="px-2 text-[10px] truncate text-gray-600">
                              {apt.service}
                            </div>
                            {height > 40 && (
                              <div className="px-2 text-[10px] truncate text-gray-500">
                                {apt.staffMember}
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center gap-4">
        <p className="text-sm text-gray-500 font-medium">Staff:</p>
        {staff.map((s) => (
          <div key={s.id} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
            <span className="text-sm text-gray-600">{s.name}</span>
          </div>
        ))}
      </div>

      {/* Appointment Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingAppointment ? 'Editar Cita' : 'Nueva Cita'}
            </DialogTitle>
            <DialogDescription>
              {selectedSlot
                ? `Cita para ${selectedSlot.date} a las ${selectedSlot.time}`
                : editingAppointment
                ? 'Actualiza los detalles de la cita'
                : 'Completa la información para agendar'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Nombre del Cliente *</Label>
              <Input
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                placeholder="Nombre completo"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={formData.clientEmail}
                  onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                  placeholder="email@ejemplo.com"
                />
              </div>
              <div className="space-y-2">
                <Label>Teléfono</Label>
                <Input
                  value={formData.clientPhone}
                  onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                  placeholder="(305) 555-0000"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Servicio *</Label>
              <Select
                value={formData.service}
                onValueChange={(value) => {
                  const svc = services.find((s) => s.name === value);
                  setFormData({
                    ...formData,
                    service: value,
                    price: svc?.price || 0,
                    duration: svc?.duration || 30,
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un servicio" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((svc) => (
                    <SelectItem key={svc.id} value={svc.name}>
                      {svc.name} — ${svc.price} ({svc.duration} min)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Fecha</Label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Hora</Label>
                <Input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Duración (min)</Label>
                <Input
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 30 })}
                />
              </div>
              <div className="space-y-2">
                <Label>Precio ($)</Label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Staff</Label>
              <Select
                value={formData.staffMember}
                onValueChange={(value) => setFormData({ ...formData, staffMember: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Asignar staff" />
                </SelectTrigger>
                <SelectContent>
                  {staff.map((s) => (
                    <SelectItem key={s.id} value={s.name}>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
                        {s.name} — {s.role}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Estado</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value as Appointment['status'] })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PENDING">Pendiente</SelectItem>
                  <SelectItem value="CONFIRMED">Confirmada</SelectItem>
                  <SelectItem value="COMPLETED">Completada</SelectItem>
                  <SelectItem value="CANCELLED">Cancelada</SelectItem>
                  <SelectItem value="NO_SHOW">No Show</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Notas</Label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Notas adicionales..."
                className="w-full px-3 py-2 border rounded-md min-h-[80px]"
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            {editingAppointment && (
              <Button variant="destructive" onClick={handleDelete} className="mr-auto">
                Eliminar
              </Button>
            )}
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleSaveAppointment}
              disabled={!formData.clientName || !formData.service || !formData.time}
            >
              {editingAppointment ? 'Guardar Cambios' : 'Crear Cita'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
