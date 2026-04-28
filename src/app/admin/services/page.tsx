'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MoreActions } from '@/components/admin/MoreActions';
import { Plus, Search, Loader2, Scissors } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  category: { name: string };
  price: string;
  duration: number;
  gender: string;
  isActive: boolean;
}

const businessTypeLabels: Record<string, string> = {
  waxing: 'Waxing',
  barber: 'Barber Shop',
  nails: 'Nail Salon',
  hair: 'Hair Salon',
  tattoo: 'Tattoo Studio',
  massage: 'Massage Spa',
  skincare: 'Skin Care',
  'brow-lash': 'Brow & Lash',
  tanning: 'Tanning Salon',
  default: 'Beauty',
};

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [businessType, setBusinessType] = useState('waxing');

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
              setBusinessType(studio.businessType);
            }
          }
        }
      } catch (e) {
        console.error('Error reading studio data:', e);
      }
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [businessType]);

  const fetchServices = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/services?businessType=${encodeURIComponent(businessType)}`);
      if (res.ok) {
        const data = await res.json();
        setServices(data);
      }
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredServices = services.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.category.name.toLowerCase().includes(search.toLowerCase())
  );

  const label = businessTypeLabels[businessType] || businessTypeLabels.default;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Services</h1>
          <p className="text-gray-500">Manage your {label.toLowerCase()} services</p>
        </div>
        <Button asChild className="bg-gray-900 hover:bg-black">
          <Link href="/admin/services/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Service
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search services..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredServices.length === 0 ? (
            <div className="text-center py-12">
              <Scissors className="mx-auto h-12 w-12 text-gray-300" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">No services found</h3>
              <p className="mt-2 text-sm text-gray-500">
                {search ? 'Try adjusting your search' : `Get started by adding your first ${label.toLowerCase()} service`}
              </p>
              {!search && (
                <Button asChild className="mt-4 bg-gray-900 hover:bg-black">
                  <Link href="/admin/services/new">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Service
                  </Link>
                </Button>
              )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredServices.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">{service.name}</TableCell>
                    <TableCell>{service.category.name}</TableCell>
                    <TableCell>${parseFloat(service.price).toFixed(2)}</TableCell>
                    <TableCell>{service.duration} min</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {service.gender.toLowerCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={service.isActive ? 'default' : 'secondary'}
                        className={service.isActive ? 'bg-green-600' : ''}
                      >
                        {service.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <MoreActions
                        items={[
                          { label: 'Edit', href: `/admin/services/${service.id}/edit` },
                          { label: 'Duplicate', action: 'duplicate', data: { id: service.id } },
                          { label: 'Delete', action: 'delete', data: { id: service.id }, destructive: true },
                        ]}
                        onAction={(action, data) => {
                          if (action === 'delete') {
                            if (confirm('Are you sure you want to delete this service?')) {
                              fetch(`/api/services/${data.id}`, { method: 'DELETE' })
                                .then((res) => {
                                  if (res.ok) fetchServices();
                                });
                            }
                          }
                          if (action === 'duplicate') {
                            console.log('Duplicate:', data.id);
                          }
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
