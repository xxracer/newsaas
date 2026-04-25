'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMockAuth } from '@/components/providers/MockAuthProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import {
  Store,
  Clock,
  Bell,
  Palette,
  CreditCard,
  User,
  Save,
  Loader2,
  Check,
  Globe,
  Mail,
  MessageSquare,
  Smartphone,
  ChevronRight,
  Calendar
} from 'lucide-react';
import Link from 'next/link';

interface StudioSettings {
  businessName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  timezone: string;
  currency: string;
  language: string;
}

interface BusinessHours {
  [key: string]: {
    open: string;
    close: string;
    closed: boolean;
  };
}

interface NotificationSettings {
  emailNewBooking: boolean;
  emailCancellation: boolean;
  emailReminder: boolean;
  smsReminder: boolean;
  smsConfirmation: boolean;
  marketingEmails: boolean;
}

const DAYS = [
  { key: 'monday', label: 'Lunes' },
  { key: 'tuesday', label: 'Martes' },
  { key: 'wednesday', label: 'Miércoles' },
  { key: 'thursday', label: 'Jueves' },
  { key: 'friday', label: 'Viernes' },
  { key: 'saturday', label: 'Sábado' },
  { key: 'sunday', label: 'Domingo' },
];

const TIMEZONES = [
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'America/Phoenix',
  'America/Toronto',
  'Europe/London',
  'Europe/Paris',
  'Europe/Berlin',
  'Asia/Tokyo',
  'Australia/Sydney',
];

const CURRENCIES = [
  { code: 'USD', name: 'USD - US Dollar', symbol: '$' },
  { code: 'EUR', name: 'EUR - Euro', symbol: '€' },
  { code: 'GBP', name: 'GBP - British Pound', symbol: '£' },
  { code: 'CAD', name: 'CAD - Canadian Dollar', symbol: 'CA$' },
  { code: 'AUD', name: 'AUD - Australian Dollar', symbol: 'A$' },
  { code: 'MXN', name: 'MXN - Mexican Peso', symbol: '$' },
  { code: 'COP', name: 'COP - Colombian Peso', symbol: '$' },
];

