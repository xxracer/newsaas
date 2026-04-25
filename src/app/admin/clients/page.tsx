'use client';

import { useState, useEffect } from 'react';
import { useMockAuth } from '@/components/providers/MockAuthProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, User, Phone, Mail, Calendar, DollarSign, Clock, Star, MoreVertical, FileText, MessageSquare } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate?: string;
  notes?: string;
  totalVisits: number;
  totalSpent: number;
  lastVisit?: Date;
  preferredService?: string;
  isVip: boolean;
  allergies?: string;
  createdAt: Date;
}

const DEFAULT_CLIENTS: Client[] = [
  {
    id: '1',
    firstName: 'Maria',
    lastName: 'Garcia',
    email: 'maria@email.com',
    phone: '(305) 555-0101',
    birthDate: '1990-05-15',
    totalVisits: 12,
    totalSpent: 650,
    lastVisit: new Date('2024-01-10'),
    preferredService: 'Brazilian Wax',
    isVip: true,
    notes: 'Prefiere cera caliente. Piel sensible.',
    createdAt: new Date('2023-06-01'),
  },
  {
    id: '2',
    firstName: 'Jennifer',
    lastName: 'Lopez',
    email: 'jennifer@email.com',
    phone: '(305) 555-0102',
    totalVisits: 8,
    totalSpent: 480,
    lastVisit: new Date('2024-01-08'),
    preferredService: 'Full Leg Wax',
    isVip: false,
    createdAt: new Date('2023-08-15'),
  },
  {
    id: '3',
    firstName: 'Sarah',
    lastName: 'Miller',
    email: 'sarah@email.com',
    phone: '(305) 555-0103',
    birthDate: '1985-12-20',
    totalVisits: 25,
    totalSpent: 1200,
    lastVisit: new Date('2024-01-12'),
    preferredService: 'Underarm Wax',
    isVip: true,
    notes: 'Cliente frecuente. Siempre puntual.',
    createdAt: new Date('2023-03-10'),
  },
  {
    id: '4',
    firstName: 'Emily',
    lastName: 'Chen',
    email: 'emily@email.com',
    phone: '(305) 555-0104',
    totalVisits: 3,
    totalSpent: 120,
    lastVisit: new Date('2024-01-05'),
    preferredService: 'Brow Design',
    isVip: false,
    createdAt: new Date('2023-11-20'),
  },
];

const CLIENT_HISTORY = [
  { id: '1', date: '2024-01-10', service: 'Brazilian Wax', price: 50, status: 'completed' },
  { id: '2', date: '2023-12-15', service: 'Brow Design', price: 25, status: 'completed' },
  { id: '3', date: '2023-11-20', service: 'Brazilian Wax', price: 50, status: 'completed' },
];

