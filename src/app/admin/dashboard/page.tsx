'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useMockAuth } from '@/components/providers/MockAuthProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, DollarSign, Scissors, Users, ArrowUpRight, ArrowDownRight, Loader2, Settings, CreditCard, Globe, ExternalLink, Plus, Store, TrendingUp, Clock, Package } from 'lucide-react';

interface DashboardStats {
  todayAppointments: number;
  weekAppointments: number;
  monthRevenue: number;
  activeClients: number;
  totalServices: number;
  lowStockProducts: number;
  recentAppointments: Array<{
    id: string;
    clientName: string;
    service: string;
    dateTime: string;
    status: string;
  }>;
  studio: {
    name: string;
    theme: string;
    stripeConnected: boolean;
    hasProducts: boolean;
  } | null;
}

export default function AdminDashboard() {
  const { user, loading: authLoading } = useMockAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasStudio, setHasStudio] = useState(false);

  useEffect(() => {
    if (authLoading) return;

    const fetchStats = async () => {
      try {
        // Check if user has a studioId
        const currentUser = user;
        if (!currentUser?.studioId) {
          setHasStudio(false);
          setStats(null);
          setIsLoading(false);
          return;
        }

        setHasStudio(true);

        // Fetch studio info from localStorage
        const studioData = JSON.parse(localStorage.getItem('mock_studio_' + currentUser.studioId) || '{}');

        // Check if studio has been fully set up
        if (!studioData.businessName) {
          setHasStudio(false);
          setStats(null);
          setIsLoading(false);
          return;
        }

        // Fetch products to check if any exist
        const productsData = JSON.parse(localStorage.getItem(`mock_products_${currentUser.studioId}`) || '[]');
        const hasProducts = productsData.length > 0;
        const lowStockProducts = productsData.filter((p: any) => p.inventory < 10).length;

        // Fetch services
        const servicesData = JSON.parse(localStorage.getItem(`mock_services_${currentUser.studioId}`) || '[]');

        // Mock stats - in production these would come from API
        setStats({
          todayAppointments: 5,
          weekAppointments: 28,
          monthRevenue: 4250,
          activeClients: 156,
          totalServices: servicesData.length || 6,
          lowStockProducts: lowStockProducts,
          recentAppointments: [
            { id: '1', clientName: 'Maria Garcia', service: 'Brazilian Wax', dateTime: '2024-01-15T10:00:00', status: 'CONFIRMED' },
            { id: '2', clientName: 'Jennifer Lopez', service: 'Full Leg Wax', dateTime: '2024-01-15T11:30:00', status: 'PENDING' },
            { id: '3', clientName: 'Sarah Miller', service: 'Underarm Wax', dateTime: '2024-01-15T14:00:00', status: 'CONFIRMED' },
            { id: '4', clientName: 'Emily Chen', service: 'Brow Design', dateTime: '2024-01-15T15:30:00', status: 'CONFIRMED' },
          ],
          studio: {
            name: studioData.businessName || 'Mi Estudio',
            theme: studioData.theme?.id || 'waxing-rose-gold',
            stripeConnected: studioData.stripeConnected || false,
            hasProducts: hasProducts,
          },
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [user, authLoading]);

  if (authLoading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-pink-600" />
      </div>
    );
  }

  // User doesn't have a studio yet
  if (!hasStudio) {
    return (
      <div className="p-6 lg:p-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center mx-auto mb-4">
              <Store className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="font-heading text-2xl">¡Bienvenido a WaxingSetudios!</CardTitle>
            <CardDescription className="text-base">
              Para comenzar, necesitas configurar tu estudio de waxing
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4">
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center shrink-0">
                  <span className="text-pink-600 font-bold">1</span>
                </div>
                <div>
                  <p className="font-medium">Información de tu Estudio</p>
                  <p className="text-sm text-gray-500">Nombre, dirección, teléfono y datos de contacto</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center shrink-0">
                  <span className="text-pink-600 font-bold">2</span>
                </div>
                <div>
                  <p className="font-medium">Elige tu Diseño</p>
                  <p className="text-sm text-gray-500">Selecciona entre 5 temas luxury para tu web</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center shrink-0">
                  <span className="text-pink-600 font-bold">3</span>
                </div>
                <div>
                  <p className="font-medium">Configura tu Dominio</p>
                  <p className="text-sm text-gray-500">Conecta tu dominio personalizado</p>
                </div>
              </div>
            </div>
            <Link href="/studio/setup">
              <Button className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:opacity-90 py-6 text-lg">
                <Plus className="w-5 h-5 mr-2" />
                Crear mi Estudio
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Studio exists but data not loaded yet
  if (!stats) {
    return (
      <div className="p-6 lg:p-8">
        <Card className="max-w-md mx-auto text-center">
          <CardHeader>
            <CardTitle className="font-heading">Cargando...</CardTitle>
            <CardDescription>
              Obteniendo información de tu estudio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-pink-600" />
          </CardContent>
        </Card>
      </div>
    );
  }

  const statCards = [
    {
      title: "Citas Hoy",
      value: stats.todayAppointments,
      icon: Calendar,
      color: "text-pink-600",
      bgColor: 'bg-pink-50',
      change: '+12%',
      changeType: 'up' as const,
    },
    {
      title: 'Esta Semana',
      value: stats.weekAppointments,
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      change: '+8%',
      changeType: 'up' as const,
    },
    {
      title: 'Ingresos Mes',
      value: `$${stats.monthRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      change: '+15%',
      changeType: 'up' as const,
    },
    {
      title: 'Clientes',
      value: stats.activeClients,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: '+5%',
      changeType: 'up' as const,
    },
  ];

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-gray-900">
            {stats.studio?.name}
          </h1>
          <p className="text-gray-500 mt-1">
            ¡Bienvenido de nuevo! Esto es lo que sucede hoy.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/studio/demo/home" target="_blank">
            <Button className="gap-2 bg-gradient-to-r from-pink-600 to-rose-600">
              <Globe className="w-4 h-4" />
              Ver Website
              <ExternalLink className="w-3 h-3" />
            </Button>
          </Link>
          {!stats.studio?.stripeConnected && (
            <Link href="/admin/settings/billing">
              <Button variant="outline" className="gap-2">
                <CreditCard className="w-4 h-4" />
                Conectar Stripe
              </Button>
            </Link>
          )}
          <Link href="/admin/website">
            <Button variant="outline" className="gap-2">
              <Settings className="w-4 h-4" />
              Editar Website
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <Card key={stat.title} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className={`flex items-center gap-1 text-sm ${stat.changeType === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.changeType === 'up' ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                  {stat.change}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center">
                <Scissors className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalServices}</p>
                <p className="text-sm text-gray-500">Servicios</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                <Package className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.lowStockProducts}</p>
                <p className="text-sm text-gray-500">Productos Stock Bajo</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">85%</p>
                <p className="text-sm text-gray-500">Tasa de Reservas</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <h2 className="font-heading text-lg font-semibold mb-4">Acciones Rápidas</h2>
          <div className="space-y-3">
            <Link href="/admin/services">
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-pink-50 flex items-center justify-center">
                    <Scissors className="w-5 h-5 text-pink-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Gestionar Servicios</p>
                    <p className="text-sm text-gray-500">Agregar o editar servicios</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/admin/products">
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
                    <Package className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Catálogo de Productos</p>
                    <p className="text-sm text-gray-500">
                      {stats.studio?.hasProducts ? 'Gestionar inventario' : 'Agregar productos'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/admin/website">
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Personalizar Website</p>
                    <p className="text-sm text-gray-500">Editar diseño y páginas</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            {!stats.studio?.stripeConnected && (
              <Link href="/admin/settings/billing">
                <Card className="cursor-pointer hover:shadow-md transition-shadow border-amber-200">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Conectar Stripe</p>
                      <p className="text-sm text-gray-500">Recibe pagos online</p>
                    </div>
                    <Badge className="bg-amber-100 text-amber-700">Pendiente</Badge>
                  </CardContent>
                </Card>
              </Link>
            )}
          </div>
        </div>

        {/* Recent Appointments */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-lg font-semibold">Citas Recientes</h2>
            <Link href="/admin/appointments">
              <Button variant="ghost" size="sm">Ver todas</Button>
            </Link>
          </div>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {stats.recentAppointments.map((appointment) => (
                  <div key={appointment.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center">
                        <span className="text-pink-600 font-semibold text-sm">
                          {appointment.clientName.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{appointment.clientName}</p>
                        <p className="text-sm text-gray-500">{appointment.service}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={appointment.status === 'CONFIRMED' ? 'default' : 'secondary'}
                        className={appointment.status === 'CONFIRMED' ? 'bg-green-100 text-green-700 hover:bg-green-100' : ''}
                      >
                        {appointment.status === 'CONFIRMED' ? 'Confirmada' : 'Pendiente'}
                      </Badge>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(appointment.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