export default function SettingsPage() {
  const { user } = useMockAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('general');
  const [isLoading, setIsLoading] = useState(false);
  const [showSavedDialog, setShowSavedDialog] = useState(false);

  const [settings, setSettings] = useState<StudioSettings>({
    businessName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    timezone: 'America/New_York',
    currency: 'USD',
    language: 'es',
  });

  const [businessHours, setBusinessHours] = useState<BusinessHours>({
    monday: { open: '09:00', close: '18:00', closed: false },
    tuesday: { open: '09:00', close: '18:00', closed: false },
    wednesday: { open: '09:00', close: '18:00', closed: false },
    thursday: { open: '09:00', close: '18:00', closed: false },
    friday: { open: '09:00', close: '18:00', closed: false },
    saturday: { open: '10:00', close: '16:00', closed: false },
    sunday: { open: '10:00', close: '16:00', closed: true },
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNewBooking: true,
    emailCancellation: true,
    emailReminder: true,
    smsReminder: false,
    smsConfirmation: false,
    marketingEmails: false,
  });

  useEffect(() => {
    if (user?.studioId) {
      const studioData = JSON.parse(localStorage.getItem('mock_studio_' + user.studioId) || '{}');
      if (studioData) {
        setSettings({
          businessName: studioData.businessName || '',
          email: studioData.email || '',
          phone: studioData.phone || '',
          address: studioData.address || '',
          city: studioData.city || '',
          state: studioData.state || '',
          zip: studioData.zip || '',
          timezone: studioData.timezone || 'America/New_York',
          currency: studioData.currency || 'USD',
          language: studioData.language || 'es',
        });

        if (studioData.businessHours) {
          setBusinessHours(studioData.businessHours);
        }

        if (studioData.notifications) {
          setNotifications(studioData.notifications);
        }
      }
    }
  }, [user?.studioId]);

  const handleSave = async () => {
    setIsLoading(true);

    try {
      if (user?.studioId) {
        const studioData = JSON.parse(localStorage.getItem('mock_studio_' + user.studioId) || '{}');

        const updatedData = {
          ...studioData,
          ...settings,
          businessHours,
          notifications,
          updatedAt: new Date().toISOString(),
        };

        localStorage.setItem('mock_studio_' + user.studioId, JSON.stringify(updatedData));

        setShowSavedDialog(true);
        setTimeout(() => setShowSavedDialog(false), 2000);
      }
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateSettings = (field: keyof StudioSettings, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const updateBusinessHours = (day: string, field: keyof BusinessHours[string], value: any) => {
    setBusinessHours(prev => ({
      ...prev,
      [day]: { ...prev[day], [field]: value },
    }));
  };

  const updateNotifications = (field: keyof NotificationSettings, value: boolean) => {
    setNotifications(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold mb-2">Configuración</h1>
        <p className="text-gray-500">Administra la configuración de tu estudio</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto">
          <TabsTrigger value="general" className="gap-2">
            <Store className="w-4 h-4" />
            <span className="hidden sm:inline">General</span>
          </TabsTrigger>
          <TabsTrigger value="hours" className="gap-2">
            <Clock className="w-4 h-4" />
            <span className="hidden sm:inline">Horarios</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="w-4 h-4" />
            <span className="hidden sm:inline">Notificaciones</span>
          </TabsTrigger>
          <TabsTrigger value="advanced" className="gap-2">
            <Globe className="w-4 h-4" />
            <span className="hidden sm:inline">Avanzado</span>
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="w-5 h-5" />
                Información del Negocio
              </CardTitle>
              <CardDescription>
                Configura los datos básicos de tu estudio
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Nombre del Estudio *</Label>
                  <Input
                    id="businessName"
                    value={settings.businessName}
                    onChange={(e) => updateSettings('businessName', e.target.value)}
                    placeholder="Ej: Rose Waxing Studio"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email de Contacto *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.email}
                    onChange={(e) => updateSettings('email', e.target.value)}
                    placeholder="contacto@mistudio.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    value={settings.phone}
                    onChange={(e) => updateSettings('phone', e.target.value)}
                    placeholder="(123) 456-7890"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Dirección</Label>
                  <Input
                    id="address"
                    value={settings.address}
                    onChange={(e) => updateSettings('address', e.target.value)}
                    placeholder="123 Main St"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">Ciudad</Label>
                  <Input
                    id="city"
                    value={settings.city}
                    onChange={(e) => updateSettings('city', e.target.value)}
                    placeholder="Miami"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">Estado/Provincia</Label>
                  <Input
                    id="state"
                    value={settings.state}
                    onChange={(e) => updateSettings('state', e.target.value)}
                    placeholder="FL"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zip">Código Postal</Label>
                  <Input
                    id="zip"
                    value={settings.zip}
                    onChange={(e) => updateSettings('zip', e.target.value)}
                    placeholder="33101"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Idioma</Label>
                  <Select
                    value={settings.language}
                    onValueChange={(value) => updateSettings('language', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona idioma" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="pt">Português</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Links */}
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/admin/website">
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-pink-50 flex items-center justify-center">
                      <Palette className="w-5 h-5 text-pink-600" />
                    </div>
                    <div>
                      <p className="font-medium">Diseño y Tema</p>
                      <p className="text-sm text-gray-500">Cambia colores y apariencia</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </CardContent>
              </Card>
            </Link>

            <Link href="/admin/settings/billing">
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Facturación y Pagos</p>
                      <p className="text-sm text-gray-500">Configura Stripe y pagos</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </CardContent>
              </Card>
            </Link>
          </div>
        </TabsContent>

        {/* Business Hours */}
        <TabsContent value="hours" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Horario de Atención
              </CardTitle>
              <CardDescription>
                Configura los días y horarios de apertura de tu estudio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {DAYS.map((day) => (
                  <div key={day.key} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-32">
                      <span className="font-medium">{day.label}</span>
                    </div>

                    <div className="flex items-center gap-4 flex-1">
                      <Switch
                        checked={!businessHours[day.key].closed}
                        onCheckedChange={(checked) => updateBusinessHours(day.key, 'closed', !checked)}
                      />

                      {!businessHours[day.key].closed ? (
                        <div className="flex items-center gap-2">
                          <Input
                            type="time"
                            value={businessHours[day.key].open}
                            onChange={(e) => updateBusinessHours(day.key, 'open', e.target.value)}
                            className="w-24"
                          />
                          <span className="text-gray-500">a</span>
                          <Input
                            type="time"
                            value={businessHours[day.key].close}
                            onChange={(e) => updateBusinessHours(day.key, 'close', e.target.value)}
                            className="w-24"
                          />
                        </div>
                      ) : (
                        <span className="text-gray-500">Cerrado</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Configuración de Citas</CardTitle>
              <CardDescription>
                Ajusta cómo los clientes pueden agendar citas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Buffer entre citas</p>
                  <p className="text-sm text-gray-500">Tiempo de preparación entre servicios</p>
                </div>
                <Select defaultValue="15">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Sin buffer</SelectItem>
                    <SelectItem value="5">5 minutos</SelectItem>
                    <SelectItem value="10">10 minutos</SelectItem>
                    <SelectItem value="15">15 minutos</SelectItem>
                    <SelectItem value="30">30 minutos</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Reserva anticipada máxima</p>
                  <p className="text-sm text-gray-500">Hasta cuánto tiempo pueden agendar</p>
                </div>
                <Select defaultValue="60">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 días</SelectItem>
                    <SelectItem value="60">60 días</SelectItem>
                    <SelectItem value="90">90 días</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Notificaciones por Email
              </CardTitle>
              <CardDescription>
                Configura qué emails recibirás cuando ocurran eventos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Nuevas citas</p>
                    <p className="text-sm text-gray-500">Recibir email cuando un cliente agenda</p>
                  </div>
                </div>
                <Switch
                  checked={notifications.emailNewBooking}
                  onCheckedChange={(checked) => updateNotifications('emailNewBooking', checked)}
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium">Cancelaciones</p>
                    <p className="text-sm text-gray-500">Notificar cuando se cancela una cita</p>
                  </div>
                </div>
                <Switch
                  checked={notifications.emailCancellation}
                  onCheckedChange={(checked) => updateNotifications('emailCancellation', checked)}
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium">Recordatorios</p>
                    <p className="text-sm text-gray-500">Recordatorio de citas próximas</p>
                  </div>
                </div>
                <Switch
                  checked={notifications.emailReminder}
                  onCheckedChange={(checked) => updateNotifications('emailReminder', checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                Notificaciones SMS
              </CardTitle>
              <CardDescription>
                Configura mensajes de texto para ti y tus clientes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium">Confirmaciones SMS</p>
                    <p className="text-sm text-gray-500">Enviar SMS de confirmación a clientes</p>
                  </div>
                </div>
                <Switch
                  checked={notifications.smsConfirmation}
                  onCheckedChange={(checked) => updateNotifications('smsConfirmation', checked)}
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                    <Bell className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-medium">Recordatorios SMS</p>
                    <p className="text-sm text-gray-500">Recordatorio de citas por SMS</p>
                  </div>
                </div>
                <Switch
                  checked={notifications.smsReminder}
                  onCheckedChange={(checked) => updateNotifications('smsReminder', checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Marketing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-pink-50 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-pink-600" />
                  </div>
                  <div>
                    <p className="font-medium">Emails de Marketing</p>
                    <p className="text-sm text-gray-500">Recibir emails sobre promociones y novedades</p>
                  </div>
                </div>
                <Switch
                  checked={notifications.marketingEmails}
                  onCheckedChange={(checked) => updateNotifications('marketingEmails', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced Settings */}
        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Zona Horaria y Moneda
              </CardTitle>
              <CardDescription>
                Configura la zona horaria y moneda de tu estudio
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="timezone">Zona Horaria</Label>
                <Select
                  value={settings.timezone}
                  onValueChange={(value) => updateSettings('timezone', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona zona horaria" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIMEZONES.map((tz) => (
                      <SelectItem key={tz} value={tz}>{tz}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">Moneda</Label>
                <Select
                  value={settings.currency}
                  onValueChange={(value) => updateSettings('currency', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona moneda" />
                  </SelectTrigger>
                  <SelectContent>
                    {CURRENCIES.map((curr) => (
                      <SelectItem key={curr.code} value={curr.code}>
                        {curr.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-red-600">Zona de Peligro</CardTitle>
              <CardDescription>
                Acciones irreversibles para tu estudio
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                <div>
                  <p className="font-medium text-red-900">Eliminar Estudio</p>
                  <p className="text-sm text-red-600">Esta acción no se puede deshacer</p>
                </div>
                <Button variant="destructive">Eliminar</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="fixed bottom-6 right-6">
        <Button
          onClick={handleSave}
          disabled={isLoading}
          className="gap-2 bg-gradient-to-r from-pink-600 to-rose-600 hover:opacity-90 shadow-lg"
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Guardando...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Guardar Cambios
            </>
          )}
        </Button>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSavedDialog} onOpenChange={setShowSavedDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <DialogTitle>¡Guardado!</DialogTitle>
              <DialogDescription>
                Los cambios han sido guardados correctamente
              </DialogDescription>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