export default function ClientsPage() {
  const { user } = useMockAuth();
  const [clients, setClients] = useState<Client[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    if (user?.studioId) {
      const stored = localStorage.getItem(`mock_clients_${user.studioId}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        setClients(parsed.map((c: any) => ({ ...c, lastVisit: c.lastVisit ? new Date(c.lastVisit) : undefined, createdAt: new Date(c.createdAt) })));
      } else {
        setClients(DEFAULT_CLIENTS);
        localStorage.setItem(`mock_clients_${user.studioId}`, JSON.stringify(DEFAULT_CLIENTS));
      }
    }
  }, [user?.studioId]);

  const saveClients = (updated: Client[]) => {
    setClients(updated);
    if (user?.studioId) {
      localStorage.setItem(`mock_clients_${user.studioId}`, JSON.stringify(updated));
    }
  };

  const filteredClients = clients.filter(client => {
    const matchesSearch =
      client.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.phone.includes(searchQuery);

    const matchesTab = activeTab === 'all' ? true :
                      activeTab === 'vip' ? client.isVip :
                      activeTab === 'recent' ? client.lastVisit && new Date().getTime() - new Date(client.lastVisit).getTime() < 7 * 24 * 60 * 60 * 1000 :
                      true;

    return matchesSearch && matchesTab;
  });

  const stats = {
    total: clients.length,
    vip: clients.filter(c => c.isVip).length,
    newThisMonth: clients.filter(c => {
      const created = new Date(c.createdAt);
      const now = new Date();
      return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
    }).length,
    totalRevenue: clients.reduce((sum, c) => sum + c.totalSpent, 0),
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold mb-2">Clientes</h1>
        <p className="text-gray-500">Gestiona tu base de clientes y su historial</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-xs text-gray-500">Total Clientes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                <Star className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.vip}</p>
                <p className="text-xs text-gray-500">Clientes VIP</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                <User className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.newThisMonth}</p>
                <p className="text-xs text-gray-500">Nuevos este mes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</p>
                <p className="text-xs text-gray-500">Ingresos Totales</p>
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
            placeholder="Buscar clientes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="vip">VIP</TabsTrigger>
          <TabsTrigger value="recent">Recientes</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Clients Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClients.map((client) => (
          <Card
            key={client.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => { setSelectedClient(client); setIsDialogOpen(true); }}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center">
                    <span className="text-pink-600 font-semibold">
                      {client.firstName[0]}{client.lastName[0]}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{client.firstName} {client.lastName}</p>
                      {client.isVip && (
                        <Badge className="bg-amber-100 text-amber-700">
                          <Star className="w-3 h-3 mr-1" />
                          VIP
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{client.email}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  {client.phone}
                </div>
                {client.preferredService && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    Preferido: {client.preferredService}
                  </div>
                )}
                {client.lastVisit && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    Última visita: {new Date(client.lastVisit).toLocaleDateString()}
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Visitas</p>
                  <p className="font-semibold">{client.totalVisits}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Gastado</p>
                  <p className="font-semibold">${client.totalSpent}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Client Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedClient && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center">
                    <span className="text-pink-600 font-bold text-xl">
                      {selectedClient.firstName[0]}{selectedClient.lastName[0]}
                    </span>
                  </div>
                  <div>
                    <DialogTitle className="text-xl flex items-center gap-2">
                      {selectedClient.firstName} {selectedClient.lastName}
                      {selectedClient.isVip && (
                        <Badge className="bg-amber-100 text-amber-700">
                          <Star className="w-3 h-3 mr-1" />
                          VIP
                        </Badge>
                      )}
                    </DialogTitle>
                    <DialogDescription className="flex items-center gap-4 mt-1">
                      <span className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {selectedClient.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {selectedClient.phone}
                      </span>
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 py-4">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg text-center">
                    <p className="text-2xl font-bold">{selectedClient.totalVisits}</p>
                    <p className="text-sm text-gray-500">Visitas</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg text-center">
                    <p className="text-2xl font-bold">${selectedClient.totalSpent}</p>
                    <p className="text-sm text-gray-500">Gastado</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg text-center">
                    <p className="text-2xl font-bold">
                      {selectedClient.lastVisit ? Math.floor((new Date().getTime() - new Date(selectedClient.lastVisit).getTime()) / (1000 * 60 * 60 * 24)) : 0}
                    </p>
                    <p className="text-sm text-gray-500">Días desde visita</p>
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-3">
                  <h3 className="font-semibold">Información</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {selectedClient.birthDate && (
                      <div>
                        <p className="text-gray-500">Cumpleaños</p>
                        <p>{new Date(selectedClient.birthDate).toLocaleDateString()}</p>
                      </div>
                    )}
                    {selectedClient.preferredService && (
                      <div>
                        <p className="text-gray-500">Servicio Preferido</p>
                        <p>{selectedClient.preferredService}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-gray-500">Cliente desde</p>
                      <p>{new Date(selectedClient.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                {selectedClient.notes && (
                  <div>
                    <h3 className="font-semibold mb-2">Notas</h3>
                    <div className="p-3 bg-yellow-50 rounded-lg text-sm">
                      {selectedClient.notes}
                    </div>
                  </div>
                )}

                {/* History */}
                <div>
                  <h3 className="font-semibold mb-2">Historial de Servicios</h3>
                  <div className="space-y-2">
                    {CLIENT_HISTORY.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{item.service}</p>
                          <p className="text-sm text-gray-500">{new Date(item.date).toLocaleDateString()}</p>
                        </div>
                        <p className="font-semibold">${item.price}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t">
                  <Button className="flex-1" variant="outline">
                    <Calendar className="w-4 h-4 mr-2" />
                    Nueva Cita
                  </Button>
                  <Button className="flex-1" variant="outline">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Enviar Mensaje
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
