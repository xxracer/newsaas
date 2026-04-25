'use client';

import { useState, useEffect } from 'react';
import { useMockAuth } from '@/components/providers/MockAuthProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon, Clock, User, Phone, Mail, Scissors, CheckCircle, XCircle, AlertCircle, Search, Plus, MoreVertical, Filter } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface Appointment {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  service: string;
  date: Date;
  time: string;
  duration: number;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED' | 'NO_SHOW';
  notes?: string;
  staffMember?: string;
  price: number;
}

const DEFAULT_SERVICES = [
  { id: 'brazilian', name: 'Brazilian Wax', duration: 30, price: 50 },
  { id: 'brow', name: 'Brow Design', duration: 15, price: 25 },
  { id: 'full-leg', name: 'Full Leg Wax', duration: 45, price: 80 },
  { id: 'underarm', name: 'Underarm Wax', duration: 20, price: 30 },
  { id: 'full-body', name: 'Full Body', duration: 120, price: 200 },
  { id: 'lip-chin', name: 'Lip/Chin Wax', duration: 10, price: 15 },
];

const DEFAULT_STAFF = [
  { id: '1', name: 'Sofía', role: 'Esthetician', color: '#EC4899' },
  { id: '2', name: 'Valentina', role: 'Esthetician', color: '#8B5CF6' },
  { id: '3', name: 'Camila', role: 'Esthetician', color: '#10B981' },
];

const DEFAULT_APPOINTMENTS: Appointment[] = [
  {
    id: '1',
    clientName: 'Maria Garcia',
    clientEmail: 'maria@email.com',
    clientPhone: '(305) 555-0101',
    service: 'Brazilian Wax',
    date: new Date(),
    time: '10:00',
    duration: 30,
    status: 'CONFIRMED',
    price: 50,
    staffMember: 'Sofía',
  },
  {
    id: '2',
    clientName: 'Jennifer Lopez',
    clientEmail: 'jennifer@email.com',
    clientPhone: '(305) 555-0102',
    service: 'Full Leg Wax',
    date: new Date(),
    time: '11:30',
    duration: 45,
    status: 'PENDING',
    price: 80,
    staffMember: 'Valentina',
  },
  {
    id: '3',
    clientName: 'Sarah Miller',
    clientEmail: 'sarah@email.com',
    clientPhone: '(305) 555-0103',
    service: 'Underarm Wax',
    date: new Date(),
    time: '14:00',
    duration: 20,
    status: 'CONFIRMED',
    price: 30,
    staffMember: 'Camila',
  },
  {
    id: '4',
    clientName: 'Emily Chen',
    clientEmail: 'emily@email.com',
    clientPhone: '(305) 555-0104',
    service: 'Brow Design',
    date: new Date(new Date().setDate(new Date().getDate() + 1)),
    time: '15:30',
    duration: 15,
    status: 'PENDING',
    price: 25,
    staffMember: 'Sofía',
  },
];

