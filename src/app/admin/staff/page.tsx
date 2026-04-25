'use client';

import { useState, useEffect } from 'react';
import { useMockAuth } from '@/components/providers/MockAuthProvider';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Pencil, Trash2, User, Phone, Mail, Palette, Check } from 'lucide-react';

interface StaffMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  color: string;
  specialties: string[];
  isActive: boolean;
}

const DEFAULT_STAFF: StaffMember[] = [
  { id: '1', name: 'Sofía', role: 'Esthetician', email: 'sofia@studio.com', phone: '(305) 555-0101', color: '#EC4899', specialties: ['Brazilian Wax', 'Brow Design'], isActive: true },
  { id: '2', name: 'Valentina', role: 'Esthetician', email: 'valentina@studio.com', phone: '(305) 555-0102', color: '#8B5CF6', specialties: ['Full Leg Wax', 'Underarm Wax'], isActive: true },
  { id: '3', name: 'Camila', role: 'Esthetician', email: 'camila@studio.com', phone: '(305) 555-0103', color: '#10B981', specialties: ['Facial', 'Massage'], isActive: true },
];

const COLOR_OPTIONS = [
  '#EC4899', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444',
  '#3B82F6', '#06B6D4', '#F97316', '#84CC16', '#D946EF',
  '#6366F1', '#14B8A6', '#EAB308', '#F43F5E', '#A855F7',
];

export default function StaffPage() {
  const { user } = useMockAuth();
  const [staff, setStaff] = useState<StaffMember[]>(DEFAULT_STAFF);
  const [services, setServices] = useState<{ id: string; name: string }[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);
  const [activeTab, setActiveTab] = useState('all');

  const [formData, setFormData] = useState<Partial<StaffMember>>({
    name: '',
    role: '',
    email: '',
    phone: '',
    color: COLOR_OPTIONS[0],
    specialties: [],
    isActive: true,
  });

  useEffect(() => {
    if (user?.studioId) {
      const stored = localStorage.getItem(`mock_staff_${user.studioId}`);
      if (stored) {
        setStaff(JSON.parse(stored));
      }

      const storedServices = localStorage.getItem(`mock_services_${user.studioId}`);
      if (storedServices) {
        setServices(JSON.parse(storedServices));
      } else {
        setServices([
          { id: '1', name: 'Brazilian Wax' },
          { id: '2', name: 'Brow Design' },
          { id: '3', name: 'Full Leg Wax' },
          { id: '4', name: 'Underarm Wax' },
          { id: '5', name: 'Facial' },
          { id: '6', name: 'Massage' },
          { id: '7', name: 'Manicure' },
          { id: '8', name: 'Pedicure' },
        ]);
      }
    }
  }, [user?.studioId]);

  const saveStaff = (updated: StaffMember[]) => {
    setStaff(updated);
    if (user?.studioId) {
      localStorage.setItem(`mock_staff_${user.studioId}`, JSON.stringify(updated));
    }
  };

  const handleAdd = () => {
    setEditingStaff(null);
    setFormData({
      name: '',
      role: '',
      email: '',
      phone: '',
      color: COLOR_OPTIONS[0],
      specialties: [],
      isActive: true,
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (member: StaffMember) => {
    setEditingStaff(member);
    setFormData({ ...member });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    saveStaff(staff.filter((s) => s.id !== id));
  };

  const handleToggleActive = (id: string) => {
    saveStaff(staff.map((s) => s.id === id ? { ...s, isActive: !s.isActive } : s));
  };

  const handleSave = () => {
    if (editingStaff) {
      saveStaff(staff.map((s) => s.id === editingStaff.id ? { ...s, ...formData } as StaffMember : s));
    } else {
      const newStaff: StaffMember = {
        id: `staff-${Date.now()}`,
        name: formData.name || '',
        role: formData.role || 'Staff',
        email: formData.email || '',
        phone: formData.phone || '',
        color: formData.color || COLOR_OPTIONS[0],
        specialties: formData.specialties || [],
        isActive: true,
      };
      saveStaff([...staff, newStaff]);
    }
    setIsDialogOpen(false);
  };

  const filteredStaff = staff.filter((s) => {
    if (activeTab === 'active') return s.isActive;
    if (activeTab === 'inactive') return !s.isActive;
    return true;
  });

  return (
    <div className="p-6 lg:p-8 max-w-7xl">
      <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold">Equipo</h1>
          <p className="text-gray-500">Gestiona tu staff, roles y especialidades</p>
        </div>
        <Button onClick={handleAdd} className="gap-2">
          <Plus className="w-4 h-4" />
          Agregar Staff
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="all">Todos ({staff.length})</TabsTrigger>
          <TabsTrigger value="active">Activos ({staff.filter((s) => s.isActive).length})</TabsTrigger>
          <TabsTrigger value="inactive">Inactivos ({staff.filter((s) => !s.isActive).length})</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStaff.map((member) => (
          <Card key={member.id} className={`${!member.isActive ? 'opacity-60' : ''}`}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                    style={{ backgroundColor: member.color }}
                  >
                    {member.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{member.name}</h3>
                    <p className="text-sm text-gray-500">{member.role}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(member)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => handleDelete(member.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                {member.email && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    {member.email}
                  </div>
                )}
                {member.phone && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    {member.phone}
                  </div>
                )}
              </div>

              {member.specialties.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-500 mb-1.5">Especialidades</p>
                  <div className="flex flex-wrap gap-1">
                    {member.specialties.map((spec) => (
                      <Badge key={spec} variant="secondary" className="text-xs">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-3 border-t">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: member.color }} />
                  <span className="text-xs text-gray-500">Color del calendario</span>
                </div>
                <Button
                  variant={member.isActive ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleToggleActive(member.id)}
                >
                  {member.isActive ? 'Activo' : 'Inactivo'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStaff.length === 0 && (
        <Card className="p-12 text-center">
          <User className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500">No hay staff en esta categoría</p>
          <Button onClick={handleAdd} variant="outline" className="mt-4">
            Agregar Staff
          </Button>
        </Card>
      )}

      {/* Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingStaff ? 'Editar Staff' : 'Nuevo Staff'}
            </DialogTitle>
            <DialogDescription>
              {editingStaff ? 'Actualiza la información del miembro del equipo' : 'Completa los datos para agregar un nuevo miembro'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Nombre Completo *</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ej: María García"
              />
            </div>

            <div className="space-y-2">
              <Label>Rol / Título *</Label>
              <Input
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder="Ej: Esthetician, Nail Tech, Barber"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@ejemplo.com"
                />
              </div>
              <div className="space-y-2">
                <Label>Teléfono</Label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(305) 555-0000"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Color del Calendario</Label>
              <div className="flex flex-wrap gap-2">
                {COLOR_OPTIONS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      formData.color === color ? 'border-gray-900 scale-110' : 'border-transparent hover:scale-105'
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setFormData({ ...formData, color })}
                  >
                    {formData.color === color && <Check className="w-4 h-4 text-white mx-auto" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Especialidades</Label>
              <div className="flex flex-wrap gap-2">
                {services.map((svc) => {
                  const isSelected = formData.specialties?.includes(svc.name);
                  return (
                    <button
                      key={svc.id}
                      type="button"
                      onClick={() => {
                        const current = formData.specialties || [];
                        const updated = isSelected
                          ? current.filter((s) => s !== svc.name)
                          : [...current, svc.name];
                        setFormData({ ...formData, specialties: updated });
                      }}
                      className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
                        isSelected
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {svc.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2">
            {editingStaff && (
              <Button variant="destructive" onClick={() => { handleDelete(editingStaff.id); setIsDialogOpen(false); }} className="mr-auto">
                Eliminar
              </Button>
            )}
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={!formData.name || !formData.role}>
              {editingStaff ? 'Guardar Cambios' : 'Crear Staff'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