export default function AppointmentsPage() {
  const { user } = useMockAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [services, setServices] = useState(DEFAULT_SERVICES);
  const [staff, setStaff] = useState(DEFAULT_STAFF);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [activeTab, setActiveTab] = useState('list');

  const [formData, setFormData] = useState<Partial<Appointment>>({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    service: '',
    date: new Date(),
    time: '',
    status: 'PENDING',
    staffMember: '',
    notes: '',
    price: 0,
    duration: 30,
  });

  useEffect(() => {
    if (user?.studioId) {
      const stored = localStorage.getItem(`mock_appointments_${user.studioId}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        setAppointments(parsed.map((a: any) => ({ ...a, date: new Date(a.date) })));
      } else {
        setAppointments(DEFAULT_APPOINTMENTS);
        localStorage.setItem(`mock_appointments_${user.studioId}`, JSON.stringify(DEFAULT_APPOINTMENTS));
      }

      const storedServices = localStorage.getItem(`mock_services_${user.studioId}`);
      if (storedServices) setServices(JSON.parse(storedServices));

      const storedStaff = localStorage.getItem(`mock_staff_${user.studioId}`);
      if (storedStaff) setStaff(JSON.parse(storedStaff));
    }
  }, [user?.studioId]);

  const saveAppointments = (updated: Appointment[]) => {
    setAppointments(updated);
    if (user?.studioId) {
      localStorage.setItem(`mock_appointments_${user.studioId}`, JSON.stringify(updated));
    }
  };

  const handleAddAppointment = () => {
    setEditingAppointment(null);
    setFormData({
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      service: '',
      date: selectedDate,
      time: '',
      status: 'PENDING',
      staffMember: '',
      notes: '',
      price: 0,
      duration: 30,
    });
    setIsDialogOpen(true);
  };

  const handleEditAppointment = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    setFormData({ ...appointment });
    setIsDialogOpen(true);
  };

  const handleDeleteAppointment = (id: string) => {
    const updated = appointments.filter(a => a.id !== id);
    saveAppointments(updated);
  };

  const handleUpdateStatus = (id: string, status: Appointment['status']) => {
    const updated = appointments.map(a =>
      a.id === id ? { ...a, status } : a
    );
    saveAppointments(updated);
  };

  const handleSaveAppointment = () => {
    const serviceData = services.find(s => s.name === formData.service);
    const price = serviceData?.price || formData.price || 0;
    const duration = serviceData?.duration || formData.duration || 30;

    if (editingAppointment) {
      const updated = appointments.map(a =>
        a.id === editingAppointment.id
          ? { ...a, ...formData, price, duration } as Appointment
          : a
      );
      saveAppointments(updated);
    } else {
      const newAppointment: Appointment = {
        id: Date.now().toString(),
        clientName: formData.clientName || '',
        clientEmail: formData.clientEmail || '',
        clientPhone: formData.clientPhone || '',
        service: formData.service || '',
        date: formData.date || new Date(),
        time: formData.time || '',
        duration,
        status: formData.status as Appointment['status'] || 'PENDING',
        staffMember: formData.staffMember,
        notes: formData.notes,
        price,
      };
      saveAppointments([...appointments, newAppointment]);
    }
    setIsDialogOpen(false);
  };

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch =
      apt.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.clientPhone.includes(searchQuery);

    const matchesStatus = statusFilter === 'all' || apt.status === statusFilter;

    const matchesDate = activeTab === 'calendar'
      ? apt.date.toDateString() === selectedDate.toDateString()
      : true;

    return matchesSearch && matchesStatus && matchesDate;
  });

  const todayAppointments = appointments.filter(
    apt => apt.date.toDateString() === new Date().toDateString()
  );

  const stats = {
    today: todayAppointments.length,
    pending: appointments.filter(a => a.status === 'PENDING').length,
    confirmed: appointments.filter(a => a.status === 'CONFIRMED').length,
    completed: appointments.filter(a => a.status === 'COMPLETED').length,
    cancelled: appointments.filter(a => a.status === 'CANCELLED').length,
    totalRevenue: appointments
      .filter(a => a.status === 'COMPLETED' || a.status === 'CONFIRMED')
      .reduce((sum, a) => sum + a.price, 0),
  };

  const getStatusBadge = (status: Appointment['status']) => {
    const variants: Record<string, { className: string; label: string }> = {
      PENDING: { className: 'bg-yellow-100 text-yellow-700', label: 'Pendiente' },
      CONFIRMED: { className: 'bg-green-100 text-green-700', label: 'Confirmada' },
      CANCELLED: { className: 'bg-red-100 text-red-700', label: 'Cancelada' },
      COMPLETED: { className: 'bg-blue-100 text-blue-700', label: 'Completada' },
      NO_SHOW: { className: 'bg-gray-100 text-gray-700', label: 'No Show' },
    };
    const variant = variants[status] || variants.PENDING;
    return <Badge className={variant.className}>{variant.label}</Badge>;
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold">Gestión de Citas</h1>
          <p className="text-gray-500">Administra las reservas de tu estudio</p>
        </div>
        <Button onClick={handleAddAppointment} className="gap-2">
          <Plus className="w-4 h-4" />
          Nueva Cita
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-pink-50 flex items-center justify-center">
                <CalendarIcon className="w-5 h-5 text-pink-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.today}</p>
                <p className="text-xs text-gray-500">Hoy</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-yellow-50 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.pending}</p>
                <p className="text-xs text-gray-500">Pendientes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.confirmed}</p>
                <p className="text-xs text-gray-500">Confirmadas</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.completed}</p>
                <p className="text-xs text-gray-500">Completadas</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.cancelled}</p>
                <p className="text-xs text-gray-500">Canceladas</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                <CalendarIcon className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">${stats.totalRevenue}</p>
                <p className="text-xs text-gray-500">Ingresos</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Buscar por cliente o servicio..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los estados</SelectItem>
            <SelectItem value="PENDING">Pendiente</SelectItem>
            <SelectItem value="CONFIRMED">Confirmada</SelectItem>
            <SelectItem value="COMPLETED">Completada</SelectItem>
            <SelectItem value="CANCELLED">Cancelada</SelectItem>
            <SelectItem value="NO_SHOW">No Show</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="list">Lista</TabsTrigger>
          <TabsTrigger value="calendar">Calendario</TabsTrigger>
        </TabsList>

        {/* List View */}
        <TabsContent value="list">
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {filteredAppointments.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <CalendarIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No se encontraron citas</p>
                    <Button onClick={handleAddAppointment} variant="outline" className="mt-4">
                      <Plus className="w-4 h-4 mr-2" />
                      Agregar Cita
                    </Button>
                  </div>
                ) : (
                  filteredAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="p-4 flex items-center justify-between hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center">
                          <span className="text-pink-600 font-semibold text-sm">
                            {appointment.clientName.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{appointment.clientName}</p>
                            {getStatusBadge(appointment.status)}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Scissors className="w-3 h-3" />
                              {appointment.service}
                            </span>
                            <span className="flex items-center gap-1">
                              <CalendarIcon className="w-3 h-3" />
                              {appointment.date.toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {appointment.time} ({appointment.duration} min)
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-semibold">${appointment.price}</p>
                          {appointment.staffMember && (
                            <p className="text-sm text-gray-500">con {appointment.staffMember}</p>
                          )}
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditAppointment(appointment)}>
                              Ver / Editar
                            </DropdownMenuItem>
                            {appointment.status === 'PENDING' && (
                              <DropdownMenuItem onClick={() => handleUpdateStatus(appointment.id, 'CONFIRMED')}>
                                Confirmar
                              </DropdownMenuItem>
                            )}
                            {(appointment.status === 'PENDING' || appointment.status === 'CONFIRMED') && (
                              <DropdownMenuItem onClick={() => handleUpdateStatus(appointment.id, 'COMPLETED')}>
                                Marcar Completada
                              </DropdownMenuItem>
                            )}
                            {(appointment.status === 'PENDING' || appointment.status === 'CONFIRMED') && (
                              <DropdownMenuItem onClick={() => handleUpdateStatus(appointment.id, 'CANCELLED')}>
                                Cancelar
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              onClick={() => handleDeleteAppointment(appointment.id)}
                              className="text-red-600"
                            >
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Calendar View */}
        <TabsContent value="calendar">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Calendario</CardTitle>
                <CardDescription>Selecciona una fecha para ver las citas</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Citas del {selectedDate.toLocaleDateString()}</CardTitle>
                <CardDescription>
                  {filteredAppointments.length} citas programadas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredAppointments.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">
                      No hay citas para esta fecha
                    </p>
                  ) : (
                    filteredAppointments.map((apt) => (
                      <div
                        key={apt.id}
                        className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleEditAppointment(apt)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="font-medium">{apt.time}</span>
                          </div>
                          {getStatusBadge(apt.status)}
                        </div>
                        <p className="font-medium mt-1">{apt.clientName}</p>
                        <p className="text-sm text-gray-500">{apt.service}</p>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Appointment Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingAppointment ? 'Editar Cita' : 'Nueva Cita'}
            </DialogTitle>
            <DialogDescription>
              {editingAppointment
                ? 'Actualiza los detalles de la cita'
                : 'Completa la información para agendar una nueva cita'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="clientName">Nombre del Cliente *</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="clientName"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  placeholder="Nombre completo"
                  className="pl-10"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="clientEmail">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="clientEmail"
                    type="email"
                    value={formData.clientEmail}
                    onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                    placeholder="email@ejemplo.com"
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientPhone">Teléfono</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="clientPhone"
                    value={formData.clientPhone}
                    onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                    placeholder="(305) 555-0000"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="service">Servicio *</Label>
              <Select
                value={formData.service}
                onValueChange={(value) => {
                  const service = services.find(s => s.name === value);
                  setFormData({
                    ...formData,
                    service: value,
                    price: service?.price || 0,
                    duration: service?.duration || 30,
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un servicio" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service.id} value={service.name}>
                      {service.name} - ${service.price} ({service.duration} min)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Fecha</Label>
                <Calendar
                  mode="single"
                  selected={formData.date}
                  onSelect={(date) => date && setFormData({ ...formData, date })}
                  className="rounded-md border"
                />
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="time">Hora</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="staff">Esteticista</Label>
                  <Select
                    value={formData.staffMember}
                    onValueChange={(value) => setFormData({ ...formData, staffMember: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Asignar" />
                    </SelectTrigger>
                    <SelectContent>
                      {staff.map((staff) => (
                        <SelectItem key={staff.id} value={staff.name}>
                          {staff.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Estado</Label>
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
              <Label htmlFor="notes">Notas</Label>
              <textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Notas adicionales sobre la cita..."
                className="w-full px-3 py-2 border rounded-md min-h-[80px]"
              />
            </div>
          </div>

          <DialogFooter>
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
